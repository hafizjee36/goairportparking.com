import { apiUrl, apiKey } from '../common/config/api.jsx';
import { format, parse, isValid } from 'date-fns';

/**
 * Convert date from YYYY-MM-DD HH:mm format to DD-MM-YYYY HH:mm format
 * @param {string} dateString - Date string in YYYY-MM-DD HH:mm format
 * @returns {string} Date string in DD-MM-YYYY HH:mm format
 */
const convertDateFormat = (dateString) => {
  if (!dateString) return dateString;

  // Check if the date is already in DD-MM-YYYY format
  if (dateString.match(/^\d{2}-\d{2}-\d{4}/)) {
    console.log('📅 Date already in DD-MM-YYYY format:', dateString);
    return dateString;
  }

  // Try to parse the date string (YYYY-MM-DD HH:mm format)
  const parsedDate = parse(dateString, 'yyyy-MM-dd HH:mm', new Date());

  if (!isValid(parsedDate)) {
    console.warn('⚠️ Invalid date string:', dateString);
    return dateString;
  }

  // Convert to DD-MM-YYYY HH:mm format
  const converted = format(parsedDate, 'dd-MM-yyyy HH:mm');
  // console.log('🔄 Date converted:', dateString, '->', converted);
  return converted;
};

// Cache for products data
let productsCache = new Map();

/**
 * Fetch products/parking companies from the API
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.airport - Airport code
 * @param {string} searchParams.departure - Departure date and time
 * @param {string} searchParams.arrival - Arrival date and time
 * @param {string} searchParams.promocode - Promocode (optional) - mapped to discount_code for backend
 * @returns {Promise<Object>} Products response
 */
export const fetchProducts = async (searchParams) => {
  console.log('🚀 fetchProducts called');
  console.log('📋 Search Params:', searchParams);

  // Create cache key from search params
  const cacheKey = JSON.stringify(searchParams);

  // TEMPORARILY DISABLED CACHE TO FIX DISCOUNT CODE ISSUES
  // Check cache first
  // if (productsCache.has(cacheKey)) {
  //   console.log('📦 Returning cached products');
  //   return productsCache.get(cacheKey);
  // }
  console.log('🆆 Cache DISABLED - fetching fresh products...');

  try {
    console.log('🌐 Making GET request to /products');

    // Convert dates to API expected format (DD-MM-YYYY HH:mm)
    const convertedDeparture = convertDateFormat(searchParams.departure);
    const convertedArrival = convertDateFormat(searchParams.arrival);

    // console.log('🔄 Date processing:');
    // console.log('   Original departure:', searchParams.departure);
    // console.log('   Processed departure:', convertedDeparture);
    // console.log('   Original arrival:', searchParams.arrival);
    // console.log('   Processed arrival:', convertedArrival);

    // Build query parameters
    const params = new URLSearchParams({
      key: apiKey,
      airport: searchParams.airport,
      departure: convertedDeparture,
      arrival: convertedArrival,
      discount_code: searchParams.promocode || ''
    });

    const url = `${apiUrl}/productsUpdated?${params}`;
    console.log('🔗 Request URL:', url);

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    console.log('⏰ Setting up request with 10s timeout...');

    const fetchResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    console.log('⏰ Request completed within timeout');

    console.log('📡 Response Status:', fetchResponse.status);

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const responseData = await fetchResponse.json();
    console.log('📥 Raw API Response:', responseData);

    // Check if response_code is 200 (like your other project)
    if (responseData?.response_code !== 200) {
      throw new Error(`API error! response_code: ${responseData?.response_code}`);
    }

    const result = {
      success: true,
      data: responseData.data || [],
      message: responseData.message,
      status: fetchResponse.status
    };

    console.log('✅ SUCCESS - Products fetched!');
    console.log('📥 Products count:', result.data.length);

    // Cache the results
    productsCache.set(cacheKey, result);

    return result;

  } catch (error) {
    console.error('❌ Error fetching products:', error);

    if (error.name === 'AbortError') {
      console.error('⏰ Request timed out after 10 seconds');
      return {
        success: false,
        error: 'Request timed out - API server may be slow or unreachable',
        data: []
      };
    }

    if (error.message.includes('fetch')) {
      console.error('🚫 Network error - cannot reach API server');
      return {
        success: false,
        error: 'Network error - cannot reach API server',
        data: []
      };
    }

    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

/**
 * Clear products cache
 */
export const clearProductsCache = () => {
  productsCache.clear();
  console.log('🗑️ Products cache cleared');
};

/**
 * Search products with filters
 * @param {Array} products - Products array
 * @param {Object} filters - Filter options
 * @returns {Array} Filtered products
 */
export const filterProducts = (products, filters = {}) => {
  if (!products || !Array.isArray(products)) return [];

  let filtered = [...products];

  // Filter by price range
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(product => product.price >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(product => product.price <= filters.maxPrice);
  }

  // Filter by category/type
  if (filters.category) {
    filtered = filtered.filter(product =>
      product.category?.toLowerCase().includes(filters.category.toLowerCase())
    );
  }

  // Filter by rating
  if (filters.minRating !== undefined) {
    filtered = filtered.filter(product => product.rating >= filters.minRating);
  }

  // Sort by price, rating, etc.
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }

  return filtered;
};

// src/utils/urlUtils.jsx

/**
 * Parse URL search params to search data object
 * @param {URLSearchParams} searchParams - URL search parameters
 * @returns {Object} Parsed search data
 */
export const parseSearchParamsFromUrl = (searchParams) => {
  const params = {
    airport: searchParams.get('airport') || '',
    departure: searchParams.get('departure') || '',
    arrival: searchParams.get('arrival') || '',
    promocode: searchParams.get('promocode') || '',
    trafficSource: searchParams.get('traffic_source') || '',
    product: searchParams.get('product') || null,
    adults: parseInt(searchParams.get('adults')) || 1,
    children: parseInt(searchParams.get('children')) || 0
  };
  if (params.departure) {
    params.departure = params.departure.replace(/\+/g, ' ');
  }

  if (params.arrival) {
    params.arrival = params.arrival.replace(/\+/g, ' ');
  }

  // console.log('🔗 Raw URL search params:', {
  //   airport: searchParams.get('airport'),
  //   departure: searchParams.get('departure'),
  //   arrival: searchParams.get('arrival'),
  //   promocode: searchParams.get('promocode'),
  //   adults: searchParams.get('adults'),
  //   children: searchParams.get('children')
  // });
  // console.log('🔗 Parsed URL params:', params);

  // Convert URL date format to component state format if needed
  if (params.departure) {
    try {
      // Handle both formats: 2025-09-16+12:00, 2025-09-16 12:00, and DD-MM-YYYY HH:mm
      let departureDateTime = params.departure;

      // Replace + with space if present
      if (departureDateTime.includes('+')) {
        departureDateTime = departureDateTime.replace(/\+/g, ' ');
      }

      // Split by space to get date and time parts
      const parts = departureDateTime.trim().split(' ');

      if (parts.length >= 2) {
        const datePart = parts[0];
        const timePart = parts[1];

        if (datePart && timePart) {
          // Check date format and convert accordingly
          if (datePart.match(/^\d{2}-\d{2}-\d{4}$/)) {
            // DD-MM-YYYY format -> convert to YYYY-MM-DD
            const [day, month, year] = datePart.split('-');
            params.entryDate = `${year}-${month}-${day}`;
            // console.log('🔗 Converted DD-MM-YYYY to YYYY-MM-DD:', datePart, '->', params.entryDate);
          } else if (datePart.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // YYYY-MM-DD format -> keep as is
            params.entryDate = datePart;
            // console.log('🔗 Using YYYY-MM-DD format:', datePart);
          } else {
            // Fallback: assume it's already in correct format
            params.entryDate = datePart;
            // console.log('🔗 Fallback format:', datePart);
          }
          params.entryTime = timePart; // HH:mm
          // console.log('🔗 Parsed departure:', { datePart, timePart, entryDate: params.entryDate, entryTime: params.entryTime });
        }
      }
    } catch (error) {
      console.warn('⚠️ Error parsing departure date:', error);
    }
  }

  if (params.arrival) {
    try {
      // Handle formats: 2025-09-23+12:00, 2025-09-23 12:00, and DD-MM-YYYY HH:mm
      const arrivalDateTime = params.arrival.replace(/\+/g, ' ');
      const [datePart, timePart] = arrivalDateTime.split(' ');

      if (datePart && timePart) {
        // Check date format and convert accordingly
        if (datePart.match(/^\d{2}-\d{2}-\d{4}$/)) {
          // DD-MM-YYYY format -> convert to YYYY-MM-DD
          const [day, month, year] = datePart.split('-');
          params.exitDate = `${year}-${month}-${day}`;
          console.log('🔗 Converted DD-MM-YYYY to YYYY-MM-DD:', datePart, '->', params.exitDate);
        } else if (datePart.match(/^\d{4}-\d{2}-\d{2}$/)) {
          // YYYY-MM-DD format -> keep as is
          params.exitDate = datePart;
          console.log('🔗 Using YYYY-MM-DD format:', datePart);
        } else {
          // Fallback: assume it's already in correct format
          params.exitDate = datePart;
          console.log('🔗 Fallback format:', datePart);
        }
        params.exitTime = timePart; // HH:mm
        // console.log('🔗 Parsed arrival:', { datePart, timePart, exitDate: params.exitDate, exitTime: params.exitTime });
      }
    } catch (error) {
      console.warn('⚠️ Error parsing arrival date:', error);
    }
  }
  
  return params;
};

/**
 * Convert search data to URL search params
 * @param {Object} searchData - Search data object
 * @returns {string} URL search string
 */
export const buildSearchParamsUrl = (searchData) => {
  const params = new URLSearchParams();

  if (searchData.airport) params.set('airport', searchData.airport);
  if (searchData.adults) params.set('adults', searchData.adults.toString());
  if (searchData.children) params.set('children', searchData.children.toString());
  if (searchData.discountCode) params.set('promocode', searchData.discountCode);
  if (searchData.trafficSource) params.set('traffic_source', searchData.trafficSource);

  // Build departure and arrival in format: 2025-09-16+12:00
  if (searchData.entryDate && searchData.entryTime) {
    const departure = `${searchData.entryDate}+${searchData.entryTime}`;
    params.set('departure', departure);
  }

  if (searchData.exitDate && searchData.exitTime) {
    const arrival = `${searchData.exitDate}+${searchData.exitTime}`;
    params.set('arrival', arrival);
  }

  // Set product to null by default (like your other project)
  params.set('product', 'null');

  const searchString = params.toString();
  console.log('🔗 Built URL search params:', searchString);

  return searchString;
};

/**
 * Update browser URL with search params
 * @param {Object} searchData - Search data object
 * @param {Function} navigate - React Router navigate function
 * @param {string} pathname - Target pathname (e.g., '/booking', '/search')
 */
export const updateUrlWithSearchParams = (searchData, navigate, pathname = '/booking') => {
  console.log('🔗 updateUrlWithSearchParams called with:', {
    searchData,
    pathname,
    navigateFunction: typeof navigate
  });

  const searchString = buildSearchParamsUrl(searchData);
  const newUrl = `${pathname}?${searchString}`;

  console.log('🔗 Built URL for navigation:', newUrl);

  if (typeof navigate === 'function') {
    console.log('✅ Navigating via React Router navigate');
    navigate(newUrl, { replace: false });
  } else {
    console.warn('⚠️ Navigate function not provided, falling back to window.location');
    window.location.href = `${window.location.origin}${newUrl}`;
  }
};

/**
 * Get current URL search params as object
 * @returns {Object} Current URL params
 */
export const getCurrentUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return parseSearchParamsFromUrl(urlParams);
};

import { apiUrl, apiKey } from "../common/config/api.jsx";
import { format, parse, isValid } from "date-fns";

/**
 * Convert date from YYYY-MM-DD HH:mm format to DD-MM-YYYY HH:mm format
 * @param {string} dateString - Date string in YYYY-MM-DD HH:mm format
 * @returns {string} Date string in DD-MM-YYYY HH:mm format
 */
const convertDateFormat = (dateString) => {
  if (!dateString) return dateString;

  // Check if the date is already in DD-MM-YYYY format
  if (dateString.match(/^\d{2}-\d{2}-\d{4}/)) {
    // console.log('📅 Date already in DD-MM-YYYY format:', dateString);
    return dateString;
  }

  // Try to parse the date string (YYYY-MM-DD HH:mm format)
  const parsedDate = parse(dateString, "yyyy-MM-dd HH:mm", new Date());

  if (!isValid(parsedDate)) {
    // console.warn('⚠️ Invalid date string:', dateString);
    return dateString;
  }

  // Convert to DD-MM-YYYY HH:mm format
  const converted = format(parsedDate, "dd-MM-yyyy HH:mm");
  // console.log('🔄 Date converted:', dateString, '->', converted);
  return converted;
};

/**
 * Fetch single product details from the API
 * @param {Object} params - Product parameters
 * @param {string} params.sku - Product SKU
 * @param {string} params.departure - Departure date and time
 * @param {string} params.arrival - Arrival date and time
 * @param {string} params.airport - Airport code
 * @param {string} params.discount_code - Discount code (optional)
 * @returns {Promise<Object>} Product details response
 */
export const fetchSingleProduct = async (params) => {
  // console.log("🚀 fetchSingleProduct called");
  // console.log("📋 Product Params:", params);

  try {
    // console.log("🌐 Making GET request to /product");

    // Convert dates to API expected format (DD-MM-YYYY HH:mm)
    const convertedDeparture = convertDateFormat(params.departure);
    const convertedArrival = convertDateFormat(params.arrival);

    // console.log("🔄 Date processing:");
    // console.log("   Original departure:", params.departure);
    // console.log("   Processed departure:", convertedDeparture);
    // console.log("   Original arrival:", params.arrival);
    // console.log("   Processed arrival:", convertedArrival);

    // Build query parameters
    const queryParams = new URLSearchParams({
      key: apiKey,
      departure: convertedDeparture,
      arrival: convertedArrival,
      sku: params.sku,
      airport: params.airport,
      return_response: "full",
      ...(params.discount_code && { discount_code: params.discount_code }),
    });

    const url = `${apiUrl}/product?${queryParams}`;
    // console.log("🔗 Request URL:", url);

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    // console.log("⏰ Setting up request with 15s timeout...");

    const fetchResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    // console.log("⏰ Request completed within timeout");

    // console.log("📡 Response Status:", fetchResponse.status);

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const responseData = await fetchResponse.json();
    // console.log("📥 Raw API Response:", responseData);

    // Check if response_code is 200
    if (responseData?.response_code !== 200) {
      throw new Error(
        `API error! response_code: ${responseData?.response_code}, message: ${responseData?.message || "Unknown error"
        }`
      );
    }

    const result = {
      success: true,
      data: responseData.data,
      message: responseData.message,
      status: fetchResponse.status,
    };

    // console.log("✅ SUCCESS - Single product fetched!");
    // console.log("📥 Product details:", result.data);

    return result;
  } catch (error) {
    // console.error("❌ Error fetching single product:", error);

    if (error.name === "AbortError") {
      console.error("⏰ Request timed out after 15 seconds");
      return {
        success: false,
        error: "Request timed out - API server may be slow or unreachable",
        data: null,
      };
    }

    if (error.message.includes("fetch")) {
      console.error("🚫 Network error - cannot reach API server");
      return {
        success: false,
        error: "Network error - cannot reach API server",
        data: null,
      };
    }

    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

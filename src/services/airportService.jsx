import { apiUrl, apiKey } from "../common/config/api.jsx";

// Cache for airports data
let airportsCache = null;
let isFetching = false;

/**
 * Fetch airports from the API
 * @returns {Promise<Array>} Array of airport objects in format { level: "Name", value: "CODE" }
 */
export const fetchAirports = async () => {
  // console.log('🚀 fetchAirports called');
  // console.log('📍 API URL:', import.meta.env.VITE_API_URL);
  // console.log('🔑 API Key:', import.meta.env.VITE_API_KEY?.substring(0, 8) + '...');

  // Return cached data if available
  if (airportsCache) {
    // console.log("📦 Returning cached airports:", airportsCache.length, "items");
    return { success: true, data: airportsCache };
  }

  // Prevent multiple simultaneous requests
  if (isFetching) {
    // console.log("⏳ Already fetching, waiting...");
    // Wait for the ongoing request to complete
    while (isFetching) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return { success: true, data: airportsCache };
  }

  try {
    isFetching = true;
    // console.log("🌐 Making GET request to /airports with query parameter");
    // console.log("🔑 API Key:", apiKey?.substring(0, 8) + "...");

    // Simple GET request with key as query parameter (like your other project)
    const url = `${apiUrl}/airports?key=${encodeURIComponent(apiKey)}`;
    // console.log("🔗 Request URL:", url);

    const fetchResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    // console.log("📡 Response Status:", fetchResponse.status);

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const responseData = await fetchResponse.json();
    // console.log("📥 Raw API Response:", responseData);

    // Check if response_code is 200 (like your other project)
    if (responseData?.response_code !== 200) {
      throw new Error(
        `API error! response_code: ${responseData?.response_code}`
      );
    }

    const response = {
      success: true,
      data: responseData.data,
      status: fetchResponse.status,
    };

    // console.log("✅ SUCCESS - Airports fetched!");
    // console.log("📥 Final Response:", response);

    if (response.success && response.data) {
      // Transform API response to match the expected format
      // API response structure: { success: true, data: [{ name: "Birmingham", code: "BHX", ... }] }
      const airports = Array.isArray(response.data)
        ? response.data.map((airport) => ({
            level: airport.name,
            value: airport.code,
          }))
        : [];

      // Cache the transformed data
      airportsCache = airports;

      return {
        success: true,
        data: airports,
      };
    } else {
      throw new Error(response.error || "Failed to fetch airports");
    }
  } catch (error) {
    console.error("Error fetching airports:", error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  } finally {
    isFetching = false;
  }
};

/**
 * Get a specific airport by code
 * @param {string} airportCode - The airport code to search for
 * @returns {Promise<Object|null>} Airport object or null if not found
 */
export const getAirportByCode = async (airportCode) => {
  const result = await fetchAirports();

  if (result.success && result.data) {
    return (
      result.data.find(
        (airport) => airport.value.toLowerCase() === airportCode.toLowerCase()
      ) || null
    );
  }

  return null;
};

/**
 * Search airports by name or code
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>} Array of matching airports
 */
export const searchAirports = async (searchTerm) => {
  const result = await fetchAirports();

  if (result.success && result.data) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return result.data.filter(
      (airport) =>
        airport.level.toLowerCase().includes(lowerSearchTerm) ||
        airport.value.toLowerCase().includes(lowerSearchTerm)
    );
  }

  return [];
};

/**
 * Clear the airports cache (useful for refreshing data)
 */
export const clearAirportsCache = () => {
  airportsCache = null;
};

/**
 * Get fallback airports data (static data as backup)
 * This will be used if API fails
 */
export const getFallbackAirports = () => {
  return [
    { level: "Aberdeen", value: "ABZ" },
    { level: "Belfast City", value: "BHD" },
    { level: "Birmingham", value: "BHX" },
    { level: "Bristol", value: "BRS" },
    { level: "Cardiff", value: "CWL" },
    { level: "East Midlands", value: "EMA" },
    { level: "Edinburgh", value: "EDI" },
    { level: "Exeter", value: "EXT" },
    { level: "Gatwick", value: "LGW" },
    { level: "Glasgow", value: "GLA" },
    { level: "Heathrow", value: "LHR" },
    { level: "Humberside", value: "HUY" },
    { level: "Leeds Bradford", value: "LBA" },
    { level: "Liverpool", value: "LPL" },
    { level: "London City", value: "LCY" },
    { level: "Luton", value: "LTN" },
    { level: "Manchester", value: "MAN" },
    { level: "Newcastle", value: "NCL" },
    { level: "Southampton", value: "SOU" },
    { level: "Southampton Port", value: "GBSOU" },
    { level: "Southend", value: "SEN" },
    { level: "Stansted", value: "STN" },
  ];
};

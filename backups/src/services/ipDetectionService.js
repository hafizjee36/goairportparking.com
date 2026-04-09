// ipDetection.js
let cachedRegion = null;
let isFetching = false;
let fetchWaiters = [];

/**
 * Small helper: safe JSON parse
 */
const safeJson = async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

/**
 * Fetch with timeout
 */
const fetchWithTimeout = (url, options = {}, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Fetch timeout')), timeout);
    fetch(url, options)
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

/**
 * Detect user region from IP address
 * @returns {Promise<{success: boolean, region: string|null, error: string|null}>}
 */
export const detectUserRegion = async () => {
  // Return cached result if available
  if (cachedRegion) {
    return { success: true, region: cachedRegion, error: null };
  }

  // Check localStorage for cached region (safe)
  try {
    const raw = localStorage.getItem('userRegion');
    
    if (raw) {
      const parsed = JSON.parse(raw.region);
      const oneDay = 24 * 60 * 60 * 1000;
      if (parsed && parsed.region && parsed.timestamp && (Date.now() - parsed.timestamp < oneDay)) {
        cachedRegion = parsed.region;
        return { success: true, region: cachedRegion, error: null };
      }
    }
  } catch (e) {
    // ignore localStorage errors
    console.warn('IP Detection: localStorage read failed', e);
  }

  // Handle concurrent requests: if already fetching, wait for result
  if (isFetching) {
    return new Promise((resolve) => {
      fetchWaiters.push(resolve);
    });
  }

  isFetching = true;
  try {
    let region = null;

    try {
      // Query ip-api.com (returns JSON with fields like country, regionName, city)
      const response = await fetchWithTimeout('https://ipinfo.io/json', {}, 5000);
     
      if (response.ok) {
        const data = await safeJson(response);
        // console.log('api response', data)
        // ip-api returns { status: "success", country: "...", regionName: "...", city: "...", ... }
        // if (data && data.status === 'success') {
        if (data) {
          // Prefer city/regionName/country in that order to build a friendly region string
          const parts = [];
          if (data.city) parts.push(data.city);
          if (data.region) parts.push(data.region);
          if (data.country) parts.push(data.country);
          // fallback to query or country if nothing else
          region = data.region || null;
        } else {
          console.warn('IP Detection: ip-api returned failure', data && data.message);
        }
      } else {
        console.warn('IP Detection: ip-api returned status', response.status);
      }
    } catch (err) {
      console.warn('IP Detection: fetch failed', err);
    }


    if (region) {
      cachedRegion = region;
      try {
        // console.log('setItem: ',region);
        localStorage.setItem('userRegion', JSON.stringify({ region, timestamp: Date.now() }));
      } catch (e) {
        console.warn('IP Detection: localStorage write failed', e);
      }

      // resolve waiters
      fetchWaiters.forEach((r) => r({ success: true, region, error: null }));
      fetchWaiters = [];
      return { success: true, region, error: null };
    }

    // If we reach here, detection failed
    const result = { success: false, region: null, error: 'Could not detect region' };
    fetchWaiters.forEach((r) => r(result));
    fetchWaiters = [];
    return result;
  } catch (error) {
    const result = { success: false, region: null, error: error?.message || 'IP detection error' };
    fetchWaiters.forEach((r) => r(result));
    fetchWaiters = [];
    return result;
  } finally {
    isFetching = false;
  }
};

/**
 * Check if the detected region is Dubai (UAE)
 * @param {string} region
 * @returns {boolean}
 */
export const isDubaiRegion = (region) => {
  // console.log('isDubaiRegion: ',region)
  if (!region) return false;
  const s = region.toLowerCase();
  return s === 'dubai' || s === 'united arab emirates' || s === 'uae' || s.includes('dubai');
};

/**
 * Clear the cached region (useful for testing or manual refresh)
 */
export const clearRegionCache = () => {
  cachedRegion = null;
  try {
    localStorage.removeItem('userRegion');
  } catch (e) {
    // ignore
  }
};

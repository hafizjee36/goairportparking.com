import { useState, useEffect } from "react";
import { detectUserRegion, isDubaiRegion } from "../services/ipDetectionService";

/**
 * Custom hook to detect and manage user region from IP address
 * @returns {Object} { region, loading, error, isDubai }
 */
export const useUserRegion = () => {
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegion = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await detectUserRegion();
        
        if (result.success) {
          setRegion(result.region);
          console.log('useUserRegion:', result.region);
        } else {
          setError(result.error);
          console.warn(' useUserRegion: Failed to detect region:', result.error);
        }
      } catch (err) {
        setError(err.message);
        console.error('❌ useUserRegion: Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegion();
  }, []);

  // Helper to check if region is Dubai
  const isDubai = isDubaiRegion(region);

  return {
    region,
    loading,
    error,
    isDubai,
  };
};

export default useUserRegion;

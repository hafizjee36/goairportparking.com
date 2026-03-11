import { useState, useEffect } from "react";
import { fetchAirports } from "../services/airportService.jsx";

/**
 * Custom hook for managing airports data
 * @returns {Object} { airports, loading, error, refetch }
 */
export const useAirports = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAirports = async () => {
    // console.log('🎣 useAirports: loadAirports called');
    try {
      setLoading(true);
      setError(null);

      // console.log('🔄 useAirports: Calling fetchAirports...');
      const result = await fetchAirports();
      // console.log('📋 useAirports: fetchAirports result:', result);

      if (result.success) {
        setAirports(result.data);
      } else {
        // No fallback - only dynamic data
        console.error("Failed to fetch airports from API:", result.error);
        setAirports([]);
        setError("Failed to load airport data. Please check your connection.");
      }
    } catch (err) {
      console.error("Error loading airports:", err);
      // No fallback - only dynamic data
      setAirports([]);
      setError("Failed to load airport data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Load airports on mount
  useEffect(() => {
    loadAirports();
  }, []);

  const refetch = () => {
    loadAirports();
  };

  return {
    airports,
    loading,
    error,
    refetch,
  };
};

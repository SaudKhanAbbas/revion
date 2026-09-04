import { useState, useEffect, useCallback } from "react";
import { getDashboardData } from "../api/dashboardApi";

/**
 * Custom hook for asynchronous fetching of dashboard data.
 * Encapsulates state management for data, loading, and error states.
 */
export function useDashboardData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getDashboardData();
      setData(result);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.response?.data?.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboardData: data,
    loading,
    error,
    refetch: fetchDashboard,
  };
}

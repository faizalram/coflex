import { useState, useEffect } from 'react';
import type { Recommendation } from '../types/recommendation';
import { getDataService } from '../services/dataService';

interface UseRecommendationsResult {
  recommendations: Recommendation[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Custom hook for fetching recommendations for a specific customer
 * @param customerId - Customer ID to fetch recommendations for
 * @returns Object containing recommendations data, loading state, error state, and refetch function
 */
export function useRecommendations(customerId: string | null): UseRecommendationsResult {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecommendations = async () => {
    if (!customerId) {
      setRecommendations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const dataService = getDataService();
      const data = await dataService.getRecommendations(customerId);
      setRecommendations(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch recommendations'));
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [customerId]);

  return {
    recommendations,
    loading,
    error,
    refetch: fetchRecommendations,
  };
}

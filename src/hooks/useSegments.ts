import { useState, useEffect } from 'react';
import type { RetailSegment } from '../types/segment';
import { getDataService } from '../services/dataService';

interface UseSegmentsResult {
  segments: RetailSegment[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Custom hook for fetching retail segments
 * @returns Object containing segments data, loading state, error state, and refetch function
 */
export function useSegments(): UseSegmentsResult {
  const [segments, setSegments] = useState<RetailSegment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSegments = async () => {
    try {
      setLoading(true);
      setError(null);
      const dataService = getDataService();
      const data = await dataService.getRetailSegments();
      setSegments(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch segments'));
      setSegments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSegments();
  }, []);

  return {
    segments,
    loading,
    error,
    refetch: fetchSegments,
  };
}

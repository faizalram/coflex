import { useState, useEffect } from 'react';
import type { KPIMetrics } from '../types/metrics';
import type { TimeSeriesData } from '../types/scenario';
import { getDataService } from '../services/dataService';

interface UseMetricsResult {
  metrics: KPIMetrics | null;
  savingsTrend: TimeSeriesData[];
  sensitivityDistribution: Array<{
    sensitivity: string;
    count: number;
    percentage: number;
  }>;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Custom hook for fetching KPI metrics based on role
 * @param role - User role (TBW or RDPS)
 * @returns Object containing metrics data, savings trend, sensitivity distribution, loading state, error state, and refetch function
 */
export function useMetrics(role: 'TBW' | 'RDPS'): UseMetricsResult {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [savingsTrend, setSavingsTrend] = useState<TimeSeriesData[]>([]);
  const [sensitivityDistribution, setSensitivityDistribution] = useState<Array<{
    sensitivity: string;
    count: number;
    percentage: number;
  }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const dataService = getDataService();
      
      // Fetch all data in parallel
      const [metricsData, trendData, distributionData] = await Promise.all([
        dataService.getKPIMetrics(role),
        dataService.getSavingsTrend(role),
        dataService.getSensitivityDistribution(),
      ]);
      
      setMetrics(metricsData);
      setSavingsTrend(trendData);
      setSensitivityDistribution(distributionData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch metrics'));
      setMetrics(null);
      setSavingsTrend([]);
      setSensitivityDistribution([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [role]);

  return {
    metrics,
    savingsTrend,
    sensitivityDistribution,
    loading,
    error,
    refetch: fetchMetrics,
  };
}

import { useState, useCallback, useEffect } from 'react';
import type { Scenario } from '../types/scenario';
import type { WholesaleCustomer } from '../types/customer';
import type { RetailSegment } from '../types/segment';
import { getDataService } from '../services/dataService';

interface UseSimulatorParams {
  customer?: WholesaleCustomer;
  segment?: RetailSegment;
}

interface UseSimulatorResult {
  scenarios: Scenario[];
  currentRate: number;
  recommendedRate: number;
  loading: boolean;
  error: Error | null;
  generateScenarios: (rateAdjustment: number) => Promise<void>;
  resetScenarios: () => void;
}

/**
 * Custom hook for simulator calculations and scenario management
 * @param params - Optional customer or segment to simulate
 * @returns Object containing scenarios, current rate, recommended rate, loading state, error state, and control functions
 */
export function useSimulator(params?: UseSimulatorParams): UseSimulatorResult {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const customer = params?.customer;
  const segment = params?.segment;

  const currentRate = customer?.currentRate || segment?.currentRate || 0;
  const recommendedRate = customer?.recommendedRate || segment?.recommendedRate || 0;

  const generateScenarios = useCallback(async (rateAdjustment: number) => {
    if (!customer && !segment) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const dataService = getDataService();

      // Generate three scenarios: baseline, optimistic, pessimistic
      const scenarioTypes = [
        { adjustment: 0, type: 'baseline' as const },
        { adjustment: rateAdjustment - 0.5, type: 'optimistic' as const },
        { adjustment: rateAdjustment + 0.5, type: 'pessimistic' as const },
      ];

      const scenarioPromises = scenarioTypes.map((scenario) =>
        dataService.simulateScenario({
          customerId: customer?.id,
          segmentId: segment?.id,
          rateAdjustment: scenario.adjustment,
        })
      );

      const results = await Promise.all(scenarioPromises);
      setScenarios(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate scenarios'));
      setScenarios([]);
    } finally {
      setLoading(false);
    }
  }, [customer, segment]);

  const resetScenarios = useCallback(() => {
    setScenarios([]);
    setError(null);
  }, []);

  // Reset scenarios when customer/segment changes
  useEffect(() => {
    resetScenarios();
  }, [customer?.id, segment?.id, resetScenarios]);

  return {
    scenarios,
    currentRate,
    recommendedRate,
    loading,
    error,
    generateScenarios,
    resetScenarios,
  };
}

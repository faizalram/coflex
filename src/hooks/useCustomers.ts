import { useState, useEffect } from 'react';
import type { WholesaleCustomer } from '../types/customer';
import { getDataService } from '../services/dataService';

interface UseCustomersResult {
  customers: WholesaleCustomer[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Custom hook for fetching wholesale customers with optional filtering
 * @param segment - Optional segment filter (Corporate, Commercial, GVI, SME)
 * @returns Object containing customers data, loading state, error state, and refetch function
 */
export function useCustomers(segment?: string): UseCustomersResult {
  const [customers, setCustomers] = useState<WholesaleCustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const dataService = getDataService();
      const data = await dataService.getWholesaleCustomers(segment);
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch customers'));
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [segment]);

  return {
    customers,
    loading,
    error,
    refetch: fetchCustomers,
  };
}

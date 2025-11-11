import type { IDataService } from './dataService';
import type { WholesaleCustomer } from '../types/customer';
import type { RetailSegment } from '../types/segment';
import type { KPIMetrics } from '../types/metrics';
import type { Recommendation } from '../types/recommendation';
import type { Scenario, SimulationParams, TimeSeriesData } from '../types/scenario';

/**
 * API service implementation (stub for future integration)
 * This will be implemented when the backend API is available
 */
export class APIService implements IDataService {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL || '';
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  async getWholesaleCustomers(segment?: string): Promise<WholesaleCustomer[]> {
    const queryParam = segment ? `?segment=${encodeURIComponent(segment)}` : '';
    return this.fetchAPI<WholesaleCustomer[]>(`/api/customers/wholesale${queryParam}`);
  }

  async getRetailSegments(): Promise<RetailSegment[]> {
    return this.fetchAPI<RetailSegment[]>('/api/segments/retail');
  }

  async getKPIMetrics(role: 'TBW' | 'RDPS'): Promise<KPIMetrics> {
    return this.fetchAPI<KPIMetrics>(`/api/metrics?role=${role}`);
  }

  async getRecommendations(customerId: string): Promise<Recommendation[]> {
    return this.fetchAPI<Recommendation[]>(`/api/recommendations/${customerId}`);
  }

  async simulateScenario(params: SimulationParams): Promise<Scenario> {
    return this.fetchAPI<Scenario>('/api/simulate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getSavingsTrend(role: 'TBW' | 'RDPS'): Promise<TimeSeriesData[]> {
    return this.fetchAPI<TimeSeriesData[]>(`/api/trends/savings?role=${role}`);
  }

  async getSensitivityDistribution(): Promise<Array<{
    sensitivity: string;
    count: number;
    percentage: number;
  }>> {
    return this.fetchAPI('/api/analytics/sensitivity-distribution');
  }

  async getModelPerformance(): Promise<Array<{
    month: string;
    accuracy: number;
    precision: number;
    recall: number;
  }>> {
    return this.fetchAPI('/api/analytics/model-performance');
  }

  async analyzeCustomer(customerId: string): Promise<WholesaleCustomer> {
    return this.fetchAPI<WholesaleCustomer>(`/api/customers/wholesale/${customerId}/analyze`, {
      method: 'POST',
    });
  }

  async analyzeSegment(segmentId: string): Promise<RetailSegment> {
    return this.fetchAPI<RetailSegment>(`/api/segments/retail/${segmentId}/analyze`, {
      method: 'POST',
    });
  }
}

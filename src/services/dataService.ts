import type { WholesaleCustomer } from '../types/customer';
import type { RetailSegment } from '../types/segment';
import type { KPIMetrics } from '../types/metrics';
import type { Recommendation } from '../types/recommendation';
import type { Scenario, SimulationParams, TimeSeriesData } from '../types/scenario';
import dataConfig from '../config/dataConfig';

/**
 * Abstract data service interface
 * Defines the contract for data operations that can be implemented
 * by either mock data service or API service
 */
export interface IDataService {
  /**
   * Get wholesale customers with optional segment filtering
   * @param segment - Optional segment filter (Corporate, Commercial, GVI, SME)
   * @returns Promise resolving to array of wholesale customers
   */
  getWholesaleCustomers(segment?: string): Promise<WholesaleCustomer[]>;

  /**
   * Get retail segments
   * @returns Promise resolving to array of retail segments
   */
  getRetailSegments(): Promise<RetailSegment[]>;

  /**
   * Get KPI metrics based on role
   * @param role - User role (TBW or RDPS)
   * @returns Promise resolving to KPI metrics
   */
  getKPIMetrics(role: 'TBW' | 'RDPS'): Promise<KPIMetrics>;

  /**
   * Get recommendations for a specific customer
   * @param customerId - Customer ID
   * @returns Promise resolving to array of recommendations
   */
  getRecommendations(customerId: string): Promise<Recommendation[]>;

  /**
   * Simulate a what-if scenario
   * @param params - Simulation parameters
   * @returns Promise resolving to scenario results
   */
  simulateScenario(params: SimulationParams): Promise<Scenario>;

  /**
   * Get savings trend time series data
   * @param role - User role (TBW or RDPS)
   * @returns Promise resolving to time series data
   */
  getSavingsTrend(role: 'TBW' | 'RDPS'): Promise<TimeSeriesData[]>;

  /**
   * Get sensitivity distribution data for charts
   * @returns Promise resolving to sensitivity distribution
   */
  getSensitivityDistribution(): Promise<Array<{
    sensitivity: string;
    count: number;
    percentage: number;
  }>>;

  /**
   * Get model performance metrics over time
   * @returns Promise resolving to model performance data
   */
  getModelPerformance(): Promise<Array<{
    month: string;
    accuracy: number;
    precision: number;
    recall: number;
  }>>;

  /**
   * Analyze a wholesale customer to get AI-suggested optimal rate
   * Simulates ML model execution with realistic processing time
   * @param customerId - Customer ID to analyze
   * @returns Promise resolving to updated customer data with analyzed results
   */
  analyzeCustomer(customerId: string): Promise<WholesaleCustomer>;

  /**
   * Analyze a retail segment to get AI-suggested optimal rate
   * Simulates ML model execution with realistic processing time
   * @param segmentId - Segment ID to analyze
   * @returns Promise resolving to updated segment data with analyzed results
   */
  analyzeSegment(segmentId: string): Promise<RetailSegment>;
}

/**
 * Get the data service instance
 * Uses dataConfig to determine whether to use mock or API service
 * @returns IDataService instance
 */
export function getDataService(): IDataService {
  return dataConfig.getDataService();
}

/**
 * Reset the data service instance (useful for testing)
 */
export function resetDataService(): void {
  dataConfig.resetDataService();
}

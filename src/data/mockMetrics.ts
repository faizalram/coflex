import type { KPIMetrics } from '../types/metrics';

// TBW Metrics - calculated from mockWholesaleCustomers
export const mockTBWMetrics: KPIMetrics = {
  totalDPK: 50_560_000_000_000, // Total of all wholesale customer balances
  averageRate: 5.24,             // Average of all current rates
  projectedSavings: 366_998_000_000, // Total projected savings per year
  customerCount: 30,
  highRiskCount: 8,             // Customers with churnRisk > 35
};

// RDPS Metrics - calculated from mockRetailSegments
export const mockRDPSMetrics: KPIMetrics = {
  totalDPK: 1_358_685_000_000, // Total of all retail segment balances
  averageRate: 6.04,            // Weighted average of all current rates
  projectedSavings: 9_287_900_000, // Total projected savings per year
  customerCount: 87_000,        // Total customers across all segments
  highRiskCount: 4,             // Segments with churnRisk > 35
};

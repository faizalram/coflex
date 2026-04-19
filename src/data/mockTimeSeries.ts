import type { TimeSeriesData } from '../types/scenario';

// Historical trend data for TBW (last 3 months: Jan 2026 - Apr 2026)
export const mockTBWSavingsTrend: TimeSeriesData[] = [
  { month: 'Jan 2026', actual: 372_000_000_000, projected: 400_000_000_000 },
  { month: 'Feb 2026', actual: 380_000_000_000, projected: 408_000_000_000 },
  { month: 'Mar 2026', actual: 388_000_000_000, projected: 416_000_000_000 },
  { month: 'Apr 2026', actual: 395_000_000_000, projected: 424_000_000_000 },
];

// Historical trend data for RDPS (last 3 months: Jan 2026 - Apr 2026)
export const mockRDPSSavingsTrend: TimeSeriesData[] = [
  { month: 'Jan 2026', actual: 9_200_000_000, projected: 9_900_000_000 },
  { month: 'Feb 2026', actual: 9_400_000_000, projected: 10_100_000_000 },
  { month: 'Mar 2026', actual: 9_600_000_000, projected: 10_300_000_000 },
  { month: 'Apr 2026', actual: 9_800_000_000, projected: 10_500_000_000 },
];

// Sensitivity distribution data for dashboard charts
export const mockSensitivityDistribution = [
  { sensitivity: 'Low', count: 12, percentage: 40 },
  { sensitivity: 'Medium', count: 11, percentage: 37 },
  { sensitivity: 'High', count: 7, percentage: 23 },
];

// Model performance metrics over time (last 3 months: Jan 2026 - Apr 2026)
export const mockModelPerformance = [
  { month: 'Jan 2026', accuracy: 93, precision: 91, recall: 89 },
  { month: 'Feb 2026', accuracy: 93, precision: 91, recall: 90 },
  { month: 'Mar 2026', accuracy: 94, precision: 92, recall: 90 },
  { month: 'Apr 2026', accuracy: 94, precision: 92, recall: 90 },
];

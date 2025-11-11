import type { TimeSeriesData } from '../types/scenario';

// Historical trend data for TBW (last 12 months)
export const mockTBWSavingsTrend: TimeSeriesData[] = [
  { month: 'Des 2024', actual: 285_000_000_000, projected: 310_000_000_000 },
  { month: 'Jan 2025', actual: 292_000_000_000, projected: 318_000_000_000 },
  { month: 'Feb 2025', actual: 298_000_000_000, projected: 325_000_000_000 },
  { month: 'Mar 2025', actual: 305_000_000_000, projected: 332_000_000_000 },
  { month: 'Apr 2025', actual: 312_000_000_000, projected: 340_000_000_000 },
  { month: 'Mei 2025', actual: 320_000_000_000, projected: 348_000_000_000 },
  { month: 'Jun 2025', actual: 328_000_000_000, projected: 355_000_000_000 },
  { month: 'Jul 2025', actual: 335_000_000_000, projected: 362_000_000_000 },
  { month: 'Agu 2025', actual: 342_000_000_000, projected: 370_000_000_000 },
  { month: 'Sep 2025', actual: 350_000_000_000, projected: 378_000_000_000 },
  { month: 'Okt 2025', actual: 358_000_000_000, projected: 385_000_000_000 },
  { month: 'Nov 2025', actual: 367_000_000_000, projected: 393_000_000_000 },
];

// Historical trend data for RDPS (last 12 months)
export const mockRDPSSavingsTrend: TimeSeriesData[] = [
  { month: 'Des 2024', actual: 6_800_000_000, projected: 7_500_000_000 },
  { month: 'Jan 2025', actual: 7_000_000_000, projected: 7_700_000_000 },
  { month: 'Feb 2025', actual: 7_200_000_000, projected: 7_900_000_000 },
  { month: 'Mar 2025', actual: 7_400_000_000, projected: 8_100_000_000 },
  { month: 'Apr 2025', actual: 7_600_000_000, projected: 8_300_000_000 },
  { month: 'Mei 2025', actual: 7_800_000_000, projected: 8_500_000_000 },
  { month: 'Jun 2025', actual: 8_000_000_000, projected: 8_700_000_000 },
  { month: 'Jul 2025', actual: 8_200_000_000, projected: 8_900_000_000 },
  { month: 'Agu 2025', actual: 8_400_000_000, projected: 9_100_000_000 },
  { month: 'Sep 2025', actual: 8_600_000_000, projected: 9_300_000_000 },
  { month: 'Okt 2025', actual: 8_800_000_000, projected: 9_500_000_000 },
  { month: 'Nov 2025', actual: 9_000_000_000, projected: 9_700_000_000 },
];

// Sensitivity distribution data for dashboard charts
export const mockSensitivityDistribution = [
  { sensitivity: 'Low', count: 12, percentage: 40 },
  { sensitivity: 'Medium', count: 11, percentage: 37 },
  { sensitivity: 'High', count: 7, percentage: 23 },
];

// Model performance metrics over time (last 6 months)
export const mockModelPerformance = [
  { month: 'Jun 2025', accuracy: 87, precision: 85, recall: 83 },
  { month: 'Jul 2025', accuracy: 88, precision: 86, recall: 84 },
  { month: 'Agu 2025', accuracy: 89, precision: 87, recall: 85 },
  { month: 'Sep 2025', accuracy: 90, precision: 88, recall: 86 },
  { month: 'Okt 2025', accuracy: 91, precision: 89, recall: 87 },
  { month: 'Nov 2025', accuracy: 92, precision: 90, recall: 88 },
];

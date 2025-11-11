import type { ModelPerformanceMetrics, ModelPerformanceTrend } from '../types/modelPerformance';

// Current model performance metrics
export const mockModelPerformance: ModelPerformanceMetrics = {
  accuracy: 94.2,
  precision: 91.8,
  recall: 89.5,
  f1Score: 90.6,
  lastUpdated: new Date('2025-11-08T14:30:00'),
};

// Historical performance trend (last 12 months)
export const mockModelPerformanceTrend: ModelPerformanceTrend[] = [
  { month: 'Des 2024', accuracy: 87.2, precision: 84.5, recall: 82.1 },
  { month: 'Jan 2025', accuracy: 88.5, precision: 85.8, recall: 83.4 },
  { month: 'Feb 2025', accuracy: 89.1, precision: 86.9, recall: 84.2 },
  { month: 'Mar 2025', accuracy: 90.3, precision: 88.1, recall: 85.7 },
  { month: 'Apr 2025', accuracy: 91.2, precision: 89.0, recall: 86.8 },
  { month: 'Mei 2025', accuracy: 91.8, precision: 89.5, recall: 87.3 },
  { month: 'Jun 2025', accuracy: 92.4, precision: 90.1, recall: 87.9 },
  { month: 'Jul 2025', accuracy: 92.9, precision: 90.6, recall: 88.4 },
  { month: 'Agt 2025', accuracy: 93.3, precision: 91.0, recall: 88.8 },
  { month: 'Sep 2025', accuracy: 93.7, precision: 91.3, recall: 89.1 },
  { month: 'Okt 2025', accuracy: 94.0, precision: 91.6, recall: 89.3 },
  { month: 'Nov 2025', accuracy: 94.2, precision: 91.8, recall: 89.5 },
];

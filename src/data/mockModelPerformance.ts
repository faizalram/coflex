import type { ModelPerformanceMetrics, ModelPerformanceTrend } from '../types/modelPerformance';

// Current model performance metrics
export const mockModelPerformance: ModelPerformanceMetrics = {
  accuracy: 94.5,
  precision: 92.1,
  recall: 90.0,
  f1Score: 91.0,
  lastUpdated: new Date('2026-04-19T14:30:00'),
};

// Historical performance trend (last 3 months: Jan 2026 - Apr 2026)
export const mockModelPerformanceTrend: ModelPerformanceTrend[] = [
  { month: 'Jan 2026', accuracy: 93.2, precision: 90.8, recall: 88.9 },
  { month: 'Feb 2026', accuracy: 93.6, precision: 91.2, recall: 89.3 },
  { month: 'Mar 2026', accuracy: 94.1, precision: 91.7, recall: 89.7 },
  { month: 'Apr 2026', accuracy: 94.5, precision: 92.1, recall: 90.0 },
];

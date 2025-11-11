export interface ModelPerformanceMetrics {
  accuracy: number;      // 0-100
  precision: number;     // 0-100
  recall: number;        // 0-100
  f1Score: number;       // 0-100
  lastUpdated: Date;
}

export interface ModelPerformanceTrend {
  month: string;
  accuracy: number;
  precision: number;
  recall: number;
}

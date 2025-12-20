export interface Scenario {
  id: string;
  name: string;
  type: 'baseline' | 'optimistic' | 'pessimistic' | 'custom';
  rateAdjustment: number;        // percentage change
  projectedSavings: number;
  projectedRetention: number;
}

export interface SimulationParams {
  customerId?: string;
  segmentId?: string;
  rateAdjustment: number;
}

export interface TimeSeriesData {
  month: string;
  actual: number;
  projected: number;
}

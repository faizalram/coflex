import type { MLModelVariables } from './recommendation';

export interface RetailSegment {
  id: string;
  name: string;
  balanceTier: string;          // e.g., "<10M", "10M-50M"
  customerCount: number;
  totalBalance: number;          // in IDR
  currentRate: number;
  recommendedRate: number;
  avgSensitivity: number;        // 0-100
  retentionRate: number;        // 0-100
  projectedSavings: number;
  isAnalyzed?: boolean;          // indicates if AI analysis has been run
  mlVariables?: MLModelVariables; // ML model input variables (aggregated for segment)
}

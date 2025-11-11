export interface WholesaleCustomer {
  id: string;
  name: string;
  segment: 'Corporate' | 'Commercial' | 'GVI' | 'SME';
  currentBalance: number;        // in IDR
  currentRate: number;           // percentage
  recommendedRate: number;       // percentage
  sensitivity: 'Low' | 'Medium' | 'High';
  churnRisk: number;            // 0-100
  confidenceScore: number;       // 0-100
  projectedSavings: number;      // in IDR per year
  lastUpdated: Date;
  isAnalyzed?: boolean;          // indicates if AI analysis has been run
}

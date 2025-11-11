export interface Recommendation {
  id: string;
  customerId: string;
  type: 'rate_decrease' | 'rate_maintain' | 'rate_increase';
  priority: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  rationale: string;
  impact: {
    savingsAmount: number;
    churnRiskChange: number;
  };
  confidence: 'High' | 'Medium' | 'Low';
}

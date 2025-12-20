export interface MLModelVariables {
  kopraTransaction: number;        // Transaction volume/count
  livinTransaction: number;        // Livin app transaction volume/count
  tradeFinanceTransaction: number; // Trade finance transaction volume/count
  livinMerchantTransaction: number; // Livin merchant transaction volume/count
  loanPortfolio: number;          // Loan portfolio value in IDR
}

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
  };
  confidence: 'High' | 'Medium' | 'Low';
  mlVariables: MLModelVariables;   // ML model input variables
}

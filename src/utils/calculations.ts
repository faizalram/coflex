/**
 * Calculate projected annual savings based on balance and rate difference
 * @param balance - Current balance in IDR
 * @param currentRate - Current interest rate (percentage)
 * @param recommendedRate - Recommended interest rate (percentage)
 * @returns Projected annual savings in IDR
 */
export function calculateSavings(
  balance: number,
  currentRate: number,
  recommendedRate: number
): number {
  const rateDifference = currentRate - recommendedRate;
  return balance * (rateDifference / 100);
}

/**
 * Calculate churn risk based on rate sensitivity and rate difference
 * @param sensitivity - Customer sensitivity level ('Low', 'Medium', 'High')
 * @param currentRate - Current interest rate (percentage)
 * @param marketRate - Market average rate (percentage)
 * @returns Churn risk percentage (0-100)
 */
export function calculateChurnRisk(
  sensitivity: 'Low' | 'Medium' | 'High',
  currentRate: number,
  marketRate: number
): number {
  // Base risk levels
  const baseRisk = {
    Low: 10,
    Medium: 25,
    High: 40,
  }[sensitivity];

  // Rate competitiveness factor
  const rateDiff = marketRate - currentRate;
  const riskAdjustment = rateDiff * 5; // 1% below market = +5% churn risk

  // Calculate final risk, capped between 0 and 100
  const finalRisk = baseRisk + riskAdjustment;
  return Math.max(0, Math.min(100, finalRisk));
}

/**
 * Calculate confidence score based on data quality factors
 * @param dataPoints - Number of historical data points
 * @param recency - Days since last update
 * @param consistency - Data consistency score (0-100)
 * @returns Confidence score (0-100)
 */
export function calculateConfidenceScore(
  dataPoints: number,
  recency: number,
  consistency: number
): number {
  // Data points factor (more data = higher confidence)
  const dataFactor = Math.min(100, (dataPoints / 12) * 100);

  // Recency factor (recent data = higher confidence)
  const recencyFactor = Math.max(0, 100 - recency * 2);

  // Weighted average
  const confidence = dataFactor * 0.4 + recencyFactor * 0.3 + consistency * 0.3;

  return Math.round(Math.max(0, Math.min(100, confidence)));
}

/**
 * Calculate retention rate based on churn risk
 * @param churnRisk - Churn risk percentage (0-100)
 * @returns Retention rate percentage (0-100)
 */
export function calculateRetentionRate(churnRisk: number): number {
  return 100 - churnRisk;
}

/**
 * Calculate weighted average rate across multiple customers/segments
 * @param items - Array of items with balance and rate
 * @returns Weighted average rate
 */
export function calculateWeightedAverageRate(
  items: Array<{ balance: number; rate: number }>
): number {
  const totalBalance = items.reduce((sum, item) => sum + item.balance, 0);

  if (totalBalance === 0) return 0;

  const weightedSum = items.reduce(
    (sum, item) => sum + item.balance * item.rate,
    0
  );

  return weightedSum / totalBalance;
}

/**
 * Calculate impact of rate adjustment on churn risk
 * @param baseChurnRisk - Current churn risk (0-100)
 * @param rateAdjustment - Rate adjustment in percentage points (negative = decrease)
 * @param sensitivity - Customer sensitivity level
 * @returns New churn risk after adjustment (0-100)
 */
export function calculateRateAdjustmentImpact(
  baseChurnRisk: number,
  rateAdjustment: number,
  sensitivity: 'Low' | 'Medium' | 'High'
): number {
  // Sensitivity multipliers
  const multiplier = {
    Low: 2,
    Medium: 3,
    High: 5,
  }[sensitivity];

  // Negative adjustment (rate decrease) increases churn risk
  // Positive adjustment (rate increase) decreases churn risk
  const riskChange = -rateAdjustment * multiplier;

  const newRisk = baseChurnRisk + riskChange;
  return Math.max(0, Math.min(100, newRisk));
}

/**
 * Calculate projected savings impact from rate adjustment
 * @param currentSavings - Current projected savings
 * @param rateAdjustment - Rate adjustment in percentage points
 * @returns New projected savings
 */
export function calculateSavingsImpact(
  currentSavings: number,
  rateAdjustment: number
): number {
  // Negative adjustment (rate decrease) increases savings
  // Positive adjustment (rate increase) decreases savings
  const savingsMultiplier = 1 - rateAdjustment * 0.15;
  return Math.max(0, currentSavings * savingsMultiplier);
}

/**
 * Determine priority level based on churn risk and savings potential
 * @param churnRisk - Churn risk percentage (0-100)
 * @param savingsAmount - Projected savings amount
 * @param threshold - High savings threshold (default: 10 billion IDR)
 * @returns Priority level
 */
export function determinePriority(
  churnRisk: number,
  savingsAmount: number,
  threshold: number = 10_000_000_000
): 'High' | 'Medium' | 'Low' {
  if (churnRisk > 35 || savingsAmount > threshold) {
    return 'High';
  } else if (churnRisk > 20 || savingsAmount > threshold / 2) {
    return 'Medium';
  }
  return 'Low';
}

/**
 * Calculate total DPK (Dana Pihak Ketiga) from customer balances
 * @param balances - Array of customer balances
 * @returns Total DPK
 */
export function calculateTotalDPK(balances: number[]): number {
  return balances.reduce((sum, balance) => sum + balance, 0);
}

/**
 * Calculate percentage change between two values
 * @param oldValue - Original value
 * @param newValue - New value
 * @returns Percentage change
 */
export function calculatePercentageChange(
  oldValue: number,
  newValue: number
): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

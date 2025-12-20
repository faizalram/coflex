import type { RetailSegment } from '../types/segment';

// Helper function to generate realistic ML variables for retail segments
const generateSegmentMLVariables = (balanceTier: string, customerCount: number, totalBalance: number) => {
  const avgBalance = totalBalance / customerCount;
  const balanceMultiplier = avgBalance / 100_000_000; // Convert to hundreds of millions for scaling
  
  // Base values vary by tier
  let baseKopra, baseLivin, baseTrade, baseMerchant, baseLoanRatio;
  
  if (balanceTier.includes('>500M') || balanceTier.includes('Ultra')) {
    baseKopra = 8000;
    baseLivin = 15000;
    baseTrade = 3000;
    baseMerchant = 5000;
    baseLoanRatio = 0.35;
  } else if (balanceTier.includes('>100M') || balanceTier.includes('100M-500M')) {
    baseKopra = 5000;
    baseLivin = 12000;
    baseTrade = 2000;
    baseMerchant = 4000;
    baseLoanRatio = 0.3;
  } else if (balanceTier.includes('50M-100M') || balanceTier.includes('10M-50M')) {
    baseKopra = 3000;
    baseLivin = 8000;
    baseTrade = 1200;
    baseMerchant = 2500;
    baseLoanRatio = 0.25;
  } else if (balanceTier.includes('5M-10M')) {
    baseKopra = 1500;
    baseLivin = 5000;
    baseTrade = 600;
    baseMerchant = 1500;
    baseLoanRatio = 0.2;
  } else { // <5M or <10M
    baseKopra = 800;
    baseLivin = 3000;
    baseTrade = 300;
    baseMerchant = 800;
    baseLoanRatio = 0.15;
  }
  
  // Scale by customer count (more customers = more aggregate transactions)
  const customerMultiplier = Math.log10(customerCount) / 4; // Logarithmic scaling
  
  return {
    kopraTransaction: Math.floor((baseKopra * customerMultiplier) + (balanceMultiplier * 500) + (Math.random() * 1000)),
    livinTransaction: Math.floor((baseLivin * customerMultiplier) + (balanceMultiplier * 800) + (Math.random() * 2000)),
    tradeFinanceTransaction: Math.floor((baseTrade * customerMultiplier) + (balanceMultiplier * 200) + (Math.random() * 400)),
    livinMerchantTransaction: Math.floor((baseMerchant * customerMultiplier) + (balanceMultiplier * 400) + (Math.random() * 800)),
    loanPortfolio: Math.floor((totalBalance * baseLoanRatio) + (Math.random() * totalBalance * 0.1))
  };
};

export const mockRetailSegments: RetailSegment[] = [
  {
    id: 'RS001',
    name: 'Premium Tier',
    balanceTier: '>100M',
    customerCount: 1_250,
    totalBalance: 187_500_000_000,
    currentRate: 5.5,
    recommendedRate: 4.8,
    avgSensitivity: 45,
    retentionRate: 92,
    projectedSavings: 1_312_500_000,
    mlVariables: generateSegmentMLVariables('>100M', 1_250, 187_500_000_000),
  },
  {
    id: 'RS002',
    name: 'High Balance Tier',
    balanceTier: '50M-100M',
    customerCount: 3_450,
    totalBalance: 258_750_000_000,
    currentRate: 5.8,
    recommendedRate: 5.1,
    avgSensitivity: 52,
    retentionRate: 89,
    projectedSavings: 1_811_250_000,
    mlVariables: generateSegmentMLVariables('50M-100M', 3_450, 258_750_000_000),
  },
  {
    id: 'RS003',
    name: 'Mid Balance Tier',
    balanceTier: '10M-50M',
    customerCount: 8_920,
    totalBalance: 267_600_000_000,
    currentRate: 6.2,
    recommendedRate: 5.5,
    avgSensitivity: 58,
    retentionRate: 86,
    projectedSavings: 1_873_200_000,
    mlVariables: generateSegmentMLVariables('10M-50M', 8_920, 267_600_000_000),
  },
  {
    id: 'RS004',
    name: 'Basic Tier',
    balanceTier: '<10M',
    customerCount: 24_380,
    totalBalance: 121_900_000_000,
    currentRate: 6.8,
    recommendedRate: 6.2,
    avgSensitivity: 65,
    retentionRate: 82,
    projectedSavings: 731_400_000,
    mlVariables: generateSegmentMLVariables('<10M', 24_380, 121_900_000_000),
  },
  {
    id: 'RS005',
    name: 'Ultra Premium',
    balanceTier: '>500M',
    customerCount: 180,
    totalBalance: 135_000_000_000,
    currentRate: 5.0,
    recommendedRate: 4.2,
    avgSensitivity: 38,
    retentionRate: 95,
    projectedSavings: 1_080_000_000,
    mlVariables: generateSegmentMLVariables('>500M', 180, 135_000_000_000),
  },
  {
    id: 'RS006',
    name: 'Upper Mid Tier',
    balanceTier: '100M-500M',
    customerCount: 890,
    totalBalance: 222_500_000_000,
    currentRate: 5.3,
    recommendedRate: 4.6,
    avgSensitivity: 48,
    retentionRate: 91,
    projectedSavings: 1_557_500_000,
    mlVariables: generateSegmentMLVariables('100M-500M', 890, 222_500_000_000),
  },
  {
    id: 'RS007',
    name: 'Lower Mid Tier',
    balanceTier: '5M-10M',
    customerCount: 12_650,
    totalBalance: 94_875_000_000,
    currentRate: 6.5,
    recommendedRate: 5.9,
    avgSensitivity: 62,
    retentionRate: 84,
    projectedSavings: 569_250_000,
    mlVariables: generateSegmentMLVariables('5M-10M', 12_650, 94_875_000_000),
  },
  {
    id: 'RS008',
    name: 'Entry Tier',
    balanceTier: '<5M',
    customerCount: 35_280,
    totalBalance: 70_560_000_000,
    currentRate: 7.2,
    recommendedRate: 6.7,
    avgSensitivity: 70,
    retentionRate: 78,
    projectedSavings: 352_800_000,
    mlVariables: generateSegmentMLVariables('<5M', 35_280, 70_560_000_000),
  },
];
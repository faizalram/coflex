/**
 * Application-wide constants
 */

// Customer segments
export const CUSTOMER_SEGMENTS = {
  CORPORATE: 'Corporate',
  COMMERCIAL: 'Commercial',
  GVI: 'GVI',
  SME: 'SME',
} as const;

export const ALL_SEGMENTS = [
  CUSTOMER_SEGMENTS.CORPORATE,
  CUSTOMER_SEGMENTS.COMMERCIAL,
  CUSTOMER_SEGMENTS.GVI,
  CUSTOMER_SEGMENTS.SME,
] as const;

// Sensitivity levels
export const SENSITIVITY_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
} as const;

// Priority levels
export const PRIORITY_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
} as const;

// Confidence levels
export const CONFIDENCE_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
} as const;

// User roles
export const USER_ROLES = {
  TBW: 'TBW',
  RDPS: 'RDPS',
} as const;

// Recommendation types
export const RECOMMENDATION_TYPES = {
  RATE_DECREASE: 'rate_decrease',
  RATE_MAINTAIN: 'rate_maintain',
  RATE_INCREASE: 'rate_increase',
} as const;

// Scenario types
export const SCENARIO_TYPES = {
  BASELINE: 'baseline',
  OPTIMISTIC: 'optimistic',
  PESSIMISTIC: 'pessimistic',
  CUSTOM: 'custom',
} as const;

// Color mappings for UI
export const SENSITIVITY_COLORS = {
  Low: 'text-green-600 bg-green-50 border-green-200',
  Medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  High: 'text-red-600 bg-red-50 border-red-200',
} as const;

export const PRIORITY_COLORS = {
  High: 'text-red-600 bg-red-50 border-red-200',
  Medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  Low: 'text-blue-600 bg-blue-50 border-blue-200',
} as const;

export const CONFIDENCE_COLORS = {
  High: 'text-green-600 bg-green-50',
  Medium: 'text-yellow-600 bg-yellow-50',
  Low: 'text-red-600 bg-red-50',
} as const;

// Churn risk thresholds
export const CHURN_RISK_THRESHOLDS = {
  LOW: 20,
  MEDIUM: 35,
  HIGH: 50,
} as const;

// Churn risk color mapping
export const getChurnRiskColor = (risk: number): string => {
  if (risk < CHURN_RISK_THRESHOLDS.LOW) {
    return 'text-green-600 bg-green-50';
  } else if (risk < CHURN_RISK_THRESHOLDS.MEDIUM) {
    return 'text-yellow-600 bg-yellow-50';
  } else {
    return 'text-red-600 bg-red-50';
  }
};

// Interest rate ranges
export const INTEREST_RATE_RANGE = {
  MIN: 2.0,
  MAX: 8.0,
  STEP: 0.1,
} as const;

// Balance tier labels
export const BALANCE_TIERS = {
  ULTRA_PREMIUM: '>500M',
  PREMIUM: '>100M',
  UPPER_MID: '100M-500M',
  HIGH: '50M-100M',
  MID: '10M-50M',
  LOWER_MID: '5M-10M',
  BASIC: '<10M',
  ENTRY: '<5M',
} as const;

// API configuration
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Data refresh intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  METRICS: 300000, // 5 minutes
  CUSTOMERS: 600000, // 10 minutes
  RECOMMENDATIONS: 300000, // 5 minutes
} as const;

// Chart colors
export const CHART_COLORS = {
  PRIMARY: '#3b82f6', // blue-500
  SUCCESS: '#10b981', // green-500
  WARNING: '#f59e0b', // orange-500
  DANGER: '#ef4444', // red-500
  SECONDARY: '#6366f1', // indigo-500
  ACCENT: '#8b5cf6', // purple-500
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 500,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// Format options
export const FORMAT_OPTIONS = {
  CURRENCY_COMPACT: true,
  PERCENTAGE_DECIMALS: 2,
  NUMBER_DECIMALS: 0,
} as const;

// Savings thresholds (in IDR)
export const SAVINGS_THRESHOLDS = {
  HIGH: 10_000_000_000, // 10 billion
  MEDIUM: 5_000_000_000, // 5 billion
  LOW: 1_000_000_000, // 1 billion
} as const;

// Model performance thresholds
export const MODEL_PERFORMANCE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 80,
  FAIR: 70,
  POOR: 60,
} as const;

// Environment modes
export const APP_MODES = {
  MOCK: 'mock',
  API: 'api',
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/',
  TBW: '/tbw',
  RDPS: '/rdps',
  SIMULATOR: '/simulator',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_ROLE: 'user_role',
  THEME: 'theme',
  LAST_VIEWED_CUSTOMER: 'last_viewed_customer',
  LAST_VIEWED_SEGMENT: 'last_viewed_segment',
} as const;

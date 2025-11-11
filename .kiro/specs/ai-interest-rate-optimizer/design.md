# Design Document

## Overview

AI Interest Rate Optimizer adalah web dashboard MVP yang dibangun sebagai Single Page Application (SPA) menggunakan teknologi modern frontend. Dashboard ini mendemonstrasikan konsep optimasi suku bunga berbasis machine learning dengan fokus pada visualisasi data yang menarik dan user experience yang intuitif.

### Technology Stack

- **Frontend Framework**: React 18+ dengan TypeScript
- **Build Tool**: Vite untuk development dan build yang cepat
- **UI Component Library**: shadcn/ui (berbasis Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS untuk utility-first styling
- **Charts & Visualization**: Recharts untuk interactive charts
- **State Management**: React Context API + hooks untuk state lokal
- **Routing**: React Router v6 untuk navigation
- **Icons**: Lucide React untuk icon set yang konsisten

### Design Principles

1. **Mobile-First Responsive**: Meskipun fokus desktop, tetap responsive untuk tablet
2. **Component-Driven**: Reusable components dengan props yang jelas
3. **Type-Safe**: TypeScript untuk type safety dan better DX
4. **Performance**: Lazy loading, code splitting, optimized renders
5. **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
6. **Modern Aesthetics**: Clean, professional, dengan subtle animations

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  TBW View    │  │  RDPS View   │  │ What-if      │      │
│  │  Components  │  │  Components  │  │ Simulator    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Shared UI Components (shadcn/ui)             │   │
│  │  Cards, Charts, Tables, Modals, Badges, etc.        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Custom Hooks & Utilities                │   │
│  │  useCustomers, useRecommendations, useSimulator     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│  ┌──────────────┐              ┌──────────────┐            │
│  │  Mock Data   │◄─────────────┤ Data Service │            │
│  │  Provider    │              │   Layer      │            │
│  └──────────────┘              └──────────────┘            │
│                                        │                     │
│                                        ▼                     │
│                                ┌──────────────┐             │
│                                │ External API │ (Future)    │
│                                │  Integration │             │
│                                └──────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

### Folder Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── AppLayout.tsx      # Main layout with sidebar
│   │   ├── Header.tsx         # Top navigation bar
│   │   └── Sidebar.tsx        # Side navigation
│   ├── dashboard/
│   │   ├── KPICards.tsx       # Key metrics cards
│   │   ├── SensitivityChart.tsx
│   │   └── SavingsChart.tsx
│   ├── tbw/
│   │   ├── WholesaleCustomerList.tsx
│   │   ├── CustomerDetailCard.tsx
│   │   └── RecommendationCard.tsx
│   ├── rdps/
│   │   ├── RetailSegmentList.tsx
│   │   ├── SegmentDetailCard.tsx
│   │   └── ChurnHeatmap.tsx
│   ├── simulator/
│   │   ├── WhatIfSimulator.tsx
│   │   ├── ScenarioComparison.tsx
│   │   └── InterestRateSlider.tsx
│   └── shared/
│       ├── RoleSwitcher.tsx
│       ├── LoadingState.tsx
│       └── ErrorBoundary.tsx
├── pages/
│   ├── DashboardPage.tsx      # Main dashboard (home)
│   ├── TBWPage.tsx            # TBW view
│   ├── RDPSPage.tsx           # RDPS view
│   └── SimulatorPage.tsx      # What-if simulator
├── services/
│   ├── dataService.ts         # Abstract data service
│   ├── mockDataService.ts     # Mock data implementation
│   └── apiService.ts          # API integration (future)
├── data/
│   ├── mockCustomers.ts       # Mock wholesale customers
│   ├── mockSegments.ts        # Mock retail segments
│   ├── mockMetrics.ts         # Mock KPI data
│   └── mockTimeSeries.ts      # Mock historical data
├── hooks/
│   ├── useCustomers.ts
│   ├── useRecommendations.ts
│   ├── useSimulator.ts
│   └── useRole.ts
├── types/
│   ├── customer.ts
│   ├── recommendation.ts
│   ├── segment.ts
│   └── metrics.ts
├── utils/
│   ├── formatters.ts          # Currency, percentage formatters
│   ├── calculations.ts        # Business logic calculations
│   └── constants.ts           # App constants
├── lib/
│   └── utils.ts               # shadcn/ui utilities
├── App.tsx
└── main.tsx
```

## Components and Interfaces

### Core Data Models

```typescript
// types/customer.ts
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

// types/segment.ts
export interface RetailSegment {
  id: string;
  name: string;
  balanceTier: string;          // e.g., "<10M", "10M-50M"
  customerCount: number;
  totalBalance: number;          // in IDR
  currentRate: number;
  recommendedRate: number;
  avgSensitivity: number;        // 0-100
  churnRisk: number;            // 0-100
  retentionRate: number;        // 0-100
  projectedSavings: number;
  isAnalyzed?: boolean;          // indicates if AI analysis has been run
}

// types/metrics.ts
export interface KPIMetrics {
  totalDPK: number;              // in IDR
  averageRate: number;           // percentage
  projectedSavings: number;      // in IDR per year
  customerCount: number;
  highRiskCount: number;
}

// types/recommendation.ts
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

// types/scenario.ts
export interface Scenario {
  id: string;
  name: string;
  type: 'baseline' | 'optimistic' | 'pessimistic' | 'custom';
  rateAdjustment: number;        // percentage change
  projectedChurnRisk: number;
  projectedSavings: number;
  projectedRetention: number;
}
```

### Key Components

#### 1. AppLayout Component

```typescript
interface AppLayoutProps {
  children: React.ReactNode;
}

// Features:
// - Responsive sidebar navigation
// - Header with role switcher
// - Main content area
// - Consistent spacing and layout
```

#### 2. KPICards Component

```typescript
interface KPICardsProps {
  metrics: KPIMetrics;
  loading?: boolean;
}

// Features:
// - 4 main KPI cards in a grid
// - Animated number counters
// - Trend indicators (up/down arrows)
// - Color-coded based on performance
```

#### 3. WholesaleCustomerList Component

```typescript
interface WholesaleCustomerListProps {
  customers: WholesaleCustomer[];
  onSelectCustomer: (customer: WholesaleCustomer) => void;
  selectedSegment?: string;
}

// Features:
// - Filterable by segment
// - Sortable columns
// - Search functionality
// - Color-coded sensitivity badges
// - Click to view details
```

#### 4. WhatIfSimulator Component

```typescript
interface WhatIfSimulatorProps {
  customerId?: string;
  segmentId?: string;
}

// Features:
// - Interactive rate slider
// - Real-time calculation updates
// - Scenario comparison cards
// - Impact visualization charts
// - Save/reset scenarios
```

#### 5. Chart Components

```typescript
// SensitivityChart - Donut/Pie chart
interface SensitivityChartProps {
  data: {
    sensitivity: string;
    count: number;
    percentage: number;
  }[];
}

// SavingsChart - Line/Area chart
interface SavingsChartProps {
  data: {
    month: string;
    actual: number;
    projected: number;
  }[];
}

// ChurnHeatmap - Heatmap visualization
interface ChurnHeatmapProps {
  segments: RetailSegment[];
}
```

#### 6. Interactive Analyze Feature

The interactive analyze feature adds an "Analyze" button to customer and segment detail cards that triggers AI predictive modeling:

```typescript
// Enhanced CustomerDetailCard and SegmentDetailCard
interface AnalyzeFeatureProps {
  onAnalyze: () => Promise<void>;
  isAnalyzing: boolean;
  isAnalyzed: boolean;
}

// Features:
// - "Analyze" button with loading state
// - Simulated ML processing (1-3 seconds delay)
// - Animated reveal of results
// - Visual badge indicating "AI Analyzed" status
// - Updated recommendations with confidence scores
// - Smooth transitions between states

// State Management:
// - Initial state: Shows static recommendation with "Analyze" button
// - Analyzing state: Shows loading spinner and "Analyzing..." text
// - Analyzed state: Shows updated recommendation with "AI Analyzed" badge
// - Can re-analyze to simulate fresh predictions
```

**User Flow:**
1. User views customer/segment detail card with initial recommendation
2. User clicks "Analyze" button to trigger AI analysis
3. System shows loading state (1-3 seconds) simulating ML model execution
4. System displays updated optimal rate with smooth animation
5. Visual indicator shows the result is from AI analysis
6. User can re-analyze to get fresh predictions

## Data Models

### Mock Data Structure

Mock data akan disimpan dalam file TypeScript dengan struktur yang konsisten dan realistis:

```typescript
// data/mockCustomers.ts
export const mockWholesaleCustomers: WholesaleCustomer[] = [
  {
    id: 'WH001',
    name: 'PT Astra International Tbk',
    segment: 'Corporate',
    currentBalance: 5_750_000_000_000, // 5.75 Triliun
    currentRate: 4.5,
    recommendedRate: 3.8,
    sensitivity: 'Low',
    churnRisk: 12,
    confidenceScore: 94,
    projectedSavings: 40_250_000_000, // 40.25 Miliar/tahun
    lastUpdated: new Date('2025-11-08'),
  },
  // ... 20-30 more realistic customers
];

// data/mockSegments.ts
export const mockRetailSegments: RetailSegment[] = [
  {
    id: 'RS001',
    name: 'Premium Tier',
    balanceTier: '>100M',
    customerCount: 1_250,
    totalBalance: 187_500_000_000, // 187.5 Miliar
    currentRate: 5.5,
    recommendedRate: 4.8,
    avgSensitivity: 45,
    churnRisk: 28,
    retentionRate: 92,
    projectedSavings: 1_312_500_000, // 1.31 Miliar/tahun
  },
  // ... more segments
];

// data/mockTimeSeries.ts
export const mockSavingsTrend = [
  { month: 'Mei 2025', actual: 12_500_000_000, projected: 15_200_000_000 },
  { month: 'Jun 2025', actual: 14_800_000_000, projected: 18_500_000_000 },
  // ... 12 months of data
];
```

### Data Service Layer

```typescript
// services/dataService.ts
export interface IDataService {
  getWholesaleCustomers(segment?: string): Promise<WholesaleCustomer[]>;
  getRetailSegments(): Promise<RetailSegment[]>;
  getKPIMetrics(role: 'TBW' | 'RDPS'): Promise<KPIMetrics>;
  getRecommendations(customerId: string): Promise<Recommendation[]>;
  simulateScenario(params: SimulationParams): Promise<Scenario>;
  getSavingsTrend(): Promise<TimeSeriesData[]>;
  analyzeCustomer(customerId: string): Promise<WholesaleCustomer>;
  analyzeSegment(segmentId: string): Promise<RetailSegment>;
}

// services/mockDataService.ts
export class MockDataService implements IDataService {
  // Implements all methods using mock data
  // Adds realistic delays (100-300ms) to simulate API calls
  // Returns deep copies to prevent mutation
  
  // analyzeCustomer: Simulates ML model execution
  // - Adds 1-3 second delay to simulate processing
  // - Slightly adjusts recommendedRate (±0.1-0.3%)
  // - Updates churnRisk and projectedSavings accordingly
  // - Sets isAnalyzed flag to true
  // - Returns updated customer data
  
  // analyzeSegment: Simulates ML model execution for segments
  // - Adds 1-3 second delay to simulate processing
  // - Slightly adjusts recommendedRate (±0.1-0.3%)
  // - Updates churnRisk, retentionRate, and projectedSavings
  // - Sets isAnalyzed flag to true
  // - Returns updated segment data
}

// services/apiService.ts (future)
export class APIService implements IDataService {
  // Will implement actual API calls
  // Can be swapped with MockDataService via config
}
```

## Error Handling

### Error Boundaries

```typescript
// components/shared/ErrorBoundary.tsx
// Catches React errors and displays fallback UI
// Logs errors for debugging
// Provides "Try Again" action
```

### Loading States

```typescript
// components/shared/LoadingState.tsx
// Skeleton loaders for cards and tables
// Spinner for full-page loading
// Shimmer effect for smooth UX
```

### Error States

```typescript
// Empty states for no data
// Error messages for failed operations
// Retry mechanisms for transient failures
```

## Testing Strategy

### Unit Testing

- **Test Framework**: Vitest
- **Component Testing**: React Testing Library
- **Coverage Target**: 70%+ for critical business logic

**Priority Test Areas:**
1. Data formatters (currency, percentage)
2. Calculation utilities (savings, churn risk)
3. Custom hooks (useCustomers, useSimulator)
4. Data service layer

### Integration Testing

- Test component interactions
- Test data flow from service to UI
- Test routing and navigation

### Manual Testing Checklist

1. Visual regression testing on different screen sizes
2. Cross-browser testing (Chrome, Firefox, Safari, Edge)
3. Accessibility testing with screen readers
4. Performance testing (Lighthouse scores)
5. Demo scenario walkthrough

## UI/UX Design

### Color Palette

```typescript
// Tailwind config - Professional banking theme
const colors = {
  primary: {
    50: '#eff6ff',   // Light blue
    500: '#3b82f6',  // Main blue
    700: '#1d4ed8',  // Dark blue
  },
  success: {
    500: '#10b981',  // Green for positive metrics
  },
  warning: {
    500: '#f59e0b',  // Orange for medium risk
  },
  danger: {
    500: '#ef4444',  // Red for high risk
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    800: '#1f2937',
    900: '#111827',
  },
};
```

### Typography

- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular/medium weights
- **Numbers**: Tabular numbers for alignment
- **Hierarchy**: Clear size differentiation (text-3xl, text-xl, text-base, text-sm)

### Layout Patterns

#### Dashboard Layout
```
┌─────────────────────────────────────────────────────────┐
│  Header (Role Switcher, User Profile)                   │
├──────┬──────────────────────────────────────────────────┤
│      │  KPI Cards (4 columns)                           │
│ Side │  ┌────┐ ┌────┐ ┌────┐ ┌────┐                    │
│ bar  │  │DPK │ │Rate│ │Save│ │Risk│                    │
│      │  └────┘ └────┘ └────┘ └────┘                    │
│ Nav  │                                                   │
│      │  Charts Section (2 columns)                      │
│      │  ┌─────────────────┐ ┌─────────────────┐        │
│      │  │ Sensitivity     │ │ Savings Trend   │        │
│      │  │ Distribution    │ │ Chart           │        │
│      │  └─────────────────┘ └─────────────────┘        │
└──────┴──────────────────────────────────────────────────┘
```

#### TBW View Layout
```
┌─────────────────────────────────────────────────────────┐
│  Filters & Search                                        │
├──────────────────────────────────────────────────────────┤
│  Customer List (Table)                                   │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Name | Segment | Balance | Rate | Risk | Action   │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ ...                                                │ │
│  └────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────┤
│  Selected Customer Detail (Expandable)                   │
│  ┌─────────────────┐ ┌─────────────────┐               │
│  │ Recommendation  │ │ Impact Analysis │               │
│  └─────────────────┘ └─────────────────┘               │
└──────────────────────────────────────────────────────────┘
```

### Animations & Transitions

- **Page transitions**: Fade in (200ms)
- **Card hover**: Subtle lift with shadow (150ms)
- **Number counters**: Animated count-up on load
- **Chart animations**: Smooth entry animations (500ms)
- **Modal**: Fade + scale animation (200ms)
- **Slider**: Smooth value updates with debounce

### Responsive Breakpoints

- **Desktop Large**: 1920px+ (primary target)
- **Desktop**: 1366px - 1919px (primary target)
- **Tablet**: 768px - 1365px (secondary)
- **Mobile**: < 768px (minimal support for MVP)

## Performance Considerations

### Optimization Strategies

1. **Code Splitting**: Lazy load pages with React.lazy()
2. **Memoization**: Use React.memo for expensive components
3. **Virtual Scrolling**: For large customer lists (if needed)
4. **Debouncing**: For search and slider inputs
5. **Image Optimization**: Use WebP format, lazy loading
6. **Bundle Size**: Keep initial bundle < 200KB gzipped

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: > 90
- **Bundle Size**: < 500KB total

## Deployment & Build

### Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'ui-vendor': ['@radix-ui/react-select', '@radix-ui/react-dialog'],
        },
      },
    },
  },
});
```

### Environment Configuration

```typescript
// .env.example
VITE_APP_MODE=mock          # 'mock' or 'api'
VITE_API_BASE_URL=          # For future API integration
VITE_APP_VERSION=1.0.0
```

### Deployment Options

1. **Static Hosting**: Vercel, Netlify, GitHub Pages
2. **Build Output**: Static HTML/CSS/JS files
3. **No Backend Required**: Pure frontend application
4. **Easy Integration**: Can be embedded in existing systems

## Future Extensibility

### API Integration Readiness

```typescript
// Easy switch from mock to API
const dataService = import.meta.env.VITE_APP_MODE === 'api'
  ? new APIService()
  : new MockDataService();

// All components use the same interface
// No code changes needed in components
```

### Feature Additions

- Export functionality (PDF/Excel) - can be added as separate module
- User authentication - can be added via auth provider
- Real-time updates - can use WebSocket or polling
- Advanced filtering - can extend existing filter components
- Multi-language support - can use i18n library

### Scalability Considerations

- Component library is extensible
- State management can be upgraded to Redux/Zustand if needed
- Can add backend API without frontend refactor
- Mock data structure matches expected API responses
# Implementation Plan

- [x] 1. Setup project structure and dependencies





  - Initialize Vite + React + TypeScript project
  - Install and configure Tailwind CSS
  - Install shadcn/ui CLI and initialize
  - Install required dependencies (react-router-dom, recharts, lucide-react)
  - Setup folder structure according to design (components, pages, services, data, hooks, types, utils)
  - Configure TypeScript with strict mode
  - Setup environment variables (.env files)
  - _Requirements: 8.1, 8.2_

- [x] 2. Create type definitions and data models





  - [x] 2.1 Define core TypeScript interfaces


    - Create types/customer.ts with WholesaleCustomer interface
    - Create types/segment.ts with RetailSegment interface
    - Create types/metrics.ts with KPIMetrics interface
    - Create types/recommendation.ts with Recommendation interface
    - Create types/scenario.ts with Scenario interface
    - _Requirements: 1.1, 2.1, 3.1, 4.1_


  - [x] 2.2 Create mock data files with realistic Indonesian banking data

    - Create data/mockCustomers.ts with 20-30 wholesale customers (Corporate, Commercial, GVI, SME segments)
    - Include realistic company names, balance amounts (hundreds of millions to trillions IDR), interest rates (2-8%)
    - Create data/mockSegments.ts with retail segments grouped by balance tiers
    - Create data/mockMetrics.ts with KPI data (total DPK, average rates, projected savings)
    - Create data/mockTimeSeries.ts with 12 months historical trend data
    - Ensure data consistency across all mock files (totals match aggregated values)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8_

- [x] 3. Implement data service layer






  - [x] 3.1 Create data service interfaces and implementations

    - Create services/dataService.ts with IDataService interface
    - Implement services/mockDataService.ts with all methods using mock data
    - Add realistic delays (100-300ms) to simulate API calls
    - Create services/apiService.ts stub for future API integration
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 3.2 Create utility functions


    - Create utils/formatters.ts for currency (IDR) and percentage formatting
    - Create utils/calculations.ts for business logic (savings, churn risk calculations)
    - Create utils/constants.ts for app-wide constants
    - _Requirements: 1.4, 2.4, 4.3, 4.4_

- [x] 4. Setup shadcn/ui base components





  - Install and configure shadcn/ui components: button, card, badge, select, dialog, table, tabs, slider
  - Create lib/utils.ts with cn() utility function
  - Customize Tailwind config with banking color palette (primary blue, success green, warning orange, danger red)
  - Configure typography with Inter font family
  - _Requirements: 5.1, 5.6_

- [ ] 5. Build layout components






  - [x] 5.1 Create main layout structure

    - Create components/layout/AppLayout.tsx with sidebar and main content area
    - Create components/layout/Header.tsx with role switcher and user profile indicator
    - Create components/layout/Sidebar.tsx with navigation menu
    - Implement responsive layout for desktop (1920px and 1366px)
    - _Requirements: 5.5, 7.1, 7.4_


  - [x] 5.2 Create shared utility components

    - Create components/shared/RoleSwitcher.tsx for switching between TBW and RDPS views
    - Create components/shared/LoadingState.tsx with skeleton loaders
    - Create components/shared/ErrorBoundary.tsx for error handling
    - _Requirements: 7.1, 7.2, 7.3, 8.4_

- [x] 6. Implement dashboard page components




  - [x] 6.1 Create KPI cards component


    - Create components/dashboard/KPICards.tsx displaying 4 KPI metrics
    - Show total DPK, average interest rate, projected savings, high-risk count
    - Add animated number counters and trend indicators
    - Use color-coded styling based on performance
    - _Requirements: 5.2_

  - [x] 6.2 Create visualization chart components


    - Create components/dashboard/SensitivityChart.tsx with donut/pie chart using Recharts
    - Create components/dashboard/SavingsChart.tsx with line/area chart for trend analysis
    - Add interactive tooltips and legends
    - Implement smooth entry animations
    - _Requirements: 5.3, 5.4, 5.6_

  - [x] 6.3 Create dashboard page


    - Create pages/DashboardPage.tsx as main landing page
    - Integrate KPICards and chart components
    - Add loading states and error handling
    - Implement responsive grid layout
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 7. Implement TBW view components






  - [x] 7.1 Create wholesale customer list component

    - Create components/tbw/WholesaleCustomerList.tsx with table display
    - Add filtering by segment (Corporate, Commercial, GVI, SME) using dropdown/tabs
    - Add search functionality for customer names
    - Add sortable columns
    - Display color-coded sensitivity badges (Low/Medium/High)
    - _Requirements: 1.1, 1.6_


  - [x] 7.2 Create customer detail and recommendation components

    - Create components/tbw/CustomerDetailCard.tsx showing selected customer details
    - Display recommended interest rate with visual indicators
    - Show churn risk percentage with color-coded visualization (green/yellow/red)
    - Display projected cost of funds savings in IDR format
    - Show confidence score with progress bar or gauge
    - Create components/tbw/RecommendationCard.tsx with actionable recommendations
    - Display recommendation title, description, and rationale
    - Add priority badges (High/Medium/Low) and confidence indicators
    - Implement modal/expanded view for detailed rationale on click
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 6.1, 6.2, 6.4, 6.5_

  - [x] 7.3 Create TBW page


    - Create pages/TBWPage.tsx integrating all TBW components
    - Implement customer selection logic
    - Add loading and error states
    - Apply TBW-specific color theme
    - _Requirements: 1.1, 7.2, 7.5_

- [x] 8. Implement RDPS view components




  - [x] 8.1 Create retail segment list component


    - Create components/rdps/RetailSegmentList.tsx displaying segments
    - Group segments by balance tier (<10M, 10M-50M, 50M-100M, >100M)
    - Display customer count and total balance per segment
    - Show current vs recommended rates
    - _Requirements: 2.1, 2.2_

  - [x] 8.2 Create segment detail and analysis components


    - Create components/rdps/SegmentDetailCard.tsx for selected segment
    - Display adaptive interest rate recommendations with visual charts
    - Create components/rdps/ChurnHeatmap.tsx for churn risk analysis using bar charts or heatmap
    - Show expected retention rate percentage with visual indicators
    - _Requirements: 2.3, 2.4, 2.5_

  - [x] 8.3 Create RDPS page


    - Create pages/RDPSPage.tsx integrating all RDPS components
    - Implement segment selection logic
    - Add loading and error states
    - Apply RDPS-specific color theme
    - _Requirements: 2.1, 7.3, 7.5_

- [x] 9. Implement what-if simulator




  - [x] 9.1 Create simulator interface components


    - Create components/simulator/InterestRateSlider.tsx with interactive slider/input field
    - Add debouncing for smooth performance
    - Display current value and adjustment percentage
    - _Requirements: 4.2_

  - [x] 9.2 Create scenario comparison components


    - Create components/simulator/ScenarioComparison.tsx with side-by-side card layout
    - Display baseline, optimistic, and pessimistic scenarios
    - Show projected churn risk for each scenario with visualization
    - Show projected cost of funds impact for each scenario
    - Add smooth animations for value updates
    - _Requirements: 4.3, 4.4, 4.5, 4.6_

  - [x] 9.3 Create simulator page


    - Create pages/SimulatorPage.tsx integrating simulator components
    - Create components/simulator/WhatIfSimulator.tsx as main simulator interface
    - Implement real-time calculation logic using utils/calculations.ts
    - Add reset and save scenario functionality
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 10. Implement custom hooks for data fetching





  - Create hooks/useCustomers.ts for fetching wholesale customers with filtering
  - Create hooks/useSegments.ts for fetching retail segments
  - Create hooks/useMetrics.ts for fetching KPI metrics based on role
  - Create hooks/useRecommendations.ts for fetching recommendations
  - Create hooks/useSimulator.ts for simulator calculations
  - Create hooks/useRole.ts for managing current role state (TBW/RDPS)
  - Add loading and error states to all hooks
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 7.1, 8.4_

- [x] 11. Setup routing and navigation





  - Configure React Router in App.tsx with routes for all pages
  - Create route definitions: / (Dashboard), /tbw (TBW View), /rdps (RDPS View), /simulator (What-if)
  - Implement navigation in Sidebar component with active state indicators
  - Add page transitions with fade animations
  - _Requirements: 5.6, 7.1_

- [x] 12. Implement model performance visualization





  - Create components/dashboard/ModelPerformance.tsx section
  - Display mock performance metrics (accuracy, precision, recall) using gauge charts or metric cards
  - Create trend chart showing model performance over time using mock data
  - Display last update timestamp
  - Use modern, professional visualization components
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 13. Add warning indicators and alerts





  - Implement alert icons for significant rate changes in recommendation cards
  - Add warning colors (orange/red) for high churn risk
  - Create visual badges for high-priority customers/segments
  - Add tooltips explaining risk levels
  - _Requirements: 6.2, 6.3_

- [x] 14. Polish UI/UX and animations





  - Add hover effects to cards (subtle lift with shadow, 150ms transition)
  - Implement animated number counters for KPI cards on page load
  - Add smooth chart entry animations (500ms)
  - Implement modal fade + scale animations (200ms)
  - Add page transition fade effects (200ms)
  - Ensure all interactive elements have proper focus states for accessibility
  - _Requirements: 5.6_

- [x] 15. Implement configuration for mock/API mode toggle





  - Create config/dataConfig.ts to manage data source selection
  - Read VITE_APP_MODE from environment variables
  - Implement conditional data service initialization (mock vs API)
  - Add UI indicator showing current mode (development only)
  - _Requirements: 8.2, 8.3, 8.5_

- [x] 16. Final integration and testing





  - Test all pages and navigation flows
  - Verify data consistency across all views
  - Test role switching functionality
  - Verify all mock data displays correctly with proper formatting
  - Test responsive layout on 1920x1080 and 1366x768 resolutions
  - Test what-if simulator calculations and real-time updates
  - Verify all charts render correctly with mock data
  - Test loading states and error handling
  - Check accessibility (keyboard navigation, ARIA labels)
  - Run Lighthouse audit and optimize for >90 score
  - _Requirements: All requirements_

- [x] 17. Implement interactive analyze feature for AI-suggested optimal rates



  - [x] 17.1 Add analyze methods to data service layer


    - Add analyzeCustomer() method to IDataService interface
    - Add analyzeSegment() method to IDataService interface
    - Implement analyzeCustomer() in MockDataService with 1-3 second delay
    - Implement analyzeSegment() in MockDataService with 1-3 second delay
    - Add logic to slightly adjust recommendedRate (±0.1-0.3%) and update related metrics
    - Set isAnalyzed flag to true in returned data
    - _Requirements: 10.2, 10.3, 10.6_
  
  - [x] 17.2 Add "Analyze" button to CustomerDetailCard component


    - Add "Analyze" button below the recommended rate section
    - Implement loading state with spinner when analyzing
    - Call analyzeCustomer() service method on button click
    - Update customer data with analyzed results
    - Add "AI Analyzed" badge to show analysis has been performed
    - Add smooth animation when results are revealed
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [x] 17.3 Add "Analyze" button to SegmentDetailCard component


    - Add "Analyze" button below the recommended rate section
    - Implement loading state with spinner when analyzing
    - Call analyzeSegment() service method on button click
    - Update segment data with analyzed results
    - Add "AI Analyzed" badge to show analysis has been performed
    - Add smooth animation when results are revealed
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 18. Build and deployment preparation
  - Configure vite.config.ts for production build optimization
  - Setup code splitting and manual chunks for vendors
  - Create .env.example file with configuration documentation
  - Build production bundle and verify bundle size (<500KB)
  - Test production build locally
  - Create deployment documentation (README.md)
  - _Requirements: 8.1, 8.2_
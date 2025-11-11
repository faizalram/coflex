# Implementation Plan

- [x] 1. Set up theme infrastructure



  - Create ThemeContext with theme state management, localStorage persistence, and system preference detection
  - Create useTheme custom hook for accessing theme context
  - Add CSS custom properties for dark mode colors to index.css
  - Wrap App component with ThemeProvider in main.tsx


  - _Requirements: 1.3, 1.4, 3.5_

- [x] 2. Create theme toggle UI component





  - Implement ThemeToggle component with Sun/Moon icons and toggle functionality
  - Add accessibility attributes (ARIA labels, keyboard support)


  - Integrate ThemeToggle into Header component
  - Add smooth transition animations for icon changes
  - _Requirements: 1.1, 1.2_



- [x] 3. Update layout components for dark mode





  - Add dark mode styles to Header component (background, text, borders)
  - Add dark mode styles to Sidebar component (background, text, active states)
  - Add dark mode styles to AppLayout component (background, layout containers)
  - _Requirements: 2.1, 2.5_



- [x] 4. Update page components for dark mode





  - Add dark mode styles to DashboardPage component
  - Add dark mode styles to TBWPage component
  - Add dark mode styles to RDPSPage component
  - Add dark mode styles to SimulatorPage component


  - _Requirements: 2.2_

- [x] 5. Update UI components for dark mode





  - Add dark mode styles to Card component (background, borders, shadows)
  - Add dark mode styles to Table component (rows, headers, borders)
  - Add dark mode styles to Button component (variants, hover states)


  - Add dark mode styles to Badge component (background, text)
  - Add dark mode styles to Dialog, Select, Tabs, and Slider components
  - _Requirements: 2.3, 3.4_

- [x] 6. Update chart components for dark mode





  - Adjust color schemes for KPICards charts in dark mode



  - Adjust color schemes for SavingsChart in dark mode
  - Adjust color schemes for SensitivityChart in dark mode
  - Adjust color schemes for ChurnHeatmap in dark mode
  - Ensure chart text and labels are readable in dark mode
  - _Requirements: 2.4_

- [x] 7. Update feature-specific components for dark mode


  - Add dark mode styles to WholesaleCustomerList and CustomerDetailCard
  - Add dark mode styles to RetailSegmentList and SegmentDetailCard
  - Add dark mode styles to WhatIfSimulator and ScenarioComparison
  - Add dark mode styles to RecommendationCard and InterestRateSlider
  - Add dark mode styles to RoleSwitcher and DataModeIndicator
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 8. Implement accessibility features for dark mode





  - Verify contrast ratios meet WCAG 2.1 Level AA standards (4.5:1 for normal text)


  - Ensure focus indicators are visible in both light and dark modes
  - Test keyboard navigation with theme toggle
  - Add prefers-reduced-motion support for theme transitions
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 9. Create comprehensive user guide





  - Write introduction section explaining application purpose and features
  - Document getting started steps (accessing app, understanding interface, role switching)
  - Document Dashboard features (KPI cards, charts, metrics interpretation)
  - Document TBW view usage (customer list, recommendations, details)
  - Document RDPS view usage (segment list, churn heatmap, segment details)
  - Document What-if Simulator usage (creating scenarios, adjusting rates, interpreting results)
  - Add tips and best practices section
  - Create table of contents with anchor links
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 6.4, 6.5_

- [x] 10. Integrate user guide into project documentation





  - Create USER_GUIDE.md file in repository root
  - Add link to user guide in README.md
  - Ensure user guide is well-organized with clear sections
  - _Requirements: 6.1, 6.2, 6.4_
-

- [x] 11. Test dark mode implementation





  - Test theme toggle functionality across all pages
  - Test localStorage persistence and system preference detection
  - Verify all components render correctly in both themes
  - Test on different browsers (Chrome, Firefox, Safari, Edge)
  - Run accessibility audit with browser DevTools
  - _Requirements: 1.2, 1.3, 1.4, 3.1, 3.2, 3.3_

- [ ]* 12. Validate user guide accuracy
  - Walk through all user guide instructions in the application
  - Verify all described features and workflows are accurate
  - Ensure guide covers all major application features
  - Test guide with a new user for clarity
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5_

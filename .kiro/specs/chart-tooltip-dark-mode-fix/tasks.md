# Implementation Plan

- [x] 1. Update SavingsChart tooltip text colors



  - Locate the CustomTooltip component in `src/components/dashboard/SavingsChart.tsx`
  - Update the label/title text class to use `text-gray-900 dark:text-gray-100` for maximum contrast
  - Update secondary label text (entry.name) from `text-gray-600 dark:text-gray-400` to `text-gray-600 dark:text-gray-300`
  - Ensure value text uses `text-gray-900 dark:text-gray-100` for high contrast
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1_

- [x] 2. Update SensitivityChart tooltip text colors





  - Locate the CustomTooltip component in `src/components/dashboard/SensitivityChart.tsx`
  - Update the title text class to use `text-gray-900 dark:text-gray-100`
  - Update secondary text (descriptions) from `text-gray-600 dark:text-gray-400` to `text-gray-600 dark:text-gray-300`
  - Verify colored text classes remain unchanged
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.2_

- [x] 3. Update ChurnHeatmap tooltip text colors





  - Locate the CustomTooltip component in `src/components/rdps/ChurnHeatmap.tsx`
  - Update the segment name text to use `text-gray-900 dark:text-gray-100`
  - Update secondary label text from `text-gray-600 dark:text-gray-400` to `text-gray-600 dark:text-gray-300`
  - Update value text to use `text-gray-900 dark:text-gray-100`
  - Keep colored status text (red, green) unchanged as they already meet contrast requirements
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.3_

- [ ]* 4. Verify contrast ratios with accessibility tools
  - Open the application in dark mode
  - Use browser DevTools to inspect tooltip elements when hovering over charts
  - Verify computed colors meet WCAG 2.1 Level AA standards (4.5:1 minimum)
  - Run Lighthouse accessibility audit to confirm no contrast violations
  - _Requirements: 1.1, 1.2, 1.3_

- [ ]* 5. Test tooltip readability across all charts
  - Test SavingsChart tooltips in both light and dark modes
  - Test SensitivityChart tooltips in both light and dark modes
  - Test ChurnHeatmap tooltips in both light and dark modes
  - Verify text hierarchy is maintained (primary vs secondary text distinction)
  - Test theme switching while tooltip is visible
  - _Requirements: 1.4, 2.1, 2.2, 2.3_

# Implementation Plan: Light Mode Restoration

## Overview

This implementation will systematically restore light mode functionality by restructuring the CSS architecture, updating component styling, and ensuring comprehensive theme support across all application components. The approach focuses on creating balanced light and dark mode styles rather than relying on extensive dark mode overrides.

## Tasks

- [x] 1. Restructure CSS architecture for balanced theme support
  - Analyze current dark mode overrides in index.css
  - Create explicit light mode CSS classes alongside dark mode
  - Remove heavy reliance on base styles for light mode
  - Implement balanced theme-specific styling patterns
  - _Requirements: 1.1, 1.2, 2.5_

- [ ]* 1.1 Write property test for theme application completeness
  - **Property 1: Theme Application Completeness**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.5**

- [x] 2. Update Tailwind configuration for enhanced light mode support
  - Review and optimize color palette for light mode usage
  - Ensure proper contrast ratios in color definitions
  - Add light mode specific color variants where needed
  - Update CSS custom properties for light theme
  - _Requirements: 1.2, 3.1_

- [x] 3. Implement layout component light mode styling
  - [x] 3.1 Update Header component for light mode
    - Add light theme background and text colors
    - Implement proper shadows and borders for light mode
    - Ensure logo and navigation visibility in light theme
    - _Requirements: 2.1_

  - [x] 3.2 Update Sidebar component for light mode
    - Implement light background with subtle borders
    - Add light theme hover states for navigation items
    - Ensure proper contrast for active/inactive states
    - _Requirements: 2.1_

  - [x] 3.3 Update AppLayout for light mode hierarchy
    - Set proper light background hierarchy
    - Ensure container and content area styling
    - _Requirements: 2.1_

- [ ]* 3.4 Write property test for component styling consistency
  - **Property 2: Component Styling Consistency**
  - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

- [x] 4. Implement UI component light mode support
  - [x] 4.1 Update Button components for light mode
    - Add light theme variants for all button types
    - Implement proper hover and focus states
    - Ensure accessibility compliance for light theme
    - _Requirements: 2.2, 5.1_

  - [x] 4.2 Update Card components for light mode
    - Implement white/light backgrounds with subtle shadows
    - Add proper border styling for light theme
    - Ensure content readability in light cards
    - _Requirements: 2.2_

  - [x] 4.3 Update Table components for light mode
    - Add light theme row striping and hover effects
    - Implement proper header styling for light mode
    - Ensure data readability and contrast
    - _Requirements: 2.2, 5.4_

  - [x] 4.4 Update Form components for light mode
    - Implement light input backgrounds and borders
    - Add proper focus indicators for light theme
    - Ensure form validation styling works in light mode
    - _Requirements: 2.2, 5.3_

- [ ]* 4.5 Write property test for interactive feedback consistency
  - **Property 8: Interactive Feedback Consistency**
  - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

- [x] 5. Checkpoint - Ensure basic light mode functionality
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Fix remaining light mode styling gaps in page and detail components
  - [x] 6.1 Fix SimulatorPage container styling
    - Remove hardcoded `dark:bg-neutral-950` class from SimulatorPage wrapper div
    - Ensure the page container uses theme-aware background classes
    - _Requirements: 2.3_

  - [x] 6.2 Fix SegmentDetailCard light mode styling
    - Add `dark:` variants to `bg-primary-50`, `bg-green-50`, and `bg-orange-50` sections that are missing them
    - Add `dark:` text color variants to neutral text labels that lack them
    - Ensure the projected savings section and recommendation box render correctly in light mode
    - _Requirements: 2.3_

  - [x] 6.3 Fix RetailSegmentList high-priority row styling
    - Add `dark:bg-orange-950/30` to the high-priority row `bg-orange-50/50` class
    - Ensure selected row state is visible in both themes
    - _Requirements: 2.3, 5.4_

- [ ]* 6.4 Write property test for cross-page visual consistency
  - **Property 3: Cross-Page Visual Consistency**
  - **Validates: Requirements 1.4**

- [x] 7. Polish chart and data visualization light mode support
  - [x] 7.1 Verify and fix ModelPerformance chart axis colors
    - The LineChart in ModelPerformance uses `currentColor` for axis ticks and strokes — verify this resolves correctly in light mode
    - If `currentColor` does not produce sufficient contrast in light mode, replace with explicit conditional colors using `useTheme()` (matching the pattern in SavingsChart and SensitivityChart)
    - _Requirements: 2.4, 6.1, 6.2_

  - [x] 7.2 Verify chart tooltip and legend rendering in light mode
    - Confirm SavingsChart and SensitivityChart tooltips display with correct light backgrounds and dark text
    - Confirm ModelPerformance tooltip uses CSS variables that resolve correctly in light mode (`--background`, `--foreground`, `--border`)
    - _Requirements: 6.3, 6.4_

- [ ]* 7.3 Write property test for chart visualization optimization
  - **Property 9: Chart Visualization Optimization**
  - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

- [x] 8. Validate accessibility enhancements for light mode
  - [x] 8.1 Verify contrast ratios for light mode text elements
    - Confirm WCAG 2.1 AA compliance for all text in light mode using the existing `accessibilityCheck.ts` utility
    - Pay particular attention to muted/secondary text (`text-neutral-500`, `text-muted-foreground`) against light backgrounds
    - Fix any elements that fall below 4.5:1 contrast ratio for normal text or 3:1 for large text
    - _Requirements: 3.1, 3.2_

  - [x] 8.2 Verify focus indicators are visible in light mode
    - Confirm the `focus-visible` styles in `index.css` render correctly in light mode (blue outline with shadow)
    - Test focus visibility on ThemeToggle, navigation links, table rows, and form inputs
    - _Requirements: 3.2, 3.4_

- [ ]* 8.3 Write property test for accessibility compliance
  - **Property 4: Accessibility Compliance**
  - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

- [x] 9. Verify theme persistence and error handling
  - [x] 9.1 Confirm theme persistence works end-to-end
    - Verify `ThemeContext` correctly reads from `localStorage` on load and restores the saved theme
    - Confirm system preference detection (`prefers-color-scheme`) applies when no stored preference exists
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 9.2 Confirm error handling fallbacks are in place
    - Review `ThemeContext` try/catch blocks for localStorage and matchMedia failures
    - Ensure the default theme (`light`) is applied gracefully when both localStorage and system detection fail
    - _Requirements: 4.4_

- [ ]* 9.3 Write property test for theme persistence round trip
  - **Property 5: Theme Persistence Round Trip**
  - **Validates: Requirements 4.1, 4.2**

- [ ]* 9.4 Write property test for system preference detection
  - **Property 6: System Preference Detection**
  - **Validates: Requirements 4.3, 4.5**

- [ ]* 9.5 Write property test for error handling resilience
  - **Property 7: Error Handling Resilience**
  - **Validates: Requirements 4.4**

- [x] 10. Final integration verification
  - [x] 10.1 Perform end-to-end light mode verification across all pages
    - Toggle to light mode and navigate through Dashboard, TBW, RDPS, and Simulator pages
    - Verify no white-on-white or invisible text issues remain
    - Verify interactive states (hover, focus, selected rows) are visible in light mode
    - Use the existing `runLightModeVerification()` utility in `src/tests/light-mode-verification.ts`
    - _Requirements: All_

  - [x] 10.2 Verify theme toggle transitions are smooth
    - Confirm switching between light and dark mode updates all components immediately without a page refresh
    - Confirm the ThemeToggle icon animation (Moon/Sun swap) works correctly
    - _Requirements: 1.3, 1.5_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation of light mode functionality
- Property tests validate universal correctness properties across theme states
- Tasks 6–9 are scoped to targeted fixes and verification — the bulk of the implementation was completed in tasks 1–5
- Focus on the specific gaps identified: SimulatorPage container, SegmentDetailCard dark variants, RetailSegmentList row styling, and ModelPerformance chart axis colors

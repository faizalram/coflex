# Requirements Document

## Introduction

This specification addresses a dark mode accessibility issue where chart tooltip text becomes difficult to read when hovering over graphics. The tooltip text colors (gray-600/gray-400) do not provide sufficient contrast against the dark tooltip background, violating WCAG 2.1 Level AA contrast requirements.

## Glossary

- **Chart Tooltip**: The floating information box that appears when hovering over chart elements (bars, areas, pie slices)
- **Contrast Ratio**: The luminance difference between foreground text and background, measured as a ratio (e.g., 4.5:1)
- **WCAG 2.1 Level AA**: Web Content Accessibility Guidelines requiring minimum 4.5:1 contrast ratio for normal text
- **CustomTooltip Component**: The React component that renders tooltip content in chart components

## Requirements

### Requirement 1

**User Story:** As a user viewing charts in dark mode, I want tooltip text to be clearly readable when I hover over chart elements, so that I can understand the data without straining my eyes.

#### Acceptance Criteria

1. WHEN a user hovers over a chart element in dark mode, THE CustomTooltip Component SHALL display label text with a minimum contrast ratio of 4.5:1 against the tooltip background
2. WHEN a user hovers over a chart element in dark mode, THE CustomTooltip Component SHALL display value text with a minimum contrast ratio of 4.5:1 against the tooltip background
3. WHEN a user hovers over a chart element in dark mode, THE CustomTooltip Component SHALL display secondary text with a minimum contrast ratio of 4.5:1 against the tooltip background
4. WHEN a user hovers over a chart element in light mode, THE CustomTooltip Component SHALL maintain existing contrast ratios that meet WCAG 2.1 Level AA standards

### Requirement 2

**User Story:** As a developer maintaining the application, I want consistent tooltip styling across all chart components, so that the user experience is uniform and maintainable.

#### Acceptance Criteria

1. THE SavingsChart Component SHALL use consistent text color classes for tooltip content that meet contrast requirements in both light and dark modes
2. THE SensitivityChart Component SHALL use consistent text color classes for tooltip content that meet contrast requirements in both light and dark modes
3. THE ChurnHeatmap Component SHALL use consistent text color classes for tooltip content that meet contrast requirements in both light and dark modes
4. THE ModelPerformance Component SHALL use consistent text color classes for tooltip content that meet contrast requirements in both light and dark modes (if applicable)

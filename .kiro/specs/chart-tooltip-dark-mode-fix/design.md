# Design Document

## Overview

This design addresses the dark mode accessibility issue where chart tooltip text becomes difficult to read due to insufficient contrast. The current implementation uses `text-gray-600 dark:text-gray-400` for secondary text in tooltips, which provides only marginal contrast against the dark tooltip background (`dark:bg-neutral-800`). This violates WCAG 2.1 Level AA standards.

The solution involves updating text color classes in CustomTooltip components across all chart implementations to use higher contrast colors that meet accessibility standards while maintaining visual hierarchy.

## Architecture

### Affected Components

1. **SavingsChart** (`src/components/dashboard/SavingsChart.tsx`)
   - CustomTooltip component with label and value text
   
2. **SensitivityChart** (`src/components/dashboard/SensitivityChart.tsx`)
   - CustomTooltip component with sensitivity data
   
3. **ChurnHeatmap** (`src/components/rdps/ChurnHeatmap.tsx`)
   - CustomTooltip component with segment details
   
4. **ModelPerformance** (`src/components/dashboard/ModelPerformance.tsx`)
   - Uses Recharts default tooltip with CSS custom properties (already accessible)

### Color Contrast Analysis

#### Current Implementation Issues

| Element | Current Class | Dark Mode Color | Background | Contrast Ratio | WCAG AA Pass |
|---------|--------------|-----------------|------------|----------------|--------------|
| Secondary text | `text-gray-600 dark:text-gray-400` | #9ca3af | #262626 | ~3.5:1 | ❌ Fail |
| Label text | `text-gray-600 dark:text-gray-400` | #9ca3af | #262626 | ~3.5:1 | ❌ Fail |

#### Proposed Solution

| Element | New Class | Dark Mode Color | Background | Contrast Ratio | WCAG AA Pass |
|---------|-----------|-----------------|------------|----------------|--------------|
| Primary text | `text-gray-900 dark:text-gray-100` | #f3f4f6 | #262626 | ~12:1 | ✅ Pass |
| Secondary text | `text-gray-600 dark:text-gray-300` | #d1d5db | #262626 | ~7:1 | ✅ Pass |

## Components and Interfaces

### CustomTooltip Component Pattern

Each chart component implements a CustomTooltip component that follows this pattern:

```tsx
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700">
        {/* Title/Label - Primary text */}
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </p>
        
        {/* Data items - Secondary text for labels, Primary for values */}
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 dark:text-gray-300">{entry.name}:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {formatValue(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
```

### Text Hierarchy

1. **Primary Text** (Titles, Values, Important Data)
   - Light mode: `text-gray-900` (#171717)
   - Dark mode: `text-gray-100` (#f3f4f6)
   - Use for: Tooltip titles, data values, emphasized content

2. **Secondary Text** (Labels, Descriptions, Metadata)
   - Light mode: `text-gray-600` (#525252)
   - Dark mode: `text-gray-300` (#d1d5db)
   - Use for: Field labels, descriptions, supplementary information

3. **Colored Text** (Status indicators, special values)
   - Maintain existing color classes (e.g., `text-red-600 dark:text-red-400`)
   - These already have sufficient contrast

## Data Models

No data model changes required. This is purely a styling update.

## Error Handling

No error handling changes required. The fix involves only CSS class updates.

## Testing Strategy

### Manual Testing

1. **Visual Inspection**
   - Open each chart component in dark mode
   - Hover over chart elements to display tooltips
   - Verify all text is clearly readable
   - Check that visual hierarchy is maintained

2. **Contrast Verification**
   - Use browser DevTools to inspect tooltip elements
   - Verify computed colors meet WCAG AA standards
   - Test with different zoom levels (100%, 125%, 150%)

3. **Cross-browser Testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Verify consistent rendering across browsers

### Automated Testing

1. **Accessibility Audit**
   - Run Lighthouse accessibility audit
   - Run axe DevTools scan
   - Verify no contrast violations reported

2. **Visual Regression Testing** (Optional)
   - Capture screenshots of tooltips before/after
   - Compare to ensure only color changes, no layout shifts

### Test Cases

| Test Case | Expected Result |
|-----------|----------------|
| Hover over SavingsChart in dark mode | Tooltip text clearly readable with high contrast |
| Hover over SensitivityChart in dark mode | Tooltip text clearly readable with high contrast |
| Hover over ChurnHeatmap in dark mode | Tooltip text clearly readable with high contrast |
| Hover over charts in light mode | No visual changes, existing contrast maintained |
| Switch theme while tooltip visible | Tooltip colors update smoothly |

## Implementation Notes

### Files to Modify

1. `src/components/dashboard/SavingsChart.tsx`
   - Update CustomTooltip text classes
   
2. `src/components/dashboard/SensitivityChart.tsx`
   - Update CustomTooltip text classes
   
3. `src/components/rdps/ChurnHeatmap.tsx`
   - Update CustomTooltip text classes

### Specific Changes

For each CustomTooltip component:

1. **Title/Label text**: Change from `text-gray-900 dark:text-gray-100` (if not already) to ensure consistency
2. **Secondary labels**: Change from `text-gray-600 dark:text-gray-400` to `text-gray-600 dark:text-gray-300`
3. **Value text**: Ensure uses `text-gray-900 dark:text-gray-100` for maximum contrast
4. **Colored status text**: Keep existing classes (already accessible)

### Backward Compatibility

This change is purely visual and does not affect:
- Component APIs
- Data structures
- Event handlers
- Functionality

The fix is backward compatible and requires no migration.

## Design Decisions and Rationales

### Decision 1: Use gray-300 instead of gray-200 for secondary text

**Rationale**: 
- `gray-300` (#d1d5db) provides ~7:1 contrast ratio against dark backgrounds
- `gray-200` would provide even higher contrast but reduces visual hierarchy
- `gray-300` maintains clear distinction between primary and secondary text while meeting accessibility standards

### Decision 2: Keep colored text classes unchanged

**Rationale**:
- Existing colored text (red, green, orange) already uses appropriate dark mode variants
- These colors are semantic (red for risk, green for positive) and should remain consistent
- Current contrast ratios for colored text already meet WCAG AA standards

### Decision 3: Apply consistent pattern across all tooltips

**Rationale**:
- Consistency improves user experience
- Easier to maintain and update in the future
- Reduces cognitive load for users switching between different charts

### Decision 4: No changes to ModelPerformance tooltip

**Rationale**:
- ModelPerformance uses Recharts default tooltip with CSS custom properties
- Already uses `var(--foreground)` which automatically adapts to theme
- Contrast is already compliant with WCAG AA standards

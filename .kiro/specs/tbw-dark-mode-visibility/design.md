# Design Document

## Overview

This design addresses dark mode visibility issues in the TBW view where several UI elements use light-only backgrounds that don't adapt to dark mode. The issues affect:

1. **High priority customer highlighting** - Uses `bg-orange-50/50` without dark mode variant
2. **Selected customer state** - Uses `bg-neutral-100` in dark mode which has poor contrast
3. **CustomerDetailCard sections** - Multiple sections use light backgrounds (green-50, orange-50, neutral-200) without dark mode variants

The solution involves adding appropriate dark mode color classes to all affected elements while maintaining semantic meaning and visual hierarchy.

## Architecture

### Affected Components

1. **WholesaleCustomerList** (`src/components/tbw/WholesaleCustomerList.tsx`)
   - High priority customer row highlighting
   
2. **Table Component** (`src/components/ui/table.tsx`)
   - Selected row state styling
   
3. **CustomerDetailCard** (`src/components/tbw/CustomerDetailCard.tsx`)
   - Recommended rate section background
   - Projected savings section background
   - Churn risk progress bar background
   - Confidence score progress bar background
   - Sensitivity badge section border and background

### Color Contrast Analysis

#### Current Implementation Issues

| Element | Current Class | Dark Mode Issue | Light Mode Color |
|---------|--------------|-----------------|------------------|
| High priority row | `bg-orange-50/50` | No dark variant, invisible | #fff7ed/50% |
| Selected row | `data-[state=selected]:bg-neutral-100` | Poor contrast (#f5f5f5 on #1A1A1A) | #f5f5f5 |
| Recommended rate section | `bg-primary-50` | No dark variant | #eff6ff |
| Savings section (positive) | `bg-green-50` | No dark variant | #f0fdf4 |
| Savings section (negative) | `bg-orange-50` | No dark variant | #fffbeb |
| Progress bar background | `bg-neutral-200` | No dark variant | #e5e5e5 |
| Sensitivity section | `border-neutral-200` | No dark variant | #e5e5e5 |

#### Proposed Solution

| Element | New Class | Dark Mode Color | Light Mode Color | Semantic Meaning |
|---------|-----------|-----------------|------------------|------------------|
| High priority row | `bg-orange-50/50 dark:bg-orange-950/30` | #7c2d12/30% | #fff7ed/50% | Warning/attention |
| Selected row | `data-[state=selected]:bg-neutral-100 dark:data-[state=selected]:bg-highlight` | #2E3A4E | #f5f5f5 | Selection |
| Recommended rate section | `bg-primary-50 dark:bg-primary-950/30` | #1e3a8a/30% | #eff6ff | Information |
| Savings section (positive) | `bg-green-50 dark:bg-green-950/30` | #064e3b/30% | #f0fdf4 | Success/savings |
| Savings section (negative) | `bg-orange-50 dark:bg-orange-950/30` | #78350f/30% | #fffbeb | Warning/cost |
| Progress bar background | `bg-neutral-200 dark:bg-neutral-800` | #262626 | #e5e5e5 | Neutral container |
| Sensitivity section | `border-neutral-200 dark:border-neutral-700` | #404040 | #e5e5e5 | Neutral border |

## Components and Interfaces

### 1. WholesaleCustomerList - High Priority Row

**Current Implementation:**
```tsx
<TableRow
  className={`cursor-pointer ${highPriority ? 'bg-orange-50/50' : ''}`}
  // ...
>
```

**Updated Implementation:**
```tsx
<TableRow
  className={`cursor-pointer ${highPriority ? 'bg-orange-50/50 dark:bg-orange-950/30' : ''}`}
  // ...
>
```

**Rationale:**
- Uses orange-950 (very dark orange) with 30% opacity for dark mode
- Maintains semantic "warning/attention" color while being visible
- Lower opacity (30%) prevents overwhelming the dark theme

### 2. Table Component - Selected State

**Current Implementation:**
```tsx
className={cn(
  "border-b border-neutral-200 dark:border-border transition-colors hover:bg-neutral-50 dark:hover:bg-background-elevated data-[state=selected]:bg-neutral-100 dark:data-[state=selected]:bg-highlight focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-inset",
  className
)}
```

**Analysis:**
The selected state already has `dark:data-[state=selected]:bg-highlight` which uses the custom `highlight` color (#2E3A4E). This should provide good contrast. However, we need to verify this is working correctly.

**Action:**
No changes needed - the dark mode styling is already present. This may be a CSS specificity issue or the class isn't being applied correctly.

### 3. CustomerDetailCard - Recommended Rate Section

**Current Implementation:**
```tsx
<div className="rounded-lg border-2 border-primary-200 bg-primary-50 p-4">
```

**Updated Implementation:**
```tsx
<div className="rounded-lg border-2 border-primary-200 dark:border-primary-900 bg-primary-50 dark:bg-primary-950/30 p-4">
```

**Text Color Updates:**
```tsx
<div className="text-sm font-medium text-primary-900">
  Recommended Interest Rate
</div>
```

Should become:
```tsx
<div className="text-sm font-medium text-primary-900 dark:text-primary-100">
  Recommended Interest Rate
</div>
```

### 4. CustomerDetailCard - Projected Savings Section

**Current Implementation:**
```tsx
<div className={`rounded-lg p-4 ${isRateDecrease ? 'bg-green-50' : 'bg-orange-50'}`}>
  <div className="text-sm font-medium text-neutral-700">
    Projected Annual Savings
  </div>
  <div className={`mt-1 text-2xl font-bold ${isRateDecrease ? 'text-emerald-700' : 'text-amber-600'}`}>
    {/* ... */}
  </div>
  <div className="mt-1 text-xs text-neutral-600">
    Based on recommended rate adjustment
  </div>
</div>
```

**Updated Implementation:**
```tsx
<div className={`rounded-lg p-4 ${
  isRateDecrease 
    ? 'bg-green-50 dark:bg-green-950/30' 
    : 'bg-orange-50 dark:bg-orange-950/30'
}`}>
  <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
    Projected Annual Savings
  </div>
  <div className={`mt-1 text-2xl font-bold ${
    isRateDecrease 
      ? 'text-emerald-700 dark:text-emerald-400' 
      : 'text-amber-600 dark:text-amber-400'
  }`}>
    {/* ... */}
  </div>
  <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
    Based on recommended rate adjustment
  </div>
</div>
```

### 5. CustomerDetailCard - Progress Bars

**Current Implementation (Churn Risk):**
```tsx
<div className="relative">
  <div className="h-8 w-full overflow-hidden rounded-lg bg-neutral-200">
    <div className={`h-full transition-all duration-500 ${/* colored fill */}`} />
  </div>
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-sm font-bold text-neutral-900">
      {formatPercentage(displayCustomer.churnRisk, 0)}
    </span>
  </div>
</div>
```

**Updated Implementation:**
```tsx
<div className="relative">
  <div className="h-8 w-full overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
    <div className={`h-full transition-all duration-500 ${/* colored fill */}`} />
  </div>
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
      {formatPercentage(displayCustomer.churnRisk, 0)}
    </span>
  </div>
</div>
```

**Same pattern applies to Confidence Score progress bar.**

### 6. CustomerDetailCard - Sensitivity Section

**Current Implementation:**
```tsx
<div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-neutral-700">
      Rate Sensitivity
    </span>
    {/* ... */}
  </div>
  {/* ... */}
</div>
```

**Updated Implementation:**
```tsx
<div className="flex items-center justify-between rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent dark:bg-neutral-900/30 p-3">
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
      Rate Sensitivity
    </span>
    {/* ... */}
  </div>
  {/* ... */}
</div>
```

## Data Models

No data model changes required. This is purely a styling update.

## Error Handling

No error handling changes required. The fix involves only CSS class updates.

## Testing Strategy

### Manual Testing

1. **High Priority Customer Highlighting**
   - Open TBW view in dark mode
   - Identify customers with balance > 1T and churn risk > 30%
   - Verify orange background is visible and provides good contrast
   - Switch to light mode and verify existing orange highlight remains

2. **Selected Customer State**
   - Open TBW view in dark mode
   - Click on different customers
   - Verify selected row has clearly visible background (highlight color #2E3A4E)
   - Verify text remains readable
   - Switch to light mode and verify selection works

3. **Customer Detail Card Sections**
   - Select a customer in dark mode
   - Verify recommended rate section has visible blue background
   - Verify projected savings section has visible green/orange background
   - Verify progress bars have visible backgrounds
   - Verify sensitivity section has visible border
   - Check all text is readable with good contrast
   - Switch to light mode and verify no visual regressions

### Automated Testing

1. **Accessibility Audit**
   - Run Lighthouse accessibility audit on TBW page in dark mode
   - Verify no contrast violations reported
   - Run axe DevTools scan

2. **Visual Regression Testing** (Optional)
   - Capture screenshots of TBW page before/after in both modes
   - Compare to ensure only color changes, no layout shifts

### Test Cases

| Test Case | Expected Result |
|-----------|----------------|
| High priority customer in dark mode | Orange background visible with good contrast |
| Selected customer in dark mode | Highlight background (#2E3A4E) clearly visible |
| Recommended rate section in dark mode | Blue background visible, text readable |
| Positive savings in dark mode | Green background visible, text readable |
| Negative savings in dark mode | Orange background visible, text readable |
| Progress bars in dark mode | Dark gray background visible, percentage readable |
| Sensitivity section in dark mode | Border visible, text readable |
| All elements in light mode | No visual changes from current implementation |

## Implementation Notes

### Files to Modify

1. `src/components/tbw/WholesaleCustomerList.tsx`
   - Update high priority row background class
   
2. `src/components/ui/table.tsx`
   - Verify selected state dark mode class is correct (may not need changes)
   
3. `src/components/tbw/CustomerDetailCard.tsx`
   - Update recommended rate section background and border
   - Update projected savings section background and text colors
   - Update churn risk progress bar background and text
   - Update confidence score progress bar background and text
   - Update sensitivity section border and background

### Color Opacity Strategy

For dark mode backgrounds, we use low opacity (30%) on dark color variants (950 shades) to:
- Maintain semantic color meaning
- Prevent overwhelming the dark theme
- Ensure text contrast remains high
- Create subtle visual hierarchy

### Backward Compatibility

This change is purely visual and does not affect:
- Component APIs
- Data structures
- Event handlers
- Functionality

The fix is backward compatible and requires no migration.

## Design Decisions and Rationales

### Decision 1: Use 950 shades with 30% opacity for colored backgrounds

**Rationale:**
- 950 shades are the darkest variants in Tailwind's color palette
- 30% opacity provides subtle color hint without overwhelming
- Maintains semantic meaning (orange = warning, green = success, blue = info)
- Ensures text contrast remains high

### Decision 2: Use neutral-800 for progress bar backgrounds

**Rationale:**
- neutral-800 (#262626) provides clear container definition
- Matches the dark theme's surface color scheme
- Provides sufficient contrast for colored fill bars
- Maintains visual consistency with other card elements

### Decision 3: Keep selected state using highlight color

**Rationale:**
- The highlight color (#2E3A4E) is already defined in the theme
- Provides good contrast against background-surface (#1A1A1A)
- Distinct from hover state (background-elevated #232323)
- No changes needed if already implemented correctly

### Decision 4: Add subtle background to sensitivity section in dark mode

**Rationale:**
- Adds visual weight to match light mode appearance
- neutral-900/30 provides subtle container feel
- Maintains consistency with other card sections
- Improves visual hierarchy

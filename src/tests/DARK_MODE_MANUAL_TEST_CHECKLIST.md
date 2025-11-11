# Dark Mode Manual Testing Checklist

Use this checklist to manually verify dark mode functionality in different browsers.

## Pre-Test Setup
- [ ] Clear browser localStorage
- [ ] Reset system theme preference to light mode
- [ ] Open browser DevTools (F12)

## Test 1: Initial Load and System Preference

### Light System Preference
- [ ] Set OS to light mode
- [ ] Clear localStorage
- [ ] Load application
- [ ] **Expected**: App loads in light mode
- [ ] **Verify**: Check `localStorage.getItem('theme-preference')` = 'light'

### Dark System Preference
- [ ] Set OS to dark mode
- [ ] Clear localStorage
- [ ] Reload application
- [ ] **Expected**: App loads in dark mode
- [ ] **Verify**: Check `localStorage.getItem('theme-preference')` = 'dark'
- [ ] **Verify**: `<html>` element has class "dark"

## Test 2: Theme Toggle Functionality

### Toggle from Light to Dark
- [ ] Start in light mode
- [ ] Locate theme toggle button in header (top-right)
- [ ] Click theme toggle button
- [ ] **Expected**: 
  - [ ] Background changes to dark
  - [ ] Text changes to light
  - [ ] Icon changes from Moon to Sun with rotation animation
  - [ ] All components update immediately
- [ ] **Verify**: `localStorage.getItem('theme-preference')` = 'dark'
- [ ] **Verify**: `<html>` element has class "dark"

### Toggle from Dark to Light
- [ ] Start in dark mode
- [ ] Click theme toggle button
- [ ] **Expected**:
  - [ ] Background changes to light
  - [ ] Text changes to dark
  - [ ] Icon changes from Sun to Moon with rotation animation
  - [ ] All components update immediately
- [ ] **Verify**: `localStorage.getItem('theme-preference')` = 'light'
- [ ] **Verify**: `<html>` element has class "light"

## Test 3: Persistence Across Sessions

- [ ] Set theme to dark mode
- [ ] Reload page (F5)
- [ ] **Expected**: App loads in dark mode
- [ ] Set theme to light mode
- [ ] Close and reopen browser tab
- [ ] **Expected**: App loads in light mode
- [ ] Set theme to dark mode
- [ ] Close browser completely
- [ ] Reopen browser and navigate to app
- [ ] **Expected**: App loads in dark mode

## Test 4: Navigation and Page Consistency

### Dashboard Page
- [ ] Navigate to Dashboard
- [ ] Toggle to dark mode
- [ ] **Verify**:
  - [ ] Header is dark
  - [ ] Sidebar is dark
  - [ ] Main content area is dark
  - [ ] KPI cards have dark backgrounds
  - [ ] Charts are visible and readable
  - [ ] All text is readable

### TBW Page
- [ ] Navigate to TBW page
- [ ] **Verify** theme persists
- [ ] **Verify**:
  - [ ] Customer list has dark styling
  - [ ] Customer cards have dark backgrounds
  - [ ] Recommendation cards are styled correctly
  - [ ] Tables are readable

### RDPS Page
- [ ] Navigate to RDPS page
- [ ] **Verify** theme persists
- [ ] **Verify**:
  - [ ] Segment list has dark styling
  - [ ] Churn heatmap is visible
  - [ ] Segment detail cards are styled correctly
  - [ ] All colors have good contrast

### Simulator Page
- [ ] Navigate to Simulator page
- [ ] **Verify** theme persists
- [ ] **Verify**:
  - [ ] Simulator controls are styled correctly
  - [ ] Sliders are visible and functional
  - [ ] Results cards have dark backgrounds
  - [ ] Comparison tables are readable

## Test 5: Component Rendering

### UI Components
- [ ] **Buttons**: All variants (primary, secondary, outline, ghost) visible
- [ ] **Cards**: Dark backgrounds with visible borders
- [ ] **Tables**: Alternating row colors visible, headers distinct
- [ ] **Badges**: All badge variants readable
- [ ] **Dialogs**: Open a dialog, verify dark overlay and content
- [ ] **Select dropdowns**: Open select, verify dropdown is dark
- [ ] **Tabs**: Switch tabs, verify active state visible
- [ ] **Sliders**: Adjust sliders, verify track and thumb visible

### Charts
- [ ] **KPI Card Sparklines**: Verify lines visible on dark background
- [ ] **Savings Chart**: Verify bars/lines have good contrast
- [ ] **Sensitivity Chart**: Verify heatmap colors work in dark mode
- [ ] **Churn Heatmap**: Verify all cells visible and distinguishable

## Test 6: Accessibility Testing

### Keyboard Navigation
- [ ] Press Tab to navigate to theme toggle
- [ ] **Verify**: Focus ring is visible
- [ ] Press Enter or Space to toggle theme
- [ ] **Verify**: Theme changes
- [ ] Tab through all interactive elements
- [ ] **Verify**: Focus indicators visible in both light and dark modes

### ARIA and Semantics
- [ ] Inspect theme toggle button
- [ ] **Verify**: Has `aria-label` attribute
- [ ] **Verify**: Has `aria-pressed` attribute (true when dark)
- [ ] **Verify**: Has `title` attribute for tooltip
- [ ] **Verify**: Has `type="button"` attribute

### Contrast Ratios (Use DevTools)
- [ ] Open DevTools > Lighthouse
- [ ] Run Accessibility audit
- [ ] **Expected**: Score 95-100
- [ ] Check for contrast issues
- [ ] **Expected**: No contrast warnings

### Manual Contrast Check
- [ ] In dark mode, verify:
  - [ ] Body text is easily readable
  - [ ] Headings stand out clearly
  - [ ] Borders are visible but not harsh
  - [ ] Disabled elements are distinguishable
  - [ ] Links are identifiable

### Reduced Motion
- [ ] Open DevTools > Rendering
- [ ] Enable "Emulate CSS prefers-reduced-motion: reduce"
- [ ] Toggle theme
- [ ] **Expected**: Transition is instant (no animation)
- [ ] Disable reduced motion
- [ ] Toggle theme
- [ ] **Expected**: Smooth rotation animation

## Test 7: Browser-Specific Testing

### Chrome/Edge
- [ ] Complete all tests above
- [ ] **Verify**: No console errors
- [ ] **Verify**: No visual glitches
- [ ] **Verify**: Smooth transitions

### Firefox
- [ ] Complete all tests above
- [ ] **Verify**: No console errors
- [ ] **Verify**: No visual glitches
- [ ] **Verify**: Smooth transitions

### Safari (if available)
- [ ] Complete all tests above
- [ ] **Verify**: No console errors
- [ ] **Verify**: No visual glitches
- [ ] **Verify**: Smooth transitions

## Test 8: Edge Cases

### localStorage Disabled
- [ ] Disable localStorage in browser settings
- [ ] Reload app
- [ ] Toggle theme
- [ ] **Expected**: Theme changes but doesn't persist
- [ ] **Verify**: No errors in console (warnings only)
- [ ] Reload page
- [ ] **Expected**: Theme resets to system preference or default

### Rapid Toggling
- [ ] Click theme toggle rapidly 10 times
- [ ] **Expected**: No errors, theme updates correctly
- [ ] **Verify**: No visual glitches or stuck states

### Multiple Tabs
- [ ] Open app in two browser tabs
- [ ] Toggle theme in tab 1
- [ ] Switch to tab 2
- [ ] Reload tab 2
- [ ] **Expected**: Tab 2 shows same theme as tab 1

## Test 9: Visual Inspection

### Light Mode
- [ ] All pages look professional and clean
- [ ] No harsh contrasts or eye strain
- [ ] Consistent color scheme throughout
- [ ] Shadows and borders visible

### Dark Mode
- [ ] All pages look professional and clean
- [ ] No overly bright elements
- [ ] Consistent dark color scheme
- [ ] Proper depth with subtle shadows
- [ ] No pure black (#000) backgrounds (should be neutral-900)

## Test 10: Performance

### Theme Switch Speed
- [ ] Toggle theme
- [ ] **Expected**: Instant visual update (< 100ms)
- [ ] **Verify**: No layout shift or flicker

### Initial Load
- [ ] Clear cache
- [ ] Reload page
- [ ] **Expected**: No flash of wrong theme
- [ ] **Expected**: Theme applied before content visible

## Test Results Summary

**Browser**: _______________
**Date**: _______________
**Tester**: _______________

**Total Tests**: 100+
**Passed**: _____
**Failed**: _____
**Issues Found**: _____

### Issues Log
1. 
2. 
3. 

### Notes
- 
- 
- 

## Sign-off

- [ ] All critical tests passed
- [ ] All accessibility tests passed
- [ ] All browsers tested
- [ ] No blocking issues found
- [ ] Ready for production

**Tester Signature**: _______________
**Date**: _______________

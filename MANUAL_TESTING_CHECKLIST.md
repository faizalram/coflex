# Manual Testing Checklist - AI Interest Rate Optimizer

## Pre-Testing Setup

### Environment
- [ ] Node.js version 20.19+ or 22.12+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] Browser: Chrome, Firefox, Safari, or Edge

### Test Data
- ✅ 30 wholesale customers across 4 segments
- ✅ 8 retail segments with varied balance tiers
- ✅ Realistic Indonesian banking data
- ✅ Consistent KPI metrics

## 1. Navigation and Routing Tests

### Sidebar Navigation
- [ ] Click "Dashboard" - navigates to `/`
- [ ] Click "TBW View" - navigates to `/tbw`
- [ ] Click "RDPS View" - navigates to `/rdps`
- [ ] Click "What-if Simulator" - navigates to `/simulator`
- [ ] Active page highlighted in sidebar
- [ ] Page transitions smooth (fade animation)
- [ ] Browser back/forward buttons work correctly

### URL Direct Access
- [ ] Navigate directly to `/` - Dashboard loads
- [ ] Navigate directly to `/tbw` - TBW page loads
- [ ] Navigate directly to `/rdps` - RDPS page loads
- [ ] Navigate directly to `/simulator` - Simulator loads
- [ ] Invalid URL shows appropriate error or redirects

## 2. Dashboard Page Tests

### KPI Cards
- [ ] Total DPK displays correctly (Rp 50.56 T for TBW)
- [ ] Average Rate displays correctly (5.24% for TBW)
- [ ] Projected Savings displays correctly
- [ ] High Risk Count displays correctly (8 for TBW)
- [ ] Numbers animate on page load (count-up effect)
- [ ] Trend indicators show (up/down arrows if applicable)
- [ ] Cards have hover effects (subtle lift with shadow)

### Sensitivity Distribution Chart
- [ ] Donut/Pie chart renders correctly
- [ ] Shows Low, Medium, High sensitivity segments
- [ ] Percentages add up to 100%
- [ ] Colors are distinct and professional
- [ ] Hover shows tooltip with details
- [ ] Legend displays correctly
- [ ] Chart animates on load (smooth entry)

### Savings Trend Chart
- [ ] Line/Area chart renders correctly
- [ ] Shows 12 months of data
- [ ] X-axis shows month labels
- [ ] Y-axis shows currency values
- [ ] Hover shows tooltip with exact values
- [ ] Legend displays correctly
- [ ] Chart animates on load (smooth entry)

### Model Performance Section
- [ ] Performance metrics display (accuracy, precision, recall)
- [ ] Gauge charts or metric cards render correctly
- [ ] Trend chart shows performance over time
- [ ] Last update timestamp displays
- [ ] All values are realistic (70-95% range)

### Role Switching
- [ ] Switch to RDPS role
- [ ] KPI cards update with RDPS data (Rp 1.36 T total DPK)
- [ ] Charts update with RDPS data
- [ ] Switch back to TBW role
- [ ] Data reverts to TBW metrics
- [ ] No data inconsistencies during switching

## 3. TBW View Tests

### Customer List
- [ ] Table displays 30 wholesale customers
- [ ] Columns: Name, Segment, Balance, Current Rate, Recommended Rate, Churn Risk
- [ ] All data formatted correctly (IDR currency, percentages)
- [ ] Sensitivity badges display (Low/Medium/High)
- [ ] Badge colors appropriate (green/yellow/red)

### Filtering
- [ ] "All" filter shows all 30 customers
- [ ] "Corporate" filter shows only Corporate segment (5 customers)
- [ ] "Commercial" filter shows only Commercial segment (6 customers)
- [ ] "GVI" filter shows only GVI segment (5 customers)
- [ ] "SME" filter shows only SME segment (14 customers)
- [ ] Filter UI is clear and intuitive

### Search Functionality
- [ ] Search by customer name works
- [ ] Search is case-insensitive
- [ ] Search updates results in real-time
- [ ] Clear search returns all results
- [ ] No results message displays when appropriate

### Sorting
- [ ] Click column headers to sort
- [ ] Sort by name (alphabetical)
- [ ] Sort by balance (numerical)
- [ ] Sort by rate (numerical)
- [ ] Sort by churn risk (numerical)
- [ ] Sort direction toggles (ascending/descending)
- [ ] Sort indicator displays (arrow icon)

### Customer Selection
- [ ] Click on customer row to select
- [ ] Selected row highlighted
- [ ] Customer detail card displays below
- [ ] Recommendation card displays
- [ ] Details match selected customer

### Customer Detail Card
- [ ] Customer name displays
- [ ] Current balance formatted correctly
- [ ] Current rate displays
- [ ] Recommended rate displays with visual indicator
- [ ] Churn risk shows with color-coded visualization
- [ ] Projected savings displays in IDR format
- [ ] Confidence score shows with progress bar/gauge
- [ ] Last updated date displays

### Recommendation Card
- [ ] Recommendation title clear and actionable
- [ ] Description explains the recommendation
- [ ] Priority badge displays (High/Medium/Low)
- [ ] Confidence indicator shows
- [ ] Click to expand shows detailed rationale
- [ ] Modal/expanded view displays correctly
- [ ] Close button works
- [ ] Rationale is logical and detailed

## 4. RDPS View Tests

### Segment List
- [ ] Displays 8 retail segments
- [ ] Grouped by balance tier
- [ ] Shows customer count per segment
- [ ] Shows total balance per segment
- [ ] Shows current vs recommended rates
- [ ] All data formatted correctly

### Segment Selection
- [ ] Click on segment to select
- [ ] Selected segment highlighted
- [ ] Segment detail card displays
- [ ] Churn heatmap updates

### Segment Detail Card
- [ ] Segment name displays
- [ ] Balance tier shows
- [ ] Customer count displays
- [ ] Total balance formatted correctly
- [ ] Current rate displays
- [ ] Recommended rate displays
- [ ] Adaptive rate recommendation with visual chart
- [ ] Expected retention rate shows with indicator

### Churn Heatmap
- [ ] Heatmap/bar chart renders correctly
- [ ] Shows churn risk by segment
- [ ] Colors indicate risk level (green/yellow/red)
- [ ] Hover shows exact percentages
- [ ] Legend displays correctly
- [ ] Visual is clear and intuitive

### Role Switching
- [ ] Switch to TBW role from RDPS view
- [ ] Page updates to show TBW data
- [ ] Switch back to RDPS
- [ ] Data consistency maintained

## 5. What-if Simulator Tests

### Interface
- [ ] Simulator interface loads correctly
- [ ] Customer/segment selector displays
- [ ] Rate adjustment slider displays
- [ ] Current rate shows
- [ ] Adjustment value displays

### Rate Adjustment Slider
- [ ] Slider moves smoothly
- [ ] Range: -2% to +2% (or appropriate range)
- [ ] Step: 0.1%
- [ ] Current value displays next to slider
- [ ] Input field allows direct entry
- [ ] Input field syncs with slider
- [ ] Debouncing works (smooth updates, not laggy)

### Real-time Calculations
- [ ] Adjust rate to -1%
- [ ] Projected churn risk updates immediately
- [ ] Projected savings updates immediately
- [ ] Projected retention updates immediately
- [ ] Values are realistic and logical
- [ ] Adjust rate to +1%
- [ ] All values update correctly
- [ ] Negative adjustment increases savings, increases churn risk
- [ ] Positive adjustment decreases savings, decreases churn risk

### Scenario Comparison
- [ ] Baseline scenario displays
- [ ] Optimistic scenario displays (rate decrease)
- [ ] Pessimistic scenario displays (rate increase)
- [ ] Side-by-side card layout clear
- [ ] Each scenario shows:
  - [ ] Rate adjustment
  - [ ] Projected churn risk with visualization
  - [ ] Projected savings
  - [ ] Projected retention rate
- [ ] Values update smoothly with animations
- [ ] Comparison is easy to understand

### Reset Functionality
- [ ] Reset button displays
- [ ] Click reset returns to baseline
- [ ] All values revert to original
- [ ] Slider returns to 0

### Save Scenario (if implemented)
- [ ] Save button displays
- [ ] Click save stores scenario
- [ ] Saved scenarios can be recalled
- [ ] Saved scenarios persist (if applicable)

## 6. Loading States Tests

### Initial Page Load
- [ ] Skeleton loaders display while data loads
- [ ] Skeleton loaders match final content layout
- [ ] Smooth transition from loading to content
- [ ] No layout shift when content loads

### Data Fetching
- [ ] Loading spinner/skeleton shows during fetch
- [ ] Loading state doesn't block UI unnecessarily
- [ ] Multiple simultaneous loads handled gracefully
- [ ] Loading indicators are subtle and professional

### Simulated Delays
- [ ] Mock data service delays (100-300ms) feel natural
- [ ] No jarring instant loads
- [ ] No excessively long waits

## 7. Error Handling Tests

### Error Boundary
- [ ] Trigger error (if test mode available)
- [ ] Error boundary catches error
- [ ] Fallback UI displays
- [ ] Error message is user-friendly
- [ ] "Try Again" button works
- [ ] Page recovers gracefully

### Data Fetch Errors
- [ ] Simulate network error (if possible)
- [ ] Error message displays
- [ ] Retry option available
- [ ] Error doesn't crash application
- [ ] User can navigate away from error

### Invalid Data
- [ ] Application handles missing data gracefully
- [ ] No console errors for expected edge cases
- [ ] Fallback values display appropriately

## 8. Responsive Design Tests

### Desktop Large (1920x1080)
- [ ] Layout uses full width appropriately
- [ ] Sidebar width appropriate
- [ ] Cards arranged in optimal grid
- [ ] Charts are large and readable
- [ ] No excessive white space
- [ ] All content visible without scrolling (where appropriate)

### Desktop Standard (1366x768)
- [ ] Layout adjusts appropriately
- [ ] Sidebar still functional
- [ ] Cards reflow to fit
- [ ] Charts remain readable
- [ ] Horizontal scrolling not required
- [ ] All functionality accessible

### Tablet (768px-1365px)
- [ ] Sidebar collapses or adjusts
- [ ] Cards stack vertically if needed
- [ ] Charts resize appropriately
- [ ] Touch targets adequate size
- [ ] Tables scroll horizontally if needed
- [ ] Navigation remains accessible

### Mobile (<768px) - Minimal Support
- [ ] Basic functionality works
- [ ] Content is readable
- [ ] Navigation accessible (hamburger menu if implemented)
- [ ] Critical features usable
- [ ] No broken layouts

### Zoom Testing
- [ ] Zoom to 200%
- [ ] Content remains readable
- [ ] No horizontal scrolling required
- [ ] Functionality still works
- [ ] Layout doesn't break

## 9. Animation and Transition Tests

### Page Transitions
- [ ] Fade animation when navigating between pages
- [ ] Duration: ~200ms
- [ ] Smooth and not jarring
- [ ] No flash of unstyled content

### Card Hover Effects
- [ ] Hover over card shows subtle lift
- [ ] Shadow increases on hover
- [ ] Transition duration: ~150ms
- [ ] Smooth and professional
- [ ] Returns to normal on mouse leave

### Number Counters
- [ ] KPI cards animate on page load
- [ ] Numbers count up from 0 to final value
- [ ] Animation duration: ~1-2 seconds
- [ ] Smooth easing function
- [ ] Only animates once per page load

### Chart Animations
- [ ] Charts animate on first render
- [ ] Entry animation duration: ~500ms
- [ ] Smooth and professional
- [ ] Doesn't interfere with interaction
- [ ] Only animates once per page load

### Modal Animations
- [ ] Modal fades in when opened
- [ ] Slight scale effect (zoom in)
- [ ] Duration: ~200ms
- [ ] Backdrop fades in
- [ ] Smooth close animation
- [ ] No jarring movements

### Slider Updates
- [ ] Value updates smoothly as slider moves
- [ ] Debouncing prevents lag
- [ ] Calculations update in real-time
- [ ] No flickering or jumping

## 10. Data Formatting Tests

### Currency Formatting
- [ ] Large numbers use compact notation (T, M, Jt)
- [ ] Standard mode uses thousand separators
- [ ] IDR symbol displays (Rp)
- [ ] Decimal places appropriate (2 for compact, 0 for standard)
- [ ] Negative values handled correctly (if applicable)

### Percentage Formatting
- [ ] Percentages show 2 decimal places
- [ ] Percent symbol displays (%)
- [ ] Values between 0-100%
- [ ] Negative percentages handled (if applicable)

### Date Formatting
- [ ] Dates in Indonesian format
- [ ] Relative dates work ("2 hari yang lalu")
- [ ] Absolute dates readable
- [ ] Timezone handled correctly

### Number Formatting
- [ ] Thousand separators for large numbers
- [ ] Decimal places consistent
- [ ] Indonesian locale formatting (1.000.000 not 1,000,000)

## 11. Data Consistency Tests

### Cross-View Consistency
- [ ] Total DPK same across Dashboard and detail views
- [ ] Customer count matches between views
- [ ] High risk count consistent
- [ ] Average rates match calculations
- [ ] Projected savings consistent

### Calculation Accuracy
- [ ] Savings = Balance × (Current Rate - Recommended Rate)
- [ ] Retention Rate = 100 - Churn Risk
- [ ] Weighted averages calculated correctly
- [ ] Scenario calculations logical

### Data Integrity
- [ ] No duplicate customer IDs
- [ ] All required fields present
- [ ] No null/undefined values displayed
- [ ] Dates are valid
- [ ] Numbers within expected ranges

## 12. Accessibility Tests

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals
- [ ] Arrow keys work in dropdowns/sliders
- [ ] No keyboard traps

### Screen Reader (if available)
- [ ] Navigation announced correctly
- [ ] Headings read in order
- [ ] Form labels associated
- [ ] Chart descriptions available
- [ ] Error messages announced
- [ ] Loading states announced
- [ ] Modal focus managed correctly

### Color Contrast
- [ ] Text readable on all backgrounds
- [ ] Interactive elements have sufficient contrast
- [ ] Color not sole means of conveying information
- [ ] Icons paired with text where needed

### Focus Management
- [ ] Focus visible on all interactive elements
- [ ] Focus moves logically
- [ ] Focus trapped in modals appropriately
- [ ] Focus returns after modal close

## 13. Performance Tests

### Initial Load
- [ ] Page loads in < 3 seconds
- [ ] First Contentful Paint < 1.5 seconds
- [ ] Time to Interactive < 3 seconds
- [ ] No long tasks blocking main thread

### Interaction Performance
- [ ] Slider moves smoothly (60fps)
- [ ] Charts render quickly
- [ ] Navigation instant
- [ ] No lag when typing in search
- [ ] Smooth scrolling

### Memory Usage
- [ ] No memory leaks during navigation
- [ ] Memory usage stable over time
- [ ] No excessive re-renders

### Bundle Size
- [ ] Initial bundle < 500KB (currently ~819KB - needs optimization)
- [ ] Code splitting implemented
- [ ] Vendor chunks separated
- [ ] Lazy loading where appropriate

## 14. Browser Compatibility Tests

### Chrome
- [ ] All features work
- [ ] Layout correct
- [ ] Animations smooth
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] Layout correct
- [ ] Animations smooth
- [ ] No console errors

### Safari
- [ ] All features work
- [ ] Layout correct
- [ ] Animations smooth
- [ ] No console errors

### Edge
- [ ] All features work
- [ ] Layout correct
- [ ] Animations smooth
- [ ] No console errors

## 15. Edge Cases and Stress Tests

### Empty States
- [ ] No customers found in search
- [ ] No data available
- [ ] Empty segment
- [ ] Zero values handled

### Extreme Values
- [ ] Very large balances (trillions)
- [ ] Very small balances
- [ ] 0% rates
- [ ] 100% churn risk
- [ ] 0% churn risk

### Rapid Interactions
- [ ] Rapidly switch between pages
- [ ] Rapidly change filters
- [ ] Rapidly adjust slider
- [ ] Rapidly switch roles
- [ ] No crashes or errors

### Long Sessions
- [ ] Use application for extended period
- [ ] No memory leaks
- [ ] No performance degradation
- [ ] Data remains consistent

## Test Results Summary

### Pass Criteria
- [ ] All critical functionality works
- [ ] No blocking bugs
- [ ] Performance acceptable
- [ ] Accessibility standards met
- [ ] Data consistency maintained
- [ ] Professional appearance

### Issues Found
| Priority | Issue | Status | Notes |
|----------|-------|--------|-------|
| High | | | |
| Medium | | | |
| Low | | | |

### Overall Assessment
- [ ] Ready for stakeholder demo
- [ ] Ready for user acceptance testing
- [ ] Needs minor fixes
- [ ] Needs major fixes

---

**Testing Date**: _______________  
**Tested By**: _______________  
**Browser**: _______________  
**Screen Resolution**: _______________  
**Status**: ⬜ PASS / ⬜ FAIL / ⬜ NEEDS REVIEW

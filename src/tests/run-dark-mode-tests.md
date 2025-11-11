# How to Run Dark Mode Tests

## Automated Testing

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Open Browser DevTools
- Press F12 or right-click > Inspect
- Navigate to the Console tab

### 3. Run Accessibility Validator
The accessibility validator is available in the browser console. To use it:

1. Import the validator in your browser console:
```javascript
// Copy and paste the contents of src/tests/accessibility-validator.ts
// Or add it to your main.tsx temporarily for testing
```

2. Run the validation commands:
```javascript
// Validate all dark mode contrast ratios
validateDarkModeContrast()

// Run comprehensive accessibility audit
runAccessibilityAudit()

// Validate specific element (select element first in Elements tab)
validateElementContrast($0)
```

### 4. Run Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Accessibility" category
4. Click "Analyze page load"
5. Review results (should score 95-100)

## Manual Testing

### Quick Test Checklist
Follow the comprehensive checklist in `src/tests/DARK_MODE_MANUAL_TEST_CHECKLIST.md`

### Essential Tests (5 minutes)
1. **Theme Toggle**
   - Click theme toggle in header
   - Verify theme changes immediately
   - Verify icon animates smoothly

2. **Persistence**
   - Toggle theme to dark
   - Reload page (F5)
   - Verify dark mode persists

3. **Navigation**
   - Navigate to Dashboard, TBW, RDPS, Simulator
   - Verify theme persists across pages
   - Verify all components render correctly

4. **Accessibility**
   - Tab to theme toggle
   - Verify focus ring is visible
   - Press Enter to toggle
   - Verify keyboard navigation works

5. **localStorage**
   - Open DevTools > Application > Local Storage
   - Verify 'theme-preference' key exists
   - Verify value is 'light' or 'dark'

## Browser Testing

### Chrome/Edge
```bash
# Open in Chrome
start chrome http://localhost:5173

# Or Edge
start msedge http://localhost:5173
```

### Firefox
```bash
# Open in Firefox
start firefox http://localhost:5173
```

### Safari (macOS)
```bash
# Open in Safari
open -a Safari http://localhost:5173
```

## Testing System Preference Detection

### Windows
1. Open Settings > Personalization > Colors
2. Change "Choose your color" to Light or Dark
3. Clear localStorage in browser
4. Reload application
5. Verify app matches system preference

### macOS
1. Open System Preferences > General
2. Change Appearance to Light or Dark
3. Clear localStorage in browser
4. Reload application
5. Verify app matches system preference

### Linux
1. Change system theme in your desktop environment settings
2. Clear localStorage in browser
3. Reload application
4. Verify app matches system preference

## Testing Reduced Motion

### Enable Reduced Motion
**Windows:**
Settings > Ease of Access > Display > Show animations

**macOS:**
System Preferences > Accessibility > Display > Reduce motion

**Browser Override:**
1. Open DevTools > Rendering tab
2. Check "Emulate CSS prefers-reduced-motion: reduce"

### Verify Behavior
1. Enable reduced motion
2. Toggle theme
3. Verify transition is instant (no animation)

## Contrast Ratio Testing

### Using Browser DevTools
1. Open DevTools > Elements
2. Select an element with text
3. Look at Styles panel
4. Hover over color value
5. DevTools shows contrast ratio

### Using Lighthouse
1. Run Lighthouse accessibility audit
2. Check for contrast issues in report
3. All text should meet WCAG AA standards

### Manual Verification
Use the color pairs defined in the design:

**Dark Mode Colors:**
- Background: `rgb(10, 10, 10)` - neutral-950
- Foreground: `rgb(250, 250, 250)` - neutral-50
- Card: `rgb(23, 23, 23)` - neutral-900
- Border: `rgb(38, 38, 38)` - neutral-800

**Expected Ratios:**
- Foreground on Background: > 4.5:1 ✓
- Card Foreground on Card: > 4.5:1 ✓
- Muted Foreground on Background: > 4.5:1 ✓
- Border on Background: > 3.0:1 ✓

## Performance Testing

### Measure Theme Switch Time
```javascript
// In browser console
console.time('theme-switch');
// Click theme toggle
console.timeEnd('theme-switch');
// Should be < 100ms
```

### Check for Layout Shifts
1. Open DevTools > Performance
2. Start recording
3. Toggle theme
4. Stop recording
5. Verify no layout shifts (CLS = 0)

### Check for Re-renders
1. Install React DevTools extension
2. Open React DevTools > Profiler
3. Start recording
4. Toggle theme
5. Stop recording
6. Verify minimal component re-renders

## Test Results Documentation

After completing tests, document results in:
- `src/tests/dark-mode-test-plan.md` - Update test results
- `src/tests/DARK_MODE_MANUAL_TEST_CHECKLIST.md` - Check off completed items

## Common Issues and Solutions

### Issue: Theme doesn't persist
**Solution:** Check localStorage is enabled in browser

### Issue: Flash of wrong theme on load
**Solution:** Verify theme is applied in useState initializer

### Issue: Focus indicators not visible
**Solution:** Check focus ring colors have sufficient contrast

### Issue: Charts not readable in dark mode
**Solution:** Verify chart colors are adjusted for dark backgrounds

### Issue: System preference not detected
**Solution:** Check matchMedia is supported in browser

## Continuous Testing

### Before Each Release
1. Run full manual test checklist
2. Test in all supported browsers
3. Run Lighthouse accessibility audit
4. Verify no console errors
5. Test on different screen sizes
6. Test with keyboard only
7. Test with screen reader (if available)

### Regression Testing
When making changes to:
- Theme context
- CSS custom properties
- Component styling
- Layout components

Always re-run the essential tests to ensure no regressions.

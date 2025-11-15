# Implementation Plan

- [x] 1. Update WholesaleCustomerList high priority row styling



  - Locate the high priority row className in `src/components/tbw/WholesaleCustomerList.tsx`
  - Update the background class from `bg-orange-50/50` to `bg-orange-50/50 dark:bg-orange-950/30`
  - Test in dark mode to verify orange background is visible
  - Test in light mode to verify existing styling is maintained
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Verify and fix table selected state styling





  - Open `src/components/ui/table.tsx` and locate the TableRow component
  - Verify the selected state includes `dark:data-[state=selected]:bg-highlight`
  - If missing, add the dark mode class to the selected state
  - Test customer selection in dark mode to verify highlight background is visible
  - Test in light mode to verify existing selection styling works
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 3. Update CustomerDetailCard recommended rate section





  - Locate the recommended rate section in `src/components/tbw/CustomerDetailCard.tsx`
  - Update the container div background from `bg-primary-50` to `bg-primary-50 dark:bg-primary-950/30`
  - Update the border from `border-primary-200` to `border-primary-200 dark:border-primary-900`
  - Update the title text from `text-primary-900` to `text-primary-900 dark:text-primary-100`
  - Test in dark mode to verify blue background and text are visible
  - _Requirements: 3.1, 3.6_

- [x] 4. Update CustomerDetailCard projected savings section





  - Locate the projected savings section in `src/components/tbw/CustomerDetailCard.tsx`
  - Update the background class to include dark mode variants: `bg-green-50 dark:bg-green-950/30` for positive savings and `bg-orange-50 dark:bg-orange-950/30` for negative
  - Update the title text from `text-neutral-700` to `text-neutral-700 dark:text-neutral-300`
  - Update the value text colors to include dark variants: `text-emerald-700 dark:text-emerald-400` and `text-amber-600 dark:text-amber-400`
  - Update the description text from `text-neutral-600` to `text-neutral-600 dark:text-neutral-400`
  - Test both positive and negative savings scenarios in dark mode
  - _Requirements: 3.2, 3.6_

- [x] 5. Update CustomerDetailCard churn risk progress bar





  - Locate the churn risk progress bar in `src/components/tbw/CustomerDetailCard.tsx`
  - Update the progress bar background from `bg-neutral-200` to `bg-neutral-200 dark:bg-neutral-800`
  - Update the percentage label text from `text-neutral-900` to `text-neutral-900 dark:text-neutral-100`
  - Test in dark mode with different churn risk levels (low, medium, high)
  - Verify colored fill bars remain visible against dark background
  - _Requirements: 3.3, 3.6_

- [x] 6. Update CustomerDetailCard confidence score progress bar





  - Locate the confidence score progress bar in `src/components/tbw/CustomerDetailCard.tsx`
  - Update the progress bar background from `bg-neutral-200` to `bg-neutral-200 dark:bg-neutral-800`
  - Update the percentage label text from `text-neutral-900` to `text-neutral-900 dark:text-neutral-100`
  - Test in dark mode with different confidence scores
  - Verify colored fill bars remain visible against dark background
  - _Requirements: 3.4, 3.6_

- [x] 7. Update CustomerDetailCard sensitivity section





  - Locate the sensitivity badge section in `src/components/tbw/CustomerDetailCard.tsx`
  - Update the border from `border-neutral-200` to `border-neutral-200 dark:border-neutral-700`
  - Add dark mode background: `bg-transparent dark:bg-neutral-900/30`
  - Update the label text from `text-neutral-700` to `text-neutral-700 dark:text-neutral-300`
  - Test in dark mode to verify border and text are visible
  - _Requirements: 3.5, 3.6_

- [ ]* 8. Verify all dark mode styling with accessibility tools
  - Open TBW page in dark mode
  - Use browser DevTools to inspect all updated elements
  - Verify computed colors meet WCAG 2.1 Level AA standards
  - Run Lighthouse accessibility audit
  - Run axe DevTools scan
  - _Requirements: 1.3, 2.4, 3.6_

- [ ]* 9. Test complete TBW workflow in both themes
  - Test high priority customer highlighting in both modes
  - Test customer selection in both modes
  - Test customer detail card display in both modes
  - Test theme switching while viewing customer details
  - Verify no visual regressions in light mode
  - Verify all text remains readable in both modes
  - _Requirements: 1.1, 1.2, 2.1, 2.3, 3.1, 3.2, 3.3, 3.4, 3.5_

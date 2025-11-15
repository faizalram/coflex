# Requirements Document

## Introduction

This specification addresses dark mode visibility issues in the TBW (Transaction Banking Wholesale) view where certain UI elements remain difficult to see or use white/light backgrounds that don't adapt to dark mode. These issues affect the customer list highlighting, selected customer state, and customer detail card elements.

## Glossary

- **TBW View**: Transaction Banking Wholesale page displaying wholesale customer list and details
- **High Priority Customer**: Customer with balance > 1 trillion IDR and churn risk > 30%
- **Selected State**: Visual indication of the currently selected customer in the table
- **CustomerDetailCard**: Component displaying detailed information about a selected customer
- **WCAG 2.1 Level AA**: Web Content Accessibility Guidelines requiring minimum 4.5:1 contrast ratio for normal text

## Requirements

### Requirement 1

**User Story:** As a user viewing the TBW customer list in dark mode, I want to clearly see which customers are high priority, so that I can identify important accounts that need attention.

#### Acceptance Criteria

1. WHEN a user views the TBW customer list in dark mode, THE WholesaleCustomerList Component SHALL display high priority customer rows with a background color that provides sufficient contrast against the dark theme
2. WHEN a user views the TBW customer list in light mode, THE WholesaleCustomerList Component SHALL maintain the existing orange highlight for high priority customers
3. THE WholesaleCustomerList Component SHALL ensure high priority row backgrounds meet WCAG 2.1 Level AA contrast requirements in both light and dark modes
4. THE WholesaleCustomerList Component SHALL ensure text within high priority rows remains readable with sufficient contrast

### Requirement 2

**User Story:** As a user selecting customers in the TBW view in dark mode, I want to clearly see which customer is currently selected, so that I know which customer's details are being displayed.

#### Acceptance Criteria

1. WHEN a user selects a customer in dark mode, THE TableRow Component SHALL display the selected state with a background color that clearly distinguishes it from unselected rows
2. WHEN a user selects a customer in dark mode, THE TableRow Component SHALL ensure the selected state background provides minimum 3:1 contrast ratio against the default row background
3. WHEN a user selects a customer in light mode, THE TableRow Component SHALL maintain the existing selected state styling
4. THE TableRow Component SHALL ensure all text within selected rows remains readable in both light and dark modes

### Requirement 3

**User Story:** As a user viewing customer details in dark mode, I want all information cards and sections to be clearly visible, so that I can read customer information without eye strain.

#### Acceptance Criteria

1. WHEN a user views the CustomerDetailCard in dark mode, THE CustomerDetailCard Component SHALL display the recommended rate section with appropriate dark mode background colors
2. WHEN a user views the CustomerDetailCard in dark mode, THE CustomerDetailCard Component SHALL display the projected savings section with appropriate dark mode background colors that maintain the semantic meaning (green for savings, amber for costs)
3. WHEN a user views the CustomerDetailCard in dark mode, THE CustomerDetailCard Component SHALL display the churn risk progress bar with a dark mode background
4. WHEN a user views the CustomerDetailCard in dark mode, THE CustomerDetailCard Component SHALL display the confidence score progress bar with a dark mode background
5. WHEN a user views the CustomerDetailCard in dark mode, THE CustomerDetailCard Component SHALL display the sensitivity badge section with appropriate dark mode border and background colors
6. THE CustomerDetailCard Component SHALL ensure all text within colored sections maintains WCAG 2.1 Level AA contrast requirements in both light and dark modes

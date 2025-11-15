# Design Document

## Overview

This design implements dark mode support for the AI Interest Rate Optimizer application using Tailwind CSS's built-in dark mode functionality with class-based toggling. The implementation will leverage React Context for theme state management and localStorage for persistence. Additionally, a comprehensive user guide will be created to help end users understand and navigate the application effectively.

The dark mode implementation follows modern web standards and accessibility guidelines (WCAG 2.1 Level AA), ensuring proper contrast ratios and visual clarity. The user guide will be structured as a standalone markdown document with clear sections, screenshots descriptions, and step-by-step instructions.

## Architecture

### Theme Management Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Application Root                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │           ThemeProvider (Context)                  │ │
│  │  - Manages theme state (light/dark)                │ │
│  │  - Persists to localStorage                        │ │
│  │  - Detects system preference                       │ │
│  │  - Applies theme class to <html> element           │ │
│  └────────────────────────────────────────────────────┘ │
│                          │                               │
│                          ▼                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │              Header Component                      │ │
│  │  ┌──────────────────────────────────────────────┐  │ │
│  │  │        ThemeToggle Component                 │  │ │
│  │  │  - Sun/Moon icon button                      │  │ │
│  │  │  - Calls theme context toggle function       │  │ │
│  │  └──────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────┘ │
│                          │                               │
│                          ▼                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │         All Components & Pages                     │ │
│  │  - Use Tailwind dark: prefix for dark styles      │ │
│  │  - Automatically respond to theme changes          │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### User Guide Structure

```
USER_GUIDE.md
├── Introduction
├── Getting Started
│   ├── Accessing the Application
│   ├── Understanding the Interface
│   └── Role Switching
├── Dashboard Overview
│   ├── KPI Cards
│   ├── Savings Chart
│   ├── Sensitivity Analysis
│   └── Model Performance
├── TBW View (Wholesale Banking)
│   ├── Customer List
│   ├── Interest Rate Recommendations
│   └── Customer Details
├── RDPS View (Retail Banking)
│   ├── Segment List
│   ├── Churn Heatmap
│   └── Segment Details
├── What-if Simulator
│   ├── Creating Scenarios
│   ├── Adjusting Interest Rates
│   ├── Interpreting Results
│   └── Comparing Scenarios
└── Tips & Best Practices
```

## Components and Interfaces

### 1. Theme Context and Provider

**File**: `src/contexts/ThemeContext.tsx`

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
  storageKey?: string;
}
```

**Responsibilities**:
- Manage current theme state
- Provide theme toggle functionality
- Persist theme preference to localStorage
- Detect system color scheme preference on initial load
- Apply theme class to document root element

**Implementation Details**:
- Use `useState` for theme state management
- Use `useEffect` to sync theme with `<html>` element class
- Use `useEffect` to persist theme to localStorage
- Use `window.matchMedia('(prefers-color-scheme: dark)')` for system preference detection
- Provide context value with `useMemo` to prevent unnecessary re-renders

### 2. Theme Toggle Component

**File**: `src/components/shared/ThemeToggle.tsx`

```typescript
interface ThemeToggleProps {
  className?: string;
}
```

**Responsibilities**:
- Display current theme icon (Sun for light mode, Moon for dark mode)
- Toggle theme when clicked
- Provide accessible button with proper ARIA labels
- Show smooth transition animation

**Implementation Details**:
- Use `useTheme` hook to access theme context
- Use Lucide React icons: `Sun` and `Moon`
- Implement as a button with proper accessibility attributes
- Add hover and focus states
- Include transition animation for icon changes

### 3. Custom Hook

**File**: `src/hooks/useTheme.ts`

```typescript
function useTheme(): ThemeContextType
```

**Responsibilities**:
- Provide easy access to theme context
- Throw error if used outside ThemeProvider

### 4. CSS Variables and Tailwind Configuration

**Updates to**: `src/index.css`

Add CSS custom properties for dark mode colors:

```css
:root {
  --background: 250 250 250;
  --foreground: 23 23 23;
  --card: 255 255 255;
  --card-foreground: 23 23 23;
  --border: 229 229 229;
  --muted: 245 245 245;
  --muted-foreground: 115 115 115;
}

.dark {
  --background: 10 10 10;
  --foreground: 250 250 250;
  --card: 23 23 23;
  --card-foreground: 250 250 250;
  --border: 38 38 38;
  --muted: 38 38 38;
  --muted-foreground: 163 163 163;
}
```

**Tailwind Configuration**: Already configured with `darkMode: ["class"]`

### 5. Component Dark Mode Styling

All existing components will be updated to support dark mode using Tailwind's `dark:` prefix:

**Pattern**:
```tsx
// Light mode (default) → Dark mode
className="bg-white dark:bg-neutral-900"
className="text-neutral-900 dark:text-neutral-100"
className="border-neutral-200 dark:border-neutral-700"
```

**Key Components to Update**:
- Layout components (Header, Sidebar, AppLayout)
- Page components (Dashboard, TBW, RDPS, Simulator)
- UI components (Card, Table, Button, Badge, etc.)
- Chart components (adjust colors for dark backgrounds)

### 6. User Guide Document

**File**: `USER_GUIDE.md`

**Structure**:
- Markdown format with clear headings and sections
- Table of contents with anchor links
- Descriptive text for UI elements (since screenshots may not be feasible)
- Step-by-step instructions with numbered lists
- Tips and best practices sections
- Glossary of terms

**Content Sections**:
1. **Introduction**: Overview of the application and its purpose
2. **Getting Started**: How to access and navigate the interface
3. **Dashboard**: Explanation of KPIs, charts, and metrics
4. **TBW View**: How to use wholesale banking features
5. **RDPS View**: How to use retail banking features
6. **What-if Simulator**: How to run scenario analyses
7. **Tips & Best Practices**: Common workflows and recommendations

## Data Models

### Theme Preference Storage

**localStorage Key**: `theme-preference`

**Value**: `"light"` | `"dark"`

**Structure**:
```typescript
{
  key: 'theme-preference',
  value: 'light' | 'dark'
}
```

### Theme State

```typescript
type Theme = 'light' | 'dark';

interface ThemeState {
  current: Theme;
  systemPreference: Theme;
}
```

## Error Handling

### Theme Context Errors

1. **Context Used Outside Provider**:
   - Error: "useTheme must be used within a ThemeProvider"
   - Handling: Throw descriptive error to help developers identify the issue

2. **localStorage Access Failure**:
   - Scenario: localStorage is disabled or unavailable
   - Handling: Gracefully fall back to in-memory state only
   - User Impact: Theme preference won't persist across sessions

3. **System Preference Detection Failure**:
   - Scenario: `matchMedia` not supported
   - Handling: Default to light mode
   - User Impact: No automatic theme detection

### Dark Mode Styling Issues

1. **Insufficient Contrast**:
   - Prevention: Use Tailwind's neutral color palette with tested contrast ratios
   - Validation: Test with browser DevTools contrast checker

2. **Chart Readability**:
   - Prevention: Define separate color schemes for light and dark modes
   - Implementation: Use conditional colors based on theme in Recharts components

## Testing Strategy

### Unit Tests

1. **ThemeContext Tests**:
   - Test theme toggle functionality
   - Test localStorage persistence
   - Test system preference detection
   - Test context provider and consumer

2. **ThemeToggle Component Tests**:
   - Test button click toggles theme
   - Test icon changes based on theme
   - Test accessibility attributes

3. **useTheme Hook Tests**:
   - Test hook returns correct context values
   - Test error when used outside provider

### Integration Tests

1. **Theme Application Tests**:
   - Test theme class applied to document root
   - Test theme persists across page navigation
   - Test theme loads from localStorage on mount

2. **Component Styling Tests**:
   - Test key components render correctly in dark mode
   - Test charts remain readable in dark mode
   - Test interactive elements maintain visibility

### Manual Testing

1. **Visual Testing**:
   - Verify all pages in both light and dark modes
   - Check color contrast with browser DevTools
   - Test on different screen sizes

2. **Accessibility Testing**:
   - Test keyboard navigation with theme toggle
   - Verify focus indicators visible in both modes
   - Test with screen reader

3. **User Guide Testing**:
   - Verify all instructions are clear and accurate
   - Test all described workflows in the application
   - Ensure guide covers all major features

### Accessibility Testing

1. **Contrast Ratios**:
   - Test all text meets WCAG AA standards (4.5:1 for normal, 3:1 for large)
   - Use automated tools (axe DevTools, Lighthouse)

2. **Focus Indicators**:
   - Verify focus outlines visible in both themes
   - Test keyboard navigation through all interactive elements

3. **System Preference**:
   - Test automatic theme detection
   - Verify manual override works correctly

## Implementation Phases

### Phase 1: Theme Infrastructure
- Create ThemeContext and ThemeProvider
- Create useTheme hook
- Add CSS variables for dark mode
- Integrate ThemeProvider into App root

### Phase 2: Theme Toggle UI
- Create ThemeToggle component
- Add ThemeToggle to Header component
- Implement smooth transitions

### Phase 3: Component Dark Mode Styling
- Update layout components (Header, Sidebar, AppLayout)
- Update page components (Dashboard, TBW, RDPS, Simulator)
- Update UI components (Card, Table, Button, etc.)
- Adjust chart colors for dark mode

### Phase 4: Testing and Refinement
- Run accessibility tests
- Fix contrast issues
- Test persistence and system preference
- Cross-browser testing

### Phase 5: User Guide Creation
- Write user guide content
- Structure with clear sections
- Add step-by-step instructions
- Review and refine based on application features
- Update README with link to user guide

## Design Decisions and Rationales

### 1. Class-based Dark Mode (vs. Media Query)
**Decision**: Use Tailwind's class-based dark mode strategy
**Rationale**: 
- Allows user control over theme preference
- Enables persistence across sessions
- More flexible than media query approach
- Better user experience with manual toggle

### 2. Context API (vs. State Management Library)
**Decision**: Use React Context for theme state
**Rationale**:
- Simple, lightweight solution
- No additional dependencies
- Sufficient for global theme state
- Easy to implement and maintain

### 3. localStorage for Persistence
**Decision**: Store theme preference in localStorage
**Rationale**:
- Simple, browser-native solution
- Persists across sessions
- No backend required
- Graceful degradation if unavailable

### 4. System Preference Detection
**Decision**: Detect and respect system color scheme preference
**Rationale**:
- Better initial user experience
- Follows modern web standards
- User can still override manually
- Improves accessibility

### 5. Separate User Guide Document
**Decision**: Create standalone USER_GUIDE.md file
**Rationale**:
- Keeps README focused on technical documentation
- Easier for end users to find and read
- Can be distributed separately
- Allows for more detailed content without cluttering README

### 6. Minimal Chart Color Changes
**Decision**: Adjust chart colors subtly for dark mode
**Rationale**:
- Maintain brand consistency
- Ensure readability without drastic changes
- Use darker backgrounds with lighter chart elements
- Preserve data visualization clarity

## Accessibility Considerations

1. **Contrast Ratios**: All color combinations tested to meet WCAG 2.1 Level AA
2. **Focus Indicators**: Visible in both light and dark modes
3. **Theme Toggle**: Accessible button with proper ARIA labels
4. **System Preference**: Respects user's OS-level preference
5. **No Motion Preference**: Theme transitions respect `prefers-reduced-motion`
6. **Keyboard Navigation**: All theme controls accessible via keyboard
7. **Screen Reader Support**: Theme state announced to assistive technologies

## Performance Considerations

1. **CSS Variables**: Efficient theme switching without re-rendering components
2. **Context Optimization**: Use `useMemo` to prevent unnecessary re-renders
3. **localStorage**: Minimal performance impact, async operations
4. **Tailwind Purging**: Dark mode classes included in production build
5. **No Flash**: Theme applied before first paint to prevent flash of wrong theme

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **CSS Variables**: Supported in all target browsers
- **localStorage**: Widely supported with graceful fallback
- **matchMedia**: Supported for system preference detection
- **Fallback**: Light mode for unsupported browsers

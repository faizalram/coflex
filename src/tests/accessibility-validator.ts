/**
 * Accessibility Validator for Dark Mode
 * 
 * This utility validates WCAG 2.1 Level AA contrast ratios for dark mode colors.
 * Run this in the browser console to verify contrast compliance.
 */

interface ColorPair {
  name: string;
  foreground: string;
  background: string;
  minRatio: number; // 4.5 for normal text, 3.0 for large text
}

/**
 * Convert RGB to relative luminance
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Parse RGB color string to RGB values
 */
function parseRGB(rgbString: string): [number, number, number] {
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) {
    throw new Error(`Invalid RGB string: ${rgbString}`);
  }
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

/**
 * Get computed color from CSS custom property
 */
function getCSSColor(property: string): string {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(property).trim();
  
  // Convert space-separated RGB values to rgb() format
  if (value.includes(' ')) {
    const [r, g, b] = value.split(' ').map(v => v.trim());
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  return value;
}

/**
 * Dark mode color pairs to validate
 */
const darkModeColorPairs: ColorPair[] = [
  {
    name: 'Body text on background',
    foreground: '--foreground',
    background: '--background',
    minRatio: 4.5,
  },
  {
    name: 'Card text on card background',
    foreground: '--card-foreground',
    background: '--card',
    minRatio: 4.5,
  },
  {
    name: 'Muted text on background',
    foreground: '--muted-foreground',
    background: '--background',
    minRatio: 4.5,
  },
  {
    name: 'Border on background',
    foreground: '--border',
    background: '--background',
    minRatio: 3.0, // UI components need 3:1
  },
  {
    name: 'Text on muted background',
    foreground: '--foreground',
    background: '--muted',
    minRatio: 4.5,
  },
];

/**
 * Validate all color pairs
 */
export function validateDarkModeContrast(): void {
  console.log('🎨 Dark Mode Accessibility Validation\n');
  console.log('Testing WCAG 2.1 Level AA contrast ratios...\n');
  
  // Ensure dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');
  if (!isDarkMode) {
    console.warn('⚠️  Dark mode is not active. Please enable dark mode first.');
    return;
  }
  
  let passCount = 0;
  let failCount = 0;
  
  darkModeColorPairs.forEach((pair) => {
    try {
      const fgColor = getCSSColor(pair.foreground);
      const bgColor = getCSSColor(pair.background);
      
      const fgRGB = parseRGB(fgColor);
      const bgRGB = parseRGB(bgColor);
      
      const ratio = getContrastRatio(fgRGB, bgRGB);
      const passes = ratio >= pair.minRatio;
      
      const status = passes ? '✅ PASS' : '❌ FAIL';
      
      console.log(`${status} ${pair.name}`);
      console.log(`   Ratio: ${ratio.toFixed(2)}:1 (Required: ${pair.minRatio}:1)`);
      console.log(`   Foreground: ${fgColor}`);
      console.log(`   Background: ${bgColor}\n`);
      
      if (passes) {
        passCount++;
      } else {
        failCount++;
      }
    } catch (error) {
      console.error(`❌ ERROR testing ${pair.name}:`, error);
      failCount++;
    }
  });
  
  console.log('─'.repeat(50));
  console.log(`\n📊 Results: ${passCount} passed, ${failCount} failed`);
  
  if (failCount === 0) {
    console.log('✅ All contrast ratios meet WCAG 2.1 Level AA standards!');
  } else {
    console.warn('⚠️  Some contrast ratios do not meet standards. Please review.');
  }
}

/**
 * Validate specific element contrast
 */
export function validateElementContrast(element: HTMLElement): void {
  const styles = getComputedStyle(element);
  const color = styles.color;
  const backgroundColor = styles.backgroundColor;
  
  console.log(`\n🔍 Validating element contrast:`);
  console.log(`   Element:`, element);
  console.log(`   Color: ${color}`);
  console.log(`   Background: ${backgroundColor}`);
  
  try {
    const fgRGB = parseRGB(color);
    const bgRGB = parseRGB(backgroundColor);
    const ratio = getContrastRatio(fgRGB, bgRGB);
    
    const normalTextPass = ratio >= 4.5;
    const largeTextPass = ratio >= 3.0;
    
    console.log(`   Contrast Ratio: ${ratio.toFixed(2)}:1`);
    console.log(`   Normal Text (4.5:1): ${normalTextPass ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Large Text (3.0:1): ${largeTextPass ? '✅ PASS' : '❌ FAIL'}`);
  } catch (error) {
    console.error('   ❌ ERROR:', error);
  }
}

/**
 * Run comprehensive accessibility audit
 */
export function runAccessibilityAudit(): void {
  console.log('🔍 Running Comprehensive Accessibility Audit\n');
  
  // Check dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');
  console.log(`Dark Mode Active: ${isDarkMode ? '✅ Yes' : '❌ No'}\n`);
  
  // Validate contrast ratios
  validateDarkModeContrast();
  
  // Check for focus indicators
  console.log('\n🎯 Focus Indicator Check:');
  const focusableElements = document.querySelectorAll(
    'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  console.log(`   Found ${focusableElements.length} focusable elements`);
  
  // Check for ARIA labels on theme toggle
  console.log('\n♿ ARIA Attributes Check:');
  const themeToggle = document.querySelector('[aria-label*="mode"]');
  if (themeToggle) {
    console.log('   ✅ Theme toggle found');
    console.log(`   aria-label: ${themeToggle.getAttribute('aria-label')}`);
    console.log(`   aria-pressed: ${themeToggle.getAttribute('aria-pressed')}`);
    console.log(`   title: ${themeToggle.getAttribute('title')}`);
  } else {
    console.log('   ⚠️  Theme toggle not found');
  }
  
  // Check for reduced motion support
  console.log('\n🎬 Motion Preference Check:');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  console.log(`   Prefers Reduced Motion: ${prefersReducedMotion ? 'Yes' : 'No'}`);
  const transitionDuration = getComputedStyle(document.documentElement)
    .getPropertyValue('--transition-duration');
  console.log(`   Transition Duration: ${transitionDuration || 'Not set'}`);
  
  console.log('\n✅ Audit Complete!');
}

// Make functions available in browser console
if (typeof window !== 'undefined') {
  (window as any).validateDarkModeContrast = validateDarkModeContrast;
  (window as any).validateElementContrast = validateElementContrast;
  (window as any).runAccessibilityAudit = runAccessibilityAudit;
  
  console.log('🎨 Accessibility validator loaded!');
  console.log('Run these commands in the console:');
  console.log('  - validateDarkModeContrast()');
  console.log('  - validateElementContrast(element)');
  console.log('  - runAccessibilityAudit()');
}

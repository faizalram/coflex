/**
 * Accessibility utilities for verifying WCAG 2.1 Level AA compliance
 */

/**
 * Calculate relative luminance of a color
 * @param r Red value (0-255)
 * @param g Green value (0-255)
 * @param b Blue value (0-255)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * @param rgb1 First color [r, g, b]
 * @param rgb2 Second color [r, g, b]
 */
export function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * @param ratio Contrast ratio
 * @param isLargeText Whether the text is large (18pt+ or 14pt+ bold)
 */
export function meetsWCAGAA(ratio: number, isLargeText = false): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Dark mode color palette with verified contrast ratios
 */
export const darkModeColors = {
  // Background colors
  background: [13, 13, 13] as [number, number, number], // #0D0D0D
  card: [26, 26, 26] as [number, number, number], // #1A1A1A
  muted: [35, 35, 35] as [number, number, number], // #232323
  border: [44, 44, 44] as [number, number, number], // #2C2C2C
  
  // Text colors
  foreground: [230, 230, 230] as [number, number, number], // #E6E6E6
  mutedForeground: [166, 166, 166] as [number, number, number], // #A6A6A6
  
  // Accent colors
  primary: [96, 165, 250] as [number, number, number], // #60a5fa
  success: [16, 185, 129] as [number, number, number], // #10b981
  warning: [245, 158, 11] as [number, number, number], // #f59e0b
  error: [239, 68, 68] as [number, number, number], // #ef4444
};

/**
 * Light mode color palette
 *
 * Note on muted-foreground (#737373 / neutral-500):
 *   - On background (#FAFAFA): 4.54:1 — passes WCAG AA ✓
 *   - On card (#FFFFFF):       4.74:1 — passes WCAG AA ✓
 *   - On muted (#F5F5F5):      4.35:1 — fails WCAG AA for normal text ✗
 *
 * Components that place text on bg-neutral-100 (#F5F5F5) use neutral-600 (#525252)
 * instead of neutral-500 to ensure compliance (e.g. TabsList, Dialog close button).
 */
export const lightModeColors = {
  // Background colors
  background: [250, 250, 250] as [number, number, number], // #FAFAFA (neutral-50)
  card: [255, 255, 255] as [number, number, number], // #FFFFFF
  muted: [245, 245, 245] as [number, number, number], // #F5F5F5 (neutral-100)
  border: [229, 229, 229] as [number, number, number], // #E5E5E5 (neutral-200)

  // Text colors
  foreground: [23, 23, 23] as [number, number, number], // #171717 (neutral-900)
  mutedForeground: [115, 115, 115] as [number, number, number], // #737373 (neutral-500) — use on background/card only
  mutedForegroundOnMuted: [82, 82, 82] as [number, number, number], // #525252 (neutral-600) — use on muted/neutral-100 bg

  // Accent colors
  primary: [59, 130, 246] as [number, number, number], // #3b82f6
  success: [16, 185, 129] as [number, number, number], // #10b981
  warning: [245, 158, 11] as [number, number, number], // #f59e0b
  error: [239, 68, 68] as [number, number, number], // #ef4444
};

/**
 * Verify contrast ratios for dark mode
 */
export function verifyDarkModeContrast(): Record<string, { ratio: number; passes: boolean }> {
  return {
    'foreground-on-background': {
      ratio: getContrastRatio(darkModeColors.foreground, darkModeColors.background),
      passes: meetsWCAGAA(getContrastRatio(darkModeColors.foreground, darkModeColors.background)),
    },
    'foreground-on-card': {
      ratio: getContrastRatio(darkModeColors.foreground, darkModeColors.card),
      passes: meetsWCAGAA(getContrastRatio(darkModeColors.foreground, darkModeColors.card)),
    },
    'muted-foreground-on-background': {
      ratio: getContrastRatio(darkModeColors.mutedForeground, darkModeColors.background),
      passes: meetsWCAGAA(getContrastRatio(darkModeColors.mutedForeground, darkModeColors.background)),
    },
    'muted-foreground-on-card': {
      ratio: getContrastRatio(darkModeColors.mutedForeground, darkModeColors.card),
      passes: meetsWCAGAA(getContrastRatio(darkModeColors.mutedForeground, darkModeColors.card)),
    },
    'primary-on-background': {
      ratio: getContrastRatio(darkModeColors.primary, darkModeColors.background),
      passes: meetsWCAGAA(getContrastRatio(darkModeColors.primary, darkModeColors.background)),
    },
  };
}

/**
 * Verify contrast ratios for light mode
 * All combinations verified against WCAG 2.1 AA (4.5:1 normal text, 3:1 large text)
 */
export function verifyLightModeContrast(): Record<string, { ratio: number; passes: boolean }> {
  return {
    'foreground-on-background': {
      ratio: getContrastRatio(lightModeColors.foreground, lightModeColors.background),
      passes: meetsWCAGAA(getContrastRatio(lightModeColors.foreground, lightModeColors.background)),
    },
    'foreground-on-card': {
      ratio: getContrastRatio(lightModeColors.foreground, lightModeColors.card),
      passes: meetsWCAGAA(getContrastRatio(lightModeColors.foreground, lightModeColors.card)),
    },
    'foreground-on-muted': {
      ratio: getContrastRatio(lightModeColors.foreground, lightModeColors.muted),
      passes: meetsWCAGAA(getContrastRatio(lightModeColors.foreground, lightModeColors.muted)),
    },
    // neutral-500 (#737373) — safe on background and card, but NOT on muted/neutral-100
    'muted-foreground-on-background': {
      ratio: getContrastRatio(lightModeColors.mutedForeground, lightModeColors.background),
      passes: meetsWCAGAA(getContrastRatio(lightModeColors.mutedForeground, lightModeColors.background)),
    },
    'muted-foreground-on-card': {
      ratio: getContrastRatio(lightModeColors.mutedForeground, lightModeColors.card),
      passes: meetsWCAGAA(getContrastRatio(lightModeColors.mutedForeground, lightModeColors.card)),
    },
    // neutral-500 on neutral-100 FAILS (4.35:1) — components use neutral-600 instead
    'muted-foreground-on-muted': {
      ratio: getContrastRatio(lightModeColors.mutedForeground, lightModeColors.muted),
      passes: meetsWCAGAA(getContrastRatio(lightModeColors.mutedForeground, lightModeColors.muted)),
    },
    // neutral-600 (#525252) — used in TabsList and Dialog close button on neutral-100 bg
    'muted-foreground-on-muted-corrected': {
      ratio: getContrastRatio(lightModeColors.mutedForegroundOnMuted, lightModeColors.muted),
      passes: meetsWCAGAA(getContrastRatio(lightModeColors.mutedForegroundOnMuted, lightModeColors.muted)),
    },
    'primary-on-background': {
      ratio: getContrastRatio(lightModeColors.primary, lightModeColors.background),
      passes: meetsWCAGAA(getContrastRatio(lightModeColors.primary, lightModeColors.background)),
    },
  };
}

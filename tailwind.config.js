/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Theme-aware core colors
                background: {
                    // Light mode defaults
                    DEFAULT: '#FAFAFA',
                    surface: '#FFFFFF',
                    elevated: '#FFFFFF',
                    // Dark mode variants (applied via CSS)
                    dark: {
                        DEFAULT: '#0D0D0D',
                        surface: '#1A1A1A',
                        elevated: '#232323',
                    }
                },
                // Theme-aware text colors
                text: {
                    // Light mode defaults
                    primary: '#171717',
                    secondary: '#525252',
                    disabled: '#A3A3A3',
                    // Dark mode variants (applied via CSS)
                    dark: {
                        primary: '#E6E6E6',
                        secondary: '#A6A6A6',
                        disabled: '#5C5C5C',
                    }
                },
                // Theme-aware border colors
                border: {
                    // Light mode defaults
                    DEFAULT: '#E5E5E5',
                    hover: '#D4D4D4',
                    // Dark mode variants (applied via CSS)
                    dark: {
                        DEFAULT: '#2C2C2C',
                        hover: '#333333',
                    }
                },
                // Enhanced neutral scale with better light mode contrast
                neutral: {
                    50: '#fafafa',   // Light mode: very light background
                    100: '#f5f5f5',  // Light mode: light background
                    200: '#e5e5e5',  // Light mode: border/divider
                    300: '#d4d4d4',  // Light mode: subtle border
                    400: '#a3a3a3',  // Light mode: disabled text
                    500: '#737373',  // Light mode: secondary text
                    600: '#525252',  // Light mode: primary text (lighter)
                    700: '#404040',  // Light mode: primary text
                    800: '#262626',  // Light mode: headings
                    900: '#171717',  // Light mode: primary text (darkest)
                    950: '#0a0a0a',  // Light mode: maximum contrast
                },
                // Primary Accent - Optimized for both themes
                primary: {
                    50: '#eff6ff',   // Light mode: very light blue background
                    100: '#dbeafe',  // Light mode: light blue background
                    200: '#bfdbfe',  // Light mode: subtle blue
                    300: '#93c5fd',  // Light mode: medium blue
                    400: '#60a5fa',  // Light mode: bright blue
                    500: '#3b82f6',  // Base blue - good for both themes
                    600: '#2563eb',  // Light mode: darker blue
                    700: '#1d4ed8',  // Light mode: dark blue
                    800: '#1e40af',  // Light mode: very dark blue
                    900: '#1e3a8a',  // Light mode: darkest blue
                    DEFAULT: '#3b82f6',
                    hover: '#60a5fa',
                    // Light mode specific variants
                    light: {
                        DEFAULT: '#2563eb',
                        hover: '#1d4ed8',
                        text: '#1e40af',
                    },
                    // Dark mode specific variants
                    dark: {
                        DEFAULT: '#60a5fa',
                        hover: '#93c5fd',
                        text: '#93c5fd',
                    }
                },
                // Success - Enhanced for both themes
                success: {
                    50: '#f0fdf4',   // Light mode: very light green
                    100: '#dcfce7',  // Light mode: light green background
                    200: '#bbf7d0',  // Light mode: subtle green
                    300: '#86efac',  // Light mode: medium green
                    400: '#4ade80',  // Light mode: bright green
                    500: '#10b981',  // Base green - good for both themes
                    600: '#059669',  // Light mode: darker green
                    700: '#047857',  // Light mode: dark green
                    800: '#065f46',  // Light mode: very dark green
                    900: '#064e3b',  // Light mode: darkest green
                    DEFAULT: '#10b981',
                    // Light mode specific variants
                    light: {
                        DEFAULT: '#059669',
                        background: '#f0fdf4',
                        text: '#047857',
                    },
                    // Dark mode specific variants
                    dark: {
                        DEFAULT: '#4ade80',
                        background: 'rgba(16, 185, 129, 0.1)',
                        text: '#86efac',
                    },
                    gradient: {
                        from: '#059669',
                        to: '#34D399',
                    },
                },
                // Warning - Enhanced for both themes
                warning: {
                    50: '#fffbeb',   // Light mode: very light amber
                    100: '#fef3c7',  // Light mode: light amber background
                    200: '#fde68a',  // Light mode: subtle amber
                    300: '#fcd34d',  // Light mode: medium amber
                    400: '#fbbf24',  // Light mode: bright amber
                    500: '#f59e0b',  // Base amber - good for both themes
                    600: '#d97706',  // Light mode: darker amber
                    700: '#b45309',  // Light mode: dark amber
                    800: '#92400e',  // Light mode: very dark amber
                    900: '#78350f',  // Light mode: darkest amber
                    DEFAULT: '#f59e0b',
                    // Light mode specific variants
                    light: {
                        DEFAULT: '#d97706',
                        background: '#fffbeb',
                        text: '#b45309',
                    },
                    // Dark mode specific variants
                    dark: {
                        DEFAULT: '#fbbf24',
                        background: 'rgba(245, 158, 11, 0.1)',
                        text: '#fcd34d',
                    },
                },
                // Error/Danger - Enhanced for both themes
                danger: {
                    50: '#fef2f2',   // Light mode: very light red
                    100: '#fee2e2',  // Light mode: light red background
                    200: '#fecaca',  // Light mode: subtle red
                    300: '#fca5a5',  // Light mode: medium red
                    400: '#f87171',  // Light mode: bright red
                    500: '#ef4444',  // Base red - good for both themes
                    600: '#dc2626',  // Light mode: darker red
                    700: '#b91c1c',  // Light mode: dark red
                    800: '#991b1b',  // Light mode: very dark red
                    900: '#7f1d1d',  // Light mode: darkest red
                    DEFAULT: '#ef4444',
                    // Light mode specific variants
                    light: {
                        DEFAULT: '#dc2626',
                        background: '#fef2f2',
                        text: '#b91c1c',
                    },
                    // Dark mode specific variants
                    dark: {
                        DEFAULT: '#f87171',
                        background: 'rgba(239, 68, 68, 0.1)',
                        text: '#fca5a5',
                    },
                },
                // Highlight - Theme-aware
                highlight: {
                    light: '#EFF6FF',  // Light blue for light mode
                    dark: '#2E3A4E',   // Blue-gray for dark mode
                },
                // Chart gradients - Enhanced for both themes
                chart: {
                    // Light mode optimized
                    light: {
                        blue: {
                            from: '#1d4ed8',
                            to: '#3b82f6',
                        },
                        green: {
                            from: '#047857',
                            to: '#10b981',
                        },
                        neutral: {
                            from: '#525252',
                            to: '#737373',
                        },
                        background: '#ffffff',
                        grid: '#f5f5f5',
                        text: '#374151',
                    },
                    // Dark mode optimized
                    dark: {
                        blue: {
                            from: '#2563eb',
                            to: '#60a5fa',
                        },
                        green: {
                            from: '#059669',
                            to: '#34D399',
                        },
                        neutral: {
                            from: '#4B5563',
                            to: '#9CA3AF',
                        },
                        background: '#1a1a1a',
                        grid: '#2c2c2c',
                        text: '#e5e7eb',
                    },
                    // Legacy support
                    blue: {
                        from: '#2563eb',
                        to: '#60a5fa',
                    },
                    green: {
                        from: '#059669',
                        to: '#34D399',
                    },
                    neutral: {
                        from: '#4B5563',
                        to: '#9CA3AF',
                    },
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}

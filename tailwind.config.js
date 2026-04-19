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
                // Core Base - Deep matte blacks
                background: {
                    DEFAULT: '#0D0D0D',
                    surface: '#1A1A1A',
                    elevated: '#232323',
                },
                // Text & Neutrals
                text: {
                    primary: '#E6E6E6',
                    secondary: '#A6A6A6',
                    disabled: '#5C5C5C',
                },
                border: {
                    DEFAULT: '#2C2C2C',
                    hover: '#333333',
                },
                // Neutral scale mapped to elegant palette
                neutral: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0a0a0a',
                },
                // Primary Accent - Clean tech blue
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                    DEFAULT: '#3b82f6',
                    hover: '#60a5fa',
                },
                // Success - Emerald green
                success: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                    DEFAULT: '#10b981',
                    gradient: {
                        from: '#059669',
                        to: '#34D399',
                    },
                },
                // Warning - Amber
                warning: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    DEFAULT: '#f59e0b',
                },
                // Error - Bright red
                danger: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                    DEFAULT: '#ef4444',
                },
                // Highlight - Subtle blue-gray
                highlight: '#2E3A4E',
                // Chart gradients
                chart: {
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

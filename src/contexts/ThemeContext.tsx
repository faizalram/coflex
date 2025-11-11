import { createContext, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'theme-preference',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Try to get theme from localStorage
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
    }

    // Detect system preference
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (error) {
      console.warn('Failed to detect system preference:', error);
    }

    return defaultTheme;
  });

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Set transition duration based on prefers-reduced-motion
    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      root.style.setProperty('--transition-duration', prefersReducedMotion ? '0.01ms' : '300ms');
    } catch (error) {
      console.warn('Failed to detect motion preference:', error);
    }
  }, [theme]);

  // Persist theme to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme, storageKey]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-neutral-900 ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      type="button"
    >
      <div className="relative w-5 h-5" aria-hidden="true">
        <Moon 
          className={`absolute inset-0 h-5 w-5 text-neutral-700 dark:text-neutral-300 transition-all ${
            theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
          }`}
          style={{ transitionDuration: 'var(--transition-duration, 300ms)' }}
        />
        <Sun 
          className={`absolute inset-0 h-5 w-5 text-neutral-700 dark:text-neutral-300 transition-all ${
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
          style={{ transitionDuration: 'var(--transition-duration, 300ms)' }}
        />
      </div>
    </button>
  );
}

import { useRole } from '@/hooks/useRole';
import { RoleSwitcher } from '@/components/shared/RoleSwitcher';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { User } from 'lucide-react';
import logo from '@/assets/CoFlex Logo V2.png';

export function Header() {
  const { currentRole } = useRole();

  return (
    <header className="h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img 
          src={logo} 
          alt="CoFlex Logo" 
          className="h-8 w-auto"
        />
      </div>

      <div className="flex items-center gap-6">
        <RoleSwitcher />
        
        <ThemeToggle />
        
        <div className="flex items-center gap-3 pl-6 border-l border-neutral-200 dark:border-neutral-800">
          <div className="text-right">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Demo User</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {currentRole === 'TBW' ? 'Transaction Banking Wholesale' : 'Retail Deposit Product & Solution'}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <User className="h-5 w-5 text-primary-700 dark:text-primary-400" />
          </div>
        </div>
      </div>
    </header>
  );
}

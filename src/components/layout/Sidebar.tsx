import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Calculator,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRole } from '@/hooks/useRole';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: ('TBW' | 'RDPS')[];
}

const navItems: NavItem[] = [
  {
    label: 'TBW View',
    path: '/tbw',
    icon: Building2,
    roles: ['TBW'],
  },
  {
    label: 'RDPS View',
    path: '/rdps',
    icon: Users,
    roles: ['RDPS'],
  },
  {
    label: 'What-if Simulator',
    path: '/simulator',
    icon: Calculator,
  },
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
];

export function Sidebar() {
  const location = useLocation();
  const { currentRole } = useRole();

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(currentRole)
  );

  return (
    <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col">
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
          <TrendingUp className="h-6 w-6" />
          <span className="font-semibold text-sm">Rate Optimizer</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-400'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2025 AI Rate Optimizer</p>
        </div>
      </div>
    </aside>
  );
}

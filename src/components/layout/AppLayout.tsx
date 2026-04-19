import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-950">
          <div className="container mx-auto p-6 max-w-[1920px] min-h-full">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm dark:shadow-none border border-neutral-200 dark:border-neutral-800 p-6 min-h-[calc(100vh-8rem)]">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

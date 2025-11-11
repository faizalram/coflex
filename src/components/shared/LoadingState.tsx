import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800',
        className
      )}
    />
  );
}

export function LoadingCard() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 space-y-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-full" />
    </div>
  );
}

export function LoadingTable() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 space-y-4">
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}

export function LoadingChart() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 space-y-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

interface LoadingStateProps {
  type?: 'card' | 'table' | 'chart' | 'spinner';
  className?: string;
}

export function LoadingState({ type = 'spinner', className }: LoadingStateProps) {
  if (type === 'card') return <LoadingCard />;
  if (type === 'table') return <LoadingTable />;
  if (type === 'chart') return <LoadingChart />;

  return (
    <div className={cn('flex items-center justify-center p-12', className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 dark:border-neutral-800 border-t-primary-600 dark:border-t-primary-400" />
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading...</p>
      </div>
    </div>
  );
}

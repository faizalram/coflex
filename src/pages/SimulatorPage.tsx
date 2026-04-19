import { WhatIfSimulator } from '@/components/simulator/WhatIfSimulator';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

export function SimulatorPage() {
  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6 max-w-7xl">
        <WhatIfSimulator />
      </div>
    </ErrorBoundary>
  );
}

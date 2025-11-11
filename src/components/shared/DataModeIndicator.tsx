import { Badge } from '@/components/ui/badge';
import dataConfig from '@/config/dataConfig';

/**
 * DataModeIndicator Component
 * Displays the current data mode (mock or API) in development environment only
 * Shows as a badge in the bottom-right corner of the screen
 */
export function DataModeIndicator() {
  // Only show in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  const mode = dataConfig.getMode();
  const isMock = dataConfig.isMockMode();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge
        variant={isMock ? 'secondary' : 'default'}
        className="px-3 py-1.5 text-xs font-medium shadow-lg"
      >
        <span className="mr-1.5">●</span>
        {mode.toUpperCase()} Mode
      </Badge>
    </div>
  );
}

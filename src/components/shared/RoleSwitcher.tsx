import { useRole } from '@/hooks/useRole';
import { Button } from '@/components/ui/button';
import { Building2, Users } from 'lucide-react';

export function RoleSwitcher() {
  const { currentRole, setRole } = useRole();

  return (
    <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
      <Button
        variant={currentRole === 'TBW' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setRole('TBW')}
        className="gap-2"
      >
        <Building2 className="h-4 w-4" />
        TBW
      </Button>
      <Button
        variant={currentRole === 'RDPS' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setRole('RDPS')}
        className="gap-2"
      >
        <Users className="h-4 w-4" />
        RDPS
      </Button>
    </div>
  );
}

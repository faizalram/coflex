import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type Role = 'TBW' | 'RDPS';

interface RoleContextValue {
  currentRole: Role;
  setRole: (role: Role) => void;
  toggleRole: () => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
  defaultRole?: Role;
}

/**
 * Provider component for managing current role state (TBW/RDPS)
 * Wrap your app with this provider to enable role management
 */
export function RoleProvider({ children, defaultRole = 'TBW' }: RoleProviderProps) {
  const [role, setRoleState] = useState<Role>(defaultRole);

  const setRole = useCallback((newRole: Role) => {
    setRoleState(newRole);
  }, []);

  const toggleRole = useCallback(() => {
    setRoleState((prev) => (prev === 'TBW' ? 'RDPS' : 'TBW'));
  }, []);

  return (
    <RoleContext.Provider value={{ currentRole: role, setRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
}

/**
 * Custom hook for accessing and managing current role state
 * @returns Object containing current role, setRole function, and toggleRole function
 * @throws Error if used outside of RoleProvider
 */
export function useRole(): RoleContextValue {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

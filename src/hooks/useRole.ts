import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type AppRole = 'admin' | 'manager' | 'learner';

interface RoleState {
  role: AppRole | null;
  roles: AppRole[];
  loading: boolean;
}

export function useRole() {
  const { user, loading: authLoading } = useAuth();
  const [roleState, setRoleState] = useState<RoleState>({
    role: null,
    roles: [],
    loading: true,
  });

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setRoleState({ role: null, roles: [], loading: false });
      return;
    }

    const fetchRoles = async () => {
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select(`
            role_id,
            roles:role_id (name)
          `)
          .eq('user_id', user.id);

        if (error) throw error;

        const roles = data
          ?.map((ur: any) => ur.roles?.name as AppRole)
          .filter(Boolean) ?? [];

        // Get highest priority role
        const rolePriority: Record<AppRole, number> = {
          admin: 1,
          manager: 2,
          learner: 3,
        };

        const sortedRoles = [...roles].sort(
          (a, b) => rolePriority[a] - rolePriority[b]
        );

        setRoleState({
          role: sortedRoles[0] ?? null,
          roles,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching roles:', error);
        setRoleState({ role: null, roles: [], loading: false });
      }
    };

    fetchRoles();
  }, [user, authLoading]);

  const hasRole = (role: AppRole): boolean => {
    return roleState.roles.includes(role);
  };

  const isAdmin = (): boolean => hasRole('admin');
  const isManager = (): boolean => hasRole('manager');
  const isLearner = (): boolean => hasRole('learner');

  // Check if user has at least one of the specified roles
  const hasAnyRole = (roles: AppRole[]): boolean => {
    return roles.some(role => roleState.roles.includes(role));
  };

  return {
    role: roleState.role,
    roles: roleState.roles,
    loading: roleState.loading || authLoading,
    hasRole,
    hasAnyRole,
    isAdmin,
    isManager,
    isLearner,
  };
}

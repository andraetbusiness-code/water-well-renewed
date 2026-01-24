import { createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';
import { useRole, AppRole } from '@/hooks/useRole';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  roles: AppRole[];
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: AppRole) => boolean;
  hasAnyRole: (roles: AppRole[]) => boolean;
  isAdmin: () => boolean;
  isManager: () => boolean;
  isLearner: () => boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, metadata?: { first_name?: string; last_name?: string }) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const roleData = useRole();

  const value: AuthContextType = {
    user: auth.user,
    session: auth.session,
    role: roleData.role,
    roles: roleData.roles,
    loading: auth.loading || roleData.loading,
    isAuthenticated: auth.isAuthenticated,
    hasRole: roleData.hasRole,
    hasAnyRole: roleData.hasAnyRole,
    isAdmin: roleData.isAdmin,
    isManager: roleData.isManager,
    isLearner: roleData.isLearner,
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

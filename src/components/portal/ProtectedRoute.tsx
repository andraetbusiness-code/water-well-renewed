import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
import { AppRole } from '@/hooks/useRole';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: AppRole[];
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { isAuthenticated, loading, hasAnyRole } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, saving the attempted location
    return <Navigate to="/portal/login" state={{ from: location }} replace />;
  }

  // Check role-based access if roles are specified
  if (requiredRoles && requiredRoles.length > 0) {
    if (!hasAnyRole(requiredRoles)) {
      // User is authenticated but doesn't have required role
      return <Navigate to="/portal" replace />;
    }
  }

  return <>{children}</>;
}

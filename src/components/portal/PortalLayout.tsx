import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { PortalSidebar } from './PortalSidebar';
import { PortalHeader } from './PortalHeader';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import { AppRole } from '@/hooks/useRole';

interface PortalLayoutProps {
  children: ReactNode;
  title?: string;
  requiredRoles?: AppRole[];
}

export function PortalLayout({ children, title, requiredRoles }: PortalLayoutProps) {
  return (
    <AuthProvider>
      <ProtectedRoute requiredRoles={requiredRoles}>
        <Helmet>
          <title>{title ? `${title} | Portal` : 'Employee Portal'}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <PortalSidebar />
            <SidebarInset className="flex flex-col flex-1">
              <PortalHeader />
              <main className="flex-1 p-4 md:p-6 overflow-auto">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}

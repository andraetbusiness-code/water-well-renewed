import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { PortalSidebar } from './PortalSidebar';
import { PortalHeader } from './PortalHeader';

interface PortalLayoutProps {
  children: ReactNode;
  title?: string;
}

export function PortalLayout({ children, title }: PortalLayoutProps) {
  return (
    <>
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
    </>
  );
}

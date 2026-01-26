import { 
  Home, 
  BookOpen, 
  ClipboardCheck, 
  BarChart3, 
  Users, 
  FileEdit,
  Settings,
  GraduationCap,
  CheckSquare,
  Trophy,
  Target
} from 'lucide-react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: ('admin' | 'manager' | 'learner')[];
}

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', url: '/portal', icon: Home },
  { title: 'My Training', url: '/portal/program', icon: GraduationCap },
  { title: 'Assignments', url: '/portal/assignments', icon: ClipboardCheck },
  { title: 'Check-ins', url: '/portal/checkins', icon: CheckSquare },
  { title: 'Scorecard', url: '/portal/scorecard', icon: BarChart3 },
  { title: 'Leaderboard', url: '/portal/leaderboard', icon: Trophy },
  { title: 'Pipeline', url: '/portal/pipeline', icon: Target },
];

const managerNavItems: NavItem[] = [
  { title: 'My Team', url: '/portal/manager/team', icon: Users, roles: ['admin', 'manager'] },
  { title: 'Reviews', url: '/portal/manager/reviews', icon: FileEdit, roles: ['admin', 'manager'] },
];

const adminNavItems: NavItem[] = [
  { title: 'Users', url: '/portal/admin/users', icon: Users, roles: ['admin'] },
  { title: 'Content', url: '/portal/admin/content', icon: BookOpen, roles: ['admin'] },
  { title: 'Settings', url: '/portal/admin/settings', icon: Settings, roles: ['admin'] },
];

export function PortalSidebar() {
  const { hasAnyRole, role } = useAuthContext();
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const filterByRole = (items: NavItem[]) => {
    return items.filter(item => {
      if (!item.roles) return true;
      return hasAnyRole(item.roles);
    });
  };

  const isActive = (url: string) => {
    if (url === '/portal') {
      return location.pathname === '/portal';
    }
    return location.pathname.startsWith(url);
  };

  const renderNavItems = (items: NavItem[]) => {
    const filteredItems = filterByRole(items);
    if (filteredItems.length === 0) return null;

    return (
      <SidebarMenu>
        {filteredItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive(item.url)}>
              <RouterNavLink to={item.url}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </RouterNavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <RouterNavLink to="/portal" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Logo" 
            className={cn(
              "transition-all duration-200",
              isCollapsed ? "h-8 w-8 object-contain" : "h-8"
            )}
          />
          {!isCollapsed && (
            <span className="font-semibold text-sm">Portal</span>
          )}
        </RouterNavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderNavItems(mainNavItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {hasAnyRole(['admin', 'manager']) && (
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              {renderNavItems(managerNavItems)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {hasAnyRole(['admin']) && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              {renderNavItems(adminNavItems)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        {!isCollapsed && (
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Select Source
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

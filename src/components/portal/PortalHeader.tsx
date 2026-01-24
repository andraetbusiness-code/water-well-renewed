import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthContext } from './AuthProvider';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface PortalHeaderProps {
  className?: string;
}

export function PortalHeader({ className }: PortalHeaderProps) {
  const { user, role, signOut } = useAuthContext();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      navigate('/portal/login');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case 'admin':
        return 'bg-destructive/10 text-destructive';
      case 'manager':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <header className={cn(
      "h-14 border-b border-border bg-card flex items-center justify-between px-4",
      className
    )}>
      <div className="flex items-center gap-2">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-lg font-semibold text-foreground hidden sm:block">
          Employee Portal
        </h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium">
                {user?.email?.split('@')[0] ?? 'User'}
              </span>
              {role && (
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full capitalize",
                  getRoleBadgeColor()
                )}>
                  {role}
                </span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{user?.email}</span>
              {role && (
                <span className="text-xs text-muted-foreground capitalize">
                  {role}
                </span>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

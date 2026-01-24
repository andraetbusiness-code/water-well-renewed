import { motion } from 'framer-motion';
import { Users, Plus, Search, Filter, MoreHorizontal, Mail, Shield, UserX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PortalLayout } from '@/components/portal/PortalLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Placeholder users
const users = [
  { id: 1, name: 'Admin User', email: 'admin@test.com', role: 'admin', status: 'active', team: null, createdAt: '2025-01-01' },
  { id: 2, name: 'Manager One', email: 'manager1@example.com', role: 'manager', status: 'active', team: 'Team Alpha', createdAt: '2025-01-10' },
  { id: 3, name: 'John Smith', email: 'john@example.com', role: 'learner', status: 'active', team: 'Team Alpha', createdAt: '2025-01-15' },
  { id: 4, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'learner', status: 'active', team: 'Team Alpha', createdAt: '2025-01-16' },
  { id: 5, name: 'New Hire', email: 'newhire@example.com', role: 'learner', status: 'invited', team: 'Team Beta', createdAt: '2025-01-23' },
  { id: 6, name: 'Suspended User', email: 'suspended@example.com', role: 'learner', status: 'suspended', team: 'Team Alpha', createdAt: '2025-01-05' },
];

const roleColors = {
  admin: 'bg-purple-500',
  manager: 'bg-blue-500',
  learner: 'bg-green-500',
};

const statusColors = {
  active: 'bg-green-500',
  invited: 'bg-orange-500',
  suspended: 'bg-red-500',
};

export default function UsersPage() {
  return (
    <PortalLayout title="User Management">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage users, roles, and team assignments
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'invited').length}</p>
              <p className="text-xs text-muted-foreground">Pending Invites</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'manager').length}</p>
              <p className="text-xs text-muted-foreground">Managers</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.team || <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        <span className={`w-2 h-2 rounded-full ${statusColors[user.status as keyof typeof statusColors]} mr-2`} />
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Shield className="h-4 w-4 mr-2" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            Assign Team
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Resend Invite
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <UserX className="h-4 w-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Content Requirements Notice */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-6 text-center">
            <Users className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Placeholder user list. Full CRUD operations will be implemented with proper role management.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

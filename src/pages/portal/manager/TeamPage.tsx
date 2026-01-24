import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertTriangle, CheckCircle2, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

// Placeholder team data
const teamMembers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    phase: 'Boot Camp',
    day: 7,
    progress: 45,
    salesGoal: 3,
    currentSales: 1,
    status: 'on_track',
    lastCheckin: '2025-01-23',
    pendingAssignments: 2,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phase: 'Boot Camp',
    day: 5,
    progress: 30,
    salesGoal: 3,
    currentSales: 0,
    status: 'at_risk',
    lastCheckin: '2025-01-21',
    pendingAssignments: 4,
  },
  {
    id: 3,
    name: 'Mike Williams',
    email: 'mike@example.com',
    phase: 'Ramp Up',
    day: 20,
    progress: 60,
    salesGoal: 8,
    currentSales: 5,
    status: 'on_track',
    lastCheckin: '2025-01-23',
    pendingAssignments: 1,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    phase: 'Boot Camp',
    day: 10,
    progress: 70,
    salesGoal: 3,
    currentSales: 2,
    status: 'ahead',
    lastCheckin: '2025-01-23',
    pendingAssignments: 0,
  },
];

const statusConfig = {
  ahead: { label: 'Ahead', color: 'bg-green-500', textColor: 'text-green-500' },
  on_track: { label: 'On Track', color: 'bg-blue-500', textColor: 'text-blue-500' },
  at_risk: { label: 'At Risk', color: 'bg-red-500', textColor: 'text-red-500' },
};

export default function TeamPage() {
  const atRiskCount = teamMembers.filter(m => m.status === 'at_risk').length;
  const avgProgress = Math.round(teamMembers.reduce((acc, m) => acc + m.progress, 0) / teamMembers.length);

  return (
    <PortalLayout title="My Team">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold">My Team</h1>
          <p className="text-muted-foreground mt-1">
            Monitor team progress and performance
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{teamMembers.length}</p>
                  <p className="text-xs text-muted-foreground">Team Size</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{avgProgress}%</p>
                  <p className="text-xs text-muted-foreground">Avg Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{atRiskCount}</p>
                  <p className="text-xs text-muted-foreground">At Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{teamMembers.reduce((acc, m) => acc + m.pendingAssignments, 0)}</p>
                  <p className="text-xs text-muted-foreground">Pending Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search team members..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Team Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rep</TableHead>
                  <TableHead>Phase</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Check-in</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => {
                  const status = statusConfig[member.status as keyof typeof statusConfig];
                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.phase}</p>
                          <p className="text-xs text-muted-foreground">Day {member.day}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-24">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{member.progress}%</span>
                          </div>
                          <Progress value={member.progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{member.currentSales}</span>
                        <span className="text-muted-foreground">/{member.salesGoal}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{new Date(member.lastCheckin).toLocaleDateString()}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Content Requirements Notice */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-6 text-center">
            <Users className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Placeholder team data. Real data will come from team assignments and progress tracking.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

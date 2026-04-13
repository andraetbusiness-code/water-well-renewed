import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users,
  FileEdit,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuthContext } from '@/components/portal/AuthProvider';
import { IntegrationBanner } from '@/components/portal/widgets/IntegrationBanner';
import { GHLWidget } from '@/components/portal/widgets/GHLWidget';
import { useIntegrationStatus } from '@/hooks/useIntegrations';
import { AddLeadModal } from '@/components/portal/modals/AddLeadModal';
import { cn } from '@/lib/utils';

// Placeholder data - will be replaced with real data from DB
const learnerStats = {
  coursesCompleted: 2,
  totalCourses: 8,
  lessonsToday: 3,
  checkinsStreak: 5,
  currentPhase: 'Boot Camp',
  daysInPhase: 7,
  salesGoal: 3,
  currentSales: 1,
};

const managerStats = {
  teamSize: 8,
  submissionsToReview: 4,
  atRiskReps: 2,
  teamCompletionRate: 67,
};

function DashboardContent() {
  const { user, role, isAdmin, isManager } = useAuthContext();
  const { data: integrationStatus, isLoading: isLoadingIntegrations } = useIntegrationStatus();
  
  // Modal states
  const [showAddLead, setShowAddLead] = useState(false);

  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'there';

  const progressPercent = (learnerStats.coursesCompleted / learnerStats.totalCourses) * 100;
  const salesProgress = (learnerStats.currentSales / learnerStats.salesGoal) * 100;

  // GoHighLevel is the only integration we sync with.
  const hasGHL = integrationStatus?.ghl.configured && integrationStatus?.ghl.active;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back, {firstName}!
        </h1>
        <p className="text-muted-foreground mt-1">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </motion.div>

      {/* Integration Banner (for admins when GHL isn't connected yet) */}
      {isAdmin() && !isLoadingIntegrations && (
        <IntegrationBanner hasGHL={!!hasGHL} />
      )}

      {/* Manager/Admin Quick Stats */}
      {(isManager() || isAdmin()) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{managerStats.teamSize}</p>
                <p className="text-xs text-muted-foreground">Team Members</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/5 border-orange-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <FileEdit className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{managerStats.submissionsToReview}</p>
                <p className="text-xs text-muted-foreground">To Review</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{managerStats.atRiskReps}</p>
                <p className="text-xs text-muted-foreground">At Risk</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500/5 border-green-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{managerStats.teamCompletionRate}%</p>
                <p className="text-xs text-muted-foreground">Completion</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Integration Widgets Row */}
      {hasGHL && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <GHLWidget />
        </motion.div>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Training Progress
                  </CardTitle>
                  <CardDescription>
                    {learnerStats.currentPhase} • Day {learnerStats.daysInPhase}
                  </CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/portal/program">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span className="font-medium">{learnerStats.coursesCompleted}/{learnerStats.totalCourses} courses</span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>

              {/* Today's Tasks */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Today's Checklist</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Complete Module 3: Pitch Framework</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Submit roleplay video</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Daily check-in</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scorecard Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Boot Camp Goal
              </CardTitle>
              <CardDescription>
                {learnerStats.salesGoal} sales by Day 14
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary">
                  {learnerStats.currentSales}
                </div>
                <p className="text-sm text-muted-foreground">
                  of {learnerStats.salesGoal} sales
                </p>
              </div>

              <Progress 
                value={salesProgress} 
                className={cn(
                  "h-4",
                  salesProgress >= 66 ? "[&>div]:bg-green-500" : 
                  salesProgress >= 33 ? "[&>div]:bg-orange-500" : 
                  "[&>div]:bg-destructive"
                )}
              />

              <div className="text-center">
                <span className={cn(
                  "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
                  salesProgress >= 50 
                    ? "bg-green-500/10 text-green-600" 
                    : "bg-orange-500/10 text-orange-600"
                )}>
                  {salesProgress >= 50 ? 'On Track' : 'Behind Pace'}
                </span>
              </div>

              <Button asChild className="w-full" variant="outline">
                <Link to="/portal/scorecard">View Full Scorecard</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Integration Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="default"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => setShowAddLead(true)}
              >
                <UserPlus className="h-5 w-5" />
                <span>Add Lead (D2D / Home Depot)</span>
              </Button>
            </div>

            {/* Navigation Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/portal/checkins">
                  <ClipboardCheck className="h-5 w-5" />
                  <span>Daily Check-in</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/portal/assignments">
                  <FileEdit className="h-5 w-5" />
                  <span>Submit Work</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/portal/program">
                  <BookOpen className="h-5 w-5" />
                  <span>Continue Training</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/portal/scorecard">
                  <TrendingUp className="h-5 w-5" />
                  <span>My Scorecard</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals */}
      <AddLeadModal open={showAddLead} onOpenChange={setShowAddLead} />
    </div>
  );
}

export default function PortalDashboard() {
  return (
    <PortalLayout title="Dashboard">
      <DashboardContent />
    </PortalLayout>
  );
}

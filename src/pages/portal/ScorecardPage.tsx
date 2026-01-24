import { motion } from 'framer-motion';
import { TrendingUp, Target, Calendar, Award, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PortalLayout } from '@/components/portal/PortalLayout';

// Placeholder scorecard data
const scorecardData = {
  phase: 'Boot Camp',
  day: 7,
  totalDays: 14,
  goals: {
    sales: { current: 1, target: 3, label: 'Sales' },
    appointments: { current: 28, target: 50, label: 'Appointments' },
    coursesCompleted: { current: 2, target: 5, label: 'Courses' },
    checkinStreak: { current: 5, target: 14, label: 'Check-in Streak' },
  },
  weeklyStats: [
    { week: 'Week 1', appointments: 28, sales: 1, status: 'current' },
    { week: 'Week 2', appointments: 0, sales: 0, status: 'upcoming' },
  ],
  rankings: {
    team: 3,
    teamSize: 8,
    overall: 12,
    overallSize: 45,
  }
};

const getProgressColor = (percent: number) => {
  if (percent >= 75) return 'bg-green-500';
  if (percent >= 50) return 'bg-orange-500';
  return 'bg-red-500';
};

const getTrend = (current: number, target: number, day: number, totalDays: number) => {
  const expectedProgress = (day / totalDays) * target;
  if (current >= expectedProgress * 1.1) return { icon: ArrowUp, color: 'text-green-500', label: 'Ahead' };
  if (current >= expectedProgress * 0.9) return { icon: Minus, color: 'text-muted-foreground', label: 'On Track' };
  return { icon: ArrowDown, color: 'text-red-500', label: 'Behind' };
};

export default function ScorecardPage() {
  return (
    <PortalLayout title="My Scorecard">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold">My Scorecard</h1>
          <p className="text-muted-foreground mt-1">
            Track your performance and goals
          </p>
        </motion.div>

        {/* Phase Progress */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">{scorecardData.phase}</h2>
                <p className="text-muted-foreground">Day {scorecardData.day} of {scorecardData.totalDays}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">
                  {Math.round((scorecardData.day / scorecardData.totalDays) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Phase Complete</p>
              </div>
            </div>
            <Progress value={(scorecardData.day / scorecardData.totalDays) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Goal Cards */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(scorecardData.goals).map(([key, goal], index) => {
            const percent = Math.min((goal.current / goal.target) * 100, 100);
            const trend = getTrend(goal.current, goal.target, scorecardData.day, scorecardData.totalDays);
            const TrendIcon = trend.icon;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-muted-foreground">{goal.label}</p>
                      <div className={`flex items-center gap-1 text-xs ${trend.color}`}>
                        <TrendIcon className="h-3 w-3" />
                        {trend.label}
                      </div>
                    </div>
                    <p className="text-2xl font-bold">
                      {goal.current} <span className="text-sm font-normal text-muted-foreground">/ {goal.target}</span>
                    </p>
                    <Progress 
                      value={percent} 
                      className={`h-2 mt-2 [&>div]:${getProgressColor(percent)}`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Rankings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-3xl font-bold">#{scorecardData.rankings.team}</p>
                <p className="text-sm text-muted-foreground">on your team</p>
                <p className="text-xs text-muted-foreground mt-1">of {scorecardData.rankings.teamSize} reps</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-3xl font-bold">#{scorecardData.rankings.overall}</p>
                <p className="text-sm text-muted-foreground">overall</p>
                <p className="text-xs text-muted-foreground mt-1">of {scorecardData.rankings.overallSize} reps</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Weekly Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scorecardData.weeklyStats.map((week, index) => (
                <div
                  key={week.week}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    week.status === 'current' ? 'border-primary bg-primary/5' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{week.week}</span>
                    {week.status === 'current' && (
                      <Badge>Current</Badge>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span>{week.appointments} appts</span>
                    <span className="text-green-500">{week.sales} sales</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Requirements Notice */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Placeholder scorecard. Customize KPIs and goals based on your performance tracking needs.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

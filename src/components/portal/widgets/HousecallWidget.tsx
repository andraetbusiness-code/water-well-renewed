import { motion } from 'framer-motion';
import { Briefcase, Calendar, DollarSign, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Placeholder data - will be replaced with real data from jobs table
const placeholderJobs = {
  todayScheduled: 5,
  completedToday: 2,
  weekRevenue: 8500,
  upcomingJobs: [
    { id: 1, customer: 'Smith Residence', time: '2:00 PM', type: 'Installation' },
    { id: 2, customer: 'Johnson Home', time: '4:30 PM', type: 'Maintenance' },
  ],
};

export function HousecallWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5 text-blue-500" />
              Today's Jobs
            </CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/portal/jobs">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 rounded-lg bg-blue-500/10">
              <Calendar className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-blue-600">{placeholderJobs.todayScheduled}</p>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-green-500/10">
              <Briefcase className="h-4 w-4 text-green-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-green-600">{placeholderJobs.completedToday}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-primary/10">
              <DollarSign className="h-4 w-4 text-primary mx-auto mb-1" />
              <p className="text-xl font-bold text-primary">${(placeholderJobs.weekRevenue / 1000).toFixed(1)}k</p>
              <p className="text-xs text-muted-foreground">This Week</p>
            </div>
          </div>

          {/* Upcoming Jobs */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-3">Up Next</h4>
            <div className="space-y-2">
              {placeholderJobs.upcomingJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span className="text-sm font-medium">{job.time}</span>
                    </div>
                    <span className="text-sm">{job.customer}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {job.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

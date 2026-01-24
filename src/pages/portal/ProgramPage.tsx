import { motion } from 'framer-motion';
import { BookOpen, Play, Lock, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PortalLayout } from '@/components/portal/PortalLayout';

// Placeholder data structure
const phases = [
  {
    id: 1,
    name: 'Boot Camp',
    description: 'Days 1-14: Foundation training and first sales',
    status: 'in_progress',
    progress: 35,
    courses: [
      { id: 1, title: 'Company Overview & Culture', duration: '45 min', status: 'completed' },
      { id: 2, title: 'Product Knowledge Fundamentals', duration: '1.5 hrs', status: 'completed' },
      { id: 3, title: 'The Pitch Framework', duration: '2 hrs', status: 'in_progress' },
      { id: 4, title: 'Objection Handling', duration: '1.5 hrs', status: 'locked' },
      { id: 5, title: 'Closing Techniques', duration: '1 hr', status: 'locked' },
    ]
  },
  {
    id: 2,
    name: 'Ramp Up',
    description: 'Days 15-45: Building consistency and skills',
    status: 'locked',
    progress: 0,
    courses: [
      { id: 6, title: 'Advanced Water Science', duration: '2 hrs', status: 'locked' },
      { id: 7, title: 'Customer Psychology', duration: '1.5 hrs', status: 'locked' },
      { id: 8, title: 'Territory Management', duration: '1 hr', status: 'locked' },
    ]
  },
  {
    id: 3,
    name: 'Production',
    description: 'Days 46+: Mastery and leadership development',
    status: 'locked',
    progress: 0,
    courses: [
      { id: 9, title: 'Team Leadership Basics', duration: '2 hrs', status: 'locked' },
      { id: 10, title: 'Mentoring New Reps', duration: '1 hr', status: 'locked' },
    ]
  }
];

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  in_progress: { icon: Play, color: 'text-primary', bg: 'bg-primary/10' },
  locked: { icon: Lock, color: 'text-muted-foreground', bg: 'bg-muted' },
};

export default function ProgramPage() {
  return (
    <PortalLayout title="Training Program">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold">Training Program</h1>
          <p className="text-muted-foreground mt-1">
            Complete your training phases to become a top performer
          </p>
        </motion.div>

        {/* Overall Progress */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">2 of 10 courses completed</span>
            </div>
            <Progress value={20} className="h-2" />
          </CardContent>
        </Card>

        {/* Phases */}
        <div className="space-y-6">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={phase.status === 'locked' ? 'opacity-60' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{phase.name}</CardTitle>
                        <Badge variant={phase.status === 'in_progress' ? 'default' : 'secondary'}>
                          {phase.status === 'completed' ? 'Completed' : 
                           phase.status === 'in_progress' ? 'In Progress' : 'Locked'}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">{phase.description}</CardDescription>
                    </div>
                    {phase.status !== 'locked' && (
                      <div className="text-right">
                        <span className="text-2xl font-bold">{phase.progress}%</span>
                        <p className="text-xs text-muted-foreground">Complete</p>
                      </div>
                    )}
                  </div>
                  {phase.status !== 'locked' && (
                    <Progress value={phase.progress} className="h-2 mt-3" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {phase.courses.map((course) => {
                      const config = statusConfig[course.status as keyof typeof statusConfig];
                      const Icon = config.icon;
                      
                      return (
                        <div
                          key={course.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            course.status === 'locked' ? 'bg-muted/30' : 'hover:bg-muted/50 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.bg}`}>
                              <Icon className={`h-4 w-4 ${config.color}`} />
                            </div>
                            <div>
                              <p className={`font-medium ${course.status === 'locked' ? 'text-muted-foreground' : ''}`}>
                                {course.title}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {course.duration}
                              </div>
                            </div>
                          </div>
                          {course.status === 'in_progress' && (
                            <Button size="sm">Continue</Button>
                          )}
                          {course.status === 'completed' && (
                            <Button size="sm" variant="ghost">Review</Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Content Requirements Notice */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              This is placeholder content. Actual courses, modules, and lessons will be populated from your training materials.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

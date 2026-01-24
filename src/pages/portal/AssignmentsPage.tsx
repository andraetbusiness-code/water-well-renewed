import { motion } from 'framer-motion';
import { FileEdit, Upload, CheckCircle2, Clock, AlertCircle, Video, FileText, Mic } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortalLayout } from '@/components/portal/PortalLayout';

// Placeholder assignments
const assignments = [
  {
    id: 1,
    title: 'Pitch Video Recording',
    type: 'video',
    course: 'The Pitch Framework',
    dueDate: '2025-01-26',
    status: 'pending',
    description: 'Record yourself delivering the full pitch to a practice customer.',
  },
  {
    id: 2,
    title: 'Objection Handling Roleplay',
    type: 'video',
    course: 'Objection Handling',
    dueDate: '2025-01-28',
    status: 'pending',
    description: 'Record a roleplay handling the top 5 objections.',
  },
  {
    id: 3,
    title: 'Product Knowledge Quiz',
    type: 'quiz',
    course: 'Product Knowledge Fundamentals',
    dueDate: '2025-01-24',
    status: 'submitted',
    submittedAt: '2025-01-23',
    description: 'Complete the product knowledge assessment.',
  },
  {
    id: 4,
    title: 'Water Test Demo Script',
    type: 'document',
    course: 'Company Overview & Culture',
    dueDate: '2025-01-22',
    status: 'graded',
    grade: 'Pass',
    feedback: 'Great job covering all the key points!',
    description: 'Write out your water test demonstration script.',
  },
];

const typeIcons = {
  video: Video,
  document: FileText,
  audio: Mic,
  quiz: FileEdit,
};

const statusConfig = {
  pending: { label: 'Pending', variant: 'outline' as const, color: 'text-orange-500' },
  submitted: { label: 'Submitted', variant: 'secondary' as const, color: 'text-blue-500' },
  graded: { label: 'Graded', variant: 'default' as const, color: 'text-green-500' },
  overdue: { label: 'Overdue', variant: 'destructive' as const, color: 'text-destructive' },
};

export default function AssignmentsPage() {
  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const gradedCount = assignments.filter(a => a.status === 'graded').length;

  return (
    <PortalLayout title="Assignments">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground mt-1">
            Submit your work and track feedback from your manager
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="py-4 text-center">
              <Clock className="h-5 w-5 mx-auto text-orange-500 mb-1" />
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <Upload className="h-5 w-5 mx-auto text-blue-500 mb-1" />
              <p className="text-2xl font-bold">{submittedCount}</p>
              <p className="text-xs text-muted-foreground">Submitted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto text-green-500 mb-1" />
              <p className="text-2xl font-bold">{gradedCount}</p>
              <p className="text-xs text-muted-foreground">Graded</p>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Tabs */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="submitted">Submitted ({submittedCount})</TabsTrigger>
            <TabsTrigger value="graded">Graded ({gradedCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {assignments.filter(a => a.status === 'pending').map((assignment) => {
              const TypeIcon = typeIcons[assignment.type as keyof typeof typeIcons];
              return (
                <Card key={assignment.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <TypeIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                          <p className="text-xs text-muted-foreground mt-1">{assignment.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">Due: {new Date(assignment.dueDate).toLocaleDateString()}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Submit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="submitted" className="space-y-4 mt-4">
            {assignments.filter(a => a.status === 'submitted').map((assignment) => {
              const TypeIcon = typeIcons[assignment.type as keyof typeof typeIcons];
              return (
                <Card key={assignment.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <TypeIcon className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">Awaiting Review</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">View Submission</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="graded" className="space-y-4 mt-4">
            {assignments.filter(a => a.status === 'graded').map((assignment) => {
              const TypeIcon = typeIcons[assignment.type as keyof typeof typeIcons];
              return (
                <Card key={assignment.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <TypeIcon className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="default">{assignment.grade}</Badge>
                          </div>
                          {assignment.feedback && (
                            <p className="text-sm text-green-600 mt-2 italic">"{assignment.feedback}"</p>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>

        {/* Content Requirements Notice */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-6 text-center">
            <FileEdit className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Placeholder assignments. Real assignments will be linked to specific courses and modules.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

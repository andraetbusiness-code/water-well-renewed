import { motion } from 'framer-motion';
import { FileEdit, Video, FileText, CheckCircle2, XCircle, Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { PortalLayout } from '@/components/portal/PortalLayout';

// Placeholder submissions
const submissions = [
  {
    id: 1,
    repName: 'John Smith',
    repEmail: 'john@example.com',
    assignmentTitle: 'Pitch Video Recording',
    type: 'video',
    submittedAt: '2025-01-23T14:30:00',
    status: 'pending',
    course: 'The Pitch Framework',
  },
  {
    id: 2,
    repName: 'Sarah Johnson',
    repEmail: 'sarah@example.com',
    assignmentTitle: 'Water Test Demo Script',
    type: 'document',
    submittedAt: '2025-01-22T09:15:00',
    status: 'pending',
    course: 'Product Knowledge',
  },
  {
    id: 3,
    repName: 'Emily Davis',
    repEmail: 'emily@example.com',
    assignmentTitle: 'Objection Handling Roleplay',
    type: 'video',
    submittedAt: '2025-01-21T16:45:00',
    status: 'reviewed',
    grade: 'Pass',
    feedback: 'Great handling of the price objection. Work on the timing concern.',
    course: 'Objection Handling',
  },
  {
    id: 4,
    repName: 'Mike Williams',
    repEmail: 'mike@example.com',
    assignmentTitle: 'Closing Techniques Practice',
    type: 'video',
    submittedAt: '2025-01-20T11:00:00',
    status: 'reviewed',
    grade: 'Needs Work',
    feedback: 'Good effort but missing key closing questions. Please resubmit.',
    course: 'Closing Techniques',
  },
];

const typeIcons = {
  video: Video,
  document: FileText,
};

export default function ReviewsPage() {
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const reviewedCount = submissions.filter(s => s.status === 'reviewed').length;

  return (
    <PortalLayout title="Submission Reviews">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold">Submission Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Review and grade your team's assignment submissions
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-orange-500/5 border-orange-500/20">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-xs text-muted-foreground">Awaiting Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-500/5 border-green-500/20">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{reviewedCount}</p>
                  <p className="text-xs text-muted-foreground">Reviewed This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Tabs */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed ({reviewedCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {submissions.filter(s => s.status === 'pending').map((submission) => {
              const TypeIcon = typeIcons[submission.type as keyof typeof typeIcons];
              return (
                <Card key={submission.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{submission.repName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{submission.assignmentTitle}</h3>
                          <p className="text-sm text-muted-foreground">{submission.repName} • {submission.course}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">
                              <TypeIcon className="h-3 w-3 mr-1" />
                              {submission.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Submitted {new Date(submission.submittedAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">View</Button>
                        <Button>Review</Button>
                      </div>
                    </div>

                    {/* Quick Review Form Placeholder */}
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                          Pass
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <XCircle className="h-4 w-4 mr-2 text-red-500" />
                          Needs Work
                        </Button>
                      </div>
                      <Textarea placeholder="Add feedback for the rep..." rows={2} />
                      <Button className="w-full">Submit Review</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="reviewed" className="space-y-4 mt-4">
            {submissions.filter(s => s.status === 'reviewed').map((submission) => {
              const TypeIcon = typeIcons[submission.type as keyof typeof typeIcons];
              return (
                <Card key={submission.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{submission.repName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{submission.assignmentTitle}</h3>
                          <p className="text-sm text-muted-foreground">{submission.repName} • {submission.course}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={submission.grade === 'Pass' ? 'default' : 'destructive'}>
                              {submission.grade}
                            </Badge>
                          </div>
                          {submission.feedback && (
                            <div className="mt-2 p-2 bg-muted rounded text-sm">
                              <MessageSquare className="h-3 w-3 inline mr-1" />
                              {submission.feedback}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost">View</Button>
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
              Placeholder review queue. Real submissions will be tied to assignments and courses.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

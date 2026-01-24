import { motion } from 'framer-motion';
import { BookOpen, Plus, FolderOpen, FileText, Video, Edit, Trash2, GripVertical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Placeholder content structure
const contentStructure = [
  {
    id: 1,
    name: 'Boot Camp',
    type: 'phase',
    courses: [
      {
        id: 1,
        name: 'Company Overview & Culture',
        modules: [
          { id: 1, name: 'Our Mission', type: 'video', duration: '10 min' },
          { id: 2, name: 'Company History', type: 'text', duration: '5 min' },
          { id: 3, name: 'Culture Quiz', type: 'quiz', duration: '10 min' },
        ]
      },
      {
        id: 2,
        name: 'Product Knowledge Fundamentals',
        modules: [
          { id: 4, name: 'Water Science Basics', type: 'video', duration: '20 min' },
          { id: 5, name: 'The Hygia System', type: 'video', duration: '15 min' },
          { id: 6, name: 'Product Knowledge Quiz', type: 'quiz', duration: '15 min' },
        ]
      },
      {
        id: 3,
        name: 'The Pitch Framework',
        modules: [
          { id: 7, name: 'Opening the Conversation', type: 'video', duration: '15 min' },
          { id: 8, name: 'The Water Test Demo', type: 'video', duration: '20 min' },
          { id: 9, name: 'Pitch Recording Assignment', type: 'assignment', duration: '30 min' },
        ]
      },
    ]
  },
  {
    id: 2,
    name: 'Ramp Up',
    type: 'phase',
    courses: [
      {
        id: 4,
        name: 'Advanced Water Science',
        modules: [
          { id: 10, name: 'Contaminant Deep Dive', type: 'video', duration: '25 min' },
        ]
      },
    ]
  },
];

const typeIcons = {
  video: Video,
  text: FileText,
  quiz: FileText,
  assignment: FileText,
};

const typeColors = {
  video: 'bg-blue-500/10 text-blue-500',
  text: 'bg-green-500/10 text-green-500',
  quiz: 'bg-purple-500/10 text-purple-500',
  assignment: 'bg-orange-500/10 text-orange-500',
};

export default function ContentPage() {
  const totalCourses = contentStructure.reduce((acc, phase) => acc + phase.courses.length, 0);
  const totalModules = contentStructure.reduce((acc, phase) => 
    acc + phase.courses.reduce((acc2, course) => acc2 + course.modules.length, 0), 0);

  return (
    <PortalLayout title="Content Management">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Content Management</h1>
            <p className="text-muted-foreground mt-1">
              Build and organize your training program content
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Phase
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-2xl font-bold">{contentStructure.length}</p>
              <p className="text-xs text-muted-foreground">Phases</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-2xl font-bold">{totalCourses}</p>
              <p className="text-xs text-muted-foreground">Courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-2xl font-bold">{totalModules}</p>
              <p className="text-xs text-muted-foreground">Modules</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tree */}
        <Card>
          <CardHeader>
            <CardTitle>Program Structure</CardTitle>
            <CardDescription>Drag to reorder. Click to edit.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="space-y-2">
              {contentStructure.map((phase) => (
                <AccordionItem key={phase.id} value={`phase-${phase.id}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <FolderOpen className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{phase.name}</span>
                      <Badge variant="secondary">{phase.courses.length} courses</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 space-y-2">
                    {phase.courses.map((course) => (
                      <div key={course.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span className="font-medium">{course.name}</span>
                            <Badge variant="outline">{course.modules.length} modules</Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="pl-6 space-y-1">
                          {course.modules.map((module) => {
                            const TypeIcon = typeIcons[module.type as keyof typeof typeIcons];
                            const colorClass = typeColors[module.type as keyof typeof typeColors];
                            return (
                              <div
                                key={module.id}
                                className="flex items-center justify-between p-2 rounded hover:bg-muted/50"
                              >
                                <div className="flex items-center gap-2">
                                  <GripVertical className="h-3 w-3 text-muted-foreground cursor-grab" />
                                  <div className={`w-6 h-6 rounded flex items-center justify-center ${colorClass}`}>
                                    <TypeIcon className="h-3 w-3" />
                                  </div>
                                  <span className="text-sm">{module.name}</span>
                                  <span className="text-xs text-muted-foreground">{module.duration}</span>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Course to {phase.name}
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Content Requirements Notice */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Placeholder content structure. Full CMS will support video uploads, rich text, quizzes, and assignments.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

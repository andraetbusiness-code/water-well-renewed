import { motion } from 'framer-motion';
import { ClipboardCheck, Calendar, TrendingUp, MessageSquare, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PortalLayout } from '@/components/portal/PortalLayout';

// Placeholder check-in history
const checkinHistory = [
  { date: '2025-01-23', mood: 'great', appointments: 5, sales: 1, note: 'Closed my first deal!' },
  { date: '2025-01-22', mood: 'good', appointments: 4, sales: 0, note: 'Good conversations, close ones.' },
  { date: '2025-01-21', mood: 'okay', appointments: 3, sales: 0, note: 'Tough day but learning.' },
  { date: '2025-01-20', mood: 'great', appointments: 6, sales: 0, note: 'Lots of solid demos.' },
  { date: '2025-01-19', mood: 'good', appointments: 4, sales: 0, note: 'Getting better at the pitch.' },
];

const moodEmojis = {
  great: '🔥',
  good: '😊',
  okay: '😐',
  struggling: '😔',
};

export default function CheckinsPage() {
  const streak = 5;
  const todayCompleted = false;

  return (
    <PortalLayout title="Daily Check-ins">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold">Daily Check-ins</h1>
          <p className="text-muted-foreground mt-1">
            Track your daily progress and stay accountable
          </p>
        </motion.div>

        {/* Streak Card */}
        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Flame className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{streak} Day Streak!</p>
                  <p className="text-sm text-muted-foreground">Keep it going!</p>
                </div>
              </div>
              {!todayCompleted && (
                <Badge variant="outline" className="border-orange-500 text-orange-500">
                  Today's check-in pending
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Today's Check-in Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              Today's Check-in
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mood */}
            <div className="space-y-3">
              <Label>How are you feeling today?</Label>
              <RadioGroup defaultValue="good" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="great" id="great" />
                  <Label htmlFor="great" className="cursor-pointer">🔥 Great</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="good" />
                  <Label htmlFor="good" className="cursor-pointer">😊 Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="okay" id="okay" />
                  <Label htmlFor="okay" className="cursor-pointer">😐 Okay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="struggling" id="struggling" />
                  <Label htmlFor="struggling" className="cursor-pointer">😔 Struggling</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Numbers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointments">Appointments Today</Label>
                <input
                  type="number"
                  id="appointments"
                  min="0"
                  defaultValue="0"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sales">Sales Today</Label>
                <input
                  type="number"
                  id="sales"
                  min="0"
                  defaultValue="0"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="What went well? What challenges did you face? Any wins to celebrate?"
                rows={3}
              />
            </div>

            <Button className="w-full">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Submit Check-in
            </Button>
          </CardContent>
        </Card>

        {/* History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {checkinHistory.map((checkin, index) => (
                <motion.div
                  key={checkin.date}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{moodEmojis[checkin.mood as keyof typeof moodEmojis]}</span>
                    <div>
                      <p className="font-medium">{new Date(checkin.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                      <p className="text-xs text-muted-foreground">{checkin.note}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{checkin.appointments} appts</p>
                    <p className="text-xs text-green-500">{checkin.sales} sales</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Requirements Notice */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-6 text-center">
            <ClipboardCheck className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Placeholder check-in form. Customize fields based on your KPI tracking needs.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

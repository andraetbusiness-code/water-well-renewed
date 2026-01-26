import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trophy, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useLogActivity } from '@/hooks/usePushIntegration';

const activitySchema = z.object({
  activityType: z.string().min(1, 'Activity type is required'),
  notes: z.string().max(500).optional(),
});

type ActivityFormData = z.infer<typeof activitySchema>;

interface LogActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ACTIVITY_TYPES = [
  { value: 'door_knock', label: 'Door Knock', points: 1 },
  { value: 'appointment_set', label: 'Appointment Set', points: 5 },
  { value: 'demo_completed', label: 'Demo Completed', points: 10 },
  { value: 'sale_closed', label: 'Sale Closed', points: 25 },
];

export function LogActivityModal({ open, onOpenChange }: LogActivityModalProps) {
  const logActivity = useLogActivity();
  
  const form = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      activityType: '',
      notes: '',
    },
  });

  const selectedActivityType = form.watch('activityType');
  const selectedActivity = ACTIVITY_TYPES.find(a => a.value === selectedActivityType);

  const onSubmit = async (data: ActivityFormData) => {
    await logActivity.mutateAsync({
      activityType: data.activityType,
      points: selectedActivity?.points,
      notes: data.notes,
    });
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Log Activity
          </DialogTitle>
          <DialogDescription>
            Record your sales activity to update the leaderboard.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="activityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ACTIVITY_TYPES.map((activity) => (
                        <SelectItem key={activity.value} value={activity.value}>
                          <div className="flex items-center justify-between gap-4 w-full">
                            <span>{activity.label}</span>
                            <Badge variant="secondary" className="ml-auto">
                              +{activity.points} pts
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedActivity && (
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Points earned</p>
                <p className="text-3xl font-bold text-primary">+{selectedActivity.points}</p>
              </div>
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional details..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={logActivity.isPending}>
                {logActivity.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log Activity
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { 
  BarChart3, 
  CheckSquare, 
  BookOpen, 
  MessageCircle, 
  Trophy,
  AlertCircle,
  ExternalLink,
  FileText,
  DollarSign
} from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Daily Scorecards',
    description: 'Conversations, contacts, appointments, confirmed YES',
  },
  {
    icon: CheckSquare,
    title: 'Task Checklists',
    description: 'Pre-shift, shift, post-shift',
  },
  {
    icon: BookOpen,
    title: 'SOP Library',
    description: 'Script, objections, store rules',
  },
  {
    icon: MessageCircle,
    title: 'Coaching Feedback Loop',
    description: 'Manager notes + rep confirmations',
  },
  {
    icon: Trophy,
    title: 'Leaderboards',
    description: 'Performance visibility',
  },
  {
    icon: AlertCircle,
    title: 'Issue Reporting',
    description: 'Field blockers',
  },
  {
    icon: FileText,
    title: 'Lead Notes',
    description: 'Log details that help close in-home: age, kids, how long in the home, concerns mentioned during the water test pitch',
  },
  {
    icon: DollarSign,
    title: 'Deal Communication',
    description: 'Enzy is how we communicate with you on your deals. You do not get paid until the project is installed.',
  },
];

export function EnzySlide() {
  return (
    <OnboardingSlideLayout id="training" variant="light">
      <div className="py-8">
        <motion.span
          className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-4 block text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Your Rep Operating System
        </motion.span>

        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Enzy.co
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Daily execution, accountability, deal communication, and performance in one place.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </OnboardingSlideLayout>
  );
}

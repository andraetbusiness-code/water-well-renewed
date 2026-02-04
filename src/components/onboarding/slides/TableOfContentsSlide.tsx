import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { 
  Users, 
  Target, 
  FileText, 
  Trophy, 
  HeartHandshake, 
  Image, 
  GraduationCap 
} from 'lucide-react';

const sections = [
  { num: '01', title: 'Identity & Welcome', icon: Users, id: 'identity' },
  { num: '02', title: 'The Role', icon: Target, id: 'role' },
  { num: '03', title: 'Script & Standards', icon: FileText, id: 'script' },
  { num: '04', title: 'Performance & Rewards', icon: Trophy, id: 'performance' },
  { num: '05', title: 'Support & Leadership', icon: HeartHandshake, id: 'support' },
  { num: '06', title: 'Marketing Materials', icon: Image, id: 'marketing' },
  { num: '07', title: 'Training & Tools', icon: GraduationCap, id: 'training' },
];

export function TableOfContentsSlide() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <OnboardingSlideLayout id="toc" variant="cream">
      <div className="min-h-[80vh] flex flex-col justify-center">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What's Inside
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group flex items-center gap-4 p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <section.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-primary tracking-wider">{section.num}</span>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}

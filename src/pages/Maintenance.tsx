import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight,
  Calendar,
  Check,
  Phone,
  Wrench,
  Clock,
  Shield,
  Droplets,
  Settings
} from "lucide-react";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { FloatingBubbles } from "@/components/WaterEffects";
import { InfographicCard, InfographicGrid } from "@/components/InfographicCard";
import { cacheBust } from "@/lib/cache-bust";
import maintenanceScheduleImg from "@/assets/infographics/maintenance-schedule-styled.png";
import waterSoftenerImg from "@/assets/photos/water-softener.png";

const maintenanceTasks = [
  {
    icon: Droplets,
    title: "Check Salt Level",
    frequency: "Every 1-2 Months",
    description: "Check salt level and fill with high-purity salt pellets as needed to keep the system functioning properly.",
  },
  {
    icon: Calendar,
    title: "Annual System Inspection",
    frequency: "Yearly",
    description: "Schedule professional inspection & service. Check timer, settings, regeneration frequency. Inspect components, resin media, & valves.",
  },
  {
    icon: Shield,
    title: "Optional UV Bulb Replacement",
    frequency: "Annually",
    description: "Replace UV bulb annually to maintain effectiveness. Prevents bacterial growth and ensures water safety.",
  }
];

const roFilterSchedule = [
  {
    filter: "Sediment Filter",
    frequency: "Replace every 6-12 months",
  },
  {
    filter: "Carbon Filters",
    frequency: "Replace every 12 months",
  },
  {
    filter: "RO Membrane",
    frequency: "Replace every 24 months",
  }
];

const annualTasks = [
  {
    title: "Add Salt To Brine Tank",
    description: "Check & refill the salt in the brine tank as needed to keep the system functioning properly.",
  },
  {
    title: "Clean The Brine Tank",
    description: "Clean tank to remove salt buildup, mold & bacteria. Use a water softener cleaner or diluted bleach (1 cup per 3 gallons of water).",
  },
  {
    title: "Replace RO Filters",
    description: "Replace sediment, carbon & RO membrane filters. Install a new post filter as well. Follow the manufacturer's instructions.",
  },
  {
    title: "Sanitize RO System",
    description: "Sanitize via RO system sanitizer or by using a diluted bleach solution. Follow the manufacturer's guidelines for proper sanitization steps.",
  }
];

export default function Maintenance() {
  const tasksRef = useRef(null);
  const roRef = useRef(null);
  const tasksInView = useInView(tasksRef, { once: true, margin: "-100px" });
  const roInView = useInView(roRef, { once: true, margin: "-100px" });

  return (
    <PageLayout>
      <PageHero 
        badge="System Care"
        title="Maintenance"
        subtitle="Requirements"
        description="Keep your HYGIA+ water filtration system running at peak performance with simple, regular maintenance."
      />

      {/* Main Maintenance Tasks */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingBubbles count={8} />
        
        <div className="container relative" ref={tasksRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={tasksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Ion Exchange Salt Water Filtration System
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Regular maintenance ensures your system delivers clean, soft water year after year.
            </p>
          </motion.div>

          {/* Tasks grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {maintenanceTasks.map((task, index) => (
              <motion.div
                key={task.title}
                initial={{ opacity: 0, y: 30 }}
                animate={tasksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group"
              >
                <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <task.icon className="h-7 w-7 text-primary" />
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-3">
                    <Clock className="h-3 w-3" />
                    {task.frequency}
                  </div>
                  
                  <h3 className="text-xl font-serif text-foreground mb-2">
                    {task.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {task.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Infographic & Equipment Photo */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-secondary/20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            {/* Equipment Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-2xl border border-border/30 shadow-xl">
                <img 
                  src={waterSoftenerImg} 
                  alt="HYGIA+ Water Softener Maintenance" 
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold text-foreground text-sm">HYGIA+ System</p>
                <p className="text-muted-foreground text-xs">Check salt level & brine tank monthly</p>
              </div>
            </motion.div>
            
            {/* Infographic */}
            <InfographicCard 
              src={cacheBust(maintenanceScheduleImg)} 
              alt="Annual Water Filter Maintenance Schedule"
            />
          </div>
        </div>
      </section>

      {/* RO Filter Schedule */}
      <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden" ref={roRef}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={roInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Optional Point-of-Use
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              RO Filter Replacement Schedule
            </h2>
          </motion.div>
          
          <div className="max-w-2xl mx-auto space-y-4">
            {roFilterSchedule.map((item, index) => (
              <motion.div
                key={item.filter}
                initial={{ opacity: 0, x: -20 }}
                animate={roInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.filter}</h3>
                  <p className="text-sm text-muted-foreground">{item.frequency}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Maintenance Checklist */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Wrench className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Annual Maintenance Checklist
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete these tasks annually to ensure clean, safe, & soft water year-round.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {annualTasks.map((task, index) => (
              <motion.div
                key={task.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-card border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary/10 mb-8">
              <Settings className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">Need professional maintenance service?</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/#contact" className="gap-2">
                  Schedule Service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:8334227765" className="gap-2">
                  <Phone className="h-4 w-4" />
                  833.422.7765
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

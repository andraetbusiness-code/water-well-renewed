import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  CalendarCheck, 
  ClipboardCheck, 
  Hammer, 
  ThumbsUp,
  ArrowRight,
  ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Schedule Free Assessment",
    description: "Book your complimentary in-home water quality test at a time that works for you.",
    color: "from-primary/20 to-water-light/30",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Custom Solution Design",
    description: "We analyze your water and design a personalized filtration system for your home.",
    color: "from-water-light/30 to-accent/20",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Professional Installation",
    description: "Our licensed technicians install your system in just one day—mess-free.",
    color: "from-accent/20 to-primary/25",
  },
  {
    number: "04",
    icon: ThumbsUp,
    title: "Enjoy Pure Water",
    description: "Experience the difference with our 5-day risk-free trial and lifetime warranty.",
    color: "from-primary/25 to-water-light/40",
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden bg-secondary/20">
      {/* Organic background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-water-light/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Your Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">
            Four Simple Steps to Pure Water
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting pure, soft water in your home is easier than you think.
          </p>
        </motion.div>

        {/* Horizontal flowing steps - no boxes */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop: Horizontal flow */}
          <div className="hidden lg:flex items-start justify-between relative">
            {/* Connecting flow line */}
            <div className="absolute top-16 left-20 right-20 h-1">
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-primary via-water-accent to-accent origin-left rounded-full"
              />
            </div>
            
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative flex-1 text-center px-4"
              >
                {/* Large number with gradient blob behind */}
                <div className="relative inline-block mb-6">
                  <motion.div 
                    className={`absolute inset-0 -m-6 bg-gradient-to-br ${step.color} rounded-full blur-2xl`}
                    animate={{ 
                      scale: [1, 1.15, 1],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.5 
                    }}
                  />
                  <div className="relative w-32 h-32 rounded-full bg-card flex items-center justify-center shadow-xl border-4 border-background">
                    <span className="text-5xl font-serif text-primary">{step.number}</span>
                  </div>
                </div>
                
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-serif text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Vertical flow */}
          <div className="lg:hidden space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative flex items-start gap-6"
              >
                {/* Number circle */}
                <div className="relative flex-shrink-0">
                  <motion.div 
                    className={`absolute inset-0 -m-3 bg-gradient-to-br ${step.color} rounded-full blur-xl`}
                  />
                  <div className="relative w-20 h-20 rounded-full bg-card flex items-center justify-center shadow-lg border-2 border-background">
                    <span className="text-2xl font-serif text-primary">{step.number}</span>
                  </div>
                  
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent" />
                  )}
                </div>
                
                {/* Content */}
                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-serif text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
        >
          {[
            { value: "25+", label: "Years in California" },
            { value: "461+", label: "Google Reviews" },
            { value: "5-Day", label: "Risk-Free Trial" },
            { value: "Lifetime", label: "Warranty" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-serif text-primary font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
          className="text-center mt-10"
        >
          <Button size="lg" variant="default" asChild>
            <a href="#contact">
              Start Your Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
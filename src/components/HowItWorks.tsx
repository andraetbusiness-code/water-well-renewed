import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  CalendarCheck, 
  ClipboardCheck, 
  Hammer, 
  ThumbsUp,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Schedule Free Assessment",
    description: "Book your complimentary in-home water quality test at a time that works for you. Our experts come to you.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Custom Solution Design",
    description: "We analyze your water and design a personalized filtration system tailored to your home's specific needs.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Professional Installation",
    description: "Our licensed technicians install your system in just one day—we leave your home spotless.",
  },
  {
    number: "04",
    icon: ThumbsUp,
    title: "Enjoy Pure Water",
    description: "Experience the difference with our 5-day risk-free trial. Love it or we'll remove it—no questions asked.",
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden">
      {/* Organic background */}
      <div className="absolute inset-0 water-pattern opacity-30" />
      
      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Your Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">
            Four Simple Steps to Pure Water
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting pure, soft water in your home is easier than you think. 
            Here's how we make it happen.
          </p>
        </motion.div>

        {/* Vertical flowing timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Flowing water stream line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2">
              <motion.div 
                initial={{ height: 0 }}
                animate={isInView ? { height: "100%" } : {}}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full bg-gradient-to-b from-primary via-water-accent to-primary/30 rounded-full"
              />
            </div>

            {/* Steps */}
            <div className="space-y-12 md:space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  className={`relative flex items-start gap-6 md:gap-12 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step number bubble on the line */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-background">
                      <span className="text-primary-foreground font-bold text-lg">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ml-24 md:ml-0 ${
                    index % 2 === 1 ? "md:pr-16 lg:pr-24" : "md:pl-16 lg:pl-24"
                  }`}>
                    <div className="bg-card rounded-3xl p-6 md:p-8 border border-border card-elevated">
                      {/* Large watermark number */}
                      <span className="absolute -top-4 -right-4 text-8xl font-serif text-primary/5 pointer-events-none hidden md:block">
                        {step.number}
                      </span>
                      
                      {/* Icon */}
                      <div className="relative mb-5">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
          className="text-center mt-16"
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
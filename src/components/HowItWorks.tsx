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
    description: "Book your complimentary in-home water quality test at a time that works for you.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Custom Solution Design",
    description: "We analyze your water and create a personalized filtration system blueprint.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Professional Installation",
    description: "Our licensed technicians install your system in just one day—mess-free.",
  },
  {
    number: "04",
    icon: ThumbsUp,
    title: "Enjoy Pure Water",
    description: "Experience the difference with our 5-day risk-free trial and lifetime warranty.",
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-20 md:py-28 section-gradient">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting pure, soft water in your home is easier than you think. 
            Here's our simple 4-step process.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step Number Badge */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-lg">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-card border border-border flex items-center justify-center">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button size="lg" asChild>
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

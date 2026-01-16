import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Droplet, 
  Sparkles, 
  Heart, 
  Home as HomeIcon, 
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

const problems = [
  { icon: AlertTriangle, text: "Hard water scale damaging appliances" },
  { icon: AlertTriangle, text: "Dry, itchy skin and dull hair" },
  { icon: AlertTriangle, text: "Spots on dishes and shower doors" },
  { icon: AlertTriangle, text: "Chemical taste and odor in water" },
];

const solutions = [
  { icon: Droplet, text: "Crystal clear, pure-tasting water" },
  { icon: Heart, text: "Softer skin and silkier hair" },
  { icon: HomeIcon, text: "Protected appliances & plumbing" },
  { icon: Sparkles, text: "Spotless dishes and fixtures" },
];

export const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28 section-gradient">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transform Your Water, Transform Your Life
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Say goodbye to hard water problems and hello to the pure, 
            soft water your family deserves.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Problems Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-lg border border-destructive/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Common Water Problems
              </h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <motion.li
                  key={problem.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <problem.icon className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{problem.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-lg border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Our Solution
              </h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.li
                  key={solution.text}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <solution.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{solution.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

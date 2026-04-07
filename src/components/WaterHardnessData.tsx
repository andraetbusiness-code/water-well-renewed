import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const waterData = [
  { city: "Beaumont", ppm: 177, gpg: 10.4, level: "Moderate-Hard" },
  { city: "Banning", ppm: 249, gpg: 14.6, level: "Very Hard" },
  { city: "Moreno Valley", ppm: 197, gpg: 11.5, level: "Hard" },
  { city: "Riverside", ppm: 202, gpg: 11.8, level: "Hard" },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Very Hard": return "text-destructive";
    case "Hard": return "text-orange-600 dark:text-orange-400";
    default: return "text-yellow-600 dark:text-yellow-400";
  }
};

export const WaterHardnessData = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-secondary/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative" ref={ref}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider mb-4">
              <Droplets className="h-4 w-4" />
              <span>Local Water Quality</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">
              How Hard Is Inland Empire Water?
            </h2>
          </motion.div>

          {/* Data Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border-2 border-primary/20 bg-card p-6 md:p-8 mb-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {waterData.map((item, index) => (
                <motion.div
                  key={item.city}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-secondary/50"
                >
                  <h3 className="font-serif text-lg text-foreground font-semibold mb-2">{item.city}</h3>
                  <div className="text-2xl font-bold text-primary">{item.ppm} PPM</div>
                  <div className="text-sm text-muted-foreground mb-1">{item.gpg} GPG</div>
                  <span className={`text-sm font-medium ${getLevelColor(item.level)}`}>
                    {item.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-center max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            The EPA considers anything above 120 PPM (7 GPG) "hard." Every city in our service area 
            exceeds that threshold. Scale buildup, appliance damage, dry skin, and shortened water heater 
            life are the symptoms. We solve them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Button size="lg" asChild>
              <Link to="/free-water-test" className="gap-2">
                Get Your Free Water Test
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

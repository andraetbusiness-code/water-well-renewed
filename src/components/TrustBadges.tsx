import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import homeDepotLogo from "@/assets/home-depot-logo.png";

const stats = [
  { value: "25+", label: "Years in Business" },
  { value: "10K+", label: "Happy Homeowners" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "<$6", label: "Monthly Maintenance" },
];

export const TrustBadges = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container" ref={ref}>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-primary-foreground/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partner Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-primary-foreground/20 pt-8"
        >
          <p className="text-center text-sm text-primary-foreground/60 mb-6">
            Trusted Partner of Leading Retailers
          </p>
          <div className="flex justify-center items-center gap-8">
            <img
              src={homeDepotLogo}
              alt="The Home Depot"
              className="h-12 md:h-16 w-auto opacity-90 hover:opacity-100 transition-opacity brightness-0 invert"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { Star, Home, Shield, Calendar, Phone, CheckCircle, Droplets } from "lucide-react";

const trustItems = [
  { icon: Star, label: "4.7 Stars (461+ Reviews)" },
  { icon: Home, label: "HD Authorized Provider" },
  { icon: Shield, label: "Lifetime Warranty" },
  { icon: Calendar, label: "5-Day Risk-Free Trial" },
  { icon: CheckCircle, label: "Licensed & Insured" },
  { icon: Droplets, label: "Same-Day Installation" },
  { icon: Phone, label: "(951) 499-5136", href: "tel:+19514995136" },
];

// Duplicate for seamless loop
const allItems = [...trustItems, ...trustItems];

export const TrustBar = () => {
  return (
    <div className="w-full bg-[hsl(213,100%,97%)] border-y border-primary/10 overflow-hidden">
      <div className="relative py-3">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {allItems.map((item, i) => {
            const content = (
              <div
                key={`${item.label}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap text-sm text-foreground/80 flex-shrink-0"
              >
                <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
                <span className="mx-2 text-primary/30">•</span>
              </div>
            );

            if (item.href) {
              return (
                <a
                  key={`${item.label}-${i}`}
                  href={item.href}
                  className="flex items-center gap-2 whitespace-nowrap text-sm text-foreground/80 hover:text-primary transition-colors flex-shrink-0"
                >
                  <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                  <span className="mx-2 text-primary/30">•</span>
                </a>
              );
            }

            return content;
          })}
        </motion.div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[hsl(213,100%,97%)] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[hsl(213,100%,97%)] to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};

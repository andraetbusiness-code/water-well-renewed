import { motion } from "framer-motion";

interface BubbleProps {
  size?: "sm" | "md" | "lg";
  delay?: number;
  duration?: number;
  left?: string;
}

const Bubble = ({ size = "md", delay = 0, duration = 4, left = "50%" }: BubbleProps) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };

  return (
    <motion.div
      className={`absolute bottom-0 ${sizeClasses[size]} rounded-full bg-water-accent/30 backdrop-blur-sm`}
      style={{ left }}
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: [0, -400, -800],
        opacity: [0, 0.7, 0],
        scale: [0.5, 1, 0.3],
        x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  );
};

export const FloatingBubbles = ({ count = 15, className = "" }: { count?: number; className?: string }) => {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: ["sm", "md", "lg"][Math.floor(Math.random() * 3)] as "sm" | "md" | "lg",
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    left: `${Math.random() * 100}%`
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} {...bubble} />
      ))}
    </div>
  );
};

export const WaterRipple = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-water-accent/20"
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{
            width: [0, 400, 800],
            height: [0, 400, 800],
            opacity: [0.6, 0.3, 0]
          }}
          transition={{
            duration: 4,
            delay: i * 1.3,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export const WaterDroplet = ({ delay = 0, className = "" }: { delay?: number; className?: string }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ y: -50, opacity: 0 }}
      animate={{
        y: [0, 10, 0],
        opacity: [0.4, 0.8, 0.4]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        className="text-primary/40"
      >
        <path
          d="M12 0C12 0 0 14.4 0 21.6C0 27.232 5.376 32 12 32C18.624 32 24 27.232 24 21.6C24 14.4 12 0 12 0Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );
};

export const WaveBackground = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-32 opacity-10"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        initial={{ x: 0 }}
        animate={{ x: [-50, 0, -50] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
          fill="hsl(var(--primary))"
        />
      </motion.svg>
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-24 opacity-5"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        initial={{ x: 0 }}
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M0,80 C300,20 500,100 700,60 C900,20 1100,80 1200,40 L1200,120 L0,120 Z"
          fill="hsl(var(--water-accent))"
        />
      </motion.svg>
    </div>
  );
};

export const FlowingWater = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Multiple flowing lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-water-accent/30 to-transparent"
          style={{
            top: `${20 + i * 15}%`,
            left: 0,
            right: 0,
          }}
          animate={{
            x: [-200, 200],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 3 + i * 0.5,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

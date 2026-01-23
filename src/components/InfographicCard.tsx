import { motion } from "framer-motion";

interface InfographicCardProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export const InfographicCard = ({ src, alt, className = "", delay = 0 }: InfographicCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`relative group ${className}`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-card/80 backdrop-blur-sm border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-primary/30">
        {/* Organic blob decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <img
          src={src}
          alt={alt}
          className="w-full h-auto relative z-10"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

interface InfographicGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export const InfographicGrid = ({ children, columns = 2, className = "" }: InfographicGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-8 max-w-6xl mx-auto ${className}`}>
      {children}
    </div>
  );
};

import { useCountAnimation } from "@/hooks/useCountAnimation";

interface AnimatedCounterProps {
  value: number | string;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) => {
  const isNumber = typeof value === "number";

  // Always call the hook (Rules of Hooks) but only use it when value is a number
  const { ref, displayValue } = useCountAnimation({
    target: isNumber ? value : 0,
    duration,
    prefix,
    suffix,
  });

  if (!isNumber) {
    // For string values (like "4.7", "Lifetime", "5-Day"), just display as-is
    return (
      <div className={`text-center ${className}`}>
        <div className="text-2xl md:text-3xl font-serif text-primary font-bold animate-glow-pulse">
          {prefix}
          {value}
          {suffix}
        </div>
        <div className="text-sm text-muted-foreground mt-1">{label}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-2xl md:text-3xl font-serif text-primary font-bold animate-glow-pulse">
        {displayValue}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

// Hero variant — uses white text for dark hero backgrounds
export const AnimatedCounterHero = ({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) => {
  const isNumber = typeof value === "number";

  const { ref, displayValue } = useCountAnimation({
    target: isNumber ? value : 0,
    duration,
    prefix,
    suffix,
  });

  if (!isNumber) {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-2xl md:text-3xl font-serif text-primary-foreground font-bold">
          {prefix}
          {value}
          {suffix}
        </div>
        <div className="text-sm text-primary-foreground/60 mt-1">{label}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-2xl md:text-3xl font-serif text-primary-foreground font-bold">
        {displayValue}
      </div>
      <div className="text-sm text-primary-foreground/60 mt-1">{label}</div>
    </div>
  );
};

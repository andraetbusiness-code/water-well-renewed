import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountAnimationOptions {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

interface UseCountAnimationResult {
  ref: React.RefObject<HTMLDivElement>;
  displayValue: string;
}

// easeOutQuart easing function
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useCountAnimation({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
}: UseCountAnimationOptions): UseCountAnimationResult {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);
  const hasAnimated = useRef(false);
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.round(easedProgress * target);

      setDisplayValue(`${prefix}${currentValue.toLocaleString()}${suffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(`${prefix}${target.toLocaleString()}${suffix}`);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [target, duration, prefix, suffix]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return { ref, displayValue };
}

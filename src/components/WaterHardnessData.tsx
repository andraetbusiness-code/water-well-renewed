import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen, Droplets, MapPin, TestTube2 } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: MapPin,
    title: "Start with your water provider",
    text: "Your city name alone is not enough. The utility and source serving your address determine which annual report applies.",
  },
  {
    icon: BookOpen,
    title: "Read the annual water report",
    text: "Consumer Confidence Reports summarize utility sampling, ranges, and regulated-water results for the prior reporting period.",
  },
  {
    icon: TestTube2,
    title: "Test the water at your tap",
    text: "A household assessment adds a current snapshot from your home, where source blending and plumbing can affect what you experience.",
  },
];

export const WaterHardnessData = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-secondary/30 py-20 md:py-28" ref={ref}>
      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }} className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary">
            <Droplets className="h-4 w-4" aria-hidden="true" />
            Local water quality
          </div>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl lg:text-5xl">Your water can change by source, location, and season.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Published utility reports are the right place to begin. Testing at your tap helps connect that regional data to the water in your home.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.1 }} className="rounded-3xl border border-border/60 bg-card p-7 shadow-sm">
              <span className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="mt-6 font-serif text-2xl text-foreground">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.35 }} className="mt-10 flex flex-col items-center justify-center gap-5 text-center sm:flex-row">
          <Button size="lg" asChild>
            <Link to="/free-water-test">Schedule a water test<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </Button>
          <Link to="/service-areas" className="font-semibold text-primary hover:underline">Explore local service-area guides</Link>
        </motion.div>
      </div>
    </section>
  );
};

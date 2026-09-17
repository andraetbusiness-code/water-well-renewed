import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Droplets, FlaskConical, Wrench } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import waterTestImage from "@/assets/photos/authentic/ssw-water-test.jpg";
import installationImage from "@/assets/photos/authentic/ssw-installation-in-progress.jpg";
import completedInstallationImage from "@/assets/photos/authentic/ssw-completed-hygia-installation.jpg";

const steps = [
  { icon: FlaskConical, title: "See what is happening at the tap", text: "An in-home water assessment gives the conversation a real starting point." },
  { icon: Droplets, title: "Understand the options", text: "We explain what softening, filtration, and reverse osmosis each do—and where they fit." },
  { icon: Wrench, title: "Install for the home you have", text: "The selected system is planned around your water source, household, and available space." },
];

export function WaterAnswers() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-24 md:py-32" aria-labelledby="water-answers-title">
      <div className="absolute -right-36 top-16 h-96 w-96 rounded-full bg-cyan-100/55 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-44 bottom-0 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" aria-hidden="true" />

      <div className="container relative grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }} className="relative mx-auto w-full max-w-[650px] pb-16 sm:pr-20">
          <div className="overflow-hidden rounded-[2rem] shadow-[0_28px_70px_rgba(21,72,104,.18)]">
            <img src={waterTestImage} alt="Water samples prepared for an in-home water assessment" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 hidden w-[48%] overflow-hidden rounded-[1.6rem] border-[7px] border-background shadow-2xl sm:block">
            <img src={completedInstallationImage} alt="Completed Select Source Water HYGIA installation" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-1 left-5 rounded-2xl border border-sky-100 bg-white/95 px-5 py-4 shadow-xl backdrop-blur sm:left-8">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-primary">Real SSW work</p>
            <p className="mt-1 text-sm text-muted-foreground">Testing, planning, and installation</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.12 }}>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.19em] text-primary"><Droplets className="h-4 w-4" aria-hidden="true" /> A clearer way to choose</p>
          <h2 id="water-answers-title" className="mt-5 font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl">See the water. Understand the options.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Good water treatment starts with your home—not a one-size-fits-all pitch. We begin with the water at your tap and help you make sense of what comes next.</p>

          <div className="mt-9 space-y-6">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="grid grid-cols-[auto_1fr] gap-4">
                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  {index < steps.length - 1 && <span className="absolute left-1/2 top-12 h-8 w-px -translate-x-1/2 bg-primary/20" aria-hidden="true" />}
                </div>
                <div><h3 className="font-serif text-xl text-foreground">{title}</h3><p className="mt-1.5 leading-relaxed text-muted-foreground">{text}</p></div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link to="/free-water-test" className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary/75">Start with a water test <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <span className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
            <Link to="/filtration-technology" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"><CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" /> Compare treatment types</Link>
          </div>
        </motion.div>
      </div>

      <div className="container relative mt-20 md:mt-24">
        <div className="grid overflow-hidden rounded-[2rem] bg-[#062742] text-white shadow-[0_22px_65px_rgba(6,39,66,.2)] md:grid-cols-[.78fr_1.22fr]">
          <img src={installationImage} alt="Select Source Water professional installing a whole-home system" className="h-72 w-full object-cover object-center md:h-full md:min-h-[330px]" />
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.19em] text-cyan-200">People behind the system</p>
            <h3 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">Real installation. Thoughtful placement. A cleaner finish.</h3>
            <p className="mt-5 max-w-2xl leading-relaxed text-white/75">The equipment matters, but so does the work around it—from choosing the location to making the final connections fit the home.</p>
            <Link to="/hygia-system" className="mt-7 inline-flex w-fit items-center gap-2 font-semibold text-cyan-200 transition-colors hover:text-white">See the HYGIA+ system <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

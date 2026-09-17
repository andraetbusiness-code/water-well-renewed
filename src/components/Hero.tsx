import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Droplets, House, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import waterSystem from "@/assets/photos/water-softener.png";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#061424] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_42%,rgba(39,173,255,0.22),transparent_34%),linear-gradient(135deg,#020914_0%,#071c31_52%,#082d4b_100%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:54px_54px]" />

      <div className="container relative z-10 grid min-h-[92vh] items-center gap-12 pb-32 pt-32 lg:grid-cols-[1.05fr_.95fr] lg:pb-36 lg:pt-36">
        <div className="max-w-3xl">
          <motion.p initial="hidden" animate="visible" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.55 }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
            <Droplets className="h-4 w-4" aria-hidden="true" />
            Whole-home water treatment
          </motion.p>

          <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.08 }} className="max-w-4xl font-serif text-5xl leading-[0.97] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
            Better water,
            <span className="block bg-gradient-to-r from-sky-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent">designed for your home.</span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.16 }} className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
            We test your water, explain what we find, and help you choose a whole-home softening and filtration system matched to your household and water source.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.24 }} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" variant="hero" asChild>
              <Link to="/free-water-test">Schedule a water test<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
            </Button>
            <Button size="lg" variant="heroOutline" asChild><Link to="/hygia-system">Explore the HYGIA+ system</Link></Button>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.32 }} className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/15 pt-6 text-sm text-slate-200">
            <span className="flex items-center gap-2"><House className="h-4 w-4 text-cyan-300" aria-hidden="true" />Whole-home solutions</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" aria-hidden="true" />Professional installation</span>
            <span className="flex items-center gap-2"><Droplets className="h-4 w-4 text-cyan-300" aria-hidden="true" />Water-specific recommendations</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.15 }} className="relative mx-auto w-full max-w-[580px]">
          <motion.div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-cyan-200/30 shadow-[0_0_90px_rgba(24,181,255,.22)]" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
            <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(103,232,249,.9)]" />
          </motion.div>
          <motion.div aria-hidden="true" className="absolute inset-[15%] rounded-full border border-dashed border-sky-300/20" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 36, repeat: Infinity, ease: "linear" }} />
          <div className="absolute inset-x-[15%] bottom-[8%] h-16 rounded-full bg-sky-400/25 blur-3xl" />
          <motion.img src={waterSystem} alt="Select Source Water whole-home filtration and softening systems" className="relative z-10 mx-auto w-full object-contain drop-shadow-[0_32px_55px_rgba(0,0,0,.45)]" animate={reduceMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
          <div className="absolute right-[2%] top-[12%] z-20 max-w-[220px] rounded-2xl border border-white/15 bg-slate-950/65 p-4 backdrop-blur-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">A clearer starting point</p>
            <p className="mt-1 text-sm leading-snug text-slate-100">Test first. Then choose the treatment that fits your water.</p>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

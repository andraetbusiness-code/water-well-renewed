import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Droplets, FlaskConical, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WaveDividerLayered } from "@/components/WaveDivider";
import { WaterParticleField } from "@/components/WaterEffects";
import heroImage from "@/assets/hero-water.jpg";
import waterSystem from "@/assets/photos/water-softener.png";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const trustPoints = [
  { icon: FlaskConical, label: "Test at your tap" },
  { icon: Droplets, label: "Treatment matched to your water" },
  { icon: Wrench, label: "Professional installation" },
];

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const smoothY = useSpring(rawY, { stiffness: 80, damping: 22 });

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden bg-[#05213b] text-white">
      <motion.div className="absolute -inset-x-8 -inset-y-20 z-0" style={reduceMotion ? undefined : { y: smoothY }}>
        <img src={heroImage} alt="Clear water flowing over smooth stones" className="h-full w-full scale-105 object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-[#021628]/75" />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(90deg, rgba(2,22,40,.96) 0%, rgba(3,34,59,.86) 45%, rgba(3,42,70,.56) 72%, rgba(1,20,37,.74) 100%)" }}
      />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_78%_39%,rgba(72,208,255,.24),transparent_30%)]" />
      <WaterParticleField count={18} className="z-[2] opacity-70" />

      <div className="relative z-10 mx-auto grid w-full min-w-0 max-w-[1280px] box-border items-center gap-10 px-6 pb-36 pt-32 lg:grid-cols-[1.04fr_.96fr] lg:gap-6 lg:pb-40 lg:pt-36">
        <div className="min-w-0 max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.55 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-sky-100 backdrop-blur-md">
            <Droplets className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            Water care designed around your home
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.08 }} className="max-w-full font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl xl:text-[5.35rem]">
            Better water starts
            <span className="relative mt-1 block w-fit text-cyan-200">
              right at home.
              <motion.span aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.75 }} className="absolute -bottom-2 left-0 h-2 w-full origin-left rounded-full bg-cyan-300/35" />
            </span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.17 }} className="mt-8 max-w-full text-lg leading-relaxed text-white/85 md:max-w-2xl md:text-xl">
            We test your water, explain what we find, and help you choose whole-home filtration and softening built for your household and water source.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.25 }} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" variant="hero" className="w-full sm:w-auto" asChild>
              <Link to="/free-water-test">Schedule a water test<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
            </Button>
            <Button size="lg" variant="heroOutline" className="w-full sm:w-auto" asChild><Link to="/hygia-system">Explore HYGIA+ systems</Link></Button>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.34 }} className="mt-10 grid max-w-2xl gap-3 border-t border-white/20 pt-6 sm:grid-cols-3">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm leading-snug text-white/80">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-200/15 text-cyan-200"><Icon className="h-4 w-4" aria-hidden="true" /></span>
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 35, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.18 }} className="relative mx-auto hidden w-full max-w-[590px] lg:block">
          <div className="absolute inset-x-[8%] bottom-[3%] top-[12%] rounded-[3.5rem] border border-white/20 bg-white/[0.09] shadow-[0_35px_90px_rgba(1,18,34,.4)] backdrop-blur-md" />
          <div className="absolute inset-x-[17%] bottom-[8%] h-20 rounded-full bg-cyan-200/35 blur-3xl" />
          <motion.img src={waterSystem} alt="Select Source Water whole-home filtration and softening systems" className="relative z-10 mx-auto w-full object-contain drop-shadow-[0_30px_46px_rgba(0,0,0,.36)]" animate={reduceMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
          <div className="absolute bottom-[10%] left-[3%] z-20 max-w-[230px] rounded-2xl border border-white/25 bg-[#06233b]/80 p-4 shadow-xl backdrop-blur-xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-200"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> HYGIA+ solutions</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">Whole-home options selected after we understand your water.</p>
          </div>
        </motion.div>
      </div>

      <WaveDividerLayered position="bottom" className="z-20" />
    </section>
  );
};

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Check, Phone, Shield, MapPin, Award, Star, Sparkles, Clock, Droplets, AlertTriangle, Gift } from "lucide-react";
import slickFront from "@/assets/marketing/hygia-plus-slick-front.jpg";
import slickBack from "@/assets/marketing/hygia-plus-slick-back.jpg";
import homeDepotLogo from "@/assets/home-depot-logo.png";
import logo from "@/assets/logo-icon.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const features = [
  "Dual tank technology",
  "Robust filtration with over 3 cubic feet of media",
  "Complimentary salt and other deliveries",
  "Customizable up to 10 stages of filtration",
  "High capacity system handling up to 196,000 grains",
];

const HygiaPlusDemo = () => {
  return (
    <>
      <Helmet>
        <title>Dual Tank HYGIA+ | Select Source Water</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans">
        {/* ===== SECTION 1: PRODUCT HERO ===== */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-accent" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-primary-foreground/20 blur-3xl" />
            <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-primary-foreground/10 blur-3xl" />
          </div>

          <div className="relative z-10 px-6 py-12 md:py-20 max-w-5xl mx-auto">
            {/* Logo bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-10"
            >
              <img src={logo} alt="Select Source Water" className="h-10 md:h-14 brightness-0 invert" />
              <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Manufactured in Southern California</span>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left: Text content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-primary-foreground/60 uppercase tracking-widest text-sm font-semibold mb-2">
                    Whole-Home Filtration
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-2">
                    DUAL TANK
                  </h1>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
                    HYGIA<span className="text-primary-foreground/70">+</span>
                  </h1>
                </motion.div>

                {/* Pricing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-5xl md:text-6xl font-extrabold text-primary-foreground">
                      $8,990
                    </span>
                    <span className="text-primary-foreground/60 text-lg">or</span>
                    <span className="text-2xl md:text-3xl font-bold text-primary-foreground/90">
                      $102/mo.
                    </span>
                  </div>
                </motion.div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {features.map((feat, i) => (
                    <motion.div
                      key={feat}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-primary-foreground/90 text-base">{feat}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-wrap gap-3"
                >
                  <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                    <span className="text-primary-foreground text-sm font-semibold">Lifetime Warranty</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20">
                    <Award className="w-5 h-5 text-primary-foreground" />
                    <span className="text-primary-foreground text-sm font-semibold">99.99% Removal</span>
                  </div>
                </motion.div>
              </div>

              {/* Right: Product visual area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative flex items-center justify-center overflow-hidden rounded-xl"
              >
                <img src={slickFront} alt="Hygia+ Dual Tank System" className="w-full object-contain scale-110" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: IN-HOME SPECIAL ===== */}
        <section className="relative bg-background overflow-hidden">
          {/* Urgent banner */}
          <div className="bg-gradient-to-r from-primary via-accent to-primary text-accent-foreground py-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-primary-foreground uppercase">
                  In-Home Special!
                </h2>
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Clock className="w-4 h-4" />
                <p className="text-sm font-semibold tracking-wide uppercase">
                  Only available while your water specialist is in-home
                </p>
              </div>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
            {/* === FREE REVERSE OSMOSIS HERO CARD === */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 relative"
            >
              <div className="bg-gradient-to-br from-accent via-primary/90 to-accent rounded-2xl p-8 md:p-10 text-center border-2 border-primary/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary-foreground/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary-foreground/5 blur-3xl" />
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-5 py-2 mb-4"
                  >
                    <Gift className="w-5 h-5 text-primary-foreground" />
                    <span className="text-primary-foreground font-bold text-sm uppercase tracking-wider">Bonus Included</span>
                  </motion.div>
                  <h3 className="text-3xl md:text-5xl font-black text-primary-foreground mb-3 uppercase">
                    Free Reverse Osmosis System
                  </h3>
                  <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-4">
                    A <span className="font-bold text-primary-foreground">$1,500+ value</span> — pure drinking water at your kitchen tap, included at no extra cost with today's installation.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20">
                    <AlertTriangle className="w-4 h-4 text-primary-foreground" />
                    <span className="text-primary-foreground text-sm font-semibold">This offer expires when your specialist leaves</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Back-side image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 flex justify-center"
            >
              <img src={slickBack} alt="Hygia+ Details" className="w-full max-w-3xl object-contain" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Left: Pricing + badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Strike-through pricing */}
                <div className="mb-6">
                  <p className="text-muted-foreground text-lg line-through mb-1">$8,990 or $102/mo.</p>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-5xl md:text-6xl font-extrabold text-primary">$7,990</span>
                  </div>
                  <p className="text-lg text-muted-foreground mt-1">
                    or <span className="text-foreground font-bold text-xl">$89/mo.</span>
                  </p>
                </div>

                {/* Offer badges */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="bg-primary text-primary-foreground font-bold text-xl px-7 py-4 rounded-xl shadow-lg"
                  >
                    $1,000 OFF
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="bg-accent text-accent-foreground font-bold text-xl px-7 py-4 rounded-xl shadow-lg flex items-center gap-2"
                  >
                    <Droplets className="w-5 h-5" />
                    FREE RO SYSTEM
                  </motion.div>
                </div>

                {/* Promotions callout */}
                <div className="bg-secondary rounded-xl p-5 mb-6 border border-border">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground text-sm leading-relaxed">
                      Ask about <span className="font-semibold">first responder, educator &amp; healthcare worker</span> promotions!
                    </p>
                  </div>
                </div>

                {/* Urgency */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-destructive"
                >
                  <Clock className="w-4 h-4" />
                  <p className="text-sm font-bold uppercase tracking-wide">
                    Today only — while your specialist is here
                  </p>
                </motion.div>
              </motion.div>

              {/* Right: Features list + description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <h3 className="text-lg font-bold text-foreground mb-4">Everything Included:</h3>
                <div className="space-y-3 mb-8">
                  {[
                    ...features,
                    "FREE Reverse Osmosis drinking system",
                    "LIFETIME WARRANTY (ask for details)",
                  ].map((feat, i) => (
                    <motion.div
                      key={feat}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className={`text-sm ${feat.includes("FREE Reverse Osmosis") ? "text-primary font-bold" : "text-foreground/80"}`}>{feat}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                  <h4 className="text-sm font-bold text-foreground mb-2">Filter Requirements and Servicing</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our dual tank technology is designed to remove 99.99% of all hardness and chemicals reported by your water district. These units are uniquely designed to remove each chemical and mineral through the filtration media and are fully warranted for the lifetime you spend in your home.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-muted-foreground text-sm mb-3 uppercase tracking-wider font-medium">Professionally Installed</p>
              <a
                href="tel:8336027765"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-2xl md:text-3xl font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Phone className="w-7 h-7" />
                833.602.7765
              </a>
            </motion.div>
          </div>
        </section>

        {/* ===== FOOTER BAR ===== */}
        <footer className="bg-accent text-accent-foreground py-6">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Select Source Water" className="h-8 brightness-0 invert" />
              <span className="text-accent-foreground/40">|</span>
              <img src={homeDepotLogo} alt="Home Depot Authorized" className="h-8 brightness-0 invert opacity-80" />
            </div>
            <div className="flex items-center gap-6 text-sm text-accent-foreground/70">
              <a href="tel:8336027765" className="hover:text-accent-foreground transition-colors flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                833.602.7765
              </a>
              <span>selectsourcewater.com</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HygiaPlusDemo;

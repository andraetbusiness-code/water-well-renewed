import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, MessageCircle, Droplets } from "lucide-react";
import { Helmet } from "react-helmet-async";
import waterGuideCharacter from "@/assets/photos/authentic/ssw-water-guide-character.jpg";

const faqs = [
  {
    question: "How hard is the water in Beaumont, CA?",
    answer: "Beaumont's tap water measures approximately 177 PPM (10.4 GPG) — well into the 'hard' category. The national average is around 60–70 PPM. Beaumont's water is nearly 2x the state average of 90 PPM and has 2 detected contaminants above EPA Maximum Contaminant Level Goals (MCLGs). A free water test will show you exactly what's in your water.",
  },
  {
    question: "What does a free in-home water test include?",
    answer: "Our free water test covers total dissolved solids (TDS), water hardness (calcium & magnesium), chlorine levels, pH balance, iron content, and a contaminant screening relevant to your specific area. We test right in your kitchen, give you results in about 20 minutes, and explain exactly what we found — no sales pressure, no obligation.",
  },
  {
    question: "How long does water softener installation take?",
    answer: "Most installations are completed in a single day. Our licensed technicians handle everything — from installation to testing to a full walkthrough — leaving your home clean and your system ready to use immediately. We typically complete a whole-home system in 3–5 hours.",
  },
  {
    question: "How much does a water softener cost in the Inland Empire?",
    answer: "Every home is different — water hardness, household size, and usage all factor into the right system. As a Home Depot Authorized Provider, Select Source Water offers competitive pricing that's $2,500–$2,800 below what other Home Depot vendors typically charge. We provide a transparent, no-pressure quote after your free water test. Monthly financing is available.",
  },
  {
    question: "Is chromium-6 in Inland Empire water dangerous?",
    answer: "Chromium-6 has been detected in several IE water supplies, including Banning and areas near Riverside. California's public health goal for chromium-6 is 0.02 ppb — significantly lower than federal limits. While legal compliance means the water is technically 'safe' by EPA standards, many health-conscious families choose whole-house filtration as a precautionary measure. We never claim city water is dangerous — we show you the data and let you decide.",
  },
  {
    question: "What is the HYGIA+ system and what does it filter?",
    answer: "The HYGIA+ is our flagship whole-home water conditioning system, specifically calibrated for Inland Empire water chemistry. It handles hardness up to 250+ PPM and includes multi-stage filtration for chlorine, sediment, VOCs, and contaminants like chromium-6. It also includes an optional under-sink reverse osmosis unit for drinking water purity.",
  },
  {
    question: "Do you serve areas outside Beaumont and Banning?",
    answer: "Yes — we serve all of the Inland Empire including Hemet, San Jacinto, Moreno Valley, Riverside, Yucaipa, Calimesa, Cherry Valley, Redlands, and Highland. Our service area is expanding. If your city isn't listed, call us at (951) 612-4094 — we likely serve your area or can arrange a visit.",
  },
  {
    question: "What are your maintenance costs?",
    answer: "Our systems are designed to be low-maintenance. On average, homeowners spend less than $6 per month for upkeep. We offer affordable annual maintenance plans that include a professional inspection, water quality check, and system cleaning. Our Lifetime Warranty covers all parts and labor for any defects or performance issues.",
  },
];

const FAQItem = ({ faq, index, isOpen, onToggle }: { 
  faq: typeof faqs[0]; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left py-6 group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground group-hover:bg-primary/10"
            }`}>
              {index + 1}
            </span>
            
            <span className={`text-lg font-medium transition-colors ${
              isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
            }`}>
              {faq.question}
            </span>
          </div>
          
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 mt-1 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`} />
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pl-12 pb-6 pr-8">
          <p className="text-muted-foreground leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </motion.div>
      
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </motion.div>
  );
};

export const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-water-light/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
        </div>
        
        <div className="container relative" ref={ref}>
          <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[.42fr_.58fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:sticky lg:top-28"
            >
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary">
                <MessageCircle className="h-4 w-4" />
                <span>FAQ</span>
              </div>
              <h2 className="mb-5 font-serif text-3xl text-foreground md:text-4xl lg:text-5xl">
                Water questions, made clearer.
              </h2>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                Straightforward answers to the questions homeowners ask before scheduling a water assessment.
              </p>

              <div className="relative mt-8 overflow-hidden rounded-[1.75rem] shadow-[0_22px_55px_rgba(25,69,96,.18)]">
                <img src={waterGuideCharacter} alt="Animated water glass guide in a home kitchen" className="aspect-[16/10] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061d31]/90 via-[#061d31]/45 to-transparent p-6 pt-16 text-white">
                  <p className="font-serif text-xl">Start with what you notice at home.</p>
                  <p className="mt-1 text-sm text-white/75">Taste, spots, scale, or something else—we'll help you sort through it.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-[2rem] border border-border/60 bg-white/80 px-6 shadow-[0_18px_55px_rgba(23,63,88,.08)] backdrop-blur sm:px-8"
            >
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
              <div className="py-8 text-center">
                <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-secondary/60 px-5 py-3 text-sm sm:text-base">
                <Droplets className="h-5 w-5 text-primary" />
                <span className="text-foreground">
                  Still have questions?{" "}
                  <a href="tel:+19516124094" className="text-primary font-medium hover:underline">
                    Call (951) 612-4094
                  </a>
                  {" "}or{" "}
                  <a href="#contact" className="text-primary font-medium hover:underline">contact us online</a>
                </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

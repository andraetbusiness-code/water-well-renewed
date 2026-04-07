import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, MessageCircle, Droplets } from "lucide-react";

const faqs = [
  {
    question: "What is the process for getting a water filtration system installed?",
    answer: "It starts with a free in-home water test — we come to your home, test your water right in the kitchen, and show you exactly what's in it. From there, we design a custom system for your home and install it in just one day.",
  },
  {
    question: "How long does the installation take?",
    answer: "Our professional installation is completed in just one day. Our licensed technicians handle everything, leaving your home clean and your system ready to use immediately.",
  },
  {
    question: "What types of water filtration systems do you offer?",
    answer: "We offer the HYGIA+ whole-house water filtration and softening system, which includes up to 10 stages of filtration. We also offer an optional point-of-use reverse osmosis (RO) system for drinking water.",
  },
  {
    question: "Are your systems easy to maintain?",
    answer: "Yes! On average, homeowners spend less than $6 per month for maintenance. We also offer affordable annual maintenance plans to keep your system running at peak efficiency.",
  },
  {
    question: "Do you offer warranties on your products?",
    answer: "Yes — every HYGIA+ system comes with a Lifetime Warranty covering all parts and labor. Any issues you encounter will be promptly resolved at no additional cost to you.",
  },
  {
    question: "Can I schedule a consultation?",
    answer: "Absolutely. Call us at (951) 612-4094 or fill out our Free Water Test form. We'll schedule a convenient time to come to your home — no obligation, no pressure.",
  },
  {
    question: "What payment options do you accept?",
    answer: "We offer flexible financing options in addition to standard payment methods. Ask your technician for details during your free water test.",
  },
  {
    question: "What areas do you serve?",
    answer: "We serve the Inland Empire and surrounding Southern California communities, including Beaumont, Banning, Hemet, San Jacinto, Moreno Valley, Riverside, Yucaipa, Calimesa, Cherry Valley, Redlands, and Highland. Our office is located at 790 Beaumont Ave Ste 124, Beaumont, CA 92223. Call (951) 612-4094 to schedule your free water test.",
  },
  {
    question: "How hard is the water in Beaumont, CA?",
    answer: "Beaumont tap water measures approximately 177 PPM (10.4 GPG) — well into the 'hard' category. The EPA and water quality experts recommend treatment for anything above 120 PPM. Beaumont's water also has 2 detected contaminants above EPA Maximum Contaminant Level Goals (MCLGs). A free water test from our team will show you exactly what's in your water.",
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
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Question number/bullet */}
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
      
      {/* Subtle divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </motion.div>
  );
};

export const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
      {/* Organic background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-water-light/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
      </div>
      
      <div className="container relative" ref={ref}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider mb-4">
              <MessageCircle className="h-4 w-4" />
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">
              Questions? We've Got Answers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our water treatment systems.
            </p>
          </motion.div>

          {/* FAQ list - no boxes, clean lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
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
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-secondary/50">
              <Droplets className="h-5 w-5 text-primary" />
              <span className="text-foreground">
                Still have questions? <a href="#contact" className="text-primary font-medium hover:underline">Contact us</a>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
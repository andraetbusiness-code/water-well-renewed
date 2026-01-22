import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, MessageCircle, Droplets } from "lucide-react";

const faqs = [
  {
    question: "How long does installation take?",
    answer: "Our professional installation is completed in just one day. Our licensed technicians handle everything, leaving your home clean and your system ready to use immediately.",
  },
  {
    question: "What's included in the lifetime warranty?",
    answer: "Our comprehensive lifetime warranty covers all parts and labor. Any issues you encounter will be promptly resolved at no additional cost to you. It's our commitment to your complete satisfaction.",
  },
  {
    question: "How does the 5-day risk-free trial work?",
    answer: "We install the system in your home for you to experience firsthand. Use it as you would if you owned it. After 5 days, if you love it, keep it! If not, we remove it promptly with no hassle or obligation.",
  },
  {
    question: "How much does annual maintenance cost?",
    answer: "On average, homeowners spend less than $6 per month for maintenance. This ensures your system operates at peak efficiency, providing consistently pure and soft water year-round.",
  },
  {
    question: "How long do the systems last?",
    answer: "Our carbon filtration systems last approximately 10 years, while the resin in our softening systems is designed to last a lifetime. We use dual-tank systems specifically for this longevity.",
  },
  {
    question: "Will the system reduce my water pressure?",
    answer: "No. Unlike piston-driven systems, our non-piston head design maintains your standard home pressure of 60-75 psi with no reduction at all.",
  },
  {
    question: "Do you service both city and well water?",
    answer: "Yes! Our systems are versatile and can be customized for different water sources. We adjust the filtration and softening process to effectively treat the specific contaminants and conditions of your water.",
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve Southern California (Orange County, Los Angeles, Riverside, Beaumont, Palm Desert) and the Sacramento area. We're also licensed in Arizona.",
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
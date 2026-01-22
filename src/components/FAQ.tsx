import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

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

export const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 md:py-32 bg-secondary/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-water-light/20 rounded-full blur-3xl" />
      
      <div className="container relative" ref={ref}>
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column - Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-5">
              Questions? We've Got Answers
            </h2>
            <p className="text-muted-foreground mb-8">
              Get answers to common questions about our water treatment systems, 
              installation process, and warranties.
            </p>
            
            {/* Decorative illustration placeholder */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-40 h-40 bg-secondary rounded-full flex items-center justify-center">
                  <HelpCircle className="w-20 h-20 text-primary/30" />
                </div>
                {/* Floating droplets */}
                <motion.div 
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-water-light rounded-full"
                />
                <motion.div 
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-2 -left-6 w-6 h-6 bg-primary/20 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Right column - Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-2xl border border-border px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
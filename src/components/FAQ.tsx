import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section id="faq" className="py-20 md:py-28 bg-background">
      <div className="container max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Get answers to common questions about our water treatment systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

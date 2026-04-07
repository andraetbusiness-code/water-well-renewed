import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, ExternalLink } from "lucide-react";

const reviews = [
  {
    text: "Josh was an amazing technician. The job was pristine and he went out of his way to make sure everything was top notch. We love our new house filtration and water softening system. An amazing experience — would highly recommend.",
    reviewer: "Evan B.",
    date: "Sep 2025",
  },
  {
    text: "Jimmy was awesome! We couldn't be happier with the installation of the water softener system and his professionalism. He was very knowledgeable, explained everything well and was very pleasant. Goodbye bottled water!",
    reviewer: "MPac I.",
    date: "Jan 2026",
  },
  {
    text: "Josh Trujillo was a true professional. He installed a fully customized water system in our garage. He was thorough, knowledgeable, and made sure everything was done to our satisfaction. Amazing service from start to finish.",
    reviewer: "Matthew De V.",
    date: "Nov 2025",
  },
  {
    text: "Unbelievable experience with the whole company. I was extremely impressed with everyone from the sales representative to the installation crew. They were all knowledgeable, professional, and truly cared about making sure we were happy. Best investment we've made for our home!",
    reviewer: "Linda M.",
    date: "Apr 2025",
  },
];

export const GoogleReviews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            What Our Customers Say
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-3">
            4.7 Stars Across 461+ Google Reviews
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-accent text-accent" />
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.reviewer}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{review.reviewer}</div>
                  <div className="text-sm text-muted-foreground">{review.date}</div>
                </div>
                <span className="text-xs text-muted-foreground">Verified Google Review</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Read All Reviews on Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

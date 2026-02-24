import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { FloatingBubbles } from "@/components/WaterEffects";
import { cacheBust } from "@/lib/cache-bust";

// Import all styled infographics
import filtrationStagesImg from "@/assets/infographics/10-stages-filtration-styled.png";
import systemDiagramImg from "@/assets/infographics/system-diagram-styled.png";
import maintenanceScheduleImg from "@/assets/infographics/maintenance-schedule-styled.png";
import benefitsImg from "@/assets/infographics/benefits-styled.png";
import whatsInWaterImg from "@/assets/infographics/whats-in-water-styled.png";
import homeNeedsFiltrationImg from "@/assets/infographics/home-needs-filtration-styled.png";
import whyChooseUsImg from "@/assets/infographics/why-choose-us-styled.png";
import customerJourneyImg from "@/assets/infographics/customer-journey-styled.png";
import betterWaterHeroImg from "@/assets/infographics/better-water-hero-styled.png";

// Import team and equipment photos
import proInstallsImg from "@/assets/photos/pro-installs.png";
import waterSoftenerImg from "@/assets/photos/water-softener.png";
import waterTestImg from "@/assets/photos/water-test.png";
import crewImg from "@/assets/photos/crew.png";

const infographics = [
  {
    id: 1,
    src: cacheBust(betterWaterHeroImg),
    alt: "Better Water Starts Here",
    title: "Better Water Starts Here",
    category: "Overview",
    link: "/hygia-system"
  },
  {
    id: 2,
    src: cacheBust(filtrationStagesImg),
    alt: "10 Stages of Water Filtration",
    title: "10-Stage Filtration Process",
    category: "Technology",
    link: "/filtration-technology"
  },
  {
    id: 3,
    src: cacheBust(systemDiagramImg),
    alt: "HYGIA+ System Diagram",
    title: "How The System Works",
    category: "Technology",
    link: "/hygia-system"
  },
  {
    id: 4,
    src: cacheBust(benefitsImg),
    alt: "Benefits of Water Filtration",
    title: "Benefits of Filtration",
    category: "Benefits",
    link: "/hygia-system"
  },
  {
    id: 5,
    src: cacheBust(whatsInWaterImg),
    alt: "What's In Your Water",
    title: "What's In Your Water?",
    category: "Water Quality",
    link: "/what-in-water"
  },
  {
    id: 6,
    src: cacheBust(homeNeedsFiltrationImg),
    alt: "Does Your Home Need Filtration?",
    title: "Signs You Need Filtration",
    category: "Water Quality",
    link: "/what-in-water"
  },
  {
    id: 7,
    src: cacheBust(whyChooseUsImg),
    alt: "Why Choose Select Source Water",
    title: "Why Choose Us",
    category: "About",
    link: "/hygia-system"
  },
  {
    id: 8,
    src: cacheBust(customerJourneyImg),
    alt: "Customer Journey - 5 Steps",
    title: "Your Path to Clean Water",
    category: "Process",
    link: "/process"
  },
  {
    id: 9,
    src: cacheBust(maintenanceScheduleImg),
    alt: "Annual Maintenance Schedule",
    title: "Maintenance Schedule",
    category: "Maintenance",
    link: "/maintenance"
  },
  // Team & Equipment Photos
  {
    id: 10,
    src: cacheBust(crewImg),
    alt: "Select Source Water Team",
    title: "Our Expert Team",
    category: "Team",
    link: "/process"
  },
  {
    id: 11,
    src: cacheBust(proInstallsImg),
    alt: "Professional Installation",
    title: "Professional Installation",
    category: "Team",
    link: "/process"
  },
  {
    id: 12,
    src: cacheBust(waterTestImg),
    alt: "Water Quality Testing",
    title: "Free Water Testing",
    category: "Process",
    link: "/process"
  },
  {
    id: 13,
    src: cacheBust(waterSoftenerImg),
    alt: "HYGIA+ Water Softener Equipment",
    title: "HYGIA+ Equipment",
    category: "Technology",
    link: "/hygia-system"
  }
];

const categories = ["All", "Technology", "Water Quality", "Benefits", "Process", "Maintenance", "Team", "About", "Overview"];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof infographics[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredInfographics = activeCategory === "All" 
    ? infographics 
    : infographics.filter(img => img.category === activeCategory);

  return (
    <PageLayout>
      <PageHero 
        badge="Resource Library"
        title="Infographic"
        subtitle="Gallery"
        description="Explore our visual guides to water filtration, system benefits, and maintenance requirements."
      />

      {/* Category Filter */}
      <section className="py-8 bg-secondary/20 sticky top-20 z-30 backdrop-blur-sm border-b border-border/30">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card hover:bg-card/80 text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <FloatingBubbles count={10} />
        
        <div className="container relative">
          <motion.div 
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredInfographics.map((infographic, index) => (
                <motion.div
                  key={infographic.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="break-inside-avoid mb-6"
                >
                  <div 
                    className="group relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary/30"
                    onClick={() => setSelectedImage(infographic)}
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4">
                      <h3 className="text-primary-foreground font-semibold text-lg mb-1">
                        {infographic.title}
                      </h3>
                      <p className="text-primary-foreground/70 text-sm mb-3">
                        {infographic.category}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-primary-foreground/80 text-sm">
                          <ZoomIn className="h-4 w-4" />
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                    
                    <img
                      src={infographic.src}
                      alt={infographic.alt}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:top-4 md:-right-12 w-10 h-10 rounded-full bg-card/20 hover:bg-card/40 flex items-center justify-center transition-colors z-20"
              >
                <X className="h-5 w-5 text-primary-foreground" />
              </button>

              {/* Image container */}
              <div className="overflow-hidden rounded-2xl bg-card shadow-2xl">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                
                {/* Info bar */}
                <div className="p-4 md:p-6 bg-card border-t border-border/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">
                      {selectedImage.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {selectedImage.category}
                    </p>
                  </div>
                  <Button asChild size="sm">
                    <Link to={selectedImage.link} className="gap-2">
                      Learn More
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Schedule your free in-home water test and discover the right solution for your home.
              </p>
              <Button asChild size="lg">
                <Link to="/#contact">
                  Schedule Free Water Test
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

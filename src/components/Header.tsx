import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const servicesItems = [
  { label: "HYGIA+ System", href: "/hygia-system" },
  { label: "Filtration Technology", href: "/filtration-technology" },
  { label: "What's In Your Water", href: "/what-in-water" },
  { label: "Maintenance", href: "/maintenance" },
];

const serviceAreaItems = [
  { label: "Inland Empire Hub", href: "/service-areas" },
  { label: "Beaumont", href: "/service-areas/beaumont" },
  { label: "Banning", href: "/service-areas/banning" },
  { label: "Hemet", href: "/service-areas/hemet" },
  { label: "Moreno Valley", href: "/service-areas/moreno-valley" },
  { label: "Riverside", href: "/service-areas/riverside" },
  { label: "View All Cities", href: "/service-areas" },
];

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const DesktopDropdown = ({ label, items, isOpen, onToggle, onClose }: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-full transition-all duration-200"
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl shadow-lg border border-border/50 py-2 z-50"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setMobileAccordion(null);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            <Link to="/" className="relative z-10">
              <img
                src={logo}
                alt="Select Source Water"
                className={`transition-all duration-300 ${isScrolled ? "h-10 md:h-12" : "h-12 md:h-14"}`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-card/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm border border-border/50">
              <Link to="/" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-full transition-all duration-200">
                Home
              </Link>
              <DesktopDropdown
                label="Services"
                items={servicesItems}
                isOpen={openDropdown === "services"}
                onToggle={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
                onClose={() => setOpenDropdown(null)}
              />
              <DesktopDropdown
                label="Service Areas"
                items={serviceAreaItems}
                isOpen={openDropdown === "areas"}
                onToggle={() => setOpenDropdown(openDropdown === "areas" ? null : "areas")}
                onClose={() => setOpenDropdown(null)}
              />
              <Link to="/home-depot-authorized-provider" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-full transition-all duration-200">
                Home Depot
              </Link>
              <Link to="/process" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-full transition-all duration-200">
                Process
              </Link>
              <Link to="/about" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-full transition-all duration-200">
                About
              </Link>
              <Link to="/blog" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-full transition-all duration-200">
                Blog
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+19514995136"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <span>(951) 499-5136</span>
              </a>
              <Button variant="default" size="sm" asChild>
                <Link to="/free-water-test">Free Water Test</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isMobileMenuOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background">
              <div className="absolute top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-40 -left-20 w-80 h-80 bg-water-medium/20 rounded-full blur-3xl" />
            </div>

            <nav className="relative h-full flex flex-col px-8 pt-24 pb-8 overflow-y-auto">
              <div className="space-y-1 flex-1">
                {/* Home */}
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0, duration: 0.4 }}>
                  <Link to="/" onClick={closeMobile} className="block text-2xl font-serif text-foreground hover:text-primary transition-colors py-3">
                    Home
                  </Link>
                </motion.div>

                {/* Services Accordion */}
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06, duration: 0.4 }}>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === "services" ? null : "services")}
                    className="flex items-center justify-between w-full text-2xl font-serif text-foreground hover:text-primary transition-colors py-3"
                  >
                    Services
                    <ChevronDown className={`h-5 w-5 transition-transform ${mobileAccordion === "services" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "services" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 space-y-1">
                        {servicesItems.map((item) => (
                          <Link key={item.href} to={item.href} onClick={closeMobile} className="block text-lg text-foreground/70 hover:text-primary py-2">
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Service Areas Accordion */}
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.4 }}>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === "areas" ? null : "areas")}
                    className="flex items-center justify-between w-full text-2xl font-serif text-foreground hover:text-primary transition-colors py-3"
                  >
                    Service Areas
                    <ChevronDown className={`h-5 w-5 transition-transform ${mobileAccordion === "areas" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "areas" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 space-y-1">
                        {serviceAreaItems.map((item) => (
                          <Link key={item.href + item.label} to={item.href} onClick={closeMobile} className="block text-lg text-foreground/70 hover:text-primary py-2">
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Simple links */}
                {[
                  { label: "Home Depot", href: "/home-depot-authorized-provider", delay: 0.18 },
                  { label: "Process", href: "/process", delay: 0.24 },
                  { label: "About", href: "/about", delay: 0.30 },
                  { label: "Blog", href: "/blog", delay: 0.36 },
                ].map((item) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: item.delay, duration: 0.4 }}>
                    <Link to={item.href} onClick={closeMobile} className="block text-2xl font-serif text-foreground hover:text-primary transition-colors py-3">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom pinned section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-border"
              >
                <a
                  href="tel:+19514995136"
                  className="flex items-center gap-3 text-lg font-medium text-primary mb-6"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span>(951) 499-5136</span>
                </a>
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/free-water-test" onClick={closeMobile}>
                    Schedule Free Water Test
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

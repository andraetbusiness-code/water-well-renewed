import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
            {/* Logo - Left on mobile, centered visual weight on desktop */}
            <a href="#" className="relative z-10">
              <img 
                src={logo} 
                alt="Select Source Water" 
                className={`transition-all duration-300 ${
                  isScrolled ? "h-10 md:h-12" : "h-12 md:h-14"
                }`}
              />
            </a>

            {/* Desktop Navigation - Minimal, floating */}
            <nav className="hidden lg:flex items-center gap-1 bg-card/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm border border-border/50">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-full transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href="tel:1-800-555-0123" 
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <span>(800) 555-0123</span>
              </a>
              <Button variant="default" size="sm" asChild>
                <a href="#contact">Free Water Test</a>
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
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Full screen organic overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Organic background with blob shapes */}
            <div className="absolute inset-0 bg-background">
              {/* Decorative blobs */}
              <div className="absolute top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-40 -left-20 w-80 h-80 bg-water-medium/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
            </div>
            
            {/* Menu content */}
            <nav className="relative h-full flex flex-col justify-center px-8 pt-20">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-3xl font-serif text-foreground hover:text-primary transition-colors py-3"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              
              {/* Bottom section with contact */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t border-border"
              >
                <a 
                  href="tel:1-800-555-0123" 
                  className="flex items-center gap-3 text-lg font-medium text-primary mb-6"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span>(800) 555-0123</span>
                </a>
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Schedule Free Water Test
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
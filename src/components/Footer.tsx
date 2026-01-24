import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Process", href: "#how-it-works" },
    { label: "Service Areas", href: "#contact" },
  ],
  services: [
    { label: "Water Testing", href: "#services" },
    { label: "Water Softening", href: "#services" },
    { label: "Filtration Systems", href: "#services" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Warranty Info", href: "#faq" },
    { label: "Staff Login", href: "/portal", isInternal: true },
  ],
};

export const Footer = () => {
  return (
    <footer className="relative bg-foreground overflow-hidden">
      {/* Organic wave decoration at top */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
          style={{ fill: "hsl(var(--foreground))" }}
        >
          <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" opacity="0.3" fill="currentColor" />
        </svg>
      </div>
      
      {/* Floating droplets decoration */}
      <motion.div 
        className="absolute top-32 right-[10%] w-3 h-4 bg-primary-foreground/5 rounded-full"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-48 right-[20%] w-2 h-3 bg-primary-foreground/5 rounded-full"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-32 left-[15%] w-4 h-5 bg-primary-foreground/5 rounded-full"
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative pt-20 pb-12">
        {/* Main footer content - flowing layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand section - takes more space */}
          <div className="lg:col-span-5">
            <a href="#" className="inline-block mb-6">
              <img 
                src={logo} 
                alt="Select Source Water" 
                className="h-14 w-auto brightness-0 invert opacity-90"
              />
            </a>
            <p className="text-primary-foreground/60 mb-8 max-w-md leading-relaxed">
              Bringing pure, soft water to California and Arizona homes since 1998. 
              Experience the difference with our lifetime warranty and dedicated service.
            </p>
            
            {/* Contact info - horizontal on larger screens */}
            <div className="flex flex-wrap gap-6">
              <a href="tel:1-800-555-0123" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors group">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span>(800) 555-0123</span>
              </a>
              <a href="mailto:info@selectsourcewater.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors group">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline">info@selectsourcewater.com</span>
                <span className="sm:hidden">Email</span>
              </a>
            </div>
          </div>

          {/* Links - flowing columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium text-primary-foreground mb-5 text-sm uppercase tracking-wider">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-primary-foreground/50 hover:text-accent transition-colors inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-primary-foreground mb-5 text-sm uppercase tracking-wider">Services</h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-primary-foreground/50 hover:text-accent transition-colors inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-primary-foreground mb-5 text-sm uppercase tracking-wider">Legal</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      {(link as any).isInternal ? (
                        <Link
                          to={link.href}
                          className="text-primary-foreground/50 hover:text-accent transition-colors inline-block"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-primary-foreground/50 hover:text-accent transition-colors inline-block"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar - organic divider */}
        <div className="relative pt-8">
          {/* Gradient divider instead of solid line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-primary-foreground/40 text-sm">
              © {new Date().getFullYear()} Select Source Water. All rights reserved.
            </p>
            
            {/* Social links with organic styling */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center hover:bg-accent/20 text-primary-foreground/60 hover:text-accent transition-all"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Large decorative element */}
      <div className="absolute bottom-0 right-0 opacity-[0.02] pointer-events-none">
        <Droplets className="w-80 h-80" />
      </div>
    </footer>
  );
};
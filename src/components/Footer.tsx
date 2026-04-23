import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "Home", href: "/", isInternal: true },
  { label: "HYGIA+ System", href: "/hygia-system", isInternal: true },
  { label: "Filtration Technology", href: "/filtration-technology", isInternal: true },
  { label: "Process", href: "/process", isInternal: true },
  { label: "Gallery", href: "/gallery", isInternal: true },
  { label: "About", href: "/about", isInternal: true },
  { label: "Blog", href: "/blog", isInternal: true },
  { label: "Contact", href: "/#contact" },
];

const serviceAreas = [
  { label: "Beaumont", href: "/service-areas/beaumont" },
  { label: "Banning", href: "/service-areas/banning" },
  { label: "Hemet", href: "/service-areas/hemet" },
  { label: "Moreno Valley", href: "/service-areas/moreno-valley" },
  { label: "Riverside", href: "/service-areas/riverside" },
  { label: "San Jacinto", href: "/service-areas/san-jacinto" },
  { label: "View All Cities", href: "/service-areas" },
];

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
        className="absolute bottom-32 left-[15%] w-4 h-5 bg-primary-foreground/5 rounded-full"
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative pt-20 pb-12">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logo}
                alt="Select Source Water"
                className="h-14 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-primary-foreground/60 mb-6 leading-relaxed text-sm">
              Serving the Inland Empire since 1998. Experience the difference with our Lifetime Warranty and dedicated service.
            </p>

            <div className="space-y-3">
              <a href="tel:+19514995136" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors group text-sm">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span>(951) 499-5136</span>
              </a>
              <a href="mailto:info@selectsourcewatercalifornia.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors group text-sm">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="break-all">info@selectsourcewatercalifornia.com</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>790 Beaumont Ave Ste 124<br />Beaumont, CA 92223</span>
              </div>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-medium text-primary-foreground mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.isInternal ? (
                    <Link to={link.href} className="text-primary-foreground/50 hover:text-accent transition-colors inline-block text-sm">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-primary-foreground/50 hover:text-accent transition-colors inline-block text-sm">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Service Areas */}
          <div>
            <h4 className="font-medium text-primary-foreground mb-5 text-sm uppercase tracking-wider">Service Areas</h4>
            <ul className="space-y-3">
              {serviceAreas.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-primary-foreground/50 hover:text-accent transition-colors inline-block text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Connect */}
          <div>
            <h4 className="font-medium text-primary-foreground mb-5 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-3 mb-6">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
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
            <a
              href="https://g.page/selectsourcewater"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-primary-foreground/50 hover:text-accent transition-colors"
            >
              ⭐ Google Reviews
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative pt-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/40 text-xs text-center md:text-left">
              © {new Date().getFullYear()} Select Source Water LLC | Est. 1998 | Licensed & Insured |{" "}
              <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link> |{" "}
              <Link to="/terms-of-service" className="hover:text-accent transition-colors">Terms</Link> |{" "}
              <Link to="/sms-terms.html" className="hover:text-accent transition-colors">SMS Terms</Link> |{" "}
              <Link to="/portal" className="hover:text-accent transition-colors">Staff Login</Link>
            </p>
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

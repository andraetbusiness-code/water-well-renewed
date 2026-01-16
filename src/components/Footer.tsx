import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  services: [
    { label: "Water Testing", href: "#services" },
    { label: "Filtration Systems", href: "#services" },
    { label: "Water Softening", href: "#services" },
    { label: "Maintenance", href: "#services" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Licensing", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <img 
              src={logo} 
              alt="Select Source Water" 
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-background/70 mb-6 max-w-sm">
              Providing pure, soft water solutions to California and Arizona homes since 1998. 
              Experience the difference with our lifetime warranty.
            </p>
            <div className="space-y-3">
              <a href="tel:1-800-555-0123" className="flex items-center gap-2 text-background/80 hover:text-background transition-colors">
                <Phone className="h-4 w-4" />
                <span>(800) 555-0123</span>
              </a>
              <a href="mailto:info@selectsourcewater.com" className="flex items-center gap-2 text-background/80 hover:text-background transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@selectsourcewater.com</span>
              </a>
              <div className="flex items-start gap-2 text-background/80">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Southern California • Sacramento • Arizona</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Select Source Water, LLC. All rights reserved. Est. 1998
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-background" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-background" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5 text-background" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

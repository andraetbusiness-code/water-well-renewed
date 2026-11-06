import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import hdBadge from "@/assets/home-depot-authorized.png";
import { footerGroups, site } from "@/data/site";

export const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Link to="/" aria-label="Select Source Water, home">
            <img src={logo} alt="Select Source Water" className="h-16 w-auto" />
          </Link>
          <address className="mt-6 not-italic text-sm leading-relaxed text-background/70">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <p className="mt-4 text-sm">
            <a href={site.phoneHref} className="tabular font-semibold hover:text-primary">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="text-background/70 hover:text-background">
              {site.email}
            </a>
          </p>
        </div>

        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-semibold tracking-normal text-background">{group.title}</h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-background/70 hover:text-background">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-16 flex flex-col gap-6 border-t border-background/15 pt-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img src={hdBadge} alt="The Home Depot authorized independent provider" className="h-14 w-auto" />
          <p className="max-w-xs text-xs leading-relaxed text-background/60">
            Select Source Water is an authorized independent provider. We are not The Home Depot.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-background/60">
          <li>© {new Date().getFullYear()} Select Source Water, LLC</li>
          <li><a href="/privacy-policy.html" className="hover:text-background">Privacy</a></li>
          <li><a href="/terms-of-service.html" className="hover:text-background">Terms</a></li>
          <li><a href="/sms-terms.html" className="hover:text-background">SMS terms</a></li>
          <li><Link to="/portal" className="hover:text-background">Staff login</Link></li>
        </ul>
      </div>
    </div>
  </footer>
);

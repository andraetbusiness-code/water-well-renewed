import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { primaryNav, site } from "@/data/site";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <div className="container flex h-[68px] items-center justify-between gap-6">
        <Link to="/" aria-label="Select Source Water, home" className="shrink-0">
          <img src={logo} alt="Select Source Water" className="h-10 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-foreground underline underline-offset-[10px] decoration-2 decoration-primary" : "text-foreground/75"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a href={site.phoneHref} className="tabular text-sm font-semibold text-foreground hover:text-primary">
            {site.phone}
          </a>
          <Button size="sm" asChild>
            <Link to="/service">Request service</Link>
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden -mr-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-secondary"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 overflow-y-auto bg-background">
          <nav aria-label="Mobile" className="container flex flex-col py-6">
            <div className="rule-list">
              {primaryNav.map((item) => (
                <Link key={item.href} to={item.href} className="block py-4 text-2xl font-semibold tracking-tight">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button size="lg" asChild>
                <Link to="/service">Request service</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={site.phoneHref}>Call {site.phone}</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

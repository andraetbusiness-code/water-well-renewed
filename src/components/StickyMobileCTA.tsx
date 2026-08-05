import { useEffect, useState } from "react";
import { Phone, Calendar } from "lucide-react";

/**
 * StickyMobileCTA — bottom-docked mobile-only bar with two primary
 * actions: Call Now and Book Test.
 *
 * Service businesses live and die on mobile click-to-call; this bar
 * ensures the phone number and booking path are always one tap away
 * on any page, any scroll position.
 *
 * Behavior:
 *  - Hidden on md+ viewports (desktop users already see the Header CTA).
 *  - Hidden until the user scrolls past ~60% of the viewport height
 *    so it doesn't compete with the hero CTA buttons on first paint.
 *  - Safe-area-inset aware for notched iPhones.
 *
 * Phone: official SoCal GHL number 1-951-499-5136 — every tap routes
 * the call into the CRM for attribution, recording, and workflow
 * triggers. Never hard-code any other number here.
 *
 * Book Test link: the homepage inline calendar (#book anchor) when
 * available, falling back to the /free-water-test page. On pages
 * without the anchor the route still works end-to-end.
 */
export const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = Math.round(window.innerHeight * 0.6);
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prefer the inline calendar anchor when it exists on the current page;
  // fall back to the dedicated booking route.
  const bookHref =
    typeof document !== "undefined" && document.getElementById("book")
      ? "#book"
      : "/free-water-test";

  return (
    <div
      aria-hidden={!visible}
      className={[
        "fixed bottom-0 inset-x-0 z-50 md:hidden",
        "transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "translate-y-full",
        // Safe-area padding for notched devices
        "pb-[env(safe-area-inset-bottom,0px)]",
      ].join(" ")}
    >
      <div className="mx-3 mb-3 grid grid-cols-2 gap-2 rounded-2xl bg-background/95 backdrop-blur-md shadow-2xl border border-border p-2">
        <a
          href="tel:+19514995136"
          aria-label="Call Select Source Water"
          className="inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-medium text-sm active:scale-[0.98] transition"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Now
        </a>
        <a
          href={bookHref}
          aria-label="Book your free water test"
          className="inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-accent text-accent-foreground font-medium text-sm active:scale-[0.98] transition"
        >
          <Calendar className="h-4 w-4" aria-hidden="true" />
          Book Test
        </a>
      </div>
    </div>
  );
};

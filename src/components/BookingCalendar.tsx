import { useEffect } from "react";
import { Calendar, Clock, ShieldCheck } from "lucide-react";

/**
 * BookingCalendar — embeds the GoHighLevel "Water Test Appointment"
 * calendar directly on the homepage so prospects can self-book without
 * a separate page load.
 *
 * Calendar: Water Test Appointment (30 min, Round Robin)
 * Location: SSW SoCal sub-account (Id: MHBfuP1d3M2C7IssHXZD)
 * Calendar Id: tISYcHbzLrglJ1YxsHFw
 *
 * This is the confirmation-required calendar — the lead books a time
 * and a rep must confirm it (per SSW operational rule). Do NOT swap
 * this for an auto-confirming calendar without explicit approval.
 *
 * The component lives behind the anchor id="book" so any CTA on the
 * page can deep-link to it with href="#book".
 */
export const BookingCalendar = () => {
  // Load the GHL form/calendar embed helper script once.
  useEffect(() => {
    const scriptId = "ghl-form-embed-script";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      className="relative py-20 md:py-28 bg-gradient-to-b from-background to-secondary/30 scroll-mt-24"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-4">
            <Calendar className="h-4 w-4" />
            Book Instantly
          </span>
          <h2
            id="book-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-4"
          >
            Pick a Time for Your Free In-Home Water Test
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Choose a slot that works for you. We'll call to confirm the time,
            then come test your water right in your kitchen — about 20 minutes,
            no sales pressure, no obligation.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              30-min appointment
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              No credit card • 100% free
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl border border-border bg-card">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/tISYcHbzLrglJ1YxsHFw"
            style={{ width: "100%", border: "none", minHeight: 720 }}
            scrolling="no"
            id="ssw-water-test-booking"
            title="Book your free in-home water test"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

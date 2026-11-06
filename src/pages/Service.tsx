import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { LeadForm } from "@/components/LeadForm";
import { pending } from "@/data/pending";
import { site } from "@/data/site";

const systems = [
  {
    title: "Water softeners",
    reasons: "Salt questions, a unit that is not regenerating, control valve problems, settings, resin concerns.",
  },
  {
    title: "Whole-home filters",
    reasons: "Filter changes, pressure drops, changes in taste or smell, routine inspection.",
  },
  {
    title: "Reverse osmosis systems",
    reasons: "Filter and membrane replacement, slow flow, leaks, tank and faucet issues.",
  },
];

const Service = () => (
  <PageLayout showContactCTA={false}>
    <Helmet>
      <title>Water Softener, Filter and RO Service | Select Source Water</title>
      <meta
        name="description"
        content="Request service for a water softener, whole-home filter or reverse osmosis system. Tell us what you have and our team will contact you to schedule."
      />
      <link rel="canonical" href={`${site.url}/service/`} />
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Water treatment system service",
          serviceType: "Water softener, whole-home filter and reverse osmosis service",
          provider: { "@id": `${site.url}/#organization` },
          areaServed: "California and Arizona",
          url: `${site.url}/service`,
        })}
      </script>
    </Helmet>

    <PageHero
      title="Service for the water system in your home."
      description="Softener, whole-home filter or reverse osmosis. Tell us what you have, and our team will tell you if we can service it."
    />

    <section className="py-16 md:py-24">
      <div className="container grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What we look at</h2>
          <ul className="rule-list mt-8 border-y border-border">
            {systems.map((s) => (
              <li key={s.title} className="py-6">
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="measure mt-1 text-muted-foreground">{s.reasons}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-14 text-3xl font-semibold tracking-tight sm:text-4xl">Not installed by us?</h2>
          <p className="measure mt-4 text-muted-foreground">
            Add the brand or who installed it on the form. Our team confirms what we can service before we schedule a visit.
          </p>
          {pending.serviceScope && (
            <ul className="mt-4 list-disc pl-5 text-muted-foreground">
              {pending.serviceScope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}

          {pending.serviceCallPrice && (
            <>
              <h2 className="mt-14 text-3xl font-semibold tracking-tight sm:text-4xl">Service call price</h2>
              <p className="measure mt-4 text-muted-foreground">{pending.serviceCallPrice}</p>
            </>
          )}

          {pending.plan && (
            <>
              <h2 className="mt-14 text-3xl font-semibold tracking-tight sm:text-4xl">{pending.plan.name}</h2>
              <p className="tabular mt-4 text-2xl font-semibold">{pending.plan.price}</p>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground">
                {pending.plan.covers.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="measure mt-3 text-sm text-muted-foreground">{pending.plan.terms}</p>
            </>
          )}

          <p className="mt-14 text-muted-foreground">
            Prefer to talk? Call{" "}
            <a href={site.phoneHref} className="tabular font-semibold text-foreground underline underline-offset-4">
              {site.phone}
            </a>
            . Check{" "}
            <Link to="/service-areas" className="font-semibold text-foreground underline underline-offset-4">
              where we work
            </Link>
            .
          </p>
        </div>

        <div className="self-start rounded-lg border border-border p-6 sm:p-8 lg:sticky lg:top-28">
          <h2 className="text-2xl font-semibold tracking-tight">Request service</h2>
          <p className="mt-2 text-sm text-muted-foreground">We will contact you to schedule.</p>
          <div className="mt-6">
            <LeadForm
              formName="service_request"
              submitLabel="Request service"
              serviceFields
              messageLabel="What is going on? (optional)"
            />
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Service;

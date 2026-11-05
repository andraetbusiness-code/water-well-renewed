import { LeadForm } from "@/components/LeadForm";
import { site } from "@/data/site";

export const ContactCTA = () => (
  <section id="contact" className="border-t border-border bg-secondary">
    <div className="container grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
      <div>
        <h2 className="display text-4xl sm:text-5xl">Tell us what you need.</h2>
        <p className="measure mt-6 text-lg text-muted-foreground">
          Service on a system you already have, or a complimentary in-home water test. Send the form and we will contact you to schedule.
        </p>
        <dl className="mt-10 space-y-5 text-base">
          <div>
            <dt className="text-sm text-muted-foreground">Call</dt>
            <dd>
              <a href={site.phoneHref} className="tabular text-2xl font-semibold tracking-tight hover:text-primary">
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Email</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="font-medium hover:text-primary">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Office</dt>
            <dd className="font-medium">
              {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            </dd>
          </div>
        </dl>
      </div>
      <div className="rounded-lg border border-border bg-background p-6 sm:p-8">
        <LeadForm
          formName="site_contact_cta"
          submitLabel="Send request"
          messageLabel="What can we help with?"
          messagePlaceholder="Service on my system, a water test, a question"
        />
      </div>
    </div>
  </section>
);

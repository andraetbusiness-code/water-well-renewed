import { Helmet } from "react-helmet-async";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { LeadForm } from "@/components/LeadForm";
import photo from "@/assets/site/water-test-demo.webp";
import { site } from "@/data/site";

// Route renamed from /free-water-test on 2026-11-06; the old URL redirects here.
const ComplimentaryWaterTest = () => (
  <PageLayout showContactCTA={false}>
    <Helmet>
      <title>Complimentary In-Home Water Test | Select Source Water</title>
      <meta name="description" content="Book a complimentary in-home water test. It takes about 15 to 30 minutes, you see the demonstration yourself, and there is no obligation to buy." />
      <link rel="canonical" href={`${site.url}/complimentary-water-test/`} />
    </Helmet>

    <PageHero
      title="See what is in your home's water."
      description="A complimentary in-home water test. About 15 to 30 minutes, and no obligation to buy."
    />

    <section className="py-16 md:py-24">
      <div className="container grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <img src={photo} width={1200} height={900} alt="A water test demonstration in a kitchen" className="aspect-[4/3] w-full rounded-lg object-cover" />
          <h2 className="mt-10 text-3xl font-semibold tracking-tight">What happens at your home</h2>
          <ul className="rule-list mt-6 border-y border-border">
            <li className="py-4">A specialist tests the water at your tap.</li>
            <li className="py-4">You see the demonstration yourself.</li>
            <li className="py-4">They explain what it means for your home and what options exist, if any.</li>
            <li className="py-4">You decide. There is no obligation to buy.</li>
          </ul>
          <p className="mt-8 text-muted-foreground">
            Already own a system and need it serviced instead? <a href="/service" className="font-semibold text-foreground underline underline-offset-4">Request service</a>.
          </p>
        </div>
        <div className="self-start rounded-lg border border-border p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Book your test</h2>
          <p className="mt-2 text-sm text-muted-foreground">We will contact you to schedule. Or call {site.phone}.</p>
          <div className="mt-6">
            <LeadForm formName="free_water_test" submitLabel="Book my water test" addressField messageLabel="Anything we should know? (optional)" />
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default ComplimentaryWaterTest;

import { Helmet } from "react-helmet-async";
import { PageLayout } from "@/components/layout/PageLayout";
import { HomeHero } from "@/components/home/Hero";
import { Offerings } from "@/components/home/Offerings";
import { ServiceSteps } from "@/components/home/ServiceSteps";
import { WaterTest } from "@/components/home/WaterTest";
import { Coverage } from "@/components/home/Coverage";
import { HomeFaq, homeFaqItems } from "@/components/home/HomeFaq";
import { site } from "@/data/site";

const Index = () => (
  <PageLayout showTrustBar>
    <Helmet>
      <title>Water Filter, Softener and RO Service | Select Source Water</title>
      <meta
        name="description"
        content="Select Source Water installs and services whole-home water filtration, water softeners and reverse osmosis systems across California and Arizona."
      />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={`${site.url}/`} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${site.url}/#organization`,
          name: site.name,
          url: `${site.url}/`,
          telephone: "+18334227765",
          email: site.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            addressRegion: site.address.state,
            postalCode: site.address.zip,
            addressCountry: "US",
          },
          description:
            "Installation and service of whole-home water filtration, water softeners and reverse osmosis systems.",
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqItems.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        })}
      </script>
    </Helmet>
    <HomeHero />
    <Offerings />
    <ServiceSteps />
    <WaterTest />
    <Coverage />
    <HomeFaq />
  </PageLayout>
);

export default Index;

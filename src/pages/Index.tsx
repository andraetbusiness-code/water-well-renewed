import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WaterHardnessData } from "@/components/WaterHardnessData";
import { WaterAnswers } from "@/components/WaterAnswers";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { GoogleReviews } from "@/components/GoogleReviews";
import { TrustBadges } from "@/components/TrustBadges";
import { FAQ } from "@/components/FAQ";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Whole-Home Water Filtration &amp; Softening | Select Source Water</title>
        <meta name="description" content="Water testing, whole-home filtration, water softening, and reverse osmosis solutions designed around your household and water source." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://selectsourcewater.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Select Source Water",
            "image": "https://selectsourcewater.com/og-image.png",
            "@id": "https://selectsourcewater.com/#organization",
            "url": "https://selectsourcewater.com/",
            "telephone": "+19516124094",
            "description": "Select Source Water provides water testing, whole-home water filtration, water softening, and reverse osmosis solutions.",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Water Treatment Services",
              "itemListElement": [
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Free In-Home Water Test"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "HYGIA+ Whole-House Water Softener Installation"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Whole-House Water Filtration"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Reverse Osmosis Drinking Water System"}}
              ]
            }
          })}
        </script>
      </Helmet>
      <Header />
      <main>
        <Hero />
        <WaterAnswers />
        <WaterHardnessData />
        <ProblemSolution />
        <Services />
        <HowItWorks />
        <GoogleReviews />
        <TrustBadges />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

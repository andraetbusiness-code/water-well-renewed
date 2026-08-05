import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WaterHardnessData } from "@/components/WaterHardnessData";
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
        <title>Water Softener &amp; Filtration — Beaumont &amp; Inland Empire | Select Source Water</title>
        <meta name="description" content="Home Depot Authorized water softener installation in Beaumont, Banning, Hemet & the Inland Empire. Free in-home water test. Lifetime warranty. Call (951) 612-4094." />
        <link rel="canonical" href="https://selectsourcewatercalifornia.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Select Source Water",
            "image": "https://selectsourcewatercalifornia.com/og-image.png",
            "@id": "https://selectsourcewatercalifornia.com",
            "url": "https://selectsourcewatercalifornia.com",
            "telephone": "+19516124094",
            "priceRange": "$$",
            "description": "Home Depot Authorized water softener and filtration installation serving the Inland Empire. Free in-home water test, lifetime warranty, same-day installation.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "790 Beaumont Ave Ste 124",
              "addressLocality": "Beaumont",
              "addressRegion": "CA",
              "postalCode": "92223",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 33.9294,
              "longitude": -116.9776
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                "opens": "08:00",
                "closes": "18:00"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.7",
              "reviewCount": "461",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": {"@type": "Person", "name": "Evan B."},
                "datePublished": "2025-09-01",
                "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                "reviewBody": "Josh was an amazing technician. The job was pristine and he went out of his way to make sure everything was top notch. We love our new house filtration and water softening system. An amazing experience — would highly recommend."
              },
              {
                "@type": "Review",
                "author": {"@type": "Person", "name": "MPac I."},
                "datePublished": "2026-01-01",
                "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                "reviewBody": "Jimmy was awesome! We couldn't be happier with the installation of the water softener system and his professionalism. He was very knowledgeable, explained everything well and was very pleasant. Goodbye bottled water!"
              },
              {
                "@type": "Review",
                "author": {"@type": "Person", "name": "Matthew De V."},
                "datePublished": "2025-11-01",
                "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                "reviewBody": "Josh Trujillo was a true professional. He installed a fully customized water system in our garage. He was thorough, knowledgeable, and made sure everything was done to our satisfaction. Amazing service from start to finish."
              },
              {
                "@type": "Review",
                "author": {"@type": "Person", "name": "Linda M."},
                "datePublished": "2025-04-01",
                "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                "reviewBody": "Unbelievable experience with the whole company. I was extremely impressed with everyone from the sales representative to the installation crew. They were all knowledgeable, professional, and truly cared about making sure we were happy. Best investment we've made for our home!"
              }
            ],
            "areaServed": [
              "Beaumont, CA","Banning, CA","Hemet, CA","San Jacinto, CA",
              "Moreno Valley, CA","Riverside, CA","Yucaipa, CA","Calimesa, CA",
              "Cherry Valley, CA","Redlands, CA","Highland, CA"
            ],
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

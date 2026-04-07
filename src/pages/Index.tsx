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

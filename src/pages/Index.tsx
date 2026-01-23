import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HomeInfographic } from "@/components/HomeInfographic";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustBadges } from "@/components/TrustBadges";
import { FAQ } from "@/components/FAQ";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HomeInfographic />
        <ProblemSolution />
        <Services />
        <HowItWorks />
        <TrustBadges />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

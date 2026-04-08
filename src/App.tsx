import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import CityPage from "./pages/CityPage";
import NotFound from "./pages/NotFound";
import HygiaSystem from "./pages/HygiaSystem";
import FiltrationTechnology from "./pages/FiltrationTechnology";
import WhatInWater from "./pages/WhatInWater";
import Maintenance from "./pages/Maintenance";
import Process from "./pages/Process";
import Gallery from "./pages/Gallery";
import Presentations from "./pages/Presentations";
import PresentationViewer from "./pages/PresentationViewer";
import PortalRoutes from "./pages/portal/PortalRoutes";
import FieldRepOnboarding from "./pages/FieldRepOnboarding";
import ExecutiveAudit from "./pages/ExecutiveAudit";
import GrowthExecutionPlan from "./pages/GrowthExecutionPlan";
import GBPAudit from "./pages/GBPAudit";
import ServiceAreas from "./pages/ServiceAreas";
import HomeDepotPartnership from "./pages/HomeDepotPartnership";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import FreeWaterTest from "./pages/FreeWaterTest";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const HygiaPlusDemo = lazy(() => import("./pages/demo/HygiaPlusDemo"));
const MarketingGallerySlide = lazy(() => import("@/components/onboarding/slides/MarketingGallerySlide").then(m => ({ default: m.MarketingGallerySlide })));
const ApplyPage = lazy(() => import("./pages/careers/ApplyPage"));

// Import print styles for onboarding and audit
import "./styles/onboarding-print.css";
import "./styles/audit-print.css";

const queryClient = new QueryClient();

// Subdomain detection
const hostname = window.location.hostname;
const subdomain = hostname.split('.')[0];
const isDemoSubdomain = subdomain === 'demo';
const isMarketingSubdomain = subdomain === 'marketing';
const isCareersSubdomain = subdomain === 'careers';

const DemoRoutes = () => (
  <Routes>
    <Route path="/" element={<Suspense fallback={null}><HygiaPlusDemo /></Suspense>} />
    <Route path="/hygia-plus" element={<Suspense fallback={null}><HygiaPlusDemo /></Suspense>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const MarketingRoutes = () => (
  <Routes>
    <Route path="/" element={<Suspense fallback={null}><MarketingGallerySlide /></Suspense>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const CareersRoutes = () => (
  <Routes>
    <Route path="/" element={<Suspense fallback={null}><ApplyPage /></Suspense>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isDemoSubdomain ? (
            <DemoRoutes />
          ) : isMarketingSubdomain ? (
            <MarketingRoutes />
          ) : isCareersSubdomain ? (
            <CareersRoutes />
          ) : (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/hygia-system" element={<HygiaSystem />} />
              <Route path="/filtration-technology" element={<FiltrationTechnology />} />
              <Route path="/what-in-water" element={<WhatInWater />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/process" element={<Process />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/presentations" element={<Presentations />} />
              <Route path="/presentations/:slug" element={<PresentationViewer />} />
              <Route path="/portal/*" element={<PortalRoutes />} />
              <Route path="/onboarding" element={<FieldRepOnboarding />} />
              <Route path="/audit" element={<ExecutiveAudit />} />
              <Route path="/growth-plan" element={<GrowthExecutionPlan />} />
              <Route path="/gbp-audit" element={<GBPAudit />} />
              <Route path="/service-areas" element={<ServiceAreas />} />
              <Route path="/home-depot-authorized-provider" element={<HomeDepotPartnership />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/service-areas/:citySlug" element={<CityPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/free-water-test" element={<FreeWaterTest />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/demo/hygia-plus" element={<Suspense fallback={null}><HygiaPlusDemo /></Suspense>} />
              <Route path="/careers" element={<Suspense fallback={null}><ApplyPage /></Suspense>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

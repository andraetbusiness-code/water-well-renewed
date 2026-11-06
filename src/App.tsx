import { Toaster } from "@/components/ui/toaster";
import { ChatWidget } from "@/components/ChatWidget";
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
import Service from "./pages/Service";
import Process from "./pages/Process";
import Gallery from "./pages/Gallery";
import Presentations from "./pages/Presentations";
import PresentationViewer from "./pages/PresentationViewer";
import PortalRoutes from "./pages/portal/PortalRoutes";
import { AuthProvider } from "@/components/portal/AuthProvider";
import { ProtectedRoute } from "@/components/portal/ProtectedRoute";
import FieldRepOnboarding from "./pages/FieldRepOnboarding";
import ServiceAreas from "./pages/ServiceAreas";
import HomeDepotPartnership from "./pages/HomeDepotPartnership";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import FreeWaterTest from "./pages/FreeWaterTest";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const HygiaPlusDemo = lazy(() => import("./pages/demo/HygiaPlusDemo"));
// Internal pages (audits, growth plan, pricing demo) are staff-only. They load in their
// own chunks and only render after a portal sign-in, so the public site and its
// prerendered HTML no longer show their contents.
const ExecutiveAudit = lazy(() => import("./pages/ExecutiveAudit"));
const GrowthExecutionPlan = lazy(() => import("./pages/GrowthExecutionPlan"));
const GBPAudit = lazy(() => import("./pages/GBPAudit"));
const StaffOnly = ({ children }: { children: import("react").ReactNode }) => (
  <AuthProvider>
    <ProtectedRoute>
      <Suspense fallback={null}>{children}</Suspense>
    </ProtectedRoute>
  </AuthProvider>
);
const MarketingGallerySlide = lazy(() => import("@/components/onboarding/slides/MarketingGallerySlide").then(m => ({ default: m.MarketingGallerySlide })));
const ApplyPage = lazy(() => import("./pages/careers/ApplyPage"));
const CareersPage = lazy(() => import("./pages/careers/CareersPage"));
const JobDetailPage = lazy(() => import("./pages/careers/JobDetailPage"));

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
    <Route path="/" element={<Suspense fallback={null}><CareersPage /></Suspense>} />
    <Route path="/apply" element={<Suspense fallback={null}><ApplyPage /></Suspense>} />
    <Route path="/:slug" element={<Suspense fallback={null}><JobDetailPage /></Suspense>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const showRecruitingWidget =
  window.location.pathname.startsWith("/careers") ||
  window.location.pathname.startsWith("/apply");

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          {showRecruitingWidget && <ChatWidget />}
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
              <Route path="/service" element={<Service />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/process" element={<Process />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/presentations" element={<Presentations />} />
              <Route path="/presentations/:slug" element={<PresentationViewer />} />
              <Route path="/portal/*" element={<PortalRoutes />} />
              <Route path="/onboarding" element={<FieldRepOnboarding />} />
              <Route path="/audit" element={<StaffOnly><ExecutiveAudit /></StaffOnly>} />
              <Route path="/growth-plan" element={<StaffOnly><GrowthExecutionPlan /></StaffOnly>} />
              <Route path="/gbp-audit" element={<StaffOnly><GBPAudit /></StaffOnly>} />
              <Route path="/service-areas" element={<ServiceAreas />} />
              <Route path="/home-depot-authorized-provider" element={<HomeDepotPartnership />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/service-areas/:citySlug" element={<CityPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/complimentary-water-test" element={<FreeWaterTest />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/demo/hygia-plus" element={<StaffOnly><HygiaPlusDemo /></StaffOnly>} />
              <Route path="/careers" element={<Suspense fallback={null}><CareersPage /></Suspense>} />
              <Route path="/careers/:slug" element={<Suspense fallback={null}><JobDetailPage /></Suspense>} />
              <Route path="/apply" element={<Suspense fallback={null}><ApplyPage /></Suspense>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

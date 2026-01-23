import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HygiaSystem from "./pages/HygiaSystem";
import FiltrationTechnology from "./pages/FiltrationTechnology";
import WhatInWater from "./pages/WhatInWater";
import Maintenance from "./pages/Maintenance";
import Process from "./pages/Process";
import Gallery from "./pages/Gallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hygia-system" element={<HygiaSystem />} />
          <Route path="/filtration-technology" element={<FiltrationTechnology />} />
          <Route path="/what-in-water" element={<WhatInWater />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/process" element={<Process />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

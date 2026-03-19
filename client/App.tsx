import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import OnboardingStep1 from "./pages/OnboardingStep1";
import OnboardingStep2 from "./pages/OnboardingStep2";
import OnboardingStep3 from "./pages/OnboardingStep3";
import IdeaValidator from "./pages/IdeaValidator";
import LandingPageGenerator from "./pages/LandingPageGenerator";
import MarketingContentGenerator from "./pages/MarketingContentGenerator";
import Analytics from "./pages/Analytics";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import FeatureBuilder from "./pages/FeatureBuilder";
import GrowthAdvisor from "./pages/GrowthAdvisor";
import McDonaldsMarketingVideo from "./pages/McDonaldsMarketingVideo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding/step-1" element={<OnboardingStep1 />} />
          <Route path="/onboarding/step-2" element={<OnboardingStep2 />} />
          <Route path="/onboarding/step-3" element={<OnboardingStep3 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/idea-validator" element={<IdeaValidator />} />
          <Route path="/dashboard/landing-page-gen" element={<LandingPageGenerator />} />
          <Route path="/dashboard/marketing-gen" element={<MarketingContentGenerator />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/billing" element={<Billing />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/feature-builder" element={<FeatureBuilder />} />
          <Route path="/dashboard/growth-advisor" element={<GrowthAdvisor />} />
          <Route path="/dashboard/mcdo-video" element={<McDonaldsMarketingVideo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

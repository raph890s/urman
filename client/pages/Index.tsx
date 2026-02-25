import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CustomerQuoteSection from "@/components/CustomerQuoteSection";
import HowItWorksSection from "@/components/HowItWorksSection";

export default function Index() {
  return (
    <main className="bg-background">
      <Navigation />
      <HeroSection />
      <TestimonialsSection />
      <FeaturesSection />
      <CustomerQuoteSection />
      <HowItWorksSection />
    </main>
  );
}

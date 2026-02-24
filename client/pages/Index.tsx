import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Index() {
  return (
    <main className="bg-background">
      <Navigation />
      <HeroSection />
      <TestimonialsSection />
    </main>
  );
}

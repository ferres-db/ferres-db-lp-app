import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpenSourceBanner } from "@/components/sections/OpenSourceBanner";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PerformanceSection } from "@/components/sections/PerformanceSection";
import { QuickStartSection } from "@/components/sections/QuickStartSection";
import { SDKsSection } from "@/components/sections/SDKsSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { MCPSection } from "@/components/sections/MCPSection";
import { OpenSourceCTA } from "@/components/sections/OpenSourceCTA";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#1A1A1A", color: "#f9fafb" }}>
      <Navbar />
      <HeroSection />
      <OpenSourceBanner />
      <FeaturesSection />
      <PerformanceSection />
      <QuickStartSection />
      <SDKsSection />
      <UseCasesSection />
      <MCPSection />
      <OpenSourceCTA />
      <Footer />
    </div>
  );
}

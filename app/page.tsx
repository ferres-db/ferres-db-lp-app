import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpenSourceBanner } from "@/components/sections/OpenSourceBanner";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PerformanceSection } from "@/components/sections/PerformanceSection";
import { QuickStartSection } from "@/components/sections/QuickStartSection";

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#1A1A1A", color: "#f9fafb" }}>
      <Navbar />
      <HeroSection />
      <OpenSourceBanner />
      <FeaturesSection />
      <PerformanceSection />
      <QuickStartSection />
    </div>
  );
}

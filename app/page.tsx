import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#1A1A1A", color: "#f9fafb" }}>
      <Navbar />
      <HeroSection />
    </div>
  );
}

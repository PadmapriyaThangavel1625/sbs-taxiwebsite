import HeroSection from "@/app/Components/Home/HeroSection";
import TrustBadges from "@/app/Components/Home/TrustBadges";
import FleetSection from "@/app/Components/Home/FleetSection";
import TaxiGallery from "@/app/Components/Home/TaxiGallery";
import BottomCTA from "./Components/BottomCTA";

export default function Home() {
  return (
    <main style={{ fontFamily: "var(--font-jakarta)" }}>
      {/* ================= HERO ================= */}
      <HeroSection />
      <BottomCTA />

      {/* ================= TRUST BADGES ================= */}
      <TrustBadges />

      {/* ================= FLEET ================= */}
      <FleetSection />
      <TaxiGallery />
    </main>
  );
}
import HeroSection from "@/app/Components/Home/HeroSection";
import TrustBadges from "@/app/Components/Home/TrustBadges";
import FleetSection from "@/app/Components/Home/FleetSection";

export default function Home() {
  return (
    <main style={{ fontFamily: "var(--font-jakarta)" }}>
      {/* ================= HERO ================= */}
      <HeroSection />

      {/* ================= TRUST BADGES ================= */}
      <TrustBadges />

      {/* ================= FLEET ================= */}
      <FleetSection />
    </main>
  );
}
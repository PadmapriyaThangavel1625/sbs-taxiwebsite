
import HeroSection from "@/app/Components/Home/HeroSection";
import TrustBadges from "@/app/Components/Home/TrustBadges";
import FleetSection from "@/app/Components/Home/FleetSection";

export default function Home() {
  return (
    <>
      <main>
        {/* ================= HERO ================= */}
        <HeroSection />

        {/* ================= TRUST BADGES ================= */}
        <TrustBadges />

        {/* ================= FLEET ================= */}
        <FleetSection />
      </main>

      {/* ================= LIMITED OFFER ================= */}
    </>
  );
}

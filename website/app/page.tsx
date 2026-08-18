import HeroSection from "@/app/Components/Home/HeroSection";

import FleetSection from "@/app/Components/Home/FleetSection";
import TaxiGallery from "@/app/Components/Home/TaxiGallery";
import BottomCTA from "./Components/BottomCTA";
import FAQSection from "./Components/FAQSection";

export default function Home() {
  return (
    <main
      className="
        w-full
        pb-[90px]
        md:pb-0
      "
      style={{
        fontFamily: "var(--font-jakarta)",
      }}
    >
      {/* HERO */}
      <section className="relative z-10 w-full">
        <HeroSection />
      </section>

      {/* BOTTOM CTA */}
      <section className="relative z-20 w-full">
        <BottomCTA />
      </section>

      {/* TRUST BADGES */}
    

      {/* FLEET */}
      <section className="relative z-10 w-full">
        <FleetSection />
      </section>

      {/* GALLERY */}
      <section className="relative z-10 w-full">
        <TaxiGallery />
      </section>
      <FAQSection />
    </main>
  );
}
import FleetHero from "@/app/Components/Fleet/FleetHero";
import FleetSection from "@/app/Components/Fleet/FleetSection";
import OffersBanner from "@/app/Components/Fleet/OffersBanner";
import BenefitsBar from "@/app/Components/Fleet/BenefitsBar";
import BottomCTA from "../Components/BottomCTA";

export default function FleetPage() {
  return (
    <main
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      {/* Fleet Hero */}
      <FleetHero />
      <BottomCTA />

      {/* Benefits */}
      

      {/* Fleet */}
      <FleetSection />

      {/* Offers */}
      <OffersBanner />
      <section className="section-bg py-6 sm:py-8 lg:py-10">
        <div className="container-custom">
          <BenefitsBar />
        </div>
      </section>
    </main>
  );
}
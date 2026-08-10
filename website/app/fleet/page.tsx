
import FleetHero from "@/app/Components/Fleet/FleetHero";
import FleetSection from "@/app/Components/Fleet/FleetSection";
import OffersBanner from "@/app/Components/Fleet/OffersBanner";
import BenefitsBar from "@/app/Components/Fleet/BenefitsBar";

export default function FleetPage() {
  return (
    <main>
      {/* Fleet Hero */}
      <FleetHero />

      {/* Benefits */}
      <section className="section-bg py-6 sm:py-8 lg:py-10">
        <div className="container-custom">
          <BenefitsBar />
        </div>
      </section>

      {/* Fleet */}
      <FleetSection />

      {/* Offers */}
      <OffersBanner />
    </main>
  );
}

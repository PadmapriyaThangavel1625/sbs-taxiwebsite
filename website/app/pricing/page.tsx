import PricingHero from "@/app/Components/Pricing/PricingHero";
import VehicleCards from "@/app/Components/Pricing/VehicleCards";
import BenefitsBar from "@/app/Components/Pricing/BenefitsBar";
import BottomCTA from "@/app/Components/BottomCTA";

export default function PricingPage() {
  return (
    <main
      className="bg-white"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      {/* Pricing Hero */}
      <PricingHero />
      <BottomCTA />

      {/* Choose Your Ride */}
      <section className="section-bg py-10 sm:py-12 lg:py-16">
        <div className="container-custom">
          <div className="mb-8 text-center sm:mb-10">
            <h2
              className="
                text-2xl
                font-extrabold
                text-heading
                sm:text-3xl
              "
            >
              Choose Your Ride
            </h2>

            <div
              className="
                mx-auto
                mt-2
                h-1
                w-12
                rounded-full
                bg-secondary
              "
            />
          </div>

          {/* Vehicle Cards */}
          <VehicleCards />

        </div>
      </section>

      {/* Help Banner */}
      
    </main>
  );
}

import PricingHero from "@/app/Components/Pricing/PricingHero";
import VehicleCards from "@/app/Components/Pricing/VehicleCards";
import BenefitsBar from "@/app/Components/Pricing/BenefitsBar";
import HelpBanner from "@/app/Components/Pricing/HelpBanner";

export default function PricingPage() {
  return (
    <main className="bg-white">

      {/* Pricing Hero */}
      <PricingHero />

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

          {/* Benefits */}
          <div className="mt-10 sm:mt-12">
            <BenefitsBar />
          </div>
        </div>
      </section>

      {/* Help Banner */}
      <section className="pb-8 sm:pb-10 lg:pb-12">
        <HelpBanner />
      </section>

    </main>
  );
}

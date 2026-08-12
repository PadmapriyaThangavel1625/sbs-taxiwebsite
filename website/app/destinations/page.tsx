import DestinationHero from "@/app/Components/Destinations/DestinationHero";
import DestinationCards from "@/app/Components/Destinations/DestinationCards";
import WhyTravel from "@/app/Components/Destinations/WhyTravel";
import BenefitsBar from "@/app/Components/Destinations/BenefitsBar";
import BottomCTA from "@/app/Components/BottomCTA";

export default function Page() {
  return (
    <main
      className="w-full overflow-x-hidden"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      {/* HERO */}
      <DestinationHero />

      {/* DESTINATIONS + WHY TRAVEL */}
      <section className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-0">
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-7xl
            grid-cols-1
            gap-6
            md:grid-cols-4
            md:gap-5
          "
        >
          {/* DESTINATION CARDS */}
          <div className="w-full min-w-0 md:col-span-3">
            <DestinationCards />
          </div>

          {/* WHY TRAVEL */}
          <div className="w-full min-w-0">
            <WhyTravel />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <div className="w-full">
        <BenefitsBar />
      </div>

      {/* CTA */}
      <div className="w-full">
        <BottomCTA />
      </div>
    </main>
  );
}
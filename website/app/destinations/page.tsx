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
      {/* =====================================================
          HERO
      ====================================================== */}
      <DestinationHero />
      <BottomCTA />

      {/* =====================================================
          DESTINATIONS + WHY TRAVEL
          Same container alignment as Navbar
      ====================================================== */}
      <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
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

            lg:gap-6
          "
        >
          {/* DESTINATION CARDS */}
          <div className="w-full min-w-0 md:col-span-3">
            <DestinationCards />
          </div>

          {/* WHY TRAVEL */}
          <div className="w-full min-w-0 md:col-span-1">
            <WhyTravel />
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS
          Same left/right alignment as Navbar
      ====================================================== */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <BenefitsBar />
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      
    </main>
  );
}
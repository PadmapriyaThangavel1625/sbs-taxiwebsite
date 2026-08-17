import DestinationHero from "@/app/Components/Destinations/DestinationHero";
import DestinationCards from "@/app/Components/Destinations/DestinationCards";

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

      {/* =====================================================
          DESTINATIONS
      ====================================================== */}

      <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <DestinationCards />
        </div>
      </section>
    </main>
  );
}
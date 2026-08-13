import ServicesHero from "@/app/Components/Services/ServicesHero";
import ServicesGrid from "@/app/Components/Services/ServicesGrid";
import BottomCTA from "@/app/Components/BottomCTA";
import DriverCTA from "../Components/Services/DriverCTA";
import SBSTaxiOverview from "../Components/Services/SBSTaxiOverview";

export default function ServicesPage() {
  return (
    <main
      className="bg-background"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      {/* Hero */}
      <ServicesHero />
     
            <BottomCTA />
          

      {/* Services */}
      <section className="section-bg py-8 sm:py-10 lg:py-12">
        <div className="container-custom">
          <ServicesGrid />
          <SBSTaxiOverview />
          <DriverCTA />

          {/* Space between Services and Bottom CTA */}
          
        </div>
      </section>
    </main>
  );
}
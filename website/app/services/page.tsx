import ServicesHero from "@/app/Components/Services/ServicesHero";
import ServicesGrid from "@/app/Components/Services/ServicesGrid";
import BottomCTA from "@/app/Components/BottomCTA";

export default function ServicesPage() {
  return (
    <main
      className="bg-background"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      {/* Hero */}
      <ServicesHero />

      {/* Services */}
      <section className="section-bg py-8 sm:py-10 lg:py-12">
        <div className="container-custom">
          <ServicesGrid />

          {/* Space between Services and Bottom CTA */}
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <BottomCTA />
          </div>
        </div>
      </section>
    </main>
  );
}
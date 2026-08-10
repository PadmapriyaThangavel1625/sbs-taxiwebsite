
import ServicesHero from "@/app/Components/Services/ServicesHero";
import ServicesGrid from "@/app/Components/Services/ServicesGrid";
import HelpBanner from "@/app/Components/Services/HelpBanner";

export default function ServicesPage() {
  return (
    <main className="bg-background">
      
      {/* Hero */}
      <ServicesHero />

      {/* Services */}
      <section className="section-bg py-8 sm:py-10 lg:py-12">
        <div className="container-custom">
          
          <ServicesGrid />

          <HelpBanner />

        </div>
      </section>

    </main>
  );
}

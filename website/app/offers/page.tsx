import OffersHero from "@/app/Components/Offers/OffersHero";
import ExclusiveOffers from "@/app/Components/Offers/ExclusiveOffers";
import AppDownload from "@/app/Components/Offers/AppDownload";
import FeaturesBar from "@/app/Components/Offers/FeaturesBar";
import BottomCTA from "@/app/Components/BottomCTA";

export default function OffersPage() {
  return (
    <main
      className="bg-gray-50"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      <OffersHero />

      <section className="container-custom py-8 sm:py-10 lg:py-12">
        <ExclusiveOffers />

        <AppDownload />

        <FeaturesBar />
      </section>
<div className="mt-16 sm:mt-20 lg:mt-24">
            <BottomCTA />
          </div>
    </main>
  );
}
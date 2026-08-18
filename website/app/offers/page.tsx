import OffersHero from "@/app/Components/Offers/OffersHero";
import ExclusiveOffers from "@/app/Components/Offers/ExclusiveOffers";

import BottomCTA from "@/app/Components/BottomCTA";

export default function OffersPage() {
  return (
    <main
      className="bg-gray-50"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      <OffersHero />
      <BottomCTA />

      <section className="container-custom py-8  !px-2 sm:py-10 lg:py-12">
        <ExclusiveOffers />

    

        
      </section>

    </main>
  );
}
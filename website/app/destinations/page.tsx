import DestinationHero from "@/app/Components/Destinations/DestinationHero";
import DestinationCards from "@/app/Components/Destinations/DestinationCards";
import WhyTravel from "@/app/Components/Destinations/WhyTravel";
import BenefitsBar from "@/app/Components/Destinations/BenefitsBar";
import BottomCTA from "@/app/Components/Destinations/BottomCTA";

export default function Page() {
  return (
    <>
      <DestinationHero />

      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
        <div className="md:col-span-3">
          <DestinationCards />
        </div>

        <div className="mt-6">
          <WhyTravel />
        </div>
      </div>

      <BenefitsBar />

      <BottomCTA />
    </>
  );
}
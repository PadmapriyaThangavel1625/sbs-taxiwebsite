import PricingHero from "@/app/Components/Pricing/PricingHero";
import VehicleCards from "@/app/Components/Pricing/VehicleCards";
import BenefitsBar from "@/app/Components/Pricing/BenefitsBar";

import HelpBanner from "@/app/Components/Pricing/HelpBanner";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <PricingHero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Choose Your Ride</h2>
            <div className="w-12 h-1 bg-amber-400 mx-auto mt-2 rounded-full"></div>
          </div>

          <VehicleCards />
          
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 mt-12 px-6">
            <div className="w-full">
              <BenefitsBar />
            </div>
            <div className="w-full lg:w-[400px] shrink-0">
             
            </div>
          </div>
        </div>
      </div>

      <HelpBanner />
    </main>
  );
}
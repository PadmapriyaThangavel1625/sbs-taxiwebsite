import FleetHero from "@/app/Components/Fleet/FleetHero";
import FleetSection from "@/app/Components/Fleet/FleetSection";
import OffersBanner from "@/app/Components/Fleet/OffersBanner";
import BenefitsBar from "@/app/Components/Fleet/BenefitsBar";


export default function FleetPage(){

  return (

    <>

      <FleetHero/>

      <BenefitsBar/>

      <FleetSection/>

      <OffersBanner/>

    </>

  );

}
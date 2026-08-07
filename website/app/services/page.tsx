import ServicesHero from "@/app/Components/Services/ServicesHero";
import ServicesGrid from "@/app/Components/Services/ServicesGrid";
import HelpBanner from "@/app/Components/Services/HelpBanner";


export default function ServicesPage(){

return(

<main className="bg-gray-50">

<ServicesHero/>


<section className="max-w-7xl mx-auto px-6 py-8">

<ServicesGrid/>


<HelpBanner/>

</section>


</main>

)

}
import { Headphones, Phone } from "lucide-react";


export default function HelpBanner(){

return(

<div className="mt-5 rounded-xl bg-blue-700 p-5 text-white flex flex-col md:flex-row justify-between items-center">


<div className="flex gap-4 items-center">

<Headphones size={45}/>

<div>

<h3 className="text-xl font-bold">
Need Help Choosing the Right Service?
</h3>

<p>
Our team is available 24/7 to assist you.
</p>

</div>

</div>



<div className="flex gap-5 mt-4 md:mt-0">

<button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold flex gap-2">
<Phone/>
81440 65688
</button>


<button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold">
Chat on WhatsApp
</button>


</div>


</div>

)

}
import {
  ShieldCheck,
  UserRound,
  Clock3,
  CreditCard,
  Route
} from "lucide-react";


export default function BenefitsBar(){


const items=[
{
title:"No Hidden Charges",
desc:"100% Transparent Billing",
icon:<ShieldCheck/>
},

{
title:"No Driver Bata",
desc:"What you see is what you pay",
icon:<UserRound/>
},

{
title:"No Waiting Charges",
desc:"Ride on time, every time",
icon:<Clock3/>
},

{
title:"Online Payment",
desc:"No extra charge for online payments",
icon:<CreditCard/>
},

{
title:"Toll Free",
desc:"First 200 KM on outstation trips",
icon:<Route/>
}

]



return(


<div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 border rounded-xl p-5 bg-white">


{
items.map((item)=>(


<div
key={item.title}
className="flex gap-3 items-center justify-center border-r last:border-none"
>


<div className="text-blue-700 bg-blue-50 p-3 rounded-full">

{item.icon}

</div>


<div>

<h3 className="font-bold text-sm text-blue-900">
{item.title}
</h3>


<p className="text-xs text-gray-600">
{item.desc}
</p>


</div>


</div>


))
}


</div>


)


}
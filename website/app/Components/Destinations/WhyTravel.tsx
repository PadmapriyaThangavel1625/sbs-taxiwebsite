export default function WhyTravel(){

const data=[
["🛡","Safe & Reliable","Your safety is our top priority with verified drivers and well-maintained cars."],
["₹","Transparent Pricing","No hidden charges. 100% transparent billing."],
["◷","On-Time Every Time","Punctual pickups and timely drop-offs guaranteed."],
["👤","24/7 Customer Support","We are always here to assist you anytime."]
]


return(

<div className="bg-blue-50 rounded-xl p-6">

<h2 className="font-bold text-xl border-b-4 border-yellow-400 w-fit mb-5">
Why Travel with SBS Taxi?
</h2>


{
data.map((x)=>(
<div className="flex gap-4 mb-5" key={x[1]}>

<div className="text-3xl text-blue-700">
{x[0]}
</div>

<div>

<h3 className="font-bold">
{x[1]}
</h3>

<p className="text-sm">
{x[2]}
</p>

</div>

</div>
))
}


<div className="bg-white p-4 rounded">
Need help choosing a destination?
<br/>
<b className="text-green-600">
Chat with us on WhatsApp
</b>
</div>


</div>

)

}
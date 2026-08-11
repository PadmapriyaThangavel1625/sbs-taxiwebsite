"use client";

import Link from "next/link";
import {
Home,
BriefcaseBusiness,
CarFront,
IndianRupee,
MapPin,
Tag,
} from "lucide-react";

export default function BottomBar() {
return ( <nav
   className="
     fixed
     bottom-0
     left-0
     right-0
     z-[9997]
     block
     border-t
     border-gray-200
     bg-white
     shadow-[0_-4px_15px_rgba(0,0,0,0.08)]
     md:hidden
     font-[var(--font-jakarta)]
   "
 > <div
     className="
       mx-auto
       grid
       h-16
       w-full
       max-w-md
       grid-cols-6
       items-center
     "
   >
{/* HOME */} <Link
       href="/"
       className="
         flex
         flex-col
         items-center
         justify-center
         gap-1
         text-[10px]
         font-medium
         text-gray-600
         transition
         hover:text-[#1A365D]
       "
     > <Home className="h-5 w-5" /> <span>Home</span> </Link>

    {/* SERVICES */}
    <Link
      href="/services"
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-1
        text-[10px]
        font-medium
        text-gray-600
        transition
        hover:text-[#1A365D]
      "
    >
      <BriefcaseBusiness className="h-5 w-5" />
      <span>Services</span>
    </Link>

    {/* FLEET */}
    <Link
      href="/fleet"
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-1
        text-[10px]
        font-medium
        text-gray-600
        transition
        hover:text-[#1A365D]
      "
    >
      <CarFront className="h-5 w-5" />
      <span>Fleet</span>
    </Link>

    {/* PRICING */}
    <Link
      href="/pricing"
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-1
        text-[10px]
        font-medium
        text-gray-600
        transition
        hover:text-[#1A365D]
      "
    >
      <IndianRupee className="h-5 w-5" />
      <span>Pricing</span>
    </Link>

    {/* DESTINATIONS */}
    <Link
      href="/destinations"
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-1
        text-[10px]
        font-medium
        text-gray-600
        transition
        hover:text-[#1A365D]
      "
    >
      <MapPin className="h-5 w-5" />
      <span>Destinations</span>
    </Link>

    {/* OFFERS */}
    <Link
      href="/offers"
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-1
        text-[10px]
        font-medium
        text-gray-600
        transition
        hover:text-[#1A365D]
      "
    >
      <Tag className="h-5 w-5" />
      <span>Offers</span>
    </Link>
  </div>
</nav>


);
}

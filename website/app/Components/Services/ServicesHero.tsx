"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ServicesHero() {
return ( <section
   className="
     relative
     w-full
     min-h-[280px]
     overflow-hidden
     sm:min-h-[350px]
     md:min-h-[420px]
     lg:min-h-[500px]
     xl:min-h-[580px]
     2xl:min-h-[650px]
   "
 >
<motion.div
initial={{ opacity: 0, x: -30 }}
animate={{ opacity: 1, x: 0 }}
transition={{
duration: 1,
ease: [0.22, 1, 0.36, 1],
}}
className="absolute inset-0 h-full w-full"
> <Image
       src="/images/service.webp"
       alt="SBS Taxi Services"
       fill
       priority
       sizes="100vw"
       className="h-full w-full object-cover object-center"
     />
</motion.div> </section>
);
}

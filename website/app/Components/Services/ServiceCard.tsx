import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

export default function ServiceCard({
  title,
  description,
  image,
  icon,
}: ServiceCardProps) {
  return (
    <div className="group flex h-[165px] overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition">

      {/* Content */}
      <div className="flex-1 p-5">

        <div className="flex items-center gap-3">
          <div className="text-blue-700 text-3xl">
            {icon}
          </div>

          <h3 className="text-lg font-bold text-gray-900">
            {title}
          </h3>
        </div>


        <p className="mt-3 text-sm text-gray-600 leading-5">
          {description}
        </p>


        <Link
          href="#"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
        >
          Learn More
          <ArrowRight size={16}/>
        </Link>

      </div>


      {/* Image */}
      <div className="relative w-[45%]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent"/>
      </div>

    </div>
  );
}
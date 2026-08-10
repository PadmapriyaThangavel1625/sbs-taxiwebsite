"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  details?: string; // New optional prop for expanded content
  image: string;
  icon: React.ReactNode;
}

export default function ServiceCard({
  title,
  description,
  details,
  image,
  icon,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* Top Section: Card Body & Image */}
      <div className="flex flex-col sm:flex-row flex-1">
        {/* Content */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-primary text-3xl">{icon}</div>
              <h3 className="text-lg font-bold text-heading">{title}</h3>
            </div>

            <p className="mt-3 text-sm text-muted leading-6">{description}</p>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer"
              aria-expanded={isExpanded}
            >
              {isExpanded ? "Show Less" : "Learn More"}
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full h-48 sm:h-auto sm:w-[45%] min-h-[180px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent sm:bg-gradient-to-r" />
        </div>
      </div>

      {/* Expandable Box (Down Side) */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100 p-5 sm:p-6 border-t bg-gray-50" : "grid-rows-[0fr] opacity-0 p-0 overflow-hidden"
        }`}
      >
        <div className="overflow-hidden">
          <h4 className="font-semibold text-sm text-heading mb-2">Additional Information</h4>
          <p className="text-sm text-muted leading-6">
            {details || "Here is some more detailed information about this service. You can include specifications, benefits, or next steps here."}
          </p>
          <div className="mt-4">
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-primary px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
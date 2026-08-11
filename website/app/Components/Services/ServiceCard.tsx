"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  details?: string;
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
    <div
      className="
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white
        bg-white
        font-[var(--font-jakarta)]
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      {/* Top Section */}
      <div className="flex flex-1 flex-col sm:flex-row">
        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            {/* Title + Icon */}
            <div className="flex items-center gap-3">
              <div className="shrink-0 text-primary">
                {icon}
              </div>

              <h3
                className="
                  font-[family-name:var(--font-instrument)]
                  text-lg
                  font-bold
                  text-heading
                "
              >
                {title}
              </h3>
            </div>

            {/* Description */}
            <p
              className="
                mt-3
                font-[family-name:var(--font-jakarta)]
                text-sm
                leading-6
                text-muted
              "
            >
              {description}
            </p>
          </div>

          {/* Learn More */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="
                inline-flex
                cursor-pointer
                items-center
                gap-2
                font-[family-name:var(--font-jakarta)]
                text-sm
                font-semibold
                text-primary
                transition-colors
                hover:text-primary-dark
              "
              aria-expanded={isExpanded}
            >
              {isExpanded ? "Show Less" : "Learn More"}

              <ChevronDown
                size={16}
                className={`
                  transition-transform
                  duration-300
                  ${isExpanded ? "rotate-180" : ""}
                `}
              />
            </button>
          </div>
        </div>

        {/* Image */}
        <div
          className="
            relative
            min-h-[180px]
            h-48
            w-full
            overflow-hidden
            sm:h-auto
            sm:w-[45%]
          "
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 45vw"
            className="
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />

          {/* Soft image blend */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-white
              via-white/20
              to-transparent
              sm:bg-gradient-to-r
            "
          />
        </div>
      </div>

      {/* Expandable Information */}
      <div
        className={`
          grid
          transition-all
          duration-300
          ease-in-out
          ${
            isExpanded
              ? "grid-rows-[1fr] border-t border-white bg-gray-50 p-5 opacity-100 sm:p-6"
              : "grid-rows-[0fr] overflow-hidden p-0 opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <h4
            className="
              mb-2
              font-[family-name:var(--font-jakarta)]
              text-sm
              font-semibold
              text-heading
            "
          >
            Additional Information
          </h4>

          <p
            className="
              font-[family-name:var(--font-jakarta)]
              text-sm
              leading-6
              text-muted
            "
          >
            {details ||
              "Here is some more detailed information about this service. You can include specifications, benefits, or next steps here."}
          </p>

          <div className="mt-4">
            <Link
              href="/booking"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-primary
                px-4
                py-2
                font-[family-name:var(--font-jakarta)]
                text-xs
                font-semibold
                text-white
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-primary-dark
              "
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
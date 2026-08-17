import React from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock3,
  CarFront,
} from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface HeroBannerProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
}

export default function HeroBanner({
  title,
  breadcrumb,
}: HeroBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--primary)] text-[var(--text-primary)]">
      
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/5" />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          gap-8
          px-4
          py-10
          sm:px-6
          sm:py-12
          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:px-8
          lg:py-14
        "
      >
        {/* =================================================
            LEFT CONTENT
        ================================================= */}
        <div className="max-w-2xl">
          
          {/* Breadcrumb */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  className="
                    text-[var(--text-primary)]
                    opacity-70
                    transition-opacity
                    hover:opacity-100
                  "
                >
                  {item.label}
                </Link>

                {index < breadcrumb.length - 1 && (
                  <span className="opacity-50">›</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Title */}
          <h1
            className="
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              sm:text-4xl
              lg:text-5xl
            "
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-[var(--text-primary)]
              opacity-80
              sm:text-base
              sm:leading-7
            "
          >
            Experience comfortable, safe and reliable transportation
            with SBS Taxi. Book your ride easily and enjoy professional
            service from pickup to destination.
          </p>

          {/* Quick Benefits */}
          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-x-5
              gap-y-3
              text-xs
              font-medium
              sm:text-sm
            "
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Safe & Secure</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              <span>On-Time Service</span>
            </div>

            <div className="flex items-center gap-2">
              <CarFront className="h-4 w-4" />
              <span>Comfortable Rides</span>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT CONTENT
        ================================================= */}
        <div
          className="
            hidden
            shrink-0
            items-center
            gap-5
            md:flex
          "
        >
          {/* Service Info */}
          <div className="text-right">
            <span
              className="
                block
                text-xs
                font-bold
                tracking-[0.18em]
                opacity-80
              "
            >
              ON THE WAY
            </span>

            <span
              className="
                mt-1
                block
                text-sm
                font-medium
                opacity-90
              "
            >
              Fast & Reliable
            </span>

            <span
              className="
                mt-1
                block
                text-xs
                opacity-60
              "
            >
              Your journey, our priority
            </span>
          </div>

          {/* Map Icon */}
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-white/15
              bg-white/10
              backdrop-blur-sm
            "
          >
            <MapPin
              className="
                h-8
                w-8
                animate-bounce
                text-[var(--text-primary)]
              "
            />
          </div>
        </div>

        {/* Mobile Small Highlight */}
        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-white/10
            bg-white/10
            px-4
            py-3
            md:hidden
          "
        >
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0" />

            <div>
              <p className="text-xs font-bold">
                FAST & RELIABLE
              </p>

              <p className="mt-0.5 text-[11px] opacity-70">
                Your journey, our priority
              </p>
            </div>
          </div>

          <ArrowRight className="h-4 w-4 opacity-70" />
        </div>
      </div>
    </section>
  );
}
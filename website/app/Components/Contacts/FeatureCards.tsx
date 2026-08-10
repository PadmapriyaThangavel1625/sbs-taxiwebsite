
"use client";

import { useState } from "react";
import {
  Headphones,
  Clock3,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  X,
} from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're always here when you need us.",
    details:
      "Our customer support team is available to help with bookings, ride information, changes, cancellations, and general queries whenever you need assistance.",
  },
  {
    icon: Clock3,
    title: "Quick Response",
    description: "Get quick answers to your queries.",
    details:
      "We aim to respond quickly to your booking and travel-related questions so you can plan your journey without unnecessary waiting.",
  },
  {
    icon: UserCheck,
    title: "Customer First",
    description: "Your satisfaction is our priority.",
    details:
      "We focus on providing a comfortable and convenient experience from booking to drop-off, with services designed around your travel needs.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "Safe and reliable rides every time.",
    details:
      "Your safety is important to us. We focus on reliable vehicles, responsible service, and a comfortable travel experience for every passenger.",
  },
];

export default function FeatureCards() {
  const [selectedFeature, setSelectedFeature] = useState<
    (typeof features)[number] | null
  >(null);

  return (
    <section className="py-8">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-[var(--primary)]">
          Why Choose Us
        </p>

        <h2
          className="
            mt-3
            text-2xl
            font-bold
            tracking-tight
            text-[var(--text)]
            sm:text-3xl
          "
        >
          We're Here to Help
        </h2>

        <p
          className="
            mt-2
            max-w-lg
            text-sm
            leading-6
            text-[var(--text-light)]
          "
        >
          From booking assistance to customer support, our team is ready
          to make your SBS Taxi experience simple and comfortable.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[var(--border)]
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[var(--primary)]
                hover:shadow-lg
              "
            >
              {/* Decorative Background */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  h-24
                  w-24
                  rounded-full
                  bg-[var(--primary-light)]
                  opacity-0
                  blur-2xl
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              {/* Icon */}
              <div
                className="
                  relative
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--primary-light)]
                  text-[var(--primary)]
                  transition-all
                  duration-300
                  group-hover:scale-105
                "
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Text */}
              <div className="relative mt-5">
                <h3
                  className="
                    text-base
                    font-bold
                    text-[var(--text)]
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-1.5
                    text-xs
                    leading-5
                    text-[var(--text-light)]
                  "
                >
                  {feature.description}
                </p>
              </div>

              {/* Learn More */}
              <button
                type="button"
                onClick={() => setSelectedFeature(feature)}
                className="
                  relative
                  mt-5
                  flex
                  items-center
                  gap-1.5
                  text-[11px]
                  font-semibold
                  text-[var(--primary)]
                  transition-colors
                  hover:underline
                "
              >
                <span>Learn more</span>

                <ArrowRight
                  className="
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Information Popup */}
      {selectedFeature && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            px-4
            backdrop-blur-sm
          "
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="
              relative
              w-full
              max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedFeature(null)}
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-slate-100
                text-slate-500
                transition
                hover:bg-red-50
                hover:text-red-500
              "
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon */}
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary-light)]
                text-[var(--primary)]
              "
            >
              <selectedFeature.icon className="h-6 w-6" />
            </div>

            {/* Content */}
            <div className="mt-5 pr-8">
              <h3 className="text-xl font-bold text-[var(--text)]">
                {selectedFeature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[var(--text-light)]">
                {selectedFeature.details}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedFeature(null)}
              className="
                mt-6
                w-full
                rounded-xl
                bg-[var(--primary)]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:opacity-90
              "
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

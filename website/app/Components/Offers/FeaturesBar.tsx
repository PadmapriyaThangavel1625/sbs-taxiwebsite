import {
  ShieldCheck,
  Headset,
  MapPin,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure Rides",
    description: "Verified drivers & well maintained cars",
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    description: "We're always here to help you",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Track your ride in real time",
  },
  {
    icon: Wallet,
    title: "Multiple Payment Options",
    description: "UPI, Cards, Net Banking & more",
  },
];

export default function FeaturesBar() {
  return (
    <section className="mb-7 w-full sm:mb-9 lg:mb-10">
      <div
        className="
          container-custom
          grid
          w-full
          grid-cols-1
          gap-4
          rounded-xl
          bg-white
          p-4
          shadow-sm

          sm:grid-cols-2
          sm:gap-5
          sm:p-5

          md:p-6

          lg:grid-cols-4
          lg:gap-5
        "
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-1
                py-2

                sm:gap-4
                sm:px-2
                sm:py-3
              "
            >
              {/* Icon */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary-light

                  sm:h-11
                  sm:w-11

                  md:h-12
                  md:w-12
                "
              >
                <Icon
                  size={21}
                  strokeWidth={1.8}
                  className="
                    text-primary
                    sm:h-[22px]
                    sm:w-[22px]
                    md:h-6
                    md:w-6
                  "
                />
              </div>

              {/* Content */}
              <div className="min-w-0">
                <h4
                  className="
                    mb-0.5
                    text-[12px]
                    font-bold
                    leading-5
                    text-heading

                    sm:text-[13px]

                    md:text-sm
                  "
                >
                  {feature.title}
                </h4>

                <p
                  className="
                    text-[10px]
                    leading-4
                    text-muted

                    sm:text-[11px]
                    sm:leading-5

                    md:text-xs
                  "
                >
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
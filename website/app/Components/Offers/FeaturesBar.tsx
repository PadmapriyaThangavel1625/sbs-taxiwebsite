
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
    <section className="mb-8 sm:mb-10">
      <div
        className="
          container-custom
          grid
          grid-cols-1
          gap-5
          rounded-xl
          bg-white
          p-5
          shadow-sm
          sm:grid-cols-2
          sm:gap-6
          sm:p-6
          lg:grid-cols-4
        "
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="
                flex
                items-start
                gap-4
              "
            >
              {/* Icon */}
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary-light
                "
              >
                <Icon
                  size={24}
                  className="text-primary"
                />
              </div>

              {/* Content */}
              <div>
                <h4
                  className="
                    mb-1
                    text-xs
                    font-semibold
                    text-heading
                    sm:text-sm
                  "
                >
                  {feature.title}
                </h4>

                <p
                  className="
                    text-[11px]
                    leading-5
                    text-muted
                    sm:text-xs
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

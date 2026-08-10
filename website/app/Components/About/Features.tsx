
import {
  ShieldCheck,
  Clock,
  BadgePercent,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "Verified drivers & well maintained cars",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    description: "Punctual pickups every time",
  },
  {
    icon: BadgePercent,
    title: "Transparent Pricing",
    description: "No hidden charges, 100% transparent",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We are always here to assist you",
  },
];

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div
        className="
          bg-white
          rounded-2xl
          shadow-xl
          border border-[var(--border)]
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          divide-y
          sm:divide-y-0
          sm:divide-x
          divide-[var(--border)]
          p-6
        "
      >
        {features.map((feature, idx) => {
          const Icon = feature.icon;

          return (
            <div
              key={idx}
              className="
                flex items-start
                space-x-4
                p-4
                first:pl-0
                last:pr-0
              "
            >
              {/* Icon */}
              <div
                className="
                  p-3
                  bg-[var(--primary-light)]
                  text-[var(--primary)]
                  rounded-xl
                  shrink-0
                "
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-bold text-[var(--text)] text-sm">
                  {feature.title}
                </h3>

                <p className="text-[var(--text-light)] text-xs mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

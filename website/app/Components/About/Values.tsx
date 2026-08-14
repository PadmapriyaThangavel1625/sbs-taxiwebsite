
import {
  Users,
  ShieldCheck,
  UserCheck,
  Star,
  Lightbulb,
} from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Customer First",
    description: "We put our customers first in everything we do.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Honest, transparent and fair in all our dealings.",
  },
  {
    icon: UserCheck,
    title: "Safety",
    description: "Your safety is our top priority, always.",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "We strive for excellence in every ride.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace technology to serve you better.",
  },
];

export default function Values() {
  return (
    <section
      className="
        bg-[var(--background)]
        border-y border-[var(--border)]
        py-16
        my-8
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4 sm:px-6 lg:px-8
          space-y-12
        "
      >
        {/* Heading */}
        <div className="text-center">
          <h2
            className="
              font-[family-name:var(--font-instrument)]
              text-2xl
              sm:text-3xl
              font-normal
              text-[var(--text)]
            "
          >
            Our Values
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;

            return (
              <div
                key={idx}
                className="
                  bg-white
                  p-6
                  rounded-2xl
                  border border-[var(--border)]
                  shadow-sm
                  flex flex-col
                  items-center
                  text-center
                  space-y-4
                  hover:shadow-md
                  transition-shadow
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-12 h-12
                    rounded-full
                    bg-[var(--primary-light)]
                    text-[var(--secondary)]
                    flex items-center justify-center
                  "
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3
                  className="
                    font-[family-name:var(--font-instrument)]
                    font-normal
                    text-[var(--text)]
                    text-base
                  "
                >
                  {val.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    font-[family-name:var(--font-jakarta)]
                    text-[var(--muted)]
                    text-xs
                    leading-relaxed
                  "
                >
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

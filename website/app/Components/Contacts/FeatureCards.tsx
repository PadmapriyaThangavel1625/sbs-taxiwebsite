
// components/contact/FeatureCards.tsx
import {
  Headphones,
  Clock,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      icon: <Headphones className="w-6 h-6 text-[var(--primary)]" />,
      title: "24/7 Support",
      description: "We're always here for you",
    },
    {
      icon: <Clock className="w-6 h-6 text-[var(--primary)]" />,
      title: "Quick Response",
      description: "Get quick answers to your queries",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-[var(--primary)]" />,
      title: "Customer First",
      description: "Your satisfaction is our priority",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[var(--primary)]" />,
      title: "Safe & Secure",
      description: "We ensure safe and reliable rides",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="
            bg-[var(--primary-light)]
            border border-[var(--border)]
            rounded-xl
            p-4
            flex flex-col items-start
            shadow-sm
            transition-all
            hover:shadow-md
          "
        >
          <div
            className="
              p-2.5
              bg-white
              rounded-lg
              shadow-sm
              mb-3
            "
          >
            {feature.icon}
          </div>

          <h3 className="font-semibold text-[var(--text)] text-sm">
            {feature.title}
          </h3>

          <p className="text-[var(--text-light)] text-xs mt-1">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

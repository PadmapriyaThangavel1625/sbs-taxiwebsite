// components/contact/FeatureCards.tsx
import { Headphones, Clock, UserCheck, ShieldCheck } from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      icon: <Headphones className="w-6 h-6 text-blue-700" />,
      title: "24/7 Support",
      description: "We're always here for you",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-700" />,
      title: "Quick Response",
      description: "Get quick answers to your queries",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-blue-700" />,
      title: "Customer First",
      description: "Your satisfaction is our priority",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-700" />,
      title: "Safe & Secure",
      description: "We ensure safe and reliable rides",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
      {features.map((feature, index) => (
        <div key={index} className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex flex-col items-start shadow-sm">
          <div className="p-2.5 bg-white rounded-lg shadow-sm mb-3">
            {feature.icon}
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
          <p className="text-gray-500 text-xs mt-1">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  CreditCard,
  Route,
} from "lucide-react";
import Image from "next/image";

const perks = [
  {
    icon: CheckCircle2,
    title: "Transparent",
    subtitle: "Pricing",
  },
  {
    icon: ShieldCheck,
    title: "No Hidden",
    subtitle: "Charges",
  },
  {
    icon: Clock,
    title: "No Waiting",
    subtitle: "Charges",
  },
  {
    icon: CreditCard,
    title: "No Extra Charge",
    subtitle: "For Online Payments",
  },
  {
    icon: Route,
    title: "Toll Free For",
    subtitle: "First 200 KM",
  },
];

export default function PricingHero() {
  return (
    <section className="relative min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/car2.png"
          alt="Taxi pricing"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div
        className="
          container-custom
          relative
          z-10
          py-10
          sm:py-12
          lg:py-16
        "
      >
        {/* Heading */}
        <div className="max-w-2xl">
          <h1
            className="
              text-3xl
              font-extrabold
              leading-tight
              text-heading
              sm:text-4xl
              lg:text-5xl
            "
          >
            Simple &{" "}
            <span className="text-primary">
              Transparent Pricing
            </span>
          </h1>

          <p
            className="
              mt-4
              text-sm
              leading-6
              text-heading
              sm:text-base
              lg:text-lg
            "
          >
            No hidden charges. No surprises. Just honest pricing
            for a comfortable and safe journey.
          </p>
        </div>

        {/* Perks Bar */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            overflow-hidden
            rounded-xl
            border
            bg-white
            shadow-lg
            sm:grid-cols-2
            lg:grid-cols-5
          "
        >
          {perks.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-4
                  sm:px-5
                  lg:border-r
                  lg:border-gray-200
                  lg:last:border-r-0
                "
              >
                <Icon
                  className="
                    h-6
                    w-6
                    shrink-0
                    text-primary
                  "
                />

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-heading">
                    {item.title}
                  </p>

                  <p className="text-sm font-semibold text-heading">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

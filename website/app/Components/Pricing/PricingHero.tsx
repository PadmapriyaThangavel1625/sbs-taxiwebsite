
import Image from "next/image";

export default function PricingHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-100 font-[var(--font-jakarta)]">
      <div className="relative w-full">
        <Image
          src="/images/pricing.webp"
          alt="Taxi pricing"
          width={1920}
          height={600}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
}

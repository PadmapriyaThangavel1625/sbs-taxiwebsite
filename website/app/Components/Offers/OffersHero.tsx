
import Image from "next/image";

export default function OffersHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/images/offers.webp"
        alt="SBS Taxi Offers"
        width={1920}
        height={600}
        priority
        sizes="100vw"
        className="h-auto w-full"
      />
    </section>
  );
}

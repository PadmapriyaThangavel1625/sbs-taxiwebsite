
import Image from "next/image";

export default function DestinationHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/images/destination.webp"
        alt="Popular Destinations"
        width={1920}
        height={600}
        priority
        sizes="100vw"
        className="h-auto w-full"
      />
    </section>
  );
}

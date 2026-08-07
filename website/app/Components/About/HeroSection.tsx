import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Image */}
      <Image
        src="/images/car4.png"
        alt="SBS Taxi Vehicle Fleet"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-blue-300 font-semibold tracking-wider text-xs uppercase">
          ABOUT US
        </span>

        <div className="max-w-3xl mt-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Your Journey.
            <br />
            <span>Our Commitment.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 leading-relaxed">
            SBS Taxi is a trusted taxi service provider committed to delivering
            safe, reliable and comfortable travel experiences across the city
            and beyond. Whether it's a local ride or an outstation trip, we
            make every journey smooth and memorable.
          </p>
        </div>
      </div>
    </section>
  );
}
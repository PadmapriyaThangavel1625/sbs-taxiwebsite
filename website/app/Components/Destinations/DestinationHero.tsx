import Image from "next/image";

export default function DestinationHero() {
  return (
    <section className="relative min-h-[500px] w-full overflow-hidden pb-12">
      {/* Background Image */}
      <Image
        src="/images/car5.png"
        alt="Popular Destinations"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 pt-16">
        <div className="w-full max-w-3xl">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Popular Destinations
          </h1>

          <h3 className="mt-2 text-xl sm:text-2xl font-bold text-yellow-400">
            Travel anywhere with SBS Taxi.
          </h3>

          <p className="mt-3 text-base sm:text-lg leading-relaxed text-white/95">
            From city rides to outstation trips, we make every journey
            comfortable, safe and memorable.
          </p>

          {/* Search Card */}
          <div className="mt-6 w-full overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_160px_160px]">

              {/* Pickup */}
              <input
                type="text"
                placeholder="📍 Enter pickup location"
                className="border-b md:border-b-0 md:border-r border-gray-200 px-4 py-4 text-sm text-gray-800 outline-none bg-white"
              />

              {/* Drop */}
              <input
                type="text"
                placeholder="📍 Enter drop location"
                className="border-b md:border-b-0 md:border-r border-gray-200 px-4 py-4 text-sm text-gray-800 outline-none bg-white"
              />

              {/* Date */}
              <input
                type="date"
                className="border-b md:border-b-0 md:border-r border-gray-200 px-4 py-4 text-sm text-gray-800 outline-none bg-white"
              />

              {/* Explore Button */}
              <div className="flex items-center justify-center bg-white p-3">
                <button className="w-full rounded-lg bg-blue-700 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-colors">
                  Explore Fares
                </button>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
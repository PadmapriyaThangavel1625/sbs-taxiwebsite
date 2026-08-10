import HeroSection from "@/app/Components/Home/HeroSection";
import TrustBadges from "@/app/Components/Home/TrustBadges";
import FleetSection from "@/app/Components/Home/FleetSection";


export default function Home() {
  return (
    <>
      <main>
        {/* ================= HERO ================= */}
        <HeroSection />

        {/* ================= TRUST BADGES ================= */}
        <TrustBadges />

        {/* ================= FLEET ================= */}
        <FleetSection />
      </main>

      {/* ================= LIMITED OFFER ================= */}
      

      {/* ================= WHATSAPP FLOATING BUTTON ================= */}
      <a
        href="https://wa.me/918144065688"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SBS Taxi on WhatsApp"
        className="
          fixed
          bottom-4
          right-4
          z-[90]
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          text-white
          shadow-lg
          transition-transform
          duration-200
          hover:scale-110
          sm:bottom-5
          sm:right-5
          sm:h-14
          sm:w-14
          md:bottom-6
          md:right-6
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="
            h-6
            w-6
            sm:h-7
            sm:w-7
            md:h-8
            md:w-8
          "
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.67-.51-.173-.008-.372.074-.57.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
      </a>
    </>
  );
}
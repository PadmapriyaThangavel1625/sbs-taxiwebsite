import HeroSection from "@/app/Components/Contacts/HeroSection";
import FeatureCards from "@/app/Components/Contacts/FeatureCards";
import ContactForm from "@/app/Components/Contacts/ContactForm";
import ContactInfo from "@/app/Components/Contacts/ContactInfo";
import MapSection from "@/app/Components/MapSection";

export default function ContactPage() {
  return (
    <main className="w-full font-[family-name:var(--font-jakarta)]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <HeroSection />

      {/* =====================================================
          FEATURES
          SINGLE ROW
      ====================================================== */}


      {/* =====================================================
          CONTACT INFO + CONTACT FORM
          TWO COLUMNS
      ====================================================== */}

      <section
        className="
          w-full
          border-y
          border-[var(--border)]
          bg-slate-50/60
          py-10
          sm:py-14
          lg:py-16
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              grid
              grid-cols-1
              items-stretch
              gap-8

              lg:grid-cols-2
              lg:gap-10

              xl:gap-12
            "
          >
            {/* =================================================
                CONTACT INFORMATION
            ================================================== */}

            <div className="w-full">
              <ContactInfo />
            </div>

            {/* =================================================
                CONTACT FORM
            ================================================== */}

            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAP
      ====================================================== */}

      <section
        className="
          w-full
          bg-white
          py-10
          sm:py-14
          lg:py-16
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-white
              shadow-sm
            "
          >
            <MapSection />
          </div>
        </div>
      </section>

    </main>
  );
}
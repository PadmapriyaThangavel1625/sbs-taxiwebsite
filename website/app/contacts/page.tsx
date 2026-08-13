import HeroSection from "@/app/Components/Contacts/HeroSection";
import FeatureCards from "@/app/Components/Contacts/FeatureCards";
import ContactForm from "@/app/Components/Contacts/ContactForm";
import ContactInfo from "@/app/Components/Contacts/ContactInfo";
import MapSection from "@/app/Components/MapSection";
import BottomCTA from "@/app/Components/BottomCTA";

export default function ContactPage() {
  return (
    <main className="w-full font-[family-name:var(--font-jakarta)]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <HeroSection />

      {/* =====================================================
          FEATURES + CONTACT FORM
      ====================================================== */}

      <section
        className="
          w-full
          bg-white
          py-12
          sm:py-16
          lg:py-20
          xl:py-24
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
              items-start
              gap-8
              lg:grid-cols-12
              lg:gap-10
              xl:gap-12
            "
          >

            {/* FEATURES */}

            <div className="lg:col-span-6">
              <FeatureCards />
            </div>

            {/* CONTACT FORM */}

            <div className="lg:col-span-6">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFORMATION
      ====================================================== */}

      <section
        className="
          w-full
          border-y
          border-[var(--border)]
          bg-slate-50/60
          py-12
          sm:py-16
          lg:py-20
          xl:py-24
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
          <ContactInfo />
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section
        className="
          w-full
          bg-white
          py-12
          sm:py-16
          lg:py-20
          xl:py-24
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
          <BottomCTA />
        </div>
      </section>

      {/* =====================================================
          MAP
          MAP IS BELOW BOTTOM CTA
      ====================================================== */}

      <section
        className="
          w-full
          bg-slate-50
          pb-12
          sm:pb-16
          lg:pb-20
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
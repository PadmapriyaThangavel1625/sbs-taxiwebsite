import HeroSection from "@/app/Components/Contacts/HeroSection";
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
          CONTACT SECTION
          
          LEFT:
          Contact Information
          +
          Map

          RIGHT:
          Contact Form

          BOTH SIDES = SAME HEIGHT
      ====================================================== */}

      <section
        className="
          w-full
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

          {/* =================================================
              MAIN GRID
          ================================================== */}

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
                LEFT COLUMN
                CONTACT INFO + MAP
            ================================================== */}

            <div
              className="
                flex
                h-full
                min-h-0
                w-full
                flex-col
                gap-8
              "
            >

              {/* =============================================
                  CONTACT INFORMATION
              ============================================== */}

              <div className="w-full">
                <ContactInfo />
              </div>

              {/* =============================================
                  MAP
              ============================================== */}

              <div
                className="
                  min-h-0
                  w-full
                  flex-1
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

            {/* =================================================
                RIGHT COLUMN
                CONTACT FORM
            ================================================== */}

            <div
              className="
                flex
                h-full
                min-h-0
                w-full
              "
            >
              <div
                className="
                  h-full
                  w-full
                "
              >
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
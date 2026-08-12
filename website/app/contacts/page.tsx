
import HeroSection from "@/app/Components/Contacts/HeroSection";
import FeatureCards from "@/app/Components/Contacts/FeatureCards";
import ContactForm from "@/app/Components/Contacts/ContactForm";
import ContactInfo from "@/app/Components/Contacts/ContactInfo";
import MapSection from "@/app/Components/Contacts/MapSection";
import BottomCTA from "@/app/Components/BottomCTA";

export default function ContactPage() {
  return (
    <main className="font-[family-name:var(--font-jakarta)]">
      {/* =====================================
          Hero
      ====================================== */}
      <HeroSection />

      {/* =====================================
          Features + Contact Form
      ====================================== */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">

            {/* Features */}
            <div className="lg:col-span-6">
              <FeatureCards />
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-6">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================
          Contact Information + Map
      ====================================== */}
      <section
        className="
          border-y
          border-[var(--border)]
          bg-slate-50/60
          py-12
          sm:py-16
          lg:py-20
        "
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="
              grid
              grid-cols-1
              gap-10
              lg:grid-cols-12
              lg:items-stretch
            "
          >
            {/* Contact Information */}
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>

            {/* Map */}
            <div className="lg:col-span-7">
              <MapSection />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          Help Banner
      ====================================== */}
      <section className="py-10 sm:py-14">
        <div className="mt-16 sm:mt-20 lg:mt-24">
                    <BottomCTA />
                  </div>
      </section>
    </main>
  );
}

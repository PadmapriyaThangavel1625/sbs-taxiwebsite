// contact/page.tsx
import HeroSection from "@/app/Components/Contacts/HeroSection";
import FeatureCards from "@/app/Components/Contacts/FeatureCards";
import ContactForm from "@/app/Components/Contacts/ContactForm";
import ContactInfo from "@/app/Components/Contacts/ContactInfo";
import MapSection from "@/app/Components/Contacts/MapSection";
import HelpBanner from "@/app/Components/Contacts/HelpBanner";


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-white font-sans flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">
        
        {/* Top Section: Hero + Features on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-2">
            <HeroSection />
            <FeatureCards />
          </div>
          <div className="lg:col-span-6">
            <ContactForm />
          </div>
        </div>

        {/* Middle Section: Contact Info on Left, Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <ContactInfo />
          </div>
          <div className="lg:col-span-6">
            <MapSection />
          </div>
        </div>

        {/* Bottom Immediate Assistance Banner */}
        <HelpBanner />

      </div>

      
    </main>
  );
}
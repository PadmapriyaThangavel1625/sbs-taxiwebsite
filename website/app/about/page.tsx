import HeroSection from "@/app/Components/About/HeroSection";
import Features from "@/app/Components/About/Features";
import StorySection from "@/app/Components/About/StorySection";
import Statistics from "@/app/Components/About/Statistics";
import Values from "@/app/Components/About/Values";
import BottomCTA from "@/app/Components/About/BottomCTA";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans">
      <HeroSection />
      <Features />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <StorySection />
          </div>
          <div className="lg:col-span-5">
            <Statistics />
          </div>
        </div>
      </section>
      <Values />
      <BottomCTA />
    </main>
  );
}
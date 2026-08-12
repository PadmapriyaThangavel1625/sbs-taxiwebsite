
import HeroSection from "@/app/Components/About/HeroSection";
import Features from "@/app/Components/About/Features";
import StorySection from "@/app/Components/About/StorySection";
import Statistics from "@/app/Components/About/Statistics";
import Values from "@/app/Components/About/Values";
import BottomCTA from "@/app/Components/BottomCTA";

export default function AboutPage() {
  return (
    <main className="about-page">
      <HeroSection />

      <Features />

      <section className="about-main-section">
        <div className="about-main-grid">
          <div className="about-story-column">
            <StorySection />
          </div>

          <div className="about-statistics-column">
            <Statistics />
          </div>
        </div>
      </section>

      <Values />
{/* ===================================== Bottom CTA ====================================== */} 
<section className="py-10 sm:py-14">
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> 
    <BottomCTA /> 
    </div>
    </section>
    </main>
  );
}

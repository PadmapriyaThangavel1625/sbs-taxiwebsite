import HeroSection from "@/app/Components/About/HeroSection";
import Features from "@/app/Components/About/Features";
import StorySection from "@/app/Components/About/StorySection";
import Statistics from "@/app/Components/About/Statistics";
import Values from "@/app/Components/About/Values";
import BottomCTA from "@/app/Components/About/BottomCTA";

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

      <BottomCTA />
    </main>
  );
}
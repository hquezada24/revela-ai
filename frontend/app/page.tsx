import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Gallery from "@/components/Gallery";
import AIStylist from "@/components/AIStylist";
import AIModels from "@/components/AIModels";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

// ─── App ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="bg-bg min-h-screen">
      <Hero />
      <Gallery />
      <Features />
      <HowItWorks />
      <AIModels />
      <AIStylist />
      <UseCases />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

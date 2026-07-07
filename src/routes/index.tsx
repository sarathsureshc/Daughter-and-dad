import { createFileRoute } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { FilmGrain } from "@/components/site/FilmGrain";
import { StickyNav } from "@/components/site/StickyNav";
import { Hero } from "@/components/site/Hero";
import { IntroStrip } from "@/components/site/IntroStrip";
import { OurStory } from "@/components/site/OurStory";
import { MenuHighlights } from "@/components/site/MenuHighlights";
import { Gallery } from "@/components/site/Gallery";
import { PressStrip } from "@/components/site/PressStrip";
import { VisitUs } from "@/components/site/VisitUs";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const reduce = useReducedMotion();
  useSmoothScroll(!reduce);

  return (
    <main className="relative bg-background text-foreground">
      <FilmGrain />
      <LoadingScreen />
      <StickyNav />
      <Hero />
      <IntroStrip />
      <OurStory />
      <MenuHighlights />
      <Gallery />
      <PressStrip />
      <VisitUs />
      <Footer />
    </main>
  );
}

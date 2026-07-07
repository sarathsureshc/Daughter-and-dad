import { Clock } from "lucide-react";
import { MagneticButton } from "./primitives/MagneticButton";
import { RevealText } from "./primitives/RevealText";

export function IntroStrip() {
  return (
    <section id="intro" className="relative border-b border-foreground/10 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-16">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-primary">A word from us</p>
          <RevealText
            as="h2"
            className="font-serif text-3xl leading-[1.15] text-foreground text-balance md:text-5xl"
          >
            We built a small place where good coffee, dogs, and slow conversation are always
            welcome.
          </RevealText>
        </div>

        <div className="flex flex-col items-start gap-6 md:items-end">
          <div className="inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-card/50 px-5 py-3 text-sm text-foreground">
            <Clock size={16} className="text-primary" />
            <span>
              Café <b className="font-medium">7am – 7pm</b> · Kitchen{" "}
              <b className="font-medium">7:30am – 3:30pm</b>
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <MagneticButton href="#visit" variant="primary">
              Reserve a Table
            </MagneticButton>
            <MagneticButton href="https://wa.me/971543834709" variant="outline">
              WhatsApp Us
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Instagram } from "lucide-react";
import { Monogram } from "./primitives/Monogram";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-[color:oklch(0.92_0.028_68)] py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4 text-foreground">
          <Monogram size={44} tone="dark" />
          <div>
            <p className="font-serif text-xl leading-tight">
              Daughter <span className="italic text-primary">&amp;</span> Dad Coffee
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Community In Nature
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-foreground/80 md:items-end">
          <a
            href="https://instagram.com/daughterdadcoffee"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-foreground hover:text-primary"
          >
            <Instagram size={16} />
            @daughterdadcoffee
          </a>
          <a href="mailto:admin@daughterdad.coffee" className="hover:text-primary">
            admin@daughterdad.coffee
          </a>
          <a href="tel:+971543834709" className="hover:text-primary">
            +971 54 383 4709
          </a>
          <p className="text-xs text-muted-foreground">Meliá Desert Palm · Warsan 2, Dubai</p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-foreground/10 px-6 pt-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Daughter and Dad Coffee Shop L.L.C</p>
        <p>Coffee by Orbis Roastery, Dubai.</p>
      </div>
    </footer>
  );
}

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Monogram } from "./primitives/Monogram";

const LINKS = [
  { href: "#welcome", label: "Welcome" },
  { href: "#story", label: "Our Story" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
];

export function StickyNav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > (typeof window !== "undefined" ? window.innerHeight * 0.85 : 600));
  });

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: solid ? "rgba(246,238,228,0.92)" : "rgba(246,238,228,0)",
        borderBottomColor: solid ? "rgba(59,42,32,0.08)" : "rgba(59,42,32,0)",
      }}
      transition={{ duration: 0.4 }}
      style={{ backdropFilter: solid ? "blur(10px)" : "none" }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
        <motion.a
          href="#welcome"
          animate={{ opacity: solid ? 1 : 0.9 }}
          className={`flex items-center gap-3 ${solid ? "text-foreground" : "text-background"}`}
        >
          <Monogram size={36} tone={solid ? "dark" : "light"} />
          <span className="hidden font-serif text-lg tracking-tight sm:inline">
            Daughter <span className="italic text-primary">&amp;</span> Dad
          </span>
        </motion.a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide transition-colors ${
                solid
                  ? "text-foreground/80 hover:text-primary"
                  : "text-background/90 hover:text-accent"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#visit"
          className={`hidden rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-primary hover:text-primary md:inline-flex ${
            solid ? "border-foreground/25 text-foreground" : "border-background/40 text-background"
          }`}
        >
          Reserve
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`rounded-full p-2 md:hidden ${solid ? "text-foreground" : "text-background"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-foreground/10 bg-background/95 px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-serif text-2xl text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
}

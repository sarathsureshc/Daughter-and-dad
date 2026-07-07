import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "./primitives/CountUp";

const PRESS = [
  "Condé Nast Traveller",
  "GQ Magazine",
  "What's On Dubai",
  "Condé Nast Traveller",
  "GQ Magazine",
  "What's On Dubai",
];

const QUOTES = [
  {
    quote:
      "For a slow, peaceful morning in a nature-filled setting, Justin and Lia's Daughter and Dad Coffee is a plant-led community cafe surrounded by greenery at the Meliá Desert Palm Estate. Around a 30-minute drive from the city, it's a dog-friendly oasis for animal lovers and nature seekers.",
    source: "Condé Nast Traveller",
  },
  {
    quote:
      "There's a temptation to overcomplicate what makes a café good. Luckily, Daughter and Dad Coffee sidesteps that entirely. Set within the Desert Palm Equestrian Centre, it has something most places don't — space to breathe. It's family-run, and you can feel it.",
    source: "GQ Magazine",
  },
  {
    quote:
      "This family-run café sits within the Meliá Desert Palm equestrian estate, offering a countryside escape unlike anywhere else in the city. Both the inside and outside are welcome to pets, though dogs must remain on their leads for the safety of the horses and their riders.",
    source: "What's On Dubai",
  },
];

export function PressStrip() {
  const reduce = useReducedMotion();
  return (
    <section className="relative border-y border-foreground/10 py-20 md:py-24">
      <p className="mb-10 text-center text-xs uppercase tracking-[0.35em] text-muted-foreground">
        As seen in
      </p>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...PRESS, ...PRESS].map((name, i) => (
            <span key={i} className="font-serif text-2xl italic text-foreground/70 md:text-4xl">
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-10 px-6 sm:grid-cols-3">
        {[
          { value: 4.6, decimals: 1, suffix: "★", label: "Google Rating" },
          { value: 302, decimals: 0, suffix: "", label: "Reviews & counting" },
          { value: 13.6, decimals: 1, suffix: "K", label: "Instagram Community" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <span className="font-serif text-6xl text-primary md:text-7xl">
              <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </span>
            <span className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-24 grid max-w-6xl gap-6 px-6 md:mt-32 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <motion.figure
            key={q.source}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="flex flex-col justify-between rounded-3xl border border-foreground/10 bg-card p-8"
          >
            <blockquote className="font-serif text-lg leading-relaxed text-foreground/85 italic">
              "{q.quote}"
            </blockquote>
            <figcaption className="mt-6 text-xs uppercase tracking-[0.25em] text-primary">
              {q.source}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

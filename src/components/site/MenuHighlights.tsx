import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useState, useRef } from "react";
import { MagneticButton } from "./primitives/MagneticButton";
import { RevealText } from "./primitives/RevealText";

type Item = { name: string; price: number; note?: string; popular?: boolean };
type Tab = { key: string; label: string; items: Item[] };

const TABS: Tab[] = [
  {
    key: "sweet",
    label: "Sweet Treats",
    items: [
      { name: "Blueberry Muffin", price: 20, note: "Baked in-house each morning" },
      { name: "Banana Bread", price: 22, note: "Warm slice, salted butter" },
      { name: "Carrot Cake", price: 33, note: "Cream cheese, toasted walnut" },
    ],
  },
  {
    key: "breakfast",
    label: "Breakfast & Beyond",
    items: [
      {
        name: "Whipped Avocado Benedict",
        price: 48,
        note: "Poached eggs, sourdough",
        popular: true,
      },
      { name: "Turkish Eggs", price: 52, note: "Garlic yogurt, chili butter" },
      { name: "Classic Pancakes", price: 45, note: "Maple, seasonal berries" },
    ],
  },
  {
    key: "coffee",
    label: "Coffees & Hot Drinks",
    items: [
      { name: "Flat White", price: 25, note: "Orbis house blend", popular: true },
      { name: "Cortado", price: 25, note: "Equal parts, silky" },
      { name: "Spanish Latte", price: 28, note: "Condensed milk, warm" },
    ],
  },
  {
    key: "juice",
    label: "Juices & Smoothies",
    items: [
      { name: "Green Goddess", price: 33, note: "Spinach, apple, ginger" },
      { name: "Berry Beauty", price: 33, note: "Mixed berries, banana" },
    ],
  },
];

function TiltCard({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 15 });

  function move(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 0.9, 0.32, 1] }}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative flex flex-col justify-between rounded-3xl border border-foreground/10 bg-card p-8 shadow-[0_2px_20px_-12px_rgba(59,42,32,0.15)] transition-shadow duration-500 hover:shadow-[0_20px_60px_-30px_rgba(169,70,46,0.35)]"
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h4 className="font-serif text-2xl text-foreground">{item.name}</h4>
          {item.popular && (
            <span className="mt-1 shrink-0 rounded-full bg-accent/50 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-primary">
              Popular
            </span>
          )}
        </div>
        {item.note && <p className="text-sm leading-relaxed text-muted-foreground">{item.note}</p>}
      </div>
      <div className="mt-8 flex items-end justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-primary">AED</span>
        <span className="font-serif text-3xl text-foreground">{item.price}</span>
      </div>
    </motion.div>
  );
}

export function MenuHighlights() {
  const [active, setActive] = useState(TABS[0].key);
  const current = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <section id="menu" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">From the kitchen</p>
            <RevealText
              as="h2"
              className="font-serif text-4xl leading-[1.05] text-foreground text-balance md:text-5xl"
            >
              A short menu, made properly.
            </RevealText>
          </div>
          <p className="max-w-sm text-foreground/70">
            We keep the list small on purpose. Every plate and every pour is something we're proud
            to hand you.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="mb-10 flex flex-wrap gap-2 md:mb-14"
          role="tablist"
          aria-label="Menu categories"
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active === t.key}
              onClick={() => setActive(t.key)}
              className={`relative rounded-full border px-5 py-2.5 text-sm transition-colors ${
                active === t.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-foreground/20 text-foreground/80 hover:border-foreground/50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {current.items.map((item, i) => (
            <TiltCard key={item.name} item={item} index={i} />
          ))}
        </motion.div>

        <div className="mt-14 flex justify-center">
          <MagneticButton href="#visit" variant="outline">
            View Full Menu →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

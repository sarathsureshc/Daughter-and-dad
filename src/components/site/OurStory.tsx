import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealImage } from "./primitives/RevealImage";
import { RevealText } from "./primitives/RevealText";

const LIA_IMG =
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80";
const JUSTIN_IMG =
  "https://images.unsplash.com/photo-1525480122447-64809d765ec4?auto=format&fit=crop&w=1400&q=80";

export function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineLen = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden bg-[color:oklch(0.93_0.026_68)] py-24 md:py-40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl md:mb-24">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Our Story</p>
          <RevealText
            as="h2"
            className="font-serif text-4xl leading-[1.05] text-foreground text-balance md:text-6xl"
          >
            A daughter, a dad, and almost two decades in UAE coffee.
          </RevealText>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Lia */}
          <article className="flex flex-col gap-6">
            <RevealImage
              src={LIA_IMG}
              alt="Lia, café founder, pouring coffee in soft morning light"
              aspect="4/5"
              className="rounded-3xl"
            />
            <div>
              <p className="mb-2 font-serif text-2xl text-primary">Lia</p>
              <h3 className="mb-4 font-serif text-2xl text-foreground md:text-3xl">
                The daughter, on doing it scared.
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                Lia moved to the UK for university, where she completed a Master's in Psychology. In
                2021, once COVID restrictions eased, she moved back to Dubai wanting to build a
                space where the community could gather, connect, and slow down after a difficult few
                years — guided by one principle:{" "}
                <em className="text-primary not-italic">do it scared.</em>
              </p>
            </div>
          </article>

          {/* Justin */}
          <article className="flex flex-col gap-6 md:mt-24">
            <RevealImage
              src={JUSTIN_IMG}
              alt="Justin, roaster and founder of Orbis, checking a batch of beans"
              aspect="4/5"
              className="rounded-3xl"
            />
            <div>
              <p className="mb-2 font-serif text-2xl text-primary">Justin</p>
              <h3 className="mb-4 font-serif text-2xl text-foreground md:text-3xl">
                The dad, and a roastery called Orbis.
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                A year after the family relocated to Dubai, Justin founded{" "}
                <b className="font-medium">Orbis</b> in 2007, roasting beans to sell at the Dubai
                Marina weekend market. Desert Palm was one of his first clients. What began as a
                small operation is now a large-scale commercial roastery supplying specialty coffee
                to hotels and cafés across the UAE — including every cup we pour here.
              </p>
            </div>
          </article>
        </div>

        {/* Timeline */}
        <div className="mt-24 md:mt-32">
          <svg viewBox="0 0 800 80" className="w-full text-primary/70" preserveAspectRatio="none">
            <motion.line
              x1="40"
              y1="40"
              x2="760"
              y2="40"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              style={reduce ? undefined : { pathLength: lineLen }}
              initial={reduce ? { opacity: 0 } : undefined}
              whileInView={reduce ? { opacity: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            {[
              { cx: 60, label: "2007", sub: "Orbis begins" },
              { cx: 400, label: "2021", sub: "Café opens" },
              { cx: 740, label: "Today", sub: "Community In Nature" },
            ].map((p, i) => (
              <g key={p.label}>
                <motion.circle
                  cx={p.cx}
                  cy="40"
                  r="7"
                  fill="var(--color-background)"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.25, duration: 0.5 }}
                />
              </g>
            ))}
          </svg>
          <div className="mt-2 grid grid-cols-3 gap-4 text-center">
            {[
              { label: "2007", sub: "Orbis Roastery" },
              { label: "2021", sub: "The café opens" },
              { label: "Today", sub: "Community In Nature" },
            ].map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.2 }}
              >
                <p className="font-serif text-2xl text-foreground md:text-3xl">{p.label}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-2xl md:mt-20">
          <RevealText
            as="p"
            className="font-serif text-xl italic leading-relaxed text-foreground/80 text-balance md:text-2xl"
          >
            "In a city known for its fast pace and constant reinvention, our focus has stayed the
            same: quality coffee, honest food, and genuine service."
          </RevealText>
          <p className="mt-6 text-foreground/70 leading-relaxed">
            Today, Daughter and Dad is a space for nature-lovers, dog owners, families and horse
            riders alike, set within the greenery of Desert Palm. Whether stopping by for a coffee
            or settling in for the morning, the aim is the same: consistency, warmth, and a genuine
            welcome.
          </p>
        </div>
      </div>
    </section>
  );
}

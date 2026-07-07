import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealText } from "./primitives/RevealText";

const COLS: { src: string; alt: string; aspect: string }[][] = [
  [
    {
      src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
      alt: "Latte art in a matte ceramic cup",
      aspect: "3/4",
    },
    {
      src: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80",
      alt: "Garden table with morning pastries",
      aspect: "4/5",
    },
    {
      src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80",
      alt: "A calm dog resting under a café table",
      aspect: "1/1",
    },
  ],
  [
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
      alt: "Sunlit café interior with wood and plants",
      aspect: "4/5",
    },
    {
      src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
      alt: "Barista pulling an espresso shot",
      aspect: "3/4",
    },
  ],
  [
    {
      src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80",
      alt: "Fresh sourdough loaves on a linen cloth",
      aspect: "1/1",
    },
    {
      src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80",
      alt: "Breakfast plate with eggs and greens",
      aspect: "4/5",
    },
    {
      src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
      alt: "Overhead of espresso, cortado and pastries",
      aspect: "3/4",
    },
  ],
];

function ParallaxColumn({
  images,
  speed,
}: {
  images: { src: string; alt: string; aspect: string }[];
  speed: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed}%`]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y }}
      className="flex flex-col gap-4 md:gap-6"
    >
      {images.map((img, i) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.7, delay: i * 0.05 }}
          className="group overflow-hidden rounded-2xl"
          style={{ aspectRatio: img.aspect }}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Gallery() {
  return (
    <section className="relative bg-[color:oklch(0.93_0.026_68)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <RevealText
            as="h2"
            className="max-w-2xl font-serif text-4xl leading-[1.05] text-foreground text-balance md:text-6xl"
          >
            Mornings, in pictures.
          </RevealText>
          <a
            href="https://instagram.com/daughterdadcoffee"
            target="_blank"
            rel="noreferrer"
            className="text-sm uppercase tracking-[0.25em] text-primary hover:opacity-70"
          >
            @daughterdadcoffee ↗
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <ParallaxColumn images={COLS[0]} speed={-8} />
          <div className="md:mt-16">
            <ParallaxColumn images={COLS[1]} speed={6} />
          </div>
          <ParallaxColumn images={COLS[2]} speed={-4} />
        </div>
      </div>
    </section>
  );
}

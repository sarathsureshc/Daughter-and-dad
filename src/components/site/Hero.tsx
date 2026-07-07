import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2400&q=80";

const TAGLINE = ["Community", "In", "Nature"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const leafY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const leafY2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="welcome"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-foreground"
    >
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-0 h-[115%] w-full">
        <img
          src={HERO_IMG}
          alt="Sunlit garden café tables under leaves"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/10 to-foreground/70" />
      </motion.div>

      {/* Parallax leaf shapes */}
      {!reduce && (
        <>
          <motion.svg
            aria-hidden
            style={{ y: leafY }}
            className="pointer-events-none absolute -left-16 top-24 h-64 w-64 text-secondary/40"
            viewBox="0 0 200 200"
          >
            <path
              fill="currentColor"
              d="M100 10c40 30 80 50 80 100s-40 80-80 80S20 160 20 110 60 40 100 10z"
            />
          </motion.svg>
          <motion.svg
            aria-hidden
            style={{ y: leafY2 }}
            className="pointer-events-none absolute -right-24 bottom-32 h-80 w-80 text-accent/25"
            viewBox="0 0 200 200"
          >
            <path
              fill="currentColor"
              d="M40 20c60-10 120 30 140 90s-30 80-100 70S0 130 10 90 40 20 40 20z"
            />
          </motion.svg>
        </>
      )}

      <motion.div
        style={reduce ? undefined : { opacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pb-20 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-xs uppercase tracking-[0.4em] text-background/80"
        >
          Meliá Desert Palm · Dubai
        </motion.p>

        <h1 className="font-serif text-background text-balance">
          <span className="block text-[clamp(3rem,10vw,7.5rem)] leading-[0.95]">
            {TAGLINE.map((word, i) => (
              <span key={i} className="mr-4 inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 1.7 + i * 0.18,
                    duration: 1,
                    ease: [0.22, 0.9, 0.32, 1],
                  }}
                  className={`inline-block ${i === 1 ? "italic text-accent/90" : ""}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="max-w-md text-base leading-relaxed text-background/85 md:text-lg"
        >
          A small family café tucked inside an equestrian estate. Slow mornings, garden light, and
          coffee brewed by people who love it.
        </motion.p>
      </motion.div>

      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-background/80"
        aria-label="Scroll down"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}

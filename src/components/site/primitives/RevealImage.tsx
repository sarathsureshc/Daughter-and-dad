import { motion, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspect?: string;
  direction?: "up" | "left";
};

export function RevealImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  aspect = "4/5",
  direction = "up",
}: Props) {
  const reduce = useReducedMotion();
  const initial = reduce
    ? { opacity: 0 }
    : direction === "up"
      ? { clipPath: "inset(100% 0 0 0)" }
      : { clipPath: "inset(0 100% 0 0)" };
  const animate = reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      className={`overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </motion.div>
  );
}

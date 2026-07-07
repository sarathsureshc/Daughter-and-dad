import { motion, useReducedMotion } from "framer-motion";

type Props = {
  size?: number;
  animate?: boolean;
  /** "dark" reads on light/cream backgrounds, "light" reads on dark/photo backgrounds. */
  tone?: "dark" | "light";
  className?: string;
};

const LOGO_SRC = {
  dark: "/logo-dark.png",
  light: "/logo-cream.png",
};

export function Monogram({ size = 56, animate = false, tone = "dark", className = "" }: Props) {
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  return (
    <motion.img
      src={LOGO_SRC[tone]}
      alt="Daughter and Dad Coffee monogram"
      width={size}
      height={size}
      initial={shouldAnimate ? { opacity: 0, scale: 0.85 } : false}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.9, ease: [0.22, 0.9, 0.32, 1] }}
      style={{ height: size, width: "auto" }}
      className={`select-none object-contain ${className}`}
      draggable={false}
    />
  );
}

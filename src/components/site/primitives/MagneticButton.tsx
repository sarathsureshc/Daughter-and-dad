import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { type ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  function handleMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.25);
    y.set(relY * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 min-h-[44px]";
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-[color:oklch(0.46_0.14_38)]",
    outline:
      "border border-foreground/25 text-foreground hover:border-foreground/60 hover:bg-foreground/5",
    ghost: "text-foreground hover:bg-foreground/5",
  }[variant];

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  const shared = {
    onPointerMove: handleMove,
    onPointerLeave: reset,
    className: `${base} ${styles} ${className}`,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        {...shared}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      type="button"
      {...shared}
    >
      {inner}
    </motion.button>
  );
}

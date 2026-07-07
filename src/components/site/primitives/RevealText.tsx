import { motion, useReducedMotion } from "framer-motion";
import { type ElementType, type ReactNode } from "react";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  by?: "word" | "line";
};

export function RevealText({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  by = "word",
}: Props) {
  const reduce = useReducedMotion();
  const parts = by === "word" ? children.split(/(\s+)/) : children.split("\n");

  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.4, delay }}
        className={className}
      >
        <Tag>{children}</Tag>
      </motion.div>
    );
  }

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ staggerChildren: 0.045, delayChildren: delay }}
        className="inline"
      >
        {parts.map((p, i) =>
          /^\s+$/.test(p) ? (
            <span key={i}>{p}</span>
          ) : (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.75, ease: [0.22, 0.9, 0.32, 1] },
                  },
                }}
              >
                {p}
              </motion.span>
            </span>
          ),
        )}
      </motion.span>
    </Tag>
  );
}

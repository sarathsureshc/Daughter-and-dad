import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Monogram } from "./primitives/Monogram";

export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(!reduce);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          onClick={() => setVisible(false)}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-background"
          aria-hidden={!visible}
        >
          <div className="flex flex-col items-center gap-6 text-foreground">
            <Monogram size={96} tone="dark" animate />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-xs uppercase tracking-[0.35em] text-muted-foreground"
            >
              Daughter &amp; Dad
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

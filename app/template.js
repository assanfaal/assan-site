"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function Template({ children }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: 16 }
      }
      animate={
        reduce
          ? { opacity: 1, transition: { duration: 0.3, ease: EASE } }
          : { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
      }
    >
      {children}
    </motion.div>
  );
}
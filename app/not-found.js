"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function NotFound() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative flex min-h-dvh w-full items-center overflow-hidden bg-[var(--paper)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[45vw] font-bold leading-none tracking-tighter text-[var(--navy)]/[0.05]"
      >
        404
      </span>

      <div className="container-x relative z-10 flex flex-col gap-6 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="eyebrow">404</span>
          <span aria-hidden="true" className="h-px w-10 bg-[var(--line)]" />
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase">
            Page not found
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: reduce ? 0 : 0.1, ease: EASE }}
          className="max-w-3xl font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-tight text-[var(--navy)]"
        >
          This page went
          <br />
          somewhere else.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.25, ease: EASE }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-xs font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-[var(--warm)] md:px-6 md:py-3.5 md:text-sm"
          >
            Back home
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-semibold tracking-wide text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-white md:px-6 md:py-3.5 md:text-sm"
          >
            See projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
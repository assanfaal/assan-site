"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const HEADLINE = "I am Assan Faal.";
const SUBLINE =
  "Developer, video editor and entrepreneur based in The Gambia. Freelancing since 2024 while studying Information Systems at the University of The Gambia.";

const FACTS = [
  { label: "Based in", value: "The Gambia" },
  { label: "Studying", value: "BSc Information Systems, UTG" },
  { label: "Freelancing", value: "Since 2024" },
];

export default function AboutTeaser() {
  const reduce = useReducedMotion() ?? false;

  const wordContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.045,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const word = {
    hidden: reduce ? { opacity: 0 } : { y: "110%" },
    show: {
      opacity: 1,
      y: "0%",
      transition: { duration: reduce ? 0.4 : 0.9, ease: EASE },
    },
  };

  const factsContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const factItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  };

  return (
    <section
      aria-labelledby="about-teaser-heading"
      className="relative w-full overflow-hidden bg-[var(--paper)]"
    >
      <div className="container-x flex flex-col gap-10 py-20 md:gap-14 md:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="eyebrow">About</span>
          <span aria-hidden="true" className="h-px w-10 bg-[var(--line)]" />
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase">
            Chapter 01
          </span>
        </motion.div>

        <h2 id="about-teaser-heading" className="sr-only">
          About Assan Faal
        </h2>

        <div className="max-w-5xl">
          <motion.p
            variants={wordContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] font-semibold tracking-tight text-[var(--navy)]"
          >
            {HEADLINE.split(" ").map((wordText, index) => (
              <span
                key={`${wordText}-${index}`}
                className="inline-block overflow-hidden align-bottom"
              >
                <motion.span variants={word} className="inline-block">
                  {wordText}
                  {"\u00A0"}
                </motion.span>
              </span>
            ))}
          </motion.p>

          <motion.p
            variants={wordContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-4 max-w-3xl font-display text-[clamp(1.15rem,2.6vw,1.9rem)] leading-[1.35] font-medium tracking-tight text-[var(--muted)] md:mt-6"
          >
            {SUBLINE.split(" ").map((wordText, index) => (
              <span
                key={`${wordText}-${index}`}
                className="inline-block overflow-hidden align-bottom"
              >
                <motion.span variants={word} className="inline-block">
                  {wordText}
                  {"\u00A0"}
                </motion.span>
              </span>
            ))}
          </motion.p>
        </div>

        <motion.ul
          variants={factsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3"
        >
          {FACTS.map((fact) => (
            <motion.li
              key={fact.label}
              variants={factItem}
              className="flex flex-col gap-1 border-t border-[var(--line)] pt-3"
            >
              <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                {fact.label}
              </span>
              <span className="font-display text-sm font-medium leading-snug text-[var(--navy)] md:text-base">
                {fact.value}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.1, ease: EASE }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/cv"
            className="group inline-flex items-center gap-2 font-display text-base font-semibold tracking-tight text-[var(--navy)] transition-colors duration-300 hover:text-[var(--accent)] md:text-lg"
          >
            View my CV
            <span
              aria-hidden="true"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--navy)]/25 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--paper)]"
            >
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
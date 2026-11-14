"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const ROWS = [
  {
    label: "Languages and frameworks",
    direction: "left",
    speed: 34,
    items: ["Next.js", "React", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Node.js"],
  },
  {
    label: "Data and tools",
    direction: "right",
    speed: 30,
    items: ["Firebase", "Firestore", "Authentication", "Git", "Vercel", "WordPress"],
  },
  {
    label: "Beyond the code",
    direction: "left",
    speed: 38,
    items: ["Graphic Design", "Video Editing", "Content Production", "UI Design", "Branding", "Motion"],
  },
];

function Row({ row, reduce, scrollVelocity }) {
  const doubled = [...row.items, ...row.items];
  const baseDuration = row.speed;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase">
        {row.label}
      </span>
      <div className="relative overflow-hidden">
        <motion.div
          style={{ "--row-base": `${baseDuration}s` }}
          className="flex w-max will-change-transform"
        >
          <motion.div
            animate={
              reduce
                ? { x: 0 }
                : row.direction === "left"
                  ? { x: ["0%", "-50%"] }
                  : { x: ["-50%", "0%"] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: baseDuration,
                    ease: "linear",
                    repeat: Infinity,
                  }
            }
            className="flex flex-shrink-0 items-center"
          >
            {doubled.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex flex-shrink-0 items-center"
              >
                <span className="whitespace-nowrap px-4 font-display text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-none tracking-tight text-[var(--navy)] md:px-6">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="text-[clamp(1rem,2vw,1.4rem)] text-[var(--accent)]"
                >
                  &#10022;
                </span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const tilt = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -1.5, reduce ? 0 : 1.5]);

  return (
    <motion.section
      ref={sectionRef}
      aria-labelledby="skills-heading"
      style={reduce ? undefined : { rotate: tilt }}
      className="relative w-full overflow-hidden bg-white py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-32" />

      <div className="container-x flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-3 pb-4 md:pb-6"
        >
          <div className="flex items-center gap-3">
            <span className="eyebrow">Toolbox</span>
            <span aria-hidden="true" className="h-px w-10 bg-[var(--line)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase">
              What I work with
            </span>
          </div>
          <h2
            id="skills-heading"
            className="max-w-2xl font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-tight text-[var(--navy)]"
          >
            Tools I reach for, from the first sketch to the deploy.
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-6">
        {ROWS.map((row) => (
          <Row key={row.label} row={row} reduce={reduce} />
        ))}
      </div>
    </motion.section>
  );
}
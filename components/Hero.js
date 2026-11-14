"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";
import { site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1];
const ACTIONS = ["Developer", "Video Editor", "Student", "Entrepreneur"];

const BG_COLORS = [
  "#ffffff",
  "#fff1ee",
  "#f5f7ff",
  "#fff5e5",
  "#eef7ff",
  "#f7f3ff",
  "#ffffff",
];

export default function Hero() {
  const sectionRef = useRef(null);
  const marqueeWrapRef = useRef(null);
  const [startIntro, setStartIntro] = useState(false);
  const [canMouse, setCanMouse] = useState(false);
  const [phase, setPhase] = useState("not");
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    let delay = 0.1;
    try {
      if (window.sessionStorage.getItem("portfolio-preloader-seen") !== "1") {
        delay = 2.0;
      }
    } catch (error) {
      delay = 0.1;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      delay = Math.min(delay, 0.5);
    }
    const id = window.setTimeout(() => setStartIntro(true), delay * 1000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setCanMouse(query.matches);
    apply();
    if (query.addEventListener) {
      query.addEventListener("change", apply);
      return () => query.removeEventListener("change", apply);
    }
    query.addListener(apply);
    return () => query.removeListener(apply);
  }, []);

  useEffect(() => {
    if (reduce) {
      setPhase("super");
      return;
    }
    if (!startIntro) return;
    setPhase("not");
    const sequence = [
      { phase: "not", duration: 1400 },
      { phase: "strike", duration: 900 },
      { phase: "super", duration: 2600 },
    ];
    let index = 0;
    let timerId;
    const tick = () => {
      index = (index + 1) % sequence.length;
      setPhase(sequence[index].phase);
      timerId = setTimeout(tick, sequence[index].duration);
    };
    timerId = setTimeout(tick, sequence[0].duration);
    return () => clearTimeout(timerId);
  }, [reduce, startIntro]);

  const mouseActive = canMouse && !reduce;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!mouseActive) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }
    const onMove = (event) => {
      const cx = event.clientX - window.innerWidth / 2;
      const cy = event.clientY - window.innerHeight / 2;
      mouseX.set(cx);
      mouseY.set(cy);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseActive, mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94]);
  const photoShiftX = useTransform(smoothX, (v) => (mouseActive ? v * 0.028 : 0));

  useEffect(() => {
    if (reduce) return;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const node = marqueeWrapRef.current;
      if (!node) return;
      const base = Math.max(14, 28 - v * 12);
      const tracks = node.querySelectorAll(".marquee-track");
      tracks.forEach((track, index) => {
        track.style.animationDuration = `${base + index * 3}s`;
      });
    });
    return unsubscribe;
  }, [reduce, scrollYProgress]);

  const photoVariants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: "10%", clipPath: "inset(100% 0% 0% 0%)" },
    show: {
      opacity: 1,
      y: "0%",
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: reduce ? 0.6 : 1.3,
        ease: EASE,
        delay: reduce ? 0 : 0.25,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: reduce
        ? { duration: 0.4, delay: 0.6 }
        : { type: "spring", stiffness: 200, damping: 18, delay: 1.4 },
    },
  };

  const buttonsContainer = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduce ? 0.3 : 1.4,
        staggerChildren: reduce ? 0.05 : 0.12,
      },
    },
  };

  const buttonItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  const notTechieVariants = {
    hidden: { y: "-120%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
  };

  const superTechieVariants = {
    hidden: { y: "120%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-dvh w-full overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        initial={{ backgroundColor: reduce ? "#ffffff" : BG_COLORS[0] }}
        animate={
          reduce
            ? { backgroundColor: "#ffffff" }
            : { backgroundColor: BG_COLORS }
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                duration: 22,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.16, 0.32, 0.5, 0.68, 0.84, 1],
              }
        }
        className="pointer-events-none absolute inset-0 z-0"
      />

      <div className="relative z-10 flex min-h-dvh flex-col items-center px-4 pt-20 pb-4 md:pt-24 md:pb-8">
        <div className="relative flex w-full flex-shrink-0 items-center justify-center">
          <div className="relative h-[18vw] w-full max-w-5xl overflow-hidden md:h-[12vw]">
            {reduce ? (
              <div className="flex h-full w-full items-center justify-center">
                <span className="whitespace-nowrap font-display text-[14vw] font-bold leading-none tracking-tighter text-[var(--accent)] md:text-[9vw]">
                  Super Techie
                </span>
              </div>
            ) : (
              <>
                <motion.div
                  initial="hidden"
                  animate={
                    !startIntro || phase === "super" ? "hidden" : "visible"
                  }
                  variants={notTechieVariants}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="relative inline-block whitespace-nowrap font-display text-[14vw] font-bold leading-none tracking-tighter text-[var(--navy)] md:text-[9vw]">
                    Not Techie
                    <span className="absolute left-0 top-1/2 flex h-[0.08em] w-full -translate-y-1/2">
                      <motion.span
                        className="block h-full w-full origin-left bg-red-600"
                        animate={{ scaleX: phase !== "not" ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </span>
                  </span>
                </motion.div>
                <motion.div
                  initial="hidden"
                  animate={
                    !startIntro
                      ? "hidden"
                      : phase === "super"
                        ? "visible"
                        : "hidden"
                  }
                  variants={superTechieVariants}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="whitespace-nowrap font-display text-[14vw] font-bold leading-none tracking-tighter text-[var(--accent)] md:text-[9vw]">
                    Super Techie
                  </span>
                </motion.div>
              </>
            )}
          </div>
        </div>

        <motion.div
          style={{ y: photoY, scale: photoScale }}
          className="relative mt-1 flex min-h-0 w-full flex-1 items-center justify-center md:mt-2"
        >
          <motion.div
            style={{ x: photoShiftX }}
            className="flex h-full items-center justify-center"
          >
            <div className="float-soft flex h-full items-center justify-center">
              <motion.div
                variants={photoVariants}
                initial="hidden"
                animate={startIntro ? "show" : "hidden"}
                className="relative flex h-full max-h-full items-center justify-center"
              >
                <img
                  src="/assan.gif"
                  alt="Assan Faal"
                  className="block h-full w-auto max-w-full select-none object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={badgeVariants}
        initial="hidden"
        animate={startIntro ? "show" : "hidden"}
        className="hidden md:block absolute left-[5vw] top-[32%] z-20 h-40 w-40 text-[var(--navy)]"
      >
        <div className="spin-badge h-full w-full">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <path
                id="hero-badge-path"
                d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
            </defs>
            <text
              className="fill-current"
              style={{ fontSize: "6.2px", fontWeight: 600, letterSpacing: "0.4px" }}
            >
              <textPath
                href="#hero-badge-path"
                startOffset="0"
                textLength="226"
                lengthAdjust="spacing"
              >
                AVAILABLE FOR FREELANCE WORK - AVAILABLE FOR FREELANCE WORK -
              </textPath>
            </text>
            <g transform="translate(50 50)">
              <path
                d="M -7,7 L 7,-7 M 7,-7 L -3,-7 M 7,-7 L 7,3"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </motion.div>

      <motion.div
        variants={buttonsContainer}
        initial="hidden"
        animate={startIntro ? "show" : "hidden"}
        className="absolute inset-x-0 bottom-[112px] z-30 flex items-center justify-center gap-2.5 px-4 md:bottom-[124px] md:gap-3"
      >
        <motion.div variants={buttonItem}>
          <MagneticButton
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3.5 py-2.5 text-[11px] font-semibold text-neutral-900 shadow-lg transition-colors hover:bg-neutral-100 md:gap-2 md:px-5 md:py-3 md:text-sm"
          >
            View projects
            <span aria-hidden="true">&rarr;</span>
          </MagneticButton>
        </motion.div>
        <motion.div variants={buttonItem}>
          <MagneticButton
            href={site.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-2.5 text-[11px] font-semibold text-white shadow-lg transition-colors hover:bg-neutral-800 md:gap-2 md:px-5 md:py-3 md:text-sm"
            style={{ color: "#ffffff" }}
          >
            <span className="text-white">Contact me</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div
        ref={marqueeWrapRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 overflow-hidden md:h-28"
      >
        <div className="absolute inset-x-0 bottom-11 w-[140%] -ml-[20%]">
          <Marquee
            items={ACTIONS}
            direction="left"
            background="var(--navy)"
            rotation={-3}
            speed={28}
          />
        </div>
        <div className="absolute inset-x-0 bottom-3 w-[140%] -ml-[20%]">
          <Marquee
            items={ACTIONS}
            direction="right"
            background="var(--accent)"
            rotation={3}
            speed={24}
          />
        </div>
      </div>
    </section>
  );
}
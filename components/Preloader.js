"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1];
const STORAGE_KEY = "portfolio-preloader-seen";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (error) {
      seen = false;
    }

    if (seen) {
      setVisible(false);
      return;
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (reduce) {
      const hide = window.setTimeout(() => {
        try {
          window.sessionStorage.setItem(STORAGE_KEY, "1");
        } catch (error) {
          // Storage can be blocked. Ignore.
        }
        setVisible(false);
      }, 300);
      return () => window.clearTimeout(hide);
    }

    const duration = 1600;
    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 2.2);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        try {
          window.sessionStorage.setItem(STORAGE_KEY, "1");
        } catch (error) {
          // Storage can be blocked. Ignore.
        }
        window.setTimeout(() => setVisible(false), 260);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, reduce]);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.3, ease: EASE } }
              : {
                  clipPath: "inset(0% 0% 100% 0%)",
                  transition: { duration: 0.9, ease: EASE },
                }
          }
          className="fixed inset-0 z-[70] flex flex-col justify-between overflow-hidden bg-[var(--navy)] px-6 pt-6 pb-8 text-[var(--paper)] md:px-10 md:pb-10"
        >
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-semibold tracking-[0.3em] text-white/45 uppercase">
              {site.name}
            </span>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-white/45 uppercase">
              {site.location}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="overflow-hidden px-2">
              <motion.span
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: 0.9, ease: EASE }}
                className="block text-center font-display text-[clamp(2.6rem,12vw,8rem)] leading-[0.95] font-semibold tracking-tighter"
              >
                {site.name}
              </motion.span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="h-px w-full bg-white/15">
              <motion.div
                className="h-full origin-left bg-[var(--accent)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: reduce ? 1 : progress / 100 }}
                transition={
                  reduce
                    ? { duration: 0.3, ease: EASE }
                    : { duration: 0.12, ease: "linear" }
                }
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
              <span>Loading</span>
              <span className="tabular-nums text-white">
                {String(reduce ? 100 : progress).padStart(3, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
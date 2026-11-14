"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const DOT_SPRING = { stiffness: 900, damping: 40, mass: 0.4 };
const RING_SPRING = { stiffness: 220, damping: 24, mass: 0.7 };

export default function CustomCursor() {
  const reduce = useReducedMotion() ?? false;
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);
  const ringX = useSpring(mouseX, RING_SPRING);
  const ringY = useSpring(mouseY, RING_SPRING);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduce) return;

    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(pointer.matches);
    sync();
    if (pointer.addEventListener) {
      pointer.addEventListener("change", sync);
      return () => pointer.removeEventListener("change", sync);
    }
    pointer.addListener(sync);
    return () => pointer.removeListener(sync);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const previousCursor = root.style.cursor;
    root.style.cursor = "none";

    const onMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      );
      setHovering(Boolean(interactive));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      root.style.cursor = previousCursor;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, mouseX, mouseY, visible]);

  if (!enabled) return null;

  const ringSize = hovering ? 44 : pressed ? 22 : 30;
  const dotSize = hovering ? 6 : pressed ? 10 : 8;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderColor: hovering ? "rgba(255,255,255,0.95)" : "rgba(10,31,68,0.9)",
          backgroundColor: hovering
            ? "rgba(255,255,255,0.12)"
            : "rgba(10,31,68,0)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border mix-blend-difference"
      />

      <motion.div
        aria-hidden="true"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-white mix-blend-difference"
      />
    </>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const SPRING = { stiffness: 190, damping: 18, mass: 0.35 };

/**
 * Link that pulls toward the cursor on desktop.
 * On touch devices, with reduced motion, or when matchMedia hover/fine fails,
 * it renders as a normal next/link with no motion at all.
 *
 * Props:
 * - href: string (required)
 * - children: node
 * - className: string applied to the inner next/link
 * - strength: how far the button follows the pointer (0 to 1)
 * - target, rel, ariaLabel, onClick: passed to the link
 */
export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.35,
  target,
  rel,
  ariaLabel,
  onClick,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [canMagnet, setCanMagnet] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setCanMagnet(query.matches);
    apply();
    if (query.addEventListener) {
      query.addEventListener("change", apply);
      return () => query.removeEventListener("change", apply);
    }
    query.addListener(apply);
    return () => query.removeListener(apply);
  }, []);

  const active = canMagnet && !reduce;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const labelX = useMotionValue(0);
  const labelY = useMotionValue(0);

  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const springLabelX = useSpring(labelX, SPRING);
  const springLabelY = useSpring(labelY, SPRING);

  const handleMove = (event) => {
    if (!active) return;
    if (event.pointerType === "touch") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
    labelX.set(relX * strength * 0.6);
    labelY.set(relY * strength * 0.6);
  };

  const handleReset = () => {
    x.set(0);
    y.set(0);
    labelX.set(0);
    labelY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      data-magnetic={active ? "true" : "false"}
      onPointerMove={active ? handleMove : undefined}
      onPointerLeave={active ? handleReset : undefined}
      onPointerCancel={active ? handleReset : undefined}
      style={active ? { x: springX, y: springY } : undefined}
      className="inline-flex will-change-transform"
    >
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
        className={className}
      >
        <motion.span
          style={active ? { x: springLabelX, y: springLabelY } : undefined}
          className="inline-flex items-center gap-2 will-change-transform"
        >
          {children}
        </motion.span>
      </Link>
    </motion.div>
  );
}
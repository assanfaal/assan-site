"use client";

const DEFAULT_ITEMS = [
  "Next.js",
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Firebase",
  "Node.js",
  "WordPress",
  "Graphic Design",
];

/**
 * Reusable infinite marquee band.
 * Animation runs on pure CSS keyframes (see app/globals.css).
 *
 * Props:
 * - items: string[]
 * - direction: "left" | "right"
 * - speed: seconds for a full loop (number)
 * - background: any CSS color (defaults to navy)
 * - color: any CSS color (defaults to paper white)
 * - rotation: degrees (number)
 * - className: extra classes on the outer wrapper
 */
export default function Marquee({
  items = DEFAULT_ITEMS,
  direction = "left",
  speed = 28,
  background = "var(--navy)",
  color = "var(--paper)",
  rotation = 0,
  className = "",
}) {
  const list = items.length > 0 ? items : DEFAULT_ITEMS;
  const trackClass = direction === "right" ? "marquee-right" : "marquee-left";

  const renderRow = (rowKey) => (
    <ul key={rowKey} className="flex items-center">
      {list.map((item, index) => (
        <li
          key={`${rowKey}-${item}-${index}`}
          className="flex items-center whitespace-nowrap"
        >
          <span className="px-5 font-display text-xs font-semibold tracking-[0.24em] uppercase sm:text-sm md:text-base">
            {item}
          </span>
          <span aria-hidden="true" className="text-[10px] opacity-50">
            &#10022;
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden border-y border-white/15 ${className}`}
      style={{
        background,
        color,
        width: "104%",
        marginLeft: "-2%",
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center",
      }}
    >
      <div
        className={`marquee-track ${trackClass} py-2.5 md:py-3`}
        style={{ "--marquee-duration": `${speed}s` }}
      >
        {["a", "b", "c", "d"].map((key) => renderRow(`row-${key}`))}
      </div>
    </div>
  );
}
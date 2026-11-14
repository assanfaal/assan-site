"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.25.8-.55v-2c-3.2.7-3.9-1.4-3.9-1.4-.55-1.35-1.3-1.7-1.3-1.7-1.05-.7.1-.7.1-.7 1.15.1 1.75 1.2 1.75 1.2 1.05 1.75 2.75 1.25 3.4.95.1-.75.4-1.25.75-1.55-2.55-.3-5.25-1.3-5.25-5.7 0-1.25.45-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.75.8 1.2 1.85 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.35.8 1.05.8 2.1v3.1c0 .3.2.65.8.55C20.2 21.4 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.75-.85-2-.95-.27-.1-.46-.15-.66.15-.2.3-.75.95-.92 1.15-.17.2-.34.22-.62.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.45.13-.6.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.48.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.72 2-1.41.24-.7.24-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.78-1.3l-.34-.2-3.56.93.95-3.47-.22-.36a9.36 9.36 0 0 1-1.44-5A9.42 9.42 0 0 1 18.7 5.42a9.36 9.36 0 0 1 2.76 6.67 9.42 9.42 0 0 1-9.4 9.41zM20.5 3.49A11.4 11.4 0 0 0 12.05.15C5.75.15.63 5.27.63 11.56c0 2.01.52 3.98 1.52 5.71L.5 23.5l6.39-1.67a11.4 11.4 0 0 0 5.15 1.31h.01c6.3 0 11.42-5.12 11.42-11.41 0-3.05-1.19-5.91-3.35-8.07z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const listVariants = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0.04, delayChildren: 0.1 }
        : { staggerChildren: 0.07, delayChildren: 0.22 },
    },
  };

  const itemVariants = {
    hidden: reduce ? { opacity: 0 } : { y: "115%" },
    show: {
      opacity: 1,
      y: "0%",
      transition: reduce
        ? { duration: 0.3, ease: EASE }
        : { duration: 0.85, ease: EASE },
    },
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-colors duration-500 ${
            scrolled
              ? "border-b border-[var(--line)] bg-[var(--paper)]/85 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="container-x flex h-16 items-center justify-between md:h-20">
            <Link
              href="/"
              className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-[var(--navy)] md:text-xl"
            >
              <span>{site.name}</span>
              <span
                aria-hidden="true"
                className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)] transition-transform duration-500 group-hover:scale-150"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--paper)]/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--navy)] transition-colors duration-300 hover:border-[var(--navy)] hover:bg-[var(--navy)] hover:text-[var(--paper)]"
            >
              <span>Menu</span>
              <span aria-hidden="true" className="flex flex-col gap-1">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="site-menu"
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: reduce ? 0.3 : 0.75, ease: EASE }}
            className="fixed inset-0 z-60 overflow-y-auto overscroll-contain bg-[var(--navy)] text-[var(--paper)]"
          >
            <div className="container-x relative flex min-h-dvh flex-col py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold tracking-tight md:text-xl">
                  {site.name}
                </span>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-full border border-white/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)]"
                >
                  <span>Close</span>
                  <span aria-hidden="true" className="relative block h-3 w-3">
                    <span className="absolute top-1/2 left-0 block h-px w-3 rotate-45 bg-current" />
                    <span className="absolute top-1/2 left-0 block h-px w-3 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <nav className="flex flex-1 items-center py-10">
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  className="w-full"
                >
                  {site.nav.map((navItem, index) => {
                    const active = pathname === navItem.href;
                    return (
                      <motion.li
                        key={navItem.href}
                        variants={itemVariants}
                        className="overflow-hidden"
                      >
                        <Link
                          href={navItem.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-baseline gap-4 py-1.5 sm:gap-6 sm:py-2"
                        >
                          <span
                            className={`text-[10px] font-semibold tracking-[0.2em] transition-colors duration-300 sm:text-xs ${
                              active
                                ? "text-[var(--accent)]"
                                : "text-white/40 group-hover:text-[var(--accent)]"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-display text-[clamp(2.4rem,9vw,5.5rem)] leading-[1.02] font-semibold tracking-tight transition-colors duration-300 ${
                              active
                                ? "text-[var(--accent)]"
                                : "text-[var(--paper)] group-hover:text-[var(--accent)]"
                            }`}
                          >
                            {navItem.label}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: reduce ? 0.1 : 0.6, ease: EASE }}
                className="flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
                    Based in
                  </span>
                  <span className="font-display text-lg tracking-tight sm:text-xl">
                    {site.location}
                  </span>
                </div>

                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  <li>
                    <a
                      href={site.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[var(--accent)]"
                    >
                      <GitHubIcon />
                      <span>GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[var(--accent)]"
                    >
                      <LinkedInIcon />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.socials.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[var(--accent)]"
                    >
                      <WhatsAppIcon />
                      <span>WhatsApp</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      aria-label="Send an email"
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[var(--accent)]"
                    >
                      <MailIcon />
                      <span>Email</span>
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
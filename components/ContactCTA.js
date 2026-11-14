"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1];

function MailIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.75-.85-2-.95-.27-.1-.46-.15-.66.15-.2.3-.75.95-.92 1.15-.17.2-.34.22-.62.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.45.13-.6.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.48.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.72 2-1.41.24-.7.24-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.78-1.3l-.34-.2-3.56.93.95-3.47-.22-.36a9.36 9.36 0 0 1-1.44-5A9.42 9.42 0 0 1 18.7 5.42a9.36 9.36 0 0 1 2.76 6.67 9.42 9.42 0 0 1-9.4 9.41zM20.5 3.49A11.4 11.4 0 0 0 12.05.15C5.75.15.63 5.27.63 11.56c0 2.01.52 3.98 1.52 5.71L.5 23.5l6.39-1.67a11.4 11.4 0 0 0 5.15 1.31h.01c6.3 0 11.42-5.12 11.42-11.41 0-3.05-1.19-5.91-3.35-8.07z" />
    </svg>
  );
}

export default function ContactCTA() {
  const reduce = useReducedMotion() ?? false;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    "Project enquiry via assan.tech"
  )}`;

  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="relative w-full overflow-hidden bg-[var(--navy)] py-24 text-[var(--paper)] md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 44px)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 select-none font-display text-[28vw] leading-none text-white/[0.05]"
      >
        HELLO
      </span>

      <div className="container-x relative z-10 flex flex-col gap-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6 md:max-w-4xl"
        >
          <motion.div variants={item} className="flex items-center gap-3">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--accent)] uppercase">
              Contact
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-white/25" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
              Let us talk
            </span>
          </motion.div>

          <motion.h2
            id="contact-cta-heading"
            variants={item}
            className="font-display text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[0.98] tracking-tight"
          >
            Have something
            <br />
            worth building?
          </motion.h2>

          <motion.p
            variants={item}
            className="max-w-xl text-sm leading-relaxed text-white/65 md:text-base"
          >
            Websites, web apps, video edits, or a full system for your business.
            Pick whichever way of reaching me suits you best.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:max-w-2xl md:gap-4"
        >
          <motion.div variants={item}>
            <a
              href={mailtoHref}
              className="group flex items-start gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-[var(--accent)] hover:bg-white/[0.08] md:p-6"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-[var(--paper)] transition-colors duration-300 group-hover:bg-[var(--accent)]">
                <MailIcon />
              </span>
              <span className="flex flex-1 flex-col gap-1">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
                  Email
                </span>
                <span className="font-display text-base font-medium tracking-tight md:text-lg">
                  Send me a message
                </span>
                <span className="text-[11px] text-white/45">
                  Opens your email app
                </span>
              </span>
            </a>
          </motion.div>

          <motion.div variants={item}>
            <a
              href={site.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-[var(--accent)] hover:bg-white/[0.08] md:p-6"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-[var(--paper)] transition-colors duration-300 group-hover:bg-[var(--accent)]">
                <WhatsAppIcon />
              </span>
              <span className="flex flex-1 flex-col gap-1">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
                  WhatsApp
                </span>
                <span className="font-display text-base font-medium tracking-tight md:text-lg">
                  Message me directly
                </span>
                <span className="text-[11px] text-white/45">
                  Opens WhatsApp
                </span>
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
import Link from "next/link";
import { site } from "@/data/site";

export const metadata = {
  title: "CV",
  description: "Curriculum vitae for Assan Faal.",
};

function MailIcon({ className = "h-4 w-4" }) {
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

function LinkedInIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GitHubIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.25.8-.55v-2c-3.2.7-3.9-1.4-3.9-1.4-.55-1.35-1.3-1.7-1.3-1.7-1.05-.7.1-.7.1-.7 1.15.1 1.75 1.2 1.75 1.2 1.05 1.75 2.75 1.25 3.4.95.1-.75.4-1.25.75-1.55-2.55-.3-5.25-1.3-5.25-5.7 0-1.25.45-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.75.8 1.2 1.85 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.35.8 1.05.8 2.1v3.1c0 .3.2.65.8.55C20.2 21.4 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.75-.85-2-.95-.27-.1-.46-.15-.66.15-.2.3-.75.95-.92 1.15-.17.2-.34.22-.62.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.45.13-.6.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.48.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.72 2-1.41.24-.7.24-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.78-1.3l-.34-.2-3.56.93.95-3.47-.22-.36a9.36 9.36 0 0 1-1.44-5A9.42 9.42 0 0 1 18.7 5.42a9.36 9.36 0 0 1 2.76 6.67 9.42 9.42 0 0 1-9.4 9.41zM20.5 3.49A11.4 11.4 0 0 0 12.05.15C5.75.15.63 5.27.63 11.56c0 2.01.52 3.98 1.52 5.71L.5 23.5l6.39-1.67a11.4 11.4 0 0 0 5.15 1.31h.01c6.3 0 11.42-5.12 11.42-11.41 0-3.05-1.19-5.91-3.35-8.07z" />
    </svg>
  );
}

export default function CVPage() {
  return (
    <div className="relative w-full bg-[var(--paper)]">
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-x flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="eyebrow">CV</span>
            <span aria-hidden="true" className="h-px w-10 bg-[var(--line)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase">
              Curriculum vitae
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-[clamp(2.6rem,8vw,6rem)] font-semibold leading-[0.95] tracking-tight text-[var(--navy)]">
            {site.name}.
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/cv/assan-faal-cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-xs font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-[var(--warm)] md:px-6 md:py-3.5 md:text-sm"
            >
              Download CV
              <span aria-hidden="true">&darr;</span>
            </a>
            <a
              href="/cv/assan-faal-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-semibold tracking-wide text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-white md:px-6 md:py-3.5 md:text-sm"
            >
              Open in new tab
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--navy)] uppercase transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <MailIcon />
              Email
            </a>
            <a
              href={site.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--navy)] uppercase transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--navy)] uppercase transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--navy)] uppercase transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>

          <Link
            href="/projects"
            className="mt-2 inline-flex w-fit items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--accent)] uppercase transition-opacity duration-300 hover:opacity-70"
          >
            View projects
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { site } from "@/data/site";

function getLatestArticles(limit) {
  try {
    const dir = path.join(process.cwd(), "content", "articles");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
    const articles = files.map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: typeof data.title === "string" ? data.title : slug,
        date: typeof data.date === "string" ? data.date : "",
      };
    });
    return articles
      .sort((a, b) => {
        if (a.date === b.date) return 0;
        return a.date < b.date ? 1 : -1;
      })
      .slice(0, limit);
  } catch (error) {
    return [];
  }
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function GitHubIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.25.8-.55v-2c-3.2.7-3.9-1.4-3.9-1.4-.55-1.35-1.3-1.7-1.3-1.7-1.05-.7.1-.7.1-.7 1.15.1 1.75 1.2 1.75 1.2 1.05 1.75 2.75 1.25 3.4.95.1-.75.4-1.25.75-1.55-2.55-.3-5.25-1.3-5.25-5.7 0-1.25.45-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.75.8 1.2 1.85 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.35.8 1.05.8 2.1v3.1c0 .3.2.65.8.55C20.2 21.4 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5z" />
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

function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.75-.85-2-.95-.27-.1-.46-.15-.66.15-.2.3-.75.95-.92 1.15-.17.2-.34.22-.62.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.45.13-.6.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.48.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.72 2-1.41.24-.7.24-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.78-1.3l-.34-.2-3.56.93.95-3.47-.22-.36a9.36 9.36 0 0 1-1.44-5A9.42 9.42 0 0 1 18.7 5.42a9.36 9.36 0 0 1 2.76 6.67 9.42 9.42 0 0 1-9.4 9.41zM20.5 3.49A11.4 11.4 0 0 0 12.05.15C5.75.15.63 5.27.63 11.56c0 2.01.52 3.98 1.52 5.71L.5 23.5l6.39-1.67a11.4 11.4 0 0 0 5.15 1.31h.01c6.3 0 11.42-5.12 11.42-11.41 0-3.05-1.19-5.91-3.35-8.07z" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
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

export default function Footer() {
  const year = new Date().getFullYear();
  const articles = getLatestArticles(10);

  return (
    <footer className="relative overflow-hidden bg-[var(--navy)] text-[var(--paper)]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes footer-rise {
  from { opacity: 0; transform: translate3d(0, 24px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes footer-rise-big {
  from { opacity: 0; transform: translate3d(0, 40px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@supports (animation-timeline: view()) {
  .footer-reveal-1 {
    animation: footer-rise both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }
  .footer-reveal-2 {
    animation: footer-rise both;
    animation-timeline: view();
    animation-range: entry 5% entry 35%;
  }
  .footer-reveal-3 {
    animation: footer-rise both;
    animation-timeline: view();
    animation-range: entry 10% entry 40%;
  }
  .footer-reveal-big {
    animation: footer-rise-big both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .footer-reveal-1,
  .footer-reveal-2,
  .footer-reveal-3,
  .footer-reveal-big {
    animation: none !important;
  }
}
          `,
        }}
      />

      <div className="container-x flex flex-col gap-12 py-16 md:gap-16 md:py-24">
        <div className="footer-reveal-1 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
              Pages
            </span>
            <ul className="flex flex-col gap-2">
              {site.nav.map((navItem) => (
                <li key={navItem.href}>
                  <Link
                    href={navItem.href}
                    className="group inline-flex items-center gap-2 font-display text-lg font-medium tracking-tight text-white/85 transition-colors duration-300 hover:text-[var(--accent)]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-4"
                    />
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
              Elsewhere
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={site.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  <WhatsAppIcon />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  <MailIcon />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {articles.length > 0 && (
          <div className="footer-reveal-2 flex flex-col gap-4 border-t border-white/15 pt-10">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
              Latest writing
            </span>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group flex items-baseline justify-between gap-3 border-b border-white/10 py-2 transition-colors duration-300 hover:border-[var(--accent)]"
                  >
                    <span className="font-display text-sm font-medium leading-snug text-white/85 transition-colors duration-300 group-hover:text-[var(--accent)] md:text-base">
                      {article.title}
                    </span>
                    <span className="flex-shrink-0 text-[10px] tracking-[0.2em] whitespace-nowrap text-white/40 uppercase">
                      {formatDate(article.date)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <span
          aria-hidden="true"
          className="footer-reveal-big block select-none font-display text-[clamp(3rem,15vw,12rem)] leading-[0.85] font-semibold tracking-tighter text-white/[0.08]"
        >
          ASSAN FAAL
        </span>

        <div className="footer-reveal-3 border-t border-white/15 pt-6 text-[11px] tracking-wide text-white/45">
          <span>
            &copy; {year} {site.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
import Link from "next/link";
import { getAllArticles, formatArticleDate } from "@/lib/articles";

export const metadata = {
  title: "Articles",
  description: "Notes on tech, learning and life by Assan Faal.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="relative w-full bg-[var(--paper)]">
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-x flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Writing</span>
            <span aria-hidden="true" className="h-px w-10 bg-[var(--line)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase">
              Articles
            </span>
          </div>
          <h1 className="max-w-4xl font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-tight text-[var(--navy)]">
            Notes on tech,
            <br />
            learning and life.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--charcoal)] md:text-base">
            Short pieces about what I am building, what I am learning and what
            it is actually like to do this as a junior.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-16 md:py-24">
        <div className="container-x">
          {articles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--line)] bg-white p-10 text-center md:p-16">
              <p className="font-display text-lg font-medium tracking-tight text-[var(--navy)] md:text-xl">
                First article is on the way.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Check back soon.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-[var(--line)]">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group grid grid-cols-1 gap-3 py-8 transition-colors duration-300 md:grid-cols-[180px_1fr] md:gap-8 md:py-10"
                  >
                    <div className="flex flex-col gap-2 md:pt-1">
                      <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                        {formatArticleDate(article.date)}
                      </span>
                      {article.tags.length > 0 && (
                        <ul className="flex flex-wrap gap-1.5">
                          {article.tags.slice(0, 3).map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-[var(--line)] bg-white px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.18em] text-[var(--navy)] uppercase"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <h2 className="font-display text-2xl font-semibold leading-[1.15] tracking-tight text-[var(--navy)] transition-colors duration-300 group-hover:text-[var(--accent)] md:text-3xl">
                        {article.title}
                      </h2>
                      {article.summary ? (
                        <p className="max-w-2xl text-sm leading-relaxed text-[var(--charcoal)] md:text-base">
                          {article.summary}
                        </p>
                      ) : null}
                      <span className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
                        Read
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
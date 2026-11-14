import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

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
        summary: typeof data.summary === "string" ? data.summary : "",
        date: typeof data.date === "string" ? data.date : "",
        tags: Array.isArray(data.tags) ? data.tags : [],
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

export default function LatestArticles() {
  const articles = getLatestArticles(3);

  return (
    <section
      aria-labelledby="latest-articles-heading"
      className="relative w-full bg-[var(--paper)] py-20 md:py-28"
    >
      <div className="container-x flex flex-col gap-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="eyebrow">Writing</span>
              <span aria-hidden="true" className="h-px w-10 bg-[var(--line)]" />
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase">
                Latest articles
              </span>
            </div>
            <h2
              id="latest-articles-heading"
              className="max-w-2xl font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-semibold leading-[1.05] tracking-tight text-[var(--navy)]"
            >
              Notes on tech, learning and life.
            </h2>
          </div>
          <Link
            href="/articles"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-[var(--accent)] px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--accent)] uppercase transition-colors duration-300 hover:bg-[var(--accent)] hover:text-white"
          >
            All articles
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--line)] bg-white p-8 text-center md:p-12">
            <p className="font-display text-lg font-medium tracking-tight text-[var(--navy)] md:text-xl">
              First article is on the way.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Check back soon.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-3xl border border-[var(--line)] bg-white p-6 transition-colors duration-300 hover:border-[var(--navy)]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                      {formatDate(article.date)}
                    </span>
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.18em] text-[var(--navy)] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-xl font-semibold leading-[1.15] tracking-tight text-[var(--navy)] md:text-2xl">
                    {article.title}
                  </h3>

                  {article.summary ? (
                    <p className="text-sm leading-relaxed text-[var(--muted)]">
                      {article.summary}
                    </p>
                  ) : null}

                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
                    Read more
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
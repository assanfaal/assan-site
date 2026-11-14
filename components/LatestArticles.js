"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("https://admin.assan.tech/wp-json/wp/v2/posts?per_page=3&_embed");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        const formatted = data.map((post) => {
          const dateObj = new Date(post.date);
          const formattedDate = dateObj.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          
          return {
            slug: post.slug,
            title: post.title.rendered,
            summary: post.excerpt.rendered.replace(/<[^>]+>/g, "").trim(),
            date: formattedDate,
            tags: post._embedded && post._embedded["wp:term"] ? post._embedded["wp:term"][0].map(t => t.name) : [],
          };
        });
        
        setArticles(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchArticles();
  }, []);

  return (
    <section aria-labelledby="latest-articles-heading" className="relative w-full bg-[var(--paper)] py-20 md:py-28">
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
            <h2 id="latest-articles-heading" className="max-w-2xl font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-semibold leading-[1.05] tracking-tight text-[var(--navy)]">
              Notes on tech, learning and life.
            </h2>
          </div>
          <Link href="/articles" className="group inline-flex w-fit items-center gap-2 rounded-full border border-[var(--accent)] px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--accent)] uppercase transition-colors duration-300 hover:bg-[var(--accent)] hover:text-white">
            All articles
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-3xl bg-[var(--line)]/50"></div>
            ))}
          </div>
        ) : articles.length === 0 ? (
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
                <Link href={`/articles/${article.slug}`} className="group flex h-full flex-col gap-4 rounded-3xl border border-[var(--line)] bg-white p-6 transition-colors duration-300 hover:border-[var(--navy)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                      {article.date}
                    </span>
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.18em] text-[var(--navy)] uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-[1.15] tracking-tight text-[var(--navy)] md:text-2xl">
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {article.summary}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
                    Read more
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
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
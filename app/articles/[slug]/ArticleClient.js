"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ArticleClient() {
  const pathname = usePathname();
  const slug = pathname
    ? pathname.replace(/^\/articles\//, "").replace(/\/$/, "")
    : "";

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || slug === "fallback") {
      setLoading(false);
      return;
    }

    async function fetchPost() {
      try {
        const res = await fetch(
          `https://admin.assan.tech/wp-json/wp/v2/posts?slug=${slug}&_embed`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setPost(data[0]);
            document.title = data[0].title.rendered + " | Assan Faal";
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center py-32">
        <span className="eyebrow animate-pulse text-[var(--accent)]">
          Loading article...
        </span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-x flex flex-col items-start gap-4 py-32 md:py-40">
        <span className="eyebrow">Not found</span>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--navy)]">
          That article does not exist.
        </h1>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-semibold tracking-wide text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-white md:text-sm"
        >
          All articles
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    );
  }

  const tags =
    post._embedded && post._embedded["wp:term"]
      ? post._embedded["wp:term"][0].map((t) => t.name)
      : [];

  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="relative w-full bg-[var(--paper)]">
      <section className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="container-x flex flex-col gap-6">
          <Link
            href="/articles"
            className="inline-flex w-fit items-center gap-2 text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase transition-colors duration-300 hover:text-[var(--accent)]"
          >
            <span aria-hidden="true">&larr;</span>
            All articles
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
              {formattedDate}
            </span>
            {tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
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

          <h1
            className="max-w-4xl font-display text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-tight text-[var(--navy)]"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-12 md:py-16">
        <div className="container-x max-w-3xl">
          <div
            className="wp-content flex flex-col gap-5 text-[15px] leading-[1.75] text-[var(--charcoal)] md:text-base"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .wp-content h2 { margin-top: 2rem; font-family: var(--font-display); font-size: 1.8rem; font-weight: 600; color: var(--navy); }
        .wp-content h3 { margin-top: 1.5rem; font-family: var(--font-display); font-size: 1.4rem; font-weight: 600; color: var(--navy); }
        .wp-content p { margin-bottom: 1rem; }
        .wp-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .wp-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .wp-content li { margin-bottom: 0.5rem; }
        .wp-content a { color: var(--accent); text-decoration: underline; text-underline-offset: 4px; }
        .wp-content blockquote { border-left: 2px solid var(--accent); padding-left: 1rem; font-style: italic; color: var(--muted); margin: 1.5rem 0; }
        .wp-content img { border-radius: 1rem; margin: 1.5rem 0; width: 100%; height: auto; }
      `,
        }}
      />
    </article>
  );
}
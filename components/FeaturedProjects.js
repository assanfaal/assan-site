"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";

const EASE = [0.16, 1, 0.3, 1];

export default function FeaturedProjects() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="relative w-full bg-[var(--paper)] py-20 md:py-28"
    >
      <div className="container-x flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="eyebrow">Work</span>
            <span aria-hidden="true" className="h-px w-10 bg-[var(--line)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase">
              Selected projects
            </span>
          </div>
          <h2
            id="featured-projects-heading"
            className="max-w-3xl font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-semibold leading-[1.05] tracking-tight text-[var(--navy)]"
          >
            Things I have built, shipped, and keep building.
          </h2>
        </motion.div>
      </div>

      <div className="container-x mt-10 pb-[40vh] md:mt-16">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className={`relative mb-6 md:mb-8 md:sticky ${
              index === 0
                ? "md:top-24"
                : index === 1
                  ? "md:top-[112px]"
                  : "md:top-[128px]"
            }`}
          >
            <motion.article
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative grid grid-cols-1 overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[0_20px_60px_-30px_rgba(10,31,68,0.28)] md:grid-cols-[1.3fr_1fr]"
            >
              <div className="flex flex-col gap-6 p-6 sm:p-8 md:p-10 lg:p-14">
                <ul className="flex flex-wrap gap-2">
                  <li className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1 text-[9px] font-semibold tracking-[0.22em] text-[var(--navy)] uppercase">
                    {project.category}
                  </li>
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1 text-[9px] font-semibold tracking-[0.22em] text-[var(--muted)] uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <h3 className="font-display text-[clamp(1.6rem,4vw,2.8rem)] font-semibold leading-[1.05] tracking-tight text-[var(--navy)]">
                  {project.title}
                </h3>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-[11px] font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-[var(--warm)] md:px-5 md:py-2.5 md:text-xs"
                  >
                    Visit live
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                  <Link
                    href="/projects"
                    className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase transition-colors duration-300 hover:text-[var(--accent)]"
                  >
                    Details
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[180px] overflow-hidden border-t border-[var(--line)] bg-[var(--paper)] md:min-h-[260px] md:border-t-0 md:border-l">
                <img
                  src={project.cover}
                  alt={`${project.title} preview`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </motion.article>
          </div>
        ))}
      </div>

      <div className="container-x flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 rounded-full border border-[var(--accent)] px-5 py-3 text-sm font-semibold tracking-tight text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-white md:text-base"
        >
          See all projects
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
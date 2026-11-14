import { projects, reels } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description: "Selected projects by Assan Faal.",
};

export default function ProjectsPage() {
  return (
    <div className="relative w-full bg-[var(--paper)]">
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-x flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Work</span>
            <span aria-hidden="true" className="h-px w-10 bg-[var(--line)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase">
              Projects
            </span>
          </div>
          <h1 className="max-w-4xl font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-tight text-[var(--navy)]">
            Projects.
          </h1>
        </div>
      </section>

      {projects.map((project) => (
        <section
          key={project.slug}
          className="relative border-t border-[var(--line)] py-16 md:py-24"
        >
          <div className="container-x flex flex-col gap-10 md:gap-14">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[0_30px_80px_-40px_rgba(10,31,68,0.35)]">
                <div className="aspect-[16/10] w-full">
                  <img
                    src={project.cover}
                    alt={`${project.title} cover`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5">
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

                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-[var(--navy)]">
                  {project.title}
                </h2>

                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[10px] font-semibold tracking-wide text-[var(--navy)] md:text-[11px]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-xs font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-[var(--warm)] md:text-sm"
                  >
                    Visit live
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {project.images.length > 1 && (
              <div className="flex flex-col gap-4">
                <div
                  id={`gallery-${project.slug}`}
                  tabIndex={0}
                  role="region"
                  aria-label={`${project.title} screenshots`}
                  className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {project.images.map((image, index) => (
                    <div
                      key={image.src}
                      id={`${project.slug}-slide-${index + 1}`}
                      className="w-full flex-shrink-0 snap-center sm:w-[85%] md:w-[70%]"
                    >
                      <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-2">
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading={index === 0 ? "eager" : "lazy"}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  {project.images.map((_, index) => (
                    <a
                      key={index}
                      href={`#${project.slug}-slide-${index + 1}`}
                      aria-label={`Go to screenshot ${index + 1}`}
                      className="h-2 w-2 rounded-full bg-[var(--navy)]/20 transition-colors duration-200 hover:bg-[var(--accent)]"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {reels.length > 0 && (
        <section className="relative border-t border-[var(--line)] py-16 md:py-24">
          <div className="container-x flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="eyebrow">Video editing</span>
              <span aria-hidden="true" className="h-px w-10 bg-[var(--line)]" />
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] uppercase">
                Short forms
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-[clamp(1.8rem,4.5vw,3rem)] font-semibold leading-[1.05] tracking-tight text-[var(--navy)]">
              Selected edits.
            </h2>

            <div className="flex flex-wrap gap-4">
              {reels.map((reel) => (
                <div
                  key={reel.src}
                  className="w-[180px] flex-shrink-0 md:w-[220px]"
                >
                  <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
                    <video
                      src={reel.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="block aspect-[9/16] w-full object-cover"
                    />
                  </div>
                  <span className="mt-2 block text-center text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                    {reel.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
.hide-scrollbar { scrollbar-width: none; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
          `,
        }}
      />
    </div>
  );
}
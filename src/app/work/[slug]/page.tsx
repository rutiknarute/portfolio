import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Mail } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { SiteFooter } from "@/components/site-footer";
import { profile, projects } from "@/data/portfolio";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.9c-2.78.62-3.36-1.21-3.36-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.64-1.37-2.22-.26-4.55-1.13-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.37 9.37 0 0 1 12 6.94a9.4 9.4 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.56 5.05.36.32.68.94.68 1.89v2.81c0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  const title = `${project.name} — ${project.kicker} · Rutik Narute`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      url: `/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const { caseStudy } = project;
  const others = projects.filter((item) => item.slug !== project.slug);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <nav className="site-nav" aria-label="Primary navigation">
          <Link className="wordmark" href="/" aria-label="RN. Rutik Narute, home">
            RN<span>.</span>
          </Link>
          <div className="nav-links">
            <Link href="/#work">Work</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#about">About</Link>
          </div>
          <Link className="nav-cta" href="/#contact">
            Let&apos;s talk <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </header>

      <main id="main">
        <article className="case">
          <header className="case-hero section-shell">
            <Link className="case-back" href="/#work">
              <ArrowLeft size={15} aria-hidden="true" /> All projects
            </Link>

            <div className="case-hero__grid">
              <div className="case-hero__copy">
                <div className="case-hero__meta">
                  <span>{project.index} / {project.kicker}</span>
                  <span>{project.year}</span>
                </div>
                <h1>{project.name}</h1>
                <p className="case-hero__headline">{caseStudy.headline}</p>
                <p className="case-hero__summary">{project.summary}</p>

                <ul className="case-hero__stack" aria-label={`${project.name} technologies`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>

                <div className="case-hero__links">
                  {project.githubUrl ? (
                    <a className="button button--ghost" href={project.githubUrl} target="_blank" rel="noreferrer">
                      <GitHubIcon size={17} /> View the code
                    </a>
                  ) : null}
                  {project.liveUrl ? (
                    <a className="button button--primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                      Open the live app <ExternalLink size={17} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="case-hero__visual">
                <ProjectVisual type={project.visual} />
              </div>
            </div>
          </header>

          {caseStudy.metrics.length > 0 ? (
            <div className="case-metrics section-shell">
              <dl>
                {caseStudy.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.value}</dt>
                    <dd>{metric.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <section className="case-section section-shell" aria-labelledby="problem">
            <div className="case-section__head">
              <span className="section-index">01 / The problem</span>
              <h2 id="problem">What it solves.</h2>
            </div>
            <div className="case-section__body">
              <p className="case-lead">{caseStudy.problem.lead}</p>
              <ul className="case-problems">
                {caseStudy.problem.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </section>

          <section className="case-section section-shell" aria-labelledby="approach">
            <div className="case-section__head">
              <span className="section-index">02 / The approach</span>
              <h2 id="approach">How it works.</h2>
            </div>
            <div className="case-section__body">
              <ol className="case-steps">
                {caseStudy.approach.map((step, i) => (
                  <li key={step.title}>
                    <span className="case-steps__number">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="case-section section-shell" aria-labelledby="built-with">
            <div className="case-section__head">
              <span className="section-index">03 / The toolkit</span>
              <h2 id="built-with">Built with what.</h2>
            </div>
            <div className="case-section__body">
              <div className="case-stack">
                {caseStudy.stack.map((row) => (
                  <div className="case-stack__row" key={row.layer}>
                    <span className="case-stack__layer">{row.layer}</span>
                    <strong className="case-stack__choice">{row.choice}</strong>
                    <p className="case-stack__why">{row.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-section section-shell" aria-labelledby="edge">
            <div className="case-section__head">
              <span className="section-index">04 / The difference</span>
              <h2 id="edge">Why it&apos;s better.</h2>
            </div>
            <div className="case-section__body">
              <div className="case-edge">
                {caseStudy.edge.map((point) => (
                  <article key={point.title}>
                    <h3>{point.title}</h3>
                    <p>{point.body}</p>
                  </article>
                ))}
              </div>
              {caseStudy.note ? (
                <p className="case-note">
                  <span>Good to know</span>
                  {caseStudy.note}
                </p>
              ) : null}
            </div>
          </section>

          <section className="case-next section-shell" aria-labelledby="next">
            <div className="case-next__head">
              <span className="section-index">Next</span>
              <h2 id="next">Other projects.</h2>
            </div>
            <div className="case-next__grid">
              {others.map((item) => (
                <Link className="case-next__card" href={`/work/${item.slug}`} key={item.slug}>
                  <span>{item.index} / {item.kicker}</span>
                  <strong>{item.name}</strong>
                  <p>{item.summary}</p>
                  <em>Read case study <ArrowUpRight size={15} aria-hidden="true" /></em>
                </Link>
              ))}
            </div>
          </section>

          <section className="case-cta section-shell">
            <h2>Want the long version?</h2>
            <p>Happy to walk through the trade-offs, the parts that broke, and what I&apos;d build next.</p>
            <div className="case-cta__links">
              <a className="button button--primary" href={`mailto:${profile.email}`}>
                <Mail size={17} aria-hidden="true" /> Email me
              </a>
              <Link className="button button--ghost" href="/#contact">
                Contact form <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter topHref="#main" />
    </>
  );
}

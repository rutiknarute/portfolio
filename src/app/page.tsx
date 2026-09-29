import {
  ArrowUpRight,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ProjectVisual } from "@/components/project-visual";
import { SiteFooter } from "@/components/site-footer";
import { RepulsionTitle } from "@/components/repulsion-title";
import { education, experience, profile, projects, skillGroups } from "@/data/portfolio";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.9c-2.78.62-3.36-1.21-3.36-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.64-1.37-2.22-.26-4.55-1.13-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.37 9.37 0 0 1 12 6.94a9.4 9.4 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.56 5.05.36.32.68.94.68 1.89v2.81c0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <nav className="site-nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="RN. Rutik Narute, home">
            RN<span>.</span>
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
          </div>
          <div className="nav-actions">
            <a className="nav-ghost" href="/rutik-narute-resume.pdf" download>
              Resume
            </a>
            <a className="nav-cta" href="#contact">
              Let&apos;s talk <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="hero section-shell">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-copy">I build useful software for real problems.</span>
            </div>
            <RepulsionTitle />
            <div className="hero-bottom">
              <p>
                I&apos;m <strong>Rutik</strong> — an AI software engineer who likes taking messy,
                real-world problems and making them easier to use. My family&apos;s pharmacy business
                is where my interest in healthcare started.
              </p>
              <div className="hero-actions">
                <div className="contact-links contact-links--hero">
                  <a href={`mailto:${profile.email}`} aria-label="Email" title="Email">
                    <Mail size={18} aria-hidden="true" />
                  </a>
                  <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                    <GitHubIcon />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                    <LinkedInIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <address className="contact-strip" aria-label="Contact details">
          <div className="contact-strip__inner section-shell">
            <div className="contact-strip__item">
              <span className="contact-strip__icon"><MapPin size={19} aria-hidden="true" /></span>
              <span><small>Location</small><strong>{profile.location}</strong></span>
            </div>
            <a className="contact-strip__item" href={`mailto:${profile.email}`}>
              <span className="contact-strip__icon"><Mail size={19} aria-hidden="true" /></span>
              <span><small>Email</small><strong>{profile.email}</strong></span>
            </a>
            <a className="contact-strip__item" href={profile.phoneHref}>
              <span className="contact-strip__icon"><Phone size={19} aria-hidden="true" /></span>
              <span><small>Phone</small><strong>{profile.phone}</strong></span>
            </a>
          </div>
        </address>

        <section id="work" className="work-section section-shell section-space">
          <div className="section-heading section-heading--compact reveal">
            <div>
              <h2><span className="section-number">01.</span>Selected work.</h2>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article
                className="project-card reveal"
                key={project.name}
              >
                <div className="project-card__visual">
                  <ProjectVisual type={project.visual} />
                </div>
                <div className="project-card__body">
                  <div className="project-card__meta">
                    <span>{project.index} / {project.kicker}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <p className="project-card__outcome">{project.outcome}</p>
                  <ul aria-label={`${project.name} technologies`}>
                    {project.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="project-card__links" aria-label={`${project.name} links`}>
                    <Link
                      className="project-card__case"
                      href={`/work/${project.slug}`}
                      aria-label={`Read the ${project.name} case study`}
                    >
                      Case study <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                    {project.githubUrl ? (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        <GitHubIcon size={17} /> GitHub
                      </a>
                    ) : (
                      <span className="is-disabled" aria-label={`${project.name} GitHub link coming soon`}>
                        <GitHubIcon size={17} /> GitHub
                      </span>
                    )}
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        <ExternalLink size={17} aria-hidden="true" /> Live
                      </a>
                    ) : (
                      <span className="is-disabled" aria-label={`${project.name} live link coming soon`}>
                        <ExternalLink size={17} aria-hidden="true" /> Live
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="experience-section section-space">
          <div className="section-shell">
            <div className="section-heading section-heading--compact reveal">
              <div>
                <h2><span className="section-number">02.</span>Where I&apos;ve been building.</h2>
              </div>
            </div>
            <ol className="experience-list">
              {experience.map((item, index) => (
                <li className="experience-row reveal" key={item.company}>
                  <span className="experience-marker" aria-hidden="true">
                    <span className="experience-dot" />
                    <span className="experience-number">0{index + 1}</span>
                  </span>
                  <div className="experience-meta">
                    <span className="experience-period">{item.period}</span>
                    <span className="experience-location">
                      <MapPin size={13} aria-hidden="true" /> {item.location}
                    </span>
                  </div>
                  <div className="experience-detail">
                    <h3>{item.role}</h3>
                    <p className="experience-company">{item.company}</p>
                    <p>{item.summary}</p>
                    {item.bullets && <ul className="experience-highlights">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                    <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className="about-section section-shell section-space">
          <div className="section-heading section-heading--compact reveal">
            <div>
              <h2><span className="section-number">03.</span>A little context.</h2>
            </div>
          </div>

          <div className="about-story reveal">
            <p className="about-story__lead">I am Rutik Narute.</p>
            <p>
              I grew up in Baramati, Pune. Coming to the United States for my Master&apos;s at Cal
              State LA was a big step, especially without much network or guidance here. Most of
              what I&apos;ve learned so far came from figuring things out on my own, sometimes the
              hard way.
            </p>
            <p>
              I just like building things that work and make sense. so instead of chasing ATS
              scores I started building real things for real problems (orin, compliance platform
              for Digital Product Passport — EU fashion brands). Because I believe{" "}
              <strong>attention is earned not requested.</strong>
            </p>
            <p>
              I want to be in SF and I believe opportunities happen when the right people meet the
              right energy at the right time.....and I am not there yet but I am working every
              single day to get there.
            </p>
            <p>
              If you are hiring, building something interesting or just know someone I should be
              talking to. You already know what to do. Right now, I&apos;m looking for
              opportunities where I can grow and work on real problems. I&apos;m on an F-1 student
              visa and my OPT already started in July.
            </p>
            <p className="about-story__close">
              I am still building.
              <br />
              Would love to talk.
            </p>
            <p className="about-story__reach">
              Reach me at <a href={profile.phoneHref}>{profile.phone}</a> or{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>
          </div>

          <div className="skills-grid reveal">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>

          <div className="education-grid reveal">
            <div className="education-lead">
              <span>Education</span>
              <p>Computer science foundations, deep AI focus, and constant building.</p>
            </div>
            {education.map((item) => (
              <article key={item.degree}>
                <span>{item.period}</span>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section section-space">
          <div className="section-shell contact-shell">
            <div className="contact-copy reveal">
              <h2><span className="section-number">04.</span>Let&apos;s make something useful.</h2>
              <p>If the problem is a little messy, I&apos;m probably interested.</p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`} aria-label="Email" title="Email">
                  <Mail size={18} aria-hidden="true" />
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                  <GitHubIcon />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
            <div className="reveal"><ContactForm /></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

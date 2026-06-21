import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import '../styles/Home.css';
import {
  experienceData,
  projectsData,
  aboutData,
  photosByYear,
  photosYearOrder,
  featuredCarouselProjects,
  carouselProjectTitles,
} from '../data/content';
import { ProjectCarousel } from '@/components/ui/project-carousel';

function IconGithub({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconMail({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const TABS = [
  { id: 'about', label: 'about' },
  { id: 'gallery', label: 'gallery' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'resume', label: 'resume' },
];

const RESUME_URL = '/resume.pdf';

const tabContentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
};

/** Renders `a · b · c` with breaks only between phrases so separators are not orphaned. */
function AboutDotLine({ text }) {
  const parts = text.split(' · ').map((p) => p.trim()).filter(Boolean);
  return (
    <p className="about-dot-line">
      {parts.map((part, i) => (
        <Fragment key={`${i}-${part}`}>
          {i > 0 && <span className="about-dot-line__sep"> · </span>}
          <span className="about-dot-line__chunk">{part}</span>
        </Fragment>
      ))}
    </p>
  );
}

function AboutPanel() {
  const current = experienceData[0];

  return (
    <div className="tab-panel tab-panel--about">
      <div className="about-islands">
        <header className="about-block about-block--intro">
          <h1 className="about-hero-title">{aboutData.name}</h1>
          <div className="about-prose">
            <p>{aboutData.aboutTagline}</p>
            <p>{aboutData.aboutBio}</p>
          </div>
          <p className="about-open-to">{aboutData.aboutOpenTo}</p>
          <p className="about-current-role">
            <span className="about-current-role__label">Currently</span>
            {' — '}
            {current.role} at {current.company}
          </p>
        </header>

        <section className="about-block about-block--card about-block--highlights">
          <h2 className="about-subheading">some stuff i did:</h2>
          <ul className="about-highlights">
            {aboutData.aboutHighlights.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>

        <div className="about-islands__pair">
          <section className="about-block about-block--card">
            <h2 className="about-subheading">{aboutData.tryNextLabel}</h2>
            <div className="about-prose about-prose--snippet">
              <AboutDotLine text={aboutData.tryNext} />
            </div>
          </section>
          <section className="about-block about-block--card">
            <h2 className="about-subheading">{aboutData.intoLabel}</h2>
            <div className="about-prose about-prose--snippet">
              <AboutDotLine text={aboutData.into} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ExperiencePanel() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExperience = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="tab-panel tab-panel--list">
      <div className="experience-timeline experience-timeline--tab">
        {experienceData.map((exp) => {
          const isExpanded = expandedId === exp.id;
          const panelId = `exp-panel-${exp.id}`;

          return (
            <article
              key={exp.id}
              className={`experience-card experience-card--tab${isExpanded ? ' is-expanded' : ''}`}
            >
              <button
                type="button"
                className="exp-trigger"
                onClick={() => toggleExperience(exp.id)}
                aria-expanded={isExpanded}
                aria-controls={panelId}
              >
                <div className="exp-header">
                  <div className="exp-header__main">
                    <h3 className="exp-role">{exp.role}</h3>
                    <h4 className="exp-company">{exp.company}</h4>
                  </div>
                  <div className="exp-meta">
                    <div className="exp-period">{exp.period}</div>
                    <div className="exp-location">{exp.location}</div>
                  </div>
                  <ChevronDown
                    className="exp-chevron"
                    size={18}
                    aria-hidden
                  />
                </div>
              </button>
              <motion.div
                id={panelId}
                initial={false}
                animate={{
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
                aria-hidden={!isExpanded}
              >
                <div className="exp-body">
                  <p className="exp-description">{exp.description}</p>
                  <ul className="exp-achievements">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="exp-tech">
                    {exp.tech.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ProjectsPanel() {
  const gridProjects = projectsData.filter(
    (project) => !carouselProjectTitles.includes(project.title),
  );

  return (
    <div className="tab-panel tab-panel--list">
      <section className="projects-carousel-section">
        <ProjectCarousel projects={featuredCarouselProjects} />
      </section>
      <div className="projects-grid-home projects-grid-home--tab">
        {gridProjects.map((project) => (
          <div key={project.id} className="project-card-home project-card-home--tab">
            <div className="project-header" style={{ borderLeftColor: project.color }}>
              <h3>{project.title}</h3>
            </div>
            <p>{project.description}</p>
            {project.highlights && (
              <ul className="project-highlights">
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            )}
            <div className="project-tech">
              {project.tech.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                className="project-link-home"
                {...(project.link !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                View project →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryPanel() {
  const [selectedYear, setSelectedYear] = useState(photosYearOrder[0]);

  const photos = photosByYear[selectedYear] ?? [];

  return (
    <div className="tab-panel tab-panel--list tab-panel--gallery">
      <h2 className="gallery-heading">gallery</h2>
      <div className="gallery-year-toggle" role="tablist" aria-label="Gallery year">
        {photosYearOrder.map((year) => (
          <button
            key={year}
            type="button"
            role="tab"
            aria-selected={selectedYear === year}
            className={`gallery-year-pill${selectedYear === year ? ' is-active' : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedYear}
          className="gallery-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {photos.length === 0 ? (
            <p className="gallery-empty">no photos for {selectedYear} yet.</p>
          ) : (
            photos.map((photo, i) => (
              <figure key={photo.id ?? i} className="gallery-item">
                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.caption ?? ''}
                    className="gallery-item__img"
                    loading="lazy"
                  />
                ) : (
                  <div className="gallery-item__placeholder" aria-hidden />
                )}
                {photo.caption && (
                  <figcaption className="gallery-item__caption">{photo.caption}</figcaption>
                )}
              </figure>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ResumePanel() {
  return (
    <div className="tab-panel tab-panel--list tab-panel--resume">
      <div className="resume-card about-block about-block--card">
        <div className="resume-toolbar">
          <a
            href={RESUME_URL}
            className="resume-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download ↓
          </a>
        </div>
        <div className="resume-embed-wrap">
          <iframe
            src={`${RESUME_URL}#view=FitH`}
            title="Maxwell Peng Resume"
            className="resume-embed"
          />
        </div>
        <div className="resume-mobile-fallback">
          <a
            href={RESUME_URL}
            className="resume-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume →
          </a>
        </div>
      </div>
    </div>
  );
}

function Home({ setShowAudio }) {
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    if (setShowAudio) setShowAudio(false);
  }, [setShowAudio]);

  return (
    <motion.div
      className="portfolio-container portfolio-container--tabs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <header className="portfolio-top-bar">
        <div className="portfolio-top-bar__inner">
          <span className="portfolio-wordmark" aria-hidden>
            Maxwell Peng
          </span>
          <div className="portfolio-social">
            <a
              href={aboutData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-social__link"
              aria-label="GitHub"
            >
              <IconGithub size={18} />
            </a>
            <a
              href={aboutData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-social__link"
              aria-label="LinkedIn"
            >
              <IconLinkedIn size={18} />
            </a>
            <a href={`mailto:${aboutData.email}`} className="portfolio-social__link" aria-label="Email">
              <IconMail size={18} />
            </a>
          </div>
        </div>
      </header>

      <main className="portfolio-main">
        <AnimatePresence mode="wait">
          {activeTab === 'about' && (
            <motion.div
              key="about"
              className="portfolio-tab-surface"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AboutPanel />
            </motion.div>
          )}
          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              className="portfolio-tab-surface"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <GalleryPanel />
            </motion.div>
          )}
          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              className="portfolio-tab-surface"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ExperiencePanel />
            </motion.div>
          )}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              className="portfolio-tab-surface"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProjectsPanel />
            </motion.div>
          )}
          {activeTab === 'resume' && (
            <motion.div
              key="resume"
              className="portfolio-tab-surface"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ResumePanel />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <nav className="portfolio-bottom-nav" aria-label="Primary">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`portfolio-bottom-nav__tab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}

export default Home;

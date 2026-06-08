import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import '../styles/Home.css';
import { experienceData, projectsData, educationData, aboutData } from '../data/content';

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
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact' },
];

const tabContentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
};

function AboutPanel() {
  const current = experienceData[0];
  const highlights = [
    `Engineering at Autumn — provider onboarding and pre-fill for grief counselors (Next.js, Prisma, Inngest).`,
    `Projects Director at Western Founders Network — workshops, hackathons, and Demo Day for 700+ members.`,
    `Interview Royale — real-time multiplayer interview practice with WebSockets and OpenAI evaluation.`,
    `Team Canada Junior National Team (badminton), PanAm competitor and #2 U17 in Canada.`,
  ];

  return (
    <div className="tab-panel tab-panel--about">
      <h1 className="about-hero-title">Maxwell Peng</h1>
      <div className="about-prose">
        <p>
          {educationData.graduation} from {educationData.school}, working toward a {educationData.degree.toLowerCase()}.
        </p>
        <p>
          I care about full-stack product work, startups, and building things people actually use — from polished onboarding flows to real-time systems.
        </p>
      </div>
      <h2 className="about-subheading">Some stuff I did:</h2>
      <ul className="about-highlights">
        {highlights.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
      <p className="about-current-role">
        <span className="about-current-role__label">Currently</span>
        {' — '}
        {current.role} at {current.company}
      </p>
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div className="tab-panel tab-panel--list">
      <div className="experience-timeline experience-timeline--tab">
        {experienceData.map((exp) => (
          <div key={exp.id} className="experience-card experience-card--tab">
            <div className="exp-header">
              <div>
                <h3 className="exp-role">{exp.role}</h3>
                <h4 className="exp-company">{exp.company}</h4>
              </div>
              <div className="exp-meta">
                <div className="exp-period">{exp.period}</div>
                <div className="exp-location">{exp.location}</div>
              </div>
            </div>
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
        ))}
      </div>
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div className="tab-panel tab-panel--list">
      <div className="projects-grid-home projects-grid-home--tab">
        {projectsData.map((project) => (
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
            {project.link && project.link !== '#' && (
              <a href={project.link} className="project-link-home" target="_blank" rel="noopener noreferrer">
                View project →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="tab-panel tab-panel--contact">
      <p className="contact-lead">
        Open to internships, collaborations, and good conversations about product, startups, or chess openings.
      </p>
      <div className="contact-actions">
        <a href={`mailto:${aboutData.email}`} className="contact-row">
          <IconMail size={20} />
          <span>{aboutData.email}</span>
        </a>
        <a href={aboutData.github} className="contact-row" target="_blank" rel="noopener noreferrer">
          <IconGithub size={20} />
          <span>GitHub</span>
        </a>
        <a href={aboutData.linkedin} className="contact-row" target="_blank" rel="noopener noreferrer">
          <IconLinkedIn size={20} />
          <span>LinkedIn</span>
        </a>
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
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              className="portfolio-tab-surface"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ContactPanel />
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

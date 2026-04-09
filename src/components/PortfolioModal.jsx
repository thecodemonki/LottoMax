import { motion } from 'framer-motion';
import { projectsData, aboutData, experienceData } from '../data/content';

export default function PortfolioModal({ onClose, type }) {
  // Determine title and content based on type
  
  let content = null;
  let title = "Modal";
  let themeColor = "var(--accent-gold)";

  if (type === 'projects') {
    title = "My Projects";
    themeColor = "#d4af37";
    content = (
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            style={{ borderColor: project.color, color: project.color }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {project.link !== '#' && (
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  View Project →
                </a>
              )}
              {project.githubRepo && (
                <a href={project.githubRepo} className="project-link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  GitHub →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  } else if (type === 'about') {
    title = "About Me";
    themeColor = "#4a90e2";
    content = (
      <motion.div className="about-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <h3>{aboutData.title}</h3>
        <p className="about-desc">{aboutData.description}</p>
        <div className="about-stats-modal">
          <p><strong>Location:</strong> {aboutData.location}</p>
          <p><strong>Education:</strong> Western University, Bachelor of Arts in Computer Science</p>
          <p><strong>Interests:</strong> National Junior Badminton (Team Canada), Chess (1936 ELO), Trading.</p>
        </div>
      </motion.div>
    );
  } else if (type === 'contact') {
    title = "Contact Information";
    themeColor = "#e67e22";
    content = (
      <motion.div className="contact-content-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <p>Let's build something amazing together!</p>
        <div className="contact-links-grid">
          <a href={`mailto:${aboutData.email}`} className="contact-btn-modal">📧 {aboutData.email}</a>
          <a href={aboutData.github} className="contact-btn-modal" target="_blank" rel="noopener noreferrer">💻 GitHub</a>
          <a href={aboutData.linkedin} className="contact-btn-modal" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
          <a href={`tel:${aboutData.phone}`} className="contact-btn-modal">📱 {aboutData.phone}</a>
        </div>
      </motion.div>
    );
  } else if (type === 'experience') {
    title = "Experience";
    themeColor = "#2ecc71";
    content = (
      <div className="experience-list">
        {experienceData.map((exp, index) => (
          <motion.div 
            key={exp.id} 
            className="experience-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <h4>{exp.role} @ {exp.company}</h4>
            <span className="exp-dates">{exp.period} | {exp.location}</span>
            <p>{exp.description}</p>
            <ul>
              {exp.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal unified-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        style={{ borderColor: themeColor }}
      >
        <button className="modal-close" onClick={onClose} style={{ color: themeColor }}>✕</button>
        
        <motion.h2 
          className="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ color: themeColor, borderBottomColor: themeColor }}
        >
          {title}
        </motion.h2>
        
        <div className="modal-body">
          {content}
        </div>
      </motion.div>
    </div>
  );
}

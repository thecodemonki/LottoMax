import { motion } from 'framer-motion';
import { projectsData } from '../data/content';

export default function ProjectsModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal modal-projects"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
      >
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <motion.h2 
          className="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ color: 'var(--accent-gold)' }}
        >
          My Projects
        </motion.h2>
        
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              style={{ borderColor: project.color, color: project.color }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="tech-stack">
                {project.tech.map(tech => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <a 
                  href={project.link} 
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project →
                </a>
                {project.githubRepo && (
                  <a 
                    href={project.githubRepo} 
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
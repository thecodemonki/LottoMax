import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import { aboutData, projectsData } from '../data/content';

function Home() {
  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">Your Name</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <Link to="/mansion" className="nav-mansion">🏛️ Enter Mansion</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Your Name</span>
          </h1>
          <p className="hero-subtitle">
            Full Stack Developer & Creative Problem Solver
          </p>
          <p className="hero-description">
            I build elegant web experiences and solve complex problems through code.
            When I'm not coding, you'll find me swimming, playing badminton, or analyzing markets.
          </p>
          
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <Link to="/mansion" className="btn btn-secondary">
              🏛️ Explore My Mansion
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a passionate developer who loves building interactive experiences.
                My journey in tech started with a curiosity for how things work, 
                and evolved into a career creating elegant solutions to complex problems.
              </p>
              <p>
                Beyond coding, I'm an active person who believes in maintaining a balanced lifestyle.
                Swimming keeps me disciplined, badminton sharpens my reflexes, 
                chess trains my strategic thinking, cooking feeds my creativity, 
                and trading teaches me patience.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Km Swam Annually</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">1850</div>
                <div className="stat-label">Chess ELO Rating</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects Built</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="section section-alt" id="skills">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid-home">
            {['React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL', 
              'AWS', 'Docker', 'Git', 'UI/UX Design', 'TensorFlow', 'Next.js'].map((skill, index) => (
              <motion.div
                key={skill}
                className="skill-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid-home">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card-home"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-header" style={{ borderLeftColor: project.color }}>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link-home" target="_blank" rel="noopener noreferrer">
                  View Project →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section section-alt" id="contact">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <p className="contact-text">
              I'm always open to new opportunities and collaborations.
              Whether you have a project in mind or just want to chat, feel free to reach out!
            </p>
            <div className="contact-links">
              <a href="mailto:your.email@example.com" className="contact-btn">
                📧 Email Me
              </a>
              <a href="https://github.com/yourusername" className="contact-btn" target="_blank" rel="noopener noreferrer">
                💻 GitHub
              </a>
              <a href="https://linkedin.com/in/yourname" className="contact-btn" target="_blank" rel="noopener noreferrer">
                💼 LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Your Name. Built with React & passion.</p>
        <Link to="/mansion" className="footer-mansion">
          Want something more interactive? Explore my mansion →
        </Link>
      </footer>
    </div>
  );
}

export default Home;
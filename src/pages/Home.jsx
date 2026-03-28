import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import { aboutData, educationData, experienceData, projectsData, skillsData } from '../data/content';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
import { GlowCard } from '../components/ui/spotlight-card';

function Home() {
  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">Maxwell Peng</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <Link to="/mansion" className="nav-mansion">🏛️ Enter Mansion</Link>
        </div>
      </nav>

      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/profile.png"
        bgImageSrc=""
        title="Maxwell Peng"
        date="Full Stack Developer & Team Canada Athlete"
        scrollToExpand="Scroll to Expand Portfolio"
      >
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
                I'm a passionate developer studying Computer Science at Western University (GPA: 3.95/4.0).
                My journey combines technical excellence with diverse experiences - from engineering Shopify
                solutions at AtlasHaus Design to leading 700+ members as Projects Director at Western Founders Network.
              </p>
              <p>
                Beyond academics, I compete as a member of Team Canada's Junior National Badminton Team
                (ranked #2 Under 17 in Canada). This dual commitment to athletics and technology has
                taught me discipline, time management, and the power of consistent effort toward ambitious goals.
              </p>
              <p>
                I'm driven by curiosity - whether it's building real-time multiplayer platforms,
                exploring market dynamics through trading, or mastering chess strategy. Each interest
                strengthens different aspects of my problem-solving approach.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">3.95</div>
                <div className="stat-label">GPA at Western</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">#2</div>
                <div className="stat-label">U17 Badminton Canada</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">1936</div>
                <div className="stat-label">Chess ELO Rating</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">700+</div>
                <div className="stat-label">Students Led (WFN)</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="section section-alt" id="experience">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <div className="experience-timeline">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="experience-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
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
                  {exp.tech.map(tech => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
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
              <GlowCard 
                key={project.id} 
                glowColor="blue" 
                customSize={true}
                className="project-card-home-glow p-0 !bg-transparent !border-0"
              >
                <motion.div
                  className="project-card-home h-full relative z-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
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
                    {project.tech.map(tech => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  {project.link !== '#' && (
                    <a href={project.link} className="project-link-home" target="_blank" rel="noopener noreferrer">
                      View Project →
                    </a>
                  )}
                </motion.div>
              </GlowCard>
            ))}
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

          <div className="skills-category">
            <h3 className="skills-category-title">Languages</h3>
            <div className="skills-grid-home">
              {skillsData.languages.map((skill, index) => (
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
          </div>

          <div className="skills-category">
            <h3 className="skills-category-title">Frameworks & Libraries</h3>
            <div className="skills-grid-home">
              {skillsData.frameworks.map((skill, index) => (
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
          </div>

          <div className="skills-category">
            <h3 className="skills-category-title">Tools & Deployment</h3>
            <div className="skills-grid-home">
              {[...skillsData.tools, ...skillsData.deployment].map((skill, index) => (
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
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <p className="contact-text">
              I'm always open to new opportunities, collaborations, and interesting conversations.
              Whether you have a project in mind, want to discuss technology, or just chat about chess strategies,
              feel free to reach out!
            </p>
            <div className="contact-links">
              <a href="mailto:mpeng57@uwo.ca" className="contact-btn">
                📧 mpeng57@uwo.ca
              </a>
              <a href="https://github.com/maxwell" className="contact-btn" target="_blank" rel="noopener noreferrer">
                💻 GitHub
              </a>
              <a href="https://linkedin.com/in/maxwell" className="contact-btn" target="_blank" rel="noopener noreferrer">
                💼 LinkedIn
              </a>
              <a href="tel:+16475622398" className="contact-btn">
                📱 (647) 562-2398
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 Maxwell Peng. Built with React, passion, and late-night coding sessions.</p>
          <div className="footer-links">
            <a href="/Official.pdf" target="_blank" rel="noopener noreferrer">📄 Resume</a>
            <Link to="/mansion" className="footer-mansion">
              🏛️ Explore My Mansion (Interactive Mode)
            </Link>
          </div>
        </div>
      </footer>
      </ScrollExpandMedia>
    </div>
  );
}

export default Home;
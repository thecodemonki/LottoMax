import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import '../styles/Home.css';
import { experienceData, projectsData } from '../data/content';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
import { GlowCard } from '../components/ui/spotlight-card';
import Stars from '../components/Stars';
import { Footer } from '../components/ui/footer-section';

function Home({ setShowAudio }) {
  const [navVisible, setNavVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Hide audio on initial load
    if (setShowAudio) setShowAudio(false);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.8;
      
      const pastHero = currentScrollY > heroThreshold;
      
      if (setShowAudio) {
        setShowAudio(pastHero);
      }

      if (pastHero) {
        if (currentScrollY < lastScrollY.current) {
          setNavVisible(true);
        } else {
          setNavVisible(false);
        }
      } else {
        setNavVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setShowAudio]);

  return (
    <motion.div 
      className="portfolio-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <Stars />
      {/* Navigation */}
      <nav 
        className={`navbar transition-transform duration-500 ease-in-out ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="nav-brand">Maxwell Peng</div>
        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <Link to="/mansion" className="nav-mansion">🏛️ Enter Mansion</Link>
        </div>
      </nav>

      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/profile.png"
        bgImageSrc=""
        title="Maxwell Peng"
        date="Risktaker. Roadrunner. Entrepreneur."
        scrollToExpand="Scroll to Expand Portfolio"
      >
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


      {/* Contact Section */}
      <section className="section" id="contact">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full flex flex-col items-center"
        >
          {/* Glowing Divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '100%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-12 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          />

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="section-title"
          >
            Get In Touch
          </motion.h2>
          
          <div className="contact-content w-full flex flex-col items-center">
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
              className="contact-text"
            >
              I'm always open to new opportunities, collaborations, and interesting conversations.
              Whether you have a project in mind, want to discuss technology, or just chat about chess strategies,
              feel free to reach out!
            </motion.p>
            
            <motion.div
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.4
                  }
                }
              }}
              className="contact-links"
            >
              <motion.a 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                href="mailto:mpeng57@uwo.ca" 
                className="contact-btn contact-btn-email"
              >
                📧 mpeng57@uwo.ca
              </motion.a>
              <motion.a 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                href="https://github.com/thecodemonki" 
                className="contact-btn contact-btn-github" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                💻 GitHub
              </motion.a>
              <motion.a 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                href="https://www.linkedin.com/in/maxwell-peng-070116246/" 
                className="contact-btn contact-btn-linkedin" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                💼 LinkedIn
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }} // Fades in last
        className="footer"
      >
        <div className="footer-content">
          <p>&copy; 2026 Maxwell Peng. Built with Larp</p>
          <div className="footer-links">
            <a href="/Official_MaxwellPeng_Resume.pdf" target="_blank" rel="noopener noreferrer">📄 Resume</a>
            <Link to="/mansion" className="footer-mansion">
              🏛️ Explore My Mansion (Interactive Mode)
            </Link>
          </div>
        </div>
      </motion.footer>

      {/* New Footer Component Integration */}
      <Footer />
      </ScrollExpandMedia>
    </motion.div>
  );
}

export default Home;
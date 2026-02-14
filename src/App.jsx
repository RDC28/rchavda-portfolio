import React, { useState, useEffect, useMemo } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import Footer from './components/Footer';
import About from './components/About';
import Skills from './components/Skills';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [dsProjects, setDsProjects] = useState([]);
  const [daProjects, setDaProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/data/ds-projects.json').then(res => res.json()),
      fetch('/data/da-projects.json').then(res => res.json())
    ]).then(([dsData, daData]) => {
      setDsProjects(dsData);
      setDaProjects(daData);
      setDataLoaded(true);
    }).catch(error => console.error('Error fetching projects:', error));
  }, []);

  // 1s of darkness after loading screen exits, then trigger entrance
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setEntered(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const allImages = useMemo(() => {
    if (!dataLoaded) return [];
    const projects = [...dsProjects, ...daProjects];
    let images = [];
    projects.forEach(p => {
      if (p.image) images.push(p.image);
      if (p.images) images.push(...p.images);
    });
    return images;
  }, [dataLoaded, dsProjects, daProjects]);

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className={`App ${entered ? 'entered' : ''}`}>
      <AnimatePresence>
        {isLoading && dataLoaded && (
          <LoadingScreen
            images={allImages}
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {/* Fixed void background — grid + vignette (always visible) */}
      <div className="void-bg" aria-hidden="true">
        <span className="void-grid"></span>
        <span className="void-vignette"></span>
      </div>

      {/* Spotlight — anchored to the top, scrolls with content */}
      <div className="spotlight-anchor" aria-hidden="true">
        <span className="spotlight-bulb"></span>
        <span className="spotlight-cone"></span>
        <span className="spotlight-floor"></span>
        <span className="spotlight-dust"></span>
      </div>

      <Header entered={entered} />

      <Hero entered={entered} />

      <About />
      <Skills />

      {/* Data Science Section */}
      <section id="ds-projects" className="section">
        <div className="container">
          <h2 className="section-title">Data Science Projects</h2>
          <div className="projects-grid">
            {dsProjects.map(project => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      {/* Data Analytics Section */}
      <section id="da-projects" className="section">
        <div className="container">
          <h2 className="section-title">Data Analytics Projects</h2>
          <div className="projects-grid">
            {daProjects.map(project => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">Let's Connect</h2>
          <p className="contact-text">Interested in collaborating or have a question? Feel free to reach out.</p>
          <div className="contact-buttons">
            <a href="mailto:rchavda2005@outlook.com" className="btn-primary contact-btn">
              <FaEnvelope /> Email Me
            </a>
            <a href="https://linkedin.com/in/rchavda28" target="_blank" rel="noopener noreferrer" className="btn-secondary contact-btn">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="https://github.com/rdc28" target="_blank" rel="noopener noreferrer" className="btn-secondary contact-btn">
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

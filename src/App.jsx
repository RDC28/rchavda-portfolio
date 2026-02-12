import React, { useState, useEffect, useMemo } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
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
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Check mobile state
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    window.addEventListener('resize', checkMobile);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Fetch data using Promise.all to ensure both are ready
    Promise.all([
      fetch('/data/ds-projects.json').then(res => res.json()),
      fetch('/data/da-projects.json').then(res => res.json())
    ]).then(([dsData, daData]) => {
      setDsProjects(dsData);
      setDaProjects(daData);
      setDataLoaded(true);
    }).catch(error => console.error('Error fetching projects:', error));

    return () => {
      lenis.destroy();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Gather all images for preloading
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

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const renderProjectSection = (projects) => {
    // Infinite threshold: > 1 for mobile, > 3 for desktop
    const isInfinite = isMobile ? projects.length > 1 : projects.length > 3;

    if (isInfinite) {
      // Infinite Carousel
      return (
        <div className="projects-carousel-container">
          <button className="section-nav-btn prev" onClick={(e) => {
            e.target.parentElement.querySelector('.projects-carousel').scrollBy({ left: -400, behavior: 'smooth' });
          }}>&#10094;</button>

          <div className="projects-carousel">
            {/* Render list multiple times for "infinite" feel */}
            {[...projects, ...projects, ...projects, ...projects].map((project, index) => (
              <ProjectCard key={`${project.id}-${index}`} project={project} onClick={setSelectedProject} />
            ))}
          </div>

          <button className="section-nav-btn next" onClick={(e) => {
            e.target.parentElement.querySelector('.projects-carousel').scrollBy({ left: 400, behavior: 'smooth' });
          }}>&#10095;</button>
        </div>
      );
    } else {
      // Static Centered Horizontal Layout (for <= threshold items)
      // Uses the same horizontal layout but centered and without arrows/looping
      return (
        <div className="projects-carousel-container">
          <div className="projects-carousel" style={{ justifyContent: 'center' }}>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <AnimatePresence>
        {isLoading && dataLoaded && (
          <LoadingScreen
            images={allImages}
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <div className="app-background" aria-hidden="true">
        <span className="bg-orb orb-1"></span>
        <span className="bg-orb orb-2"></span>
        <span className="bg-grid"></span>
      </div>

      <Header />
      <Hero />
      <About />
      <Skills />

      {/* Data Science Section */}
      <section id="ds-projects" className="section">
        <div className="container">
          <h2 className="section-title">Data Science Projects</h2>
          {renderProjectSection(dsProjects)}
        </div>
      </section>

      {/* Data Analytics Section */}
      <section id="da-projects" className="section">
        <div className="container">
          <h2 className="section-title">Data Analytics Projects</h2>
          {renderProjectSection(daProjects)}
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

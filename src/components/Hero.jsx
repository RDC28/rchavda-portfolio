import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const Hero = () => {
    // Animation variants for the line mask effect
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1.0,
                ease: [0.165, 0.84, 0.44, 1] // Custom bezier for smooth "ios" feel
            }
        }
    };

    const handleScrollLink = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target && window.lenis) {
            window.lenis.scrollTo(target);
        } else if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="about" className="hero">
            <div className="container hero-content">
                <motion.div
                    className="hero-text-wrapper"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div style={{ overflow: 'hidden' }}>
                        <motion.h1 className="hero-title" variants={itemVariants}>
                            <span className="highlight">Rohit Chavda</span>
                        </motion.h1>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <motion.h1 className="hero-title" variants={itemVariants} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginTop: '-10px', opacity: 0.8 }}>
                            Data Scientist & Analyst
                        </motion.h1>
                    </div>

                    <div style={{ overflow: 'hidden', marginTop: '30px', marginBottom: '40px' }}>
                        <motion.p className="hero-subtitle" variants={itemVariants}>
                            Transforming complex data into actionable insights and strategic solutions.
                        </motion.p>
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                        <motion.div className="hero-buttons" variants={itemVariants}>
                            <a href="#ds-projects" className="btn-primary" onClick={(e) => handleScrollLink(e, '#ds-projects')}>View Projects</a>
                            <a href="https://github.com/rdc28" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                                <FaGithub style={{ marginRight: '8px' }} /> GitHub
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Subtle Gradient Background instead of blob for cleaner look */}
            <div className="hero-background" style={{ opacity: 0.4 }}></div>
        </section>
    );
};

export default Hero;

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import RandomWord from './RandomWord';

const Hero = ({ entered }) => {
    const handleScrollLink = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // SNAPPY delay range
    const MIN = 0.6;
    const MAX = 1.4;

    return (
        <section id="about" className="hero">
            <div className="container hero-content">
                <p className="hero-greeting">
                    <RandomWord text="Hello, I'm" minDelay={MIN} maxDelay={MAX} trigger={entered} />
                </p>

                <h1 className="hero-title">
                    <span className="highlight">
                        <RandomWord text="Rohit Chavda" minDelay={MIN} maxDelay={MAX} trigger={entered} />
                    </span>
                </h1>

                <p className="hero-role">
                    <RandomWord text="Data Scientist & Analyst" minDelay={MIN} maxDelay={MAX} trigger={entered} />
                </p>

                <motion.div
                    className="hero-divider"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={entered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                />

                <p className="hero-subtitle">
                    <RandomWord
                        text="Transforming complex data into actionable insights and strategic solutions."
                        minDelay={MIN}
                        maxDelay={MAX}
                        trigger={entered}
                    />
                </p>

                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 10 }}
                    animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                >
                    <a href="#ds-projects" className="btn-primary" onClick={(e) => handleScrollLink(e, '#ds-projects')}>
                        View Projects
                    </a>
                    <a href="https://github.com/rdc28" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        <FaGithub /> GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

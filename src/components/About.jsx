import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import RandomWord from './RandomWord';

const About = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    // Faster materialization for the about section
    const MIN = 0.1;
    const MAX = 1.0;

    return (
        <section id="about-me" className="section about-section" ref={containerRef}>
            <div className="container about-container">
                <div className="about-content">
                    <h2 className="section-title left-align">
                        <RandomWord text="About Me" minDelay={0} maxDelay={0.4} trigger={isInView} />
                    </h2>

                    <p className="about-text">
                        <RandomWord
                            text="Hello! I'm "
                            minDelay={MIN}
                            maxDelay={MAX}
                            trigger={isInView}
                        />
                        <span className="highlight" style={{ display: 'inline-block' }}>
                            <RandomWord
                                text="Rohit Chavda"
                                minDelay={MIN}
                                maxDelay={MAX}
                                trigger={isInView}
                            />
                        </span>
                        <RandomWord
                            text=", a dedicated Data Scientist and Analyst."
                            minDelay={MIN}
                            maxDelay={MAX}
                            trigger={isInView}
                        />
                    </p>

                    <p className="about-text">
                        <RandomWord
                            text="I specialize in turning raw data into meaningful insights and building predictive models that solve real-world problems. My journey in data involves deep diving into machine learning algorithms, statistical analysis, and interactive visualizations."
                            minDelay={MIN + 0.2}
                            maxDelay={MAX + 0.4}
                            trigger={isInView}
                        />
                    </p>

                    <p className="about-text">
                        <RandomWord
                            text="I am passionate about continuous learning and keeping up with the latest trends in AI and Data Science. Whether it's cleaning messy datasets or deploying complex models, I enjoy every step of the data pipeline."
                            minDelay={MIN + 0.4}
                            maxDelay={MAX + 0.8}
                            trigger={isInView}
                        />
                    </p>

                    <motion.div
                        className="about-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: MAX + 0.5, duration: 0.6 }}
                    >
                        <a href="#contact" className="btn-primary" onClick={(e) => {
                            e.preventDefault();
                            const target = document.querySelector('#contact');
                            if (target) target.scrollIntoView({ behavior: 'smooth' });
                        }}>Contact Me</a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

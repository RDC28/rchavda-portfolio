import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const [isActive, setIsActive] = React.useState(false);

    return (
        <section id="about-me" className="section about-section">
            <div className="container about-container">
                <motion.div
                    className="about-graphic-container"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    onClick={() => setIsActive(!isActive)}
                    style={{ cursor: 'pointer' }}
                >
                    <motion.div
                        className="graphic-orb"
                        animate={{
                            filter: isActive ? 'hue-rotate(180deg) blur(60px)' : 'hue-rotate(0deg) blur(60px)',
                            scale: isActive ? 1.2 : 1
                        }}
                        transition={{ duration: 0.5 }}
                    />
                    <motion.div
                        className="graphic-glass-card"
                        animate={{
                            y: isActive ? [0, -10, 0] : [0, -20, 0],
                            rotate: isActive ? [0, 10, 0] : [0, 5, 0],
                            scale: isActive ? 1.05 : 1
                        }}
                        transition={{
                            duration: isActive ? 3 : 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="glass-content">
                            <motion.div className="data-point p1" animate={isActive ? { top: '20%', left: '50%' } : {}} />
                            <motion.div className="data-point p2" animate={isActive ? { top: '80%', left: '20%' } : {}} />
                            <motion.div className="data-point p3" animate={isActive ? { top: '80%', left: '80%' } : {}} />
                            <motion.div
                                className="data-line"
                                animate={{
                                    background: isActive ? 'linear-gradient(90deg, transparent, #00f0ff, transparent)' : 'linear-gradient(90deg, transparent, #5C038C, transparent)'
                                }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="about-content"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="section-title left-align">About Me</h2>
                    <p className="about-text">
                        Hello! I'm <span className="highlight">Rohit Chavda</span>, a dedicated Data Scientist and Analyst.
                        I specialize in turning raw data into meaningful insights and building predictive models that solve real-world problems.
                        My journey in data involves deep diving into machine learning algorithms, statistical analysis, and interactive visualizations.
                    </p>
                    <p className="about-text">
                        I am passionate about continuous learning and keeping up with the latest trends in AI and Data Science.
                        Whether it's cleaning messy datasets or deploying complex models, I enjoy every step of the data pipeline.
                    </p>
                    <div className="about-actions">
                        <a href="#contact" className="btn-primary" onClick={(e) => {
                            e.preventDefault();
                            const target = document.querySelector('#contact');
                            if (target && window.lenis) window.lenis.scrollTo(target);
                            else if (target) target.scrollIntoView({ behavior: 'smooth' });
                        }}>Contact Me</a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;

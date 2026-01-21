import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetch('/data/skills.json')
            .then(response => response.json())
            .then(data => setSkills(data))
            .catch(error => console.error('Error fetching skills:', error));
    }, []);

    const containerVariants = {
        hidden: { opacity: 1 }, // Changed from 0 to 1 to ensure visibility even if animation fails
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="skills" className="section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    Technical Skills
                </motion.h2>

                {skills.length > 0 ? (
                    <motion.div
                        className="skills-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }} // Added margin to trigger earlier
                    >
                        {skills.map((category, index) => (
                            <motion.div
                                key={index}
                                className="skill-card"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                            >
                                <h3 className="skill-category">{category.category}</h3>
                                <div className="skill-tags">
                                    {category.skills.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div style={{ color: 'white', textAlign: 'center' }}>Loading skills...</div>
                )}
            </div>
        </section>
    );
};

export default Skills;

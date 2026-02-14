import React, { useState, useEffect } from 'react';

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetch('/data/skills.json')
            .then(response => response.json())
            .then(data => setSkills(data))
            .catch(error => console.error('Error fetching skills:', error));
    }, []);

    return (
        <section id="skills" className="section">
            <div className="container">
                <h2 className="section-title">Technical Skills</h2>
                {skills.length > 0 ? (
                    <div className="skills-grid">
                        {skills.map((category, index) => (
                            <div key={index} className="skill-card">
                                <h3 className="skill-category">{category.category}</h3>
                                <div className="skill-tags">
                                    {category.skills.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ color: '#888', textAlign: 'center' }}>Loading skills...</div>
                )}
            </div>
        </section>
    );
};

export default Skills;

import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick }) => {
    return (
        <motion.div
            className="project-card"
            onClick={() => onClick(project)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="card-image-wrapper">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="card-image"
                />
                <div className="card-overlay">
                    <span>View Detail</span>
                </div>
            </div>
            <div className="card-content">
                <h3 className="card-title">
                    {project.title}
                </h3>
                <p className="card-desc">{project.description}</p>
                <div className="card-tags">
                    {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;

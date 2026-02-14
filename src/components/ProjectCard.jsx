import React from 'react';

const ProjectCard = ({ project, onClick }) => {
    return (
        <div className="project-card" onClick={() => onClick(project)}>
            <div className="card-image-wrapper">
                <img
                    src={project.image}
                    alt={project.title}
                    className="card-image"
                />
                <div className="card-overlay">
                    <span>View Detail</span>
                </div>
            </div>
            <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.description}</p>
                <div className="card-tags">
                    {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;

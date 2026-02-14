import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = project.images || [project.image];

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
            if (e.key === 'ArrowRight') setCurrentImageIndex(prev => (prev + 1) % images.length);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (!project) return null;

    return (
        <motion.div
            className="modal-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <div className="modal-header-image">
                    <img
                        src={images[currentImageIndex]}
                        alt={project.title}
                        className="carousel-image"
                    />

                    {images.length > 1 && (
                        <>
                            <button className="carousel-btn prev" onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length); }}>&#10094;</button>
                            <button className="carousel-btn next" onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => (prev + 1) % images.length); }}>&#10095;</button>
                            <div className="carousel-dots">
                                {images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`carousel-dot ${idx === currentImageIndex ? 'active' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <button className="close-modal-btn" onClick={onClose}>&times;</button>

                <div className="modal-body">
                    <h2 className="modal-title">{project.title}</h2>
                    <div className="modal-tags">
                        {project.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                    <p className="modal-description">{project.fullDescription}</p>
                    <div className="modal-actions">
                        {project.liveLink && project.liveLink !== "#" ? (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary">Live Demo</a>
                        ) : project.viewPostLink ? (
                            <a href={project.viewPostLink} target="_blank" rel="noopener noreferrer" className="btn-primary">View Post</a>
                        ) : null}

                        {project.githubLink && project.githubLink !== "#" && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub</a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;

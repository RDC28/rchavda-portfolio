import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop(); // Stop Lenis scrolling

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prevImage(e);
            if (e.key === 'ArrowRight') nextImage(e);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start(); // Resume Lenis scrolling
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(0);
    const images = project.images || [project.image];

    const nextImage = (e) => {
        e.stopPropagation();
        setDirection(1);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setDirection(-1);
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

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
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="modal-header-image">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={currentImageIndex}
                            src={images[currentImageIndex]}
                            alt={project.title}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="carousel-image"
                        />
                    </AnimatePresence>

                    {images.length > 1 && (
                        <>
                            <button className="carousel-btn prev" onClick={prevImage}>&#10094;</button>
                            <button className="carousel-btn next" onClick={nextImage}>&#10095;</button>
                            <div className="carousel-dots">
                                {images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`carousel-dot ${idx === currentImageIndex ? 'active' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); setDirection(idx > currentImageIndex ? 1 : -1); setCurrentImageIndex(idx); }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <button className="close-modal-btn" onClick={onClose}>&times;</button>

                <div className="modal-body">
                    <div className="modal-info-header">
                        <motion.h2 className="modal-title">{project.title}</motion.h2>
                        <div className="modal-tags">
                            {project.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="modal-description" data-lenis-prevent>{project.fullDescription}</p>

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
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;

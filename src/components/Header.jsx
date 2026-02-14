import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import Burst from './Burst';
import RandomWord from './RandomWord';

const Header = ({ entered }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showBurst, setShowBurst] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setIsScrolled(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [isMenuOpen]);

    const handleScrollLink = (e, targetId) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Shared Nav delay window
    const MIN_NAV = 1.4;
    const MAX_NAV = 2.0;

    const logoVariants = {
        hidden: { y: -15, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                delay: 2.3,
                duration: 0.6,
                ease: [0.175, 0.885, 0.32, 1.275]
            }
        }
    };

    return (
        <header
            className={`header ${isScrolled ? 'scrolled' : ''}`}
            style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            }}
        >
            <div className="container header-container">
                <div style={{ position: 'relative' }}>
                    <motion.a
                        href="#"
                        className="logo"
                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        variants={logoVariants}
                        initial="hidden"
                        animate={entered ? "visible" : "hidden"}
                        onAnimationComplete={() => setShowBurst(true)}
                    >
                        R.Chavda
                    </motion.a>
                    <Burst trigger={showBurst} />
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <MdClose /> : <MdMenu />}
                </button>

                <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                    <a href="#about-me" onClick={(e) => handleScrollLink(e, '#about-me')}>
                        <RandomWord text="About" minDelay={MIN_NAV} maxDelay={MAX_NAV} trigger={entered} y={-5} blur="2px" />
                    </a>
                    <a href="#ds-projects" onClick={(e) => handleScrollLink(e, '#ds-projects')}>
                        <RandomWord text="Data Science" minDelay={MIN_NAV} maxDelay={MAX_NAV} trigger={entered} y={-5} blur="2px" />
                    </a>
                    <a href="#da-projects" onClick={(e) => handleScrollLink(e, '#da-projects')}>
                        <RandomWord text="Data Analytics" minDelay={MIN_NAV} maxDelay={MAX_NAV} trigger={entered} y={-5} blur="2px" />
                    </a>
                    <motion.a
                        href="#contact"
                        className="btn-primary"
                        onClick={(e) => handleScrollLink(e, '#contact')}
                        initial={{ opacity: 0, scale: 0.95, borderColor: 'transparent', backgroundColor: 'transparent' }}
                        animate={entered ? {
                            opacity: 1,
                            scale: 1,
                            borderColor: 'inherit',
                            backgroundColor: 'rgba(212, 168, 83, 0.1)'
                        } : {}}
                        transition={{
                            delay: MIN_NAV + 0.1,
                            duration: 0.5
                        }}
                    >
                        <RandomWord text="Contact" minDelay={MIN_NAV} maxDelay={MAX_NAV} trigger={entered} y={-5} blur="2px" />
                    </motion.a>
                </nav>
            </div>
        </header>
    );
};

export default Header;

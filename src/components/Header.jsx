import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';

const Header = () => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down & past header
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [isMenuOpen]);

    const handleScrollLink = (e, targetId) => {
        e.preventDefault();
        setIsMenuOpen(false); // Close menu on click
        const target = document.querySelector(targetId);
        if (target && window.lenis) {
            window.lenis.scrollTo(target);
        } else if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className="header"
            style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 0.3s ease-in-out'
            }}
        >
            <div className="container header-container">
                <a href="#" className="logo" onClick={(e) => handleScrollLink(e, '#')}>R.Chavda</a>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <MdClose /> : <MdMenu />}
                </button>

                <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                    <a href="#about-me" onClick={(e) => handleScrollLink(e, '#about-me')}>About</a>
                    <a href="#ds-projects" onClick={(e) => handleScrollLink(e, '#ds-projects')}>Data Science</a>
                    <a href="#da-projects" onClick={(e) => handleScrollLink(e, '#da-projects')}>Data Analytics</a>
                    <a href="#contact" className="btn-primary" onClick={(e) => handleScrollLink(e, '#contact')}>Contact</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;

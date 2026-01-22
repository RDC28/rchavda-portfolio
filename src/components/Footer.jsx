import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; 2026 Rohit Chavda. Built with Antigravity.</p>
                <div className="social-links">
                    <a href="https://linkedin.com/in/rchavda28" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    <a href="https://github.com/rdc28" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                    <a href="https://x.com/RDC_28_" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

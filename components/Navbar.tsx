'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark');

    // Initialize theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="nav-container">
                <Link href="#" className="logo">
                    <i className="ri-code-s-slash-line"></i>
                    <span>pk.</span>
                </Link>

                {/* Mobile Menu Toggle */}
                <div
                    className="mobile-menu-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-line"></i>}
                </div>

                <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link href="#about" className="nav-item" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link href="#projects" className="nav-item" onClick={() => setIsMenuOpen(false)}>Work</Link>
                    <Link href="#contact" className="nav-item" onClick={() => setIsMenuOpen(false)}>Contact</Link>

                    {/* Mobile CTA (visible in menu) */}
                    <div className="mobile-only" style={{ marginTop: '1rem', display: isMenuOpen ? 'block' : 'none' }}>
                        <Link href="#contact" className="cta-button">Let's Talk</Link>
                    </div>
                </nav>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Theme Toggle */}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'dark' ? <i className="ri-moon-line"></i> : <i className="ri-sun-line"></i>}
                    </button>

                    <Link href="#contact" className="cta-button desktop-only">
                        Let's Talk <i className="ri-arrow-right-line"></i>
                    </Link>
                </div>
            </div>
        </header>
    );
}

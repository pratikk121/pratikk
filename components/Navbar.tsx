'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [scrolled, setScrolled] = useState(false);

    // Initialize theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme !== 'dark') {
            requestAnimationFrame(() => {
                setTheme(savedTheme);
            });
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const triggerCommandPalette = () => {
        window.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
        );
    };

    return (
        <header className={`transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/20' : ''}`}>
            <div className="nav-container">
                {/* Brand Logo */}
                <Link href="/" className="logo group">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/40 group-hover:scale-105 transition-all">
                        <i className="ri-terminal-box-line text-lg"></i>
                    </span>
                    <span className="font-outfit font-bold tracking-tight">pk.</span>
                </Link>

                {/* Desktop Nav Items */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/about"
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        href="/work"
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Work
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Right Actions: Command Palette, Theme Toggle, CTA */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Command Palette Quick Trigger Button */}
                    <button
                        onClick={triggerCommandPalette}
                        className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/[0.08] hover:border-white/20 bg-slate-900/60 text-slate-400 hover:text-white text-xs font-mono transition-colors"
                        title="Open Command Palette (⌘K)"
                    >
                        <i className="ri-command-line text-xs"></i>
                        <span>⌘K</span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle Dark/Light Mode"
                        title="Toggle color theme"
                    >
                        {theme === 'dark' ? <i className="ri-moon-line"></i> : <i className="ri-sun-line"></i>}
                    </button>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:block">
                        <MagneticButton href="/contact" className="cta-button">
                            <span>Let&apos;s Talk</span>
                            <i className="ri-arrow-right-line text-sm"></i>
                        </MagneticButton>
                    </div>

                    {/* Mobile Menu Hamburger Toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? (
                            <i className="ri-close-line text-2xl"></i>
                        ) : (
                            <i className="ri-menu-line text-2xl"></i>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Slide-down Drawer Navigation */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-x-0 top-[var(--nav-height)] bg-slate-950/95 backdrop-blur-2xl border-b border-white/[0.08] p-6 shadow-2xl flex flex-col gap-5 animate-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col gap-4">
                        <Link
                            href="/about"
                            className="text-lg font-medium text-slate-200 hover:text-white flex items-center justify-between py-2 border-b border-white/[0.05]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>About</span>
                            <i className="ri-arrow-right-s-line text-slate-500"></i>
                        </Link>
                        <Link
                            href="/work"
                            className="text-lg font-medium text-slate-200 hover:text-white flex items-center justify-between py-2 border-b border-white/[0.05]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>Selected Work</span>
                            <i className="ri-arrow-right-s-line text-slate-500"></i>
                        </Link>
                        <Link
                            href="/contact"
                            className="text-lg font-medium text-slate-200 hover:text-white flex items-center justify-between py-2 border-b border-white/[0.05]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>Contact</span>
                            <i className="ri-arrow-right-s-line text-slate-500"></i>
                        </Link>
                    </nav>

                    <div className="pt-2 flex flex-col gap-3">
                        <Link
                            href="/contact"
                            className="cta-button w-full text-center justify-center py-3"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>Let&apos;s Talk</span>
                            <i className="ri-arrow-right-line text-sm"></i>
                        </Link>

                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                triggerCommandPalette();
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.1] bg-slate-900/80 text-slate-300 text-sm font-mono"
                        >
                            <i className="ri-command-line"></i>
                            <span>Search & Commands (⌘K)</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

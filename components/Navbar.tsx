'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const triggerCommandPalette = () => {
        window.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
        );
    };

    return (
        <header className={`site-header transition-colors duration-150 ${scrolled ? 'border-b border-[#292d30] bg-[#000000]/95 backdrop-blur-md' : 'border-b border-[#292d30]/60 bg-[#000000]/80 backdrop-blur-sm'}`}>
            <div className="nav-container">
                {/* Brand Logo */}
                <Link href="/" className="logo group">
                    <span className="font-outfit font-bold tracking-tight text-[#ffffff]">
                        Pratik Kadole
                    </span>
                </Link>

                {/* Desktop Nav Items */}
                <nav className="hidden md:flex items-center gap-7">
                    <Link
                        href="/#projects"
                        className="text-sm font-medium text-[#a1a4a5] hover:text-[#ffffff] transition-colors"
                    >
                        Work
                    </Link>
                    <Link
                        href="/#about"
                        className="text-sm font-medium text-[#a1a4a5] hover:text-[#ffffff] transition-colors"
                    >
                        About
                    </Link>
                    <a
                        href="https://github.com/pratikk121"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#a1a4a5] hover:text-[#ffffff] transition-colors flex items-center gap-1"
                    >
                        <span>GitHub</span>
                        <i className="ri-external-link-line text-xs"></i>
                    </a>
                    <Link
                        href="/#contact"
                        className="text-sm font-medium text-[#a1a4a5] hover:text-[#ffffff] transition-colors"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Right Actions: Command Palette & Get in Touch CTA */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={triggerCommandPalette}
                        className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#292d30] hover:border-[#ffffff] bg-[#000000] text-[#a1a4a5] hover:text-[#ffffff] text-xs font-medium transition-colors"
                        title="Search (⌘K)"
                    >
                        <i className="ri-search-line text-xs"></i>
                        <span>Search</span>
                        <kbd className="text-[10px] text-[#6e727a] ml-1">⌘K</kbd>
                    </button>

                    <Link
                        href="/#contact"
                        className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#292d30] hover:border-[#ffffff] text-xs font-semibold text-[#f0f0f0] transition-colors"
                    >
                        <span>Contact</span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 rounded-md text-[#a1a4a5] hover:text-[#ffffff] hover:bg-[#292d30]/30 transition-colors cursor-pointer"
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? (
                            <i className="ri-close-line text-xl"></i>
                        ) : (
                            <i className="ri-menu-line text-xl"></i>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-x-0 top-[var(--nav-height)] bg-[#000000] border-b border-[#292d30] p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-150">
                    <nav className="flex flex-col gap-2">
                        <Link
                            href="/#projects"
                            className="text-sm font-medium text-[#f0f0f0] hover:text-white py-2 border-b border-[#292d30]/60 flex items-center justify-between"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>Work</span>
                            <i className="ri-arrow-right-s-line text-[#6e727a]"></i>
                        </Link>
                        <Link
                            href="/#about"
                            className="text-sm font-medium text-[#f0f0f0] hover:text-white py-2 border-b border-[#292d30]/60 flex items-center justify-between"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>About</span>
                            <i className="ri-arrow-right-s-line text-[#6e727a]"></i>
                        </Link>
                        <a
                            href="https://github.com/pratikk121"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-[#f0f0f0] hover:text-white py-2 border-b border-[#292d30]/60 flex items-center justify-between"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>GitHub Profile</span>
                            <i className="ri-external-link-line text-xs text-[#6e727a]"></i>
                        </a>
                        <Link
                            href="/#contact"
                            className="text-sm font-medium text-[#f0f0f0] hover:text-white py-2 flex items-center justify-between"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>Contact</span>
                            <i className="ri-arrow-right-s-line text-[#6e727a]"></i>
                        </Link>
                    </nav>

                    <div className="pt-2 flex flex-col gap-2">
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                triggerCommandPalette();
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-[#292d30] bg-[#000000] text-[#a1a4a5] text-xs font-medium"
                        >
                            <i className="ri-search-line text-xs"></i>
                            <span>Search (⌘K)</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

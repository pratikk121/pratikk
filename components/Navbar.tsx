'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

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
        <header className={`site-header transition-colors duration-200 ${scrolled ? 'border-b border-[#292d30]' : 'border-b border-[#292d30]/70'}`}>
            <div className="nav-container">
                {/* Brand Logo with Iris Violet Brand Mark */}
                <Link href="/" className="logo group">
                    <span className="w-7 h-7 rounded-md bg-[#0b0e14] border border-[#292d30] flex items-center justify-center text-[#9281f7] group-hover:border-[#9281f7] transition-all">
                        <i className="ri-terminal-box-line text-sm"></i>
                    </span>
                    <span className="font-outfit font-bold tracking-tight text-[#ffffff]">pk<span className="text-[#9281f7]">.</span></span>
                </Link>

                {/* Desktop Nav Items */}
                <nav className="hidden md:flex items-center gap-7">
                    <Link
                        href="/about"
                        className="text-sm font-medium text-[#abafb4] hover:text-[#ffffff] transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        href="/work"
                        className="text-sm font-medium text-[#abafb4] hover:text-[#ffffff] transition-colors"
                    >
                        Work
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium text-[#abafb4] hover:text-[#ffffff] transition-colors"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Right Actions: Command Palette & Ghost CTA */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Command Palette Quick Trigger Button */}
                    <button
                        onClick={triggerCommandPalette}
                        className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#292d30] hover:border-[#ffffff] bg-[#000000] text-[#a1a4a5] hover:text-[#ffffff] text-xs font-medium transition-colors"
                        title="Open Command Palette (⌘K)"
                    >
                        <i className="ri-command-line text-xs"></i>
                        <span>⌘K</span>
                    </button>

                    {/* Desktop Resend Ghost CTA Button */}
                    <div className="hidden md:block">
                        <MagneticButton href="/contact">
                            <span className="resend-btn-ghost">
                                <span>Let&apos;s Talk</span>
                                <i className="ri-arrow-right-line text-xs"></i>
                            </span>
                        </MagneticButton>
                    </div>

                    {/* Mobile Menu Hamburger Toggle */}
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

            {/* Mobile Slide-down Drawer Navigation */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-x-0 top-[var(--nav-height)] bg-[#000000] border-b border-[#292d30] p-6 flex flex-col gap-5 animate-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col gap-3">
                        <Link
                            href="/about"
                            className="text-base font-medium text-[#f0f0f0] hover:text-white flex items-center justify-between py-2 border-b border-[#292d30]/60"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>About</span>
                            <i className="ri-arrow-right-s-line text-[#a1a4a5]"></i>
                        </Link>
                        <Link
                            href="/work"
                            className="text-base font-medium text-[#f0f0f0] hover:text-white flex items-center justify-between py-2 border-b border-[#292d30]/60"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>Selected Work</span>
                            <i className="ri-arrow-right-s-line text-[#a1a4a5]"></i>
                        </Link>
                        <Link
                            href="/contact"
                            className="text-base font-medium text-[#f0f0f0] hover:text-white flex items-center justify-between py-2 border-b border-[#292d30]/60"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>Contact</span>
                            <i className="ri-arrow-right-s-line text-[#a1a4a5]"></i>
                        </Link>
                    </nav>

                    <div className="pt-2 flex flex-col gap-3">
                        <Link
                            href="/contact"
                            className="resend-btn-ghost w-full text-center justify-center py-2.5"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>Let&apos;s Talk</span>
                            <i className="ri-arrow-right-line text-xs"></i>
                        </Link>

                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                triggerCommandPalette();
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-[#292d30] bg-[#000000] text-[#a1a4a5] text-xs font-medium"
                        >
                            <i className="ri-command-line text-xs"></i>
                            <span>Search & Commands (⌘K)</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

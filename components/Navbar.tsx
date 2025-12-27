import Link from 'next/link';
import { RiCodeSSlashLine, RiMenuLine, RiMoonLine } from '@remixicon/react';

export default function Navbar() {
    return (
        <header>
            <div className="nav-container">
                <Link href="#" className="logo">
                    <i className="ri-code-s-slash-line"></i>
                    <span>pk.</span>
                </Link>
                <nav className="nav-links">
                    <Link href="#about" className="nav-item">About</Link>
                    <Link href="#projects" className="nav-item">Work</Link>
                    <Link href="#contact" className="nav-item">Contact</Link>
                </nav>
                <Link href="mailto:pratikk5143772@gmail.com" className="cta-button">
                    Let's Talk <i className="ri-arrow-right-line"></i>
                </Link>
                {/* Theme Toggle & Mobile Menu placeholders - implement logic later */}
                <button className="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode">
                    <i className="ri-moon-line"></i>
                </button>
                <div className="mobile-menu-btn" aria-label="Toggle navigation menu">
                    <i className="ri-menu-line"></i>
                </div>
            </div>
        </header>
    );
}

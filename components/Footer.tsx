import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-[#292d30] py-10 text-sm text-[#a1a4a5] bg-[#000000]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Copyright & Info */}
                <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
                    <span className="font-semibold text-[#f0f0f0]">Pratik Kadole</span>
                    <span className="hidden sm:inline text-[#464a4d]">•</span>
                    <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
                    <span className="hidden md:inline text-[#464a4d]">•</span>
                    <span className="hidden md:inline text-xs font-mono text-[#6e727a]">
                        Engineered with Next.js 16, React 19 &amp; Tailwind CSS v4
                    </span>
                </div>

                {/* Social Network & Quick Links */}
                <div className="flex items-center gap-5">
                    <Link
                        href="/about"
                        className="text-[#a1a4a5] hover:text-[#ffffff] transition-colors text-xs"
                    >
                        About
                    </Link>
                    <Link
                        href="/work"
                        className="text-[#a1a4a5] hover:text-[#ffffff] transition-colors text-xs"
                    >
                        Work
                    </Link>
                    <Link
                        href="/contact"
                        className="text-[#a1a4a5] hover:text-[#ffffff] transition-colors text-xs"
                    >
                        Contact
                    </Link>

                    <div className="w-px h-4 bg-[#292d30] mx-1"></div>

                    <a
                        href="https://github.com/pratikk121"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        className="w-7 h-7 rounded-md bg-[#000000] hover:border-[#ffffff] border border-[#292d30] flex items-center justify-center text-[#a1a4a5] hover:text-[#ffffff] transition-all text-sm"
                    >
                        <i className="ri-github-line"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/pratik-kadole-119391267/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                        className="w-7 h-7 rounded-md bg-[#000000] hover:border-[#ffffff] border border-[#292d30] flex items-center justify-center text-[#a1a4a5] hover:text-[#ffffff] transition-all text-sm"
                    >
                        <i className="ri-linkedin-line"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

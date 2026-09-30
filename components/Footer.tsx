import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/[0.08] py-10 text-sm text-slate-400">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Copyright & Info */}
                <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
                    <span className="font-semibold text-slate-200">Pratik Kadole</span>
                    <span className="hidden sm:inline text-slate-600">•</span>
                    <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
                    <span className="hidden md:inline text-slate-600">•</span>
                    <span className="hidden md:inline text-xs text-slate-500 font-mono">
                        Engineered with Next.js 16, React 19 & Tailwind CSS
                    </span>
                </div>

                {/* Social Network & Quick Links */}
                <div className="flex items-center gap-5">
                    <Link
                        href="/about"
                        className="text-slate-400 hover:text-white transition-colors text-xs"
                    >
                        About
                    </Link>
                    <Link
                        href="/work"
                        className="text-slate-400 hover:text-white transition-colors text-xs"
                    >
                        Work
                    </Link>
                    <Link
                        href="/contact"
                        className="text-slate-400 hover:text-white transition-colors text-xs"
                    >
                        Contact
                    </Link>

                    <div className="w-px h-4 bg-white/10 mx-1"></div>

                    <a
                        href="https://github.com/pratikk121"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white transition-all text-base"
                    >
                        <i className="ri-github-line"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/pratik-kadole-119391267/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white transition-all text-base"
                    >
                        <i className="ri-linkedin-line"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

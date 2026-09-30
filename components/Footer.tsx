import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-[#292d30] py-8 text-xs text-[#a1a4a5] bg-[#000000]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
                    <span className="font-medium text-[#f0f0f0]">Pratik Kadole</span>
                    <span className="text-[#464a4d]">•</span>
                    <span>Software Engineer</span>
                    <span className="text-[#464a4d]">•</span>
                    <span>India</span>
                    <span className="hidden sm:inline text-[#464a4d]">•</span>
                    <span className="hidden sm:inline text-[#6e727a]">
                        &copy; {new Date().getFullYear()}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/#projects" className="hover:text-[#ffffff] transition-colors">
                        Work
                    </Link>
                    <Link href="/#about" className="hover:text-[#ffffff] transition-colors">
                        About
                    </Link>
                    <Link href="/#contact" className="hover:text-[#ffffff] transition-colors">
                        Contact
                    </Link>
                    <span className="text-[#464a4d]">•</span>
                    <a
                        href="https://github.com/pratikk121"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#ffffff] transition-colors flex items-center gap-1"
                    >
                        <i className="ri-github-line"></i>
                        <span>GitHub</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/pratik-kadole-119391267/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#ffffff] transition-colors flex items-center gap-1"
                    >
                        <i className="ri-linkedin-line"></i>
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}

import Link from "next/link";
import Typewriter from "./Typewriter";

export default function Hero() {
    const techStack = [
        { name: "TypeScript", icon: "ri-code-s-slash-line" },
        { name: "Next.js 16", icon: "ri-nextjs-line" },
        { name: "Python / FastAPI", icon: "ri-terminal-box-line" },
        { name: "PostgreSQL / Prisma", icon: "ri-database-2-line" },
        { name: "WebGL / GLSL", icon: "ri-cpu-line" },
        { name: "Tailwind CSS", icon: "ri-tailwind-css-line" },
        { name: "Distributed Systems", icon: "ri-node-tree" },
    ];

    return (
        <section className="pt-6 sm:pt-10 md:pt-16 pb-12 sm:pb-16 flex flex-col justify-center reveal active">
            {/* Status Indicator Pill */}
            <div className="flex items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Available for Systems & Full-Stack Roles</span>
                </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-outfit text-white tracking-tight leading-[1.12] mb-6">
                Building the future of <br className="hidden sm:inline" />
                <Typewriter />
            </h1>

            {/* Subheading / Bio */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
                I&apos;m Pratik, a software engineer specializing in systems architecture, ambient computing environments, and high-performance distributed platforms.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
                <Link href="/work" className="cta-button">
                    <span>Explore Flagship Works</span>
                    <i className="ri-arrow-right-line text-sm"></i>
                </Link>

                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/[0.08] hover:border-white/20 transition-all shadow-sm"
                >
                    <i className="ri-mail-send-line text-sm"></i>
                    <span>Get in Touch</span>
                </Link>
            </div>

            {/* Core Stack Matrix */}
            <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 block">
                    Core Technical Competencies
                </span>
                <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                        <div
                            key={tech.name}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono text-slate-300 bg-slate-900/60 border border-white/[0.08] hover:border-indigo-500/40 hover:text-white hover:bg-slate-800/80 transition-all duration-200 cursor-default"
                        >
                            <i className={`${tech.icon} text-indigo-400 text-sm`}></i>
                            <span>{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

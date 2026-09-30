import Link from "next/link";

export default function About() {
    const coreDomains = [
        {
            icon: "ri-server-line",
            title: "Systems & Architecture",
            color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
            description:
                "High-concurrency micro-backends, type-safe database schemas with PostgreSQL & Prisma, asynchronous streaming pipelines with FastAPI and Next.js 16.",
            skills: ["PostgreSQL", "Prisma", "FastAPI", "Distributed State", "Docker", "Redis"],
        },
        {
            icon: "ri-sparkling-line",
            title: "Ambient UI & Interaction Craft",
            color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
            description:
                "Real-time WebGL/GLSL shader compositing, window stacking algorithms, virtual filesystems, and responsive desktop emulation running at a fluid 60 FPS.",
            skills: ["WebGL", "GLSL Shaders", "Web Audio API", "Framer Motion", "Tailwind CSS"],
        },
        {
            icon: "ri-shield-keyhole-line",
            title: "Production Engineering & Resilience",
            color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
            description:
                "Designing fault-tolerant cloud workflows, CI/CD telemetry, strict TypeScript typings, zero-drift database migrations, and sub-100ms API response windows.",
            skills: ["Strict TypeScript", "Next.js Turbopack", "Telemetry", "Edge Functions"],
        },
        {
            icon: "ri-cpu-line",
            title: "Fintech & Data Intelligence",
            color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            description:
                "Financial ledger modeling, real-time portfolio tracking engines, transaction reconciliation pipelines, and algorithmic market data analysis.",
            skills: ["Ledger Accounting", "Analytical Querying", "WebSocket Streams", "Chart Telemetry"],
        },
    ];

    const highlights = [
        { label: "Rendering Performance", value: "60 FPS", sub: "GLSL Compositing" },
        { label: "Core Runtime", value: "<45 KB", sub: "Micro-Kernel Payload" },
        { label: "Dispatch Latency", value: "<2 ms", sub: "Event Loop Sync" },
        { label: "Type Safety", value: "100%", sub: "End-to-End TypeScript" },
    ];

    return (
        <section id="about" className="py-8 sm:py-12 reveal active">
            {/* Section Header */}
            <div className="section-header mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
                    <i className="ri-user-smile-line text-sm"></i> Engineer Profile
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-white flex items-center gap-3">
                    Architecting Resilient Platforms & Ambient Interfaces
                </h2>
                <p className="text-slate-400 max-w-3xl text-base sm:text-lg mt-3 leading-relaxed">
                    I build at the intersection of low-latency systems engineering and visceral web user interfaces. My work emphasizes sub-frame graphical fidelity, fault-tolerant data models, and software architectures designed for unbounded scale.
                </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
                {highlights.map((item) => (
                    <div
                        key={item.label}
                        className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-sm"
                    >
                        <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">{item.label}</p>
                        <p className="text-2xl sm:text-3xl font-extrabold font-outfit text-white mt-1">{item.value}</p>
                        <p className="text-xs text-indigo-300/80 mt-1 font-mono">{item.sub}</p>
                    </div>
                ))}
            </div>

            {/* Core Domains Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {coreDomains.map((domain) => (
                    <div
                        key={domain.title}
                        className="group p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-indigo-500/30 hover:bg-slate-900/80 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3.5 mb-4">
                                <div
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl border ${domain.color} group-hover:scale-105 transition-transform duration-300`}
                                >
                                    <i className={domain.icon}></i>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold font-outfit text-white">
                                    {domain.title}
                                </h3>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed mb-6">
                                {domain.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                            {domain.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06] font-mono"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Philosophy Banner */}
            <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-indigo-950/20 to-slate-900/90 border border-white/[0.08] backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold font-outfit text-white mb-2">
                        Seeking Engineering Excellence
                    </h3>
                    <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                        Interested in examining the engineering blueprints, architectural case studies, or reviewing technical implementations?
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link href="/work" className="cta-button whitespace-nowrap w-full sm:w-auto text-center justify-center">
                        <span>View Case Studies</span>
                        <i className="ri-arrow-right-line"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}

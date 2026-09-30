import Link from "next/link";

interface Article {
    title: string;
    description: string;
    date: string;
    readingTime: string;
    tag: string;
    slug: string;
    externalLink?: string;
}

const articles: Article[] = [
    {
        title: "The Architecture of Ambient Operating Systems in the Browser",
        description:
            "How we decoupled the window compositor, virtual file system, and WebGL fragment shader pipelines into isolated render loops sustaining 60 FPS without DOM thrashing.",
        date: "Jan 12, 2025",
        readingTime: "6 min read",
        tag: "Systems Architecture",
        slug: "ambient-os-architecture",
        externalLink: "/work/aether-os",
    },
    {
        title: "Zero-Latency State Normalization for High-Concurrency Frontends",
        description:
            "Designing bounded integer LRU indices to prevent z-index overflow and CSS repaint storms in multi-window graphical environments.",
        date: "Nov 28, 2024",
        readingTime: "4 min read",
        tag: "Performance Engineering",
        slug: "zero-latency-state",
        externalLink: "/work/aether-os",
    },
    {
        title: "Financial Ledger Invariants & Double-Entry Accounting in Modern Web Apps",
        description:
            "Enforcing mathematical idempotency, balance consistency checks, and transaction reconciliation in high-velocity accounting systems with PostgreSQL and Prisma.",
        date: "Oct 15, 2024",
        readingTime: "7 min read",
        tag: "Fintech & Data Integrity",
        slug: "financial-ledger-invariants",
        externalLink: "/work/finance-tracker",
    },
];

export default function Writing() {
    return (
        <section id="writing" className="py-12 sm:py-16 reveal active">
            {/* Section Header */}
            <div className="section-header mb-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
                    <i className="ri-quill-pen-line text-sm"></i> Technical Publications
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-white flex items-center justify-center md:justify-start gap-3">
                    <i className="ri-article-line text-purple-400"></i> Engineering Notes & Architecture
                </h2>
                <p className="text-slate-400 max-w-2xl text-base sm:text-lg mt-2">
                    Deep dives on systems design, real-time client runtimes, database invariants, and high-performance frontend engineering.
                </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article) => {
                    const href = article.externalLink || `/writing/${article.slug}`;

                    return (
                        <Link
                            key={article.title}
                            href={href}
                            className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-purple-500/30 hover:bg-slate-900/80 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 backdrop-blur-sm"
                        >
                            <div>
                                {/* Meta Header */}
                                <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono text-slate-400">
                                    <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                        {article.tag}
                                    </span>
                                    <span>{article.readingTime}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold font-outfit text-white group-hover:text-purple-200 transition-colors mb-3 leading-snug">
                                    {article.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                                    {article.description}
                                </p>
                            </div>

                            {/* Footer Link & Date */}
                            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                                <span className="font-mono text-slate-500">{article.date}</span>
                                <span className="inline-flex items-center gap-1 font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                                    <span>Read Analysis</span>
                                    <i className="ri-arrow-right-line text-sm transform transition-transform group-hover:translate-x-1"></i>
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

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
                <div className="resend-tag mb-3">
                    <i className="ri-quill-pen-line text-xs text-[#9281f7]"></i>
                    <span>Technical Publications</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-[#ffffff] tracking-[-0.03em] flex items-center justify-center md:justify-start gap-3">
                    <span>Engineering Notes &amp; Architecture</span>
                </h2>
                <p className="text-[#a1a4a5] max-w-2xl text-base sm:text-lg mt-3 leading-relaxed tracking-[-0.01em]">
                    Deep dives on systems design, real-time client runtimes, database invariants, and high-performance frontend engineering.
                </p>
            </div>

            {/* Articles Grid: 16px radius, #000000 card bg, 1px #292d30 border, zero drop shadows */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article) => {
                    const href = article.externalLink || `/writing/${article.slug}`;

                    return (
                        <Link
                            key={article.title}
                            href={href}
                            className="resend-card group flex flex-col justify-between p-6 sm:p-7 transition-colors duration-150 hover:border-[#9281f7]"
                        >
                            <div>
                                {/* Meta Header */}
                                <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono text-[#a1a4a5]">
                                    <span className="resend-tag text-[11px] py-0.5 px-2">
                                        {article.tag}
                                    </span>
                                    <span>{article.readingTime}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold font-outfit text-[#ffffff] group-hover:text-[#9281f7] transition-colors mb-3 leading-snug tracking-tight">
                                    {article.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-[#a1a4a5] leading-relaxed line-clamp-3 mb-6 tracking-[-0.01em]">
                                    {article.description}
                                </p>
                            </div>

                            {/* Footer Link & Date */}
                            <div className="pt-4 border-t border-[#292d30] flex items-center justify-between text-xs font-mono">
                                <span className="text-[#6e727a]">{article.date}</span>
                                <span className="inline-flex items-center gap-1 font-semibold text-[#9281f7] group-hover:text-[#baa7ff] transition-colors">
                                    <span>Read Analysis</span>
                                    <i className="ri-arrow-right-line text-xs transform transition-transform group-hover:translate-x-1"></i>
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

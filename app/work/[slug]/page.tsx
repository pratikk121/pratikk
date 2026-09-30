import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: "Project Not Found",
            description: "The requested architectural case study could not be found.",
        };
    }

    const title = `${project.title} | Case Study`;
    const description = project.description;

    return {
        title,
        description,
        keywords: [
            project.title,
            project.category,
            ...project.tags,
            "Pratik Kadole",
            "Systems Architecture",
            "Full Stack Engineering",
            "Case Study",
        ],
        openGraph: {
            title: `${project.title} - Engineering Case Study`,
            description,
            type: "article",
            url: `https://pratikkadole.dev/work/${project.slug}`,
            siteName: "Pratik Kadole Portfolio",
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} - Engineering Case Study`,
            description,
            creator: "@pratikkadole",
        },
        alternates: {
            canonical: `/work/${project.slug}`,
        },
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const currentIndex = projects.findIndex((p) => p.slug === slug);

    if (currentIndex === -1) {
        notFound();
    }

    const project = projects[currentIndex];
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

    const getCategoryBadgeStyles = (category: typeof project.category) => {
        switch (category) {
            case "Systems & OS":
                return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30";
            case "Fintech & AI":
                return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
            case "Commercial & CRM":
                return "bg-indigo-500/10 text-indigo-300 border-indigo-500/30";
            default:
                return "bg-white/10 text-slate-300 border-white/20";
        }
    };

    return (
        <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            {/* Sticky Navigation Subheader */}
            <div className="sticky top-[var(--nav-height)] z-20 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-slate-950/95 backdrop-blur-xl border-y border-white/[0.08] flex items-center justify-between gap-4 transition-all">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group"
                >
                    <i className="ri-arrow-left-line text-base transform transition-transform group-hover:-translate-x-1"></i>
                    <span>Back to Portfolio</span>
                </Link>

                <div className="flex items-center gap-2">
                    <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow-sm"
                    >
                        <i className="ri-external-link-line"></i>
                        <span className="hidden sm:inline">Live Demo</span>
                    </a>
                    {project.repoLink && (
                        <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 border border-white/10 transition-colors"
                        >
                            <i className="ri-github-line"></i>
                            <span className="hidden sm:inline">GitHub</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Case Study Header */}
            <section aria-label="Project Overview" className="mb-12">
                {/* Category & Status */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide border backdrop-blur-sm ${getCategoryBadgeStyles(
                            project.category
                        )}`}
                    >
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                        {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                        Flagship Case Study
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit text-white tracking-tight leading-[1.15] mb-6">
                    {project.title}
                </h1>

                {/* Subtitle / Overview Description */}
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8">
                    {project.description}
                </p>

                {/* Tech Stack Matrix Badges */}
                <div className="mb-8">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                        <i className="ri-cpu-line text-indigo-400"></i> Core Architectural Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 bg-slate-900/90 text-slate-200 rounded-lg text-xs sm:text-sm font-mono border border-white/[0.08] hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Direct Action CTAs */}
                <div className="flex flex-wrap gap-4 pt-2">
                    <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-button text-base px-6 py-3.5"
                    >
                        <span>Launch Live Experience</span>
                        <i className="ri-external-link-line text-lg"></i>
                    </a>
                    {project.repoLink && (
                        <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold rounded-full border border-white/10 hover:border-white/20 transition-all duration-200 inline-flex items-center gap-2.5 hover:-translate-y-0.5 text-sm"
                        >
                            <i className="ri-github-fill text-lg"></i>
                            <span>View Source Repository</span>
                        </a>
                    )}
                </div>
            </section>

            {/* Visual Hero Showcase Banner */}
            <div className="relative w-full h-[260px] sm:h-[340px] bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-950 rounded-2xl flex flex-col items-center justify-center mb-14 border border-white/[0.08] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0%,_transparent_70%)] opacity-70 pointer-events-none" />
                <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-900/80 border border-white/[0.15] flex items-center justify-center shadow-2xl backdrop-blur-md">
                    <i className={`${project.image} text-5xl sm:text-6xl text-indigo-300 drop-shadow-md`}></i>
                </div>
                <div className="relative z-10 mt-5 text-center px-4">
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                        {project.category} • Production Blueprint
                    </p>
                    <p className="text-sm font-medium text-slate-300 mt-1">
                        System Architecture & Technical Implementation Notes
                    </p>
                </div>
            </div>

            {/* Detailed Structured Case Study Body */}
            <section className="case-study-content mb-16">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </section>

            {/* Project Navigation Carousel Footer */}
            <nav className="border-t border-white/[0.1] pt-10 mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    href={`/work/${prevProject.slug}`}
                    className="group p-5 rounded-xl bg-slate-900/60 border border-white/[0.08] hover:border-indigo-500/40 hover:bg-slate-800/60 transition-all flex flex-col justify-between"
                >
                    <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5 group-hover:text-indigo-400 transition-colors">
                        <i className="ri-arrow-left-s-line"></i> Previous Case Study
                    </span>
                    <span className="text-base font-bold font-outfit text-white mt-2 group-hover:text-indigo-200 transition-colors">
                        {prevProject.title}
                    </span>
                </Link>

                <Link
                    href={`/work/${nextProject.slug}`}
                    className="group p-5 rounded-xl bg-slate-900/60 border border-white/[0.08] hover:border-indigo-500/40 hover:bg-slate-800/60 transition-all flex flex-col justify-between text-left sm:text-right"
                >
                    <span className="text-xs font-mono uppercase text-slate-400 flex items-center justify-start sm:justify-end gap-1.5 group-hover:text-indigo-400 transition-colors">
                        Next Case Study <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <span className="text-base font-bold font-outfit text-white mt-2 group-hover:text-indigo-200 transition-colors">
                        {nextProject.title}
                    </span>
                </Link>
            </nav>
        </main>
    );
}

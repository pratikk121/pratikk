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
                return "text-[#9281f7] border-[#292d30] bg-[#000000]";
            case "Fintech & AI":
                return "text-[#3ad389] border-[#292d30] bg-[#000000]";
            case "Commercial & CRM":
                return "text-[#3b9eff] border-[#292d30] bg-[#000000]";
            default:
                return "text-[#a1a4a5] border-[#292d30] bg-[#000000]";
        }
    };

    return (
        <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            {/* Sticky Navigation Subheader: 1px #292d30 border */}
            <div className="sticky top-[var(--nav-height)] z-20 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-[#000000]/90 backdrop-blur-md border-y border-[#292d30] flex items-center justify-between gap-4 transition-all">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#a1a4a5] hover:text-[#ffffff] transition-colors group"
                >
                    <i className="ri-arrow-left-line text-sm transform transition-transform group-hover:-translate-x-1"></i>
                    <span>Back to Portfolio</span>
                </Link>

                <div className="flex items-center gap-2">
                    <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resend-btn-ghost text-xs py-1.5 px-3"
                    >
                        <i className="ri-external-link-line text-xs"></i>
                        <span className="hidden sm:inline">Live Demo</span>
                    </a>
                    {project.repoLink && (
                        <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resend-btn-ghost text-xs py-1.5 px-3"
                        >
                            <i className="ri-github-line text-xs"></i>
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
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium border ${getCategoryBadgeStyles(
                            project.category
                        )}`}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {project.category}
                    </span>
                    <span className="text-xs font-mono text-[#6e727a] uppercase tracking-wider">
                        Flagship Case Study
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-5xl font-bold font-outfit text-[#ffffff] tracking-[-0.03em] leading-[1.15] mb-6">
                    {project.title}
                </h1>

                {/* Subtitle / Overview Description */}
                <p className="text-lg sm:text-xl text-[#a1a4a5] leading-relaxed max-w-3xl mb-8">
                    {project.description}
                </p>

                {/* Tech Stack Matrix Badges (6px radius, 1px #292d30 border) */}
                <div className="mb-8">
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a4a5] mb-3 flex items-center gap-2">
                        <i className="ri-cpu-line text-[#9281f7]"></i> Core Architectural Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="resend-tag font-mono text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Direct Action CTAs: 6px radius */}
                <div className="flex flex-wrap gap-3 pt-2">
                    <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resend-btn-ghost text-sm px-5 py-2.5 hover:border-[#ffffff]"
                    >
                        <span>Launch Live Experience</span>
                        <i className="ri-external-link-line text-sm"></i>
                    </a>
                    {project.repoLink && (
                        <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resend-btn-ghost text-sm px-5 py-2.5 text-[#9281f7] hover:border-[#9281f7]"
                        >
                            <i className="ri-github-fill text-sm"></i>
                            <span>View Source Repository</span>
                        </a>
                    )}
                </div>
            </section>

            {/* Visual Hero Showcase Banner: 16px radius, #0b0e14 bg, 1px #292d30 border, zero drop shadows */}
            <div className="relative w-full h-[240px] sm:h-[300px] bg-[#0b0e14] rounded-2xl flex flex-col items-center justify-center mb-14 border border-[#292d30] overflow-hidden">
                <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#000000] border border-[#292d30] flex items-center justify-center">
                    <i className={`${project.image} text-4xl sm:text-5xl text-[#9281f7]`}></i>
                </div>
                <div className="relative z-10 mt-5 text-center px-4">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a4a5]">
                        {project.category} • Production Blueprint
                    </p>
                    <p className="text-sm font-medium text-[#f0f0f0] mt-1">
                        System Architecture &amp; Technical Implementation Notes
                    </p>
                </div>
            </div>

            {/* Detailed Structured Case Study Body */}
            <section className="case-study-content mb-16">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </section>

            {/* Project Navigation Footer: 16px radius, #000000 card bg, 1px #292d30 border */}
            <nav className="border-t border-[#292d30] pt-10 mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    href={`/work/${prevProject.slug}`}
                    className="resend-card p-5 flex flex-col justify-between hover:border-[#9281f7] transition-colors"
                >
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a4a5] flex items-center gap-1.5">
                        <i className="ri-arrow-left-s-line"></i> Previous Case Study
                    </span>
                    <span className="text-base font-bold font-outfit text-[#ffffff] mt-2 tracking-tight">
                        {prevProject.title}
                    </span>
                </Link>

                <Link
                    href={`/work/${nextProject.slug}`}
                    className="resend-card p-5 flex flex-col justify-between text-left sm:text-right hover:border-[#9281f7] transition-colors"
                >
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a4a5] flex items-center justify-start sm:justify-end gap-1.5">
                        Next Case Study <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <span className="text-base font-bold font-outfit text-[#ffffff] mt-2 tracking-tight">
                        {nextProject.title}
                    </span>
                </Link>
            </nav>
        </main>
    );
}

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
            description: "The requested project could not be found.",
        };
    }

    const title = `${project.title} | Project Notes`;
    const description = project.description;

    return {
        title,
        description,
        openGraph: {
            title: `${project.title} | Pratik Kadole`,
            description,
            type: "article",
            url: `https://pratikk.site/work/${project.slug}`,
            siteName: "Pratik Kadole",
        },
        twitter: {
            card: "summary",
            title: `${project.title} | Pratik Kadole`,
            description,
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

    const getStatusStyle = (status: typeof project.status) => {
        switch (status) {
            case "Commercial":
                return "text-[#3ad389] border-[#292d30]";
            case "Active Project":
                return "text-[#3b9eff] border-[#292d30]";
            case "Experimental":
                return "text-[#9281f7] border-[#292d30]";
            case "Prototype":
                return "text-[#a1a4a5] border-[#292d30]";
            default:
                return "text-[#a1a4a5] border-[#292d30]";
        }
    };

    return (
        <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            {/* Sticky Navigation Subheader */}
            <div className="sticky top-[var(--nav-height)] z-20 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-[#000000]/90 backdrop-blur-md border-y border-[#292d30] flex items-center justify-between gap-4">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#a1a4a5] hover:text-[#ffffff] transition-colors group"
                >
                    <i className="ri-arrow-left-line text-sm transform transition-transform group-hover:-translate-x-1"></i>
                    <span>Back to Projects</span>
                </Link>

                <div className="flex items-center gap-2">
                    {project.demoLink && (
                        <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#292d30] text-xs font-medium text-[#f0f0f0] hover:border-[#ffffff] transition-colors"
                        >
                            <i className="ri-external-link-line text-xs"></i>
                            <span className="hidden sm:inline">Live Demo</span>
                        </a>
                    )}
                    <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#292d30] text-xs font-medium text-[#f0f0f0] hover:border-[#ffffff] transition-colors"
                    >
                        <i className="ri-github-fill text-xs"></i>
                        <span>Source Code</span>
                    </a>
                </div>
            </div>

            {/* Case Study Header */}
            <section aria-label="Project Overview" className="mb-12">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs border ${getStatusStyle(
                            project.status
                        )}`}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {project.status}
                    </span>
                    <span className="text-xs text-[#6e727a]">•</span>
                    <span className="text-xs text-[#a1a4a5]">{project.year}</span>
                    <span className="text-xs text-[#6e727a]">•</span>
                    <span className="text-xs text-[#a1a4a5]">{project.role}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold font-outfit text-[#ffffff] tracking-tight leading-[1.15] mb-5">
                    {project.title}
                </h1>

                <p className="text-lg sm:text-xl text-[#a1a4a5] leading-relaxed mb-8">
                    {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="mb-8">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#6e727a] mb-2.5">
                        Technologies Used
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 rounded-md text-xs border border-[#292d30] text-[#a1a4a5] bg-[#000000]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                    <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#ffffff] text-[#000000] font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                        <i className="ri-github-fill text-base"></i>
                        <span>Inspect Repository on GitHub</span>
                    </a>
                    {project.demoLink && (
                        <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#292d30] text-[#f0f0f0] font-medium text-sm hover:border-[#ffffff] hover:bg-white/[0.03] transition-all"
                        >
                            <span>Open Live Demo</span>
                            <i className="ri-external-link-line text-sm"></i>
                        </a>
                    )}
                </div>
            </section>

            {/* Structured Evidence Summary Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <div className="p-4 rounded-xl bg-[#0b0e14] border border-[#292d30]">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#6e727a] mb-1.5">
                        The Problem
                    </div>
                    <p className="text-xs sm:text-sm text-[#f0f0f0] leading-relaxed">
                        {project.problem}
                    </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0b0e14] border border-[#292d30]">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#6e727a] mb-1.5">
                        The Approach
                    </div>
                    <p className="text-xs sm:text-sm text-[#f0f0f0] leading-relaxed">
                        {project.approach}
                    </p>
                </div>
                <div className="p-4 rounded-xl bg-[#000000] border border-[#292d30]">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#6e727a] mb-1.5">
                        Key Decision
                    </div>
                    <p className="text-xs sm:text-sm text-[#a1a4a5] leading-relaxed">
                        {project.interestingDecision}
                    </p>
                </div>
                <div className="p-4 rounded-xl bg-[#000000] border border-[#292d30]">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#6e727a] mb-1.5">
                        Tradeoffs &amp; Constraints
                    </div>
                    <p className="text-xs sm:text-sm text-[#a1a4a5] leading-relaxed">
                        {project.tradeoffs}
                    </p>
                </div>
            </div>

            {/* Detailed Case Study Notes */}
            <section className="case-study-content mb-16">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </section>

            {/* Project Navigation Footer */}
            <nav className="border-t border-[#292d30] pt-8 mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    href={`/work/${prevProject.slug}`}
                    className="p-4 rounded-xl bg-[#000000] border border-[#292d30] flex flex-col justify-between hover:border-[#464a4d] transition-colors"
                >
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6e727a] flex items-center gap-1.5">
                        <i className="ri-arrow-left-s-line"></i> Previous Project
                    </span>
                    <span className="text-sm font-bold font-outfit text-[#ffffff] mt-2 tracking-tight">
                        {prevProject.title}
                    </span>
                </Link>

                <Link
                    href={`/work/${nextProject.slug}`}
                    className="p-4 rounded-xl bg-[#000000] border border-[#292d30] flex flex-col justify-between text-left sm:text-right hover:border-[#464a4d] transition-colors"
                >
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6e727a] flex items-center justify-start sm:justify-end gap-1.5">
                        Next Project <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <span className="text-sm font-bold font-outfit text-[#ffffff] mt-2 tracking-tight">
                        {nextProject.title}
                    </span>
                </Link>
            </nav>
        </main>
    );
}

import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";

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

  return {
    title: `${project.title} · Project Notes`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const getStatusBadge = (status: typeof project.status) => {
    switch (status) {
      case "Commercial":
        return "text-[#22c55e] border-[#1e2329] bg-[#22c55e]/10";
      case "Active Project":
        return "text-[#3b82f6] border-[#1e2329] bg-[#3b82f6]/10";
      case "Experimental":
        return "text-[#a855f7] border-[#1e2329] bg-[#a855f7]/10";
      default:
        return "text-[#889096] border-[#1e2329] bg-white/[0.03]";
    }
  };

  return (
    <article className="pt-20 sm:pt-24 pb-20 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs text-[#889096] hover:text-[#f0f2f5] transition-colors"
        >
          <ArrowLeft size={14} weight="bold" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Header Meta */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`px-2.5 py-0.5 rounded-md text-xs font-mono border ${getStatusBadge(
            project.status
          )}`}
        >
          {project.status}
        </span>
        <span className="text-xs text-[#555d65] font-mono">
          {project.year} · {project.role}
        </span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f0f2f5] mb-4">
        {project.title}
      </h1>

      <p className="text-base sm:text-lg text-[#889096] leading-relaxed mb-8">
        {project.description}
      </p>

      {/* Action Links */}
      <div className="flex flex-wrap items-center gap-3 pb-8 mb-10 border-b border-[#1e2329]">
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-white text-[#050505] text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <span>Live Demonstration</span>
            <ArrowUpRight size={13} weight="bold" />
          </a>
        )}
        <a
          href={project.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-[#1e2329] bg-[#0c0e12] text-xs font-medium text-[#f0f2f5] hover:border-[#38414a] transition-all"
        >
          <GithubLogo size={15} />
          <span>Inspect Repository</span>
          <ArrowUpRight size={13} weight="bold" />
        </a>
      </div>

      {/* Architecture Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <div className="p-4 rounded-xl bg-[#0c0e12] border border-[#1e2329]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#555d65] mb-1.5">
            The Problem
          </div>
          <p className="text-xs sm:text-sm text-[#f0f2f5] leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c0e12] border border-[#1e2329]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#555d65] mb-1.5">
            The Approach
          </div>
          <p className="text-xs sm:text-sm text-[#f0f2f5] leading-relaxed">
            {project.approach}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#050505] border border-[#1e2329]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#555d65] mb-1.5">
            Key Architectural Decision
          </div>
          <p className="text-xs sm:text-sm text-[#889096] leading-relaxed">
            {project.interestingDecision}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#050505] border border-[#1e2329]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#555d65] mb-1.5">
            Tradeoffs &amp; Constraints
          </div>
          <p className="text-xs sm:text-sm text-[#889096] leading-relaxed">
            {project.tradeoffs}
          </p>
        </div>
      </div>

      {/* Case Study HTML Content */}
      <div
        className="prose prose-invert max-w-none text-sm text-[#889096] space-y-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-[#f0f2f5] [&>h2]:pt-6 [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-[#f0f2f5] [&>ul]:list-disc [&>ul]:pl-5 [&>code]:bg-[#0c0e12] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-[#f0f2f5] [&>code]:font-mono"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />

      {/* Pagination Footer */}
      <nav className="border-t border-[#1e2329] pt-8 mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href={`/work/${prevProject.slug}`}
          className="p-4 rounded-xl bg-[#0c0e12] border border-[#1e2329] flex flex-col justify-between hover:border-[#38414a] transition-all"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-[#555d65] flex items-center gap-1.5">
            <ArrowLeft size={12} weight="bold" /> Previous Project
          </span>
          <span className="text-sm font-semibold text-[#f0f2f5] mt-2">
            {prevProject.title}
          </span>
        </Link>

        <Link
          href={`/work/${nextProject.slug}`}
          className="p-4 rounded-xl bg-[#0c0e12] border border-[#1e2329] flex flex-col justify-between text-left sm:text-right hover:border-[#38414a] transition-all"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-[#555d65] flex items-center justify-start sm:justify-end gap-1.5">
            Next Project <ArrowRight size={12} weight="bold" />
          </span>
          <span className="text-sm font-semibold text-[#f0f2f5] mt-2">
            {nextProject.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}

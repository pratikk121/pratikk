"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, ProjectCategory, ProjectStatus } from "@/data/projects";

type CategoryFilter = "All" | ProjectCategory;

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Systems & OS",
  "Web Applications",
  "Developer Tools & SaaS",
];

interface SelectedWorksProps {
  showHeader?: boolean;
}

export default function SelectedWorks({ showHeader = true }: SelectedWorksProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const getStatusBadge = (status: ProjectStatus) => {
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
    <section id="projects" className="py-8 sm:py-12">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#292d30]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-[#292d30] text-xs text-[#a1a4a5] mb-3">
              <span>Public Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-[#ffffff] tracking-tight">
              Selected Work
            </h2>
            <p className="text-[#a1a4a5] text-base mt-2 max-w-xl">
              Projects, prototypes, and open-source tools. Every item links to real code and demonstrates a specific set of tradeoffs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 md:pt-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#ffffff] text-[#000000] border-[#ffffff]"
                    : "bg-[#000000] text-[#a1a4a5] border-[#292d30] hover:text-[#ffffff] hover:border-[#464a4d]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="rounded-2xl bg-[#000000] border border-[#292d30] p-6 sm:p-7 flex flex-col justify-between hover:border-[#464a4d] transition-colors"
          >
            <div>
              {/* Card Header: Status, Year, Category */}
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#292d30]">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs border ${getStatusBadge(
                      project.status
                    )}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span>{project.status}</span>
                  </span>
                  <span className="text-xs text-[#6e727a]">•</span>
                  <span className="text-xs text-[#6e727a]">{project.year}</span>
                </div>
                <span className="text-xs text-[#6e727a]">{project.role}</span>
              </div>

              {/* Title & Description */}
              <div className="mb-4">
                <Link
                  href={`/work/${project.slug}`}
                  className="group inline-flex items-center gap-2 text-xl font-bold font-outfit text-[#ffffff] hover:text-[#9281f7] transition-colors"
                >
                  <span>{project.title}</span>
                  <i className="ri-arrow-right-up-line text-sm text-[#6e727a] group-hover:text-[#9281f7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                </Link>
                <p className="text-sm text-[#a1a4a5] leading-relaxed mt-2">
                  {project.description}
                </p>
              </div>

              {/* Why it exists / Problem */}
              <div className="mb-4 p-3 rounded-md bg-[#0b0e14] border border-[#292d30]/80">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6e727a] mb-1">
                  Why it exists
                </div>
                <p className="text-xs text-[#f0f0f0] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Tradeoff / Limitation */}
              <div className="mb-5 p-3 rounded-md bg-[#000000] border border-[#292d30]">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6e727a] mb-1">
                  Tradeoff &amp; Limitation
                </div>
                <p className="text-xs text-[#a1a4a5] leading-relaxed">
                  {project.tradeoffs}
                </p>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-xs border border-[#292d30] text-[#a1a4a5] bg-[#000000]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Action Links */}
            <div className="pt-4 border-t border-[#292d30] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#292d30] text-[#f0f0f0] hover:border-[#ffffff] hover:bg-white/[0.04] transition-all font-medium"
                >
                  <i className="ri-github-fill text-sm"></i>
                  <span>Repository</span>
                </a>

                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#292d30] text-[#a1a4a5] hover:text-[#ffffff] hover:border-[#464a4d] transition-all"
                  >
                    <i className="ri-external-link-line text-xs"></i>
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              <Link
                href={`/work/${project.slug}`}
                className="text-[#9281f7] hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>Read Notes</span>
                <i className="ri-arrow-right-line text-xs"></i>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

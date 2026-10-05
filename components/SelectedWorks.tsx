"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, ProjectCategory, ProjectStatus } from "@/data/projects";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";

type CategoryFilter = "All" | ProjectCategory;

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Systems & IoT",
  "Scientific & Simulation",
  "Web Applications",
  "Developer Tools & SaaS",
];

export default function SelectedWorks() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "Commercial":
        return "text-[#22c55e] border-[#1e2329] bg-[#22c55e]/10";
      case "Production Verified":
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
    <section id="projects" className="py-8 sm:py-12">
      {/* Header with Title and Category Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#1e2329]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-[#1e2329] text-xs text-[#889096] mb-3 bg-[#0c0e12]">
            <span>Verified Implementations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f0f2f5]">
            Selected Work
          </h2>
          <p className="text-[#889096] text-sm sm:text-base mt-2 max-w-xl">
            Projects, prototypes, and open source systems. Every item links to real code and demonstrates a specific set of architectural decisions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#ffffff] text-[#050505] border-[#ffffff]"
                  : "bg-[#0c0e12] text-[#889096] border-[#1e2329] hover:text-[#f0f2f5] hover:border-[#38414a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="flex flex-col justify-between rounded-xl bg-[#0c0e12] border border-[#1e2329] p-6 hover:border-[#38414a] transition-all group"
          >
            <div>
              {/* Card Meta Row */}
              <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                <span className="text-[#555d65] font-mono">
                  {project.category} · {project.year}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md border text-[11px] font-mono ${getStatusBadge(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#f0f2f5] group-hover:text-white transition-colors mb-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#889096] leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Problem / Decision Highlight */}
              <div className="p-3 rounded-lg bg-[#050505]/70 border border-[#1e2329] mb-5">
                <div className="text-[11px] uppercase tracking-wider text-[#555d65] font-semibold mb-1">
                  Key Decision
                </div>
                <p className="text-xs text-[#889096] leading-relaxed line-clamp-2">
                  {project.interestingDecision}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] bg-[#050505] text-[#889096] border border-[#1e2329] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Action Links */}
            <div className="pt-4 border-t border-[#1e2329] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#f0f2f5] hover:underline font-medium"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={12} weight="bold" />
                  </a>
                )}
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#889096] hover:text-[#f0f2f5] transition-colors"
                >
                  <GithubLogo size={14} />
                  <span>Source</span>
                </a>
              </div>

              <Link
                href={`/work/${project.slug}`}
                className="text-[#889096] hover:text-[#f0f2f5] transition-colors inline-flex items-center gap-1 font-medium"
              >
                <span>Deep dive</span>
                <ArrowUpRight size={12} weight="bold" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

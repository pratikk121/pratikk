"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project, ProjectCategory } from "@/data/projects";

type CategoryFilter = "All" | ProjectCategory;

const CATEGORIES: CategoryFilter[] = [
    "All",
    "Systems & OS",
    "Fintech & AI",
    "Commercial & CRM",
];

interface SelectedWorksProps {
    showHeader?: boolean;
}

export default function SelectedWorks({ showHeader = true }: SelectedWorksProps) {
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

    const filteredProjects = useMemo(() => {
        if (selectedCategory === "All") return projects;
        return projects.filter((project) => project.category === selectedCategory);
    }, [selectedCategory]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: projects.length };
        for (const cat of CATEGORIES.slice(1)) {
            counts[cat] = projects.filter((p) => p.category === cat).length;
        }
        return counts;
    }, []);

    // Category styling helper
    const getCategoryBadgeStyles = (category: Project["category"]) => {
        switch (category) {
            case "Systems & OS":
                return "bg-cyan-500/10 text-cyan-300 border-cyan-500/20";
            case "Fintech & AI":
                return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
            case "Commercial & CRM":
                return "bg-indigo-500/10 text-indigo-300 border-indigo-500/20";
            default:
                return "bg-white/10 text-slate-300 border-white/10";
        }
    };

    return (
        <section id="projects" className="py-12 sm:py-16 md:py-20">
            {showHeader && (
                <div className="section-header mb-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
                        <i className="ri-code-s-slash-line text-sm"></i> Architecture & Engineering
                    </div>
                    <h2 className="section-title text-3xl md:text-4xl font-bold font-outfit text-white flex items-center justify-center md:justify-start gap-3">
                        <i className="ri-stack-line text-indigo-400"></i> Selected Works
                    </h2>
                    <p className="section-subtitle text-slate-400 max-w-2xl text-base md:text-lg mt-2">
                        A curated showcase of production platforms, distributed systems, ambient operating systems, and high-performance commercial architectures.
                    </p>
                </div>
            )}

            {/* Filter Tabs */}
            <div className="mb-10 flex flex-wrap items-center gap-2 justify-center md:justify-start">
                {CATEGORIES.map((category) => {
                    const isActive = selectedCategory === category;
                    const count = categoryCounts[category] || 0;

                    return (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none flex items-center gap-2 ${
                                isActive
                                    ? "text-white font-semibold shadow-lg shadow-indigo-500/20"
                                    : "text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/5"
                            }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="activeFilterPill"
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 border border-indigo-400/30"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{category}</span>
                            <span
                                className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none ${
                                    isActive
                                        ? "bg-white/20 text-white"
                                        : "bg-white/5 text-slate-400 border border-white/10"
                                }`}
                            >
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Projects Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.article
                            layout
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.3 }}
                            className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden backdrop-blur-sm"
                        >
                            {/* Card Top: Visual Header */}
                            <div>
                                <div className="relative h-48 sm:h-52 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 flex items-center justify-center border-b border-white/[0.06] overflow-hidden">
                                    {/* Ambient Glow */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Category Pill Badge (Top Left) */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide border backdrop-blur-md shadow-sm ${getCategoryBadgeStyles(
                                                project.category
                                            )}`}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Project Main Visual Icon */}
                                    <div className="relative z-0 transform transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shadow-inner group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-all duration-300">
                                            <i
                                                className={`${project.image} text-4xl text-slate-400 group-hover:text-indigo-300 transition-colors`}
                                            ></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold font-outfit text-white mb-2 group-hover:text-indigo-200 transition-colors">
                                        <Link href={`/work/${project.slug}`} className="hover:underline focus:outline-none">
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack Badges */}
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {project.tags.slice(0, 4).map((tag) => (
                                             <span
                                                key={tag}
                                                className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06] font-mono tracking-tight hover:border-white/20 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 4 && (
                                            <span className="text-xs px-2 py-1 rounded-md bg-white/[0.02] text-slate-500 border border-white/[0.04] font-mono">
                                                +{project.tags.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="px-6 py-4 bg-slate-950/40 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white text-slate-200 hover:text-black transition-all duration-200"
                                        title="Live Demo / Deployment"
                                    >
                                        <i className="ri-external-link-line text-sm"></i>
                                        <span>Live Demo</span>
                                    </a>

                                    {project.repoLink && (
                                        <a
                                            href={project.repoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-all duration-200"
                                            title="GitHub Repository"
                                        >
                                            <i className="ri-github-line text-sm"></i>
                                            <span>Source</span>
                                        </a>
                                    )}
                                </div>

                                <Link
                                    href={`/work/${project.slug}`}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors ml-auto group/link"
                                >
                                    <span>Read Case Study</span>
                                    <i className="ri-arrow-right-line text-sm transform transition-transform group-hover/link:translate-x-1"></i>
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

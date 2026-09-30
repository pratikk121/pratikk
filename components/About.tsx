"use client";

import { useState } from "react";

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "databases" | "cloud";
  connections: string[];
  level: string;
  icon: string;
}

const TECH_MATRIX: SkillItem[] = [
  // Frontend
  {
    name: "React 19",
    category: "frontend",
    connections: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    level: "Core Architecture",
    icon: "ri-reactjs-line",
  },
  {
    name: "Next.js 16",
    category: "frontend",
    connections: ["React 19", "TypeScript", "Vercel Edge", "PostgreSQL"],
    level: "App Router & RSC",
    icon: "ri-nextjs-line",
  },
  {
    name: "TypeScript",
    category: "frontend",
    connections: ["React 19", "Next.js 16", "FastAPI", "Prisma ORM"],
    level: "Strict Mode",
    icon: "ri-code-s-slash-line",
  },
  {
    name: "Tailwind CSS v4",
    category: "frontend",
    connections: ["React 19", "Next.js 16", "Framer Motion"],
    level: "Oxide Engine",
    icon: "ri-css3-line",
  },
  {
    name: "WebGL / GLSL",
    category: "frontend",
    connections: ["TypeScript", "Framer Motion"],
    level: "GPU Shaders",
    icon: "ri-sparkling-2-line",
  },
  {
    name: "Framer Motion 12",
    category: "frontend",
    connections: ["React 19", "Tailwind CSS v4"],
    level: "Gesture & Springs",
    icon: "ri-motion-line",
  },

  // Backend
  {
    name: "FastAPI",
    category: "backend",
    connections: ["Python", "PostgreSQL", "Docker", "RESTful APIs"],
    level: "Async IO",
    icon: "ri-flashlight-line",
  },
  {
    name: "Python",
    category: "backend",
    connections: ["FastAPI", "PostgreSQL", "Docker"],
    level: "Systems & Scripting",
    icon: "ri-terminal-box-line",
  },
  {
    name: "Node.js",
    category: "backend",
    connections: ["TypeScript", "Next.js 16", "Docker"],
    level: "Server Runtime",
    icon: "ri-nodejs-line",
  },
  {
    name: "RESTful APIs",
    category: "backend",
    connections: ["FastAPI", "Next.js 16", "PostgreSQL"],
    level: "API Gateways",
    icon: "ri-cpu-line",
  },
  {
    name: "Server Actions",
    category: "backend",
    connections: ["Next.js 16", "React 19", "PostgreSQL"],
    level: "Optimistic Mutations",
    icon: "ri-swap-line",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "databases",
    connections: ["Prisma ORM", "FastAPI", "Neon Serverless"],
    level: "Relational Schemas",
    icon: "ri-database-2-line",
  },
  {
    name: "Neon Serverless",
    category: "databases",
    connections: ["PostgreSQL", "Next.js 16", "Prisma ORM"],
    level: "Connection Pooling",
    icon: "ri-hard-drive-3-line",
  },
  {
    name: "Prisma ORM",
    category: "databases",
    connections: ["PostgreSQL", "TypeScript", "Next.js 16"],
    level: "Type-Safe Models",
    icon: "ri-table-line",
  },
  {
    name: "IndexedDB VFS",
    category: "databases",
    connections: ["WebGL / GLSL", "TypeScript"],
    level: "Client Persistence",
    icon: "ri-inbox-archive-line",
  },

  // Cloud & DevOps
  {
    name: "Vercel Edge",
    category: "cloud",
    connections: ["Next.js 16", "React 19"],
    level: "Edge Runtime",
    icon: "ri-global-line",
  },
  {
    name: "Docker",
    category: "cloud",
    connections: ["FastAPI", "Python", "Node.js"],
    level: "Containerization",
    icon: "ri-archive-stack-line",
  },
  {
    name: "Git & CI/CD",
    category: "cloud",
    connections: ["Vercel Edge", "Docker"],
    level: "Continuous Delivery",
    icon: "ri-git-branch-line",
  },
];

export default function About() {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [selectedTechCategory, setSelectedTechCategory] = useState<
    "all" | "frontend" | "backend" | "databases" | "cloud"
  >("all");
  const [hoveredTech, setHoveredTech] = useState<SkillItem | null>(null);

  const pillars = [
    {
      id: 0,
      title: "Full-Stack Engineering",
      subtitle: "End-to-End Modern Architecture",
      icon: "ri-code-box-line",
      accent: "#9281f7",
      badge: "Next.js 16 & React 19",
      description:
        "Building production-grade web systems from initial data modeling to polished user interaction. Emphasizing strict TypeScript types, server components, and component modularity.",
      metrics: [
        { label: "Type Safety", value: "100%", sub: "Zero any policy" },
        { label: "Core Web Vitals", value: "100/100", sub: "Sub-second FCP" },
        { label: "Bundle Overhead", value: "<45 KB", sub: "Modular tree shaking" },
      ],
      stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "FastAPI"],
    },
    {
      id: 1,
      title: "Systems & APIs",
      subtitle: "Resilient Asynchronous Pipelines",
      icon: "ri-cpu-line",
      accent: "#3ad389",
      badge: "FastAPI & PostgreSQL",
      description:
        "Architecting normalized relational schemas, asynchronous query execution, and high-concurrency microservices with automated transaction safety and low P99 latencies.",
      metrics: [
        { label: "P99 API Latency", value: "<42ms", sub: "FastAPI async IO" },
        { label: "DB Pooling", value: "Neon", sub: "Serverless scaling" },
        { label: "State Sync", value: "0ms UI", sub: "Optimistic updates" },
      ],
      stack: ["Python", "FastAPI", "PostgreSQL", "Prisma ORM", "Docker"],
    },
    {
      id: 2,
      title: "UI/UX & Interactive Craft",
      subtitle: "Tactile Motion & GPU Shaders",
      icon: "ri-sparkling-2-line",
      accent: "#3b9eff",
      badge: "WebGL & Framer Motion",
      description:
        "Designing tactile, sensory interfaces that respond with weight, physics, and delight. Crafting custom GLSL shaders and fluid spring interactions without frame drops.",
      metrics: [
        { label: "Framerate", value: "60.0 FPS", sub: "Hardware accelerated" },
        { label: "Layout Shift", value: "0.00 CLS", sub: "Predictable sizing" },
        { label: "Micro-Interactions", value: "Tactile", sub: "Spring physics" },
      ],
      stack: ["WebGL / GLSL", "Framer Motion 12", "Web Audio API", "Tailwind CSS"],
    },
  ];

  const filteredTech = TECH_MATRIX.filter((item) =>
    selectedTechCategory === "all" ? true : item.category === selectedTechCategory
  );

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 reveal active">
      {/* Section Header */}
      <div className="section-header mb-12 text-center md:text-left">
        <div className="resend-tag mb-3">
          <i className="ri-user-smile-line text-xs text-[#9281f7]"></i>
          <span>Philosophy &amp; Engineering Craft</span>
        </div>
        <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold font-outfit text-[#ffffff] tracking-[-0.03em]">
          Architecture meets human utility.
        </h2>
        <p className="section-subtitle text-[#a1a4a5] max-w-2xl text-base md:text-lg mt-3 leading-relaxed tracking-[-0.01em]">
          Bridging system-level reliability with high-craft user interfaces. Every layer is intentional: strict invariants at the database, low P99 latencies at the API, and 60 FPS fluid rendering on the glass.
        </p>
      </div>

      {/* 3 Core Architecture Pillars: Resend Cards (16px radius, #000000 bg, 1px #292d30 border, zero drop shadows) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {pillars.map((pillar) => {
          const isSelected = activePillar === pillar.id;

          return (
            <div
              key={pillar.id}
              onClick={() => setActivePillar(pillar.id)}
              className={`resend-card p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-colors duration-150 ${
                isSelected ? "border-[#9281f7]" : "hover:border-[#464a4d]"
              }`}
            >
              <div>
                {/* Header Strip with 6px Icon & Badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-9 h-9 rounded-md bg-[#0b0e14] border border-[#292d30] flex items-center justify-center text-lg text-[#ffffff]">
                    <i className={pillar.icon} style={{ color: pillar.accent }}></i>
                  </div>
                  <span className="resend-tag font-mono text-[11px]">
                    {pillar.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-bold font-outfit text-[#ffffff] tracking-tight mb-1">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono text-[#a1a4a5] mb-4">
                  {pillar.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-[#a1a4a5] leading-relaxed mb-6 font-normal">
                  {pillar.description}
                </p>
              </div>

              <div>
                {/* Pillar Performance Metrics (1px #292d30 border, 6px radius) */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#292d30] mb-4">
                  {pillar.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-xs font-bold font-mono text-[#ffffff]">
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-[#a1a4a5] truncate">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stack Pills (6px radius) */}
                <div className="flex flex-wrap gap-1.5">
                  {pillar.stack.map((item) => (
                    <span
                      key={item}
                      className="resend-tag text-[10px] font-mono py-0.5 px-2"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Systems Matrix: 16px radius, #000000 card bg, 1px #292d30 border */}
      <div className="resend-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#292d30]">
          <div>
            <div className="resend-tag mb-2 font-mono text-[11px]">
              <span>Interactive Knowledge Graph</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-outfit text-[#ffffff] tracking-tight">
              Production Technology Stack
            </h3>
            <p className="text-xs sm:text-sm text-[#a1a4a5] mt-1">
              Hover over technologies to illuminate dependency topologies and architectural linkages.
            </p>
          </div>

          {/* Category Filter Tabs: 1px #292d30 border, 6px radius */}
          <div className="refero-tabs p-1 rounded-md bg-[#000000] border border-[#292d30] self-start md:self-center">
            {(
              [
                { id: "all", label: "Full Matrix" },
                { id: "frontend", label: "Frontend" },
                { id: "backend", label: "Backend" },
                { id: "databases", label: "Databases" },
                { id: "cloud", label: "Cloud & Ops" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTechCategory(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedTechCategory === tab.id
                    ? "bg-[#0b0e14] text-[#ffffff] border border-[#292d30] font-semibold"
                    : "text-[#a1a4a5] hover:text-[#ffffff]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Skills Grid: 1px #292d30 border, 6px radius */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {filteredTech.map((tech) => {
            const isHovered = hoveredTech?.name === tech.name;
            const isConnected =
              hoveredTech &&
              (hoveredTech.connections.includes(tech.name) ||
                tech.connections.includes(hoveredTech.name));

            return (
              <div
                key={tech.name}
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`p-3 rounded-md border text-left transition-colors duration-150 cursor-default select-none ${
                  isHovered
                    ? "bg-[#0b0e14] border-[#9281f7] text-[#ffffff]"
                    : isConnected
                    ? "bg-[#0b0e14] border-[#3b9eff] text-[#ffffff]"
                    : "bg-[#000000] border-[#292d30] hover:border-[#464a4d] text-[#a1a4a5]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <i className={`${tech.icon} text-base ${isHovered ? "text-[#9281f7]" : isConnected ? "text-[#3b9eff]" : "text-[#a1a4a5]"}`}></i>
                  <span className="text-[10px] font-mono text-[#6e727a] uppercase">
                    {tech.category.slice(0, 3)}
                  </span>
                </div>
                <div className="text-xs font-semibold font-mono text-[#f0f0f0] truncate">
                  {tech.name}
                </div>
                <div className="text-[10px] text-[#6e727a] truncate mt-0.5">
                  {tech.level}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dependency Topology Footer */}
        {hoveredTech && (
          <div className="mt-6 pt-4 border-t border-[#292d30] flex flex-wrap items-center gap-2 text-xs font-mono text-[#a1a4a5]">
            <span className="text-[#9281f7] font-semibold">{hoveredTech.name}</span>
            <span>directly integrates with:</span>
            {hoveredTech.connections.map((conn) => (
              <span
                key={conn}
                className="px-2 py-0.5 rounded-md bg-[#000000] border border-[#292d30] text-[#f0f0f0]"
              >
                {conn}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

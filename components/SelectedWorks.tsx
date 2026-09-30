"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LiquidGlassPreview from "@/components/LiquidGlassPreview";
import { projects, ProjectCategory } from "@/data/projects";

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

const SCOPE_ADDONS = [
  { id: "core", name: "Core Next.js Engine", cost: 3500, weeks: 2 },
  { id: "3d", name: "WebGL 3D / Shaders", cost: 2400, weeks: 1.5 },
  { id: "auth", name: "Auth & RBAC Roles", cost: 1800, weeks: 1 },
  { id: "stripe", name: "Stripe Billing & Subscriptions", cost: 2200, weeks: 1.5 },
];

const CHART_PATHS = {
  Q1: "M 0,80 Q 50,70 100,55 T 200,60 T 300,35 T 400,20",
  Q2: "M 0,90 Q 60,65 120,45 T 220,50 T 320,25 T 400,10",
  Q3: "M 0,75 Q 70,80 140,50 T 240,40 T 310,20 T 400,15",
  Q4: "M 0,85 Q 50,55 110,60 T 210,35 T 310,18 T 400,5",
};

const CHART_TOTALS = {
  Q1: { total: "$124,500", growth: "+14.2% MoM", ratio: "99.4%" },
  Q2: { total: "$168,200", growth: "+18.4% MoM", ratio: "99.8%" },
  Q3: { total: "$210,800", growth: "+22.1% MoM", ratio: "99.9%" },
  Q4: { total: "$285,400", growth: "+26.8% MoM", ratio: "100%" },
};

interface Deal {
  id: string;
  name: string;
  company: string;
  amount: number;
  stage: "qualified" | "proposal" | "won";
}

export default function SelectedWorks({ showHeader = true }: SelectedWorksProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  // FinanceTracker Interactive Widget State
  const [financeQuarter, setFinanceQuarter] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q2");
  const [financeCategory, setFinanceCategory] = useState<"all" | "cloud" | "saas">("all");

  // Devlogic Interactive Scope Calculator State
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "core",
    "auth",
  ]);

  // Precision CRM Interactive Kanban Board State
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "deal-1",
      name: "Apex Cloud Migration",
      company: "Acme Enterprise",
      amount: 42000,
      stage: "qualified",
    },
    {
      id: "deal-2",
      name: "Fintech Core Gateway",
      company: "Stratos Bank",
      amount: 68000,
      stage: "proposal",
    },
    {
      id: "deal-3",
      name: "High-Q Data Platform",
      company: "Helios AI Labs",
      amount: 94000,
      stage: "won",
    },
  ]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scopeCalculations = useMemo(() => {
    const baseCost = 2000;
    const baseWeeks = 1;
    const selected = SCOPE_ADDONS.filter((a) => selectedAddons.includes(a.id));
    const total = selected.reduce((sum, a) => sum + a.cost, baseCost);
    const weeks = selected.reduce((sum, a) => sum + a.weeks, baseWeeks);
    return { total, weeks };
  }, [selectedAddons]);

  const advanceDeal = (dealId: string) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          const nextStage: Record<Deal["stage"], Deal["stage"]> = {
            qualified: "proposal",
            proposal: "won",
            won: "qualified",
          };
          return { ...deal, stage: nextStage[deal.stage] };
        }
        return deal;
      })
    );
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: projects.length,
    };
    for (const cat of ["Systems & OS", "Fintech & AI", "Commercial & CRM"] as ProjectCategory[]) {
      counts[cat] = projects.filter((p) => p.category === cat).length;
    }
    return counts;
  }, []);

  const isFiltered = selectedCategory !== "All";

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20">
      {showHeader && (
        <div className="section-header mb-10 text-center md:text-left">
          {/* Header Tag with Pulse Green Dot */}
          <div className="resend-tag mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ad389]"></span>
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold font-outfit text-[#ffffff] tracking-[-0.03em] flex items-center justify-center md:justify-start gap-3">
            <span>Selected Projects</span>
          </h2>
          <p className="section-subtitle text-[#a1a4a5] max-w-3xl text-base md:text-lg mt-3 leading-relaxed tracking-[-0.01em]">
            Production-grade systems, browser operating environments, and commercial platforms engineered for speed, reliability, and human utility.
          </p>
        </div>
      )}

      {/* Category Filter Tabs: Resend minimal tabs with 1px #292d30 border, 6px radius, #a1a4a5 text, active in #ffffff with Iris Violet indicator */}
      <div className="mb-10 flex flex-wrap items-center justify-center md:justify-start">
        <div className="refero-tabs p-1 rounded-md bg-[#000000] border border-[#292d30]">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const count = categoryCounts[category] || 0;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer select-none flex items-center gap-2 ${
                  isActive
                    ? "text-[#ffffff] font-semibold"
                    : "text-[#a1a4a5] hover:text-[#ffffff]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-md bg-[#0b0e14] border border-[#292d30]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#9281f7]"></span>}
                  <span>{category}</span>
                </span>
                <span
                  className={`relative z-10 px-1.5 py-0.5 rounded-md text-[11px] font-mono leading-none ${
                    isActive
                      ? "bg-[#000000] text-[#9281f7] border border-[#292d30]"
                      : "bg-[#000000] text-[#6e727a] border border-[#292d30]/60"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Showcase Grid: 16px radius, 32px padding, pure #000000 card bg, 1px #292d30 border, hover #464a4d or #9281f7, zero drop shadows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {/* Card 1: AetherOS (Span 2 cols on lg) */}
          {(selectedCategory === "All" || selectedCategory === "Systems & OS") && (
            <motion.article
              key="aether-os"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className={`${isFiltered ? "lg:col-span-3" : "lg:col-span-2"} flex flex-col`}
            >
              <div className="resend-card p-6 sm:p-8 flex flex-col justify-between h-full hover:border-[#9281f7]">
                <div>
                  {/* Top Meta Strip: Status dot in #3ad389 with category label in #a1a4a5 */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="resend-tag">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3ad389]"></span>
                        <span>Systems &amp; OS</span>
                      </span>
                      <span className="text-xs font-mono text-[#a1a4a5] hidden sm:inline">
                        In-Browser Microkernel
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#a1a4a5]">
                      <span className="text-[#9281f7] font-semibold">GPU Accelerated</span>
                      <span className="text-[#464a4d]">·</span>
                      <span>Zero Runtime Deps</span>
                    </div>
                  </div>

                  {/* Product Preview Frame Inside: 1px #292d30 border, #0b0e14 bg, 16px radius */}
                  <div className="mb-6 rounded-2xl overflow-hidden border border-[#292d30] bg-[#0b0e14]">
                    <LiquidGlassPreview />
                  </div>

                  {/* Title in #ffffff font-bold tracking-tight */}
                  <h3 className="text-xl sm:text-2xl font-bold font-outfit text-[#ffffff] tracking-tight mb-2">
                    <Link href="/work/aether-os" className="hover:text-[#9281f7] transition-colors">
                      AetherOS
                    </Link>
                  </h3>

                  {/* Project Description */}
                  <p className="text-sm sm:text-base text-[#a1a4a5] leading-relaxed mb-5 font-normal tracking-[-0.01em]">
                    Event-driven ambient browser desktop environment and window compositor featuring GPU-accelerated liquid glass shaders, procedural soundscapes, and persistent virtual filesystem serialization.
                  </p>

                  {/* Tags: 1px #292d30 border, 6px radius, text in #a1a4a5 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      "TypeScript",
                      "WebGL & GLSL",
                      "Web Audio API",
                      "IndexedDB",
                      "Virtual File System",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="resend-tag font-mono text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lower Meta Strip & Ghost on Black Action Buttons (6px radius) */}
                <div className="pt-5 border-t border-[#292d30] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-md bg-[#0b0e14] border border-[#292d30] flex items-center justify-center text-lg text-[#9281f7] shrink-0">
                      <i className="ri-computer-line"></i>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold font-outfit text-[#ffffff] tracking-tight truncate">
                        AetherOS Core
                      </h4>
                      <p className="text-xs text-[#a1a4a5] truncate">
                        Ambient Desktop OS &amp; Window Compositor
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap ml-auto">
                    <a
                      href="/sandbox/pratikOS/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resend-btn-ghost text-xs py-1.5 px-3"
                    >
                      <i className="ri-external-link-line text-xs"></i>
                      <span>Demo</span>
                    </a>
                    <a
                      href="https://github.com/pratikk121/Ather_os"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resend-btn-ghost text-xs py-1.5 px-3"
                      title="GitHub Repository"
                    >
                      <i className="ri-github-line text-xs"></i>
                      <span>Code</span>
                    </a>
                    <Link
                      href="/work/aether-os"
                      className="resend-btn-ghost text-xs py-1.5 px-3 text-[#9281f7] hover:border-[#9281f7]"
                    >
                      <span>Case Study</span>
                      <i className="ri-arrow-right-line text-xs"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Card 2: FinanceTracker (Dark Financial Terminal with Iris Violet & Pulse Green trend lines) */}
          {(selectedCategory === "All" || selectedCategory === "Fintech & AI") && (
            <motion.article
              key="finance-tracker"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className={`${
                isFiltered && selectedCategory === "Fintech & AI" ? "lg:col-span-3" : "lg:col-span-1"
              } flex flex-col`}
            >
              <div className="resend-card p-6 sm:p-8 flex flex-col justify-between h-full hover:border-[#9281f7]">
                <div>
                  {/* Top Meta Strip: Status dot in #3ad389 with category label in #a1a4a5 */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="resend-tag">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3ad389]"></span>
                      <span>Fintech &amp; AI</span>
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#3ad389]">
                      {CHART_TOTALS[financeQuarter].growth}
                    </span>
                  </div>

                  {/* Product Preview Frame: 1px #292d30 border, #0b0e14 bg, 16px radius */}
                  <div className="mb-5 p-4 rounded-2xl bg-[#0b0e14] border border-[#292d30] select-none">
                    {/* Quarter Switcher Tabs (6px radius) */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#292d30] mb-3">
                      <span className="text-xs font-bold text-[#ffffff] flex items-center gap-1.5 font-outfit">
                        <i className="ri-line-chart-line text-[#9281f7]"></i>
                        Cash Flow Velocity
                      </span>
                      <div className="flex items-center gap-1 p-0.5 rounded-md bg-[#000000] border border-[#292d30]">
                        {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
                          <button
                            key={q}
                            onClick={() => setFinanceQuarter(q)}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                              financeQuarter === q
                                ? "bg-[#0b0e14] text-[#9281f7] border border-[#9281f7]"
                                : "text-[#a1a4a5] hover:text-[#ffffff]"
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Live Counter */}
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="text-[10px] uppercase font-mono text-[#a1a4a5]">Reconciled Ledger</div>
                        <div className="text-xl font-bold font-mono text-[#ffffff] tracking-tight">
                          {CHART_TOTALS[financeQuarter].total}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-mono text-[#a1a4a5]">Accuracy</div>
                        <div className="text-xs font-mono font-bold text-[#3ad389]">
                          {CHART_TOTALS[financeQuarter].ratio} Match
                        </div>
                      </div>
                    </div>

                    {/* Dark Financial Terminal Chart with Iris Violet (#9281f7) & Pulse Green (#3ad389) Lines */}
                    <div className="relative h-20 w-full mb-3 overflow-hidden rounded-md bg-[#000000] border border-[#292d30]/70 p-1">
                      <svg
                        viewBox="0 0 400 100"
                        className="w-full h-full overflow-visible"
                      >
                        <defs>
                          <linearGradient id="violetTrendGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#9281f7" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#9281f7" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Area Fill in Iris Violet */}
                        <path
                          d={`${CHART_PATHS[financeQuarter]} L 400,100 L 0,100 Z`}
                          fill="url(#violetTrendGlow)"
                          className="transition-all duration-500 ease-out"
                        />
                        {/* Iris Violet Trend Line */}
                        <path
                          d={CHART_PATHS[financeQuarter]}
                          fill="none"
                          stroke="#9281f7"
                          strokeWidth="2"
                          className="transition-all duration-500 ease-out"
                        />
                        {/* Pulse Green Live Point */}
                        <circle cx="395" cy="12" r="3.5" fill="#3ad389" className="animate-ping" />
                        <circle cx="395" cy="12" r="3.5" fill="#3ad389" />
                      </svg>
                    </div>

                    {/* Interactive Category Filter Pills (6px radius) */}
                    <div className="flex items-center gap-1.5 pt-2 border-t border-[#292d30]">
                      {(["all", "cloud", "saas"] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFinanceCategory(cat)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            financeCategory === cat
                              ? "bg-[#000000] text-[#9281f7] border border-[#9281f7]"
                              : "bg-[#000000] text-[#a1a4a5] hover:text-[#ffffff] border border-[#292d30]"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                      <span className="text-[10px] font-mono text-[#3ad389] ml-auto flex items-center gap-1">
                        <i className="ri-shield-check-line"></i> FastAPI Async
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-outfit text-[#ffffff] tracking-tight mb-2">
                    <Link href="/work/finance-tracker" className="hover:text-[#9281f7] transition-colors">
                      FinanceTracker
                    </Link>
                  </h3>

                  {/* Project Description */}
                  <p className="text-sm text-[#a1a4a5] leading-relaxed mb-5 font-normal tracking-[-0.01em]">
                    Automated accounting and ledger platform engineered with FastAPI and PostgreSQL, featuring asynchronous transaction ingestion, automated AI categorization, and real-time cash flow analytics.
                  </p>

                  {/* Tags: 1px #292d30 border, 6px radius */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {["FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "React 19", "Tailwind CSS"].map((tag) => (
                      <span
                        key={tag}
                        className="resend-tag font-mono text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lower Meta Strip & Actions */}
                <div className="pt-5 border-t border-[#292d30] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-md bg-[#0b0e14] border border-[#292d30] flex items-center justify-center text-lg text-[#3ad389] shrink-0">
                      <i className="ri-line-chart-line"></i>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold font-outfit text-[#ffffff] tracking-tight truncate">
                        FinanceTracker
                      </h4>
                      <p className="text-xs text-[#a1a4a5] truncate">
                        AI Ledger Engine
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap ml-auto">
                    <a
                      href="https://github.com/pratikk121/fianace_tracker"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resend-btn-ghost text-xs py-1.5 px-3"
                    >
                      <i className="ri-github-line text-xs"></i>
                      <span>Code</span>
                    </a>
                    <Link
                      href="/work/finance-tracker"
                      className="resend-btn-ghost text-xs py-1.5 px-3 text-[#9281f7] hover:border-[#9281f7]"
                    >
                      <span>Case Study</span>
                      <i className="ri-arrow-right-line text-xs"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Card 3: Devlogic Systems (Interactive Scope Engine with 1px graphite pill toggles) */}
          {(selectedCategory === "All" || selectedCategory === "Commercial & CRM") && (
            <motion.article
              key="devlogic-systems"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className={`${
                isFiltered && selectedCategory === "Commercial & CRM" ? "lg:col-span-1" : "lg:col-span-1"
              } flex flex-col`}
            >
              <div className="resend-card p-6 sm:p-8 flex flex-col justify-between h-full hover:border-[#9281f7]">
                <div>
                  {/* Top Meta Strip: Status dot in #3ad389 with category label in #a1a4a5 */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="resend-tag">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3ad389]"></span>
                      <span>Commercial Platform</span>
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#3b9eff]">
                      100/100 Vitals
                    </span>
                  </div>

                  {/* Product Preview Frame: 1px #292d30 border, #0b0e14 bg, 16px radius */}
                  <div className="mb-5 p-4 rounded-2xl bg-[#0b0e14] border border-[#292d30] select-none">
                    <div className="flex items-center justify-between text-xs text-[#a1a4a5] mb-3">
                      <span className="flex items-center gap-1.5 font-bold text-[#ffffff] font-outfit">
                        <i className="ri-calculator-line text-[#9281f7]"></i>
                        Interactive Scope Engine
                      </span>
                      <span className="text-[10px] font-mono text-[#9281f7] px-2 py-0.5 rounded-md bg-[#000000] border border-[#292d30]">
                        Live Estimator
                      </span>
                    </div>

                    {/* Interactive Scope Addon Toggles with 1px graphite (#292d30) borders and 6px radius */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {SCOPE_ADDONS.map((addon) => {
                        const isSelected = selectedAddons.includes(addon.id);
                        return (
                          <button
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`p-2 rounded-md text-left border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#000000] border-[#9281f7] text-[#ffffff]"
                                : "bg-[#000000] border-[#292d30] text-[#a1a4a5] hover:border-[#464a4d]"
                            }`}
                          >
                            <div className="text-[10px] font-mono truncate">{addon.name}</div>
                            <div className="text-xs font-mono font-bold mt-0.5 text-[#f0f0f0]">
                              +${addon.cost.toLocaleString()}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Live Calculated Output */}
                    <div className="pt-2.5 border-t border-[#292d30] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-[#a1a4a5] uppercase font-mono">Total Estimate</span>
                        <span className="text-base font-bold font-mono text-[#ffffff]">
                          ${scopeCalculations.total.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#a1a4a5] uppercase font-mono">Timeline</span>
                        <span className="text-xs font-mono font-bold text-[#3ad389]">
                          ~{scopeCalculations.weeks} Weeks
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-outfit text-[#ffffff] tracking-tight mb-2">
                    <Link href="/work/devlogic-systems" className="hover:text-[#9281f7] transition-colors">
                      Devlogic Systems
                    </Link>
                  </h3>

                  {/* Project Description */}
                  <p className="text-sm text-[#a1a4a5] leading-relaxed mb-5 font-normal tracking-[-0.01em]">
                    Production commercial platform and real-time interactive software scope estimation engine built with React 19, Vite 6, and Tailwind CSS v4, delivering instant cost calculations and sub-second page performance.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {["React 19", "Vite 6", "Tailwind CSS v4", "TypeScript", "Vercel Edge"].map((tag) => (
                      <span
                        key={tag}
                        className="resend-tag font-mono text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lower Meta Strip & Actions */}
                <div className="pt-5 border-t border-[#292d30] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-md bg-[#0b0e14] border border-[#292d30] flex items-center justify-center text-lg text-[#3b9eff] shrink-0">
                      <i className="ri-building-line"></i>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold font-outfit text-[#ffffff] tracking-tight truncate">
                        Devlogic Systems
                      </h4>
                      <p className="text-xs text-[#a1a4a5] truncate">
                        Commercial Scope Engine
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap ml-auto">
                    <a
                      href="https://devlogicsystems.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resend-btn-ghost text-xs py-1.5 px-3"
                    >
                      <i className="ri-external-link-line text-xs"></i>
                      <span>Demo</span>
                    </a>
                    <a
                      href="https://github.com/pratikk121/Devlogic-New"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resend-btn-ghost text-xs py-1.5 px-3"
                      title="GitHub Repository"
                    >
                      <i className="ri-github-line text-xs"></i>
                      <span>Code</span>
                    </a>
                    <Link
                      href="/work/devlogic-systems"
                      className="resend-btn-ghost text-xs py-1.5 px-3 text-[#9281f7] hover:border-[#9281f7]"
                    >
                      <span>Case Study</span>
                      <i className="ri-arrow-right-line text-xs"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Card 4: Precision CRM (Interactive Deal Pipeline with Iris Violet Stage Indicators) */}
          {(selectedCategory === "All" || selectedCategory === "Commercial & CRM") && (
            <motion.article
              key="precision-crm"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className={`${
                isFiltered && selectedCategory === "Commercial & CRM" ? "lg:col-span-2" : "lg:col-span-2"
              } flex flex-col`}
            >
              <div className="resend-card p-6 sm:p-8 flex flex-col justify-between h-full hover:border-[#9281f7]">
                <div>
                  {/* Top Meta Strip: Status dot in #3ad389 with category label in #a1a4a5 */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="resend-tag">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3ad389]"></span>
                        <span>B2B SaaS Platform</span>
                      </span>
                      <span className="text-xs font-mono text-[#a1a4a5] hidden sm:inline">
                        High-Velocity Deal Pipeline
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#a1a4a5]">
                      <span className="text-[#9281f7] font-semibold">Neon Pooling</span>
                      <span className="text-[#464a4d]">·</span>
                      <span className="text-[#3ad389] font-semibold">Optimistic UI</span>
                    </div>
                  </div>

                  {/* Product Preview Frame: 1px #292d30 border, #0b0e14 bg, 16px radius */}
                  <div className="mb-6 p-4 rounded-2xl bg-[#0b0e14] border border-[#292d30] select-none">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#ffffff] font-outfit">
                        <i className="ri-kanban-view text-[#9281f7]"></i>
                        <span>Interactive Deal Pipeline Board</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#9281f7] px-2.5 py-0.5 rounded-md bg-[#000000] border border-[#292d30]">
                        Click deal cards to advance stages
                      </span>
                    </div>

                    {/* Mini Kanban Columns: 1px #292d30 border, 6px radius cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(["qualified", "proposal", "won"] as const).map((stage) => {
                        const stageDeals = deals.filter((d) => d.stage === stage);
                        const stageTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);

                        return (
                          <div
                            key={stage}
                            className="p-3 rounded-md bg-[#000000] border border-[#292d30] flex flex-col gap-2"
                          >
                            <div className="flex justify-between items-center text-[11px] font-mono font-bold uppercase tracking-wider text-[#a1a4a5]">
                              <span className="flex items-center gap-1.5">
                                {stage === "won" ? (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ad389]"></span>
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#9281f7]"></span>
                                )}
                                <span>{stage}</span>
                              </span>
                              <span className="text-[#ffffff]">${(stageTotal / 1000).toFixed(0)}k</span>
                            </div>

                            <div className="space-y-2 min-h-[68px]">
                              {stageDeals.map((deal) => (
                                <motion.div
                                  layout
                                  key={deal.id}
                                  onClick={() => advanceDeal(deal.id)}
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  className={`p-2.5 rounded-md border text-xs cursor-pointer transition-colors ${
                                    stage === "won"
                                      ? "bg-[#0b0e14] border-[#3ad389]/60 text-[#ffffff]"
                                      : "bg-[#0b0e14] border-[#292d30] hover:border-[#9281f7] text-[#f0f0f0]"
                                  }`}
                                  title="Click to advance stage"
                                >
                                  <div className="font-semibold truncate">{deal.name}</div>
                                  <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-[#a1a4a5]">
                                    <span>{deal.company}</span>
                                    <span className="font-bold text-[#9281f7]">
                                      ${deal.amount.toLocaleString()}
                                    </span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-outfit text-[#ffffff] tracking-tight mb-2">
                    <Link href="/work/precision-crm" className="hover:text-[#9281f7] transition-colors">
                      Precision CRM
                    </Link>
                  </h3>

                  {/* Project Description */}
                  <p className="text-sm sm:text-base text-[#a1a4a5] leading-relaxed mb-6 font-normal tracking-[-0.01em]">
                    Sales operations and customer relationship platform architected on Next.js 16, utilizing React Server Components, Neon Serverless PostgreSQL with connection pooling, and optimistic mutations.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      "Next.js 16",
                      "Neon PostgreSQL",
                      "Prisma ORM",
                      "Auth.js",
                      "Server Actions",
                      "Tailwind CSS",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="resend-tag font-mono text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lower Meta Strip & Actions */}
                <div className="pt-5 border-t border-[#292d30] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-md bg-[#0b0e14] border border-[#292d30] flex items-center justify-center text-lg text-[#9281f7] shrink-0">
                      <i className="ri-user-settings-line"></i>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold font-outfit text-[#ffffff] tracking-tight truncate">
                        Precision CRM
                      </h4>
                      <p className="text-xs text-[#a1a4a5] truncate">
                        High-Velocity Pipeline &amp; CRM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap ml-auto">
                    <a
                      href="https://github.com/pratikk121/CRM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resend-btn-ghost text-xs py-1.5 px-3"
                    >
                      <i className="ri-github-line text-xs"></i>
                      <span>Code</span>
                    </a>
                    <Link
                      href="/work/precision-crm"
                      className="resend-btn-ghost text-xs py-1.5 px-3 text-[#9281f7] hover:border-[#9281f7]"
                    >
                      <span>Case Study</span>
                      <i className="ri-arrow-right-line text-xs"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

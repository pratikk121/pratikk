"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const router = useRouter();

  // Toggle the command menu when ⌘K or Ctrl+K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    command();
    setTimeout(() => setOpen(false), 200);
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Architectural Command Menu"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-2xl bg-[#000000] border border-[#292d30] rounded-2xl p-3 z-[9999] text-[#f0f0f0]"
    >
      {/* Search Input Bar */}
      <div className="flex items-center gap-2.5 px-3 border-b border-[#292d30] pb-2.5">
        <i className="ri-search-line text-[#9281f7] text-base"></i>
        <Command.Input
          placeholder="Search case studies, repositories, navigation, or commands..."
          className="w-full bg-transparent border-none text-[#ffffff] placeholder-[#6e727a] py-2 text-sm sm:text-base outline-none font-outfit"
        />
        <span className="hidden sm:inline-block text-[10px] font-mono text-[#a1a4a5] bg-[#0b0e14] border border-[#292d30] px-2 py-0.5 rounded-md">
          ESC to exit
        </span>
      </div>

      {/* Command Results List */}
      <Command.List className="max-h-[380px] overflow-y-auto mt-2 p-1 custom-scrollbar space-y-3">
        <Command.Empty className="p-8 text-center text-[#6e727a] text-sm font-medium font-mono">
          No matching case studies, commands, or routes found.
        </Command.Empty>

        {/* Flagship Case Studies Group */}
        <Command.Group
          heading="Flagship Case Studies"
          className="text-xs text-[#9281f7] font-mono font-semibold uppercase tracking-wider px-2"
        >
          <Command.Item
            value="AetherOS Ambient Desktop OS & Command Center WebGL GLSL compositor micro-kernel"
            onSelect={() => runCommand(() => router.push("/work/aether-os"))}
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <i className="ri-computer-line text-[#9281f7] text-base"></i>
              <div className="truncate">
                <div className="text-[#ffffff] font-medium truncate">AetherOS: Ambient Desktop OS</div>
                <div className="text-xs text-[#6e727a] truncate font-mono">Ambient Desktop OS · WebGL &amp; GLSL · Virtual Filesystem</div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#9281f7] bg-[#000000] border border-[#292d30] px-2 py-0.5 rounded-md shrink-0">
              Case Study
            </span>
          </Command.Item>

          <Command.Item
            value="FinanceTracker AI Financial Intelligence Platform FastAPI Python PostgreSQL SQLAlchemy time-series"
            onSelect={() => runCommand(() => router.push("/work/finance-tracker"))}
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <i className="ri-line-chart-line text-[#3ad389] text-base"></i>
              <div className="truncate">
                <div className="text-[#ffffff] font-medium truncate">FinanceTracker: AI Intelligence</div>
                <div className="text-xs text-[#6e727a] truncate font-mono">FastAPI · Python · PostgreSQL · Financial Intelligence</div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#3ad389] bg-[#000000] border border-[#292d30] px-2 py-0.5 rounded-md shrink-0">
              Case Study
            </span>
          </Command.Item>

          <Command.Item
            value="Devlogic Systems Commercial Platform Project Scoping Engine DAG React 19 Vite 6 100/100 CWV"
            onSelect={() => runCommand(() => router.push("/work/devlogic-systems"))}
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <i className="ri-building-line text-[#3b9eff] text-base"></i>
              <div className="truncate">
                <div className="text-[#ffffff] font-medium truncate">Devlogic Systems: Modern Agency</div>
                <div className="text-xs text-[#6e727a] truncate font-mono">Interactive Scoping Engine · React 19 · Vite 6 · Tailwind CSS</div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#3b9eff] bg-[#000000] border border-[#292d30] px-2 py-0.5 rounded-md shrink-0">
              Case Study
            </span>
          </Command.Item>

          <Command.Item
            value="Precision CRM Next.js 16 App Router Neon PostgreSQL Prisma ORM Optimistic UI Server Actions"
            onSelect={() => runCommand(() => router.push("/work/precision-crm"))}
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <i className="ri-user-settings-line text-[#9281f7] text-base"></i>
              <div className="truncate">
                <div className="text-[#ffffff] font-medium truncate">Precision CRM: Pipeline Platform</div>
                <div className="text-xs text-[#6e727a] truncate font-mono">Next.js 16 App Router · Neon PostgreSQL · Prisma · Auth.js</div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#9281f7] bg-[#000000] border border-[#292d30] px-2 py-0.5 rounded-md shrink-0">
              Case Study
            </span>
          </Command.Item>
        </Command.Group>

        {/* Source Repositories & Platform Links */}
        <Command.Group
          heading="Source Repositories & Platform Links"
          className="text-xs text-[#a1a4a5] font-mono font-semibold uppercase tracking-wider px-2"
        >
          <Command.Item
            value="GitHub Repository AetherOS Ambient Desktop Source Code pratikk121 Ather_os"
            onSelect={() => openExternal("https://github.com/pratikk121/Ather_os")}
            className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <i className="ri-github-line text-[#9281f7] text-base"></i>
              <span className="truncate">GitHub: AetherOS (Ather_os)</span>
            </div>
            <i className="ri-external-link-line text-[#6e727a] text-xs"></i>
          </Command.Item>

          <Command.Item
            value="GitHub Repository FinanceTracker Source Code pratikk121 fianace_tracker"
            onSelect={() => openExternal("https://github.com/pratikk121/fianace_tracker")}
            className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <i className="ri-github-line text-[#3ad389] text-base"></i>
              <span className="truncate">GitHub: FinanceTracker (fianace_tracker)</span>
            </div>
            <i className="ri-external-link-line text-[#6e727a] text-xs"></i>
          </Command.Item>

          <Command.Item
            value="Live Commercial Website Devlogic Systems devlogicsystems.in production"
            onSelect={() => openExternal("https://devlogicsystems.in")}
            className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <i className="ri-global-line text-[#3b9eff] text-base"></i>
              <span className="truncate">Live Platform: Devlogic Systems</span>
            </div>
            <i className="ri-external-link-line text-[#6e727a] text-xs"></i>
          </Command.Item>

          <Command.Item
            value="GitHub Repository Devlogic Systems Devlogic-New Source Code pratikk121"
            onSelect={() => openExternal("https://github.com/pratikk121/Devlogic-New")}
            className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <i className="ri-github-line text-[#3b9eff] text-base"></i>
              <span className="truncate">GitHub: Devlogic Systems (Devlogic-New)</span>
            </div>
            <i className="ri-external-link-line text-[#6e727a] text-xs"></i>
          </Command.Item>

          <Command.Item
            value="GitHub Repository Precision CRM CRM Source Code pratikk121"
            onSelect={() => openExternal("https://github.com/pratikk121/CRM")}
            className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <i className="ri-github-line text-[#9281f7] text-base"></i>
              <span className="truncate">GitHub: Precision CRM (CRM)</span>
            </div>
            <i className="ri-external-link-line text-[#6e727a] text-xs"></i>
          </Command.Item>

          <Command.Item
            value="GitHub Profile pratikk121 Pratik Kadole"
            onSelect={() => openExternal("https://github.com/pratikk121")}
            className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <i className="ri-user-star-line text-[#a1a4a5] text-base"></i>
              <span className="truncate">GitHub Profile: @pratikk121</span>
            </div>
            <i className="ri-external-link-line text-[#6e727a] text-xs"></i>
          </Command.Item>
        </Command.Group>

        {/* Direct Contact & Inquiries */}
        <Command.Group
          heading="Direct Contact & Inquiries"
          className="text-xs text-[#a1a4a5] font-mono font-semibold uppercase tracking-wider px-2"
        >
          <Command.Item
            value="Contact Form Inquiries Message Pratik Kadole"
            onSelect={() => runCommand(() => router.push("/contact"))}
            className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <i className="ri-mail-send-line text-[#9281f7] text-base"></i>
              <span>Open Contact Form (/contact)</span>
            </div>
            <span className="text-[10px] font-mono text-[#6e727a]">Fast Route</span>
          </Command.Item>

          <Command.Item
            value="Send Email Direct pratikk5143772@gmail.com mailto"
            onSelect={() => runCommand(() => {
              window.location.href = "mailto:pratikk5143772@gmail.com";
            })}
            className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <i className="ri-mail-line text-[#3ad389] text-base"></i>
              <span>Direct Email: pratikk5143772@gmail.com</span>
            </div>
            <i className="ri-arrow-right-up-line text-[#6e727a] text-xs"></i>
          </Command.Item>
        </Command.Group>

        {/* Global Navigation */}
        <Command.Group
          heading="Navigation"
          className="text-xs text-[#a1a4a5] font-mono font-semibold uppercase tracking-wider px-2"
        >
          <Command.Item
            value="Home page dashboard"
            onSelect={() => runCommand(() => router.push("/"))}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <i className="ri-home-line text-[#a1a4a5] text-base"></i>
            <span>Home</span>
          </Command.Item>
          <Command.Item
            value="About Engineering Mindset Background Pratik Kadole"
            onSelect={() => runCommand(() => router.push("/about"))}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <i className="ri-user-line text-[#a1a4a5] text-base"></i>
            <span>About: Mindset &amp; Background</span>
          </Command.Item>
          <Command.Item
            value="Selected Works Case Studies Projects"
            onSelect={() => runCommand(() => router.push("/work"))}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <i className="ri-code-box-line text-[#a1a4a5] text-base"></i>
            <span>Selected Projects</span>
          </Command.Item>
        </Command.Group>

        {/* Utilities */}
        <Command.Group
          heading="Utilities"
          className="text-xs text-[#a1a4a5] font-mono font-semibold uppercase tracking-wider px-2"
        >
          <Command.Item
            value="Copy Current Page URL share"
            onSelect={() =>
              runCommand(() => {
                navigator.clipboard.writeText(window.location.href);
                setFeedback("URL copied to clipboard!");
                setTimeout(() => setFeedback(null), 2500);
              })
            }
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#a1a4a5] hover:bg-[#0b0e14] hover:text-[#ffffff] cursor-pointer transition-colors"
          >
            <i className="ri-link text-[#a1a4a5] text-base"></i>
            <span>Copy Current Page URL</span>
          </Command.Item>
        </Command.Group>
      </Command.List>

      {feedback && (
        <div className="mx-2 mb-2 p-2 rounded-md bg-[#000000] border border-[#3ad389] text-[#3ad389] text-xs font-mono text-center">
          {feedback}
        </div>
      )}

      {/* Footer Status Bar */}
      <div className="border-t border-[#292d30] mt-2 pt-2.5 px-2 flex justify-between items-center text-xs text-[#a1a4a5] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3ad389]"></span>
          <span>Pratik Kadole · Systems &amp; Full-Stack</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#0b0e14] border border-[#292d30] px-1.5 py-0.5 rounded-md text-[10px]">
            &uarr;&darr; navigate
          </span>
          <span className="bg-[#0b0e14] border border-[#292d30] px-1.5 py-0.5 rounded-md text-[10px]">
            &crarr; select
          </span>
          <span className="bg-[#0b0e14] border border-[#292d30] px-1.5 py-0.5 rounded-md text-[10px]">
            esc close
          </span>
        </div>
      </div>
    </Command.Dialog>
  );
}

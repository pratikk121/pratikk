"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlass,
  ArrowRight,
  Code,
  GithubLogo,
  EnvelopeSimple,
  Copy,
  Check,
  Desktop,
  ArrowSquareOut,
  X,
} from "@phosphor-icons/react";
import { projects } from "@/data/projects";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Actions";
  description?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Close on Escape, toggle on Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or custom event
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query and selected index on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("pratikk5143772@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  }, [onClose]);

  // Master commands list
  const commands: CommandItem[] = useMemo(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-work",
        title: "Selected Work",
        category: "Navigation",
        description: "Browse featured systems and web applications",
        icon: <Code size={16} className="text-[#3b82f6]" weight="duotone" />,
        action: () => {
          router.push("/#projects");
          onClose();
        },
      },
      {
        id: "nav-lab",
        title: "Systems Architecture Lab",
        category: "Navigation",
        description: "Interactive AetherOS sandbox and WebGL shaders",
        icon: <Desktop size={16} className="text-[#22c55e]" weight="duotone" />,
        action: () => {
          router.push("/#systems-lab");
          onClose();
        },
      },
      {
        id: "nav-about",
        title: "Engineering Philosophy",
        category: "Navigation",
        description: "Architecture principles and technical background",
        icon: <ArrowRight size={16} className="text-[#a855f7]" weight="duotone" />,
        action: () => {
          router.push("/#about");
          onClose();
        },
      },
      {
        id: "nav-contact",
        title: "Contact",
        category: "Navigation",
        description: "Direct email and message form",
        icon: <EnvelopeSimple size={16} className="text-[#f59e0b]" weight="duotone" />,
        action: () => {
          router.push("/#contact");
          onClose();
        },
      },
    ];

    const projectItems: CommandItem[] = projects.map((p) => ({
      id: `project-${p.slug}`,
      title: p.title,
      category: "Projects",
      description: `${p.category} · ${p.tags.slice(0, 3).join(", ")}`,
      icon: <Code size={16} className="text-[#889096]" />,
      action: () => {
        router.push(`/work/${p.slug}`);
        onClose();
      },
    }));

    const actionItems: CommandItem[] = [
      {
        id: "action-copy-email",
        title: copied ? "Email Copied!" : "Copy Email Address",
        category: "Actions",
        description: "pratikk5143772@gmail.com",
        icon: copied ? (
          <Check size={16} className="text-[#22c55e]" weight="bold" />
        ) : (
          <Copy size={16} className="text-[#889096]" />
        ),
        action: copyEmail,
      },
      {
        id: "action-github",
        title: "Open GitHub Profile",
        category: "Actions",
        description: "github.com/pratikk121",
        icon: <GithubLogo size={16} className="text-[#889096]" />,
        action: () => {
          window.open("https://github.com/pratikk121", "_blank");
          onClose();
        },
      },
      {
        id: "action-sandbox",
        title: "Launch AetherOS Sandbox",
        category: "Actions",
        description: "Full-screen browser desktop environment",
        icon: <ArrowSquareOut size={16} className="text-[#22c55e]" weight="bold" />,
        action: () => {
          window.open("/sandbox/pratikOS/index.html", "_blank");
          onClose();
        },
      },
    ];

    return [...navItems, ...projectItems, ...actionItems];
  }, [router, onClose, copyEmail, copied]);

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const lower = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(lower) ||
        (c.description && c.description.toLowerCase().includes(lower)) ||
        c.category.toLowerCase().includes(lower)
    );
  }, [commands, query]);

  // Keyboard navigation for results
  useEffect(() => {
    const handleKeyNav = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeyNav);
    return () => window.removeEventListener("keydown", handleKeyNav);
  }, [isOpen, filteredCommands, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-[#1e2329] bg-[#0c0e12] shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1e2329] bg-[#050505]">
          <MagnifyingGlass size={18} className="text-[#889096] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search projects..."
            autoFocus
            className="w-full bg-transparent text-sm text-[#f0f2f5] placeholder-[#555d65] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#555d65] hover:text-[#f0f2f5] hover:bg-white/[0.04] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Stream */}
        <div className="overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#555d65]">
              No commands or projects match &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
                    isSelected
                      ? "bg-white/[0.08] text-white"
                      : "text-[#889096] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="p-1.5 rounded-md bg-[#050505] border border-[#1e2329] shrink-0">
                      {cmd.icon}
                    </span>
                    <div className="truncate">
                      <div
                        className={`text-xs font-medium truncate ${
                          isSelected ? "text-white" : "text-[#f0f2f5]"
                        }`}
                      >
                        {cmd.title}
                      </div>
                      {cmd.description && (
                        <div className="text-[11px] text-[#555d65] truncate font-mono">
                          {cmd.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-[#1e2329] text-[#555d65] shrink-0 ml-2">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 border-t border-[#1e2329] bg-[#050505] flex items-center justify-between text-[11px] text-[#555d65] font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>Pratik Kadole OS</span>
        </div>
      </div>
    </div>
  );
}

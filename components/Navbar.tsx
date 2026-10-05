"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, List, X, MagnifyingGlass } from "@phosphor-icons/react";
import CommandPalette from "@/components/CommandPalette";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Work", href: "#projects" },
    { label: "Systems Lab", href: "#systems-lab" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#1e2329]/80 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand / Logo */}
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-[#f0f2f5] hover:text-white transition-colors"
          >
            Pratik Kadole
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#889096] hover:text-[#f0f2f5] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://github.com/pratikk121"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#889096] hover:text-[#f0f2f5] transition-colors font-medium"
            >
              <span>GitHub</span>
              <ArrowUpRight size={14} weight="bold" />
            </a>

            {/* Quick Command Palette Search Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-[#1e2329] bg-[#0c0e12] text-xs text-[#889096] hover:text-[#f0f2f5] hover:border-[#38414a] transition-all cursor-pointer"
              title="Search or execute commands (Cmd + K)"
            >
              <MagnifyingGlass size={13} />
              <span className="font-mono text-[11px]">
                {isMac ? "⌘K" : "Ctrl+K"}
              </span>
            </button>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md border border-[#1e2329] bg-[#0c0e12] text-xs font-medium text-[#f0f2f5] hover:border-[#38414a] hover:bg-white/[0.04] active:scale-[0.98] transition-all whitespace-nowrap"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-md border border-[#1e2329] text-[#889096] hover:text-[#f0f2f5] transition-colors"
              aria-label="Open Command Palette"
            >
              <MagnifyingGlass size={16} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md border border-[#1e2329] text-[#889096] hover:text-[#f0f2f5] transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#1e2329] bg-[#0c0e12] px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-[#889096] hover:text-[#f0f2f5] py-1"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/pratikk121"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1 text-sm text-[#889096] hover:text-[#f0f2f5] py-1"
            >
              <span>GitHub</span>
              <ArrowUpRight size={14} weight="bold" />
            </a>
            <div className="pt-2">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center w-full px-4 py-2 rounded-md border border-[#1e2329] bg-[#050505] text-xs font-medium text-[#f0f2f5]"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}

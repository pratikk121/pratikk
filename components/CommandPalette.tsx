"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
    setTimeout(() => setOpen(false), 150);
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Quick Navigation Menu"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-xl bg-[#000000] border border-[#292d30] rounded-xl p-3 z-[9999] text-[#f0f0f0] shadow-2xl"
    >
      <div className="flex items-center gap-2.5 px-3 border-b border-[#292d30] pb-2.5">
        <i className="ri-search-line text-[#9281f7] text-base"></i>
        <Command.Input
          placeholder="Type to search projects, pages, or links..."
          className="w-full bg-transparent border-none text-[#ffffff] placeholder-[#6e727a] py-2 text-sm outline-none font-sans"
        />
        <span className="hidden sm:inline-block text-[10px] text-[#a1a4a5] bg-[#0b0e14] border border-[#292d30] px-2 py-0.5 rounded">
          ESC
        </span>
      </div>

      <Command.List className="max-h-[340px] overflow-y-auto mt-2 p-1 custom-scrollbar space-y-2">
        <Command.Empty className="p-6 text-center text-[#6e727a] text-xs">
          No matching items found.
        </Command.Empty>

        {/* Projects */}
        <Command.Group heading="Projects &amp; Case Studies" className="text-[11px] font-semibold uppercase text-[#6e727a] px-2 pt-2">
          {projects.map((project) => (
            <Command.Item
              key={project.slug}
              onSelect={() => runCommand(() => router.push(`/work/${project.slug}`))}
              className="flex items-center justify-between p-2.5 rounded-md hover:bg-[#0b0e14] hover:text-[#ffffff] text-xs text-[#a1a4a5] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <i className={`${project.image} text-[#9281f7]`}></i>
                <span className="font-medium text-[#f0f0f0]">{project.title}</span>
                <span className="text-[10px] text-[#6e727a]">({project.status})</span>
              </div>
              <span className="text-[11px] text-[#6e727a]">View Notes</span>
            </Command.Item>
          ))}
        </Command.Group>

        {/* Navigation */}
        <Command.Group heading="Navigation" className="text-[11px] font-semibold uppercase text-[#6e727a] px-2 pt-2">
          <Command.Item
            onSelect={() => runCommand(() => router.push("/#projects"))}
            className="flex items-center gap-2.5 p-2 rounded-md hover:bg-[#0b0e14] hover:text-[#ffffff] text-xs text-[#a1a4a5] cursor-pointer"
          >
            <i className="ri-folder-line text-[#6e727a]"></i>
            <span>Selected Work</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => router.push("/#about"))}
            className="flex items-center gap-2.5 p-2 rounded-md hover:bg-[#0b0e14] hover:text-[#ffffff] text-xs text-[#a1a4a5] cursor-pointer"
          >
            <i className="ri-user-line text-[#6e727a]"></i>
            <span>About Me</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => router.push("/#contact"))}
            className="flex items-center gap-2.5 p-2 rounded-md hover:bg-[#0b0e14] hover:text-[#ffffff] text-xs text-[#a1a4a5] cursor-pointer"
          >
            <i className="ri-mail-line text-[#6e727a]"></i>
            <span>Contact</span>
          </Command.Item>
        </Command.Group>

        {/* External Links */}
        <Command.Group heading="External Links" className="text-[11px] font-semibold uppercase text-[#6e727a] px-2 pt-2">
          <Command.Item
            onSelect={() => openExternal("https://github.com/pratikk121")}
            className="flex items-center justify-between p-2 rounded-md hover:bg-[#0b0e14] hover:text-[#ffffff] text-xs text-[#a1a4a5] cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <i className="ri-github-fill text-[#f0f0f0]"></i>
              <span>GitHub Profile</span>
            </div>
            <i className="ri-external-link-line text-[10px]"></i>
          </Command.Item>
          <Command.Item
            onSelect={() => openExternal("https://www.linkedin.com/in/pratik-kadole-119391267/")}
            className="flex items-center justify-between p-2 rounded-md hover:bg-[#0b0e14] hover:text-[#ffffff] text-xs text-[#a1a4a5] cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <i className="ri-linkedin-fill text-[#3b9eff]"></i>
              <span>LinkedIn Profile</span>
            </div>
            <i className="ri-external-link-line text-[10px]"></i>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

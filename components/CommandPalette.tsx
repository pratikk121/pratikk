"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const router = useRouter();

    // Toggle the menu when ⌘K or Ctrl+K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        command();
        setTimeout(() => setOpen(false), 200);
    };

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg bg-slate-950/95 border border-white/[0.1] rounded-2xl shadow-2xl p-3 z-[9999] backdrop-blur-2xl text-slate-200"
        >
            <div className="flex items-center gap-2 px-3 border-b border-white/[0.08] pb-2">
                <i className="ri-search-line text-slate-400"></i>
                <Command.Input
                    placeholder="Type a command or jump to page..."
                    className="w-full bg-transparent border-none text-white placeholder-slate-500 py-2 text-sm sm:text-base outline-none font-outfit"
                />
            </div>

            <Command.List className="max-h-[320px] overflow-y-auto mt-2 p-1 custom-scrollbar">
                <Command.Empty className="p-6 text-center text-slate-500 text-sm">
                    No matching commands or routes found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="text-xs text-slate-500 font-mono font-semibold uppercase tracking-wider mb-2 px-2">
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/"))}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/[0.08] hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-home-line text-indigo-400 text-base"></i>
                        <span>Home</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/about"))}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/[0.08] hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-user-line text-indigo-400 text-base"></i>
                        <span>About & Philosophy</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/work"))}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/[0.08] hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-code-box-line text-indigo-400 text-base"></i>
                        <span>Selected Works</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/contact"))}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/[0.08] hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-mail-line text-indigo-400 text-base"></i>
                        <span>Contact & Inquiries</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="Preferences & Actions" className="text-xs text-slate-500 font-mono font-semibold uppercase tracking-wider mb-2 px-2 mt-3">
                    <Command.Item
                        onSelect={() => runCommand(() => {
                            document.documentElement.setAttribute('data-theme', 'dark');
                            localStorage.setItem('theme', 'dark');
                        })}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/[0.08] hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-moon-line text-indigo-400 text-base"></i>
                        <span>Set Theme: Dark Mode</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => {
                            document.documentElement.setAttribute('data-theme', 'light');
                            localStorage.setItem('theme', 'light');
                        })}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/[0.08] hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-sun-line text-amber-400 text-base"></i>
                        <span>Set Theme: Light Mode</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => {
                            navigator.clipboard.writeText(window.location.href);
                            setFeedback("URL copied to clipboard!");
                            setTimeout(() => setFeedback(null), 2500);
                        })}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/[0.08] hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-link text-indigo-400 text-base"></i>
                        <span>Copy Current Page URL</span>
                    </Command.Item>
                </Command.Group>
            </Command.List>

            {feedback && (
                <div className="mx-2 mb-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono text-center">
                    {feedback}
                </div>
            )}

            <div className="border-t border-white/[0.08] mt-2 pt-2.5 px-2 flex justify-between items-center text-xs text-slate-500 font-mono">
                <span>Pratik Kadole • Engineering Portfolio</span>
                <div className="flex items-center gap-1.5">
                    <span className="bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded text-[10px]">esc</span>
                    <span>to close</span>
                </div>
            </div>
        </Command.Dialog>
    );
}

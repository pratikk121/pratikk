"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Toggle the menu when ⌘K is pressed
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
        setOpen(false);
        command();
    };

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl p-2 z-[9999] backdrop-blur-xl"
        >
            <Command.Input
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-none text-white placeholder-slate-400 p-3 text-lg outline-none font-outfit"
            />

            <Command.List className="max-h-[300px] overflow-y-auto mt-2 p-1 custom-scrollbar">
                <Command.Empty className="p-4 text-center text-slate-500">No results found.</Command.Empty>

                <Command.Group heading="Navigation" className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 px-2">
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/"))}
                        className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-home-line text-lg"></i>
                        <span>Home</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/#about"))}
                        className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-user-line text-lg"></i>
                        <span>About</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/#projects"))}
                        className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-code-box-line text-lg"></i>
                        <span>Projects</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/#contact"))}
                        className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-mail-line text-lg"></i>
                        <span>Contact</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="Utility" className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 px-2 mt-2">
                    <Command.Item
                        onSelect={() => runCommand(() => {
                            document.documentElement.setAttribute('data-theme', 'dark');
                            localStorage.setItem('theme', 'dark');
                        })}
                        className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-moon-line text-lg"></i>
                        <span>Set Theme: Dark</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => {
                            document.documentElement.setAttribute('data-theme', 'light');
                            localStorage.setItem('theme', 'light');
                        })}
                        className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-sun-line text-lg"></i>
                        <span>Set Theme: Light</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("URL Copied to clipboard!");
                        })}
                        className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                    >
                        <i className="ri-link text-lg"></i>
                        <span>Copy Link</span>
                    </Command.Item>
                </Command.Group>
            </Command.List>

            <div className="border-t border-slate-700/50 mt-2 pt-2 px-2 flex justify-between items-center text-xs text-slate-500">
                <span>Pratik's Portfolio</span>
                <div className="flex gap-1">
                    <span className="bg-slate-800 px-1 rounded">esc</span>
                    <span>to close</span>
                </div>
            </div>
        </Command.Dialog>
    );
}

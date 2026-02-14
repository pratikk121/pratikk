"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NotFound() {
    const pathname = usePathname();
    const [text, setText] = useState("");
    const fullText = `> ERROR: 404_PAGE_NOT_FOUND\n> SYSTEM_FAILURE: The requested path "${pathname}" could not be located in the neural network.\n> INITIATING_RECOVERY_PROTOCOL...`;

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden z-10 px-4 text-center">
            {/* Glitchy 404 Title */}
            <h1 className="text-[8rem] md:text-[12rem] font-bold font-outfit leading-none select-none relative group">
                <span className="absolute inset-0 text-red-500 opacity-20 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-75">
                    404
                </span>
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse">
                    404
                </span>
                <span className="absolute inset-0 text-blue-500 opacity-20 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-75">
                    404
                </span>
            </h1>

            {/* Terminal Output */}
            <div className="mt-8 bg-slate-900/80 border border-slate-700/50 rounded-lg p-6 max-w-2xl w-full backdrop-blur-md shadow-2xl font-mono text-left font-sm md:text-base h-48 md:h-40 overflow-hidden relative">
                <div className="flex gap-2 mb-4 border-b border-slate-700/50 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-auto text-xs text-slate-500">system_log.txt</span>
                </div>
                <p className="text-green-400 whitespace-pre-wrap leading-relaxed">
                    {text}
                    <span className="animate-pulse inline-block w-2 h-4 bg-green-400 ml-1 align-middle"></span>
                </p>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex flex-col md:flex-row gap-6 items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000 fill-mode-forwards opacity-0" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
                <Link
                    href="/"
                    className="cta-button group relative overflow-hidden px-8 py-3 text-lg"
                >
                    <span className="relative z-10">Return to Grid</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="text-slate-400 hover:text-white transition-colors underline decoration-dotted underline-offset-4"
                >
                    Go Back
                </button>
            </div>

            <div className="absolute bottom-10 text-slate-600 text-sm font-mono">
                Engineering Status: <span className="text-yellow-500">OFFLINE</span>
            </div>
        </div>
    );
}

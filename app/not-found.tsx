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
        }, 25);
        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden z-10 px-4 text-center">
            {/* Glitchy 404 Title */}
            <h1 className="text-[6rem] sm:text-[8rem] md:text-[11rem] font-bold font-outfit leading-none select-none relative group">
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
            <div className="mt-6 sm:mt-8 bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 sm:p-6 max-w-xl w-full backdrop-blur-md shadow-2xl font-mono text-left text-xs sm:text-sm h-44 overflow-hidden relative">
                <div className="flex gap-2 mb-3 border-b border-slate-700/50 pb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span className="ml-auto text-xs text-slate-500">system_log.txt</span>
                </div>
                <p className="text-emerald-400 whitespace-pre-wrap leading-relaxed font-mono">
                    {text}
                    <span className="animate-pulse inline-block w-2 h-3.5 bg-emerald-400 ml-1 align-middle"></span>
                </p>
            </div>

            {/* Navigation */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 items-center">
                <Link
                    href="/"
                    className="cta-button px-8 py-3 text-sm sm:text-base font-semibold"
                >
                    <span>Return to Grid</span>
                    <i className="ri-arrow-right-line text-sm"></i>
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="px-5 py-2.5 rounded-full text-slate-400 hover:text-white transition-colors text-sm hover:bg-white/5 cursor-pointer"
                >
                    Go Back
                </button>
            </div>

            <div className="mt-12 text-slate-500 text-xs font-mono">
                Engineering Diagnostics: <span className="text-yellow-500">ROUTING_MISMATCH</span>
            </div>
        </div>
    );
}

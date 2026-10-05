"use client";

import { useState, useRef } from "react";
import {
  ArrowUpRight,
  Cpu,
  Stack,
  HardDrives,
  ArrowsOut,
  ArrowsIn,
  ArrowClockwise,
  CheckCircle,
} from "@phosphor-icons/react";

export default function SystemsLab() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const reloadSandbox = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <>
      <section id="systems-lab" className="py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#1e2329]">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-[#1e2329] text-xs text-[#889096] mb-3 bg-[#0c0e12]">
            <span>Systems &amp; Graphics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f0f2f5]">
            Systems Architecture Lab
          </h2>
          <p className="text-[#889096] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Low-level experiments in browser mechanics, client-side window compositing, and custom WebGL shaders. Testing the performance boundaries of modern web standards.
          </p>
        </div>

        {/* Flagship Showcase Frame */}
        <div className="rounded-2xl border border-[#1e2329] bg-[#0c0e12] overflow-hidden shadow-2xl">
          {/* Frame Topbar */}
          <div className="px-6 py-4 border-b border-[#1e2329] bg-[#050505]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-sm font-semibold text-[#f0f2f5]">AetherOS Core</span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/[0.04] border border-[#1e2329] text-[#889096] font-mono">
                Desktop Compositor
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Reload Button */}
              <button
                onClick={reloadSandbox}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#1e2329] bg-[#0c0e12] text-[#889096] hover:text-[#f0f2f5] hover:border-[#38414a] text-xs font-medium transition-all cursor-pointer"
                title="Reset virtual desktop state"
              >
                <ArrowClockwise size={13} />
                <span>Reset</span>
              </button>

              {/* Fullscreen Cinema Toggle */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#1e2329] bg-[#0c0e12] text-[#889096] hover:text-[#f0f2f5] hover:border-[#38414a] text-xs font-medium transition-all cursor-pointer"
                title="Expand sandbox to full viewport"
              >
                <ArrowsOut size={13} />
                <span>Expand View</span>
              </button>

              <a
                href="/sandbox/pratikOS/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white text-[#050505] text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
              >
                <span>New Tab</span>
                <ArrowUpRight size={13} weight="bold" />
              </a>
            </div>
          </div>

          {/* Technical Architecture Specs Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-[#1e2329] bg-[#050505]/60 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e] mb-4">
                  <Stack size={20} weight="duotone" />
                </div>
                <h3 className="text-sm font-semibold text-[#f0f2f5] mb-2">
                  LRU Depth Normalization
                </h3>
                <p className="text-xs text-[#889096] leading-relaxed">
                  Replaced unbounded z-index increments with an LRU-ordered focus stack that normalizes active window depths to a tight bounded array, eliminating z-index collisions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1e2329] text-[11px] font-mono text-[#555d65]">
                Bounded Focus Layering
              </div>
            </div>

            <div className="p-5 rounded-xl border border-[#1e2329] bg-[#050505]/60 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6] mb-4">
                  <Cpu size={20} weight="duotone" />
                </div>
                <h3 className="text-sm font-semibold text-[#f0f2f5] mb-2">
                  WebGL Optical Refraction
                </h3>
                <p className="text-xs text-[#889096] leading-relaxed">
                  Standard CSS backdrop-filters trigger heavy CPU repaints on drag. Offloaded refraction optics to a WebGL shader passing window coordinates via uniform buffers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1e2329] text-[11px] font-mono text-[#555d65]">
                Hardware Accelerated
              </div>
            </div>

            <div className="p-5 rounded-xl border border-[#1e2329] bg-[#050505]/60 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center text-[#a855f7] mb-4">
                  <HardDrives size={20} weight="duotone" />
                </div>
                <h3 className="text-sm font-semibold text-[#f0f2f5] mb-2">
                  IndexedDB Layout Persistence
                </h3>
                <p className="text-xs text-[#889096] leading-relaxed">
                  Serializes window coordinates, active applications, minimization states, and user preferences to local browser storage with instant schema restoration.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1e2329] text-[11px] font-mono text-[#555d65]">
                Zero-Cloud Persistence
              </div>
            </div>
          </div>

          {/* Live Interactive Embed Area */}
          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-xl border border-[#1e2329] bg-[#050505] overflow-hidden">
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src="/sandbox/pratikOS/index.html"
                title="AetherOS Interactive Sandbox"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            {/* Bottom Engine Telemetry Bar */}
            <div className="mt-4 px-4 py-2.5 rounded-lg border border-[#1e2329] bg-[#050505] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#889096]">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-[#22c55e]" weight="bold" />
                <span>Runtime: Client-Side TypeScript &amp; WebGL2</span>
              </div>
              <div className="flex items-center gap-4 text-[#555d65]">
                <span>SharedArrayBuffer: Enabled</span>
                <span>VSync: 60Hz</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Cinema Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-150">
          {/* Cinema Header */}
          <div className="h-14 px-6 border-b border-[#1e2329] bg-[#0c0e12] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
              <span className="text-sm font-semibold text-[#f0f2f5]">
                AetherOS Cinema Sandbox
              </span>
              <span className="text-xs text-[#555d65] font-mono">
                Press Esc or Close to exit
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={reloadSandbox}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#1e2329] text-xs text-[#889096] hover:text-white"
              >
                <ArrowClockwise size={13} />
                <span>Reset</span>
              </button>

              <button
                onClick={() => setIsFullscreen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-black text-xs font-semibold hover:opacity-90 cursor-pointer"
              >
                <ArrowsIn size={13} weight="bold" />
                <span>Exit Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Fullscreen iFrame */}
          <div className="flex-1 w-full bg-black">
            <iframe
              key={`fs-${iframeKey}`}
              src="/sandbox/pratikOS/index.html"
              title="AetherOS Fullscreen View"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}

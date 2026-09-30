'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type MiniTab = 'compositor' | 'kernel' | 'vfs';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<MiniTab>('compositor');
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Web Audio Synth ambient soundscape
  const toggleSound = () => {
    if (isSoundOn) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.05);
        setTimeout(() => {
          if (audioCtxRef.current) {
            audioCtxRef.current.close().catch(() => {});
            audioCtxRef.current = null;
          }
        }, 100);
      }
      setIsSoundOn(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Harmonious ambient tonic frequency (F#3 ~ 185Hz)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(185, ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setIsSoundOn(true);
      } catch {
        setIsSoundOn(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const competencies = [
    { label: 'Next.js 16', icon: 'ri-nextjs-line' },
    { label: 'React 19', icon: 'ri-reactjs-line' },
    { label: 'TypeScript', icon: 'ri-code-s-slash-line' },
    { label: 'Tailwind CSS v4', icon: 'ri-css3-line' },
    { label: 'WebGL / GLSL', icon: 'ri-sparkling-2-line' },
    { label: 'FastAPI / Python', icon: 'ri-terminal-window-line' },
    { label: 'PostgreSQL', icon: 'ri-database-2-line' },
    { label: 'System APIs', icon: 'ri-cpu-line' },
  ];

  return (
    <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 min-h-[85vh] flex items-center reveal active">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
        {/* Left Column: Resend Editorial Introduction */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Hero Announcement Pill: Transparent fill, 1px #292d30 border, #f0f0f0 text, 9999px radius, #3ad389 Pulse Green dot */}
          <div className="flex items-center gap-2 mb-6">
            <div className="hero-announcement-pill">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3ad389] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3ad389]"></span>
              </span>
              <span>Available for engineering roles &amp; projects</span>
            </div>
          </div>

          {/* Display Headline with Negative Tracking */}
          <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[#ffffff] leading-[1.12] mb-5">
            Engineering high-performance web systems &amp;{" "}
            <span className="txt-gradient">digital products.</span>
          </h1>

          {/* Subtext in Bone White / Ash Gray */}
          <p className="text-base sm:text-lg text-[#a1a4a5] max-w-xl leading-relaxed mb-7 font-normal tracking-[-0.01em]">
            Senior Systems &amp; Full-Stack Engineer crafting ambient browser desktop environments, distributed cloud architectures, and tactile user interfaces strictly engineered for performance.
          </p>

          {/* Resend Signature Ghost & Action Buttons (Strict 6px / rounded-md) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
            <Link href="/work" className="resend-btn-ghost px-4 py-2.5">
              <span>Explore Projects</span>
              <i className="ri-arrow-right-line text-xs" aria-hidden="true"></i>
            </Link>

            <Link href="/contact" className="resend-btn-signal px-4 py-2.5">
              <i className="ri-mail-send-line text-xs" aria-hidden="true"></i>
              <span>Get in Touch</span>
            </Link>

            <a
              href="https://github.com/pratikk121"
              target="_blank"
              rel="noopener noreferrer"
              className="resend-btn-ghost px-4 py-2.5"
              title="GitHub Profile"
            >
              <i className="ri-github-fill text-sm" aria-hidden="true"></i>
              <span>GitHub</span>
            </a>
          </div>

          {/* Core Technical Competencies (Strict 6px radius, 1px #292d30 border) */}
          <div className="pt-6 border-t border-[#292d30]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#a1a4a5] mb-3 block">
              Core Technical Competencies
            </span>
            <div className="flex flex-wrap gap-2">
              {competencies.map((tech) => (
                <span
                  key={tech.label}
                  className="resend-tag cursor-default"
                >
                  <i className={`${tech.icon} text-[#9281f7] text-xs`}></i>
                  <span>{tech.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Resend-style Code Terminal / Product Window */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
          <div className="w-full max-w-lg rounded-2xl bg-[#000000] border border-[#292d30] p-5 sm:p-6 transition-colors duration-150 hover:border-[#464a4d]">
            {/* Top Bar with 3 Traffic-Light Dots (8px circles) & Window Title */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#292d30] mb-4">
              <div className="flex items-center gap-3">
                {/* 3 traffic light dots (8px circles) */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff5f56]/80"></span>
                  <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/80"></span>
                  <span className="w-2 h-2 rounded-full bg-[#27c93f]/80"></span>
                </div>
                <div className="text-xs font-mono text-[#a1a4a5] flex items-center gap-1.5 ml-1">
                  <span>aether_kernel.ts</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md border border-[#292d30] text-[#3ad389] bg-[#000000]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ad389] animate-pulse"></span>
                  60 FPS
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-[#292d30] text-[#a1a4a5] bg-[#000000]">
                  v2.6.4
                </span>
              </div>
            </div>

            {/* Display Window: 16px radius, #0b0e14 surface, 1px #292d30 border */}
            <div className="relative w-full aspect-[16/10] min-h-[200px] rounded-2xl overflow-hidden border border-[#292d30] bg-[#0b0e14] p-4 flex flex-col justify-between select-none">
              {activeTab === 'compositor' && (
                <div className="h-full flex flex-col justify-between">
                  {/* Subtle Violet Caustics Substrate */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, #9281f7 1px, transparent 1px), linear-gradient(to bottom, #9281f7 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9281f7]/10 via-transparent to-[#000000]/60 pointer-events-none" />

                  {/* Compositor Status Badge */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="p-2.5 rounded-md bg-[#000000] border border-[#292d30] text-left max-w-[220px]">
                      <div className="text-[10px] uppercase font-bold text-[#a1a4a5] tracking-wider mb-1">
                        Active Compositor
                      </div>
                      <div className="text-xs font-semibold text-[#ffffff] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9281f7]"></span>
                        <span>Liquid Glass GLSL</span>
                      </div>
                      <div className="text-[10px] text-[#a1a4a5] mt-0.5 font-mono">
                        IndexedDB window tree
                      </div>
                    </div>

                    {/* Audio Synthesizer Toggle */}
                    <button
                      onClick={toggleSound}
                      className="p-2 rounded-md bg-[#000000] border border-[#292d30] hover:border-[#9281f7] text-xs font-medium text-[#a1a4a5] hover:text-[#ffffff] transition-all cursor-pointer flex items-center gap-2"
                      title={isSoundOn ? 'Mute Procedural Ambient Audio' : 'Play Procedural Ambient Audio'}
                    >
                      <i
                        className={`text-sm ${
                          isSoundOn ? 'ri-volume-vibrate-line text-[#9281f7]' : 'ri-volume-mute-line text-[#6e727a]'
                        }`}
                      ></i>
                      <span className="text-[11px] font-mono">{isSoundOn ? 'SYNTH ON' : 'AUDIO OFF'}</span>
                    </button>
                  </div>

                  {/* Compositor Footer */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] text-[#a1a4a5] font-mono">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#000000] border border-[#292d30]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3ad389]"></span>
                      <span>Zero-Latency Event Loop</span>
                    </div>
                    <span className="text-[10px] text-[#6e727a]">
                      Refraction caustics
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'kernel' && (
                <div className="h-full flex flex-col justify-between font-mono text-xs overflow-hidden">
                  <div className="space-y-1 text-left">
                    <div className="text-[#6e727a]">{"// High-concurrency window compositor"}</div>
                    <div>
                      <span className="text-[#3b9eff]">interface</span> <span className="text-[#baa7ff]">CompositorNode</span> &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-[#f0f0f0]">id</span>: <span className="text-[#3b9eff]">string</span>;
                    </div>
                    <div className="pl-4">
                      <span className="text-[#f0f0f0]">zIndex</span>: <span className="text-[#3ad389]">number</span>;
                    </div>
                    <div className="pl-4">
                      <span className="text-[#f0f0f0]">shader</span>: <span className="text-[#9281f7]">&quot;oklab_refract&quot;</span>;
                    </div>
                    <div>&#125;</div>
                    <div className="pt-1 text-[#3ad389]">
                      ✓ Microkernel booted in 4.2ms
                    </div>
                  </div>
                  <div className="text-[10px] text-[#6e727a] font-mono border-t border-[#292d30] pt-1.5 flex justify-between">
                    <span>Memory: 42.8 KB</span>
                    <span className="text-[#3ad389]">Active</span>
                  </div>
                </div>
              )}

              {activeTab === 'vfs' && (
                <div className="h-full flex flex-col justify-between font-mono text-xs text-left">
                  <div className="space-y-1.5">
                    <div className="text-[#a1a4a5] text-[10px] uppercase font-bold tracking-wider">
                      Virtual Filesystem Hierarchy
                    </div>
                    <div className="text-[#9281f7]">/dev/shm/compositor.bin</div>
                    <div className="text-[#f0f0f0] pl-3">├── /bin/exec (POSIX wrapper)</div>
                    <div className="text-[#f0f0f0] pl-3">├── /etc/display.conf (60 Hz)</div>
                    <div className="text-[#f0f0f0] pl-3">└── /var/state (IndexedDB sync)</div>
                  </div>
                  <div className="text-[10px] text-[#3ad389] font-mono border-t border-[#292d30] pt-1.5 flex justify-between">
                    <span>Serialization: Protobuf / IDB</span>
                    <span>100% Synced</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mini Module Switcher Tabs: 1px #292d30 border, 6px radius */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <button
                onClick={() => setActiveTab('compositor')}
                className={`p-2 rounded-md border text-left transition-all cursor-pointer ${
                  activeTab === 'compositor'
                    ? 'bg-[#0b0e14] border-[#9281f7] text-[#ffffff]'
                    : 'bg-[#000000] border-[#292d30] text-[#a1a4a5] hover:text-[#ffffff] hover:border-[#464a4d]'
                }`}
              >
                <div className="text-[10px] uppercase font-semibold text-[#6e727a]">Layer</div>
                <div className="text-xs font-bold mt-0.5">Compositor</div>
              </button>

              <button
                onClick={() => setActiveTab('kernel')}
                className={`p-2 rounded-md border text-left transition-all cursor-pointer ${
                  activeTab === 'kernel'
                    ? 'bg-[#0b0e14] border-[#9281f7] text-[#ffffff]'
                    : 'bg-[#000000] border-[#292d30] text-[#a1a4a5] hover:text-[#ffffff] hover:border-[#464a4d]'
                }`}
              >
                <div className="text-[10px] uppercase font-semibold text-[#6e727a]">Kernel</div>
                <div className="text-xs font-bold mt-0.5">TypeScript</div>
              </button>

              <button
                onClick={() => setActiveTab('vfs')}
                className={`p-2 rounded-md border text-left transition-all cursor-pointer ${
                  activeTab === 'vfs'
                    ? 'bg-[#0b0e14] border-[#9281f7] text-[#ffffff]'
                    : 'bg-[#000000] border-[#292d30] text-[#a1a4a5] hover:text-[#ffffff] hover:border-[#464a4d]'
                }`}
              >
                <div className="text-[10px] uppercase font-semibold text-[#6e727a]">Storage</div>
                <div className="text-xs font-bold mt-0.5">IndexedDB</div>
              </button>
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-3.5 mt-3 border-t border-[#292d30] flex items-center justify-between gap-2">
              <a
                href="/sandbox/pratikOS/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="resend-btn-ghost px-3 py-1.5 text-xs text-[#ffffff]"
              >
                <i className="ri-external-link-line text-xs"></i>
                <span>Launch Live OS Sandbox</span>
              </a>

              <Link
                href="/work/aether-os"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#9281f7] hover:text-[#baa7ff] transition-colors cursor-pointer"
              >
                <span>Read Architecture</span>
                <i className="ri-arrow-right-line text-xs"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

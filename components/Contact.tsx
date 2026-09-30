'use client';

import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState<'' | 'sending' | 'success' | 'error'>('');
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText('pratikk5143772@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-8 sm:py-12 reveal active">
            {/* Header Badge */}
            <div className="mb-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-pink-500/10 text-pink-300 border border-pink-500/20 mb-3">
                    <i className="ri-mail-send-line text-sm"></i> Communications Portal
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-outfit text-white tracking-tight">
                    Let&apos;s build something exceptional.
                </h2>
                <p className="text-slate-400 max-w-2xl text-base sm:text-lg mt-3 leading-relaxed">
                    Have an ambitious systems project, full-stack architectural challenge, or high-impact engineering role in mind? Dispatch a transmission directly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Direct Methods & Telemetry (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    {/* Direct Email Card */}
                    <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-sm">
                        <span className="text-xs font-mono uppercase text-slate-400 block mb-2">Direct Mail</span>
                        <div className="flex items-center justify-between gap-3">
                            <a
                                href="mailto:pratikk5143772@gmail.com"
                                className="text-sm sm:text-base font-medium text-white hover:text-indigo-300 transition-colors truncate"
                            >
                                pratikk5143772@gmail.com
                            </a>
                            <button
                                onClick={copyEmail}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                title="Copy Email Address"
                                aria-label="Copy Email"
                            >
                                {copied ? (
                                    <i className="ri-check-line text-emerald-400 text-sm"></i>
                                ) : (
                                    <i className="ri-file-copy-line text-sm"></i>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Social Hub Links */}
                    <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-sm">
                        <span className="text-xs font-mono uppercase text-slate-400 block mb-4">Engineering Network</span>
                        <div className="flex flex-col gap-3">
                            <a
                                href="https://github.com/pratikk121"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/[0.05] hover:border-indigo-500/30 text-slate-300 hover:text-white transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <i className="ri-github-fill text-xl text-slate-400 group-hover:text-white"></i>
                                    <span className="text-sm font-medium">GitHub Repository</span>
                                </div>
                                <i className="ri-arrow-right-up-line text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/pratik-kadole-119391267/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/[0.05] hover:border-indigo-500/30 text-slate-300 hover:text-white transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <i className="ri-linkedin-fill text-xl text-indigo-400 group-hover:text-white"></i>
                                    <span className="text-sm font-medium">LinkedIn Network</span>
                                </div>
                                <i className="ri-arrow-right-up-line text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                            </a>
                        </div>
                    </div>

                    {/* Operational Telemetry Badge */}
                    <div className="p-4 rounded-xl bg-slate-900/40 border border-white/[0.06] flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <div className="text-xs text-slate-400">
                            <span className="text-slate-200 font-medium">Availability Status:</span> Active & responding within 24h
                        </div>
                    </div>
                </div>

                {/* Right Column: Interactive Contact Form (7 cols) */}
                <div className="lg:col-span-7">
                    <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-white/[0.08] backdrop-blur-md shadow-2xl">
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Ada Lovelace"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/[0.1] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="ada@example.com"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/[0.1] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                                    Project Scope & Message
                                </label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    placeholder="Tell me about your systems, project goals, timeline, or engineering opportunity..."
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/[0.1] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all text-sm resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="cta-button w-full justify-center py-3.5 mt-2 text-base font-semibold transition-all disabled:opacity-50"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <i className="ri-loader-4-line animate-spin text-lg"></i>
                                        <span>Dispatching Transmission...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Transmit Message</span>
                                        <i className="ri-send-plane-fill text-sm"></i>
                                    </>
                                )}
                            </button>

                            {/* Status Notifications */}
                            {status === 'success' && (
                                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2 mt-2">
                                    <i className="ri-checkbox-circle-fill text-lg"></i>
                                    <span>Transmission received! I will review your message and respond shortly.</span>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-2 mt-2">
                                    <i className="ri-error-warning-fill text-lg"></i>
                                    <span>Transmission error. Please email directly at pratikk5143772@gmail.com</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

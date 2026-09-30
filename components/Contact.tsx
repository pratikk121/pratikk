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
                <div className="resend-tag mb-3">
                    <i className="ri-mail-send-line text-xs text-[#9281f7]"></i>
                    <span>Communications Portal</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-outfit text-[#ffffff] tracking-[-0.03em]">
                    Let&apos;s build something exceptional.
                </h2>
                <p className="text-[#a1a4a5] max-w-2xl text-base sm:text-lg mt-3 leading-relaxed tracking-[-0.01em]">
                    Have an ambitious systems project, full-stack architectural challenge, or high-impact engineering role in mind? Dispatch a transmission directly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Direct Methods & Telemetry (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    {/* Direct Email Card: 16px radius, #000000 bg, 1px #292d30 border */}
                    <div className="resend-card p-6">
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a4a5] block mb-2">Direct Mail</span>
                        <div className="flex items-center justify-between gap-3">
                            <a
                                href="mailto:pratikk5143772@gmail.com"
                                className="text-sm sm:text-base font-mono font-medium text-[#ffffff] hover:text-[#9281f7] transition-colors truncate"
                            >
                                pratikk5143772@gmail.com
                            </a>
                            <button
                                onClick={copyEmail}
                                className="p-2 rounded-md bg-[#000000] border border-[#292d30] hover:border-[#ffffff] text-[#a1a4a5] hover:text-[#ffffff] transition-colors cursor-pointer"
                                title="Copy Email Address"
                                aria-label="Copy Email"
                            >
                                {copied ? (
                                    <i className="ri-check-line text-[#3ad389] text-sm"></i>
                                ) : (
                                    <i className="ri-file-copy-line text-sm"></i>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Social Hub Links: 16px radius, #000000 bg, 1px #292d30 border */}
                    <div className="resend-card p-6">
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a4a5] block mb-4">Engineering Network</span>
                        <div className="flex flex-col gap-3">
                            <a
                                href="https://github.com/pratikk121"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-md bg-[#000000] border border-[#292d30] hover:border-[#ffffff] text-[#a1a4a5] hover:text-[#ffffff] transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <i className="ri-github-fill text-lg text-[#a1a4a5] group-hover:text-[#ffffff]"></i>
                                    <span className="text-sm font-medium">GitHub Repository</span>
                                </div>
                                <i className="ri-arrow-right-up-line text-xs text-[#6e727a] group-hover:text-[#ffffff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/pratik-kadole-119391267/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-md bg-[#000000] border border-[#292d30] hover:border-[#ffffff] text-[#a1a4a5] hover:text-[#ffffff] transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <i className="ri-linkedin-fill text-lg text-[#3b9eff] group-hover:text-[#ffffff]"></i>
                                    <span className="text-sm font-medium">LinkedIn Network</span>
                                </div>
                                <i className="ri-arrow-right-up-line text-xs text-[#6e727a] group-hover:text-[#ffffff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                            </a>
                        </div>
                    </div>

                    {/* Operational Telemetry Badge: 16px radius, 1px #292d30 border */}
                    <div className="resend-card p-4 flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3ad389] animate-pulse"></span>
                        <div className="text-xs font-mono text-[#a1a4a5]">
                            <span className="text-[#f0f0f0] font-medium">Availability Status:</span> Active &amp; responding within 24h
                        </div>
                    </div>
                </div>

                {/* Right Column: Interactive Contact Form (7 cols): 16px radius, #000000 bg, 1px #292d30 border */}
                <div className="lg:col-span-7">
                    <div className="resend-card p-6 sm:p-8">
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a4a5] mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Ada Lovelace"
                                    required
                                    className="resend-input"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a4a5] mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="ada@example.com"
                                    required
                                    className="resend-input"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a4a5] mb-2">
                                    Project Scope &amp; Message
                                </label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    placeholder="Tell me about your systems, project goals, timeline, or engineering opportunity..."
                                    required
                                    className="resend-input resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="resend-btn-ghost w-full justify-center py-3 mt-2 text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer hover:border-[#9281f7]"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <i className="ri-loader-4-line animate-spin text-base"></i>
                                        <span>Dispatching Transmission...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Transmit Message</span>
                                        <i className="ri-send-plane-fill text-xs"></i>
                                    </>
                                )}
                            </button>

                            {/* Status Notifications */}
                            {status === 'success' && (
                                <div className="p-3.5 rounded-md bg-[#000000] border border-[#3ad389] text-[#3ad389] text-xs font-mono flex items-center gap-2 mt-2">
                                    <i className="ri-checkbox-circle-fill text-base"></i>
                                    <span>Transmission received! I will review your message and respond shortly.</span>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-3.5 rounded-md bg-[#000000] border border-[#ff5f56] text-[#ff5f56] text-xs font-mono flex items-center gap-2 mt-2">
                                    <i className="ri-error-warning-fill text-base"></i>
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

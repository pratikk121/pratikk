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
        <section id="contact" className="py-8 sm:py-12 border-t border-[#292d30]">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-left">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-[#292d30] text-xs text-[#a1a4a5] mb-3">
                        <span>Get In Touch</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-[#ffffff] tracking-tight">
                        Contact
                    </h2>
                    <p className="text-[#a1a4a5] max-w-xl text-base sm:text-lg mt-2 leading-relaxed">
                        I am open to full-time engineering roles, contract projects, and open-source collaboration. Feel free to email me directly or send a message below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Direct Links & Email (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        {/* Direct Email Card */}
                        <div className="rounded-2xl bg-[#000000] border border-[#292d30] p-6">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#a1a4a5] block mb-2">
                                Direct Email
                            </span>
                            <div className="flex items-center justify-between gap-3">
                                <a
                                    href="mailto:pratikk5143772@gmail.com"
                                    className="text-sm sm:text-base font-medium text-[#ffffff] hover:text-[#9281f7] transition-colors truncate"
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

                        {/* Social Links Card */}
                        <div className="rounded-2xl bg-[#000000] border border-[#292d30] p-6">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#a1a4a5] block mb-4">
                                Links &amp; Profiles
                            </span>
                            <div className="flex flex-col gap-3">
                                <a
                                    href="https://github.com/pratikk121"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-md bg-[#000000] border border-[#292d30] hover:border-[#ffffff] text-[#a1a4a5] hover:text-[#ffffff] transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <i className="ri-github-fill text-lg text-[#a1a4a5] group-hover:text-[#ffffff]"></i>
                                        <span className="text-sm font-medium">GitHub / pratikk121</span>
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
                                        <span className="text-sm font-medium">LinkedIn Profile</span>
                                    </div>
                                    <i className="ri-arrow-right-up-line text-xs text-[#6e727a] group-hover:text-[#ffffff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                                </a>
                            </div>
                        </div>

                        {/* Location Note */}
                        <div className="rounded-2xl bg-[#000000] border border-[#292d30] p-4 flex items-center gap-3 text-xs text-[#a1a4a5]">
                            <i className="ri-map-pin-line text-[#9281f7] text-base"></i>
                            <span>Based in Maharashtra, India. Available for remote work globally.</span>
                        </div>
                    </div>

                    {/* Right Column: Clean Form (7 cols) */}
                    <div className="lg:col-span-7">
                        <div className="rounded-2xl bg-[#000000] border border-[#292d30] p-6 sm:p-8">
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#a1a4a5] mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Alex Morgan"
                                        required
                                        className="resend-input"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#a1a4a5] mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="alex@example.com"
                                        required
                                        className="resend-input"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#a1a4a5] mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        placeholder="What are you building? How can I help?"
                                        required
                                        className="resend-input resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#ffffff] text-[#000000] font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer mt-2"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <i className="ri-loader-4-line animate-spin text-base"></i>
                                            <span>Sending message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <i className="ri-arrow-right-line text-xs"></i>
                                        </>
                                    )}
                                </button>

                                {/* Status Notifications */}
                                {status === 'success' && (
                                    <div className="p-3.5 rounded-md bg-[#000000] border border-[#3ad389] text-[#3ad389] text-xs flex items-center gap-2 mt-2">
                                        <i className="ri-checkbox-circle-fill text-base"></i>
                                        <span>Message sent successfully! I will reply as soon as possible.</span>
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="p-3.5 rounded-md bg-[#000000] border border-[#ff5f56] text-[#ff5f56] text-xs flex items-center gap-2 mt-2">
                                        <i className="ri-error-warning-fill text-base"></i>
                                        <span>Failed to send. Please email directly at pratikk5143772@gmail.com</span>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

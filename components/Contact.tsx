"use client";

import { useState } from "react";
import { EnvelopeSimple, Copy, Check, PaperPlaneRight, GithubLogo } from "@phosphor-icons/react";

export default function Contact() {
  const [status, setStatus] = useState<"" | "sending" | "success" | "error">("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("pratikk5143772@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-8 sm:py-12 border-t border-[#1e2329]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f0f2f5]">
            Contact
          </h2>
          <p className="text-[#889096] max-w-xl text-sm sm:text-base mt-2 leading-relaxed">
            I am available for full-time engineering roles, contract projects, and systems collaboration. Reach out directly or submit the inquiry form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Email Copy */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl border border-[#1e2329] bg-[#0c0e12]">
              <div className="text-xs uppercase tracking-wider text-[#555d65] font-semibold mb-2">
                Primary Email
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-[#1e2329] bg-[#050505]">
                <span className="text-xs text-[#f0f2f5] font-mono truncate">
                  pratikk5143772@gmail.com
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-1.5 rounded-md hover:bg-white/10 text-[#889096] hover:text-white transition-colors"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check size={14} className="text-[#22c55e]" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-[#1e2329] bg-[#0c0e12] space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#555d65] font-semibold">
                Network Profiles
              </div>
              <a
                href="https://github.com/pratikk121"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg border border-[#1e2329] bg-[#050505] text-xs text-[#889096] hover:text-[#f0f2f5] hover:border-[#38414a] transition-all"
              >
                <div className="flex items-center gap-2">
                  <GithubLogo size={16} />
                  <span className="font-mono">github.com/pratikk121</span>
                </div>
                <span className="text-[11px] text-[#555d65]">Codebase</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-7 rounded-xl border border-[#1e2329] bg-[#0c0e12] space-y-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-[#889096] mb-1.5"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Alex Rivers"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#1e2329] bg-[#050505] text-sm text-[#f0f2f5] placeholder-[#555d65] focus:outline-none focus:border-[#38414a] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-[#889096] mb-1.5"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#1e2329] bg-[#050505] text-sm text-[#f0f2f5] placeholder-[#555d65] focus:outline-none focus:border-[#38414a] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-[#889096] mb-1.5"
                >
                  Project Details or Inquiry
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project, timeline, or engineering role..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#1e2329] bg-[#050505] text-sm text-[#f0f2f5] placeholder-[#555d65] focus:outline-none focus:border-[#38414a] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#050505] font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
              >
                {status === "sending" ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <PaperPlaneRight size={14} weight="bold" />
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="text-xs text-[#22c55e] text-center pt-2">
                  Message sent successfully. I will get back to you shortly.
                </p>
              )}

              {status === "error" && (
                <p className="text-xs text-[#ef4444] text-center pt-2">
                  Failed to send message. Please email directly at pratikk5143772@gmail.com
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden z-10 px-4 text-center">
      {/* 404 Display */}
      <div className="relative mb-6 select-none">
        <h1 className="text-7xl sm:text-9xl font-black font-outfit text-[#292d30] tracking-tighter">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl sm:text-4xl font-bold font-outfit text-[#ffffff]">
            Page Not Found
          </span>
        </div>
      </div>

      {/* Description Card: 16px radius, #000000 bg, 1px #292d30 border */}
      <div className="resend-card p-6 sm:p-7 max-w-lg w-full mb-8">
        <p className="text-[#f0f0f0] text-sm sm:text-base leading-relaxed mb-4">
          The page at <span className="text-[#9281f7] font-mono break-all">{pathname}</span> could not be found. It may have been relocated or updated.
        </p>
        <p className="text-xs text-[#a1a4a5]">
          Navigate back to the portfolio or explore public projects below.
        </p>
      </div>

      {/* Navigation Actions: Strict 6px radius */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="resend-btn-ghost px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 hover:border-[#ffffff]"
        >
          <i className="ri-home-4-line text-sm"></i>
          <span>Return Home</span>
        </Link>
        <Link
          href="/work"
          className="resend-btn-ghost px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 text-[#9281f7] hover:border-[#9281f7]"
        >
          <i className="ri-folder-line text-sm"></i>
          <span>Explore Projects</span>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-md text-[#a1a4a5] hover:text-[#ffffff] transition-colors text-xs font-medium border border-transparent hover:border-[#292d30] cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

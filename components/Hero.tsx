import Link from 'next/link';

export default function Hero() {
  const tools = [
    'TypeScript',
    'Next.js',
    'React',
    'Python',
    'FastAPI',
    'Tailwind CSS',
    'PostgreSQL',
    'Prisma',
  ];

  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 min-h-[75vh] flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Direct Editorial Introduction */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#292d30] text-xs text-[#a1a4a5] bg-[#000000]">
              <span className="w-2 h-2 rounded-full bg-[#3ad389]"></span>
              <span>Available for software engineering roles &amp; contracts</span>
            </span>
          </div>

          {/* Name & Title */}
          <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#ffffff] leading-[1.1] mb-4">
            Pratik Kadole
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-[#f0f0f0] mb-5 tracking-tight">
            Software engineer building practical software, developer tools, and systems.
          </p>

          {/* Honest Description */}
          <p className="text-base sm:text-lg text-[#a1a4a5] max-w-xl leading-relaxed mb-8">
            I focus on full-stack web applications, reactive user interfaces, and systems tools. I care about clean architecture, good developer experience, and shipping software that works reliably.
          </p>

          {/* Direct Evidence & Action Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#ffffff] text-[#000000] font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <span>Selected Work</span>
              <i className="ri-arrow-down-line text-sm" aria-hidden="true"></i>
            </Link>

            <a
              href="https://github.com/pratikk121"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#292d30] text-[#f0f0f0] font-medium text-sm hover:border-[#ffffff] hover:bg-white/[0.03] transition-all"
            >
              <i className="ri-github-fill text-base" aria-hidden="true"></i>
              <span>GitHub</span>
            </a>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#292d30] text-[#a1a4a5] font-medium text-sm hover:text-[#ffffff] hover:border-[#464a4d] transition-all"
            >
              <span>Contact</span>
            </Link>
          </div>

          {/* Context subtext & primary tools */}
          <div className="pt-6 border-t border-[#292d30] flex flex-col gap-3">
            <div className="text-xs text-[#6e727a]">
              Based in India · Building independently · Open source contributor
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-[#a1a4a5] mr-2">Tools:</span>
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded-md text-xs border border-[#292d30] text-[#a1a4a5] bg-[#000000]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Grounded Evidence Card */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
          <div className="w-full max-w-md rounded-2xl bg-[#000000] border border-[#292d30] p-6 sm:p-7 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-[#292d30] mb-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#a1a4a5]">
                Current Work &amp; Focus
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md border border-[#292d30] text-[#3ad389] bg-[#000000]">
                Active
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-3.5 rounded-md border border-[#292d30] bg-[#0b0e14]/50">
                <div className="text-xs font-semibold text-[#ffffff] mb-1">
                  Full-Stack Applications
                </div>
                <p className="text-xs text-[#a1a4a5] leading-relaxed">
                  Building reactive interfaces and API backends using Next.js 16, React, Python, and FastAPI.
                </p>
              </div>

              <div className="p-3.5 rounded-md border border-[#292d30] bg-[#0b0e14]/50">
                <div className="text-xs font-semibold text-[#ffffff] mb-1">
                  Browser Systems &amp; Window Managers
                </div>
                <p className="text-xs text-[#a1a4a5] leading-relaxed">
                  Experimenting with in-browser window layering, WebGL shader compositing, and state serialization in AetherOS.
                </p>
              </div>

              <div className="p-3.5 rounded-md border border-[#292d30] bg-[#0b0e14]/50">
                <div className="text-xs font-semibold text-[#ffffff] mb-1">
                  Public Code on GitHub
                </div>
                <p className="text-xs text-[#a1a4a5] leading-relaxed">
                  All personal work, experiments, and prototypes are maintained in public repositories with reproducible setups.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#292d30] flex items-center justify-between text-xs text-[#a1a4a5]">
              <span>github.com/pratikk121</span>
              <a
                href="https://github.com/pratikk121"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9281f7] hover:underline flex items-center gap-1"
              >
                <span>View repositories</span>
                <i className="ri-arrow-right-line text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

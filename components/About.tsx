export default function About() {
  const toolGroups = [
    {
      category: "Frontend",
      tools: ["TypeScript", "React", "Next.js", "Tailwind CSS", "HTML5 & CSS3", "WebGL / Canvas"],
    },
    {
      category: "Backend",
      tools: ["Python", "FastAPI", "Node.js", "Express", "RESTful APIs"],
    },
    {
      category: "Databases & Storage",
      tools: ["PostgreSQL", "Prisma ORM", "SQLAlchemy", "Supabase", "IndexedDB"],
    },
    {
      category: "Tools & Workflow",
      tools: ["Git & GitHub", "Vercel", "Linux", "Vite", "Postman"],
    },
  ];

  return (
    <section id="about" className="py-8 sm:py-12 border-t border-[#292d30]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-[#292d30] text-xs text-[#a1a4a5] mb-3">
            <span>Background &amp; Mindset</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-[#ffffff] tracking-tight">
            About Me
          </h2>
        </div>

        {/* Narrative / Personal Philosophy */}
        <div className="space-y-5 text-base sm:text-lg text-[#a1a4a5] leading-relaxed mb-12">
          <p>
            I am a software engineer based in India with a strong interest in full-stack web applications, developer tools, and reactive client-side systems. I spend most of my time building tools that solve practical problems, whether that is an interactive scoping tool for clients, an offline-first agricultural PWA, or an experimental in-browser window manager.
          </p>
          <p>
            My approach to engineering is straightforward: write code that is readable, keep dependencies intentional, and prefer working implementations over excessive abstractions. I believe the best way to demonstrate competence is to make the code accessible and let anyone inspect the commits, tradeoffs, and architecture directly.
          </p>
          <p>
            When I am not working on client projects or prototypes, I am exploring graphics shaders in WebGL, experimenting with lightweight asynchronous backends in Python, and contributing to open-source software.
          </p>
        </div>

        {/* Engineering Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          <div className="p-5 rounded-2xl bg-[#000000] border border-[#292d30]">
            <div className="w-8 h-8 rounded-md bg-[#0b0e14] border border-[#292d30] flex items-center justify-center text-[#9281f7] text-base mb-3">
              <i className="ri-code-box-line"></i>
            </div>
            <h3 className="text-sm font-bold font-outfit text-[#ffffff] mb-1.5">
              Pragmatic Architecture
            </h3>
            <p className="text-xs text-[#a1a4a5] leading-relaxed">
              Choosing reliable, well-understood primitives first. Adding complexity only when concrete performance or operational constraints demand it.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#000000] border border-[#292d30]">
            <div className="w-8 h-8 rounded-md bg-[#0b0e14] border border-[#292d30] flex items-center justify-center text-[#3ad389] text-base mb-3">
              <i className="ri-git-branch-line"></i>
            </div>
            <h3 className="text-sm font-bold font-outfit text-[#ffffff] mb-1.5">
              Verifiable Code
            </h3>
            <p className="text-xs text-[#a1a4a5] leading-relaxed">
              All claims link to real, inspectable repositories. Every project reflects actual design decisions, trade-offs, and iterative commit histories.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#000000] border border-[#292d30]">
            <div className="w-8 h-8 rounded-md bg-[#0b0e14] border border-[#292d30] flex items-center justify-center text-[#3b9eff] text-base mb-3">
              <i className="ri-layout-3-line"></i>
            </div>
            <h3 className="text-sm font-bold font-outfit text-[#ffffff] mb-1.5">
              End-to-End Craft
            </h3>
            <p className="text-xs text-[#a1a4a5] leading-relaxed">
              Caring equally about database schema integrity, asynchronous API speed, responsive ergonomics, and keyboard accessibility.
            </p>
          </div>
        </div>

        {/* Tools I Use */}
        <div className="rounded-2xl bg-[#000000] border border-[#292d30] p-6 sm:p-8">
          <div className="mb-6 pb-4 border-b border-[#292d30] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-outfit text-[#ffffff]">
                Technologies &amp; Tools
              </h3>
              <p className="text-xs text-[#a1a4a5] mt-0.5">
                Languages, frameworks, and libraries I work with regularly.
              </p>
            </div>
            <span className="text-xs text-[#6e727a]">Zero invented metrics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolGroups.map((group) => (
              <div key={group.category}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ffffff] mb-3 pb-1 border-b border-[#292d30]/60">
                  {group.category}
                </h4>
                <ul className="space-y-2">
                  {group.tools.map((tool) => (
                    <li
                      key={tool}
                      className="text-xs text-[#a1a4a5] flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#6e727a]"></span>
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

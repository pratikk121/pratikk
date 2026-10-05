import { CheckCircle, Code, ShieldCheck, Lightning } from "@phosphor-icons/react/dist/ssr";

export default function About() {
  const principles = [
    {
      title: "Predictable Architecture",
      desc: "Favoring explicit data flow, deterministic state machines, and type-safe boundaries over clever, fragile abstractions.",
      icon: <Code size={20} className="text-[#3b82f6]" weight="duotone" />,
    },
    {
      title: "Performance & Low Footprint",
      desc: "Minimizing layout repaints, keeping bundle sizes lean, and profiling real hardware to ensure interfaces stay fluid at 60fps.",
      icon: <Lightning size={20} className="text-[#22c55e]" weight="duotone" />,
    },
    {
      title: "Reliability & Longevity",
      desc: "Writing maintainable TypeScript and Python with thorough validation, clean separation of concerns, and automated tests.",
      icon: <ShieldCheck size={20} className="text-[#a855f7]" weight="duotone" />,
    },
  ];

  return (
    <section id="about" className="py-8 sm:py-12 border-t border-[#1e2329]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-6 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f0f2f5]">
            Engineering Philosophy
          </h2>

          <p className="text-sm sm:text-base text-[#889096] leading-relaxed">
            I am a full-stack and systems developer based in India. I focus on building resilient web applications, developer tools, and browser graphics experiments.
          </p>

          <p className="text-sm sm:text-base text-[#889096] leading-relaxed">
            My work is grounded in understanding systems from the ground up: from the browser’s compositor and DOM paint cycles to asynchronous backend architectures in Python and PostgreSQL.
          </p>

          <p className="text-sm sm:text-base text-[#889096] leading-relaxed">
            I avoid unnecessary hype and focus on shipping robust, testable software that solves actual technical challenges.
          </p>
        </div>

        {/* Right Column: Core Engineering Principles */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
          {principles.map((p) => (
            <div
              key={p.title}
              className="p-5 rounded-xl border border-[#1e2329] bg-[#0c0e12] hover:border-[#38414a] transition-all flex items-start gap-4"
            >
              <div className="p-2.5 rounded-lg border border-[#1e2329] bg-[#050505] shrink-0">
                {p.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#f0f2f5] mb-1">
                  {p.title}
                </h3>
                <p className="text-xs text-[#889096] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

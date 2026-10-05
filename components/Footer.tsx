import { ArrowUpRight, GithubLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1e2329] bg-[#050505] py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-xs text-[#555d65]">
          <span>© {currentYear} Pratik Kadole. Designed with focus on simplicity and performance.</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#889096]">
          <a
            href="https://github.com/pratikk121"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#f0f2f5] transition-colors"
          >
            <GithubLogo size={15} />
            <span>GitHub</span>
            <ArrowUpRight size={12} weight="bold" />
          </a>

          <a
            href="mailto:contact@pratikk.site"
            className="flex items-center gap-1.5 hover:text-[#f0f2f5] transition-colors"
          >
            <EnvelopeSimple size={15} />
            <span>Email</span>
            <ArrowUpRight size={12} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}

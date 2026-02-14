import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({
    params,
}: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="pt-32 px-6 max-w-[1000px] mx-auto min-h-screen">
            <Link href="/work" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                <i className="ri-arrow-left-line mr-2"></i> Back to Work
            </Link>

            <div className="project-header mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">{project.title}</h1>
                <p className="text-xl text-slate-400 max-w-2xl">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-300 border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4 mt-8">
                    <a
                        href={project.demoLink}
                        target="_blank"
                        className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-transform inline-flex items-center gap-2"
                    >
                        Launch Experience <i className="ri-external-link-line"></i>
                    </a>
                    {project.repoLink && (
                        <a
                            href={project.repoLink}
                            target="_blank"
                            className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors inline-flex items-center gap-2"
                        >
                            View Source <i className="ri-github-line"></i>
                        </a>
                    )}
                </div>
            </div>

            <div className="project-content prose prose-invert max-w-none prose-lg">
                {project.isIcon ? (
                    <div className="w-full h-[300px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-12 border border-white/10">
                        <i className={`${project.image} text-9xl text-white/50`}></i>
                    </div>
                ) : (
                    <div className="w-full h-[400px] bg-slate-800 rounded-2xl mb-12 overflow-hidden border border-white/10">
                        {/* Image placeholder */}
                    </div>
                )}

                <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
        </main>
    );
}

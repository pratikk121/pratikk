import Link from "next/link";

export default function SelectedWorks() {
    return (
        <section id="projects" className="reveal active">
            <div className="section-header">
                <h2 className="section-title"><i className="ri-stack-line"></i> Selected Works</h2>
                <p className="section-subtitle">A collection of experiments and production applications.</p>
            </div>

            <div className="projects-grid">
                {/* Project 1: PratikOS */}
                <div className="project-card">
                    <div className="card-image os">
                        <i className="ri-macbook-line" style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.2)' }}></i>
                    </div>
                    <div className="card-content">
                        <h3>PratikOS v1</h3>
                        <p>An interactive, web-based operating system featuring a simulated file system, window manager, and real-time apps.</p>
                        <div className="card-tags">
                            <span className="tag">Vanilla JS</span>
                            <span className="tag">CSS Grid</span>
                            <span className="tag">Supabase</span>
                        </div>
                        {/* Note: Linking to static subproject in public/sandbox */}
                        <a href="/sandbox/pratikOS/index.html" className="card-link" target="_blank">
                            Launch Experience <i className="ri-external-link-line"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

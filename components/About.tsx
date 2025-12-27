export default function About() {
    return (
        <section id="about" className="reveal active">
            <div className="section-header">
                <h2 className="section-title"><i className="ri-user-smile-line"></i> About</h2>
            </div>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '2rem' }}>
                <p>
                    I specialize in bridging the gap between design and engineering. My philosophy is simple: tools
                    should be not just functional, but delightful to use.
                    I'm currently focused on building accessible, high-performance web applications using modern web
                    technologies.
                </p>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Engineering</h4>
                        <p style={{ fontSize: '0.9rem' }}>Building robust, scalable front-end architectures.</p>
                    </div>
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Design</h4>
                        <p style={{ fontSize: '0.9rem' }}>Crafting intuitive user journeys and pixel-perfect UIs.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

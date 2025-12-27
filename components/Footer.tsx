export default function Footer() {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Pratik Kadole. Crafted with <i className="ri-heart-3-fill" style={{ color: 'var(--accent-secondary)' }}></i> and Code.</p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem' }}>
                <a href="https://github.com/pratikk121" aria-label="GitHub Profile" style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}><i className="ri-github-line"></i></a>
                <a href="#" aria-label="LinkedIn Profile" style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}><i className="ri-linkedin-line"></i></a>
            </div>
        </footer>
    );
}

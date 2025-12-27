import Link from "next/link";

export default function Writing() {
    return (
        <section id="writing" className="reveal active">
            <div className="section-header">
                <h2 className="section-title"><i className="ri-quill-pen-line"></i> Writing</h2>
                <p className="section-subtitle">Thoughts on engineering, design, and user experience.</p>
            </div>

            <div className="writing-grid">
                <Link href="#" className="writing-card">
                    <span className="writing-date">Dec 28, 2024</span>
                    <h3>The Future of Fluid Interfaces</h3>
                    <p>Why micro-interactions are the secret to building products that feel alive.</p>
                    <div className="writing-link">Read Article <i className="ri-arrow-right-line"></i></div>
                </Link>
                {/* Add more articles as needed */}
            </div>
        </section>
    );
}

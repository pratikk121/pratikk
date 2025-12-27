import Typewriter from "./Typewriter";

export default function Hero() {
    return (
        <section className="hero reveal active">
            <h1>
                Building the future of <br />
                <Typewriter />
            </h1>
            <p>
                I'm Pratik, a software engineer obsessed with fluid interactions, pixel-perfect design, and robust engineering.
            </p>

            <div className="tech-stack">
                <div className="tech-badge"><i className="ri-reactjs-line"></i> React</div>
                <div className="tech-badge"><i className="ri-javascript-line"></i> JavaScript</div>
                <div className="tech-badge"><i className="ri-database-2-line"></i> Supabase</div>
                <div className="tech-badge"><i className="ri-css3-line"></i> CSS3</div>
                <div className="tech-badge"><i className="ri-git-branch-line"></i> Git</div>
            </div>
        </section>
    );
}

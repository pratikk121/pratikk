'use client'; // Client Component for form interaction

import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <section id="contact" className="contact-section reveal active">
            <div className="contact-container">
                <div className="contact-info">
                    <h2 className="section-title">Let's work together.</h2>
                    <p>Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you as soon as possible.</p>
                    <div className="contact-methods">
                        <a href="mailto:pratikk5143772@gmail.com" className="contact-method">
                            <i className="ri-mail-send-line"></i>
                            <span>pratikk5143772@gmail.com</span>
                        </a>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Your Email" required />
                    </div>
                    <div className="form-group">
                        <textarea rows={4} placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" className="cta-button" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
                        {status === 'sending' ? 'Sending...' : 'Send Message'} <i className="ri-send-plane-fill"></i>
                    </button>

                    {status === 'success' && (
                        <p className="form-status success">Thanks! Message sent successfully.</p>
                    )}
                </form>
            </div>
        </section>
    );
}

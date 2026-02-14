'use client'; // Client Component for form interaction

import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
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
                        <input type="text" name="name" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Your Email" required />
                    </div>
                    <div className="form-group">
                        <textarea name="message" rows={4} placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" className="cta-button" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
                        {status === 'sending' ? 'Sending...' : 'Send Message'} <i className="ri-send-plane-fill"></i>
                    </button>

                    {status === 'success' && (
                        <p className="form-status success">Thanks! Message sent successfully.</p>
                    )}
                    {status === 'error' && (
                        <p className="form-status error" style={{ color: '#ef4444' }}>Failed to send message. Please try again.</p>
                    )}
                </form>
            </div>
        </section>
    );
}

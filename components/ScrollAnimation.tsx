'use client';

import { useEffect } from 'react';

export default function ScrollAnimation() {
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;

            revealElements.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Trigger once on load

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    return null; // This component renders nothing visually
}

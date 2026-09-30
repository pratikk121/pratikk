'use client';

import { useState, useEffect } from 'react';

const phrases = [
    "ambient operating systems.",
    "distributed architectures.",
    "AI financial intelligence.",
    "high-concurrency web engines."
];

export default function Typewriter() {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(120);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 40 : 80);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2200); // Hold completed text
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(400); // Pause before next phrase
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <span className="inline-block min-h-[1.15em] txt-gradient font-bold" id="typewriter">
            <span>{text}</span>
            <span className="cursor-blink font-light ml-0.5 select-none" aria-hidden="true">|</span>
        </span>
    );
}

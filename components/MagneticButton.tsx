"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
    children,
    className = "",
    onClick,
    href,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    const content = (
        <motion.div
            style={{ position: "relative" }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} className="inline-block" onClick={onClick}>
                {content}
            </a>
        );
    }

    return (
        <div className="inline-block" onClick={onClick} style={{ cursor: "pointer" }}>
            {content}
        </div>
    );
}

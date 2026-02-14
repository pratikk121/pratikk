"use client";

import { useMyPresence, useOthers } from "@liveblocks/react";
import { useEffect } from "react";

// Initial presence
type Presence = {
    cursor: { x: number; y: number } | null;
};

export default function LiveCursors() {
    const [myPresence, updateMyPresence] = useMyPresence();
    const others = useOthers();

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            // Create a smooth cursor movement
            updateMyPresence({ cursor: { x: Math.floor(e.clientX), y: Math.floor(e.clientY) } });
        };

        const handlePointerLeave = () => {
            updateMyPresence({ cursor: null });
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerleave", handlePointerLeave);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, [updateMyPresence]);

    return (
        <>
            {others.map(({ connectionId, presence }) => {
                if (!presence?.cursor) return null;

                const { x, y } = presence.cursor as { x: number; y: number };

                return (
                    <div
                        key={connectionId}
                        style={{
                            position: "fixed",
                            left: 0,
                            top: 0,
                            width: "24px",
                            height: "24px",
                            transform: `translateX(${x}px) translateY(${y}px)`,
                            zIndex: 9999,
                            pointerEvents: "none",
                            transition: "transform 0.1s linear",
                        }}
                    >
                        {/* Custom Cursor SVG */}
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z"
                                fill="#1f2937"
                                stroke="white"
                            />
                        </svg>
                        <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded-full absolute top-4 left-4 whitespace-nowrap opacity-50">
                            Visitor {connectionId % 100}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

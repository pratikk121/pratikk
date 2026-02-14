"use client";

import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react";

export default function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
    const publicApiKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;

    if (!publicApiKey) {
        return <>{children}</>;
    }

    return (
        <LiveblocksProvider publicApiKey={publicApiKey}>
            <RoomProvider id="portfolio-room">
                <ClientSideSuspense fallback={children}>
                    {() => children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}

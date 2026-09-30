import SelectedWorks from "@/components/SelectedWorks";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Selected Works & Case Studies | Pratik Kadole",
    description: "Explore flagship engineering projects, production distributed systems, ambient operating systems, and full-stack platforms by Pratik Kadole.",
};

export default function WorkPage() {
    return (
        <main className="pt-24 sm:pt-28 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
            <SelectedWorks showHeader={true} />
        </main>
    );
}

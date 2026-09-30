import About from "@/components/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Pratik Kadole",
    description: "About Pratik Kadole, software engineer based in India. Background, principles, and tools.",
};

export default function AboutPage() {
    return (
        <main className="pt-24 sm:pt-28 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
            <About />
        </main>
    );
}

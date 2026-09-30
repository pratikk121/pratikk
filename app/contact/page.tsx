import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact & Collaborations | Pratik Kadole",
    description: "Get in touch with Pratik Kadole for systems architecture, technical advisory, high-performance web platforms, and engineering opportunities.",
};

export default function ContactPage() {
    return (
        <main className="pt-24 sm:pt-28 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
            <Contact />
        </main>
    );
}

import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import About from "@/components/About";
import Writing from "@/components/Writing";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Home() {
  return (
    <>
      <ScrollAnimation />
      <main className="pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen space-y-16 sm:space-y-20">
        <Hero />
        <SelectedWorks showHeader={true} />
        <About />
        <Writing />
      </main>
    </>
  );
}

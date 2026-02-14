import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import Writing from "@/components/Writing";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Home() {
  return (
    <>
      <ScrollAnimation />
      <main>
        <Hero />
        <SelectedWorks />
        <Writing />
      </main>
    </>
  );
}

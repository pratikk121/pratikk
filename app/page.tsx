import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import Writing from "@/components/Writing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Home() {
  return (
    <>
      <ScrollAnimation />
      <Navbar />
      <main>
        <Hero />
        <SelectedWorks />
        <Writing />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

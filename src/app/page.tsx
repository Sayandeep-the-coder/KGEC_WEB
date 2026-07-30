import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Impact from "@/components/Impact";
import Facilities from "@/components/Facilities";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans w-full overflow-hidden">
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <Highlights />
        <Impact />
        <Facilities />
        <Achievements />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
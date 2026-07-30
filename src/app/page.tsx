import Header from "../components/Header";
import Hero from "../components/Hero";
import Achievements from "../components/Achievements";
import Facilities from "../components/Facilities";
import Impact from "../components/Impact";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="w-full mt-6">
        <Hero />
        <Achievements />
        <Facilities />
        <Impact />
        <Gallery />
        <Footer />
      </main>
    </>
  );
}
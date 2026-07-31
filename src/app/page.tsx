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
    <div
      className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory font-sans bg-white scroll-smooth"
      id="main-scroll"
    >
      {/* Section 1: Header + Hero */}
      <section className="snap-start min-h-screen w-full flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex flex-col justify-center">
          <Hero />
        </div>
      </section>

      {/* Section 2: Highlights */}
      <section className="snap-start min-h-screen w-full flex flex-col justify-center bg-white">
        <Highlights />
      </section>

      {/* Section 3: Impact */}
      <section className="snap-start min-h-screen w-full flex flex-col justify-center bg-white">
        <Impact />
      </section>

      {/* Section 4: Facilities */}
      <section className="snap-start min-h-screen w-full flex flex-col justify-center bg-white">
        <Facilities />
      </section>

      {/* Section 5: Achievements */}
      <section className="snap-start min-h-screen w-full flex flex-col justify-center bg-white">
        <Achievements />
      </section>

      {/* Section 6: Gallery */}
      <section className="snap-start min-h-screen w-full flex flex-col justify-center bg-white">
        <Gallery />
      </section>

      {/*
        Footer: snap-start so it locks in place.
        min-h-screen so the snap section fully fills the viewport.
        Footer content sits at the bottom of this snap slot — reveal from below effect.
      */}
      <section className="snap-start min-h-screen w-full flex flex-col justify-end bg-white">
        <Footer />
      </section>
    </div>
  );
}
import Header from "@/components/Header";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Impact from "@/components/Impact";
import Announcements from "@/components/Announcements";
import Facilities from "@/components/Facilities";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const getCachedHomepageNotices = unstable_cache(
  async () => {
    return db
      .select()
      .from(notices)
      .where(eq(notices.isActive, true))
      .orderBy(desc(notices.publishedAt))
      .limit(5);
  },
  ["homepage-notices"],
  { revalidate: 300, tags: ["notices"] }
);

export default async function Home() {
  const latestNotices = await getCachedHomepageNotices();
  
  const formattedNotices = latestNotices.map((n) => ({
    id: n.id,
    title: n.title,
    type: n.type,
    fileUrl: n.fileUrl || n.pdfUrl,
    publishedAt: new Date(n.publishedAt).toISOString(),
  }));
  
  return (
    <div
      className="h-screen w-full overflow-y-auto overflow-x-hidden lg:snap-y lg:snap-mandatory font-sans bg-white scroll-smooth"
      id="main-scroll"
    >
      {/* Section 1: Header + Hero */}
      <section className="lg:snap-start lg:min-h-screen w-full flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex flex-col justify-center">
          <Hero />
        </div>
      </section>

      {/* Section 2: Highlights */}
      <section className="lg:snap-start lg:min-h-screen w-full flex flex-col justify-center bg-white">
        <Highlights />
      </section>

      {/* Section 3: Impact */}
      <section className="lg:snap-start lg:min-h-screen w-full flex flex-col justify-center bg-white">
        <Impact />
      </section>

      {/* Section 4: Announcements */}
      <section className="lg:snap-start lg:min-h-screen w-full flex flex-col justify-center bg-white">
        <Announcements notices={formattedNotices} />
      </section>

      {/* Section 5: Facilities */}
      <section className="lg:snap-start lg:min-h-screen w-full flex flex-col justify-center bg-white">
        <Facilities />
      </section>

      {/* Section 5: Achievements */}
      <section className="lg:snap-start lg:min-h-screen w-full flex flex-col justify-center bg-white">
        <Achievements />
      </section>

      {/* Section 6: Gallery */}
      <section className="lg:snap-start lg:min-h-screen w-full flex flex-col justify-center bg-white">
        <Gallery />
      </section>

      {/* Section 7: Contact */}
      <section className="lg:snap-start lg:min-h-screen w-full flex flex-col justify-center bg-white">
        <Contact />
      </section>

      {/*
        Footer: snap-start so it locks in place.
        min-h-screen so the snap section fully fills the viewport.
        Footer content sits at the bottom of this snap slot — reveal from below effect.
      */}
      <section className="lg:snap-start lg:min-h-screen w-full flex flex-col justify-end bg-white">
        <Footer />
      </section>
    </div>
  );
}
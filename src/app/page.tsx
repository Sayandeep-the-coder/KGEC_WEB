import Header from "@/components/Header";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import Hero from "@/components/Hero";
import PrincipalMessage from "@/components/PrincipalMessage";
import LatestNews from "@/components/LatestNews";
import DepartmentsExplorer from "@/components/DepartmentsExplorer";
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
    try {
      return await db
        .select()
        .from(notices)
        .where(eq(notices.isActive, true))
        .orderBy(desc(notices.publishedAt))
        .limit(5);
    } catch (error) {
      console.warn("Database connection failed, serving fallback notices:", error);
      return [
        {
          id: "1",
          title: "Welcome to Kalyani Government Engineering College Official Portal",
          type: "GENERAL",
          fileUrl: null,
          pdfUrl: null,
          publishedAt: new Date(),
        },
        {
          id: "2",
          title: "Academic Calendar & Examination Guidelines for Even Semester 2026",
          type: "ACADEMIC",
          fileUrl: null,
          pdfUrl: null,
          publishedAt: new Date(),
        },
        {
          id: "3",
          title: "WBJEE 2026 Cutoff Ranks & Seat Matrix Notification",
          type: "PLACEMENT",
          fileUrl: null,
          pdfUrl: null,
          publishedAt: new Date(),
        },
      ];
    }
  },
  ["homepage-notices-v2"],
  { revalidate: 60, tags: ["notices"] }
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
    <div className="min-h-screen w-full font-sans bg-white flex flex-col gap-4 md:gap-8 overflow-x-hidden">
      {/* Header + Hero */}
      <div className="w-full flex flex-col bg-white">
        <Header />
        <Hero />
      </div>

      {/* Announcements & Circulars */}
      <section className="w-full bg-white">
        <Announcements notices={formattedNotices} />
      </section>

      {/* Latest News */}
      <section className="w-full bg-white">
        <LatestNews />
      </section>

      {/* Academic Departments Explorer */}
      <section className="w-full bg-white">
        <DepartmentsExplorer />
      </section>

      {/* Highlights */}
      <section className="w-full bg-white">
        <Highlights />
      </section>

      {/* Impact (Hidden for now) */}
      {/* <section className="w-full bg-white">
        <Impact />
      </section> */}

      {/* Facilities */}
      <section className="w-full bg-white">
        <Facilities />
      </section>

      {/* Achievements */}
      <section className="w-full bg-[#f9f9ff] py-6 sm:py-8">
        <Achievements />
      </section>

      {/* Gallery */}
      <section className="w-full bg-white">
        <Gallery />
      </section>

      {/* Contact */}
      <section className="w-full bg-white">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="w-full bg-white">
        <Footer />
      </footer>
    </div>
  );
}
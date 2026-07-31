import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryComponent from "@/components/Gallery";

export const metadata = {
  title: "Campus Gallery | Kalyani Government Engineering College",
  description: "Moments, campus events, technical festivals, and student life at KGEC.",
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            CAMPUS MEMORIES & EVENTS
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Photo & Media Gallery
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            Explore campus life, technological symposiums, cultural festivals, and achievements.
          </p>
        </div>

        <GalleryComponent />
      </main>

      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Camera,
  Sparkles,
  Image as ImageIcon,
  Compass,
  ArrowRight
} from "lucide-react";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";

export const metadata = {
  title: "Campus Photo & Media Gallery | Kalyani Government Engineering College",
  description:
    "Explore photo memories, campus landmarks, technical symposiums, cultural festivals (Espektro), and student life at KGEC.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  let images: Array<{ id: string; album: string; imageUrl: string; caption: string | null }> = [];
  try {
    images = await db.select().from(galleryImages);
  } catch (err) {
    console.error("Error fetching gallery images:", err);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Campus Memories & Visuals</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Photo & Media Gallery
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                A visual journey through academic excellence, innovation hackathons, campus infrastructure, sports meets, and cultural festivals at KGEC.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/campus-life"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Campus Life & Clubs</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Compass size={16} />
                  <span>About Campus</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <Camera size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Campus Life</p>
                    <p className="text-xl font-bold font-serif">Moments at KGEC</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Capturing 30 years of collegiate memories, academic convocations, alumni meets, and vibrant student societies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div key={image.id} className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="aspect-square relative">
                  <img 
                    src={image.imageUrl} 
                    alt={image.caption || image.album || "Gallery Image"} 
                    loading="lazy"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                {(image.caption || image.album) && (
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4 pt-12 text-white pointer-events-none">
                    <p className="text-sm font-semibold truncate">{image.album}</p>
                    {image.caption && <p className="text-xs text-white/70 truncate mt-1">{image.caption}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <ImageIcon className="mx-auto h-12 w-12 opacity-20 mb-4" />
            <p>No images found in the gallery.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

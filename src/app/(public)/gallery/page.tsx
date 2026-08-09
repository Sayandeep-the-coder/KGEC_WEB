

import Link from "next/link";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import {
  Camera,
  Image as ImageIcon,
  Compass,
  ArrowRight
} from "lucide-react";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Campus Photo & Media Gallery | Kalyani Government Engineering College",
  description:
    "Explore photo memories, campus landmarks, technical symposiums, cultural festivals (Espektro), and student life at KGEC.",
};

const getCachedGallery = unstable_cache(
  async () => {
    return db.select().from(galleryImages);
  },
  ["gallery-page"],
  { revalidate: 600, tags: ["gallery"] }
);

export default async function GalleryPage() {
  let images: Array<{ id: string; album: string; imageUrl: string; caption: string | null }> = [];
  try {
    images = await getCachedGallery();
  } catch (err) {
    console.error("Error fetching gallery images:", err);
  }

  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Campus Memories & Visuals"
        title="Photo & Media Gallery"
        subtitle="A visual journey through academic excellence, innovation hackathons, campus infrastructure, sports meets, and cultural festivals at KGEC."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/campus-life"
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Campus Life & Clubs <ArrowRight size={16} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white/80 font-medium hover:bg-white/10 transition-colors"
          >
            About Campus
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div key={image.id} className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="aspect-square relative">
                  <Image 
                    src={image.imageUrl} 
                    alt={image.caption || image.album || "Gallery Image"} 
                    fill
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

      </UnifiedPageLayout>
  );
}

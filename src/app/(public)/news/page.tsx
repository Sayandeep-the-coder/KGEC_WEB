import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Newspaper, Sparkles, Bell } from "lucide-react";
import { db } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Campus News & Highlights | Kalyani Government Engineering College",
  description:
    "Read the latest news highlights, academic achievements, research publications, hackathon wins, and press coverage from KGEC.",
};

export const dynamic = "force-dynamic";

export default async function PublicNewsPage() {
  const articles = await db
    .select()
    .from(news)
    .orderBy(desc(news.publishedAt));

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Campus Media & Press</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                News & Institutional Highlights
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Celebrating student triumphs in national hackathons, faculty research breakthroughs, sports championships, and campus milestones.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/notices"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Official Notice Board</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Newspaper size={16} />
                  <span>Photo Gallery</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <Newspaper size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Campus Media</p>
                    <p className="text-xl font-bold font-serif">Stories of Impact</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Documenting the spirit, creativity, and intellectual accomplishments of the KGEC collegiate community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {articles.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center text-slate-500 text-sm">
            No news articles published yet. Check back soon for the latest campus updates!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                {item.imageUrl ? (
                  <div className="relative w-full h-52 bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-52 bg-slate-100 flex items-center justify-center text-slate-400">
                    <Newspaper size={40} />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2E5C9E] font-bold uppercase text-[10px]">
                        Campus News
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(item.publishedAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>

                    <h2 className="font-bold text-[#1B2A4A] text-lg font-serif line-clamp-2 leading-snug">
                      {item.title}
                    </h2>
                  </div>

                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E5C9E] hover:text-[#1B2A4A] pt-2 transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

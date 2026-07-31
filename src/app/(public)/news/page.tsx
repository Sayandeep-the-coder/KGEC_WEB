import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { db } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "News & Press Releases | Kalyani Government Engineering College",
  description: "Read the latest news highlights, press releases, achievements, and events from KGEC.",
};

export const dynamic = "force-dynamic";

export default async function PublicNewsPage() {
  const articles = await db
    .select()
    .from(news)
    .orderBy(desc(news.publishedAt));

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="bg-[#0f2552] text-white rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Campus Media & Press
            </span>
            <h1 className="text-3xl md:text-4xl font-bold font-serif">
              KGEC News & Highlights
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl">
              Discover student innovations, department breakthroughs, sports triumphs, research accolades, and campus events.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
        </div>

        {/* News Grid */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
            No news articles published yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {item.imageUrl ? (
                  <div className="relative w-full h-48 bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                    <Newspaper size={40} />
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold uppercase text-[10px]">
                        Campus News
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(item.publishedAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>

                    <h2 className="font-bold text-slate-900 text-base line-clamp-2">
                      {item.title}
                    </h2>
                  </div>

                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f2552] hover:text-blue-600 pt-2 transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

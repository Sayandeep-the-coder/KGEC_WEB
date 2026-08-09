

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Newspaper, Bell } from "lucide-react";
import { db } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Campus News & Highlights | Kalyani Government Engineering College",
  description:
    "Read the latest news highlights, academic achievements, research publications, hackathon wins, and press coverage from KGEC.",
};

const getCachedNewsArticles = unstable_cache(
  async () => {
    return db
      .select()
      .from(news)
      .orderBy(desc(news.publishedAt));
  },
  ["news-page"],
  { revalidate: 300, tags: ["news"] }
);

export default async function PublicNewsPage() {
  const articles = await getCachedNewsArticles();

  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Campus Media & Press"
        title="News & Institutional Highlights"
        subtitle="Celebrating student triumphs in national hackathons, faculty research breakthroughs, sports championships, and campus milestones."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Official Notice Board <ArrowRight size={16} />
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white/80 font-medium hover:bg-white/10 transition-colors"
          >
            Photo Gallery
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
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

      </UnifiedPageLayout>
  );
}

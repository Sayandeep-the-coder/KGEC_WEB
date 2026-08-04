import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, ArrowLeft, Newspaper } from "lucide-react";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getNews(slug: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/news/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error("Error fetching news detail:", err);
    return null;
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNews(slug);

  if (!news) {
    notFound();
  }

  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="News & Announcements"
        title={news.title}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
            {news.imageUrl && (
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <Image src={news.imageUrl} alt={news.title} fill className="object-cover" />
              </div>
            )}

            <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              {typeof news.body === "string" ? (
                <p className="whitespace-pre-line">{news.body}</p>
              ) : (
                <p>{JSON.stringify(news.body)}</p>
              )}
            </div>
          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}

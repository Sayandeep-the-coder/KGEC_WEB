import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, ArrowLeft, Newspaper, Sparkles } from "lucide-react";
import Link from "next/link";

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
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-14 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to All News</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
            <Sparkles size={12} className="text-blue-300" />
            <span>Campus Story</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight font-serif leading-tight">
            {news.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-blue-200/80 mt-4">
            <Calendar size={14} />
            <span>
              Published on {new Date(news.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
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
        </article>
      </main>

      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, ArrowLeft } from "lucide-react";
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
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-kgec-navy transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        <article className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <Calendar size={14} />
            <span>{new Date(news.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 leading-snug mb-6">
            {news.title}
          </h1>

          {news.imageUrl && (
            <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-8 border border-slate-200">
              <Image src={news.imageUrl} alt={news.title} fill className="object-cover" />
            </div>
          )}

          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
            {typeof news.body === "string" ? (
              <p>{news.body}</p>
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

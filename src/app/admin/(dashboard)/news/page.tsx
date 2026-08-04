"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Search, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, Pencil, X, Save, Newspaper } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  imageUrl: string | null;
  category: string;
  isPublished: boolean;
  publishedAt: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Create Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("campus");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit Modal State (PATCH API)
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editCategory, setEditCategory] = useState("campus");
  const [updating, setUpdating] = useState(false);

  const refreshNews = async () => {
    try {
      const res = await fetch("/api/v1/news?limit=100");
      const json = await res.json();
      if (json.data) setNews(json.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch("/api/v1/news?limit=100");
        const json = await res.json();
        if (!ignore && json.data) setNews(json.data);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/v1/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt: excerpt || undefined,
          body: body || title,
          imageUrl: imageUrl || undefined,
          category,
          isPublished: true,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "News article published successfully!" });
        setTitle("");
        setSlug("");
        setExcerpt("");
        setBody("");
        setImageUrl("");
        await refreshNews();
      } else {
        setMessage({ type: "error", text: json.error || "Failed to publish news article." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error creating news article." });
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditExcerpt(item.excerpt || "");
    setEditBody(item.body || "");
    setEditImageUrl(item.imageUrl || "");
    setEditCategory(item.category || "campus");
  };

  const handleUpdateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/v1/news/${editingItem.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          excerpt: editExcerpt || undefined,
          body: editBody || undefined,
          imageUrl: editImageUrl || undefined,
          category: editCategory,
        }),
      });

      if (res.ok) {
        setEditingItem(null);
        await refreshNews();
      } else {
        alert("Failed to update news article.");
      }
    } catch (err) {
      console.error("Error patching news article:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleTogglePublish = async (targetSlug: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/v1/news/${targetSlug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !currentStatus }),
      });

      if (res.ok) {
        await refreshNews();
      }
    } catch (err) {
      console.error("Error updating news publish status:", err);
    }
  };

  const handleDelete = async (targetSlug: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;
    try {
      const res = await fetch(`/api/v1/news/${targetSlug}`, { method: "DELETE" });
      if (res.ok) await refreshNews();
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  };

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl pb-10">
      <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold shadow-inner">
            <Newspaper size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#022448]">News & Press</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Publish news articles, press releases, and campus highlights.</p>
          </div>
        </div>
      </div>

      {/* Article Creation Card */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#022448] border-b border-slate-100 pb-4">Create News Article</h2>

        {message && (
          <div
            className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${
              message.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-red-50 text-red-800 border border-red-100"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Article Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                }}
                placeholder="e.g. KGEC Teams Secure Top Rank in National Robotics Symposium 2026"
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">URL Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="kgec-robotics-symposium-2026"
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-mono font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Short Excerpt / Summary</label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief 1-2 sentence summary of the news story..."
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium cursor-pointer transition-all"
              >
                <option value="campus">Campus News</option>
                <option value="academics">Academics</option>
                <option value="research">Research & Innovation</option>
                <option value="events">Sports & Fest</option>
                <option value="placement">Placements</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Full Article Body</label>
            <textarea
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write the complete news article details here..."
              className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
            />
          </div>

          <div>
            <FileUpload
              label="Cover Image (Upload photo)"
              bucket="news"
              accept="image/*"
              value={imageUrl}
              onChange={(url) => setImageUrl(url)}
              helperText="Drag & drop cover photo or click to browse"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="py-3.5 px-6 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center sm:justify-start gap-3 transition-all cursor-pointer shadow-md shadow-blue-900/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
          >
            <Plus size={16} />
            <span>{submitting ? "Publishing..." : "Publish News Article"}</span>
          </button>
        </form>
      </div>

      {/* News List */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-[#022448]">Articles Directory <span className="text-slate-400 font-medium text-sm ml-2">({filteredNews.length})</span></h2>

          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news..."
              className="w-full sm:w-64 bg-slate-50 text-[#022448] text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] font-medium transition-all"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          </div>
        </div>

        {loading ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">Loading articles...</p>
        ) : filteredNews.length === 0 ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">No news articles found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th className="pb-4 px-3">Title</th>
                  <th className="pb-4 px-3">Slug</th>
                  <th className="pb-4 px-3">Category</th>
                  <th className="pb-4 px-3">Status</th>
                  <th className="pb-4 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-3 font-semibold text-[#022448] max-w-xs truncate">{item.title}</td>
                    <td className="py-4 px-3 font-mono text-slate-500 text-[11px] truncate max-w-37.5">{item.slug}</td>
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {item.category || "general"}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <button
                        onClick={() => handleTogglePublish(item.slug, item.isPublished ?? true)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold cursor-pointer transition-colors ${
                          item.isPublished !== false
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {item.isPublished !== false ? <ToggleRight size={16} className="text-emerald-600" /> : <ToggleLeft size={16} className="text-slate-400" />}
                        <span>{item.isPublished !== false ? "Live" : "Draft"}</span>
                      </button>
                    </td>
                    <td className="py-4 px-3 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-lg text-slate-600 hover:text-[#225eaa] hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100"
                        title="Edit Article"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.slug)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-100"
                        title="Delete article"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Article Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-[2rem] max-w-xl w-full p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#022448] flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Pencil size={20} className="text-[#225eaa]" />
                </div>
                Edit News Article
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-[#022448] hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateNews} className="space-y-6 text-sm">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Article Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Excerpt</label>
                  <input
                    type="text"
                    value={editExcerpt}
                    onChange={(e) => setEditExcerpt(e.target.value)}
                    className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:border-[#225eaa] cursor-pointer transition-all"
                  >
                    <option value="campus">Campus News</option>
                    <option value="academics">Academics</option>
                    <option value="research">Research</option>
                    <option value="events">Sports & Fest</option>
                    <option value="placement">Placements</option>
                  </select>
                </div>
              </div>

              <div>
                <FileUpload
                  label="Update Cover Photo"
                  bucket="news"
                  accept="image/*"
                  value={editImageUrl}
                  onChange={(url) => setEditImageUrl(url)}
                />
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{updating ? "Saving..." : "Save Changes"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#022448] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

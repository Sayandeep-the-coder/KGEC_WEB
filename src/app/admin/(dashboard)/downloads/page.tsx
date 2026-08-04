"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Search, ExternalLink, CheckCircle2, AlertCircle, Pencil, X, Save, FileDown } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface DownloadItem {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  uploadedAt: string;
}

export default function AdminDownloadsPage() {
  const [items, setItems] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Create Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [fileUrl, setFileUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit Modal State (PATCH API)
  const [editingItem, setEditingItem] = useState<DownloadItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("general");
  const [editFileUrl, setEditFileUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  const refreshDownloads = async () => {
    try {
      const res = await fetch("/api/v1/downloads?limit=100");
      const json = await res.json();
      if (json.data) setItems(json.data);
    } catch (err) {
      console.error("Error fetching downloads:", err);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch("/api/v1/downloads?limit=100");
        const json = await res.json();
        if (!ignore && json.data) setItems(json.data);
      } catch (err) {
        console.error("Error fetching downloads:", err);
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
    if (!fileUrl) {
      setMessage({ type: "error", text: "Please upload or select a document file first." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/v1/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          fileUrl,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Document added to repository successfully!" });
        setTitle("");
        setFileUrl("");
        await refreshDownloads();
      } else {
        setMessage({ type: "error", text: json.error || "Failed to add document." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error creating document." });
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (item: DownloadItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditFileUrl(item.fileUrl);
  };

  const handleUpdateDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/v1/downloads/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          category: editCategory,
          fileUrl: editFileUrl,
        }),
      });

      if (res.ok) {
        setEditingItem(null);
        await refreshDownloads();
      } else {
        alert("Failed to update document.");
      }
    } catch (err) {
      console.error("Error patching download:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    try {
      const res = await fetch(`/api/v1/downloads/${id}`, { method: "DELETE" });
      if (res.ok) await refreshDownloads();
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 max-w-6xl pb-10">
      <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center font-bold shadow-inner">
            <FileDown size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#022448]">Document Repository</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Manage downloadable files, reports, mandatory disclosures, and syllabus PDFs.</p>
          </div>
        </div>
      </div>

      {/* Add Document Card */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#022448] border-b border-slate-100 pb-4">Upload Document</h2>

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Document Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Academic Calendar & Holiday List 2026-27"
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium cursor-pointer transition-all"
              >
                <option value="general">General</option>
                <option value="mandatory_disclosure">Mandatory Disclosure</option>
                <option value="nirf">NIRF Report</option>
                <option value="iqac">IQAC Document</option>
                <option value="naac">NAAC Accreditation</option>
                <option value="notices">Notice Attachment</option>
              </select>
            </div>
          </div>

          <div>
            <FileUpload
              label="Document File (Upload PDF / Document)"
              bucket="downloads"
              accept="application/pdf,.pdf,.doc,.docx"
              value={fileUrl}
              onChange={(url) => setFileUrl(url)}
              helperText="Drag & drop PDF document file or click to browse"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="py-3.5 px-6 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center sm:justify-start gap-3 transition-all cursor-pointer shadow-md shadow-blue-900/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
          >
            <Plus size={16} />
            <span>{submitting ? "Adding Document..." : "Add to Repository"}</span>
          </button>
        </form>
      </div>

      {/* Document List */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-[#022448]">Documents <span className="text-slate-400 font-medium text-sm ml-2">({filteredItems.length})</span></h2>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documents..."
                className="w-full sm:w-64 bg-slate-50 text-[#022448] text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] font-medium transition-all"
              />
              <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 text-[#022448] text-sm rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:border-[#225eaa] font-medium cursor-pointer transition-all"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="mandatory_disclosure">Mandatory Disclosure</option>
              <option value="nirf">NIRF Report</option>
              <option value="iqac">IQAC</option>
              <option value="naac">NAAC</option>
              <option value="notices">Notices</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">Loading documents...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">No documents found matching criteria.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th className="pb-4 px-3">Title</th>
                  <th className="pb-4 px-3">Category</th>
                  <th className="pb-4 px-3">Date</th>
                  <th className="pb-4 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-3 font-semibold text-[#022448] max-w-sm truncate">{item.title}</td>
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-cyan-50 text-cyan-700 border border-cyan-100">
                        {item.category.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-slate-500 text-xs font-medium">
                      {new Date(item.uploadedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-4 px-3 text-right space-x-2 whitespace-nowrap">
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg text-[#225eaa] hover:bg-blue-50 inline-flex items-center justify-center transition-colors border border-transparent hover:border-blue-100"
                        title="View Document"
                      >
                        <ExternalLink size={16} />
                      </a>

                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-lg text-slate-600 hover:text-[#225eaa] hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100"
                        title="Edit Document"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-100"
                        title="Delete document"
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

      {/* Edit Document Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-[2rem] max-w-md w-full p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#022448] flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Pencil size={20} className="text-[#225eaa]" />
                </div>
                Edit Document
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-[#022448] hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateDownload} className="space-y-6 text-sm">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Document Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
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
                  <option value="general">General</option>
                  <option value="mandatory_disclosure">Mandatory Disclosure</option>
                  <option value="nirf">NIRF Report</option>
                  <option value="iqac">IQAC Document</option>
                  <option value="naac">NAAC Accreditation</option>
                  <option value="notices">Notice Attachment</option>
                </select>
              </div>

              <div>
                <FileUpload
                  label="Update File Attachment"
                  bucket="downloads"
                  accept="application/pdf,.pdf,.doc,.docx"
                  value={editFileUrl}
                  onChange={(url) => setEditFileUrl(url)}
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

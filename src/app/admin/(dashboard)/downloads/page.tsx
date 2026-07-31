"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Search, ExternalLink, CheckCircle2, AlertCircle, Pencil, X, Save } from "lucide-react";
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
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">Document Repository</h1>
        <p className="text-xs text-slate-500 mt-1">Manage downloadable files, reports, mandatory disclosures, and syllabus PDFs.</p>
      </div>

      {/* Add Document Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Upload Document to Repository</h2>

        {message && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              message.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1">Document Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Academic Calendar & Holiday List 2026-27"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium cursor-pointer"
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
            className="py-2.5 px-6 rounded-xl bg-[#0f2552] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Plus size={16} />
            <span>{submitting ? "Adding Document..." : "Add Document to Repository"}</span>
          </button>
        </form>
      </div>

      {/* Document List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="text-sm font-bold text-slate-900">Documents ({filteredItems.length})</h2>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documents..."
                className="bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium w-48 sm:w-64"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 text-slate-900 text-xs rounded-xl px-3 py-2 border border-slate-200 focus:outline-none font-medium cursor-pointer"
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
          <p className="text-xs text-slate-500 py-6 text-center">Loading documents...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No documents found matching criteria.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="border-b border-slate-200 text-slate-500 font-semibold uppercase">
                <tr>
                  <th className="pb-3 px-3">Title</th>
                  <th className="pb-3 px-3">Category</th>
                  <th className="pb-3 px-3">Date</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3.5 px-3 font-semibold text-slate-900 max-w-xs truncate">{item.title}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 text-[11px] font-mono">
                      {new Date(item.uploadedAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3.5 px-3 text-right space-x-2">
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 inline-flex items-center gap-1 font-semibold text-[11px]"
                        title="View Document"
                      >
                        <ExternalLink size={14} />
                      </a>

                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Document (PATCH)"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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

      {/* Edit Document Modal (PATCH API) */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Pencil size={18} className="text-blue-600" /> Edit Document
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateDownload} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none"
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

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0f2552] hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{updating ? "Saving..." : "Save Changes (PATCH)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
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

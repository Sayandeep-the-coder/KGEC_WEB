"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Search, ToggleLeft, ToggleRight, Eye, CheckCircle2, AlertCircle, Pencil, X, Save } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface Notice {
  id: string;
  title: string;
  type: string;
  fileUrl: string | null;
  fileName: string | null;
  fileType: string | null;
  isActive: boolean;
  publishedAt: string;
}

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Quick Post Form State
  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>("general");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("application/pdf");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit Modal State (PATCH API)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editType, setEditType] = useState("");
  const [editFileUrl, setEditFileUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  const refreshNotices = async () => {
    try {
      const res = await fetch("/api/v1/notices?limit=100");
      const json = await res.json();
      if (json.data) setNotices(json.data);
    } catch (err) {
      console.error("Error fetching notices:", err);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch("/api/v1/notices?limit=100");
        const json = await res.json();
        if (!ignore && json.data) setNotices(json.data);
      } catch (err) {
        console.error("Error fetching notices:", err);
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
      const res = await fetch("/api/v1/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          type,
          fileUrl: fileUrl || undefined,
          fileName: fileName || undefined,
          fileType: fileType || undefined,
          isActive: true,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Notice published successfully!" });
        setTitle("");
        setFileUrl("");
        setFileName("");
        await refreshNotices();
      } else {
        setMessage({ type: "error", text: json.error || "Failed to publish notice." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error publishing notice." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/v1/notices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (res.ok) {
        await refreshNotices();
      }
    } catch (err) {
      console.error("Error updating notice status:", err);
    }
  };

  const openEditModal = (notice: Notice) => {
    setEditingNotice(notice);
    setEditTitle(notice.title);
    setEditType(notice.type);
    setEditFileUrl(notice.fileUrl || "");
  };

  const handleUpdateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/v1/notices/${editingNotice.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          type: editType,
          fileUrl: editFileUrl || undefined,
        }),
      });

      if (res.ok) {
        setEditingNotice(null);
        await refreshNotices();
      } else {
        alert("Failed to update notice.");
      }
    } catch (err) {
      console.error("Error patching notice:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    try {
      const res = await fetch(`/api/v1/notices/${id}`, { method: "DELETE" });
      if (res.ok) {
        await refreshNotices();
      }
    } catch (err) {
      console.error("Error deleting notice:", err);
    }
  };

  const filteredNotices = notices.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "all" || n.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 max-w-6xl pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-serif text-[#022448]">Notice Management</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">Publish, edit, filter, and control public campus announcements.</p>
        </div>
        <Link
          href="/admin/notices/new"
          className="relative z-10 inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-900/20 hover:-translate-y-0.5 shrink-0"
        >
          <Plus size={16} />
          <span>Full Publish Page</span>
        </Link>
      </div>

      {/* Quick Add Form */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#022448] border-b border-slate-100 pb-4">Quick Notice Publisher</h2>

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

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Notice Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Autumn Semester Exam Schedule & Room Allocation 2026"
                className="w-full bg-slate-50 text-[#022448] text-sm rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Notice Category *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-50 text-[#022448] text-sm rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all cursor-pointer"
              >
                <option value="general">General Notice</option>
                <option value="academic">Academic Circular</option>
                <option value="examination">Examination Schedule</option>
                <option value="admission">Admission Notice</option>
                <option value="tender">Procurement & Tender</option>
              </select>
            </div>
          </div>

          <div>
            <FileUpload
              label="Attach Notice PDF Document"
              bucket="notices"
              accept="application/pdf,.pdf,image/*,.doc,.docx"
              value={fileUrl}
              fileName={fileName}
              onChange={(url, name, mimeType) => {
                setFileUrl(url);
                if (name) setFileName(name);
                if (mimeType) setFileType(mimeType);
              }}
              helperText="Drag & drop notice PDF file or click to browse"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="py-3.5 px-6 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer shadow-md shadow-blue-900/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
          >
            <Plus size={16} />
            <span>{submitting ? "Publishing..." : "Publish Notice Now"}</span>
          </button>
        </form>
      </div>

      {/* Notices Table & Search Filter */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-[#022448]">Published Notices <span className="text-slate-400 font-medium text-sm ml-2">({filteredNotices.length})</span></h2>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notices..."
                className="bg-slate-50 text-[#022448] text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] font-medium w-full sm:w-64 transition-all"
              />
              <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-50 text-[#022448] text-sm rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:border-[#225eaa] font-medium cursor-pointer transition-all"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="academic">Academic</option>
              <option value="examination">Examination</option>
              <option value="admission">Admission</option>
              <option value="tender">Tender</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">Loading notices from database...</p>
        ) : filteredNotices.length === 0 ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">No notices found matching your criteria.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th className="pb-4 px-3">Notice Title</th>
                  <th className="pb-4 px-3">Category</th>
                  <th className="pb-4 px-3">Status</th>
                  <th className="pb-4 px-3">Published Date</th>
                  <th className="pb-4 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredNotices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-3 font-semibold text-[#022448] max-w-md truncate">
                      {notice.title}
                    </td>
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-[#225eaa] border border-blue-100">
                        {notice.type}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <button
                        onClick={() => handleToggleActive(notice.id, notice.isActive)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold cursor-pointer transition-colors ${
                          notice.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                        title="Click to toggle visibility"
                      >
                        {notice.isActive ? <ToggleRight size={16} className="text-emerald-600" /> : <ToggleLeft size={16} className="text-slate-400" />}
                        <span>{notice.isActive ? "Public" : "Draft"}</span>
                      </button>
                    </td>
                    <td className="py-4 px-3 text-slate-500 font-medium text-xs">
                      {new Date(notice.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-4 px-3 text-right space-x-2 whitespace-nowrap">
                      {notice.fileUrl && (
                        <a
                          href={notice.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg text-[#225eaa] hover:bg-blue-50 inline-flex items-center justify-center transition-colors border border-transparent hover:border-blue-100"
                          title="View PDF Document"
                        >
                          <Eye size={16} />
                        </a>
                      )}

                      <button
                        onClick={() => openEditModal(notice)}
                        className="p-2 rounded-lg text-slate-600 hover:text-[#225eaa] hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100"
                        title="Edit Notice"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-100"
                        title="Delete Notice"
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

      {/* Edit Modal */}
      {editingNotice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-[2rem] max-w-lg w-full p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#022448] flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Pencil size={20} className="text-[#225eaa]" />
                </div>
                Edit Notice
              </h2>
              <button
                onClick={() => setEditingNotice(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-[#022448] hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateNotice} className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Notice Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-50 text-[#022448] text-sm rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Category</label>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  className="w-full bg-slate-50 text-[#022448] text-sm rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all cursor-pointer"
                >
                  <option value="general">General Notice</option>
                  <option value="academic">Academic Circular</option>
                  <option value="examination">Examination Schedule</option>
                  <option value="admission">Admission Notice</option>
                  <option value="tender">Procurement & Tender</option>
                </select>
              </div>

              <div>
                <FileUpload
                  label="Update PDF Attachment"
                  bucket="notices"
                  accept="application/pdf,.pdf,image/*,.doc,.docx"
                  value={editFileUrl}
                  onChange={(url) => setEditFileUrl(url)}
                  helperText="Drag & drop new file to replace attachment"
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
                  onClick={() => setEditingNotice(null)}
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

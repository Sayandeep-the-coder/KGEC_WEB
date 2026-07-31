"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BellPlus, FileUp, CheckCircle2, AlertCircle } from "lucide-react";
import FileUpload from "@/components/FileUpload";

export default function NewNoticeAdminPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"general" | "academic" | "examination" | "admission" | "tender">("general");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("application/pdf");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
          isActive,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Notice published successfully! Redirecting..." });
        setTimeout(() => {
          router.push("/admin/notices");
        }, 1200);
      } else {
        setMessage({ type: "error", text: json.error || "Failed to create notice." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error creating notice." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <Link
          href="/admin/notices"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-2 transition-colors font-medium"
        >
          <ArrowLeft size={14} /> Back to Notices
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold shadow-sm">
            <BellPlus size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-serif text-slate-900">Publish New Official Notice</h1>
            <p className="text-xs text-slate-500">Post announcements, academic circulars, exam schedules, or tenders.</p>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-2">Notice Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mandatory Registration for Odd Semester Examination 2026"
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white text-sm font-semibold transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-bold text-slate-700 block mb-2">Notice Category / Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "general" | "academic" | "examination" | "admission" | "tender")}
                className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white font-semibold cursor-pointer transition-all"
              >
                <option value="general">General Notice</option>
                <option value="academic">Academic Circular</option>
                <option value="examination">Examination Schedule</option>
                <option value="admission">Admission Notice</option>
                <option value="tender">Procurement & Tender</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-2">Visibility Status</label>
              <div className="flex items-center gap-4 py-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Active / Published to Public Board</span>
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h3 className="font-bold text-slate-800 text-xs flex items-center gap-2">
              <FileUp size={16} className="text-blue-600" /> Notice Document / PDF Upload
            </h3>

            <FileUpload
              label="Select or Drag & Drop File"
              bucket="notices"
              accept="application/pdf,.pdf,image/*,.doc,.docx"
              value={fileUrl}
              fileName={fileName}
              onChange={(url, name, mimeType) => {
                setFileUrl(url);
                if (name) setFileName(name);
                if (mimeType) setFileType(mimeType);
              }}
              helperText="Drag & drop notice PDF or click to browse"
            />

            {fileUrl && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Document Display Name</label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-600 block mb-1">File Type (MIME)</label>
                  <input
                    type="text"
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-[#0f2552] hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-50 shadow-md"
            >
              {loading ? "Publishing Notice..." : "Publish Notice"}
            </button>
            <Link
              href="/admin/notices"
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

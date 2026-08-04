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
    <div className="space-y-8 max-w-4xl pb-10">
      <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <Link
          href="/admin/notices"
          className="relative z-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#225eaa] hover:text-[#022448] mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Notices
        </Link>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#225eaa] flex items-center justify-center font-bold shadow-inner">
            <BellPlus size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#022448]">Publish Notice</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Post announcements, academic circulars, exam schedules, or tenders.</p>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 shadow-sm ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-100 text-emerald-800"
              : "bg-red-50 border border-red-100 text-red-800"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-10 shadow-sm relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Notice Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mandatory Registration for Odd Semester Examination 2026"
              className="w-full bg-slate-50 text-[#022448] rounded-xl px-5 py-4 border border-slate-200 focus:outline-none focus:border-[#225eaa] focus:bg-white focus:ring-4 focus:ring-blue-500/10 text-sm font-semibold transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Notice Category / Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "general" | "academic" | "examination" | "admission" | "tender")}
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-5 py-4 border border-slate-200 focus:outline-none focus:border-[#225eaa] focus:bg-white focus:ring-4 focus:ring-blue-500/10 text-sm font-semibold cursor-pointer transition-all"
              >
                <option value="general">General Notice</option>
                <option value="academic">Academic Circular</option>
                <option value="examination">Examination Schedule</option>
                <option value="admission">Admission Notice</option>
                <option value="tender">Procurement & Tender</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Visibility Status</label>
              <div className="flex items-center gap-4 py-4">
                <label className="flex items-center gap-3 cursor-pointer text-[#022448] font-bold text-sm">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-5 h-5 rounded bg-slate-50 border-slate-300 text-[#225eaa] focus:ring-[#225eaa] cursor-pointer"
                  />
                  <span>Active / Published to Public Board</span>
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 space-y-6">
            <h3 className="font-bold text-[#022448] text-base flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileUp size={20} className="text-[#225eaa]" />
              </div>
              Notice Document / PDF Upload
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Document Display Name</label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full bg-slate-50 text-[#022448] rounded-xl px-5 py-3 border border-slate-200 focus:outline-none focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 text-sm font-semibold transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">File Type (MIME)</label>
                  <input
                    type="text"
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full bg-slate-50 text-[#022448] rounded-xl px-5 py-3 border border-slate-200 focus:outline-none focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 text-sm font-semibold transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 border-t border-slate-100 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 shadow-lg shadow-blue-900/20 hover:-translate-y-0.5"
            >
              {loading ? "Publishing..." : "Publish Notice"}
            </button>
            <Link
              href="/admin/notices"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#022448] text-center font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

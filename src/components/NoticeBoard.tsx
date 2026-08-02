"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, FileDown, Calendar, Search } from "lucide-react";

export interface Notice {
  id: string;
  title: string;
  type: string;
  fileUrl?: string | null;
  fileName?: string | null;
  fileType?: string | null;
  publishedAt: string;
}

interface NoticeBoardProps {
  initialNotices?: Notice[];
  initialType?: string;
  limit?: number;
  showTitle?: boolean;
  className?: string;
}

const CATEGORIES = [
  { id: "all", label: "All Notices" },
  { id: "general", label: "General" },
  { id: "admission", label: "Admission" },
  { id: "placement", label: "Placement" },
  { id: "academic", label: "Academic" },
  { id: "exam", label: "Exam & Results" },
];

export default function NoticeBoard({
  initialNotices,
  initialType = "all",
  limit = 6,
  showTitle = true,
  className = "",
}: NoticeBoardProps) {
  const [activeTab, setActiveTab] = useState(initialType);
  const [notices, setNotices] = useState<Notice[]>(initialNotices || []);
  const [loading, setLoading] = useState(!initialNotices);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let ignore = false;
    async function fetchNotices() {
      if (initialNotices && activeTab === "all") {
        return;
      }
      setLoading(true);
      try {
        const typeQuery = activeTab !== "all" ? `&type=${activeTab}` : "";
        const res = await fetch(`/api/v1/notices?limit=${limit}${typeQuery}`);
        const json = await res.json();
        if (!ignore && json.data) {
          setNotices(json.data);
        }
      } catch (err) {
        console.error("Error fetching notices:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchNotices();
    return () => {
      ignore = true;
    };
  }, [activeTab, limit, initialNotices]);

  const filteredNotices = notices.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col ${className}`}>
      {showTitle && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0f2552] block">
              OFFICIAL ANNOUNCEMENTS
            </span>
            <h3 className="text-2xl font-bold font-serif text-slate-900 mt-1">
              Notice Board
            </h3>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-100 pb-3 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === cat.id
                ? "bg-[#0f2552] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Notice List */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500">
            Loading notices...
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No notices found in this category.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 p-3 rounded-xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {notice.type}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar size={12} />
                      {new Date(notice.publishedAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {notice.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {notice.fileUrl ? (
                    <a
                      href={notice.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      <FileDown size={14} />
                      <span>Download PDF</span>
                    </a>
                  ) : (
                    <Link
                      href={`/notices/${notice.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <FileText size={14} />
                      <span>View Notice</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

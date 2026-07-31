"use client";

import { useState, useEffect } from "react";
import { Download, FileText, Search } from "lucide-react";

interface DownloadItem {
  id: string;
  title: string;
  fileUrl: string;
  category: "general" | "mandatory_disclosure" | "nirf" | "iqac" | "naac" | "notices";
  uploadedAt: string;
}

interface DownloadsTableProps {
  category?: string;
  title?: string;
}

export default function DownloadsTable({ category, title = "Downloadable Documents" }: DownloadsTableProps) {
  const [items, setItems] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchDownloads() {
      setLoading(true);
      try {
        const query = category ? `?category=${category}` : "";
        const res = await fetch(`/api/v1/downloads${query}`);
        const json = await res.json();
        if (json.data) {
          setItems(json.data);
        }
      } catch (err) {
        console.error("Error fetching downloads:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDownloads();
  }, [category]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-kgec-navy block">
            RESOURCES & DOCUMENTS
          </span>
          <h3 className="text-2xl font-bold font-serif text-slate-900 mt-1">
            {title}
          </h3>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-kgec-blue focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 py-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse bg-slate-100 rounded-xl" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">
          No documents available in this section.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date Added</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2.5">
                    <FileText size={16} className="text-kgec-blue shrink-0" />
                    <span>{item.title}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-kgec-blue">
                      {item.category.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(item.uploadedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-kgec-navy text-white text-xs font-semibold hover:bg-kgec-blue transition-colors cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

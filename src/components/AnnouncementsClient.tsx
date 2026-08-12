"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, FileDown, FileText, ArrowRight, Search, Filter } from "lucide-react";
import Link from "next/link";

export interface Notice {
  id: string;
  title: string;
  type: string;
  fileUrl?: string | null;
  publishedAt: string;
}

interface AnnouncementsClientProps {
  notices: Notice[];
}

const CATEGORIES = [
  { id: "ALL", label: "All Notices" },
  { id: "GENERAL", label: "General" },
  { id: "ACADEMIC", label: "Academic" },
  { id: "PLACEMENT", label: "Placement" },
  { id: "TENDER", label: "Tenders & Bids" },
];

export default function AnnouncementsClient({ notices }: AnnouncementsClientProps) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesTab = activeTab === "ALL" || notice.type.toUpperCase() === activeTab;
      const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [notices, activeTab, searchQuery]);

  return (
    <section className="mx-auto w-full max-w-[100rem] px-0 sm:px-6 lg:px-8 py-0 sm:py-6 h-full flex flex-col justify-center overflow-hidden relative touch-pan-y">
      <div className="relative z-10 w-full overflow-hidden rounded-none sm:rounded-2xl bg-linear-to-br from-[#022448] via-[#1e3a5f] to-[#022448] flex flex-col items-center justify-center py-10 lg:py-16 text-white shadow-none sm:shadow-md border-none sm:border border-white/5 px-4 sm:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center w-full z-10 mb-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center drop-shadow-md tracking-tight">
            Announcements
          </h2>
        </motion.div>

        {/* 3-Column Vertical Dividers Layout (IIT Bombay Style) */}
        <div className="w-full max-w-6xl mx-auto z-10">
          {filteredNotices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-blue-200/60 bg-white/5 border border-white/10 rounded-2xl">
              <FileText size={48} className="mb-3 opacity-40 text-[#79acfd]" />
              <p className="text-base font-medium">No announcements match your selected filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/15 border-y border-white/15 py-8">
              {[0, 1, 2].map((colIndex) => {
                const columnNotices = filteredNotices.filter((_, idx) => idx % 3 === colIndex);
                if (columnNotices.length === 0) return null;

                return (
                  <div key={colIndex} className="flex flex-col gap-6 md:px-8 first:pl-0 last:pr-0 pt-4 md:pt-0">
                    {columnNotices.map((notice) => (
                      <motion.div
                        key={notice.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="group flex flex-col gap-1 text-left"
                      >
                        {notice.fileUrl ? (
                          <a
                            href={notice.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm sm:text-base font-medium text-white/95 group-hover:text-[#79acfd] group-hover:underline transition-colors leading-snug block"
                          >
                            {notice.title}
                          </a>
                        ) : (
                          <h4 className="text-sm sm:text-base font-medium text-white/95 group-hover:text-[#79acfd] transition-colors leading-snug">
                            {notice.title}
                          </h4>
                        )}
                        <span className="text-[11px] text-blue-200/60 font-mono">
                          {new Date(notice.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Centered IIT Bombay "More" Button */}
        <div className="flex justify-center mt-10 z-10">
          <Link
            href="/notices"
            className="px-10 py-2.5 rounded-xl border-2 border-[#79acfd] text-[#79acfd] font-bold text-sm uppercase tracking-wider hover:bg-[#79acfd] hover:text-[#022448] transition-all shadow-md cursor-pointer"
          >
            More
          </Link>
        </div>

      </div>
    </section>
  );
}


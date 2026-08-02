"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileDown, FileText, ArrowRight, BellRing } from "lucide-react";
import Link from "next/link";

interface Notice {
  id: string;
  title: string;
  type: string;
  fileUrl?: string | null;
  publishedAt: string;
}

export default function Announcements() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/notices?limit=5")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) setNotices(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <section className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-full flex flex-col justify-center overflow-hidden relative touch-pan-y">
      {/* Premium Light Container */}
      <div className="relative z-10 w-full h-auto lg:h-[88vh] min-h-[600px] rounded-2xl bg-white shadow-md border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Abstract Background Glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#225eaa]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        {/* Unified Top Header matching Highlights style */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center px-5 mt-10 md:mt-14 mb-6 z-10 text-center shrink-0"
        >
          <h1 className="relative w-fit px-4 uppercase mx-auto bg-[#225eaa]/5 border text-[#022448]/90 border-[#225eaa]/30 text-xs md:text-sm font-light leading-none py-1.5 inline-block mb-3">
            Announcements
            <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2"></span>
            <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2"></span>
            <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></span>
            <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 bottom-0 right-0 translate-x-1/2 translate-y-1/2"></span>
          </h1>

          <div className="shrink-0 mt-1 text-2xl md:text-4xl lg:text-[44px] capitalize leading-tight w-[95%] md:w-[85%] lg:w-[70%] font-medium text-[#022448]">
            Stay Updated with Latest Notices.
          </div>
        </motion.div>

        {/* Centered Scrollable Notices List */}
        <div className="w-full max-w-4xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col flex-1 pb-10 min-h-0">
          <div className="flex items-center justify-between mb-4 shrink-0 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-[#022448]">Recent Updates</h3>
              {loading && <span className="text-xs text-[#225eaa] animate-pulse font-semibold">Fetching...</span>}
            </div>
            
            <Link 
              href="/notices"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#022448] text-white font-bold text-[11px] uppercase tracking-wider hover:bg-[#225eaa] transition-all hover:gap-3 shadow-sm hover:shadow-md group"
            >
              View All Notices
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-full h-20 bg-slate-100 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : notices.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <FileText size={48} className="mb-4 opacity-20" />
                <p>No new announcements right now.</p>
              </div>
            ) : (
              <motion.div 
                className="space-y-4 pt-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                {notices.map((notice) => (
                  <motion.div 
                    key={notice.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="group relative w-full p-4 md:p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 hover:border-[#225eaa]/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#225eaa]/0 via-[#225eaa]/0 to-[#225eaa]/0 group-hover:from-[#225eaa]/5 group-hover:to-transparent transition-all duration-500 -z-10"></div>
                    
                    {/* Left Border Accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#225eaa] to-blue-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

                    <div className="flex-1 space-y-2 relative z-10 pl-2">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
                          {notice.type}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1 font-mono font-medium">
                          <Calendar size={12} />
                          {new Date(notice.publishedAt).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-slate-800 group-hover:text-[#022448] transition-colors line-clamp-2">
                        {notice.title}
                      </h4>
                    </div>

                    <div className="shrink-0 relative z-10 pl-2">
                      {notice.fileUrl ? (
                        <a
                          href={notice.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                        >
                          <FileDown size={14} />
                          <span>PDF</span>
                        </a>
                      ) : (
                        <Link
                          href={`/notices/${notice.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          <FileText size={14} />
                          <span>View</span>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

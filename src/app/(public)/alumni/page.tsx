"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import ContentCard from "@/components/ui/ContentCard";
import {
  Rocket,
  Code,
  GraduationCap,
  Building2,
  Search,
  Loader2
} from "lucide-react";

interface AlumniMember {
  id?: string;
  name: string;
  role: string;
  category: "space_research" | "big_tech" | "founder" | "academia" | "general" | string;
  highlight?: string;
  batchYear?: number;
  department?: string;
  company?: string;
  location?: string;
}

const CATEGORIES = [
  { id: "all", label: "All Alumni" },
  { id: "space_research", label: "Space & Science (ISRO)", icon: Rocket },
  { id: "big_tech", label: "Big Tech & Engineering", icon: Code },
  { id: "founder", label: "Founders & CEOs", icon: Building2 },
  { id: "academia", label: "Academia & Research", icon: GraduationCap },
];

export default function AlumniPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [alumniList, setAlumniList] = useState<AlumniMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Dynamic API Fetching directly from Backend DB
  useEffect(() => {
    async function fetchAlumni() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (selectedCat !== "all") queryParams.set("category", selectedCat);
        if (searchQuery.trim()) queryParams.set("search", searchQuery.trim());

        const res = await fetch(`/api/v1/alumni?${queryParams.toString()}`);
        const data = await res.json();
        if (data && Array.isArray(data.data)) {
          setAlumniList(data.data);
        } else {
          setAlumniList([]);
        }
      } catch (err) {
        console.error("Error fetching alumni from API:", err);
        setAlumniList([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAlumni();
  }, [selectedCat, searchQuery]);

  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Alumni Network & Global Heritage"
        title="KGEC Alumni Diaries"
        subtitle="From Chandrayaan-3 mission scientists at ISRO to global Silicon Valley leaders, professors, and tech founders — celebrating the global legacy of KGEC graduates."
      />

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Main Content Area */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto space-y-8">
            
            {/* Controls: Category Filter + Search Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCat === cat.id
                        ? "bg-[#022448] text-white shadow-md shadow-blue-900/20"
                        : "bg-slate-100 text-[#43474e] hover:bg-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-[#022448] focus:outline-none focus:border-[#225eaa] focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
                />
              </div>
            </div>

            {/* Alumni Cards Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-32 text-slate-500 gap-3">
                <Loader2 className="animate-spin text-[#225eaa]" size={32} />
                <span className="text-sm font-bold uppercase tracking-wider">Fetching alumni records from database...</span>
              </div>
            ) : alumniList.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">No alumni records found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {alumniList.map((alumnus, idx) => (
                  <ContentCard
                    key={alumnus.id || idx}
                    variant="white"
                    delay={idx * 0.05}
                    className="flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] font-black text-xl flex items-center justify-center group-hover:bg-[#225eaa] group-hover:text-white transition-colors">
                          {alumnus.name.charAt(0)}
                        </div>
                        {alumnus.company && (
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-[#225eaa] text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                            {alumnus.company}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#022448] mb-1 group-hover:text-[#225eaa] transition-colors">{alumnus.name}</h3>
                      <p className="text-sm font-medium text-[#43474e] leading-relaxed">{alumnus.role}</p>
                      {alumnus.highlight && (
                        <p className="text-xs text-slate-500 mt-3 font-medium line-clamp-2">{alumnus.highlight}</p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#225eaa] uppercase tracking-wider">Batch of {alumnus.batchYear || "Alumni"}</span>
                      <span className="uppercase text-[9px] px-2 py-1 rounded text-slate-500 font-bold tracking-wider bg-slate-50">
                        {alumnus.category?.replace("_", " ") || "KGEC"}
                      </span>
                    </div>
                  </ContentCard>
                ))}
              </div>
            )}

            {/* Bottom Banner Bar */}
            <div className="mt-12 bg-[#022448] rounded-2xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
              
              <div className="relative z-10 text-center md:text-left">
                <h4 className="text-xl md:text-2xl font-bold font-serif text-white mb-2">Are you a KGEC Alumnus?</h4>
                <p className="text-sm text-blue-100 font-medium">
                  Join the Alumni Interaction Cell to mentor current students and connect at regional reunions.
                </p>
              </div>
              <Link
                href="/contact"
                className="relative z-10 px-8 py-4 rounded-full bg-white text-[#022448] font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shrink-0 shadow-lg"
              >
                Connect With Alumni Cell
              </Link>
            </div>

          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}

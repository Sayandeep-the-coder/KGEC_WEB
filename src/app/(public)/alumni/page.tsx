"use client";

import { useState, useEffect } from "react";


import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
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
        {/* Controls: Category Filter + Search Bar */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCat === cat.id
                    ? "bg-white/50 border border-slate-200/60 shadow-sm text-white shadow-sm"
                    : "bg-slate-100 text-[#6B7280] hover:bg-slate-200 hover:text-[#1A1A1A]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#2E5C9E] focus:bg-white"
            />
          </div>
        </section>

        {/* Alumni Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-500 gap-3">
            <Loader2 className="animate-spin text-[#2E5C9E]" size={28} />
            <span className="text-sm font-semibold">Fetching alumni records from database...</span>
          </div>
        ) : alumniList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-sm font-semibold text-slate-600">No alumni records found matching your filters.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {alumniList.map((alumnus, idx) => (
              <div
                key={alumnus.id || idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E5C9E] font-bold text-sm flex items-center justify-center">
                      {alumnus.name.charAt(0)}
                    </div>
                    {alumnus.company && (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2E5C9E] text-[10px] font-bold">
                        {alumnus.company}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A] mb-1">{alumnus.name}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{alumnus.role}</p>
                  {alumnus.highlight && (
                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">{alumnus.highlight}</p>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#2E5C9E] flex items-center justify-between">
                  <span>Batch of {alumnus.batchYear || "Alumni"}</span>
                  <span className="uppercase text-[9px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                    {alumnus.category?.replace("_", " ") || "KGEC"}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Bottom Banner Bar */}
        <div className="bg-white/50 border border-slate-200/60 shadow-sm text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold">Are you a KGEC Alumnus?</h4>
            <p className="text-xs text-slate-300">
              Join the Alumni Interaction Cell to mentor current students and connect at regional reunions.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs transition-colors shrink-0"
          >
            Connect With Alumni Cell
          </Link>
        </div>
      </main>

      </UnifiedPageLayout>
  );
}

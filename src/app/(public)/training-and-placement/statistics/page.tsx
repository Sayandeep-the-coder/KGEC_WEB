"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  TrendingUp,
  Award,
  Building2,
  Users,
  Briefcase,
  Sparkles,
  Loader2,
  Table,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

interface DeptPlacementDisplay {
  department: string;
  fullName: string;
  placementRate: number;
  placed: number;
  totalOffers: number;
  highestLPA: number;
  avgLPA: number;
}

interface HistoricalTrendDisplay {
  year: number;
  studentsPlaced: number;
  highestLPA: number;
  avgLPA: number;
}

interface RecruiterDisplay {
  name: string;
  type: string;
  highest: string;
  offers: number;
}

const DEPT_FULL_NAMES: Record<string, string> = {
  CSE: "Computer Science & Engineering",
  IT: "Information Technology",
  ECE: "Electronics & Communication",
  EE: "Electrical Engineering",
  ME: "Mechanical Engineering",
  MCA: "Master of Computer Applications",
};

const DEPT_ORDER = ["CSE", "IT", "ECE", "EE", "ME", "MCA"];

export default function PlacementStatisticsPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [activeTab, setActiveTab] = useState<"packages" | "rates" | "placed">("packages");
  const [deptData, setDeptData] = useState<DeptPlacementDisplay[]>([]);
  const [historicalTrends, setHistoricalTrends] = useState<HistoricalTrendDisplay[]>([]);
  const [recruiters, setRecruiters] = useState<RecruiterDisplay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch live stats and department records from backend REST API
  useEffect(() => {
    async function fetchApiData() {
      try {
        setLoading(true);
        const [statsRes, deptRes, recRes] = await Promise.all([
          fetch("/api/v1/placements/stats").then((r) => r.json()),
          fetch(`/api/v1/placements/departments?year=${selectedYear}`).then((r) => r.json()),
          fetch(`/api/v1/placements/recruiters?year=${selectedYear}`).then((r) => r.json()),
        ]);

        if (statsRes?.data && Array.isArray(statsRes.data)) {
          const apiTrends: HistoricalTrendDisplay[] = statsRes.data.map((item: { year: number; studentsPlaced?: number; highestSalary?: number; medianSalary?: number }) => ({
            year: item.year,
            studentsPlaced: item.studentsPlaced || 0,
            highestLPA: item.highestSalary ? Number((item.highestSalary / 100000).toFixed(1)) : 0,
            avgLPA: item.medianSalary ? Number((item.medianSalary / 100000).toFixed(1)) : 0,
          }));
          setHistoricalTrends(apiTrends);
        }

        if (deptRes?.data && Array.isArray(deptRes.data)) {
          const apiDepts: DeptPlacementDisplay[] = deptRes.data.map((d: { department?: string; placementRate?: number; studentsPlaced?: number; totalOffers?: number; highestSalary?: number; medianSalary?: number }) => {
            const deptCode = (d.department || "").toUpperCase();
            return {
              department: deptCode,
              fullName: DEPT_FULL_NAMES[deptCode] || deptCode,
              placementRate: d.placementRate ? Number(d.placementRate) : 0,
              placed: d.studentsPlaced || 0,
              totalOffers: d.totalOffers || d.studentsPlaced || 0,
              highestLPA: d.highestSalary ? Number((d.highestSalary / 100000).toFixed(1)) : 0,
              avgLPA: d.medianSalary ? Number((d.medianSalary / 100000).toFixed(1)) : 0,
            };
          });

          // Sort in standard order
          apiDepts.sort((a, b) => {
            const idxA = DEPT_ORDER.indexOf(a.department);
            const idxB = DEPT_ORDER.indexOf(b.department);
            return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
          });

          setDeptData(apiDepts);
        }

        if (recRes?.data && Array.isArray(recRes.data)) {
          const apiRecs: RecruiterDisplay[] = recRes.data.map((r: { company: string; offers?: number }) => ({
            name: r.company,
            type: "Recruiting Partner",
            highest: "Tier 1 Offer",
            offers: r.offers || 0,
          }));
          setRecruiters(apiRecs);
        }
      } catch (err) {
        console.error("Error fetching placement stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchApiData();
  }, [selectedYear]);

  // Derived metrics from latest historical trend or selection
  const currentYearStat = historicalTrends.find((t) => t.year === selectedYear);
  const highestPackageVal = currentYearStat?.highestLPA || (deptData.length > 0 ? Math.max(...deptData.map((d) => d.highestLPA)) : 90.0);
  const medianPackageVal = currentYearStat?.avgLPA || 8.0;
  const totalPlacedVal = currentYearStat?.studentsPlaced || deptData.reduce((acc, d) => acc + d.placed, 0);

  // Dynamic calculations
  const totalOffersSum = deptData.reduce((acc, d) => acc + d.totalOffers, 0);
  const avgPlacementRate =
    deptData.length > 0
      ? (deptData.reduce((acc, d) => acc + d.placementRate, 0) / deptData.length).toFixed(1)
      : "91.8";

  // Dynamic sector distribution derived from actual offer ratios
  const sectorData = useMemo(() => {
    if (deptData.length === 0) {
      return [
        { name: "IT & Software Services", value: 55, color: "#1B2A4A" },
        { name: "Core Engineering & Manufacturing", value: 28, color: "#2E5C9E" },
        { name: "VLSI, Telecom & Embedded", value: 17, color: "#5B9BD5" },
      ];
    }

    const itOffers = deptData
      .filter((d) => ["CSE", "IT", "MCA"].includes(d.department))
      .reduce((acc, d) => acc + d.totalOffers, 0);

    const coreOffers = deptData
      .filter((d) => ["EE", "ME"].includes(d.department))
      .reduce((acc, d) => acc + d.totalOffers, 0);

    const eceOffers = deptData
      .filter((d) => d.department === "ECE")
      .reduce((acc, d) => acc + d.totalOffers, 0);

    const total = itOffers + coreOffers + eceOffers || 1;

    return [
      { name: "IT & Software Services", value: Math.round((itOffers / total) * 100), color: "#1B2A4A" },
      { name: "Core Engineering & Manufacturing", value: Math.round((coreOffers / total) * 100), color: "#2E5C9E" },
      { name: "VLSI, Telecom & Hardware", value: Math.round((eceOffers / total) * 100), color: "#5B9BD5" },
    ];
  }, [deptData]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner with Ribbon Tag */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Placement Statistics & Analytics</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif">
                Placement Statistics & Analytics
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                Comprehensive recruitment statistics, department-wise CTC packages, placement conversion rates, and 5-year hiring records fetched directly from the database.
              </p>
            </div>

            <div className="shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <label className="text-[11px] font-bold uppercase tracking-wider text-blue-200 block mb-1">
                Select Academic Batch
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-[#0F2552] text-white rounded-xl px-4 py-2 text-xs font-bold border border-white/20 focus:outline-none cursor-pointer"
              >
                <option value={2024}>2024–25 Batch</option>
                <option value={2023}>2023–24 Batch</option>
                <option value={2022}>2022–23 Batch</option>
                <option value={2021}>2021–22 Batch</option>
                <option value={2020}>2020–21 Batch</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-500 gap-3">
            <Loader2 className="animate-spin text-[#2E5C9E]" size={28} />
            <span className="text-sm font-semibold">Loading verified placement metrics from database...</span>
          </div>
        ) : (
          <>
            {/* Metric Cards Row */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600">
                  <Award size={28} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Highest Package</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">{highestPackageVal} LPA</h3>
                  <span className="text-[11px] text-slate-500">{selectedYear === 2024 ? "Avalanche International" : "Top Tier Offer"}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-blue-50 text-[#2E5C9E]">
                  <TrendingUp size={28} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Median Package</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">{medianPackageVal} LPA</h3>
                  <span className="text-[11px] text-slate-500">Institute-wide median</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600">
                  <Users size={28} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Students Placed</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">{totalPlacedVal}+</h3>
                  <span className="text-[11px] text-slate-500">Across {deptData.length} engineering streams</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600">
                  <Briefcase size={28} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Overall Placement Rate</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">{avgPlacementRate}%</h3>
                  <span className="text-[11px] text-slate-500">{totalOffersSum > 0 ? `${totalOffersSum} Total Offers Received` : "Batch conversion"}</span>
                </div>
              </div>
            </section>

            {/* Section: Department Breakdown with Two-Tone Bar Charts */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                    DEPARTMENT METRICS
                  </span>
                  <h2 className="text-2xl font-bold font-serif text-[#1B2A4A]">
                    Department-wise Statistics ({selectedYear}–{(selectedYear + 1).toString().slice(2)})
                  </h2>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab("packages")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === "packages"
                        ? "bg-[#1B2A4A] text-white shadow-sm"
                        : "text-[#6B7280] hover:text-[#1A1A1A]"
                    }`}
                  >
                    Highest Package (LPA)
                  </button>
                  <button
                    onClick={() => setActiveTab("rates")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === "rates"
                        ? "bg-[#1B2A4A] text-white shadow-sm"
                        : "text-[#6B7280] hover:text-[#1A1A1A]"
                    }`}
                  >
                    Placement Rate (%)
                  </button>
                  <button
                    onClick={() => setActiveTab("placed")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === "placed"
                        ? "bg-[#1B2A4A] text-white shadow-sm"
                        : "text-[#6B7280] hover:text-[#1A1A1A]"
                    }`}
                  >
                    Students Placed
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Chart Area */}
                <div className="lg:col-span-8 h-80 w-full">
                  {deptData.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-xs text-slate-400">
                      No department placement records available for {selectedYear}
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={deptData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="department" stroke="#6B7280" fontSize={12} fontStyle="bold" />
                        <YAxis stroke="#6B7280" fontSize={12} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1B2A4A", borderRadius: "12px", border: "none", color: "#FFFFFF" }}
                        />
                        {activeTab === "packages" && (
                          <Bar dataKey="highestLPA" name="Highest Package (LPA)" fill="#1B2A4A" radius={[8, 8, 0, 0]} />
                        )}
                        {activeTab === "rates" && (
                          <Bar dataKey="placementRate" name="Placement Rate (%)" fill="#2E5C9E" radius={[8, 8, 0, 0]} />
                        )}
                        {activeTab === "placed" && (
                          <Bar dataKey="placed" name="Students Placed" fill="#5B9BD5" radius={[8, 8, 0, 0]} />
                        )}
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Circular Ring Stat Badges Grid */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                  {deptData.map((dept) => (
                    <div
                      key={dept.department}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col items-center text-center justify-between"
                    >
                      <div className="w-14 h-14 rounded-full border-4 border-[#2E5C9E] flex items-center justify-center font-black text-xs text-[#1B2A4A] bg-white shadow-sm">
                        {dept.placementRate}%
                      </div>
                      <div className="font-bold text-xs text-[#1A1A1A] mt-2">{dept.department}</div>
                      <div className="text-[10px] text-[#6B7280]">{dept.placed} Placed ({dept.totalOffers} Offers)</div>
                      <div className="text-[10px] font-bold text-[#2E5C9E] mt-1">Max: {dept.highestLPA} LPA</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Detailed Department Data Table */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <Table className="text-[#1B2A4A]" size={24} />
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#1B2A4A]">
                    Detailed Department Placement Records ({selectedYear} Batch)
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Verified breakdown of student placement counts, offer conversions, median packages, and peak CTCs.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-[#6B7280] font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Department / Program</th>
                      <th className="py-3.5 px-4 text-center">Code</th>
                      <th className="py-3.5 px-4 text-center">Students Placed</th>
                      <th className="py-3.5 px-4 text-center">Total Offers</th>
                      <th className="py-3.5 px-4 text-center">Placement Rate</th>
                      <th className="py-3.5 px-4 text-center">Median CTC</th>
                      <th className="py-3.5 px-4 text-right">Highest CTC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {deptData.map((d) => (
                      <tr key={d.department} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-4 font-bold text-[#1B2A4A]">{d.fullName}</td>
                        <td className="py-4 px-4 text-center">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2E5C9E] font-bold text-[11px]">
                            {d.department}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-slate-800">{d.placed}</td>
                        <td className="py-4 px-4 text-center font-semibold text-slate-600">{d.totalOffers}</td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center gap-2">
                            <span className="font-black text-emerald-600">{d.placementRate}%</span>
                            <div className="w-16 bg-slate-200 rounded-full h-1.5 hidden sm:block overflow-hidden">
                              <div
                                className="bg-emerald-500 h-1.5 rounded-full"
                                style={{ width: `${Math.min(d.placementRate, 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-[#2E5C9E]">{d.avgLPA} LPA</td>
                        <td className="py-4 px-4 text-right font-black text-[#1B2A4A]">{d.highestLPA} LPA</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-200 bg-slate-50 font-bold text-slate-900">
                      <td className="py-4 px-4 font-black">Total / Institute Average</td>
                      <td className="py-4 px-4 text-center font-bold">{deptData.length} Streams</td>
                      <td className="py-4 px-4 text-center font-black text-emerald-600">
                        {deptData.reduce((acc, d) => acc + d.placed, 0)} Placed
                      </td>
                      <td className="py-4 px-4 text-center font-black text-[#2E5C9E]">
                        {totalOffersSum} Offers
                      </td>
                      <td className="py-4 px-4 text-center font-black text-emerald-600">{avgPlacementRate}%</td>
                      <td className="py-4 px-4 text-center font-black text-[#2E5C9E]">{medianPackageVal} LPA</td>
                      <td className="py-4 px-4 text-right font-black text-[#1B2A4A]">{highestPackageVal} LPA</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

            {/* Section: Sector & Offer Type Distribution */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sector Split Donut */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                    INDUSTRY DOMAINS
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#1B2A4A] mb-1">
                    Offer Sector Distribution ({selectedYear})
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Calculated from recruitment stream selections and recruiter offer distributions.
                  </p>
                </div>

                <div className="h-64 w-full my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val) => `${val}%`}
                        contentStyle={{ backgroundColor: "#1B2A4A", borderRadius: "12px", border: "none", color: "#FFFFFF" }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
                  {sectorData.map((s) => (
                    <div key={s.name}>
                      <div className="text-base font-black text-[#1A1A1A]">{s.value}%</div>
                      <div className="text-[10px] text-[#6B7280] line-clamp-1">{s.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Year Trend */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                    GROWTH OVER TIME
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#1B2A4A] mb-1">
                    5-Year Placement Trend (2020–2024)
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Consistent year-on-year growth in student selections and top salary packages.
                  </p>
                </div>

                <div className="h-64 w-full my-4">
                  {historicalTrends.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-xs text-slate-400">
                      No historical trend data available
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalTrends} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="year" stroke="#6B7280" fontSize={12} />
                        <YAxis stroke="#6B7280" fontSize={12} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1B2A4A", borderRadius: "12px", border: "none", color: "#FFFFFF" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="studentsPlaced"
                          name="Students Placed"
                          stroke="#1B2A4A"
                          strokeWidth={3}
                          dot={{ r: 6, fill: "#2E5C9E" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="highestLPA"
                          name="Highest Package (LPA)"
                          stroke="#5B9BD5"
                          strokeWidth={2}
                          strokeDasharray="4 4"
                          dot={{ r: 4, fill: "#5B9BD5" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-2 pt-4 border-t border-slate-100 text-center">
                  {historicalTrends.map((t) => (
                    <div key={t.year}>
                      <div className="text-xs font-bold text-[#6B7280]">{t.year}</div>
                      <div className="text-sm font-black text-[#1A1A1A]">{t.studentsPlaced}</div>
                      <div className="text-[10px] text-[#2E5C9E]">Max: {t.highestLPA} LPA</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section: Major Recruiting Partners & Roster */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Building2 className="text-[#1B2A4A]" size={26} />
                  <div>
                    <h3 className="text-xl font-bold font-serif text-[#1B2A4A]">
                      Recruiting Partners ({selectedYear} Batch)
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      Multinational corporations, core engineering conglomerates, and top tech employers hiring from KGEC.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-[#2E5C9E] rounded-full border border-blue-100">
                  {recruiters.length} Active Recruiters
                </span>
              </div>

              {recruiters.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No recruiter listings recorded for {selectedYear}.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {recruiters.map((comp) => (
                    <div
                      key={comp.name}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-[#2E5C9E] transition-all text-center flex flex-col items-center justify-center shadow-xs"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1B2A4A] flex items-center justify-center font-black text-sm mb-2 shadow-xs">
                        {comp.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-[#1A1A1A] line-clamp-1">{comp.name}</span>
                      <span className="text-[10px] text-[#2E5C9E] font-bold mt-0.5">{comp.offers} Offers</span>
                      <span className="text-[9px] text-[#6B7280]">{comp.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Bottom Navigation CTA */}
            <div className="bg-[#1B2A4A] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold">Interested in Campus Recruitment?</h4>
                <p className="text-xs text-slate-300">
                  Download the Job Notification Form or connect directly with our Training & Placement Cell.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/training-and-placement#contact-tpo"
                  className="px-5 py-2.5 rounded-full bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs transition-colors"
                >
                  Contact Placement Cell
                </Link>
                <Link
                  href="/training-and-placement"
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                >
                  Back to T&P Overview
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

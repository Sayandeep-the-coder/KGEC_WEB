"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, GraduationCap, UserCheck, Sparkles, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface DeptEnrollmentRow {
  department: string;
  fullName: string;
  total: number;
  male: number;
  female: number;
}

interface GenderRatioEntry {
  name: string;
  value: number;
  color: string;
}

export default function StudentStrengthPage() {
  const [activeView, setActiveView] = useState<"ug" | "pg">("ug");
  const [ugData, setUgData] = useState<DeptEnrollmentRow[]>([]);
  const [pgData, setPgData] = useState<DeptEnrollmentRow[]>([]);
  const [genderRatio, setGenderRatio] = useState<GenderRatioEntry[]>([]);
  const [totalIntake, setTotalIntake] = useState<number>(0);
  const [maleRatio, setMaleRatio] = useState<string>("0");
  const [femaleRatio, setFemaleRatio] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEnrollmentData() {
      try {
        setLoading(true);
        const [statsRes, deptRes] = await Promise.all([
          fetch("/api/v1/enrollment/stats").then((r) => r.json()),
          fetch("/api/v1/enrollment/departments").then((r) => r.json()),
        ]);

        if (statsRes?.data) {
          const statsList = Array.isArray(statsRes.data) ? statsRes.data : [statsRes.data];
          const latestStats = statsList[statsList.length - 1];
          if (latestStats) {
            setTotalIntake(latestStats.totalStudents || 0);
            const m = latestStats.totalMale || 0;
            const f = latestStats.totalFemale || 0;
            const mPct = latestStats.maleRatio || (m + f > 0 ? ((m / (m + f)) * 100).toFixed(1) : "0");
            const fPct = latestStats.femaleRatio || (m + f > 0 ? ((f / (m + f)) * 100).toFixed(1) : "0");
            setMaleRatio(String(mPct));
            setFemaleRatio(String(fPct));

            setGenderRatio([
              { name: `Male Students (${mPct}%)`, value: m, color: "#1B2A4A" },
              { name: `Female Students (${fPct}%)`, value: f, color: "#5B9BD5" },
            ]);
          }
        }

        if (deptRes?.data && Array.isArray(deptRes.data)) {
          const ugs: DeptEnrollmentRow[] = [];
          const pgs: DeptEnrollmentRow[] = [];

          const deptNames: Record<string, string> = {
            cse: "Computer Science & Engineering",
            it: "Information Technology",
            ece: "Electronics & Communication",
            ee: "Electrical Engineering",
            me: "Mechanical Engineering",
            mca: "Master of Computer Applications",
            mtech: "M.Tech Programs",
          };

          deptRes.data.forEach((item: { department?: string; totalStudents?: number; maleStudents?: number; femaleStudents?: number }) => {
            const code = (item.department || "").toUpperCase();
            const lower = (item.department || "").toLowerCase();
            const row: DeptEnrollmentRow = {
              department: code,
              fullName: deptNames[lower] || code,
              total: item.totalStudents || (item.maleStudents || 0) + (item.femaleStudents || 0),
              male: item.maleStudents || 0,
              female: item.femaleStudents || 0,
            };

            if (lower === "mtech" || lower === "pe") {
              pgs.push(row);
            } else {
              ugs.push(row);
            }
          });

          setUgData(ugs);
          setPgData(pgs);
        }
      } catch (err) {
        console.error("Error fetching enrollment data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEnrollmentData();
  }, []);

  const currentDataset = activeView === "ug" ? ugData : pgData;

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Student Enrollment & Demographics</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif">
                Student Strength & Demographics
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                Department-wise intake distribution, undergraduate & postgraduate enrollments, and gender ratio breakdown fetched dynamically from the database.
              </p>
            </div>

            <div className="shrink-0 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex gap-1">
              <button
                onClick={() => setActiveView("ug")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === "ug" ? "bg-white text-[#1B2A4A] shadow-md" : "text-slate-200 hover:text-white"
                }`}
              >
                Undergraduate (B.Tech)
              </button>
              <button
                onClick={() => setActiveView("pg")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === "pg" ? "bg-white text-[#1B2A4A] shadow-md" : "text-slate-200 hover:text-white"
                }`}
              >
                Postgraduate (M.Tech)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-500 gap-3">
            <Loader2 className="animate-spin text-[#2E5C9E]" size={28} />
            <span className="text-sm font-semibold">Loading demographic records from database...</span>
          </div>
        ) : (
          <>
            {/* Top Metric Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-blue-50 text-[#2E5C9E]">
                  <Users size={28} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                    Institute Total Intake
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">{totalIntake}</h3>
                  <span className="text-[11px] text-slate-500">Across UG, PG & MCA</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-indigo-50 text-[#1B2A4A]">
                  <UserCheck size={28} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                    Male Student Ratio
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
                    {maleRatio}%
                  </h3>
                  <span className="text-[11px] text-slate-500">Engineering & Tech disciplines</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-sky-50 text-[#5B9BD5]">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                    Female Student Ratio
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
                    {femaleRatio}%
                  </h3>
                  <span className="text-[11px] text-slate-500">Promoting women in STEM</span>
                </div>
              </div>
            </section>

            {/* Charts Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Department-wise Two-Tone Bar Chart */}
              <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                    DEPARTMENT INTAKE BREAKDOWN
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#1B2A4A]">
                    {activeView === "ug" ? "Undergraduate Department Intake" : "Postgraduate Department Intake"}
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Comparing Male and Female enrollment distributions across departments.
                  </p>
                </div>

                <div className="h-80 w-full">
                  {currentDataset.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-xs text-slate-400">
                      No department data available
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentDataset} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="department" stroke="#6B7280" fontSize={12} fontStyle="bold" />
                        <YAxis stroke="#6B7280" fontSize={12} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1B2A4A", borderRadius: "12px", border: "none", color: "#FFFFFF" }}
                        />
                        <Legend />
                        <Bar dataKey="male" name="Male Students" fill="#1B2A4A" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="female" name="Female Students" fill="#5B9BD5" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Overall Institute Gender Ratio Donut */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                    DIVERSITY INDEX
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#1B2A4A] mb-1">
                    Institute Gender Ratio
                  </h3>
                  <p className="text-xs text-[#6B7280]">Overall enrollment distribution.</p>
                </div>

                <div className="h-56 w-full my-3">
                  {genderRatio.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-xs text-slate-400">
                      No gender ratio data available
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderRatio}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {genderRatio.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(val) => `${val} Students`}
                          contentStyle={{ backgroundColor: "#1B2A4A", borderRadius: "12px", border: "none", color: "#FFFFFF" }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50">
                    <div className="text-xs text-[#6B7280]">Male Ratio</div>
                    <div className="text-base font-black text-[#1B2A4A]">{maleRatio}%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50">
                    <div className="text-xs text-[#2E5C9E]">Female Ratio</div>
                    <div className="text-base font-black text-[#2E5C9E]">{femaleRatio}%</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Demographics Table */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold font-serif text-[#1B2A4A] mb-4">
                Demographics Breakdown Table
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Department</th>
                      <th className="py-3.5 px-4">Discipline</th>
                      <th className="py-3.5 px-4">Total Intake</th>
                      <th className="py-3.5 px-4">Male</th>
                      <th className="py-3.5 px-4">Female</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {currentDataset.map((row) => (
                      <tr key={row.department} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-[#1B2A4A]">{row.department}</td>
                        <td className="py-3 px-4">{row.fullName}</td>
                        <td className="py-3 px-4 font-black">{row.total}</td>
                        <td className="py-3 px-4 text-[#1B2A4A] font-semibold">{row.male}</td>
                        <td className="py-3 px-4 text-[#2E5C9E] font-semibold">{row.female}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

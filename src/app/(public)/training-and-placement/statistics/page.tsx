"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { TrendingUp, Award, Building2, Users } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

interface PlacementStat {
  id: string;
  year: number;
  studentsPlaced: number;
  medianSalary: string | number;
  highestSalary: string | number;
}

interface PlacementDepartment {
  id: string;
  year: number;
  department: string;
  studentsPlaced: number;
  medianSalary: string | number;
  highestSalary: string | number;
}

interface Recruiter {
  id: string;
  year: number;
  company: string;
  offers: number;
  logoUrl?: string | null;
}

export default function PlacementStatisticsPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [stats, setStats] = useState<PlacementStat[]>([]);
  const [deptStats, setDeptStats] = useState<PlacementDepartment[]>([]);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const [resStats, resDepts, resRecruiters] = await Promise.all([
          fetch("/api/v1/placements/stats"),
          fetch(`/api/v1/placements/departments?year=${selectedYear}`),
          fetch(`/api/v1/placements/recruiters?year=${selectedYear}`),
        ]);

        const jsonStats = await resStats.json();
        const jsonDepts = await resDepts.json();
        const jsonRecruiters = await resRecruiters.json();

        if (!ignore) {
          if (jsonStats.data) setStats(Array.isArray(jsonStats.data) ? jsonStats.data : [jsonStats.data]);
          if (jsonDepts.data) setDeptStats(jsonDepts.data);
          if (jsonRecruiters.data) setRecruiters(jsonRecruiters.data);
        }
      } catch (err) {
        console.error("Error loading placement statistics:", err);
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
  }, [selectedYear]);

  const currentYearStat = stats.find((s) => s.year === selectedYear) || stats[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        {/* Banner */}
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
              TRAINING & PLACEMENT CELL
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
              Placement Statistics & Analytics
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2">
              Explore recruitment trends, salary packages, and major recruiters across departments.
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
              Select Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-slate-900 text-white rounded-xl px-4 py-2 text-sm font-bold border border-white/20 focus:outline-none cursor-pointer"
            >
              {[2024, 2023, 2022, 2021].map((y) => (
                <option key={y} value={y}>
                  Academic Year {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-kgec-blue">
              <Users size={28} />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Students Placed</span>
              <h3 className="text-2xl font-bold text-slate-900">{currentYearStat?.studentsPlaced || "N/A"}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={28} />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Median Package</span>
              <h3 className="text-2xl font-bold text-slate-900">{currentYearStat?.medianSalary ? `${currentYearStat.medianSalary} LPA` : "N/A"}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600">
              <Award size={28} />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Highest Package</span>
              <h3 className="text-2xl font-bold text-slate-900">{currentYearStat?.highestSalary ? `${currentYearStat.highestSalary} LPA` : "N/A"}</h3>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Trend Chart */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Placement History Trend</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.slice().reverse()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="studentsPlaced" stroke="#0f2552" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Department-wise Placements ({selectedYear})</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="studentsPlaced" fill="#2b59c3" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Major Recruiters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="text-kgec-navy" size={24} />
            <h3 className="text-xl font-bold text-slate-900">Top Recruiting Companies ({selectedYear})</h3>
          </div>

          {recruiters.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              Recruiter data for {selectedYear} currently updating.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recruiters.map((company) => (
                <div key={company.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center flex flex-col items-center justify-center">
                  {company.logoUrl ? (
                    <div className="relative w-16 h-12 mb-2">
                      <Image src={company.logoUrl} alt={company.company} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-kgec-blue flex items-center justify-center font-bold text-sm mb-2">
                      {company.company.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-900 line-clamp-1">{company.company}</span>
                  <span className="text-[10px] text-slate-500 font-semibold mt-0.5">{company.offers} Offers</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

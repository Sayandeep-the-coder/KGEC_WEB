"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, GraduationCap, UserCheck } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

interface EnrollmentStat {
  id: string;
  year: number;
  totalStudents: number;
  totalMale: number;
  totalFemale: number;
  maleRatio: string | number;
  femaleRatio: string | number;
}

interface DepartmentEnrollment {
  id: string;
  year: number;
  department: string;
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
}

export default function StudentStrengthPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [stats, setStats] = useState<EnrollmentStat[]>([]);
  const [deptEnrollment, setDeptEnrollment] = useState<DepartmentEnrollment[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const [resStats, resDepts] = await Promise.all([
          fetch(`/api/v1/enrollment/stats?year=${selectedYear}`),
          fetch(`/api/v1/enrollment/departments?year=${selectedYear}`),
        ]);

        const jsonStats = await resStats.json();
        const jsonDepts = await resDepts.json();

        if (isMounted) {
          if (jsonStats.data) setStats(Array.isArray(jsonStats.data) ? jsonStats.data : [jsonStats.data]);
          if (jsonDepts.data) setDeptEnrollment(jsonDepts.data);
        }
      } catch (err) {
        console.error("Error loading enrollment stats:", err);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  const currentStat = stats.find((s) => s.year === selectedYear) || stats[0];

  const genderData = currentStat
    ? [
        { name: "Male Students", value: currentStat.totalMale },
        { name: "Female Students", value: currentStat.totalFemale },
      ]
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        {/* Banner */}
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
              STUDENT ENROLLMENT DEMOGRAPHICS
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
              Student Strength & Diversity
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2">
              Department-wise student enrollment metrics and gender ratio distribution.
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
              Academic Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-slate-900 text-white rounded-xl px-4 py-2 text-sm font-bold border border-white/20 focus:outline-none cursor-pointer"
            >
              {[2024, 2023, 2022, 2021].map((y) => (
                <option key={y} value={y}>
                  Year {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-kgec-blue">
              <Users size={28} />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Total Enrolled</span>
              <h3 className="text-2xl font-bold text-slate-900">{currentStat?.totalStudents || "N/A"}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600">
              <UserCheck size={28} />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Male Students</span>
              <h3 className="text-2xl font-bold text-slate-900">
                {currentStat?.totalMale || "N/A"} <span className="text-xs text-slate-400 font-normal">({currentStat?.maleRatio}%)</span>
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-pink-50 text-pink-600">
              <GraduationCap size={28} />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase">Female Students</span>
              <h3 className="text-2xl font-bold text-slate-900">
                {currentStat?.totalFemale || "N/A"} <span className="text-xs text-slate-400 font-normal">({currentStat?.femaleRatio}%)</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Department Breakdown */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Department-wise Enrollment Breakdown ({selectedYear})</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptEnrollment}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="maleStudents" name="Male" fill="#0f2552" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="femaleStudents" name="Female" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gender Ratio Donut */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Gender Ratio</h3>
              <p className="text-xs text-slate-500 mb-4">Overall distribution for year {selectedYear}</p>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#0f2552" />
                    <Cell fill="#ec4899" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

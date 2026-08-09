"use client";

import { useState } from "react";
import { Users, GraduationCap, UserCheck } from "lucide-react";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface DeptEnrollmentRow {
  department: string;
  fullName: string;
  total: number;
  male: number;
  female: number;
}

export interface GenderRatioEntry {
  name: string;
  id?: string;
  value: number;
  fill?: string;
  color?: string;
}

const deptChartConfig = {
  male: {
    label: "Male Students",
    color: "#022448",
  },
  female: {
    label: "Female Students",
    color: "#5B9BD5",
  },
} satisfies ChartConfig;

const ratioChartConfig = {
  value: {
    label: "Students",
  },
  male: {
    label: "Male Students",
    color: "#1B2A4A",
  },
  female: {
    label: "Female Students",
    color: "#5B9BD5",
  },
} satisfies ChartConfig;

interface Props {
  ugData: DeptEnrollmentRow[];
  pgData: DeptEnrollmentRow[];
  genderRatio: GenderRatioEntry[];
  totalIntake: number;
  maleRatio: string;
  femaleRatio: string;
}

export default function StudentStrengthClient({
  ugData,
  pgData,
  genderRatio,
  totalIntake,
  maleRatio,
  femaleRatio,
}: Props) {
  const [activeView, setActiveView] = useState<"ug" | "pg">("ug");

  const currentDataset = activeView === "ug" ? ugData : pgData;

  return (
    <UnifiedPageLayout>
      <PageHero
        badge="Student Enrollment & Demographics"
        title="Student Strength & Demographics"
        subtitle="Department-wise intake distribution, undergraduate & postgraduate enrollments, and gender ratio breakdown fetched dynamically from the database."
      >
        <div className="shrink-0 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex gap-1 w-max mt-4">
          <button
            onClick={() => setActiveView("ug")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === "ug" ? "bg-white text-[#022448] shadow-md" : "text-slate-200 hover:text-white"
            }`}
          >
            Undergraduate (B.Tech)
          </button>
          <button
            onClick={() => setActiveView("pg")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === "pg" ? "bg-white text-[#022448] shadow-md" : "text-slate-200 hover:text-white"
            }`}
          >
            Postgraduate (M.Tech)
          </button>
        </div>
      </PageHero>

      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Overview"
                title="Enrollment Summary"
                align="left"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                <ContentCard variant="white" hover={false} delay={0} className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#f0f4ff] text-[#225eaa]">
                    <Users size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Institute Total Intake
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#022448]">{totalIntake}</h3>
                    <span className="text-[11px] text-slate-400">Across UG, PG & MCA</span>
                  </div>
                </ContentCard>

                <ContentCard variant="white" hover={false} delay={0.1} className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-indigo-50 text-[#022448]">
                    <UserCheck size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Male Student Ratio
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#022448]">
                      {maleRatio}%
                    </h3>
                    <span className="text-[11px] text-slate-400">Engineering & Tech disciplines</span>
                  </div>
                </ContentCard>

                <ContentCard variant="white" hover={false} delay={0.2} className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#d5e3ff] text-[#225eaa]">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Female Student Ratio
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#022448]">
                      {femaleRatio}%
                    </h3>
                    <span className="text-[11px] text-slate-400">Promoting women in STEM</span>
                  </div>
                </ContentCard>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <ContentCard variant="white" hover={false} className="h-full">
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#225eaa] block mb-1">
                      DEPARTMENT INTAKE BREAKDOWN
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#022448]">
                      {activeView === "ug" ? "Undergraduate Department Intake" : "Postgraduate Department Intake"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Comparing Male and Female enrollment distributions across departments.
                    </p>
                  </div>

                  <div className="h-80 w-full">
                    {currentDataset.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-xs text-slate-400">
                        No department data available
                      </div>
                    ) : (
                      <ChartContainer config={deptChartConfig} className="w-full h-full min-h-[300px]">
                        <BarChart data={currentDataset} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                          <XAxis dataKey="department" stroke="#6B7280" fontSize={12} fontStyle="bold" />
                          <YAxis stroke="#6B7280" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Bar dataKey="male" fill="var(--color-male)" radius={[6, 6, 0, 0]} />
                          <Bar dataKey="female" fill="var(--color-female)" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ChartContainer>
                    )}
                  </div>
                </ContentCard>
              </div>

              <div className="lg:col-span-4">
                <ContentCard variant="white" hover={false} className="h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#225eaa] block mb-1">
                      DIVERSITY INDEX
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#022448] mb-1">
                      Institute Gender Ratio
                    </h3>
                    <p className="text-xs text-slate-500">Overall enrollment distribution.</p>
                  </div>

                  <div className="h-56 w-full my-3">
                    {genderRatio.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-xs text-slate-400">
                        No gender ratio data available
                      </div>
                    ) : (
                      <ChartContainer config={ratioChartConfig} className="w-full h-full min-h-[200px]">
                        <PieChart>
                          <Pie
                            data={genderRatio}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={4}
                            dataKey="value"
                            nameKey="id"
                          >
                            {genderRatio.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                          <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                      </ChartContainer>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-50">
                      <div className="text-xs text-slate-500">Male Ratio</div>
                      <div className="text-base font-black text-[#022448]">{maleRatio}%</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#f0f4ff]">
                      <div className="text-xs text-[#225eaa]">Female Ratio</div>
                      <div className="text-base font-black text-[#225eaa]">{femaleRatio}%</div>
                    </div>
                  </div>
                </ContentCard>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Tabular Data"
                title="Demographics Breakdown Table"
                align="left"
              />
              <div className="overflow-x-auto mt-8">
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
                        <td className="py-3 px-4 font-bold text-[#022448]">{row.department}</td>
                        <td className="py-3 px-4">{row.fullName}</td>
                        <td className="py-3 px-4 font-black">{row.total}</td>
                        <td className="py-3 px-4 text-[#022448] font-semibold">{row.male}</td>
                        <td className="py-3 px-4 text-[#225eaa] font-semibold">{row.female}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </UnifiedPageLayout>
  );
}

"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { YearEnrollmentStat, YearPlacementStat } from "@/lib/data/departmentsData";
import { Users, TrendingUp } from "lucide-react";

interface DepartmentChartsProps {
  departmentName: string;
  departmentCode: string;
  enrollmentData: YearEnrollmentStat[];
  placementData: YearPlacementStat[];
}

export default function DepartmentCharts({
  departmentName,
  departmentCode,
  enrollmentData,
  placementData,
}: DepartmentChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Chart: 5-Year Student Numbers / Enrollment Analysis */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-[#1B2A4A]">
                  5-Year Student Intake & Enrollment
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Academic Years: 2020–21 to 2024–25 ({departmentName} — {departmentCode})
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              100% Fill Rate
            </span>
          </div>

          <p className="text-xs text-slate-600 mt-3 mb-6 leading-relaxed">
            Consistently full seat capacity across regular WBJEE, JELET Lateral entry, and postgraduate batches with zero seat vacancy.
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={enrollmentData}
                margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "#64748B", fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: "#CBD5E1" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(46, 92, 158, 0.05)" }}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E2E8F0",
                    borderRadius: "1rem",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    fontSize: "12px",
                  }}
                  formatter={(value, name) => [
                    `${value} Students`,
                    name === "enrolled" ? "Enrolled Students" : "Sanctioned Intake",
                  ]}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
                  formatter={(value) => (value === "enrolled" ? "Enrolled Count" : "Sanctioned Intake")}
                />
                <Bar
                  dataKey="intake"
                  fill="#CBD5E1"
                  radius={[6, 6, 0, 0]}
                  name="intake"
                />
                <Bar
                  dataKey="enrolled"
                  fill="#1B2A4A"
                  radius={[6, 6, 0, 0]}
                  name="enrolled"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Sanctioned vs Enrolled</span>
          <span className="font-semibold text-[#1B2A4A]">Consistently Maintained 100% Demand</span>
        </div>
      </div>

      {/* Right Chart: 5-Year Placement Statistics Trends */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-[#1B2A4A]">
                  5-Year Placement Statistics
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Placement % & Offer Trends (2020–21 to 2024–25)
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-[#2E5C9E] border border-blue-200">
              {departmentCode} T&P Track
            </span>
          </div>

          <p className="text-xs text-slate-600 mt-3 mb-6 leading-relaxed">
            Multi-year recruitment trajectory showcasing strong placement conversion percentages and expanding recruitment offers.
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={placementData}
                margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "#64748B", fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: "#CBD5E1" }}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  domain={[50, 100]}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  unit="%"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E2E8F0",
                    borderRadius: "1rem",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    fontSize: "12px",
                  }}
                  formatter={(value, name) => [
                    name === "placementRate" ? `${value}%` : `${value} Offers`,
                    name === "placementRate" ? "Placement Rate" : "Total Offers",
                  ]}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
                  formatter={(value) => (value === "placementRate" ? "Placement Rate (%)" : "Total Offers Count")}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="placementRate"
                  stroke="#2E5C9E"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#2E5C9E", strokeWidth: 2, stroke: "#FFFFFF" }}
                  activeDot={{ r: 7 }}
                  name="placementRate"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="totalOffers"
                  stroke="#5B9BD5"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 4, fill: "#5B9BD5", strokeWidth: 2, stroke: "#FFFFFF" }}
                  name="totalOffers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Offers & Conversion</span>
          <span className="font-semibold text-[#2E5C9E]">High Campus Placement Conversion</span>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Landmark, GraduationCap, ArrowRight, Award, Trophy, Rocket, Sparkles } from "lucide-react";

export default function Achievements() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={14} />
          <span>CAMPUS PLACEMENT & ACHIEVEMENTS</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#1B2A4A]">
          Built on Legacy, Driven by Excellence
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] mt-2 max-w-xl mx-auto">
          Distinguished student achievements in national hackathons, global tech giants, and space exploration missions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
        {/* Established 1995 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-64 shadow-sm hover:shadow-md transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1B2A4A] flex items-center justify-center mb-4">
              <Landmark size={20} />
            </div>
            <h3 className="text-3xl font-bold font-serif text-[#1B2A4A]">1995</h3>
            <p className="text-xs font-medium text-[#6B7280] mt-1">Established by Govt of WB</p>
          </div>
          <div className="text-[11px] text-[#2E5C9E] font-semibold">30 Years of Excellence</div>
        </div>

        {/* 90 LPA Highest Offer */}
        <div className="bg-[#1B2A4A] text-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-64 shadow-lg group">
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-amber-400 flex items-center justify-center mb-4">
              <Award size={20} />
            </div>
            <h3 className="text-3xl font-bold text-amber-400">90 LPA</h3>
            <p className="text-xs font-medium text-blue-100 mt-1 leading-snug">
              Highest International Package (Avalanche)
            </p>
          </div>
          <Link
            href="/training-and-placement/statistics"
            className="relative z-10 text-[11px] font-bold text-blue-200 hover:text-white flex items-center gap-1 mt-auto"
          >
            <span>View Statistics</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Smart India Hackathon Trophies */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-64 shadow-sm hover:shadow-md transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Trophy size={20} />
            </div>
            <h3 className="text-3xl font-bold text-[#1B2A4A]">1st Prize</h3>
            <p className="text-xs font-medium text-[#6B7280] mt-1 leading-snug">
              Smart India Hackathon (2022 & 2019 National Champions)
            </p>
          </div>
          <div className="text-[11px] text-amber-600 font-semibold">SIH & AIR Ranks</div>
        </div>

        {/* Chandrayaan-3 Alumni Pride */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-64 shadow-sm hover:shadow-md transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center mb-4">
              <Rocket size={20} />
            </div>
            <h3 className="text-3xl font-bold text-[#1B2A4A]">ISRO</h3>
            <p className="text-xs font-medium text-[#6B7280] mt-1 leading-snug">
              Alumni Scientists in Chandrayaan-3 Mission
            </p>
          </div>
          <Link
            href="/alumni"
            className="text-[11px] font-bold text-[#2E5C9E] hover:underline flex items-center gap-1"
          >
            <span>Alumni Diaries</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* 76.2% Overall Placements */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-64 shadow-sm hover:shadow-md transition-all group">
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#2E5C9E] text-white flex items-center justify-center mb-4">
              <GraduationCap size={20} />
            </div>
            <h3 className="text-3xl font-bold text-[#1B2A4A]">76.2%</h3>
            <p className="text-xs font-medium text-[#6B7280] mt-1 leading-snug">
              Average Placement Rate Across Branches
            </p>
          </div>
          <Link
            href="/training-and-placement"
            className="relative z-10 text-xs font-bold text-[#2E5C9E] flex items-center gap-1.5 group-hover:gap-2.5 transition-all mt-auto"
          >
            <span>T&P Cell Portal</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

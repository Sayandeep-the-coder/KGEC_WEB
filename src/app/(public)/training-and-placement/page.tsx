import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Briefcase,
  TrendingUp,
  Award,
  Users,
  Building2,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Compass,
  Zap,
  Globe,
  GraduationCap
} from "lucide-react";
import { db } from "@/lib/db";
import { placementStats, placementRecruiters, staff } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export const metadata = {
  title: "Training & Placement Cell | Kalyani Government Engineering College",
  description:
    "Official Training & Placement Cell portal of KGEC. Explore placement procedure, statistics, recruiter collaborations, and student achievements.",
};

const PROCEDURE_STEPS = [
  {
    step: "01",
    title: "Invitation & JNF",
    desc: "T&P Cell invites reputed organizations for campus recruitment. Interested recruiters share job roles and CTC details via the Job Notification Form (JNF).",
  },
  {
    step: "02",
    title: "Slot Allocation",
    desc: "Recruitment dates and interview slots are mutually finalized with the hiring team based on college calendar and organizational requirements.",
  },
  {
    step: "03",
    title: "Pre-Placement Talk (PPT)",
    desc: "Companies deliver interactive presentations briefing aspiring students on company culture, job descriptions, growth trajectories, and compensation.",
  },
  {
    step: "04",
    title: "Selection Process",
    desc: "Rigorous evaluation conducted through online aptitude tests, technical coding assessments, technical interview panels, and HR rounds.",
  },
  {
    step: "05",
    title: "Selection & Offer Rollout",
    desc: "Final shortlist is published through T&P Cell. Selected students receive official offer letters adhering to institutional placement guidelines.",
  },
];

const WHY_RECRUIT_US = [
  {
    title: "Focus on Innovation",
    desc: "Students consistently win national hackathons (Smart India Hackathon 1st Prizes in 2022 & 2019) and build real-world software & hardware prototypes.",
    icon: Sparkles,
  },
  {
    title: "Talent Hub of Bengal",
    desc: "KGEC attracts the top percentile of rankers from WBJEE and JELET across West Bengal and Eastern India.",
    icon: Award,
  },
  {
    title: "Comprehensive Growth",
    desc: "Holistic development with active technical societies (IEEE, KeyGenCoders, Robotics) and leadership cells nurturing team collaboration.",
    icon: Users,
  },
  {
    title: "Cutting-Edge Curriculum",
    desc: "AICTE-approved curriculum continuously updated with industry trends including AI/ML, Cloud, VLSI, Embedded Systems, and Thermal Engineering.",
    icon: Zap,
  },
  {
    title: "Modern Infrastructure",
    desc: "Specialized labs with high-performance computing, MATLAB, power simulation benches, wind tunnels, and optics labs.",
    icon: Globe,
  },
];

const CHIEF_TPRS = [
  { name: "Syamantak Pyne", role: "Chief Training & Placement Rep (Chief TPR)", dept: "CSE, B.Tech", email: "sctp@kgec.edu.in", phone: "+91 79081 24815" },
  { name: "Afzal Hossain Mallick", role: "Addl. Chief TPR", dept: "Mechanical Engineering, B.Tech", email: "sctp@kgec.edu.in", phone: "+91 98327 66191" },
  { name: "Arko Kundu", role: "Addl. Chief TPR", dept: "ECE, B.Tech", email: "sctp@kgec.edu.in", phone: "+91 74398 17750" },
  { name: "Arkadeep Mukherjee", role: "Addl. Chief TPR", dept: "Electrical Engineering, B.Tech", email: "sctp@kgec.edu.in", phone: "+91 94774 04977" },
];

const DEPT_COORDINATORS = [
  { dept: "Computer Science & Engineering", coordinators: "Debamrita Paul, Chandra Prakash Gupta, Rupam Mandal" },
  { dept: "Information Technology", coordinators: "Sahil Ansari, Santanu Purkait, Soumali Sau" },
  { dept: "Electronics & Communication", coordinators: "Arijit Ghosh, Nivriti Pradhan, Sanskriti Talukdar" },
  { dept: "Electrical Engineering", coordinators: "Nida Fatma, Ishika Senapati, Debasish Ghosh" },
  { dept: "Mechanical Engineering", coordinators: "Tamal Hembram, Atanu Bhuin, Surya Chatterjee" },
  { dept: "Production Engineering", coordinators: "Supriyo Sarkar, Surya Kanta Nag, Ritika Priya" },
  { dept: "Master of Computer Applications", coordinators: "Koushik Kumar, Anirudha Roy, Soumyadip Singha Mahapatra, Sudip Dome, Kingshuk Sarkar" },
];

async function getPlacementOverview() {
  try {
    const statsList = await db
      .select()
      .from(placementStats)
      .orderBy(desc(placementStats.year))
      .limit(5);

    const recruitersList = await db
      .select()
      .from(placementRecruiters)
      .orderBy(desc(placementRecruiters.offers))
      .limit(10);

    return { statsList, recruitersList };
  } catch (err) {
    console.error("Error fetching placement overview:", err);
    return { statsList: [], recruitersList: [] };
  }
}

export default async function TrainingAndPlacementPage() {
  const { statsList, recruitersList } = await getPlacementOverview();
  const latestStat = statsList[0] || {
    highestSalary: 9000000,
    medianSalary: 650000,
    studentsPlaced: 288,
  };

  const highestLPA = latestStat.highestSalary
    ? `INR ${(latestStat.highestSalary / 100000).toFixed(0)} LPA`
    : "INR 90 LPA";
  const medianLPA = latestStat.medianSalary
    ? `INR ${(latestStat.medianSalary / 100000).toFixed(1)} LPA`
    : "INR ~6.5 LPA";

  const keyMetrics = [
    { label: "Highest Package", value: highestLPA, sub: "Avalanche (International)", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Median Package", value: medianLPA, sub: "Across all engineering branches", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Recent Placed Students", value: `${latestStat.studentsPlaced}+ Offers`, sub: "Top government engineering college", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Full Time Offers", value: "85.7%", sub: "14.3% Internship conversion", icon: Briefcase, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Ribbon Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Training & Placement Cell</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] font-serif">
                Training & Placement Cell
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Bridging industry and academia by fostering technical prowess, leadership excellence, and professional competence in Eastern India&apos;s premier government engineering institution.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/training-and-placement/statistics"
                  className="px-6 py-3 rounded-full bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
                >
                  <span>Placement Statistics</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="#procedure"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all backdrop-blur-sm"
                >
                  Placement Procedure
                </Link>
                <Link
                  href="#contact-tpo"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all backdrop-blur-sm"
                >
                  Contact Coordinators
                </Link>
              </div>
            </div>

            {/* Quick Stat Pill Card */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="text-xs uppercase tracking-widest font-bold text-blue-300 mb-4">
                Batch Highlights
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="text-xs text-blue-200">International Highest Offer</div>
                  <div className="text-2xl font-black text-amber-400">{highestLPA}</div>
                  <div className="text-[11px] text-slate-300">Avalanche (CSE)</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="text-xs text-blue-200">Top Tech Placements</div>
                  <div className="text-2xl font-black text-white">52 LPA / 48 LPA</div>
                  <div className="text-[11px] text-slate-300">Microsoft & Amazon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Metric Cards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                    {m.label}
                  </span>
                  <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
                  {m.value}
                </div>
                <p className="text-xs text-[#6B7280] mt-1">{m.sub}</p>
              </div>
            );
          })}
        </section>

        {/* Section: From the Desk of TPO */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
              <div className="w-24 h-24 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center text-2xl font-serif font-bold shadow-md mb-4 border-4 border-blue-100">
                MK
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">Prof. Mrinal Kanti Kumar</h3>
              <p className="text-xs text-[#2E5C9E] font-bold uppercase tracking-wider mt-1">
                Professor, In-charge of Training and Placement
              </p>
              <p className="text-xs text-[#6B7280] mt-1">
                Kalyani Government Engineering College
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                <Mail size={12} className="text-[#2E5C9E]" />
                <span>tnp_kgec@kgec.edu.in</span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
                From the Desk of TPO
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
                Nurturing Future-Ready, Industry-Competent Engineers
              </h2>
              <blockquote className="italic text-slate-700 text-sm md:text-base leading-relaxed border-l-4 border-[#2E5C9E] pl-4 py-1">
                &ldquo;The Training and Placement Cell at KGEC is a cornerstone of our institution, dedicated to developing professionally competent engineers. Through value-based and high-quality education, we ensure our students are well-prepared for campus recruitment and their future careers. By bridging the gap between industry requirements and academic knowledge with regular soft skills and personality development workshops, we enhance students&apos; communication skills, build confidence, and prepare them to be industry-ready professionals. We are committed to fostering academic excellence and nurturing leadership skills, empowering our students to take charge of their lives, exceed expectations, and embrace a broader perspective.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* Section: Why Recruit Us (5 Pillars) */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                INSTITUTIONAL STRENGTHS
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#1B2A4A]">
                Why Recruit From KGEC?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-md">
              Established in 1995 with top state rankings, KGEC produces engineering graduates ready to create immediate industry impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_RECRUIT_US.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{pillar.title}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
            <div className="bg-[#1B2A4A] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">
                  Industry Collaboration
                </span>
                <h3 className="text-xl font-bold font-serif mt-2 mb-3">
                  Partner with KGEC Placement Cell
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We welcome recruiters for full-time campus placements, 6-month spring internships, and summer internship drives.
                </p>
              </div>
              <Link
                href="#contact-tpo"
                className="mt-6 inline-flex items-center justify-between w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors"
              >
                <span>Express Recruitment Interest</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Section: Placement Procedure (01-05 Numbered Flow) */}
        <section id="procedure" className="scroll-mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
              STEP-BY-STEP RECRUITMENT FLOW
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#1B2A4A]">
              Placement Procedure
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
              A seamless, structured 5-stage placement process designed for transparent and efficient hiring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {PROCEDURE_STEPS.map((s, idx) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between relative group hover:border-[#2E5C9E] transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#1B2A4A] text-white font-bold text-sm flex items-center justify-center mb-4 group-hover:bg-[#2E5C9E] transition-colors shadow-sm">
                    {s.step}
                  </div>
                  <h3 className="text-sm font-bold text-[#1A1A1A] mb-2">{s.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{s.desc}</p>
                </div>
                {idx < PROCEDURE_STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-2.5 top-10 z-10 text-slate-300">
                    <ChevronRight size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section: Recruiters Roster from Database */}
        {recruitersList.length > 0 && (
          <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                  OFFICIAL RECRUITMENT PARTNERS
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
                  Top Visiting Recruiters & Organizations
                </h2>
              </div>
              <Link
                href="/training-and-placement/statistics"
                className="text-xs font-bold text-[#2E5C9E] hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>View Full Placement Dashboard</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {recruitersList.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all text-center flex flex-col justify-center items-center"
                >
                  <Building2 size={24} className="text-[#2E5C9E] mb-2" />
                  <div className="font-bold text-xs sm:text-sm text-[#1A1A1A]">{rec.company}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{rec.offers} Offers</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Placement Coordinators Directory */}
        <section id="contact-tpo" className="scroll-mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                TRAINING & PLACEMENT REPRESENTATIVES
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#1B2A4A]">
                Placement Coordinators
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-md">
              Student coordinators work in tandem with the TPO to ensure smooth communication, schedule coordination, and hospitality.
            </p>
          </div>

          {/* Chief TPRs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {CHIEF_TPRS.map((tpr) => (
              <div
                key={tpr.name}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center font-bold text-sm mb-3">
                    {tpr.name.charAt(0)}
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A]">{tpr.name}</h3>
                  <div className="text-xs font-semibold text-[#2E5C9E] mt-0.5">{tpr.role}</div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">{tpr.dept}</div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-[#2E5C9E]" />
                    <a href={`mailto:${tpr.email}`} className="hover:underline text-[11px] truncate">
                      {tpr.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-[#2E5C9E]" />
                    <a href={`tel:${tpr.phone}`} className="hover:underline text-[11px]">
                      {tpr.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Department-wise Student Coordinators List */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <h3 className="text-base font-bold text-[#1B2A4A] mb-4">
              Department-wise Student Placement Coordinators
            </h3>
            <div className="divide-y divide-slate-100">
              {DEPT_COORDINATORS.map((dept) => (
                <div key={dept.dept} className="py-3 sm:flex sm:items-center justify-between gap-4">
                  <div className="font-bold text-xs sm:text-sm text-[#1A1A1A] sm:w-1/3">
                    {dept.dept}
                  </div>
                  <div className="text-xs text-[#6B7280] sm:w-2/3 mt-1 sm:mt-0">
                    {dept.coordinators}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Banner Bar */}
        <div className="bg-[#1B2A4A] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold">Kalyani Government Engineering College</h4>
            <p className="text-xs text-slate-300">
              Training and Placement Cell • Official Campus Portal
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/training-and-placement/statistics"
              className="px-5 py-2.5 rounded-full bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs transition-colors"
            >
              View Detailed Statistics
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              How to Reach KGEC
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

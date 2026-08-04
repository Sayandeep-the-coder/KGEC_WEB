import Link from "next/link";
import {
  Briefcase,
  TrendingUp,
  Award,
  Users,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Globe,
  Zap,
} from "lucide-react";
import { db } from "@/lib/db";
import { placementStats, placementRecruiters } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";

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
    { label: "Highest Package", value: highestLPA, sub: "Avalanche (International)", icon: Award, color: "text-[#d4a373]", bg: "bg-[#d4a373]/10" },
    { label: "Median Package", value: medianLPA, sub: "Across all engineering branches", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-500/10" },
    { label: "Recent Placed Students", value: `${latestStat.studentsPlaced}+ Offers`, sub: "Top government engineering college", icon: Users, color: "text-[#225eaa]", bg: "bg-blue-500/10" },
    { label: "Full Time Offers", value: "85.7%", sub: "14.3% Internship conversion", icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-500/10" },
  ];

  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Training & Placement Cell"
        title="Training & Placement Cell"
        subtitle="Bridging industry and academia by fostering technical prowess, leadership excellence, and professional competence in Eastern India's premier government engineering institution."
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mt-6">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/training-and-placement/statistics"
              className="px-6 py-3 rounded-full bg-white text-[#022448] font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 hover:bg-slate-100"
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
          
          {/* Quick Stat Pill Card */}
          <div className="lg:w-80 shrink-0 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs uppercase tracking-widest font-bold text-[#76A9FA] mb-4">
              Batch Highlights
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <div className="text-xs text-slate-300">International Highest Offer</div>
                <div className="text-xl font-black text-[#76A9FA]">{highestLPA}</div>
                <div className="text-[10px] text-slate-300">Avalanche (CSE)</div>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <div className="text-xs text-slate-300">Top Tech Placements</div>
                <div className="text-xl font-black text-white">52 LPA / 48 LPA</div>
                <div className="text-[10px] text-slate-300">Microsoft & Amazon</div>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Metric Cards Row */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <ContentCard key={m.label} variant="white" delay={idx * 0.1}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {m.label}
                    </span>
                    <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
                      <Icon size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#022448] tracking-tight">
                    {m.value}
                  </div>
                  <p className="text-xs text-[#43474e] mt-1">{m.sub}</p>
                </ContentCard>
              );
            })}
          </div>
        </div>

        {/* Section: From the Desk of TPO */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14 overflow-hidden relative">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-8">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-2xl font-serif font-bold shadow-sm mb-4 border border-slate-200 text-[#022448]">
                  MK
                </div>
                <h3 className="text-xl font-bold text-[#022448]">Prof. Mrinal Kanti Kumar</h3>
                <p className="text-xs text-[#225eaa] font-bold uppercase tracking-wider mt-1">
                  Professor, In-charge of Training and Placement
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Kalyani Government Engineering College
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full">
                  <Mail size={14} className="text-[#225eaa]" />
                  <span>tnp_kgec@kgec.edu.in</span>
                </div>
              </div>

              <div className="lg:col-span-8">
                <SectionHeader
                  badge="From the Desk of TPO"
                  title="Nurturing Future-Ready, Industry-Competent Engineers"
                  align="left"
                />
                <blockquote className="italic text-[#43474e] text-sm md:text-base leading-relaxed border-l-4 border-[#225eaa] pl-6 py-2 mt-6">
                  &ldquo;The Training and Placement Cell at KGEC is a cornerstone of our institution, dedicated to developing professionally competent engineers. Through value-based and high-quality education, we ensure our students are well-prepared for campus recruitment and their future careers. By bridging the gap between industry requirements and academic knowledge with regular soft skills and personality development workshops, we enhance students' communication skills, build confidence, and prepare them to be industry-ready professionals. We are committed to fostering academic excellence and nurturing leadership skills, empowering our students to take charge of their lives, exceed expectations, and embrace a broader perspective.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Why Recruit Us (5 Pillars) */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Institutional Strengths"
                title="Why Recruit From KGEC?"
                subtitle="Established in 1995 with top state rankings, KGEC produces engineering graduates ready to create immediate industry impact."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {WHY_RECRUIT_US.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <ContentCard key={pillar.title} variant="white" delay={idx * 0.1}>
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#225eaa] flex items-center justify-center mb-4">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-[#022448] mb-2">{pillar.title}</h3>
                      <p className="text-xs text-[#43474e] leading-relaxed">{pillar.desc}</p>
                    </ContentCard>
                  );
                })}
                
                <ContentCard variant="dark" hover={false} className="flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#76A9FA] uppercase tracking-widest">
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
                    className="mt-6 inline-flex items-center justify-between w-full p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors"
                  >
                    <span>Express Recruitment Interest</span>
                    <ChevronRight size={16} />
                  </Link>
                </ContentCard>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Placement Procedure (01-05 Numbered Flow) */}
        <div id="procedure" className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 scroll-mt-16">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Step-by-Step Recruitment Flow"
                title="Placement Procedure"
                subtitle="A seamless, structured 5-stage placement process designed for transparent and efficient hiring."
                align="center"
              />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative mt-12">
                {PROCEDURE_STEPS.map((s, idx) => (
                  <div
                    key={s.step}
                    className="flex flex-col relative group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#f0f4ff] text-[#225eaa] border border-blue-100 font-bold text-sm flex items-center justify-center mb-6 group-hover:bg-[#225eaa] group-hover:text-white transition-colors shadow-sm">
                      {s.step}
                    </div>
                    <h3 className="text-sm font-bold text-[#022448] mb-2">{s.title}</h3>
                    <p className="text-xs text-[#43474e] leading-relaxed">{s.desc}</p>
                    
                    {idx < PROCEDURE_STEPS.length - 1 && (
                      <div className="hidden md:block absolute -right-3 top-6 text-slate-300">
                        <ChevronRight size={20} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Recruiters Roster from Database */}
        {recruitersList.length > 0 && (
          <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
            <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
              <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                  <SectionHeader
                    badge="Official Recruitment Partners"
                    title="Top Visiting Recruiters & Organizations"
                    align="left"
                  />
                  <Link
                    href="/training-and-placement/statistics"
                    className="text-xs font-bold text-[#225eaa] hover:underline inline-flex items-center gap-1 shrink-0 bg-blue-50 px-4 py-2 rounded-full"
                  >
                    <span>View Full Placement Dashboard</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  {recruitersList.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all text-center flex flex-col justify-center items-center"
                    >
                      <Building2 size={28} className="text-[#225eaa] mb-3" />
                      <div className="font-bold text-sm text-[#022448]">{rec.company}</div>
                      <div className="text-xs text-slate-500 mt-1">{rec.offers} Offers</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section: Placement Coordinators Directory */}
        <div id="contact-tpo" className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 scroll-mt-16">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Training & Placement Representatives"
                title="Placement Coordinators"
                subtitle="Student coordinators work in tandem with the TPO to ensure smooth communication, schedule coordination, and hospitality."
                align="left"
              />

              {/* Chief TPRs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-12">
                {CHIEF_TPRS.map((tpr, idx) => (
                  <ContentCard key={tpr.name} variant="white" delay={idx * 0.05} className="flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] flex items-center justify-center font-bold text-lg mb-4">
                        {tpr.name.charAt(0)}
                      </div>
                      <h3 className="text-base font-bold text-[#022448]">{tpr.name}</h3>
                      <div className="text-xs font-semibold text-[#225eaa] mt-1">{tpr.role}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{tpr.dept}</div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[#225eaa]" />
                        <a href={`mailto:${tpr.email}`} className="hover:underline text-[11px] truncate">
                          {tpr.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-[#225eaa]" />
                        <a href={`tel:${tpr.phone}`} className="hover:underline text-[11px]">
                          {tpr.phone}
                        </a>
                      </div>
                    </div>
                  </ContentCard>
                ))}
              </div>

              {/* Department-wise Student Coordinators List */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <h3 className="text-base font-bold text-[#022448]">
                    Department-wise Student Placement Coordinators
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {DEPT_COORDINATORS.map((dept) => (
                    <div key={dept.dept} className="px-6 py-4 sm:flex sm:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                      <div className="font-bold text-sm text-[#022448] sm:w-1/3">
                        {dept.dept}
                      </div>
                      <div className="text-xs text-[#43474e] sm:w-2/3 mt-1 sm:mt-0 leading-relaxed">
                        {dept.coordinators}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Bar */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 pb-12">
          <ContentCard variant="muted" hover={false} className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-[#022448]">Kalyani Government Engineering College</h4>
              <p className="text-xs text-slate-600 mt-1">
                Training and Placement Cell • Official Campus Portal
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/training-and-placement/statistics"
                className="px-6 py-3 rounded-full bg-[#225eaa] hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                View Detailed Statistics
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-white text-[#022448] font-bold text-xs transition-colors border border-blue-200 shadow-sm hover:bg-blue-50"
              >
                How to Reach KGEC
              </Link>
            </div>
          </ContentCard>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}

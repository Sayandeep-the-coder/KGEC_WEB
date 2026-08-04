import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  Code,
  Zap,
  Cpu,
  Trophy,
  Users,
  Music,
  Camera,
  Palette,
  Compass,
  Briefcase,
  Flame,
  Globe,
  Award,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import ContentCard from "@/components/ui/ContentCard";

export const metadata = {
  title: "Campus Life, Cells & Clubs | Kalyani Government Engineering College",
  description:
    "Explore student-led campus cells, technical societies, cultural clubs, and annual flagship events at KGEC.",
};

const CAMPUS_CELLS = [
  {
    name: "Training & Placement Cell",
    desc: "Dedicated to campus recruitment, internships, and bridging the academia-industry gap through training programs.",
    icon: Briefcase,
    color: "bg-blue-50 text-[#022448]",
  },
  {
    name: "Institution's Innovation Council (IIC)",
    desc: "Fosters entrepreneurship, startup ideation, and intellectual property (IPR) awareness under MoE innovation guidelines.",
    icon: Compass,
    color: "bg-amber-50 text-amber-600",
  },
  {
    name: "Internal Quality Assurance Cell (IQAC)",
    desc: "Ensures continuous quality improvement in teaching, research, and administrative performance post-accreditation.",
    icon: Award,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "E-Cell (Entrepreneurship Cell)",
    desc: "A student-run body encouraging entrepreneurial mindsets, organizing business plan pitches and the annual E-Summit.",
    icon: Zap,
    color: "bg-orange-50 text-orange-600",
  },
  {
    name: "Sports Council",
    desc: "Manages all campus athletic infrastructure, intra-college sports tournaments, and university-level team participation.",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
];

const TECHNICAL_CLUBS = [
  {
    name: "KeyGenCoders",
    tagline: "Official Coding Club",
    desc: "Conducts regular coding marathons, algorithmic bootcamps, and competitive programming contests on Codeforces/LeetCode.",
    icon: Code,
  },
  {
    name: "IEEE KGEC Student Branch",
    tagline: "Technical Society",
    desc: "Affiliated with the global IEEE network; organizes technical workshops, international guest lectures, and student research symposia.",
    icon: Zap,
  },
  {
    name: "IEEE CIS Chapter",
    tagline: "Computational Intelligence",
    desc: "Dedicated to Artificial Intelligence, Machine Learning, and computational algorithms with regular hands-on workshops and contests.",
    icon: Cpu,
  },
  {
    name: "Robotics Society",
    tagline: "Robotics & Automation",
    desc: "Hands-on robotics hardware prototyping, microcontroller programming, autonomous rovers, and participation in national bot battles.",
    icon: Layers,
  },
  {
    name: "KGEC Developer Community",
    tagline: "Dev & Design Collaborative",
    desc: "Student-driven community for full-stack developers and open-source contributors; organizers of the 36-hour offline hackathon 'Binary'.",
    icon: Code,
  },
  {
    name: "Students' Automobile Club (SAC-KGEC)",
    tagline: "Automotive Engineering",
    desc: "Designs and builds working vehicle prototypes including go-karts (BINGO, MISTAKE); successfully competed in FMAE and FKDC national championships.",
    icon: Trophy,
  },
];

const BEYOND_CLUBS = [
  { name: "NSS Unit", category: "Social Service", desc: "Blood donation drives, environmental campaigns, rural health awareness, and social initiatives.", icon: Users },
  { name: "Elysium", category: "Dance Club", desc: "Contemporary, classical, and hip-hop dance performances at college and inter-college cultural events.", icon: Flame },
  { name: "Riyaz", category: "Music Club", desc: "Vocal and instrumental music society organizing acoustic jamming sessions and band performances.", icon: Music },
  { name: "Chitrank", category: "Art & Design", desc: "Fine arts, digital graphic designing, canvas paintings, fest posters, and visual decor.", icon: Palette },
  { name: "Shutterbug", category: "Photography & Film", desc: "Campus photojournalism, cinematic event coverage, short film-making, and annual photography exhibitions.", icon: Camera },
  { name: "I'mposter", category: "Drama & Theatre", desc: "Street plays (nukkad natak), stage drama, mime acts, and theatrical productions.", icon: Flame },
  { name: "No-Scope", category: "Esports & Gaming", desc: "Competitive LAN tournaments, esports strategy sessions, and gaming marathons.", icon: Trophy },
  { name: "Les Quizerables", category: "Quizzing Club", desc: "General knowledge, tech, pop culture, and business quizzes across state and national circuits.", icon: Award },
  { name: "Infinitio", category: "Mathematics Club", desc: "Mathematical problem-solving, logic puzzles, Olympiad coaching, and analytical workshops.", icon: Code },
  { name: "Litmus", category: "Literary Society", desc: "Debates, creative writing, poetry slams, group discussions, and the annual college magazine.", icon: Palette },
  { name: "Nova", category: "Astronomy Club", desc: "Stargazing sessions, astrophotography, telescope observation nights, and space science talks.", icon: Globe },
];

const ANNUAL_EVENTS = [
  {
    name: "Techtix",
    category: "Flagship Annual Tech Fest",
    desc: "Eastern India's celebrated technical festival featuring hackathons, robotics arenas, competitive coding, tech quizzes, and industry keynote sessions.",
    date: "Annual • Spring",
  },
  {
    name: "Exotica",
    category: "Annual Cultural Fest",
    desc: "A high-energy multi-day festival celebrating music, dance, and arts with celebrated Bollywood bands, rock concerts, and student performances.",
    date: "Annual • Winter",
  },
  {
    name: "E-Summit",
    category: "Entrepreneurship Summit",
    desc: "Organized by E-Cell; features Pitchathon, Stock Wars, Biz Quiz, Case Studies, and keynote addresses by successful startup founders and venture capitalists.",
    date: "Annual",
  },
  {
    name: "Binary",
    category: "36-Hour Offline Hackathon",
    desc: "A non-stop offline hackathon hosted by the Dev Community where engineering teams build software and hardware solutions for real-world problems.",
    date: "Annual • Hackathon",
  },
  {
    name: "Al-Hambra",
    category: "Annual Sports Fest",
    desc: "Inter-departmental and inter-college sports championship spanning football, cricket, badminton, table tennis, volleyball, and track events.",
    date: "Annual • Sports",
  },
];

export default function CampusLifePage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Campus Life & Student Societies"
        title="Campus Cells, Clubs & Events"
        subtitle="A thriving ecosystem of 5 administrative cells, 6 technical societies, 11 creative clubs, and marquee annual festivals powering student leadership and holistic growth."
      />

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Section 1: Campus Cells */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Institutional Cells"
                title="Campus Cells"
                subtitle="Dedicated student-faculty bodies managing career opportunities, sports, entrepreneurship, and industry-academia synergy."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {CAMPUS_CELLS.map((cell, idx) => {
                  const Icon = cell.icon;
                  return (
                    <ContentCard key={cell.name} variant="white" delay={idx * 0.1}>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${cell.color}`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-[#022448] mb-2">{cell.name}</h3>
                      <p className="text-xs text-[#43474e] leading-relaxed">{cell.desc}</p>
                    </ContentCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Clubs */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Innovation & Tech"
              title="Technical Societies"
              subtitle="Student-run tech communities fostering coding, hardware engineering, artificial intelligence, and open-source contributions."
              align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {TECHNICAL_CLUBS.map((club, idx) => {
                const Icon = club.icon;
                return (
                  <ContentCard key={club.name} variant="white" delay={idx * 0.1}>
                    <div className="w-12 h-12 rounded-2xl bg-[#f0f4ff] text-[#225eaa] flex items-center justify-center mb-4">
                      <Icon size={22} />
                    </div>
                    <div className="text-[10px] font-bold text-[#225eaa] uppercase tracking-widest mb-1">
                      {club.tagline}
                    </div>
                    <h3 className="text-lg font-bold text-[#022448] mb-2">{club.name}</h3>
                    <p className="text-xs text-[#43474e] leading-relaxed">{club.desc}</p>
                  </ContentCard>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Cultural & Extra-curricular */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Beyond Academics"
                title="Cultural & Special Interest Clubs"
                subtitle="Diverse societies celebrating performing arts, creative hobbies, literary debates, and social responsibilities."
                align="left"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {BEYOND_CLUBS.map((club, idx) => {
                  const Icon = club.icon;
                  return (
                    <ContentCard key={club.name} variant="white" delay={idx * 0.05} hover={false} className="bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#225eaa] font-bold text-[10px] uppercase tracking-wider border border-blue-100/50">
                          {club.category}
                        </span>
                        <Icon size={16} className="text-[#022448]" />
                      </div>
                      <h3 className="font-bold text-[#022448] text-sm mb-1.5">{club.name}</h3>
                      <p className="text-xs text-[#43474e] leading-relaxed line-clamp-3">
                        {club.desc}
                      </p>
                    </ContentCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Annual Events Timeline */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-[#022448] shadow-md border border-[#1e3a5f] p-6 md:p-10 lg:p-14 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
            
            <div className="max-w-[1200px] mx-auto relative z-10">
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-[#76A9FA] block mb-2">
                  THE KGEC EXPERIENCE
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-white">
                  Marquee Annual Festivals
                </h2>
                <p className="text-sm text-blue-100 mt-2">
                  High-octane national-level college fests bringing together thousands of students across engineering disciplines.
                </p>
              </div>

              <div className="space-y-4">
                {ANNUAL_EVENTS.map((evt, idx) => (
                  <div
                    key={evt.name}
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all gap-4"
                  >
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300">
                          <Calendar size={18} />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-white">{evt.name}</h3>
                      </div>
                      <span className="text-[11px] font-bold text-[#76A9FA] uppercase tracking-wider ml-11">
                        {evt.category}
                      </span>
                    </div>
                    <div className="md:w-1/2 text-sm text-blue-50 leading-relaxed pl-11 md:pl-0">
                      {evt.desc}
                    </div>
                    <div className="md:w-1/6 text-left md:text-right pl-11 md:pl-0">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold border border-white/20">
                        {evt.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}

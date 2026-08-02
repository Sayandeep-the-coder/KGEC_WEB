import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Sparkles,
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

export const metadata = {
  title: "Campus Life, Cells & Clubs | Kalyani Government Engineering College",
  description:
    "Explore student-led campus cells, technical societies, cultural clubs, and annual flagship events at KGEC.",
};

const CAMPUS_CELLS = [
  {
    name: "Training and Placement Cell",
    desc: "Prepares students for professional careers through training, skill-building workshops, industry exposure, placement drives, interview prep, and career counseling.",
    icon: Briefcase,
    color: "bg-blue-50 text-[#2E5C9E]",
  },
  {
    name: "Sportix (Sports Cell)",
    desc: "Supports fitness, sportsmanship, and teamwork. Organizes intra-college tournaments and hosts inter-college athletic meets.",
    icon: Trophy,
    color: "bg-amber-50 text-amber-600",
  },
  {
    name: "Industry Institute Partnership (IIP) Cell",
    desc: "Bridges academics and corporate industry through seminars, industrial tours, live projects, and specialized training programs.",
    icon: Globe,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    name: "Entrepreneurship Cell (E-Cell)",
    desc: "Fosters innovation, venture ideation, startup incubation, business plan competitions (Pitchathon), and organizes the annual E-Summit.",
    icon: Flame,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "Alumni Interaction Cell",
    desc: "Maintains an active network between current undergraduates and illustrious alumni across ISRO, Big Tech, academia, and global ventures.",
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
    icon: Sparkles,
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
  { name: "Elysium", category: "Dance Club", desc: "Contemporary, classical, and hip-hop dance performances at college and inter-college cultural events.", icon: Sparkles },
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
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Campus Life & Student Societies</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif">
                Campus Cells, Clubs & Events
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-3 max-w-2xl leading-relaxed">
                A thriving ecosystem of 5 administrative cells, 6 technical societies, 11 creative clubs, and marquee annual festivals powering student leadership and holistic growth.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="text-xs uppercase tracking-widest font-bold text-blue-300 mb-3">
                Student Life Matrix
              </div>
              <div className="space-y-3 text-xs text-slate-200">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span>Campus Cells</span>
                  <span className="font-bold text-white">5 Active Cells</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span>Technical Clubs</span>
                  <span className="font-bold text-white">6 Societies</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span>Cultural & Beyond Clubs</span>
                  <span className="font-bold text-white">11 Clubs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Flagship Events</span>
                  <span className="font-bold text-amber-400">5 Annual Fests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Section 1: Campus Cells */}
        <section>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
              INSTITUTIONAL CELLS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              Campus Cells
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Dedicated student-faculty bodies managing career opportunities, sports, entrepreneurship, and industry-academia synergy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPUS_CELLS.map((cell) => {
              const Icon = cell.icon;
              return (
                <div
                  key={cell.name}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${cell.color} flex items-center justify-center mb-4`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{cell.name}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{cell.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Technical Societies */}
        <section>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
              ENGINEERING & INNOVATION
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              Technical Activities & Clubs
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Competitive coding, AI/ML research, robotics design, vehicle prototyping, and hackathon organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNICAL_CLUBS.map((club) => {
              const Icon = club.icon;
              return (
                <div
                  key={club.name}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-[#2E5C9E] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">
                        {club.tagline}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-1">{club.name}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{club.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Cultural & Beyond Activities */}
        <section>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
              CREATIVITY & CO-CURRICULARS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              Beyond Activities (Clubs & Societies)
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Nurturing artistic expression, performing arts, literature, social service, astronomy, and gaming.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {BEYOND_CLUBS.map((club) => {
              const Icon = club.icon;
              return (
                <div
                  key={club.name}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2E5C9E] flex items-center justify-center">
                        <Icon size={16} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{club.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#1A1A1A] mb-1">{club.name}</h3>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed">{club.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Annual Flagship Events */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
              CAMPUS FESTIVALS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              Annual Flagship Events
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANNUAL_EVENTS.map((evt) => (
              <div
                key={evt.name}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between hover:bg-white transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-md bg-[#1B2A4A] text-white text-[10px] font-bold uppercase tracking-wider">
                      {evt.category}
                    </span>
                    <span className="text-xs font-bold text-[#2E5C9E]">{evt.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{evt.name}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner Bar */}
        <div className="bg-[#1B2A4A] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold">Experience KGEC Campus Life</h4>
            <p className="text-xs text-slate-300">
              Follow student society portals and participate in our upcoming annual events.
            </p>
          </div>
          <Link
            href="/gallery"
            className="px-5 py-2.5 rounded-full bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs transition-colors shrink-0"
          >
            View Campus Gallery
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Flame,
  Sparkles,
  Users,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Coins,
  Globe
} from "lucide-react";

export const metadata = {
  title: "Entrepreneurship Cell (E-Cell) | Kalyani Government Engineering College",
  description:
    "Student-driven startup incubator fostering entrepreneurship, business plan pitchathons, investor networking, and the annual KGEC E-Summit.",
};

const E_CELL_INITIATIVES = [
  {
    title: "Pitchathon & B-Plan Competitions",
    desc: "Annual venture pitching battles where student founders present MVP demos and business models before panels of venture capitalists, angel investors, and seasoned alumni founders.",
    icon: Trophy,
  },
  {
    title: "Annual E-Summit Flagship",
    desc: "A 2-day entrepreneurial congregation featuring keynote sessions from tech unicorns, panel debates on venture creation, startup internship expos, and hackathons.",
    icon: Flame,
  },
  {
    title: "Incubation Mentorship Circles",
    desc: "One-on-one advisory connecting student ideators with KGEC alumni entrepreneurs across Silicon Valley, Bengaluru, and Kolkata for product-market fit validation.",
    icon: Users,
  },
  {
    title: "Seed Grant Guidance & Legal Support",
    desc: "Assisting early-stage ventures with MSME registrations, DPIIT startup recognition, seed funding applications, and provisional patent drafting.",
    icon: Coins,
  },
];

export default function ECellPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/iic"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to IIC Overview</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Student Entrepreneurship Hub</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Entrepreneurship Cell (E-Cell)
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Empowering the next generation of builders, innovators, and startup founders through mentorship, funding channels, and high-energy pitchathons.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/iic/national-startup-policy"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Startup Policy (NISP)</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/campus-life"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Globe size={16} />
                  <span>Campus Clubs</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <Flame size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Startup Culture</p>
                    <p className="text-xl font-bold font-serif">Ignite & Build</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Home to active venture teams, patent holders, and alumni entrepreneurs transforming visionary ideas into sustainable enterprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Core Initiatives */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              E-Cell Activities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Flagship Programs & Incubation Initiatives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {E_CELL_INITIATIVES.map((init, idx) => {
              const Icon = init.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">{init.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{init.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action Card */}
        <section className="bg-linear-to-r from-[#1B2A4A] to-[#2E5C9E] text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
              Got a Venture Idea?
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif">
              Incubate with KGEC E-Cell
            </h2>
            <p className="text-xs md:text-sm text-blue-100 leading-relaxed">
              Connect with fellow student innovators, access high-performance computing resources, and receive direct mentoring from seasoned alumni founders.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-8 py-4 rounded-xl bg-white text-[#1B2A4A] hover:bg-blue-50 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
          >
            Connect with E-Cell
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

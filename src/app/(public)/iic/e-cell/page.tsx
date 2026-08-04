import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  Flame,
  Users,
  Trophy,
  ArrowRight,
  Coins,
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
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Student Entrepreneurship Hub"
        title="Entrepreneurship Cell (E-Cell)"
        subtitle="Empowering the next generation of builders, innovators, and startup founders through mentorship, funding channels, and high-energy pitchathons."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/iic/national-startup-policy"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Startup Policy (NISP)</span> <ArrowRight size={16} />
          </Link>
          <Link
            href="/campus-life"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Campus Clubs
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        {/* Core Initiatives */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="E-Cell Activities"
                title="Flagship Programs & Incubation Initiatives"
                subtitle="The structural pillars of the E-Cell that drive the startup ecosystem at KGEC from ideation to seed funding."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {E_CELL_INITIATIVES.map((init, idx) => {
                  const Icon = init.icon;
                  return (
                    <ContentCard key={idx} variant="white" delay={idx * 0.1}>
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#225eaa] flex items-center justify-center mb-6">
                        <Icon size={26} />
                      </div>
                      <h3 className="text-xl font-bold text-[#022448] mb-3">{init.title}</h3>
                      <p className="text-sm text-[#43474e] leading-relaxed">{init.desc}</p>
                    </ContentCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Card */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 pb-12">
          <div className="max-w-[1200px] mx-auto relative overflow-hidden bg-[#022448] rounded-3xl p-8 md:p-14 shadow-xl border border-[#1e3a5f] flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Background Accent */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

            <div className="space-y-4 max-w-2xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#76A9FA]">
                Got a Venture Idea?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">
                Incubate with KGEC E-Cell
              </h2>
              <p className="text-sm text-blue-100 leading-relaxed max-w-xl">
                Connect with fellow student innovators, access high-performance computing resources, and receive direct mentoring from seasoned alumni founders.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative z-10 shrink-0 px-8 py-4 rounded-xl bg-white text-[#022448] hover:bg-slate-100 font-bold text-sm uppercase tracking-wider transition-colors shadow-xl border border-white/20"
            >
              Connect with E-Cell
            </Link>
          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import {
  Lightbulb,
  Rocket,
  Building,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Globe
} from "lucide-react";

export const metadata = {
  title: "Institute Innovation Council (IIC) | Kalyani Government Engineering College",
  description:
    "Fostering entrepreneurship, innovation, startup incubation, patent support, and industry-institute partnerships at KGEC.",
};

const IIC_SUBPAGES = [
  {
    slug: "national-startup-policy",
    title: "National Innovation & Startup Policy (NISP)",
    icon: Rocket,
    desc: "Institutional guidelines and policy frameworks supporting student, alumni, and faculty entrepreneurs with intellectual property rights and incubation.",
  },
  {
    slug: "institute-innovation-council",
    title: "Institute Innovation Council",
    icon: Lightbulb,
    desc: "MHRD Innovation Cell established council driving hackathons, ideation challenges, design thinking workshops, and patent awareness drives.",
  },
  {
    slug: "e-cell",
    title: "Entrepreneurship Cell (E-Cell)",
    icon: Building,
    desc: "Student-led startup ecosystem providing venture mentorship, seed funding guidance, business plan competitions (Pitchathon), and the annual E-Summit.",
  },
  {
    slug: "iipc",
    title: "Industry Institute Partnership Cell (IIPC)",
    icon: ShieldCheck,
    desc: "Bridges corporate research demands with faculty expertise through consultancy projects, industrial apprenticeships, and live tech labs.",
  },
];

export default function IICIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Innovation & Incubation Hub</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Institute Innovation Council (IIC)
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Nurturing a vibrant ecosystem of venture ideation, intellectual property creation, startup incubation, and industry-partnered research at KGEC.
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
                  href="/iic/e-cell"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Rocket size={16} />
                  <span>KGEC E-Cell</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">MoE Innovation</p>
                    <p className="text-xl font-bold font-serif">4-Star Rated Council</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Consistently recognized for excellence in fostering student patents, venture ideation, and interdisciplinary hackathons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* IIC Sub-Units Grid */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Innovation Verticals
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Ecosystem Wings & Initiatives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {IIC_SUBPAGES.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={`/iic/${item.slug}`}
                  className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center mb-4 group-hover:bg-[#1B2A4A] group-hover:text-white transition-colors">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1B2A4A] mb-2 group-hover:text-[#2E5C9E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">{item.desc}</p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E5C9E] group-hover:text-[#1B2A4A] transition-colors">
                    <span>Explore Section</span>
                    <ChevronRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Dynamic Downloads Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Innovation Archives
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              IIC Reports & Policy Documents
            </h2>
          </div>

          <DownloadsTable category="iic" title="IIC Reports & Policy Documents" />
        </section>
      </main>

      <Footer />
    </div>
  );
}

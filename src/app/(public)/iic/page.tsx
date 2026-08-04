import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  Lightbulb,
  Rocket,
  Building,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
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
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Innovation & Incubation Hub"
        title="Institute Innovation Council (IIC)"
        subtitle="Nurturing a vibrant ecosystem of venture ideation, intellectual property creation, startup incubation, and industry-partnered research at KGEC."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/iic/national-startup-policy"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Startup Policy (NISP)</span> <ArrowRight size={16} />
          </Link>
          <Link
            href="/iic/e-cell"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            KGEC E-Cell
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        {/* IIC Sub-Units Grid */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Innovation Verticals"
                title="Ecosystem Wings & Initiatives"
                subtitle="Explore the specialized cells and policy frameworks designed to cultivate entrepreneurial spirit and technical excellence."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {IIC_SUBPAGES.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.slug} href={`/iic/${item.slug}`} className="block h-full group">
                      <ContentCard variant="white" delay={idx * 0.1} className="h-full flex flex-col justify-between group-hover:border-[#225eaa] group-hover:shadow-md transition-all">
                        <div>
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#225eaa] flex items-center justify-center mb-6 group-hover:bg-[#225eaa] group-hover:text-white transition-colors">
                            <Icon size={26} />
                          </div>
                          <h3 className="text-xl font-bold text-[#022448] mb-3 group-hover:text-[#225eaa] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[#43474e] leading-relaxed mb-6">{item.desc}</p>
                        </div>

                        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#225eaa] group-hover:text-[#022448] transition-colors mt-auto pt-4 border-t border-slate-100">
                          <span>Explore Section</span>
                          <ChevronRight size={16} />
                        </div>
                      </ContentCard>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Downloads Section */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 pb-12">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Innovation Archives"
              title="IIC Reports & Policy Documents"
              align="left"
            />
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <DownloadsTable category="iic" title="IIC Reports & Policy Documents" />
            </div>
          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}

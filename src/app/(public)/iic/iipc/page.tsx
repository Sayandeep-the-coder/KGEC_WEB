import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  ShieldCheck,
  Building2,
  Briefcase,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Industry Institute Partnership Cell (IIPC) | KGEC",
  description:
    "Bridging academic engineering with corporate R&D through consultancy projects, industrial apprenticeships, MoUs, and joint technical labs at KGEC.",
};

const IIPC_SERVICES = [
  {
    title: "Corporate Technical Consultancy",
    desc: "Deploying senior faculty domain experts and advanced laboratory infrastructure to address complex engineering and operational challenges faced by industrial partners.",
  },
  {
    title: "Joint Research & Industrial MoUs",
    desc: "Formalizing bilateral Memorandums of Understanding (MoUs) for collaborative research, specialized technology licensing, and sponsored testing facilities.",
  },
  {
    title: "Industrial Tours & Live Apprenticeships",
    desc: "Coordinating hands-on student visits to power plants, manufacturing complexes, IT development centers, and core engineering refineries across West Bengal and India.",
  },
  {
    title: "Continuing Professional Education",
    desc: "Customized technical upskilling and certification workshops designed by KGEC faculty for working engineers and corporate technical personnel.",
  },
];

export default function IIPCPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Industry Synergy Wing"
        title="Industry Institute Partnership Cell (IIPC)"
        subtitle="Bridging the gap between academic innovation and corporate industry demands through sponsored consultancy, institutional MoUs, and industrial training."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/training-and-placement"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Placement Cell</span> <ArrowRight size={16} />
          </Link>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Research Labs
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        {/* Core Services */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Engagement Verticals"
                title="Industry Collaboration Services"
                subtitle="The primary channels through which KGEC interfaces with corporate entities and industrial research bodies."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {IIPC_SERVICES.map((s, idx) => (
                  <ContentCard key={idx} variant="white" delay={idx * 0.1}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-50 text-[#225eaa] rounded-xl shrink-0">
                        <CheckCircle2 size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-[#022448]">{s.title}</h3>
                    </div>
                    <p className="text-sm text-[#43474e] leading-relaxed ml-12">{s.desc}</p>
                  </ContentCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic IIPC Downloads Section */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 pb-12">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="MoU & Documentation"
              title="Industrial Agreements & Guidelines"
              align="left"
            />
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <DownloadsTable category="iic" title="IIPC Guidelines & MoU Documents" />
            </div>
          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}

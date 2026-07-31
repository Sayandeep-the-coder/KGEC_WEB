import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";
import { Lightbulb, Rocket, Building, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Institute Innovation Council (IIC) | KGEC",
  description: "Fostering entrepreneurship, innovation, and startup ecosystem at Kalyani Government Engineering College.",
};

const IIC_SUBPAGES = [
  { slug: "national-startup-policy", title: "National Innovation & Startup Policy (NISP)", icon: Rocket, desc: "Guidelines & framework supporting student & faculty innovation." },
  { slug: "institute-innovation-council", title: "Institute Innovation Council", icon: Lightbulb, desc: "MHRD Innovation Cell establishing entrepreneurship drives." },
  { slug: "e-cell", title: "Entrepreneurship Cell (E-Cell)", icon: Building, desc: "Incubation, mentorship, and funding guidance for student startups." },
  { slug: "iipc", title: "Industry Institute Partnership Cell", icon: ShieldCheck, desc: "Bridging academia and industrial R&D projects." },
];

export default function IICIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            INNOVATION & ENTREPRENEURSHIP
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Institute Innovation Council (IIC)
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            Promoting curiosity, patent guidance, startup incubation, and industrial partnerships at KGEC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {IIC_SUBPAGES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.slug} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-kgec-blue flex items-center justify-center mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <DownloadsTable category="iic" title="IIC Reports & Policy Documents" />
      </main>

      <Footer />
    </div>
  );
}

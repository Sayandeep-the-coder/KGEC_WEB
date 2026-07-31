import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";

export const metadata = {
  title: "Internal Quality Assurance Cell (IQAC) | KGEC",
  description: "IQAC cell reports, policies, and quality audits at Kalyani Government Engineering College.",
};

export default function IQACPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            QUALITY ASSURANCE & COMPLIANCE
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Internal Quality Assurance Cell (IQAC)
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            Ensuring continuous academic performance enhancement, quality benchmarks, and institutional self-evaluation.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-sm text-slate-700 leading-relaxed mb-12 space-y-3">
          <h2 className="text-2xl font-bold font-serif text-slate-900">About IQAC</h2>
          <p>
            The IQAC at KGEC was established to monitor and improve academic standards, teaching-learning methodologies, and administrative efficiency. Annual Quality Assurance Reports (AQAR) and meeting minutes are uploaded regularly for stakeholder access.
          </p>
        </div>

        <DownloadsTable category="iqac" title="IQAC Reports & AQAR Files" />
      </main>

      <Footer />
    </div>
  );
}

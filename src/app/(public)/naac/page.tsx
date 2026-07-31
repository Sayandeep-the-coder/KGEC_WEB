import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";

export const metadata = {
  title: "NAAC Accreditation | Kalyani Government Engineering College",
  description: "NAAC accreditation documents, SSR reports, and institutional disclosures for KGEC.",
};

export default function NAACPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            ACCREDITATION & EVALUATION
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            NAAC Accreditation
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            National Assessment and Accreditation Council (NAAC) disclosures, Self-Study Reports (SSR), and evaluation certificates.
          </p>
        </div>

        <DownloadsTable category="naac" title="NAAC Accreditation Documents" />
      </main>

      <Footer />
    </div>
  );
}

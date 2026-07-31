import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FlaskConical, Award, BookOpen } from "lucide-react";

export const metadata = {
  title: "Research & Development | Kalyani Government Engineering College",
  description: "Explore the ongoing research projects, grants, and academic publications at KGEC.",
};

export default function ResearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            RESEARCH & INNOVATION
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Research & Development Cell
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            Driving breakthroughs in Artificial Intelligence, Sustainable Energy, VLSI, Robotics, and Advanced Materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-kgec-blue flex items-center justify-center mb-3">
              <FlaskConical size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Specialized Labs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">State-of-the-art research laboratories supported by DST, SERB, and AICTE grants.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-kgec-blue flex items-center justify-center mb-3">
              <BookOpen size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Peer Publications</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Hundreds of SCOPUS & IEEE indexed journal articles authored by KGEC faculty & scholars.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-kgec-blue flex items-center justify-center mb-3">
              <Award size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Patents & Consultancy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Active technology transfer, industry consultancy projects, and patent filings.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-sm text-slate-700 leading-relaxed space-y-4">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Faculty Publications & Research Portfolios</h2>
          <p>
            Individual research papers, publications, and patents are maintained directly on faculty profiles under the respective academic departments.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

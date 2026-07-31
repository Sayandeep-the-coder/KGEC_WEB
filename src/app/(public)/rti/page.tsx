import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";

export const metadata = {
  title: "Right to Information (RTI) | KGEC",
  description: "Right to Information Act disclosures, SPIO contacts, and statutory information for KGEC.",
};

export default function RTIPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            STATUTORY DISCLOSURES
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Right to Information (RTI) Act
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            Promoting transparency, accountability, and public access to statutory information.
          </p>
        </div>

        <DownloadsTable category="mandatory_disclosure" title="RTI Disclosures & Statutory Records" />
      </main>

      <Footer />
    </div>
  );
}

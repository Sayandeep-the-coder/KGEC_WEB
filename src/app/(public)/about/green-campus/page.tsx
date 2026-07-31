import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Leaf, Sun, Recycle, Droplets } from "lucide-react";

export const metadata = {
  title: "Green Campus | Kalyani Government Engineering College",
  description: "Explore the environmental initiatives, green energy, and sustainability practices at KGEC campus.",
};

const INITIATIVES = [
  { icon: Sun, title: "Solar Power", text: "Rooftop solar panels contributing clean energy to campus infrastructure." },
  { icon: Leaf, title: "Lush Greenery", text: "Extensive tree plantations and botanical gardens maintaining biodiversity." },
  { icon: Droplets, title: "Water Harvesting", text: "Rainwater harvesting reservoirs supporting campus landscape irrigation." },
  { icon: Recycle, title: "Waste Management", text: "Segregated waste processing and eco-friendly campus practices." },
];

export default function GreenCampusPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl relative overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block mb-2">
            SUSTAINABILITY INITIATIVES
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Green Campus Initiative
          </h1>
          <p className="text-emerald-100 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
            KGEC is dedicated to fostering a sustainable eco-friendly environment through clean energy, water conservation, and green technology adoption.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {INITIATIVES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-sm text-slate-700 leading-relaxed space-y-4">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Environmental Policy</h2>
          <p>
            The green campus initiative at KGEC aims to integrate environmental responsibility into daily academic life. Through student-led green clubs, tree planting drives, and energy audits, the college works toward reducing its carbon footprint.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Compass, Award } from "lucide-react";

export const metadata = {
  title: "About Us | Kalyani Government Engineering College",
  description: "Learn about the rich history, mission, vision, and leadership of Kalyani Government Engineering College.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        {/* Banner */}
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
              KALYANI GOVERNMENT ENGINEERING COLLEGE
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
              Empowering Minds, Shaping Tomorrow
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-4 leading-relaxed">
              Established in 1995 by the Government of West Bengal, KGEC stands as an institution of excellence in engineering education and research.
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none select-none text-[20rem] font-serif text-white">
            KGEC
          </div>
        </div>

        {/* Grid Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-kgec-blue flex items-center justify-center mb-4">
              <Compass size={24} />
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900 mb-3">Our Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To impart high-quality technical education, foster innovative research, and nurture ethical values to prepare engineers and technological leaders for societal development.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-kgec-blue flex items-center justify-center mb-4">
              <Award size={24} />
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900 mb-3">Our Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To achieve global recognition as a center of excellence in engineering education, innovation, and technological leadership for sustainable nation-building.
            </p>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold font-serif text-kgec-navy mb-4">Institute History</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Kalyani Government Engineering College (KGEC) was established by the Department of Higher Education, Government of West Bengal in 1995. The college is affiliated to Maulana Abul Kalam Azad University of Technology (MAKAUT) and approved by the All India Council for Technical Education (AICTE).
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mt-3">
              Located in the lush, green township of Kalyani, Nadia, West Bengal, the campus spans across an expansive green environment equipped with state-of-the-art laboratories, modern computing facilities, a central library, and student amenities.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-bold font-serif text-kgec-navy mb-4">Principal&apos;s Desk</h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 italic text-slate-700 text-sm leading-relaxed mb-4">
              &quot;At KGEC, we believe engineering is not merely about acquiring technical knowledge, but about cultivating a mindset of problem-solving, curiosity, and service to society.&quot;
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Our faculty members, students, and alumni consistently strive for excellence in academic pursuits, industry collaborations, and national research grants. We welcome aspiring students to join our vibrant community.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

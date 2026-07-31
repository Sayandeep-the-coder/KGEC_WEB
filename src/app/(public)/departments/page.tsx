import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Laptop, Cpu, Zap, Settings, Code, GraduationCap, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Academic Departments | Kalyani Government Engineering College",
  description: "Explore the undergraduate and postgraduate engineering departments at KGEC.",
};

const DEPARTMENTS = [
  { slug: "cse", name: "Computer Science & Engineering", code: "CSE", icon: Laptop, desc: "AI, Machine Learning, Data Science, Systems Engineering & Software Architecture." },
  { slug: "it", name: "Information Technology", code: "IT", icon: Code, desc: "Web Technologies, Cybersecurity, Cloud Computing & Network Infrastructure." },
  { slug: "ece", name: "Electronics & Communication", code: "ECE", icon: Cpu, desc: "VLSI Design, Embedded Systems, Signal Processing & Wireless Communications." },
  { slug: "ee", name: "Electrical Engineering", code: "EE", icon: Zap, desc: "Power Systems, Smart Grids, Control Automation & Renewable Energy." },
  { slug: "me", name: "Mechanical Engineering", code: "ME", icon: Settings, desc: "Robotics, Thermal Science, Industrial Design & Manufacturing Systems." },
  { slug: "mca", name: "Master of Computer Applications", code: "MCA", icon: GraduationCap, desc: "Advanced Software Applications, Database Systems & Enterprise IT Solutions." },
  { slug: "mtech", name: "M.Tech Programs", code: "M.TECH", icon: GraduationCap, desc: "Specialized postgraduate research in Engineering & Advanced Technology." },
];

export default function DepartmentsIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            ACADEMIC EXCELLENCE
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Engineering Departments
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            Fostering innovation, hands-on laboratory experience, and industry-oriented technical education across 7 specialized academic departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.slug}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-kgec-blue flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {dept.code}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-kgec-blue transition-colors mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {dept.desc}
                  </p>
                </div>

                <Link
                  href={`/departments/${dept.slug}`}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold text-kgec-navy group-hover:text-kgec-blue"
                >
                  <span>Explore Department</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

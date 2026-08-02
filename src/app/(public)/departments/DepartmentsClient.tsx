"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Laptop, Cpu, Zap, Settings, Code, GraduationCap, ArrowRight } from "lucide-react";

const DEPARTMENTS = [
  { 
    slug: "cse", 
    name: "Computer Science & Engineering", 
    code: "CSE", 
    icon: Laptop, 
    desc: "AI, Machine Learning, Data Science, Systems Engineering & Software Architecture.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  { 
    slug: "it", 
    name: "Information Technology", 
    code: "IT", 
    icon: Code, 
    desc: "Web Technologies, Cybersecurity, Cloud Computing & Network Infrastructure.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  { 
    slug: "ece", 
    name: "Electronics & Communication", 
    code: "ECE", 
    icon: Cpu, 
    desc: "VLSI Design, Embedded Systems, Signal Processing & Wireless Communications.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  { 
    slug: "ee", 
    name: "Electrical Engineering", 
    code: "EE", 
    icon: Zap, 
    desc: "Power Systems, Smart Grids, Control Automation & Renewable Energy.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  { 
    slug: "me", 
    name: "Mechanical Engineering", 
    code: "ME", 
    icon: Settings, 
    desc: "Robotics, Thermal Science, Industrial Design & Manufacturing Systems.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  { 
    slug: "mca", 
    name: "Master of Computer Applications", 
    code: "MCA", 
    icon: GraduationCap, 
    desc: "Advanced Software Applications, Database Systems & Enterprise IT Solutions.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  { 
    slug: "mtech", 
    name: "M.Tech Programs", 
    code: "M.TECH", 
    icon: GraduationCap, 
    desc: "Specialized postgraduate research in Engineering & Advanced Technology.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
];

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

export default function DepartmentsClient() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  const activeDept = hoveredDept ? DEPARTMENTS.find(d => d.slug === hoveredDept) : null;
  const bgImage = activeDept ? activeDept.image : DEFAULT_IMAGE;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-6 md:p-12 mb-8 md:mb-12 shadow-xl relative overflow-hidden transition-all duration-500">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-40 mix-blend-overlay"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-kgec-navy/80 to-transparent"></div>
          
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
              ACADEMIC EXCELLENCE
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight">
              Engineering Departments
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
              Fostering innovation, hands-on laboratory experience, and industry-oriented technical education across 7 specialized academic departments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.slug}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden min-h-65 sm:min-h-70"
                onMouseEnter={() => setHoveredDept(dept.slug)}
                onMouseLeave={() => setHoveredDept(null)}
              >
                {/* Background Image on Hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{ backgroundImage: `url(${dept.image})` }}
                />
                {/* Dark overlay to make text readable */}
                <div className="absolute inset-0 bg-kgec-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-white/20 text-kgec-blue group-hover:text-white flex items-center justify-center transition-colors duration-300">
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 group-hover:bg-white/20 text-slate-700 group-hover:text-white transition-colors duration-300">
                        {dept.code}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300 mb-2">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-slate-600 group-hover:text-slate-200 leading-relaxed mb-6 transition-colors duration-300">
                      {dept.desc}
                    </p>
                  </div>

                  <Link
                    href={`/departments/${dept.slug}`}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 group-hover:border-white/20 text-xs font-bold text-kgec-navy group-hover:text-white transition-colors duration-300"
                  >
                    <span>Explore Department</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

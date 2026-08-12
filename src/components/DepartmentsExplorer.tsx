"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code, Zap, Wrench, Binary, Users, ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";

const DEPARTMENTS = [
  {
    code: "CSE",
    name: "Computer Science & Engineering",
    intake: "60 Seats (B.Tech) + M.Tech",
    icon: Code,
    desc: "AI/ML, High-Performance Computing, Cybersecurity, and Software Engineering labs.",
    href: "/departments/cse",
    color: "from-blue-500/10 to-indigo-500/5 border-blue-200",
  },
  {
    code: "IT",
    name: "Information Technology",
    intake: "60 Seats (B.Tech)",
    icon: Binary,
    desc: "Cloud Computing, Data Analytics, Web Technologies, and IoT Research Labs.",
    href: "/departments/it",
    color: "from-cyan-500/10 to-blue-500/5 border-cyan-200",
  },
  {
    code: "ECE",
    name: "Electronics & Comm. Engg.",
    intake: "60 Seats (B.Tech) + M.Tech",
    icon: Cpu,
    desc: "VLSI Design, Embedded Systems, Signal Processing, and Wireless Communication.",
    href: "/departments/ece",
    color: "from-violet-500/10 to-purple-500/5 border-violet-200",
  },
  {
    code: "EE",
    name: "Electrical Engineering",
    intake: "60 Seats (B.Tech) + M.Tech",
    icon: Zap,
    desc: "Power Systems, Smart Grids, Control Systems, and Renewable Energy Research.",
    href: "/departments/ee",
    color: "from-[#225eaa]/10 to-[#022448]/5 border-blue-300",
  },
  {
    code: "ME",
    name: "Mechanical Engineering",
    intake: "60 Seats (B.Tech) + M.Tech",
    icon: Wrench,
    desc: "Robotics, CAD/CAM Manufacturing, Thermal Engineering, and Fluid Mechanics.",
    href: "/departments/me",
    color: "from-amber-500/10 to-orange-500/5 border-amber-200",
  },
  {
    code: "MCA",
    name: "Master of Computer Applications",
    intake: "40 Seats (Postgraduate)",
    icon: Users,
    desc: "Advanced Software Architecture, Full Stack Engineering, and Enterprise Systems.",
    href: "/departments/mca",
    color: "from-emerald-500/10 to-teal-500/5 border-emerald-200",
  },
];

export default function DepartmentsExplorer() {
  return (
    <section className="mx-auto w-full max-w-[100rem] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
      {/* Header (Matching Signature KGEC Header Style) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center px-5 mb-8 md:mb-12 z-10 text-center shrink-0"
      >
        <h1 className="relative w-fit px-4 uppercase mx-auto bg-[#225eaa]/5 border text-[#022448]/90 border-[#225eaa]/30 text-xs md:text-sm font-light leading-none py-1.5 inline-block mb-3">
          Academic Divisions
          <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2"></span>
          <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2"></span>
          <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></span>
          <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 bottom-0 right-0 translate-x-1/2 translate-y-1/2"></span>
        </h1>

        <div className="shrink-0 mt-1 text-2xl md:text-4xl lg:text-[44px] capitalize leading-tight w-[95%] md:w-[85%] lg:w-[70%] font-medium text-[#022448]">
          Explore Academic Departments.
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEPARTMENTS.map((dept, idx) => (
          <motion.div
            key={dept.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <Link
              href={dept.href}
              className={`group flex flex-col justify-between p-6 rounded-2xl bg-white border ${dept.color} shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#022448] text-white group-hover:bg-[#225eaa] transition-colors shadow-sm">
                    <dept.icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-[#022448] border border-slate-200">
                    {dept.intake}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#022448] group-hover:text-[#225eaa] transition-colors">
                  {dept.name} ({dept.code})
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2 leading-relaxed">
                  {dept.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#022448] group-hover:text-[#225eaa]">
                <span>Explore Department & Laboratories</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, ArrowRight, Award, GraduationCap, Building2 } from "lucide-react";
import Link from "next/link";

export default function PrincipalMessage() {
  return (
    <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#022448] via-[#0f3460] to-[#022448] text-white p-6 sm:p-10 md:p-12 shadow-xl border border-white/10">
        
        {/* Background decorative watermark grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#79acfd_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Principal Image & Badge Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col items-center text-center"
          >
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl mb-4 group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                alt="Principal, KGEC"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#022448]/80 via-transparent to-transparent" />
            </div>
            
            <h3 className="text-xl font-bold text-white tracking-tight">Prof. (Dr.) Sourabh Das</h3>
            <p className="text-sm text-blue-200 font-medium mt-0.5">Principal & Academic Head</p>
            <p className="text-xs text-blue-300/80 mt-1">Kalyani Government Engineering College</p>

            <div className="flex items-center gap-3 mt-4 text-xs font-semibold text-blue-100">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                <GraduationCap className="h-3.5 w-3.5 text-[#79acfd]" /> Est. 1995
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                <Building2 className="h-3.5 w-3.5 text-[#79acfd]" /> Govt. Institution
              </span>
            </div>
          </motion.div>

          {/* Quote & Leadership Message Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#79acfd] mb-2">
              <Award className="h-4 w-4" /> Leadership Vision & Welcome
            </div>

            <Quote className="h-10 w-10 text-[#79acfd]/30 mb-2" />
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
              &ldquo;Nurturing world-class engineering talent, innovation, and social leadership.&rdquo;
            </h2>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal mb-6">
              Welcome to Kalyani Government Engineering College (KGEC). Since 1995, our institution has stood at the forefront of technical education in West Bengal. Through rigorous academic discipline, state-of-the-art laboratory research, and active industry collaborations, we empower our students to solve complex technological challenges globally.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#79acfd] hover:bg-white text-[#022448] font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Read Full Message <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/departments"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl border border-white/20 transition-all duration-200"
              >
                Explore Academic Programs
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

"use client";

import { TrendingUp, FlaskConical, Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Highlights() {
  return (
    <section className="mx-auto w-full max-w-[100rem] px-4 sm:px-8 lg:px-12 py-12 md:py-16 lg:py-20 flex flex-col justify-center relative touch-pan-y">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center px-5 mb-8 md:mb-10 z-10 text-center shrink-0"
      >
        <h1 className="relative w-fit px-4 uppercase mx-auto bg-[#225eaa]/5 border text-[#022448]/90 border-[#225eaa]/30 text-xs md:text-sm font-light leading-none py-1.5 inline-block mb-3">
          Highlights
          <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2"></span>
          <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2"></span>
          <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></span>
          <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 bottom-0 right-0 translate-x-1/2 translate-y-1/2"></span>
        </h1>

        <div className="shrink-0 mt-1 text-2xl md:text-4xl lg:text-[44px] capitalize leading-tight w-[95%] md:w-[85%] lg:w-[70%] font-medium text-[#022448]">
          Where Ambition Meets Opportunity.
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 md:gap-6 w-full flex-1 min-h-0">
        
        {/* Card 1: Placements (Spans 2 cols, 2 rows) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2 lg:row-span-2 bg-[#022448] text-white rounded-[2rem] p-6 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[280px] md:min-h-[360px] shadow-xl group transition-transform hover:-translate-y-2"
        >
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
            alt="Placements" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000 ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#022448] via-[#022448]/80 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-[#d5e3ff] flex items-center justify-center mb-6">
              <TrendingUp size={24} />
            </div>
          </div>
          
          <div className="relative z-10 max-w-lg mt-auto">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3">Top Tier Placements</h3>
            <p className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-6">
              Consistent records with global tech giants and national engineering leaders visiting our campus every year.
            </p>
            
            <Link
              href="/training-and-placement"
              className="inline-flex items-center gap-2 text-[#d5e3ff] font-bold hover:gap-4 transition-all text-sm group/link"
            >
              View Placement Records <ArrowRight size={16} className="-rotate-45 group-hover/link:rotate-0 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>

        {/* Card 2: Research */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-1 bg-[#225eaa] text-white rounded-[2rem] p-6 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-lg group transition-transform hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shrink-0">
              <FlaskConical size={20} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">Innovative Research</h3>
          </div>
          
          <div className="relative z-10">
            <p className="text-white/90 text-xs md:text-sm font-light leading-relaxed mb-4">
              Specialized labs driving breakthroughs in AI, Robotics, and Sustainable Energy.
            </p>
          </div>
          
          <div className="relative z-10 flex justify-end mt-auto">
            <Link href="/research" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white border border-white/20 hover:text-[#225eaa] transition-colors flex items-center justify-center group/btn">
              <ArrowRight size={16} className="-rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>

        {/* Card 3: Entrepreneurship */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-1 bg-[#d5e3ff] text-[#022448] rounded-[2rem] p-6 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-lg group transition-transform hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#022448]/10 text-[#225eaa] flex items-center justify-center shrink-0 shadow-sm">
              <Lightbulb size={20} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">Entrepreneurship</h3>
          </div>
          
          <div className="relative z-10">
            <p className="text-[#022448]/80 text-xs md:text-sm font-medium leading-relaxed mb-4">
              Our vibrant E-Cell nurtures start-ups through incubation and mentorship.
            </p>
          </div>
          
          <div className="relative z-10 flex justify-end mt-auto">
            <Link href="/campus-life" className="w-10 h-10 rounded-full bg-white hover:bg-[#022448] text-[#225eaa] hover:text-white transition-colors flex items-center justify-center shadow-sm group/btn">
              <ArrowRight size={16} className="-rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
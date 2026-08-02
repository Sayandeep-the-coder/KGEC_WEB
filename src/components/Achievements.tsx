"use client";

import Link from "next/link";
import { Landmark, GraduationCap, ArrowRight, Award, Trophy, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Achievements() {
  return (
    <section className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-full flex flex-col justify-center overflow-hidden relative touch-pan-y">
      <div className="relative z-10 w-full min-h-[88vh] overflow-hidden rounded-2xl bg-white shadow-md border border-slate-100 flex flex-col items-center py-6 lg:py-12 px-4 lg:px-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center px-5 mb-10 md:mb-12 z-10 text-center shrink-0 w-full"
        >
          <h1 className="relative w-fit px-4 uppercase mx-auto bg-[#225eaa]/5 border text-[#022448]/90 border-[#225eaa]/30 text-xs md:text-sm font-light leading-none py-1.5 inline-block mb-3">
            Achievements
            <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2"></span>
            <span className="absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2"></span>
            <span className="corner-dot-bl absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></span>
            <span className="corner-dot-br absolute w-[3px] h-[3px] bg-[#022448]/60 z-10 bottom-0 right-0 translate-x-1/2 translate-y-1/2"></span>
          </h1>

          <div className="shrink-0 mt-1 text-2xl md:text-4xl lg:text-[44px] capitalize leading-tight w-[95%] md:w-[85%] lg:w-[70%] font-medium text-[#022448]">
            Built on Legacy, Driven by Excellence.
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          
          {/* Card 1: 90 LPA (Spans 2 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-2 flex"
          >
            <div className="w-full bg-[#022448] text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-xl group transition-transform duration-300 hover:-translate-y-2">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" 
                alt="Corporate Tech Building" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#022448] via-[#022448]/40 to-transparent"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-[#d5e3ff] flex items-center justify-center">
                  <Award size={28} />
                </div>
                <Link
                  href="/training-and-placement/statistics"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-md border border-white/10"
                >
                  <ArrowRight size={20} className="text-[#d5e3ff] -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </Link>
              </div>
              
              <div className="relative z-10 mt-12">
                <p className="text-[#d5e3ff] font-medium tracking-wide uppercase text-sm mb-2">Highest International Package</p>
                <h3 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">90 LPA</h3>
                <p className="text-white/70 text-lg">Secured at Avalanche</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: 76.2% Placement (Tall, spans 2 rows on desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 xl:row-span-2 flex"
          >
            <div className="w-full bg-[#225eaa] text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-lg group transition-transform duration-300 hover:-translate-y-2">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                alt="Graduation" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#225eaa] via-[#225eaa]/50 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center mb-8">
                  <GraduationCap size={28} />
                </div>
              </div>
              
              <div className="relative z-10 mt-auto">
                <h3 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-md">76.2%</h3>
                <p className="text-white/90 text-lg font-medium leading-tight mb-8">
                  Average Placement Rate Across All Engineering Branches
                </p>
                
                <Link
                  href="/training-and-placement"
                  className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all"
                >
                  T&P Cell Portal <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 3: ISRO (Tall, spans 2 rows on desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 xl:row-span-2 flex"
          >
            <div className="w-full bg-[#d5e3ff] text-[#022448] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-lg group transition-transform duration-300 hover:-translate-y-2">
              <img 
                src="https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80" 
                alt="Rocket Launch" 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-multiply group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#d5e3ff] via-[#d5e3ff]/60 to-transparent"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#022448]/10 text-[#225eaa] flex items-center justify-center mb-8 shadow-sm">
                  <Rocket size={28} />
                </div>
              </div>
              
              <div className="relative z-10 mt-auto">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#022448]">ISRO</h3>
                <p className="text-[#022448]/90 text-lg font-medium leading-tight mb-8">
                  Proud Alumni Scientists contributing to the historic Chandrayaan-3 Mission
                </p>
                
                <Link
                  href="/alumni"
                  className="inline-flex items-center gap-2 text-[#225eaa] font-bold hover:gap-4 transition-all"
                >
                  Alumni Diaries <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 4: 1995 Established */}
          <motion.div 
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 flex"
          >
            <div className="w-full bg-[#f9f9ff] border border-[#d9e3f7] text-[#022448] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[250px] group transition-transform duration-300 hover:-translate-y-2">
              <img 
                src="/images/gallery/independence_day.jpg" 
                alt="Campus Foundation" 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f9f9ff] via-[#f9f9ff]/80 to-transparent"></div>
              
              <div className="relative z-10 flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#eff3ff] text-[#225eaa] flex items-center justify-center border border-[#d5e3ff]">
                  <Landmark size={24} />
                </div>
                <span className="text-sm font-bold text-[#225eaa] uppercase tracking-wider">Foundation</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-4xl font-bold tracking-tight mb-2">1995</h3>
                <p className="text-[#222426]/70 font-medium">Established by Govt. of West Bengal</p>
              </div>
            </div>
          </motion.div>

          {/* Card 5: SIH 1st Prize */}
          <motion.div 
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="col-span-1 flex"
          >
            <div className="w-full bg-[#d9e3f7] text-[#022448] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[250px] group transition-transform duration-300 hover:-translate-y-2">
              <img 
                src="/images/gallery/binary_group.png" 
                alt="Hackathon Champions" 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.15] mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#d9e3f7] via-[#d9e3f7]/80 to-transparent"></div>
              
              <div className="relative z-10 flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white text-[#225eaa] flex items-center justify-center border border-white/50 shadow-sm">
                  <Trophy size={24} />
                </div>
                <span className="text-sm font-bold text-[#225eaa] uppercase tracking-wider">Champions</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold tracking-tight mb-2 drop-shadow-sm">1st Prize</h3>
                <p className="text-[#022448]/90 font-medium leading-snug">Smart India Hackathon (2019 & 2022)</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const linkColumns = [
  {
    title: "ABOUT",
    links: ["About Us", "Vision & Mission", "History", "Administration"],
  },
  {
    title: "ACADEMICS",
    links: ["Departments", "Undergraduate", "Postgraduate", "Ph.D. Programs", "Academic Calendar"],
  },
  {
    title: "ADMISSIONS",
    links: ["B.Tech Admissions", "M.Tech Admissions", "Ph.D. Admissions", "How to Apply", "Important Dates"],
  },
  {
    title: "CAMPUS LIFE",
    links: ["Hostels", "Library", "Clubs & Societies", "Sports", "Facilities"],
  },
  {
    title: "PLACEMENTS",
    links: ["Placement Overview", "Recruiters", "Training & Skills", "Internships", "Placement Reports"],
  },
];

const socials = [
  { icon: FaFacebook, label: "Facebook" },
  { icon: FaLinkedin, label: "LinkedIn" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
];

export default function Footer() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <footer ref={containerRef} className="w-full max-w-[1920px] mx-auto bg-[#0a1730] text-white font-sans px-8 md:px-12 lg:px-16 pt-16 pb-8 relative overflow-hidden rounded-t-2xl md:rounded-t-3xl border-t border-white/10">

      {/* Gradient Watermark (Animates bottom up when revealed) */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none overflow-hidden z-0 select-none pb-4">
        <motion.span 
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: "5%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[28vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/70 to-[#0a1730]"
        >
          KGEC
        </motion.span>
      </div>

      <div className="relative z-10 flex flex-col justify-between max-w-[100rem] mx-auto">

        {/* Top: Brand + Nav Grid */}
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 justify-between">

          {/* Brand Identity */}
          <div className="max-w-sm shrink-0">
            <div className="relative h-20 w-20 mb-6">
              <Image src="/logo.png" alt="KGEC Logo" fill className="object-contain" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-2">
              Kalyani Government<br />Engineering College
            </h2>
            <p className="text-blue-300 font-medium text-sm mb-1">(Under MAKAUT, West Bengal)</p>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-8">Established 1995</p>

            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-full xl:w-auto">
            {linkColumns.map((col) => (
              <nav key={col.title} className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold tracking-widest text-white/40 uppercase">{col.title}</h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm font-medium text-white/70 hover:text-blue-400 hover:translate-x-1 transition-all inline-block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/30">
          <p>© {new Date().getFullYear()} Kalyani Government Engineering College. All Rights Reserved.</p>
          <div className="flex gap-5 items-center">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="w-px h-3 bg-white/20" />
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <span className="w-px h-3 bg-white/20" />
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
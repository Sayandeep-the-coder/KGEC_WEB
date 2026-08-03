"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const linkColumns = [
  {
    title: "ABOUT",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Vision & Mission", href: "/about" },
      { label: "Principal's Desk", href: "/administration/principal" },
      { label: "Student Strength", href: "/student-strength" },
    ],
  },
  {
    title: "ACADEMICS",
    links: [
      { label: "Departments", href: "/departments" },
      { label: "Academic Downloads", href: "/downloads?category=general" },
      { label: "Mandatory Disclosure", href: "/downloads?category=mandatory-disclosure" },
      { label: "Academic Notices", href: "/notices" },
    ],
  },
  {
    title: "ADMISSIONS",
    links: [
      { label: "UG B.Tech Admissions", href: "/admission/ug-btech" },
      { label: "PG M.Tech Admissions", href: "/admission/pg-mtech" },
      { label: "PG MCA Admissions", href: "/admission/pg-mca" },
      { label: "Admissions Notices", href: "/notices" },
    ],
  },
  {
    title: "CAMPUS LIFE",
    links: [
      { label: "Cells, Clubs & Events", href: "/campus-life" },
      { label: "Campus Gallery", href: "/gallery" },
      { label: "E-Cell", href: "/iic/e-cell" },
      { label: "IIC", href: "/iic" },
    ],
  },
  {
    title: "PLACEMENTS",
    links: [
      { label: "T&P Cell Portal", href: "/training-and-placement" },
      { label: "Placement Statistics", href: "/training-and-placement/statistics" },
      { label: "Alumni Diaries", href: "/alumni" },
      { label: "Placement Notices", href: "/training-and-placement/notices" },
    ],
  },
];

const socials = [
  { icon: FaFacebook, label: "Facebook", href: "#" },
  { icon: FaLinkedin, label: "LinkedIn", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
];

export default function Footer() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <footer
      ref={containerRef}
      className="w-full max-w-[1920px] mx-auto bg-[#0a1730] text-white font-sans px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-6 md:pb-8 relative overflow-hidden rounded-t-2xl md:rounded-t-3xl border-t border-white/10"
    >
      {/* Edge-to-Edge Akira Expanded Watermark */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none overflow-hidden z-0 select-none pb-0">
        <motion.span
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: "10%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-akira text-[25vw] font-black tracking-tight leading-none text-transparent bg-clip-text bg-linear-to-b from-white/15 via-white/5 to-transparent select-none whitespace-nowrap block text-center w-full"
        >
          KGEC
        </motion.span>
      </div>

      <div className="relative z-10 flex flex-col justify-between max-w-[100rem] mx-auto">
        {/* Top: Brand + Nav Grid */}
        <div className="flex flex-col xl:flex-row gap-12 md:gap-16 xl:gap-24 justify-between">
          {/* Brand Identity */}
          <div className="flex flex-col items-center xl:items-start text-center xl:text-left max-w-sm shrink-0 mx-auto xl:mx-0">
            <div className="relative h-16 w-16 md:h-20 md:w-20 mb-4 md:mb-6">
              <Image src="/logo.png" alt="KGEC Logo" fill sizes="(max-width: 768px) 64px, 80px" className="object-contain" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold leading-tight mb-2">
              Kalyani Government
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Engineering College
            </h2>
            <p className="text-blue-300 font-medium text-[10px] md:text-sm mb-1">(Affiliated to MAKAUT, AICTE Approved)</p>
            <p className="text-white/40 text-[9px] md:text-xs font-bold tracking-widest uppercase mb-6 md:mb-8">Established 1995</p>

            <div className="flex gap-3 justify-center xl:justify-start">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6 md:gap-10 w-full xl:w-auto">
            {linkColumns.map((col, idx) => (
              <nav key={col.title} className={`flex flex-col gap-3 md:gap-4 ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                <h3 className="text-[10px] md:text-[11px] font-bold tracking-widest text-white/40 uppercase">{col.title}</h3>
                <ul className="flex flex-col gap-2.5 md:gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs md:text-sm font-medium text-white/70 hover:text-blue-400 hover:translate-x-1 transition-transform inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-medium text-white/30 text-center md:text-left">
          <p className="order-2 md:order-1">© {new Date().getFullYear()} Kalyani Government Engineering College. Placement Cell & Institute Administration.</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-5 items-center order-1 md:order-2">
            <Link href="/contact" className="hover:text-white transition-colors">
              How to Reach Us
            </Link>
            <span className="w-px h-3 bg-white/20" />
            <Link href="/training-and-placement" className="hover:text-white transition-colors">
              T&P Cell
            </Link>
            <span className="w-px h-3 bg-white/20" />
            <Link href="/alumni" className="hover:text-white transition-colors">
              Alumni
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
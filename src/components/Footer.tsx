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
      className="w-full max-w-[1920px] mx-auto bg-[#0a1730] text-white font-sans px-8 md:px-12 lg:px-16 pt-16 pb-8 relative overflow-hidden rounded-t-2xl md:rounded-t-3xl border-t border-white/10"
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
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 justify-between">
          {/* Brand Identity */}
          <div className="max-w-sm shrink-0">
            <div className="relative h-20 w-20 mb-6">
              <Image src="/logo.png" alt="KGEC Logo" fill sizes="80px" className="object-contain" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-2">
              Kalyani Government
              <br />
              Engineering College
            </h2>
            <p className="text-blue-300 font-medium text-sm mb-1">(Affiliated to MAKAUT, AICTE Approved)</p>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-8">Established 1995</p>

            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
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
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-white/70 hover:text-blue-400 hover:translate-x-1 transition-all inline-block"
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
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/30">
          <p>© {new Date().getFullYear()} Kalyani Government Engineering College. Placement Cell & Institute Administration.</p>
          <div className="flex gap-5 items-center">
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
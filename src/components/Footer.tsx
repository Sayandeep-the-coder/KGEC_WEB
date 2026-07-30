import React from "react";
import { ArrowUpRight } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function CollegeSeal() {
  return (
    <svg
      className="w-16 h-16 text-white shrink-0"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" />

      {/* Decorative seal pattern */}
      <path
        d="M50 18 L53 23 L59 21 L57 27 L63 29 L58 33 L62 38 L56 39 L57 45 L51 43 L49 49 L47 43 L41 45 L42 39 L36 38 L40 33 L35 29 L41 27 L39 21 L45 23 Z"
        fill="currentColor"
        opacity="0.2"
      />

      {/* Center Shield Emblem */}
      <path
        d="M50 25 L68 34 V52 C68 64 60 74 50 78 C40 74 32 64 32 52 V34 L50 25 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      <path d="M50 32 V70 M36 48 H64" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="48" r="5" fill="currentColor" />
      <path d="M42 40 L58 56 M58 40 L42 56" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const footerNavs = [
  {
    title: "ABOUT",
    links: [
      { label: "About Us", href: "#" },
      { label: "Vision & Mission", href: "#" },
      { label: "History", href: "#" },
      { label: "Administration", href: "#" },
    ],
  },
  {
    title: "ACADEMICS",
    links: [
      { label: "Departments", href: "#" },
      { label: "Undergraduate", href: "#" },
      { label: "Postgraduate", href: "#" },
      { label: "Ph.D. Programs", href: "#" },
      { label: "Academic Calendar", href: "#" },
    ],
  },
  {
    title: "ADMISSIONS",
    links: [
      { label: "B.Tech Admissions", href: "#" },
      { label: "M.Tech Admissions", href: "#" },
      { label: "Ph.D. Admissions", href: "#" },
      { label: "How to Apply", href: "#" },
      { label: "Important Dates", href: "#" },
    ],
  },
  {
    title: "CAMPUS LIFE",
    links: [
      { label: "Hostels", href: "#" },
      { label: "Library", href: "#" },
      { label: "Clubs & Societies", href: "#" },
      { label: "Sports", href: "#" },
      { label: "Facilities", href: "#" },
    ],
  },
  {
    title: "PLACEMENTS",
    links: [
      { label: "Placement Overview", href: "#" },
      { label: "Recruiters", href: "#" },
      { label: "Training & Skills", href: "#" },
      { label: "Internships", href: "#" },
      { label: "Placement Reports", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full pt-10 pb-6 px-4 sm:px-6 relative z-10">
      {/* Floating Send Message CTA */}
      <div className="flex justify-center -mb-6 relative z-20">
        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/50 flex items-center justify-center">
          <a
            href="#"
            className="bg-kgec-footer-cta hover:bg-kgec-navy text-white font-semibold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md group"
          >
            <span>Send Message</span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      {/* Main Footer Card Shell */}
      <div className="bg-kgec-footer text-white rounded-3xl p-8 md:p-12 lg:p-14 relative overflow-hidden shadow-2xl border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 relative z-10">
          {/* Left College Branding Section */}
          <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-8 lg:border-r lg:border-white/10">
            <div>
              <div className="flex items-start gap-4 mb-6">
                <CollegeSeal />
                <div>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase leading-tight font-serif">
                    KALYANI GOVERNMENT <br />
                    ENGINEERING COLLEGE
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    (Under the MAKAUT)
                  </p>
                  <p className="text-xs font-bold text-amber-500 tracking-wider mt-1">
                    ESTD. 1995
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <span className="block text-[11px] font-semibold tracking-widest text-slate-400 uppercase mb-4">
                CONNECT WITH US
              </span>
              <div className="flex items-center gap-5 text-slate-300">
                <a
                  href="#"
                  className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                  aria-label="YouTube"
                >
                  <YoutubeIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Right 5 Navigation Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 lg:gap-4 pl-0 lg:pl-4">
            {footerNavs.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-2">
                  {col.title}
                </h4>
                <div className="h-0.5 w-5 bg-amber-500 mb-4" />
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors text-xs font-medium"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Large Watermark Wordmark */}
        <div className="relative my-4 overflow-hidden pointer-events-none select-none">
          <h2 className="text-[120px] sm:text-[180px] md:text-[240px] font-black leading-none text-white/24 tracking-tighter text-center">
            KGEC
          </h2>
          <div className="absolute inset-0 bg-linear-to-t from-kgec-footer via-transparent to-transparent h-full" />
        </div>

        {/* Sub-Footer Row */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 relative z-10">
          <p>
            © 2025 Kalyani Government Engineering College. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-slate-600">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <span className="text-slate-600">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Accessibility Statement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

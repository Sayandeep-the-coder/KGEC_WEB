import React from "react";
import {
  BookOpen,
  Briefcase,
  Users,
  Lock,
  ChevronDown,
} from "lucide-react";

const utilityLinks = [
  { label: "Library", icon: BookOpen },
  { label: "Jobs", icon: Briefcase },
  { label: "Alumni", icon: Users },
];

const navItems = [
  { label: "About", hasDropdown: true },
  { label: "Academics", hasDropdown: true },
  { label: "Admissions", hasDropdown: true },
  { label: "Departments", hasDropdown: true },
  { label: "Campus Life", hasDropdown: true },
  { label: "Placements", hasDropdown: false },
  { label: "Research", hasDropdown: true },
  { label: "IQAC", hasDropdown: true },
  { label: "Contact", hasDropdown: false },
];

function CollegeSeal() {
  return (
    <svg
      className="w-16 h-16 text-kgec-navy shrink-0"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" />
      
      {/* Decorative seal pattern */}
      <path
        d="M50 18 L53 23 L59 21 L57 27 L63 29 L58 33 L62 38 L56 39 L57 45 L51 43 L49 49 L47 43 L41 45 L42 39 L36 38 L40 33 L35 29 L41 27 L39 21 L45 23 Z"
        fill="currentColor"
        opacity="0.15"
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

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-6">
        {/* Left Branding Block */}
        <div className="flex items-center gap-4 shrink-0">
          <CollegeSeal />
          <div className="flex flex-col">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-kgec-navy uppercase leading-tight font-serif">
              KALYANI GOVERNMENT <br />
              ENGINEERING COLLEGE
            </h1>
            <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-0.5">
              ESTD. 1995
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block h-14 w-px bg-gray-200 shrink-0" />

        {/* Right Stacked Navigation Block */}
        <div className="flex-1 flex flex-col justify-between py-0.5">
          {/* Top Utility Links Bar */}
          <div className="flex items-center justify-between gap-6 text-xs text-slate-700 mb-2">
            <div className="flex items-center gap-6 flex-wrap">
              {utilityLinks.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  className="flex items-center gap-2 font-medium text-slate-700 hover:text-kgec-navy transition-colors"
                >
                  <Icon size={16} className="text-slate-600" />
                  <span>{label}</span>
                </a>
              ))}

              <a
                href="#"
                className="flex items-center gap-1.5 font-medium text-slate-700 hover:text-kgec-navy transition-colors"
              >
                <Users size={16} className="text-slate-600" />
                <span>Staff</span>
                <Lock size={12} className="text-slate-500 ml-0.5" />
              </a>
            </div>

            <button className="rounded-full border border-gray-300 px-4 py-1 text-xs font-medium text-slate-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
              <span>Current Student</span>
              <ChevronDown size={14} className="text-slate-500" />
            </button>
          </div>

          {/* Horizontal Separator */}
          <div className="w-full h-px bg-gray-200/80 mb-2" />

          {/* Bottom Main Navigation Menu */}
          <nav className="hidden lg:flex items-center justify-between gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="group flex items-center gap-1 text-[14px] font-semibold text-kgec-navy hover:text-blue-700 transition-colors"
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    size={14}
                    className="text-slate-500 group-hover:text-blue-700 transition-transform group-hover:rotate-180"
                  />
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

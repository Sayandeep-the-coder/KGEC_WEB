import React from "react";
import {
  BookOpen,
  Briefcase,
  Users,
  Lock,
  ChevronDown,
  Search,
  ArrowUpRight,
} from "lucide-react";

const COLLEGE_NAME_LINE_1 = "KALYANI GOVERNMENT";
const COLLEGE_NAME_LINE_2 = "ENGINEERING COLLEGE";
const ESTABLISHED_YEAR = "ESTD. 1961";

const UTILITY_LINKS = [
  { label: "Library", icon: BookOpen, href: "#" },
  { label: "Jobs", icon: Briefcase, href: "#" },
  { label: "Alumni", icon: Users, href: "#" },
  { label: "Staff", icon: Users, lockIcon: Lock, href: "#" },
];

const MAIN_NAV_LINKS = [
  { label: "About", href: "#", hasDropdown: true },
  { label: "Academics", href: "#", hasDropdown: true },
  { label: "Admissions", href: "#", hasDropdown: true },
  { label: "Departments", href: "#", hasDropdown: true },
  { label: "Campus Life", href: "#", hasDropdown: true },
  { label: "Placements", href: "#", hasDropdown: false },
  { label: "Research", href: "#", hasDropdown: true },
  { label: "IQAC", href: "#", hasDropdown: true },
  { label: "Contact", href: "#", hasDropdown: false },
];

export default function Header() {
  return (
    <header className="w-full bg-white relative z-50">
      <div className="mx-auto max-w-[100rem] px-4 py-2 sm:px-6 lg:px-8 flex items-stretch justify-between gap-8">
        
        {/* Left Branding Block */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <img 
            src="/dark-logo.png" 
            alt="KGEC Logo" 
            className="h-14 w-auto object-contain shrink-0" 
          />
          <div>
            <h1 className="text-sm sm:text-[16px] font-bold uppercase leading-tight tracking-wide text-[#0a1730] font-serif">
              {COLLEGE_NAME_LINE_1}
              <br />
              {COLLEGE_NAME_LINE_2}
            </h1>
            <p className="mt-0.5 text-[10px] font-bold tracking-wider text-slate-500">
              {ESTABLISHED_YEAR}
            </p>
          </div>
        </a>

        {/* Vertical Divider */}
        <div className="hidden xl:block w-px bg-slate-200 shrink-0" />

        {/* Right Stacked Navigation Block */}
        <div className="hidden xl:flex flex-col justify-between flex-1">
          
          {/* Top Utility Row */}
          <div className="flex items-center justify-between pb-2">
            
            {/* Left side utility links */}
            <div className="flex items-center gap-6">
              {UTILITY_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 text-[13px] font-semibold text-[#0a1730] hover:text-blue-700 transition-colors"
                >
                  <link.icon className="h-[16px] w-[16px] text-slate-600" strokeWidth={1.5} />
                  {link.label}
                  {link.lockIcon && <link.lockIcon className="h-[13px] w-[13px] text-slate-500 -ml-1" strokeWidth={2} />}
                </a>
              ))}
            </div>

            {/* Right side utility actions */}
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-1.5 text-[13px] font-semibold text-[#0a1730] hover:bg-slate-50 transition-colors"
              >
                Current Student
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" strokeWidth={2.5} />
              </a>

              <div className="flex items-center justify-between gap-2 rounded-full border border-slate-200 px-4 py-1.5 w-60 bg-slate-50/50">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full bg-transparent text-[13px] text-[#0a1730] placeholder:text-slate-400 focus:outline-none"
                />
                <Search className="h-4 w-4 shrink-0 text-slate-500" strokeWidth={2} />
              </div>

              <a
                href="#"
                className="flex items-center gap-2 rounded-full bg-[#0a1730] px-6 py-2 text-[13px] font-bold text-white transition-colors hover:bg-[#12274d]"
              >
                Login
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </a>
            </div>
            
          </div>

          {/* Horizontal Divider */}
          <div className="w-full h-px bg-slate-200" />

          {/* Bottom Main Navigation Menu */}
          <nav className="flex items-center justify-between pt-2">
            {MAIN_NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-1.5 text-[15px] font-bold text-[#0a1730] hover:text-blue-700 transition-colors"
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown
                    className="h-4 w-4 text-slate-400 group-hover:text-blue-700 transition-transform group-hover:rotate-180"
                    strokeWidth={2.5}
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

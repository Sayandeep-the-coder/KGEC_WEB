"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  BookOpen,
  Briefcase,
  Users,
  Lock,
  ChevronDown,
  Search,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

const COLLEGE_NAME_LINE_1 = "KALYANI GOVERNMENT";
const COLLEGE_NAME_LINE_2 = "ENGINEERING COLLEGE";
const ESTABLISHED_YEAR = "ESTD. 1995";

type HeaderRoute = {
  label: string;
  href: string;
};

type HeaderNavItem = HeaderRoute & {
  children?: HeaderRoute[];
};

const UTILITY_LINKS = [
  { label: "Library", icon: BookOpen, href: "/downloads?category=general" },
  { label: "Placements", icon: Briefcase, href: "/training-and-placement" },
  { label: "Alumni", icon: Users, href: "/alumni" },
  { label: "Staff", icon: Users, lockIcon: Lock, href: "/administration/hods" },
];



const MAIN_NAV_LINKS: HeaderNavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Institute Profile", href: "/about" },
      { label: "Green Campus", href: "/about/green-campus" },
      { label: "Principal's Desk", href: "/administration/principal" },
      { label: "Student Demographics", href: "/student-strength" },
    ],
  },
  {
    label: "Organization",
    href: "/administration/registrar",
    children: [
      { label: "Administration & Leadership", href: "/administration/registrar" },
      { label: "Heads of Departments", href: "/administration/hods" },
      { label: "Governance & Authorities", href: "/about" },
    ],
  },
  {
    label: "Academics",
    href: "/departments",
    children: [
      { label: "Departments Overview", href: "/departments" },
      { label: "B.Tech, M.Tech & MCA Degrees", href: "/departments" },
      { label: "Academic Downloads", href: "/downloads?category=general" },
      { label: "Academic Notices", href: "/notices" },
    ],
  },
  {
    label: "Admissions",
    href: "/admission/ug-btech",
    children: [
      { label: "UG B.Tech (WBJEE / JELET)", href: "/admission/ug-btech" },
      { label: "PG M.Tech (GATE / PGET)", href: "/admission/pg-mtech" },
      { label: "PG MCA (WBJECA)", href: "/admission/pg-mca" },
      { label: "Admission Notices", href: "/notices" },
    ],
  },
  {
    label: "Research & Industry",
    href: "/research",
    children: [
      { label: "Research Overview", href: "/research" },
      { label: "Institute Innovation Council (IIC)", href: "/iic/institute-innovation-council" },
      { label: "Entrepreneurship Cell (E-Cell)", href: "/iic/e-cell" },
      { label: "Industry Interaction Cell (IIPC)", href: "/iic/iipc" },
      { label: "Startup Policy", href: "/iic/national-startup-policy" },
      { label: "Research Downloads", href: "/downloads?category=iic" },
    ],
  },
  {
    label: "Career",
    href: "/training-and-placement",
    children: [
      { label: "Training & Placement Cell", href: "/training-and-placement" },
      { label: "Placement Statistics", href: "/training-and-placement/statistics" },
      { label: "Recruiter Procedure", href: "/training-and-placement#procedure" },
      { label: "T&P Coordinators Directory", href: "/training-and-placement#contact-tpo" },
    ],
  },
  {
    label: "Resources",
    href: "/downloads?category=general",
    children: [
      { label: "Library & E-Resources", href: "/downloads?category=general" },
      { label: "Academic Downloads", href: "/downloads" },
      { label: "Mandatory Disclosure", href: "/downloads?category=mandatory-disclosure" },
      { label: "IQAC & NAAC", href: "/iqac" },
      { label: "RTI Information", href: "/rti" },
    ],
  },
  {
    label: "NIRF",
    href: "/nirf",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

function HeaderDropdown({
  align = "left",
  links,
}: {
  align?: "left" | "right";
  links: HeaderRoute[];
}) {
  return (
    <div
      className={`invisible absolute top-full z-50 mt-2 min-w-64 translate-y-1 rounded-2xl border border-white/15 bg-[#022448]/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
        align === "right" ? "right-0" : "left-0"
      }`}
    >
      <div className="absolute -top-3 h-3 w-full" />
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-[#79acfd]/50 to-transparent" />
      {links.map((link) => (
        <Link
          key={`${link.label}-${link.href}`}
          href={link.href}
          className="group/link flex items-center justify-between gap-4 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-[#79acfd] focus:outline-none"
        >
          <span>{link.label}</span>
          <ArrowUpRight className="size-3.5 opacity-0 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-90 text-[#79acfd]" />
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const { data: session } = useSession();

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileGroup(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm xl:shadow-none">
      {/* Top Urgent Announcement Ticker Bar */}
      <div className="bg-[#022448] text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#225eaa] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Notice Ticker
            </span>
            <div className="truncate text-[12px] font-medium text-slate-200">
              <span className="font-semibold text-white">WBJEE 2026 Cutoffs Released</span> &bull; Campus Recruitment Drive 2026 Phase-1 Scheduled &bull; NPTEL / SWAYAM Course Registration Open
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0 text-[11px] font-medium text-slate-300">
            <Link href="/notices" className="hover:text-white transition underline underline-offset-2">
              View All Circulars &rarr;
            </Link>
            <span className="text-slate-500">|</span>
            <span>Helpline: +91 (033) 2582-1309</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8 xl:items-stretch xl:gap-8">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
          <Image
            src="/dark-logo.png"
            alt="KGEC Logo"
            width={64}
            height={64}
            className="h-10 w-auto shrink-0 object-contain sm:h-12 md:h-14"
          />
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-[10px] leading-[1.2] sm:text-[12px] md:text-[15px] lg:text-[16px] font-bold uppercase tracking-wide text-[#0a1730]">
              {COLLEGE_NAME_LINE_1}
              <br />
              {COLLEGE_NAME_LINE_2}
            </h1>
            <p className="mt-0.5 text-[7px] sm:text-[9px] md:text-[10px] font-bold tracking-wider text-slate-500">
              {ESTABLISHED_YEAR}
            </p>
          </div>
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-header-menu"
          onClick={() => {
            setIsMenuOpen((current) => !current);
            setOpenMobileGroup(null);
          }}
          className="inline-flex w-11 h-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0a1730] shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1730] xl:hidden"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={2.5} />
          )}
        </button>

        <div className="hidden w-px shrink-0 bg-slate-200 xl:block" />

        <div className="hidden flex-1 flex-col justify-between xl:flex">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-6">
              {UTILITY_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 text-[13px] font-semibold text-[#0a1730] transition-colors hover:text-blue-700"
                >
                  <link.icon
                    className="h-4 w-4 text-slate-600"
                    strokeWidth={1.5}
                  />
                  {link.label}
                  {link.lockIcon && (
                    <link.lockIcon
                      className="-ml-1 h-3 w-3 text-slate-500"
                      strokeWidth={2}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-full px-3 py-1 bg-slate-50">
                <span className="text-blue-900 font-bold">NAAC</span>
                <span className="text-slate-300">|</span>
                <span className="text-blue-900 font-bold">NIRF</span>
                <span className="text-slate-300">|</span>
                <span>AICTE Approved</span>
              </div>

              <Link
                href={session ? "/admin" : "/admin/login"}
                prefetch={false}
                className="flex items-center gap-2 rounded-full bg-[#0a1730] px-6 py-2 text-[13px] font-bold text-white transition-colors hover:bg-[#12274d]"
              >
                {session ? "Dashboard" : "Login"}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          <div className="h-px w-full bg-slate-200" />

          <nav className="flex items-center justify-between mt-1.5 bg-[#022448] text-white py-2.5 px-6 rounded-lg shadow-sm border border-white/10">
            {MAIN_NAV_LINKS.map((item, index) => {
              const hasChildren = Boolean(item.children?.length);

              return (
                <div key={item.label} className="group relative">
                  {hasChildren ? (
                    <button
                      type="button"
                      className="flex items-center gap-1 text-[14px] font-semibold text-white transition-colors hover:text-[#79acfd] cursor-pointer"
                    >
                      {item.label}
                      <ChevronDown
                        className="h-3.5 w-3.5 text-blue-200/70 transition-transform group-hover:rotate-180 group-hover:text-[#79acfd]"
                        strokeWidth={2}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 text-[14px] font-semibold text-white transition-colors hover:text-[#79acfd]"
                    >
                      {item.label}
                    </Link>
                  )}
                  {hasChildren && (
                    <HeaderDropdown
                      align={index > MAIN_NAV_LINKS.length - 3 ? "right" : "left"}
                      links={item.children ?? []}
                    />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      <div
        id="mobile-header-menu"
        className={`absolute inset-x-0 top-full border-t border-slate-200 bg-white px-4 shadow-xl transition-[max-height,opacity] duration-300 ease-out xl:hidden ${
          isMenuOpen
            ? "max-h-[calc(100vh-4rem)] overflow-y-auto py-4 opacity-100"
            : "max-h-0 overflow-hidden py-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-[100rem] flex-col gap-4">
          <div className="grid grid-cols-1 gap-2">
            <Link
              href={session ? "/admin" : "/admin/login"}
              prefetch={false}
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#0a1730] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#12274d]"
            >
              {session ? "Dashboard" : "Login"}
              <ArrowUpRight className="size-4" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {UTILITY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-3 py-3 text-sm font-semibold text-[#0a1730] transition hover:bg-slate-50"
              >
                <link.icon className="size-4 text-slate-600" strokeWidth={1.8} />
                {link.label}
                {link.lockIcon && (
                  <link.lockIcon className="size-3 text-slate-500" strokeWidth={2} />
                )}
              </Link>
            ))}
          </div>

          <nav className="grid gap-2 border-t border-slate-200 pt-4">
            {MAIN_NAV_LINKS.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openMobileGroup === item.label;

              return (
                <div key={item.label} className="rounded-2xl border border-slate-200">
                  {hasChildren ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`mobile-nav-${item.label}`}
                      onClick={() =>
                        setOpenMobileGroup((current) =>
                          current === item.label ? null : item.label
                        )
                      }
                      className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base font-bold text-[#0a1730] transition hover:bg-slate-50"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`size-4 text-slate-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={2.5}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-bold text-[#0a1730] transition hover:bg-slate-50"
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                  {hasChildren && (
                    <div
                      id={`mobile-nav-${item.label}`}
                      className={`grid gap-1 overflow-y-auto border-t border-slate-200 transition-[max-height,padding,opacity] duration-200 ${
                        isOpen ? "max-h-128 p-2 opacity-100" : "max-h-0 p-0 opacity-0"
                      }`}
                    >
                      {item.children?.map((link) => (
                        <Link
                          key={`${link.label}-${link.href}`}
                          href={link.href}
                          onClick={closeMobileMenu}
                          className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

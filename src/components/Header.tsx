"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

const CURRENT_STUDENT_LINKS: HeaderRoute[] = [
  { label: "Notices", href: "/notices" },
  { label: "Downloads", href: "/downloads" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Office", href: "/contact" },
];

const CURRENT_STUDENT_GROUP = "current-student";

const MAIN_NAV_LINKS: HeaderNavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Institute Profile", href: "/about" },
      { label: "Green Campus", href: "/about/green-campus" },
      { label: "Principal's Desk", href: "/administration/principal" },
      { label: "Student Demographics", href: "/student-strength" },
      { label: "Administration", href: "/administration/registrar" },
    ],
  },
  {
    label: "Academics",
    href: "/departments",
    children: [
      { label: "Departments Overview", href: "/departments" },
      { label: "Academic Downloads", href: "/downloads?category=general" },
      { label: "Mandatory Disclosure", href: "/downloads?category=mandatory-disclosure" },
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
    label: "Departments",
    href: "/departments",
    children: [
      { label: "CSE", href: "/departments/cse" },
      { label: "EE", href: "/departments/ee" },
      { label: "ECE", href: "/departments/ece" },
      { label: "IT", href: "/departments/it" },
      { label: "ME", href: "/departments/me" },
      { label: "CA", href: "/departments/ca" },
      { label: "Physics", href: "/departments/physics" },
      { label: "Chemistry", href: "/departments/chemistry" },
      { label: "Mathematics", href: "/departments/mathematics" },
      { label: "Humanities", href: "/departments/humanities" },
    ],
  },
  {
    label: "Campus Life",
    href: "/campus-life",
    children: [
      { label: "Cells, Clubs & Events", href: "/campus-life" },
      { label: "Campus Gallery", href: "/gallery" },
      { label: "IIC", href: "/iic" },
      { label: "E-Cell", href: "/iic/e-cell" },
      { label: "IIPC", href: "/iic/iipc" },
      { label: "Startup Policy", href: "/iic/national-startup-policy" },
    ],
  },
  {
    label: "Placements",
    href: "/training-and-placement",
    children: [
      { label: "T&P Cell Portal", href: "/training-and-placement" },
      { label: "Placement Statistics", href: "/training-and-placement/statistics" },
      { label: "Recruiter Procedure", href: "/training-and-placement#procedure" },
      { label: "Coordinators Directory", href: "/training-and-placement#contact-tpo" },
      { label: "Placement Notices", href: "/training-and-placement/notices" },
    ],
  },
  {
    label: "Alumni",
    href: "/alumni",
    children: [
      { label: "Alumni Diaries", href: "/alumni" },
      { label: "ISRO Lunar Mission Alumni", href: "/alumni" },
      { label: "Connect with Alumni Cell", href: "/contact" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Research", href: "/research" },
      { label: "Institute Innovation Council", href: "/iic/institute-innovation-council" },
      { label: "IIC Downloads", href: "/downloads?category=iic" },
    ],
  },
  {
    label: "IQAC",
    href: "/iqac",
    children: [
      { label: "IQAC", href: "/iqac" },
      { label: "NAAC", href: "/naac" },
      { label: "RTI", href: "/rti" },
      { label: "NIRF", href: "/nirf" },
      { label: "Reports & Minutes", href: "/downloads?category=iqac" },
    ],
  },
  { label: "Contact", href: "/contact" },
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
      className={`invisible absolute top-full z-50 mt-3 min-w-64 translate-y-1 rounded-2xl border border-white/60 bg-white/50 p-2.5 opacity-0 shadow-2xl shadow-slate-950/15 backdrop-blur-xl backdrop-saturate-150 transition duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
        align === "right" ? "right-0" : "left-0"
      }`}
    >
      <div className="absolute -top-3 h-3 w-full" />
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />
      {links.map((link) => (
        <Link
          key={`${link.label}-${link.href}`}
          href={link.href}
          className="group/link flex items-center justify-between gap-4 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0a1730] transition hover:bg-white/80 hover:text-blue-700 hover:shadow-sm focus:outline-none focus-visible:bg-white/90"
        >
          <span>{link.label}</span>
          <ArrowUpRight className="size-3.5 opacity-0 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-70" />
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileGroup(null);
  };

  return (
    <header className="relative z-50 w-full bg-white shadow-sm xl:shadow-none">
      <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8 xl:items-stretch xl:gap-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <Image
            src="/dark-logo.png"
            alt="KGEC Logo"
            width={64}
            height={64}
            className="h-12 w-auto shrink-0 object-contain sm:h-14"
          />
          <div className="min-w-0">
            <h1 className="font-serif text-[11px] sm:text-[13px] md:text-[16px] font-bold uppercase leading-tight tracking-wide text-[#0a1730]">
              {COLLEGE_NAME_LINE_1}
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              {COLLEGE_NAME_LINE_2}
            </h1>
            <p className="mt-0.5 text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-wider text-slate-500">
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
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0a1730] shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1730] xl:hidden"
        >
          {isMenuOpen ? (
            <X className="size-5" strokeWidth={2.5} />
          ) : (
            <Menu className="size-5" strokeWidth={2.5} />
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

            <div className="flex items-center gap-5">
              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-1.5 text-[13px] font-semibold text-[#0a1730] transition-colors hover:bg-slate-50"
                >
                  Current Student
                  <ChevronDown
                    className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:rotate-180"
                    strokeWidth={2.5}
                  />
                </button>
                <HeaderDropdown align="right" links={CURRENT_STUDENT_LINKS} />
              </div>

              <div className="flex w-60 items-center justify-between gap-2 rounded-full border border-slate-200 bg-slate-50/50 px-4 py-1.5">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full bg-transparent text-[13px] text-[#0a1730] placeholder:text-slate-400 focus:outline-none"
                />
                <Search
                  className="h-4 w-4 shrink-0 text-slate-500"
                  strokeWidth={2}
                />
              </div>

              <Link
                href="/admin/login"
                prefetch={false}
                className="flex items-center gap-2 rounded-full bg-[#0a1730] px-6 py-2 text-[13px] font-bold text-white transition-colors hover:bg-[#12274d]"
              >
                Login
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          <div className="h-px w-full bg-slate-200" />

          <nav className="flex items-center justify-between pt-2">
            {MAIN_NAV_LINKS.map((item, index) => {
              const hasChildren = Boolean(item.children?.length);

              return (
                <div key={item.label} className="group relative">
                  {hasChildren ? (
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-[15px] font-bold text-[#0a1730] transition-colors hover:text-blue-700"
                    >
                      {item.label}
                      <ChevronDown
                        className="h-4 w-4 text-slate-400 transition-transform group-hover:rotate-180 group-hover:text-blue-700"
                        strokeWidth={2.5}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 text-[15px] font-bold text-[#0a1730] transition-colors hover:text-blue-700"
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
        className={`border-t border-slate-200 bg-white px-4 shadow-xl transition-[max-height,opacity] duration-300 ease-out xl:hidden ${
          isMenuOpen
            ? "max-h-[calc(100vh-4rem)] overflow-y-auto py-4 opacity-100"
            : "max-h-0 overflow-hidden py-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-[100rem] flex-col gap-4">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search className="size-4 shrink-0 text-slate-500" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-transparent text-sm text-[#0a1730] placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-expanded={openMobileGroup === CURRENT_STUDENT_GROUP}
              aria-controls="mobile-nav-current-student"
              onClick={() =>
                setOpenMobileGroup((current) =>
                  current === CURRENT_STUDENT_GROUP ? null : CURRENT_STUDENT_GROUP
                )
              }
              className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#0a1730] transition hover:bg-slate-50"
            >
              Current Student
              <ChevronDown
                className={`size-4 text-slate-500 transition-transform ${
                  openMobileGroup === CURRENT_STUDENT_GROUP ? "rotate-180" : ""
                }`}
                strokeWidth={2.5}
              />
            </button>
            <Link
              href="/admin/login"
              prefetch={false}
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#0a1730] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#12274d]"
            >
              Login
              <ArrowUpRight className="size-4" strokeWidth={2.5} />
            </Link>
          </div>

          <div
            id="mobile-nav-current-student"
            className={`grid grid-cols-2 gap-2 overflow-hidden transition-[max-height,opacity] duration-200 ${
              openMobileGroup === CURRENT_STUDENT_GROUP
                ? "max-h-48 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {CURRENT_STUDENT_LINKS.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-2xl bg-slate-50 px-3 py-2.5 text-center text-xs font-semibold text-[#0a1730] transition hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
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

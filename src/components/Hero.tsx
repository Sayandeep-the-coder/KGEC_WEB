"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Mail, BookOpen, Briefcase, FileText, ShieldAlert, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const heroImages = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-br2mKIgd6KFtkSnbNptaupUKVk3rBsg84VOu7szGt4rTa6uDbRH5DCoSnova_-tc2VJfCMfK4z1oEbJSIw7blQYHu_bzGG1O5BAPnohEpq_VE6KC_nnUcPWGfn-G_TCgHzfyGMV1WTPZLfPB7EWVnnjur6MqskFxVtM3EN_HJsuBoX-lGXZlOFzo3sWfEbLTJWwTvF0dyDmfzmWplDJ1U6pjoRMzHIRII7BB6BnrMeurVY9GjKi1",
    alt: "KGEC campus entrance",
  },
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=85",
    alt: "College academic building",
  },
  {
    src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1800&q=85",
    alt: "College library reading hall",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=85",
    alt: "Students collaborating on campus",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=85",
    alt: "Technology lab and computers",
  },
  {
    src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85",
    alt: "Campus garden and pathways",
  },
];

const AUTO_SCROLL_MS = 5000;
const TRANSITION_MS = 700;
const TOTAL = heroImages.length;

// Extended slide list for infinite loop
const extendedImages = [
  heroImages[TOTAL - 1],
  ...heroImages,
  heroImages[0],
];

const QUICK_PORTALS = [
  { label: "Webmail / ERP", icon: Mail, href: "/admin/login", desc: "Student & Faculty Portal" },
  { label: "Digital Library", icon: BookOpen, href: "/downloads?category=general", desc: "IEEE & N-LIST Access" },
  { label: "Placements Cell", icon: Briefcase, href: "/training-and-placement", desc: "Statistics & Recruiters" },
  { label: "Syllabus & Notices", icon: FileText, href: "/notices", desc: "Latest Circulars & Forms" },
  { label: "Grievance Cell", icon: ShieldAlert, href: "/contact", desc: "Anti-Ragging Helpline" },
];

export default function Hero() {
  const [position, setPosition] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeIndex =
    position === 0
      ? TOTAL - 1
      : position === TOTAL + 1
        ? 0
        : position - 1;

  useEffect(() => {
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      if (position === TOTAL + 1) {
        setIsTransitioning(false);
        setPosition(1);
      } else if (position === 0) {
        setIsTransitioning(false);
        setPosition(TOTAL);
      }

      setTimeout(() => {
        setIsTransitioning(true);
        setIsAnimating(false);
      }, 50);
    }, TRANSITION_MS);

    return () => clearTimeout(timer);
  }, [position, isAnimating]);

  const showNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    setPosition((p) => p + 1);
  }, [isAnimating]);

  const showPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    setPosition((p) => p - 1);
  }, [isAnimating]);

  useEffect(() => {
    const timer = window.setInterval(showNext, AUTO_SCROLL_MS);
    return () => window.clearInterval(timer);
  }, [showNext]);

  return (
    <div className="w-full px-0 sm:px-6 lg:px-8 mx-auto max-w-[100rem] pt-0 sm:pt-2 pb-4 flex flex-col gap-4">
      <section
        aria-label="KGEC campus image carousel"
        className="relative w-full aspect-21/10 min-h-[380px] md:min-h-120 max-h-[75vh] overflow-hidden rounded-none sm:rounded-2xl bg-slate-950 shadow-none sm:shadow-md"
      >
        <div
          className={`flex h-full${isTransitioning ? " transition-transform duration-700 ease-in-out" : ""}`}
          style={{ transform: `translateX(-${position * 100}%)` }}
        >
          {extendedImages.map((image, index) => (
            <div key={`slide-${index}`} className="relative h-full min-w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover opacity-90"
                draggable={false}
                loading={index <= 1 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Large Edge-to-Edge KGEC Typography */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden select-none px-2">
          <span className="font-akira text-[22vw] font-black leading-none tracking-tight text-white/25 drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] whitespace-nowrap select-none">
            KGEC
          </span>
        </div>

        {/* Bottom Gradient overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black/60 to-transparent z-10" />

        {/* Bottom Left controls */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 z-20 flex flex-col hidden sm:flex">
          <div className="flex items-baseline text-white font-bold tracking-wide">
            <span className="text-2xl md:text-4xl">{(activeIndex + 1).toString().padStart(2, "0")}</span>
            <span className="text-white/60 text-lg md:text-xl mx-2">/</span>
            <span className="text-white/60 text-lg md:text-xl">{heroImages.length.toString().padStart(2, "0")}</span>
          </div>
          
          <div className="flex items-center w-40 md:w-72 h-1.5 bg-white/30 rounded-full mt-2 md:mt-3 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-[#1e40af] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((activeIndex + 1) / heroImages.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Right Arrow Controls */}
        <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 md:right-10 md:bottom-8 z-20 flex items-center gap-2 md:gap-4">
          <button
            type="button"
            aria-label="Previous hero image"
            onClick={showPrevious}
            className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 hover:border-white/40 focus:outline-none cursor-pointer"
          >
            <ChevronLeft className="size-5 md:size-6" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next hero image"
            onClick={showNext}
            className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 hover:border-white/40 focus:outline-none cursor-pointer"
          >
            <ChevronRight className="size-5 md:size-6" strokeWidth={1.5} />
          </button>
        </div>
      </section>

      {/* Institutional Services & Information Section (Matching KGEC Design System) */}
      <div className="w-full px-4 sm:px-0 pt-6">
        {/* Popular Quick Access Bar */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-5 sm:p-6 mb-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-5 bg-[#022448] rounded-full"></span>
            <h2 className="text-sm sm:text-base font-bold text-[#022448] uppercase tracking-wider">
              Popular Quick Access Portals
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              { title: "Webmail & Student ERP Portal", desc: "Attendance & Gradebook", href: "/admin/login" },
              { title: "WBJEE 2026 UG Admission Matrix", desc: "Seat Matrix & Cutoffs", href: "/admission/ug-btech" },
              { title: "Digital Library Access", desc: "IEEE Xplore & N-LIST", href: "/downloads?category=general" },
              { title: "Training & Placement Cell", desc: "Statistics & Recruiters", href: "/training-and-placement/statistics" },
              { title: "Anti-Ragging Safety Helpline", desc: "24/7 Student Grievance", href: "/contact" },
              { title: "Academic Notices & Calendar", desc: "Circulars & Exam Rules", href: "/notices" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-lg bg-white border border-slate-200/80 hover:border-[#225eaa]/50 hover:shadow-md transition-all duration-200"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <h3 className="text-sm font-bold text-[#022448] group-hover:text-[#225eaa] transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{item.desc}</p>
                </div>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#022448] group-hover:bg-[#022448] group-hover:text-white transition-colors">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Services and Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Spans 2 cols): Services List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="border-b-2 border-[#022448] pb-3 mb-2 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-[#022448]">
                Services and Information
              </h2>
              <Link href="/downloads?category=general" className="text-xs sm:text-sm font-bold text-[#225eaa] hover:underline flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {[
                {
                  title: "Academics & Department Curriculum",
                  desc: "Syllabus, laboratories, and academic regulations for CSE, IT, ECE, EE, ME & MCA departments.",
                  href: "/departments",
                },
                {
                  title: "Training & Placement Cell",
                  desc: "Campus recruitment schedule, recruiter guidelines, coordinator contact, and historical placement records.",
                  href: "/training-and-placement",
                },
                {
                  title: "Admissions & Cutoffs",
                  desc: "WBJEE, JELET, GATE & PGET eligibility criteria, seat matrix, fee structure, and counseling schedules.",
                  href: "/admission/ug-btech",
                },
                {
                  title: "Student Support & Grievance Cell",
                  desc: "24/7 Anti-Ragging Helpline, SC/ST/OBC Cell, Equal Opportunity Cell, and campus welfare services.",
                  href: "/contact",
                },
                {
                  title: "Research & Innovation Council (IIC)",
                  desc: "Faculty publications, E-Cell startup incubation center, patents, and national research grants.",
                  href: "/research",
                },
                {
                  title: "IQAC, NAAC & Statutory Disclosures",
                  desc: "RTI Cell, mandatory AICTE disclosures, annual reports, NIRF submissions, and meeting minutes.",
                  href: "/iqac",
                },
              ].map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group flex items-center justify-between p-4 sm:p-5 bg-white border border-slate-200/80 rounded-xl border-l-4 border-l-[#022448] hover:border-l-[#225eaa] hover:shadow-md transition-all duration-200"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#022448] group-hover:text-[#225eaa] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#022448] group-hover:text-[#225eaa] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Highlights & Downloads */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="border-b-2 border-[#022448] pb-3 mb-4">
                <h2 className="text-xl font-bold text-[#022448]">
                  Featured Highlights
                </h2>
              </div>
              <div className="flex flex-col gap-3.5">
                {[
                  {
                    title: "Chandrayaan-3 Alumni Contribution",
                    desc: "KGEC alumni scientists actively involved in ISRO's historic lunar exploration mission.",
                    href: "/alumni",
                    badge: "Alumni News",
                  },
                  {
                    title: "Highest Placement Package 90 LPA",
                    desc: "International software engineering placement record set by our graduating batch.",
                    href: "/training-and-placement/statistics",
                    badge: "Placements",
                  },
                  {
                    title: "Smart India Hackathon 1st Prize",
                    desc: "National champions in both hardware and software editions organized by MoE.",
                    href: "/campus-life",
                    badge: "Achievement",
                  },
                ].map((feat) => (
                  <Link
                    key={feat.title}
                    href={feat.href}
                    className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl hover:bg-white hover:border-[#225eaa]/40 hover:shadow-xs transition-all duration-200 group flex flex-col gap-1.5"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100/80 text-[#022448] w-fit">
                      {feat.badge}
                    </span>
                    <h4 className="text-sm font-bold text-[#022448] group-hover:text-[#225eaa] transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      {feat.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-5">
              <h3 className="text-xs font-bold text-[#022448] uppercase tracking-wider mb-3">
                Statutory & Mandatory Downloads
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-[#022448]">
                <li>
                  <Link href="/downloads?category=mandatory-disclosure" className="hover:text-[#225eaa] hover:underline flex items-center gap-1.5">
                    <span className="text-[#225eaa]">&bull;</span> AICTE Mandatory Disclosure Document
                  </Link>
                </li>
                <li>
                  <Link href="/downloads?category=general" className="hover:text-[#225eaa] hover:underline flex items-center gap-1.5">
                    <span className="text-[#225eaa]">&bull;</span> Academic Calendar & Exam Rules
                  </Link>
                </li>
                <li>
                  <Link href="/nirf" className="hover:text-[#225eaa] hover:underline flex items-center gap-1.5">
                    <span className="text-[#225eaa]">&bull;</span> NIRF Institutional Ranking Data 2026
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


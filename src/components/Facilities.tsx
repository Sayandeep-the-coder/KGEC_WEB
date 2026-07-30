"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Monitor,
  Trophy,
} from "lucide-react";

const facilities = [
  {
    eyebrow: "Learning Environment",
    title: "Central Library",
    description:
      "A hub of knowledge and discovery with extensive resources, quiet study spaces, and digital access for every learner.",
    watermark: "Library",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=85",
    icon: BookOpen,
  },
  {
    eyebrow: "Research Infrastructure",
    title: "Advanced Laboratories",
    description:
      "Hands-on engineering labs built for experiments, prototyping, testing, and practical technical training.",
    watermark: "Labs",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=85",
    icon: FlaskConical,
  },
  {
    eyebrow: "Digital Campus",
    title: "Computer Centre",
    description:
      "Modern computing spaces that support programming, design, simulation, online learning, and project work.",
    watermark: "Digital",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=85",
    icon: Monitor,
  },
  {
    eyebrow: "Campus Life",
    title: "Sports Complex",
    description:
      "Open grounds and activity spaces that keep student life energetic, balanced, and team-driven.",
    watermark: "Sports",
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1400&q=85",
    icon: Trophy,
  },
];

const AUTO_SCROLL_MS = 5000;

export default function Facilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeFacility = facilities[activeIndex];
  const ActiveIcon = useMemo(() => activeFacility.icon, [activeFacility]);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? facilities.length - 1 : current - 1
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % facilities.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(showNext, AUTO_SCROLL_MS);

    return () => window.clearInterval(timer);
  }, [showNext]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-kgec-facility-panel text-white shadow-2xl">
        <div className="grid min-h-110 grid-cols-1 lg:grid-cols-12">
          <div className="relative z-10 flex flex-col justify-between overflow-hidden p-8 md:p-12 lg:col-span-5">
            <div>
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Our Facilities
              </span>
              <h2 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
                World-class facilities <br />
                to inspire learning <br />
                and innovation
              </h2>
            </div>

            <div className="mt-12">
              <span className="text-2xl font-bold tracking-tight text-white/90">
                {String(activeIndex + 1).padStart(2, "0")}{" "}
                <span className="text-base font-normal text-white/40">
                  / {String(facilities.length).padStart(2, "0")}
                </span>
              </span>

              <div className="mt-5 flex max-w-56 items-center gap-2">
                {facilities.map((facility, index) => (
                  <button
                    key={facility.title}
                    type="button"
                    aria-label={`Show ${facility.title}`}
                    aria-current={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                    className="h-1.5 flex-1 rounded-full bg-white/20 transition-colors hover:bg-white/50 aria-current:bg-blue-400 cursor-pointer"
                  />
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-1 left-6 select-none opacity-5">
              <h3 className="text-7xl font-black uppercase tracking-normal text-white md:text-8xl">
                {activeFacility.watermark}
              </h3>
            </div>
          </div>

          <div className="relative flex min-h-80 flex-col justify-end overflow-hidden bg-slate-900 p-8 md:p-10 lg:col-span-7 lg:min-h-full">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
              style={{ backgroundImage: `url('${activeFacility.image}')` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/60 to-slate-950/20" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-md">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  {activeFacility.eyebrow}
                </span>
                <div className="mb-2 flex items-center gap-2 text-xl font-bold text-white">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600/80 text-white backdrop-blur-md">
                    <ActiveIcon size={18} />
                  </div>
                  <h3>{activeFacility.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {activeFacility.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3 self-end">
                <button
                  type="button"
                  aria-label="Previous facility"
                  onClick={showPrevious}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next facility"
                  onClick={showNext}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

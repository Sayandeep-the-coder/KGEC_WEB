"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-br2mKIgd6KFtkSnbNptaupUKVk3rBsg84VOu7szGt4rTa6uDbRH5DCoSnova_-tc2VJfCMfK4z1oEbJSIw7blQYHu_bzGG1O5BAPnohEpq_VE6KC_nnUcPWGfn-G_TCgHzfyGMV1WTPZLfPB7EWVnnjur6MqskFxVtM3EN_HJsuBoX-lGXZlOFzo3sWfEbLTJWwTvF0dyDmfzmWplDJ1U6pjoRMzHIRII7BB6BnrMeurVY9GjKi1",
    alt: "KGEC campus entrance",
  },
  {
    src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1800&q=85",
    alt: "College library reading hall",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=85",
    alt: "Students collaborating on campus",
  },
];

const AUTO_SCROLL_MS = 4500;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? heroImages.length - 1 : current - 1
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(showNext, AUTO_SCROLL_MS);

    return () => window.clearInterval(timer);
  }, [showNext]);

  return (
    <section
      aria-label="KGEC campus image carousel"
      className="relative mx-auto h-[68vh] min-h-105 max-h-170 w-full max-w-7xl overflow-hidden rounded-2xl bg-slate-950 shadow-2xl md:h-[72vh]"
    >
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {heroImages.map((image, index) => (
          <div key={image.src} className="relative h-full min-w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center px-4 sm:top-0">
        <span className="select-none font-serif text-[28vw] font-black leading-none text-white/20 sm:text-[24vw] md:text-[13rem] lg:text-[16rem]">
          KGEC
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-slate-950/55 to-transparent" />

      <div className="absolute bottom-6 left-6 z-20 flex w-36 items-center gap-2 sm:w-48">
        {heroImages.map((image, index) => (
          <button
            key={`${image.src}-indicator`}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            className="h-1.5 flex-1 rounded-full bg-white/35 transition-colors hover:bg-white/70 aria-current:bg-white cursor-pointer"
          />
        ))}
      </div>

      <div className="absolute right-6 bottom-6 z-20 flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous hero image"
          onClick={showPrevious}
          className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-slate-950/45 text-white shadow-lg backdrop-blur-md transition hover:border-white/70 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          aria-label="Next hero image"
          onClick={showNext}
          className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-slate-950/45 text-white shadow-lg backdrop-blur-md transition hover:border-white/70 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}

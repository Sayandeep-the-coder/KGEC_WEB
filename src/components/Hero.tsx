"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// Build the extended slide list: [lastClone, ...originals, firstClone]
// This lets us scroll continuously in either direction.
const extendedImages = [
  heroImages[TOTAL - 1], // clone of last slide at position 0
  ...heroImages,         // real slides at positions 1..TOTAL
  heroImages[0],         // clone of first slide at position TOTAL+1
];

export default function Hero() {
  // `position` tracks the index inside extendedImages (1-based for real slides).
  // Real slides occupy positions 1..TOTAL. Position 0 = last-clone, TOTAL+1 = first-clone.
  const [position, setPosition] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const isSnapping = useRef(false);

  // The "real" activeIndex for UI display (0-based, 0..TOTAL-1)
  const activeIndex =
    position === 0
      ? TOTAL - 1
      : position === TOTAL + 1
        ? 0
        : position - 1;

  const snapToReal = useCallback(() => {
    // After a transition to a clone slide completes, instantly jump to
    // the corresponding real slide without a visible transition.
    if (isSnapping.current) return;

    if (position === TOTAL + 1) {
      // Scrolled past last real slide → snap to real first slide
      isSnapping.current = true;
      setIsTransitioning(false);
      setPosition(1);
      // Re-enable transitions after the browser paints the snap
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isSnapping.current = false;
        });
      });
    } else if (position === 0) {
      // Scrolled before first real slide → snap to real last slide
      isSnapping.current = true;
      setIsTransitioning(false);
      setPosition(TOTAL);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isSnapping.current = false;
        });
      });
    }
  }, [position]);

  // Listen for transitionend to snap clones → real slides
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTransitionEnd = () => snapToReal();
    track.addEventListener("transitionend", handleTransitionEnd);
    return () => track.removeEventListener("transitionend", handleTransitionEnd);
  }, [snapToReal]);

  const showNext = useCallback(() => {
    if (isSnapping.current) return;
    setIsTransitioning(true);
    setPosition((p) => p + 1);
  }, []);

  const showPrevious = useCallback(() => {
    if (isSnapping.current) return;
    setIsTransitioning(true);
    setPosition((p) => p - 1);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const timer = window.setInterval(showNext, AUTO_SCROLL_MS);
    return () => window.clearInterval(timer);
  }, [showNext]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[100rem] pt-2 pb-8">
      <section
        aria-label="KGEC campus image carousel"
        className="relative w-full aspect-[21/10] min-h-[500px] max-h-[85vh] overflow-hidden rounded-[2rem] bg-slate-950 shadow-md"
      >
        <div
          ref={trackRef}
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

        {/* Large KGEC Watermark */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 flex justify-center px-4">
          <span className="select-none font-sans text-[22vw] font-bold leading-none text-white/20 xl:text-[20rem]">
            KGEC
          </span>
        </div>

        {/* Bottom Gradient overlay for text visibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent z-10" />

        {/* Bottom Left controls: 01 / 06 and Progress line */}
        <div className="absolute bottom-10 left-10 z-20 flex flex-col">
          <div className="flex items-baseline text-white font-bold tracking-wide">
            <span className="text-4xl">{(activeIndex + 1).toString().padStart(2, "0")}</span>
            <span className="text-white/60 text-xl mx-2">/</span>
            <span className="text-white/60 text-xl">{heroImages.length.toString().padStart(2, "0")}</span>
          </div>
          
          <div className="flex items-center w-72 h-1.5 bg-white/30 rounded-full mt-3 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-[#1e40af] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((activeIndex + 1) / heroImages.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Right Arrow Controls */}
        <div className="absolute right-10 bottom-10 z-20 flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous hero image"
            onClick={showPrevious}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 hover:border-white/40 focus:outline-none cursor-pointer"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next hero image"
            onClick={showNext}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 hover:border-white/40 focus:outline-none cursor-pointer"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </section>
    </div>
  );
}


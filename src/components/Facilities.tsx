"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const facilities = [
  {
    title: "Classroom",
    eyebrow: "Oxford Classrooms",
    headingTitle: "Comfortable and modern classrooms",
    headingSubtitle: "to support learning activities",
    description: "Modern learning spaces thoughtfully designed to foster academic excellence, collaboration, and critical thinking across disciplines.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Library",
    eyebrow: "Central Library",
    headingTitle: "A vast collection of resources",
    headingSubtitle: "for endless discovery",
    description: "A hub of knowledge with quiet study spaces, an extensive archive, and access to leading research journals.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Laboratory",
    eyebrow: "Advanced Laboratories",
    headingTitle: "Hands-on engineering labs",
    headingSubtitle: "built for practical experiments",
    description: "Fully equipped with modern instruments and tools, enabling students to bridge theoretical knowledge with real-world application.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Computing",
    eyebrow: "Digital Campus",
    headingTitle: "High-performance computing centers",
    headingSubtitle: "supporting digital innovation",
    description: "Modern computing spaces that support programming, 3D design, simulation, and collaborative project work.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Auditorium",
    eyebrow: "Main Auditorium",
    headingTitle: "A grand stage for seminars,",
    headingSubtitle: "events, and guest lectures",
    description: "State-of-the-art acoustics and seating capacity designed to host major college events and industry tech-talks.",
    image: "https://images.unsplash.com/photo-1507676184212-d0c30a7c73db?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Sports",
    eyebrow: "Sports Complex",
    headingTitle: "Extensive open grounds",
    headingSubtitle: "and facilities for physical well-being",
    description: "Activity spaces that keep student life energetic and balanced, fostering teamwork and a healthy lifestyle.",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Hostels",
    eyebrow: "Student Accommodation",
    headingTitle: "Comfortable, secure, and vibrant",
    headingSubtitle: "residential spaces for students",
    description: "A home away from home, providing essential amenities, mess facilities, and a supportive campus community.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Cafeteria",
    eyebrow: "Campus Cafeteria",
    headingTitle: "Hygienic and diverse food options",
    headingSubtitle: "to fuel your daily pursuits",
    description: "A lively social hub offering nutritious meals and snacks, perfect for unwinding and casual discussions.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80",
  },
];

const AUTO_SCROLL_MS = 6000;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    zIndex: 10,
    boxShadow: direction > 0 ? "-10px 0 30px rgba(0,0,0,0.5)" : "10px 0 30px rgba(0,0,0,0.5)",
  }),
  center: {
    x: 0,
    zIndex: 10,
    boxShadow: "0px 0 0px rgba(0,0,0,0)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-20%" : "20%",
    zIndex: 0,
    opacity: 0.4,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Facilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeFacility = facilities[activeIndex];

  const showNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % facilities.length);
  }, []);

  const showPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + facilities.length) % facilities.length);
  }, []);

  const changeSlide = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    const timer = window.setInterval(showNext, AUTO_SCROLL_MS);
    return () => window.clearInterval(timer);
  }, [showNext]);

  return (
    <section className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-full flex flex-col justify-center overflow-hidden touch-pan-y">
      <div className="relative w-full h-[88vh] min-h-[500px] overflow-hidden rounded-2xl bg-slate-950 shadow-md group">
        
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                showNext();
              } else if (swipe > swipeConfidenceThreshold) {
                showPrev();
              }
            }}
            className="absolute inset-0 flex flex-col bg-slate-950 cursor-grab active:cursor-grabbing"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{ backgroundImage: `url('${activeFacility.image}')` }}
              />
              {/* Gradient Overlays for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10 pointer-events-none">
              
              {/* Top Row: Eyebrow, Heading, and Right Label */}
              <div className="flex justify-between items-start">
                <div className="max-w-2xl md:max-w-3xl">
                  <span className="text-white/90 text-sm font-medium mb-3 block italic tracking-wide">
                    Our Facilities
                  </span>
                  <h2 className="text-3xl md:text-5xl lg:text-[54px] font-medium text-white leading-[1.15] tracking-tight drop-shadow-md">
                    {activeFacility.headingTitle}{" "}
                    <span className="text-white/60 block mt-1">{activeFacility.headingSubtitle}</span>
                  </h2>
                </div>
                
                <div className="hidden sm:block text-right">
                  <span className="text-white/70 text-xs font-bold tracking-widest uppercase block text-right w-24 leading-relaxed">
                    AVAILABLE FACILITY
                  </span>
                </div>
              </div>

              {/* Middle Right: Info Box */}
              <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 max-w-xs hidden md:block">
                <h3 className="text-white font-bold text-sm md:text-base mb-2 drop-shadow-sm">
                  {activeFacility.eyebrow}
                </h3>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed drop-shadow-sm">
                  {activeFacility.description}
                </p>
              </div>

              {/* Bottom Area: Numbers and Massive Text */}
              <div className="w-full flex flex-col mt-auto pointer-events-none pb-8">
                {/* Number Indicator */}
                <div className="flex items-baseline text-white z-20 drop-shadow-md mb-2 md:mb-4">
                  <span className="text-5xl md:text-6xl font-medium tracking-tight">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl md:text-3xl text-white/50 ml-1">
                    /{String(facilities.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Massive Background Text */}
                <div className="z-10 flex items-end">
                  <span className="text-[12vw] md:text-[10vw] font-bold text-white/95 tracking-tighter leading-[0.8] -ml-1 md:-ml-2 drop-shadow-lg">
                    {activeFacility.title}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Fixed Bottom Progress Bars (outside the sliding container so they stay fixed) */}
        <div className="absolute bottom-6 left-8 right-8 md:left-12 md:right-12 flex gap-2 z-30 pb-2">
          {facilities.map((facility, index) => (
            <button
              key={facility.title}
              onClick={() => changeSlide(index)}
              className="flex-1 h-1.5 group/btn relative overflow-hidden rounded-full bg-white/20 transition-all cursor-pointer"
              aria-label={`Go to ${facility.title}`}
            >
              <div 
                className={`absolute inset-0 bg-white transition-opacity duration-300 ${
                  activeIndex === index ? "opacity-100" : "opacity-0 group-hover/btn:opacity-50"
                }`} 
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

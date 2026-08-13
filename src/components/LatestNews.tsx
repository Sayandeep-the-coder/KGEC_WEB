"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronRight as ChevronIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  link: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: "1",
    title: "KGEC Racing Team Crowned Double Champions at National Formula Student 2026",
    date: "05 Aug 2026",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    link: "/news/1",
  },
  {
    id: "2",
    title: "Inauguration of Interactive Smart Classrooms and Executive Innovation Lab",
    date: "03 Aug 2026",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    link: "/news/2",
  },
  {
    id: "3",
    title: "KPIT Leadership Visits KGEC Campus For Tech Exchange & Placement Drive",
    date: "30 Jul 2026",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    link: "/news/3",
  },
  {
    id: "4",
    title: "Annual Techno-Management Fest Techtix 2026 Announced with Global Hackathon",
    date: "24 Jul 2026",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    link: "/news/4",
  },
  {
    id: "5",
    title: "KGEC Research Scholars Publish Breakthrough Paper in AI & Embedded Systems",
    date: "18 Jul 2026",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    link: "/news/5",
  },
];

export default function LatestNews() {
  const [startIndex, setStartIndex] = useState(0);

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? NEWS_DATA.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= NEWS_DATA.length - 3 ? 0 : prev + 1));
  };

  const visibleNews = NEWS_DATA.slice(startIndex, startIndex + 3);

  return (
    <section className="mx-auto w-full max-w-[100rem] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 md:mb-14"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#022448] tracking-tight">
          Latest News
        </h2>
      </motion.div>

      {/* Carousel Wrapper with Navigation Arrows */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-10">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          aria-label="Previous News"
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-100 hover:text-[#022448] transition-all cursor-pointer border border-slate-200"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          aria-label="Next News"
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-100 hover:text-[#022448] transition-all cursor-pointer border border-slate-200"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleNews.map((news) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col overflow-hidden rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-200">
                  <Image
                    src={news.imageUrl}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
                  <div>
                    <span className="text-xs font-medium text-slate-500 block mb-2">
                      {news.date}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#225eaa] transition-colors leading-snug line-clamp-2 mb-4">
                      {news.title}
                    </h3>
                  </div>

                  <Link
                    href={news.link}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#225eaa] hover:text-[#022448] transition-colors mt-auto w-fit"
                  >
                    Read More <ChevronIcon className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-10 md:mt-12">
        <Link
          href="/notices"
          className="px-8 py-2.5 rounded-lg border border-[#225eaa] text-[#225eaa] font-medium text-sm hover:bg-[#225eaa] hover:text-white transition-all cursor-pointer shadow-2xs"
        >
          View All
        </Link>
      </div>
    </section>
  );
}

"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { CSSProperties } from "react";
import { motion } from "framer-motion";

const galleryData = [
  {
    id: 1,
    type: "image",
    src: "/images/events/event_techtix.png",
    title: "Techtix",
    description: "Annual Techno-Management Fest filled with innovation and technology.",
    desktopStyle: { gridColumn: "1 / span 5", gridRow: "1 / span 8" },
    objectPosition: "object-center",
  },
  {
    id: 2,
    type: "image",
    src: "/images/events/event_exotica.png",
    title: "Exotica",
    description: "Welcoming the freshers with a grand celebration and cultural events.",
    desktopStyle: { gridColumn: "6 / span 8", gridRow: "1 / span 4" },
    objectPosition: "object-center",
  },
  {
    id: 3,
    type: "image",
    src: "/images/gallery/independence_day.jpg",
    title: "Independence Day",
    description:
      "Celebrating the spirit of freedom at the iconic Central Library and Main Building.",
    desktopStyle: { gridColumn: "14 / span 5", gridRow: "1 / span 4" },
    objectPosition: "object-center",
  },
  {
    id: 4,
    type: "image",
    src: "/images/gallery/espektro_aftermovie.png",
    title: "Espektro '25",
    description:
      "The biggest cultural fest of Kalyani! Three days of non-stop music, dance, and creativity.",
    desktopStyle: { gridColumn: "6 / span 4", gridRow: "5 / span 4" },
    objectPosition: "object-[10%_40%]",
  },
  {
    id: 5,
    type: "image",
    src: "/images/gallery/hackathon_coding.jpg",
    title: "Hackathon Nights",
    description:
      "Students deeply engaged in problem-solving and pushing the boundaries of code.",
    desktopStyle: { gridColumn: "10 / span 4", gridRow: "5 / span 4" },
    objectPosition: "object-center",
  },
  {
    id: 6,
    type: "image",
    src: "/images/gallery/binary_group.png",
    title: "Binary V2",
    description:
      "A massive shoutout to the participants, organizers, and winners of Binary V2 hackathon!",
    desktopStyle: { gridColumn: "1 / span 13", gridRow: "9 / span 4" },
    objectPosition: "object-[10%_30%]",
  },
  {
    id: 7,
    type: "image",
    src: "/images/events/event_alhambra.png",
    title: "Alhambra",
    description: "The Annual Cultural Fiesta showcasing immense talent and passion.",
    desktopStyle: { gridColumn: "14 / span 5", gridRow: "5 / span 8" },
    objectPosition: "object-center",
  },
];

function GalleryCard({
  item,
  desktop = false,
  index = 0,
}: {
  item: {
    id: number;
    type: string;
    src?: string;
    youtubeId?: string;
    poster?: string;
    title?: string;
    description?: string;
    desktopStyle: React.CSSProperties;
    objectPosition?: string;
  };
  desktop?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl group text-white relative overflow-hidden bg-[#0a1730] shadow-lg ${desktop ? "" : "min-h-[400px]"
        }`}
      style={desktop ? (item.desktopStyle as CSSProperties) : undefined}
    >
      {item.type === "youtube" ? (
        <div className="w-full h-full relative flex items-center justify-center bg-black">
          <iframe
            className="w-full h-full border-none"
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${item.youtubeId}&controls=0&modestbranding=1&rel=0`}
            title={item.title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : item.type === "video" ? (
        <div className="w-full h-full relative">
          <video
            className="object-cover object-center w-full h-full outline-none"
            poster={item.poster}
            src={item.src}
            playsInline
            preload="auto"
            loop
            muted
            autoPlay
          />
        </div>
      ) : (
        <>
          <img
            alt={item.title || "Gallery Image"}
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale will-change-transform ${item.objectPosition}`}
            loading="lazy"
            src={item.src}
          />

          {/* Desktop Hover Overlay */}
          {item.title && (
            <div className="absolute max-lg:hidden lg:flex bottom-0 group-hover:translate-y-0 transition-transform duration-500 translate-y-full left-0 bg-gradient-to-t from-[#022448] via-[#022448]/90 to-transparent pt-20 pb-6 px-6 w-full z-20">
              <div className="mt-auto">
                <h1 className="font-bold capitalize text-2xl mb-1.5 drop-shadow-md">
                  {item.title}
                </h1>
                <p className="text-blue-100/90 text-sm leading-relaxed drop-shadow-sm">
                  {item.description}
                </p>
              </div>
            </div>
          )}

          {/* Mobile Persistent Overlay */}
          {item.title && (
            <div className="absolute lg:hidden bottom-0 left-0 bg-linear-to-t from-black via-black/80 to-transparent pt-12 pb-5 px-5 w-full z-20">
              <h1 className="font-bold capitalize text-xl mb-1 drop-shadow-sm">
                {item.title}
              </h1>
              <p className="text-white/80 text-xs drop-shadow-sm">
                {item.description}
              </p>
            </div>
          )}

          {item.title && (
            <div className="absolute flex items-center justify-center top-4 group-hover:rotate-45 transition-all duration-500 right-4 p-2.5 md:p-3 bg-[#022448]/90 backdrop-blur-md rounded-full shadow-lg z-20">
              <MoveUpRight className="h-4 w-4 md:h-5 md:w-5 text-[#79acfd] font-bold" />
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-full flex flex-col justify-center overflow-hidden relative touch-pan-y">
      <div className="relative z-10 w-full min-h-[88vh] overflow-hidden rounded-2xl bg-linear-to-br from-[#022448] via-[#1e3a5f] to-[#022448] flex flex-col items-center justify-center py-8 lg:py-12 text-white shadow-md border border-white/5">
        {/* Title area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center w-full z-10"
        >
          <h1 className="relative w-fit px-4 uppercase mx-auto bg-blue-500/10 border text-blue-200 border-blue-500/30 text-sm md:text-base font-light leading-none py-1.5 inline-block z-10">
            Gallery
            <span className="absolute w-0.75 h-0.75 bg-[#79acfd] z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2"></span>
            <span className="absolute w-0.75 h-0.75 bg-[#79acfd] z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2"></span>
            <span className="corner-dot-bl absolute w-0.75 h-0.75 bg-[#79acfd] z-10 bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></span>
            <span className="corner-dot-br absolute w-0.75 h-0.75 bg-[#79acfd] z-10 bottom-0 right-0 translate-x-1/2 translate-y-1/2"></span>
          </h1>

          <div className="flex justify-center px-5 mb-8 z-10">
            <div className="text-center shrink-0 mt-4 text-3xl md:text-5xl lg:text-[54px] capitalize leading-tight w-[95%] md:w-[85%] lg:w-[70%] font-medium text-white drop-shadow-md">
              A visual journey through excellence, innovation, and culture.
            </div>
          </div>
        </motion.div>

        <div className="flex mb-12 sm:mb-16 z-10 relative">
          <Link
            href="/gallery"
            className="text-white text-center group text-lg md:text-xl font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-2xl outline-none hover:shadow-[0_0px_30px_5px_rgba(37,99,235,0.4)] transition-all duration-300 bg-linear-to-r from-blue-600 to-[#1e3a5f] border border-blue-400/20"
          >
            <div className="relative overflow-hidden w-max cursor-pointer mx-auto">
              <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Explore Gallery <span className="text-[#79acfd]">→</span>
              </div>
              <div className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 text-[#79acfd]">
                Explore Gallery <span>→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden flex flex-col gap-4 px-5 mx-auto w-full z-10">
          {galleryData.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Desktop View (Bento Grid) */}
        <div
          className="max-sm:hidden grid gap-3 md:gap-4 lg:gap-5 px-4 md:px-6 lg:px-12 mx-auto lg:h-[80vh] w-full z-10"
          style={{
            gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
            gridTemplateRows: "repeat(12, minmax(0, 1fr))",
          }}
        >
          {galleryData.map((item, i) => (
            <GalleryCard key={item.id} item={item} desktop index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

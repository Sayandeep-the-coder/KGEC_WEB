"use client";

import { Sparkles, MoveUpRight } from "lucide-react";
import { motion } from "framer-motion";

const impactData = [
  {
    title: "Campus Events",
    description:
      "Experience vibrant campus events where ideas turn into reality and students celebrate their creativity.",
    buttonText: "Featured",
    image: "/impact_cards/1.png",
    offset: false,
  },
  {
    title: "Technical Seminars",
    description:
      "Deep dive into real-world engineering concepts with hands-on technical seminars from industry experts.",
    buttonText: "Seminar",
    image: "/impact_cards/2.png",
    offset: true,
  },
  {
    title: "Alumni Meetups",
    description:
      "Open conversations about careers, coding, internships, and the journey from our successful alumni.",
    buttonText: "Meet-ups",
    image: "/impact_cards/3.png",
    offset: false,
  },
  {
    title: "Hackathons",
    description:
      "Intense coding sessions where teams collaborate to build innovative solutions over a weekend.",
    buttonText: "Code & Chill",
    image: "/impact_cards/4.png",
    offset: true,
  },
  {
    title: "Cultural Fests",
    description:
      "Celebrate the diverse culture and talents of our student community through music and arts.",
    buttonText: "Festival",
    image: "/impact_cards/5.png",
    offset: false,
  },
  {
    title: "Innovation Labs",
    description:
      "State-of-the-art research facilities where students bring their most ambitious engineering projects to life.",
    buttonText: "Research",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    offset: true,
  },
];

export default function Impact() {
  // Duplicate data to create a seamless loop track
  const duplicatedData = [...impactData, ...impactData];

  return (
    <section className="mx-auto w-full max-w-[100rem] px-0 sm:px-6 lg:px-8 py-0 sm:py-6 h-full flex flex-col justify-center overflow-hidden touch-pan-y">
      <style>{`
        @keyframes carousel-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-carousel {
          animation: carousel-scroll 40s linear infinite;
        }
        .animate-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Applied gradient based on design.md primary and primary-container colors */}
      <div className="relative w-full h-auto overflow-hidden rounded-none sm:rounded-2xl bg-gradient-to-br from-[#022448] via-[#1e3a5f] to-[#022448] shadow-none sm:shadow-md flex flex-col items-center justify-center py-10 lg:py-14">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center w-full z-10"
        >
          <h1 className="relative w-fit px-4 uppercase mx-auto bg-blue-500/10 border text-blue-200 border-blue-500/30 text-sm md:text-base font-light leading-none py-1.5 inline-block z-10">
            Impact
            <span className="absolute w-[3px] h-[3px] bg-[#79acfd] z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2"></span>
            <span className="absolute w-[3px] h-[3px] bg-[#79acfd] z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2"></span>
            <span className="corner-dot-bl absolute w-[3px] h-[3px] bg-[#79acfd] z-10 bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></span>
            <span className="corner-dot-br absolute w-[3px] h-[3px] bg-[#79acfd] z-10 bottom-0 right-0 translate-x-1/2 translate-y-1/2"></span>
          </h1>

          <div className="flex justify-center px-5 mb-8 z-10">
            <div className="text-center shrink-0 mt-4 text-2xl md:text-4xl lg:text-[42px] capitalize leading-tight w-[95%] md:w-[85%] lg:w-[70%] font-medium text-white drop-shadow-md">
              How We Are Doing It Faster and Better Than Others!
            </div>
          </div>
        </motion.div>

        <div className="w-full relative flex-1 flex flex-col justify-center overflow-hidden max-h-[60vh]">
          {/* Container has gap-6 and pr-6 to ensure seamless mathematically perfect 50% loops */}
          <div className="animate-carousel flex gap-6 items-start pr-6 will-change-transform pb-6 w-max items-center h-full">
            {duplicatedData.map((card, index) => (
              <div
                key={index}
                className={`w-[70vw] sm:w-[32vw] lg:w-[18vw] xl:w-[16vw] rounded-xl group/card overflow-hidden relative aspect-[4/5] shrink-0 cursor-pointer border border-white/5 shadow-2xl transition-transform hover:-translate-y-2 ${
                  card.offset ? "mt-0 sm:mt-12" : "mt-0"
                }`}
              >
                <div className="absolute flex max-md:translate-y-0 bottom-0 group-hover/card:translate-y-0 transition-all duration-500 md:translate-y-full left-0 bg-gradient-to-b from-transparent to-[#121c2a] pt-10 min-h-[50%] w-full z-20">
                  <div className="p-4 md:p-6 h-max mt-auto pt-10">
                    <h1 className="text-xl text-white font-medium max-md:mb-1 md:text-2xl drop-shadow-sm">
                      {card.title}
                    </h1>
                    <p className="text-blue-100/90 text-xs md:text-sm drop-shadow-sm">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="absolute flex top-0 md:group-hover/card:opacity-100 transition-all duration-500 md:opacity-0 left-0 w-full z-20">
                  <div className="p-3 md:p-4 h-max mt-auto pt-6">
                    <button className="bg-[#1e3a5f]/50 backdrop-blur-md overflow-hidden rounded-full font-medium text-white border border-[#79acfd]/30 text-xs">
                      <div className="bg-gradient-to-r flex items-center px-3 py-1.5 from-[#225eaa]/80 to-[#1e3a5f]/80 hover:from-[#79acfd] hover:to-[#225eaa] transition-colors">
                        {card.buttonText}
                      </div>
                    </button>
                  </div>
                </div>

                <span className="block w-full h-full bg-[#121c2a] absolute top-0 left-0 -z-10" />
                <img
                  alt={card.title}
                  className="w-full h-full object-cover transition-all duration-300 ease-in-out max-md:grayscale md:group-hover/card:grayscale will-change-transform"
                  loading="lazy"
                  src={card.image}
                />

                <div className="absolute border ease-out border-[#79acfd]/20 top-4 group-hover/card:rotate-45 transition-all duration-300 right-4 bg-[#022448]/80 backdrop-blur-md p-2 md:p-3 rounded-full z-20">
                  <MoveUpRight className="h-4 w-4 md:h-5 md:w-5 text-[#79acfd] font-bold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

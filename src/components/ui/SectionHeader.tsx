"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  /** Uppercase badge label (e.g. "HIGHLIGHTS", "ABOUT US") */
  badge: string;
  /** Main section title */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Light (white bg) or dark (navy bg) variant */
  variant?: "light" | "dark";
  /** Text alignment */
  align?: "center" | "left";
}

/**
 * SectionHeader — Matches the home page's distinctive section header pattern:
 *   - Bracketed badge with corner dots
 *   - Large title text
 *   - Optional subtitle
 *   - Framer Motion entrance animation
 */
export default function SectionHeader({
  badge,
  title,
  subtitle,
  variant = "light",
  align = "center",
}: SectionHeaderProps) {
  const isLight = variant === "light";
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"} z-10 mb-6 md:mb-10 shrink-0`}
    >
      {/* Badge with corner dots */}
      <h2
        className={`relative w-fit px-4 uppercase text-xs md:text-sm font-light leading-none py-1.5 inline-block mb-3 border ${
          isLight
            ? "bg-[#225eaa]/5 text-[#022448]/90 border-[#225eaa]/30"
            : "bg-blue-500/10 text-blue-200 border-blue-500/30"
        } ${isCenter ? "mx-auto" : ""}`}
      >
        {badge}
        {/* Corner dots */}
        <span className={`absolute w-[3px] h-[3px] ${isLight ? "bg-[#022448]/60" : "bg-[#79acfd]"} z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2`} />
        <span className={`absolute w-[3px] h-[3px] ${isLight ? "bg-[#022448]/60" : "bg-[#79acfd]"} z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2`} />
        <span className={`absolute w-[3px] h-[3px] ${isLight ? "bg-[#022448]/60" : "bg-[#79acfd]"} z-10 bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} />
        <span className={`absolute w-[3px] h-[3px] ${isLight ? "bg-[#022448]/60" : "bg-[#79acfd]"} z-10 bottom-0 right-0 translate-x-1/2 translate-y-1/2`} />
      </h2>

      {/* Title */}
      <div
        className={`shrink-0 mt-1 text-2xl md:text-4xl lg:text-[44px] capitalize leading-tight font-medium ${
          isLight ? "text-[#022448]" : "text-white drop-shadow-md"
        } ${isCenter ? "w-[95%] md:w-[85%] lg:w-[70%]" : "max-w-3xl"}`}
      >
        {title}
      </div>

      {/* Optional subtitle */}
      {subtitle && (
        <p
          className={`mt-3 text-sm md:text-base leading-relaxed max-w-2xl ${
            isLight ? "text-[#43474e]" : "text-white/80"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

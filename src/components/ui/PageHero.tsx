"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  /** Uppercase badge label */
  badge: string;
  /** Main hero title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Optional background image URL */
  backgroundImage?: string;
  /** Optional slot for CTA buttons, side cards, or stats */
  children?: React.ReactNode;
}

/**
 * PageHero — Unified hero section for sub-pages.
 * Uses the home page's dark hero pattern (bg-[#022448]) with:
 *   - Background image overlay + gradient
 *   - Giant watermark "KGEC" text
 *   - Bracketed badge + large title + subtitle
 *   - Optional children slot for CTAs or side content
 */
export default function PageHero({
  badge,
  title,
  subtitle,
  backgroundImage = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  children,
}: PageHeroProps) {
  return (
    <section className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="relative w-full rounded-2xl md:rounded-[32px] overflow-hidden bg-[#022448] min-h-[340px] md:min-h-[420px] flex items-center">
        {/* Background Image & Overlays */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#022448] via-[#022448]/80 to-transparent" />

        {/* Giant Watermark Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] sm:text-[12rem] lg:text-[20rem] font-bold text-white/[0.03] select-none pointer-events-none whitespace-nowrap">
          KGEC
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 p-6 md:p-12 lg:p-16 w-full"
        >
          {/* Badge */}
          <span className="text-sm font-semibold tracking-widest text-[#adc8f5] uppercase mb-4 block">
            {badge}
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            {title}
          </h1>

          {/* Accent Line + Subtitle */}
          {subtitle && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-[#76A9FA]" />
              </div>
              <p className="text-white/80 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed mb-8">
                {subtitle}
              </p>
            </>
          )}

          {/* Optional CTA or side content */}
          {children && <div className="mt-4">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface ContentCardProps {
  /** "white" = light surface, "dark" = navy, "accent" = secondary blue, "muted" = light blue */
  variant?: "white" | "dark" | "accent" | "muted";
  /** Content inside the card */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Whether to include hover lift animation */
  hover?: boolean;
  /** Framer Motion animation delay */
  delay?: number;
}

/**
 * ContentCard — Reusable card matching the home page card patterns.
 * Consistent rounded corners, shadows, hover effects, and entrance animations.
 */
export default function ContentCard({
  variant = "white",
  children,
  className = "",
  hover = true,
  delay = 0,
}: ContentCardProps) {
  const variantClasses = {
    white: "bg-white border border-slate-100 shadow-lg",
    dark: "bg-[#022448] text-white border border-white/5 shadow-xl",
    accent: "bg-[#225eaa] text-white border border-white/10 shadow-lg",
    muted: "bg-[#d5e3ff] text-[#022448] border border-[#adc8f5]/30 shadow-lg",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-[2rem] p-6 md:p-8 relative overflow-hidden ${
        variantClasses[variant]
      } ${hover ? "transition-transform hover:-translate-y-2" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

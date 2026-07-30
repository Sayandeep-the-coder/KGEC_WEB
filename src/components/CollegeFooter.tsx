"use client";

import React from "react";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const linkColumns = [
  {
    title: "ABOUT",
    links: ["About Us", "Vision & Mission", "History", "Administration"],
  },
  {
    title: "ACADEMICS",
    links: ["Departments", "Undergraduate", "Postgraduate", "Ph.D. Programs", "Academic Calendar"],
  },
  {
    title: "ADMISSIONS",
    links: ["B.Tech Admissions", "M.Tech Admissions", "Ph.D. Admissions", "How to Apply", "Important Dates"],
  },
  {
    title: "CAMPUS LIFE",
    links: ["Hostels", "Library", "Clubs & Societies", "Sports", "Facilities"],
  },
  {
    title: "PLACEMENTS",
    links: ["Placement Overview", "Recruiters", "Training & Skills", "Internships", "Placement Reports"],
  },
];

const socials = [
  { icon: FaFacebook, label: "Facebook" },
  { icon: FaLinkedin, label: "LinkedIn" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
];

export default function CollegeFooter() {
  return (
    <footer className="kgec-footer-wrapper">
      <div className="kgec-footer-container">
        
        {/* Watermark - placed absolutely so it stays in the background */}
        <div className="kgec-footer-watermark-wrapper">
          <motion.span 
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="kgec-footer-watermark" 
            aria-hidden="true"
          >
            KGEC
          </motion.span>
        </div>

        <div className="kgec-footer-content">
          <div className="kgec-footer-grid">
            
            {/* Logo + college identity */}
            <div className="kgec-footer-brand-section">
              <div className="kgec-footer-logo-title">
                {/* Logo with Fade-In Animation */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="kgec-footer-logo" 
                  aria-label="College logo"
                >
                  <Image src="/logo.png" alt="KGEC Logo" fill className="object-contain" sizes="(max-width: 640px) 80px, 96px" />
                </motion.div>

                <div>
                  <h2 className="kgec-footer-title">
                    Kalyani Government
                    <br />
                    Engineering College
                  </h2>
                  <p className="kgec-footer-subtitle">(Under MAKAUT, West Bengal)</p>
                  <p className="kgec-footer-estd">ESTD. 1995</p>
                </div>
              </div>

              <div className="kgec-footer-social-section">
                <p className="kgec-footer-social-heading">
                  Connect With Us
                </p>
                <div className="kgec-footer-social-links">
                  {socials.map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="kgec-footer-social-link"
                    >
                      <Icon className="kgec-footer-social-icon" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Link columns */}
            {linkColumns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="kgec-footer-nav">
                <h3 className="kgec-footer-nav-title">{col.title}</h3>
                <div className="kgec-footer-nav-divider" />
                <ul className="kgec-footer-nav-list">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="kgec-footer-nav-link">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="kgec-footer-bottom-bar">
            <p>© {new Date().getFullYear()} Kalyani Government Engineering College. All Rights Reserved.</p>
            <div className="kgec-footer-bottom-links">
              <a href="#" className="kgec-footer-bottom-link">Privacy Policy</a>
              <span className="kgec-footer-bottom-separator">|</span>
              <a href="#" className="kgec-footer-bottom-link">Terms of Use</a>
              <span className="kgec-footer-bottom-separator">|</span>
              <a href="#" className="kgec-footer-bottom-link">Accessibility Statement</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

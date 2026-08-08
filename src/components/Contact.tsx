"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setStatus({ type: "success", msg: "Thank you! Your message has been submitted." });
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        const errorMsg = json.issues?.[0]?.message || json.error || "Failed to submit message.";
        setStatus({ type: "error", msg: errorMsg });
      }
    } catch {
      setStatus({ type: "error", msg: "An unexpected network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-full flex flex-col justify-center overflow-hidden touch-pan-y">
      <div className="relative z-10 w-full h-[85vh] lg:h-[88vh] min-h-150 overflow-hidden rounded-2xl bg-slate-50/50 border border-slate-100 shadow-sm flex flex-col items-center justify-center py-4 px-2 md:px-6">
        
        <div className="relative z-10 flex flex-col justify-center max-w-[100rem] mx-auto w-full my-auto shrink-0">
          
          {/* Title area (Unified Design) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center w-full z-10 mb-4 md:mb-8 shrink-0"
          >
            <h1 className="relative w-fit px-4 uppercase mx-auto bg-[#225eaa]/5 border text-[#225eaa] border-[#225eaa]/30 text-sm md:text-base font-light leading-none py-1.5 inline-block z-10 mb-4 tracking-wider">
              Contact Us
              <span className="absolute w-0.75 h-0.75 bg-[#022448]/60 z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2"></span>
              <span className="absolute w-0.75 h-0.75 bg-[#022448]/60 z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2"></span>
              <span className="corner-dot-bl absolute w-0.75 h-0.75 bg-[#022448]/60 z-10 bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></span>
              <span className="corner-dot-br absolute w-0.75 h-0.75 bg-[#022448]/60 z-10 bottom-0 right-0 translate-x-1/2 translate-y-1/2"></span>
            </h1>

            <div className="flex justify-center px-5 z-10 w-full">
              <div className="text-center shrink-0 mt-1 text-2xl md:text-3xl lg:text-[36px] capitalize leading-tight w-full whitespace-nowrap font-medium text-[#022448] drop-shadow-sm">
                Get In Touch With Us.
              </div>
            </div>
          </motion.div>

          {/* Main Content Container (The white card from the image) */}
          <div className="w-full max-w-5xl mx-auto z-10 bg-white rounded-3xl p-2 md:p-4 shadow-[0_0_50px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col lg:flex-row gap-3 shrink-0">
            
            {/* Left Panel: Reach Out */}
            <div className="hidden md:flex flex-1 w-full bg-[#f8fafc] rounded-[1.25rem] p-5 md:p-8 flex-col justify-center border border-slate-50 shrink-0">
              <h3 className="text-xl md:text-2xl font-bold text-[#022448] mb-2">Reach Out</h3>
              <p className="text-slate-500 mb-6 text-xs md:text-sm leading-relaxed max-w-sm">
                Have questions about admissions, placements, or campus facilities? We&apos;d love to hear from you. Fill out the form or use our direct contact info.
              </p>

              <div className="space-y-4">
                {/* Geotag / Address */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 items-center mb-1">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center text-blue-600">
                      <MapPin size={16} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-semibold text-slate-900 mb-0.5 text-xs md:text-sm">Address</h4>
                      <p className="text-slate-500 text-[11px] md:text-xs leading-relaxed">
                        Kalyani Government Engineering College, Nadia, 741235
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-32 md:h-40 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.3916962291585!2d88.4452140149683!3d22.97813098497551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f894819d2dbd83%3A0xc6c429fcb1509618!2sKalyani%20Government%20Engineering%20College!5e0!3m2!1sen!2sin!4v1689260655294!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="KGEC Location"
                    ></iframe>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 items-center">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center text-blue-600">
                    <Mail size={16} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-semibold text-slate-900 mb-0.5 text-xs md:text-sm">Email</h4>
                    <a href="mailto:contact@kgec.edu.in" className="text-slate-500 text-[11px] md:text-xs hover:text-blue-600 transition-colors">
                      contact@kgec.edu.in
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3 items-center">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center text-blue-600">
                    <Phone size={16} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-semibold text-slate-900 mb-0.5 text-xs md:text-sm">Phone</h4>
                    <a href="tel:+913325821309" className="text-slate-500 text-[11px] md:text-xs hover:text-blue-600 transition-colors">
                      +91 33 2582 1309
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Form */}
            <div className="flex-1 w-full p-4 md:p-6 flex flex-col justify-center shrink-0">
              
              {status && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold mb-4 flex items-center gap-2 ${
                    status.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{status.msg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] md:text-xs font-semibold text-slate-700 block">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 shadow-sm"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] md:text-xs font-semibold text-slate-700 block">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 shadow-sm"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[11px] md:text-xs font-semibold text-slate-700 block">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 shadow-sm"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[11px] md:text-xs font-semibold text-slate-700 block">Message</label>
                  <textarea
                    rows={3}
                    placeholder="How can we help you?"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 resize-none shadow-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 mt-1 bg-linear-to-r from-blue-600 to-[#1e3a5f] hover:from-blue-700 hover:to-[#0f2544] text-white text-[13px] font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  {!loading && <Send size={14} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Train,
  Plane,
  Car,
  Sparkles,
  Building2,
  Briefcase
} from "lucide-react";

const TRAVEL_GUIDE = [
  {
    title: "By Suburban Railway",
    icon: Train,
    summary: "Kalyani Main Railway Station",
    details:
      "Frequent local EMU trains operate on the Sealdah–Ranaghat / Shantipur / Krishnanagar line (~1 hr 15 mins from Sealdah Station, Kolkata). Local e-rickshaws (totos) and auto-rickshaws connect Kalyani Main station to the KGEC campus in 10–15 minutes.",
  },
  {
    title: "By Airway",
    icon: Plane,
    summary: "Netaji Subhash Chandra Bose Airport (CCU)",
    details:
      "The campus is located approximately 45–50 km north of Netaji Subhash Chandra Bose International Airport, Kolkata. Taxis and app-based cabs connect the airport to Kalyani via Kalyani Expressway in ~1 hour.",
  },
  {
    title: "By Roadway & Expressway",
    icon: Car,
    summary: "Kalyani Expressway & NH-12",
    details:
      "Well connected to Kolkata and other parts of West Bengal via the 4-lane Kalyani Expressway and National Highway 12 (NH-12). Regular state and private express buses connect Kalyani to major transit hubs.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
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
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok) {
        setStatus({ type: "success", msg: "Thank you! Your message has been submitted to college administration." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorMsg = json.issues?.[0]?.message || json.error || "Failed to submit message. Please verify all fields.";
        setStatus({ type: "error", msg: errorMsg });
      }
    } catch {
      setStatus({ type: "error", msg: "An unexpected network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Connect & Reach Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif">
                Contact KGEC & How to Reach Us
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Connect with administrative officers, training & placement representatives, and view detailed transit routes to our green 75-acre Kalyani campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Section: How to Reach Us */}
        <section>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
              CAMPUS ACCESSIBILITY
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              How to Reach KGEC
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Strategically located in the planned township of Kalyani with seamless road, rail, and air access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRAVEL_GUIDE.map((g) => {
              const Icon = g.icon;
              return (
                <div
                  key={g.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-1">{g.title}</h3>
                    <div className="text-xs font-bold text-[#2E5C9E] mb-2">{g.summary}</div>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{g.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Contact Directories & Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Campus Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-[#2E5C9E] shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A] mb-1">Campus Location</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Kalyani Government Engineering College<br />
                  Kalyani, Nadia, West Bengal 741235, India
                </p>
              </div>
            </div>

            {/* Placement Cell Desk Contacts */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-[#2E5C9E] shrink-0">
                <Briefcase size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A] mb-1">
                  Training & Placement Cell
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Official Email: <a href="mailto:tnp_kgec@kgec.edu.in" className="text-[#2E5C9E] font-semibold hover:underline">tnp_kgec@kgec.edu.in</a>
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Student Cell: <a href="mailto:sctp@kgec.edu.in" className="text-[#2E5C9E] font-semibold hover:underline">sctp@kgec.edu.in</a>
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Phone: <a href="tel:+917908124815" className="text-[#2E5C9E] font-semibold hover:underline">+91 79081 24815</a> / <a href="tel:+919832766191" className="text-[#2E5C9E] font-semibold hover:underline">+91 98327 66191</a>
                </p>
              </div>
            </div>

            {/* General Administration Contacts */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-[#2E5C9E] shrink-0">
                <Building2 size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A] mb-1">Administration & Principal</h3>
                <p className="text-xs text-[#6B7280]">
                  Email: <a href="mailto:principal@kgec.edu.in" className="text-[#2E5C9E] font-semibold hover:underline">principal@kgec.edu.in</a>
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Phone: +91 33 2582 1309 / +91 33 2582 6680
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold font-serif text-[#1B2A4A] mb-2">Send Us an Enquiry</h2>
            <p className="text-xs text-[#6B7280] mb-6">
              Messages will be routed directly to the relevant college department.
            </p>

            {status && (
              <div
                className={`p-4 rounded-xl text-xs font-semibold mb-6 flex items-center gap-2 ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{status.msg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#2E5C9E] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#2E5C9E] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                  Message / Purpose of Visit
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="State your query regarding admissions, campus recruitment, or guest visits..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#2E5C9E] focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-full bg-[#1B2A4A] text-white font-bold text-xs hover:bg-[#2E5C9E] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send size={14} />
                <span>{loading ? "Submitting..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

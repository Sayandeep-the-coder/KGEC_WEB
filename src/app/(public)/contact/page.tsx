"use client";

import { useState } from "react";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";

import {
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Train,
  Plane,
  Car,
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
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Connect & Reach Us"
        title="Contact KGEC & How to Reach Us"
        subtitle="Connect with administrative officers, training & placement representatives, and view detailed transit routes to our green 75-acre Kalyani campus."
      />

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Section: How to Reach Us */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="CAMPUS ACCESSIBILITY"
                title="How to Reach KGEC"
                subtitle="Strategically located in the planned township of Kalyani with seamless road, rail, and air access."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {TRAVEL_GUIDE.map((g, idx) => {
                  const Icon = g.icon;
                  return (
                    <ContentCard key={g.title} variant="white" delay={idx * 0.1} className="h-full flex flex-col justify-between group hover:border-[#225eaa]">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] flex items-center justify-center mb-5 group-hover:bg-[#225eaa] group-hover:text-white transition-colors">
                          <Icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[#022448] mb-1 group-hover:text-[#225eaa] transition-colors">{g.title}</h3>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#225eaa] mb-4">{g.summary}</div>
                        <p className="text-sm text-[#43474e] leading-relaxed font-medium">{g.details}</p>
                      </div>
                    </ContentCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Contact Directories & Form */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Contact Details Cards */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Campus Address Card */}
                <ContentCard variant="white" hover={false} className="flex items-start gap-5 shadow-sm">
                  <div className="p-3.5 rounded-2xl bg-blue-50 text-[#225eaa] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#022448] mb-2">Campus Location</h3>
                    <p className="text-sm text-[#43474e] leading-relaxed font-medium">
                      Kalyani Government Engineering College<br />
                      Kalyani, Nadia, West Bengal 741235, India
                    </p>
                  </div>
                </ContentCard>

                {/* Placement Cell Desk Contacts */}
                <ContentCard variant="white" hover={false} className="flex items-start gap-5 shadow-sm">
                  <div className="p-3.5 rounded-2xl bg-blue-50 text-[#225eaa] shrink-0">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#022448] mb-2">
                      Training & Placement Cell
                    </h3>
                    <div className="space-y-1.5 text-sm text-[#43474e] font-medium">
                      <p>
                        Official Email: <a href="mailto:tnp_kgec@kgec.edu.in" className="text-[#225eaa] font-bold hover:underline">tnp_kgec@kgec.edu.in</a>
                      </p>
                      <p>
                        Student Cell: <a href="mailto:sctp@kgec.edu.in" className="text-[#225eaa] font-bold hover:underline">sctp@kgec.edu.in</a>
                      </p>
                      <p>
                        Phone: <a href="tel:+917908124815" className="text-[#225eaa] font-bold hover:underline">+91 79081 24815</a> / <a href="tel:+919832766191" className="text-[#225eaa] font-bold hover:underline">+91 98327 66191</a>
                      </p>
                    </div>
                  </div>
                </ContentCard>

                {/* General Administration Contacts */}
                <ContentCard variant="white" hover={false} className="flex items-start gap-5 shadow-sm">
                  <div className="p-3.5 rounded-2xl bg-blue-50 text-[#225eaa] shrink-0">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#022448] mb-2">Administration & Principal</h3>
                    <div className="space-y-1.5 text-sm text-[#43474e] font-medium">
                      <p>
                        Email: <a href="mailto:principal@kgec.edu.in" className="text-[#225eaa] font-bold hover:underline">principal@kgec.edu.in</a>
                      </p>
                      <p>
                        Phone: +91 33 2582 1309 / +91 33 2582 6680
                      </p>
                    </div>
                  </div>
                </ContentCard>
              </div>

              {/* Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 md:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold font-serif text-[#022448] mb-3">Send Us an Enquiry</h2>
                  <p className="text-sm text-[#43474e] font-medium mb-8">
                    Messages will be routed directly to the relevant college department.
                  </p>

                  {status && (
                    <div
                      className={`p-4 rounded-xl text-sm font-bold mb-8 flex items-center gap-3 ${
                        status.type === "success"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                      <span>{status.msg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#022448] block mb-2">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm text-[#022448] font-medium focus:border-[#225eaa] focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#022448] block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm text-[#022448] font-medium focus:border-[#225eaa] focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#022448] block mb-2">
                        Message / Purpose of Visit
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="State your query regarding admissions, campus recruitment, or guest visits..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm text-[#022448] font-medium focus:border-[#225eaa] focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-xl bg-[#022448] hover:bg-[#225eaa] shadow-lg shadow-blue-900/20 text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={16} />
                      <span>{loading ? "Submitting Request..." : "Send Secure Message"}</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}

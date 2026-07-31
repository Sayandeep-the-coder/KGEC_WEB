"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

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
        setStatus({ type: "error", msg: json.error || "Failed to submit message." });
      }
    } catch {
      setStatus({ type: "error", msg: "An unexpected network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            Contact KGEC Administration
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            Have questions regarding admissions, academics, or campus visits? Reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-kgec-blue shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Campus Location</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kalyani Government Engineering College<br />
                  Kalyani, Nadia, West Bengal 741235, India
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-kgec-blue shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Official Email</h3>
                <p className="text-xs text-slate-600">contact@kgec.ac.in</p>
                <p className="text-xs text-slate-600">principal@kgec.ac.in</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-kgec-blue shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Phone Enquiries</h3>
                <p className="text-xs text-slate-600">+91 33 2582 1309</p>
                <p className="text-xs text-slate-600">+91 33 2582 6680</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold font-serif text-slate-900 mb-2">Send Us a Message</h2>
            <p className="text-xs text-slate-500 mb-6">Submissions are delivered directly to college administration.</p>

            {status && (
              <div className={`p-4 rounded-xl text-xs font-semibold mb-6 flex items-center gap-2 ${
                status.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{status.msg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:border-kgec-blue focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:border-kgec-blue focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your enquiry message here (minimum 10 characters)..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:border-kgec-blue focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-full bg-kgec-navy text-white font-bold text-xs hover:bg-kgec-blue transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send size={14} />
                <span>{loading ? "Submitting..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

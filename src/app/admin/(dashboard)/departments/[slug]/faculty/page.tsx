"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, UserPlus, Trash2, Mail, Phone, BookOpen, GraduationCap, Building2, Users } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface StaffMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  role: string;
  email?: string | null;
  phone?: string | null;
  specialization?: string | null;
  qualification?: string | null;
  photoUrl?: string | null;
}

export default function DepartmentFacultyAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const deptCode = slug.toLowerCase();
  const deptNameUpper = slug.toUpperCase();

  const [facultyList, setFacultyList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("Assistant Professor");
  const [role] = useState("faculty");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualification, setQualification] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const refreshFaculty = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/staff?department=${deptCode}&limit=100`);
      const json = await res.json();
      if (json.data) {
        setFacultyList(json.data);
      }
    } catch {
      // Ignore network errors on refresh
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadFaculty() {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/staff?department=${deptCode}&limit=100`);
        const json = await res.json();
        if (!ignore && json.data) {
          setFacultyList(json.data);
        }
      } catch (err) {
        console.error("Failed to load department faculty:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadFaculty();
    return () => {
      ignore = true;
    };
  }, [deptCode]);

  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/v1/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          designation,
          department: deptCode,
          role,
          email: email || undefined,
          phone: phone || undefined,
          specialization: specialization || undefined,
          qualification: qualification || undefined,
          photoUrl: photoUrl || undefined,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: `Faculty member "${name}" added successfully.` });
        setName("");
        setEmail("");
        setPhone("");
        setSpecialization("");
        setQualification("");
        setPhotoUrl("");
        await refreshFaculty();
      } else {
        setMessage({ type: "error", text: json.error || "Failed to add faculty member." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error adding faculty member." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, memberName: string) => {
    if (!confirm(`Are you sure you want to remove "${memberName}" from the ${deptNameUpper} faculty roster?`)) return;

    try {
      const res = await fetch(`/api/v1/staff/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: `Removed ${memberName} successfully.` });
        await refreshFaculty();
      } else {
        const json = await res.json();
        setMessage({ type: "error", text: json.error || "Failed to delete faculty member." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error deleting faculty member." });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl pb-10">
      {/* Header */}
      <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#225eaa] mb-4 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold shadow-inner">
              <Users size={26} />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-[#022448] uppercase">
                {deptNameUpper} Faculty Management
              </h1>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                Departmental Roster & Faculty Directory for {deptNameUpper}
              </p>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`p-5 rounded-2xl text-sm font-bold shadow-inner ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-100 text-emerald-800"
              : "bg-red-50 border border-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Add New Faculty Form */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <UserPlus size={20} className="text-indigo-600" />
          </div>
          <h2 className="text-lg font-bold text-[#022448]">Add New {deptNameUpper} Faculty Member</h2>
        </div>

        <form onSubmit={handleAddFaculty} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Sourav Chakraborty"
              className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Designation *</label>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium cursor-pointer transition-all"
            >
              <option value="Professor & Head of Department">Professor & Head of Department</option>
              <option value="Professor">Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Technical Assistant">Technical Assistant</option>
              <option value="Guest Lecturer">Guest Lecturer</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. faculty@kgec.ac.in"
              className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 9876543210"
              className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Qualification</label>
            <input
              type="text"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="e.g. Ph.D. in Computer Science"
              className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Specialization / Research</label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="e.g. AI, Machine Learning, VLSI"
              className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <FileUpload
              label="Faculty Photo (Upload file)"
              bucket="staff"
              accept="image/*"
              value={photoUrl}
              onChange={(url) => setPhotoUrl(url)}
              helperText="Drag & drop faculty photo or click to browse"
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="py-4 px-8 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center sm:justify-start gap-3 transition-all cursor-pointer shadow-md shadow-blue-900/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
            >
              <UserPlus size={18} />
              <span>{submitting ? "Adding Faculty..." : "Add Faculty Member"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Current Faculty List */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-[#022448]">Current {deptNameUpper} Faculty <span className="text-slate-400 font-medium text-sm ml-2">({facultyList.length})</span></h2>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm font-medium text-slate-500">Loading department faculty...</div>
        ) : facultyList.length === 0 ? (
          <div className="py-20 text-center text-sm font-medium text-slate-500">
            No faculty members listed for {deptNameUpper} department yet. Use the form above to add faculty.
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {facultyList.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-slate-50/50 hover:bg-white border border-slate-200 hover:border-[#225eaa] rounded-3xl p-6 flex flex-col justify-between space-y-5 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden text-[#022448] text-xl font-bold shadow-inner">
                    {faculty.photoUrl ? (
                      <img src={faculty.photoUrl} alt={faculty.name} className="w-full h-full object-cover" />
                    ) : (
                      faculty.name.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-base font-bold text-[#022448]">{faculty.name}</h3>
                    <span className="inline-block px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">{faculty.designation}</span>
                    {faculty.qualification && (
                      <p className="text-xs text-slate-600 flex items-start gap-2 mt-2 font-medium">
                        <GraduationCap size={16} className="shrink-0 text-slate-400 mt-0.5" />
                        <span className="leading-snug">{faculty.qualification}</span>
                      </p>
                    )}
                    {faculty.specialization && (
                      <p className="text-xs text-slate-600 flex items-start gap-2 font-medium mt-1">
                        <BookOpen size={16} className="shrink-0 text-slate-400 mt-0.5" />
                        <span className="leading-snug">{faculty.specialization}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="space-y-1.5">
                    {faculty.email && (
                      <div className="flex items-center gap-2 hover:text-[#225eaa] transition-colors">
                        <Mail size={14} className="text-slate-400" />
                        <a href={`mailto:${faculty.email}`}>{faculty.email}</a>
                      </div>
                    )}
                    {faculty.phone && (
                      <div className="flex items-center gap-2 hover:text-[#225eaa] transition-colors">
                        <Phone size={14} className="text-slate-400" />
                        <a href={`tel:${faculty.phone}`}>{faculty.phone}</a>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(faculty.id, faculty.name)}
                    className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl transition-colors cursor-pointer self-end"
                    title="Delete faculty member"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

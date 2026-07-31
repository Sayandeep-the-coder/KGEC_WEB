"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, UserPlus, Trash2, Mail, Phone, BookOpen, GraduationCap, Building2 } from "lucide-react";
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
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-2 transition-colors font-medium"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold shadow-sm">
              <Building2 size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif text-slate-900 uppercase">
                {deptNameUpper} Faculty Management
              </h1>
              <p className="text-xs text-slate-500">
                Departmental Roster & Faculty Directory for {deptNameUpper}
              </p>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Add New Faculty Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <UserPlus size={20} className="text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">Add New {deptNameUpper} Faculty Member</h2>
        </div>

        <form onSubmit={handleAddFaculty} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Sourav Chakraborty"
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Designation *</label>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
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
            <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. faculty@kgec.ac.in"
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 9876543210"
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Qualification</label>
            <input
              type="text"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="e.g. Ph.D. in Computer Science (IIT Kharagpur)"
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Specialization / Research Interests</label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="e.g. Artificial Intelligence, Machine Learning, VLSI"
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
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

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-[#0f2552] hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-50 shadow-md"
            >
              {submitting ? "Adding Faculty..." : "Add Faculty Member"}
            </button>
          </div>
        </form>
      </div>

      {/* Current Faculty List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900">Current {deptNameUpper} Faculty ({facultyList.length})</h2>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500">Loading department faculty...</div>
        ) : facultyList.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No faculty members listed for {deptNameUpper} department yet. Use the form above to add faculty.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facultyList.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden text-slate-600 font-bold shadow-sm">
                    {faculty.photoUrl ? (
                      <img src={faculty.photoUrl} alt={faculty.name} className="w-full h-full object-cover" />
                    ) : (
                      faculty.name.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{faculty.name}</h3>
                    <span className="text-[11px] font-semibold text-blue-700 block">{faculty.designation}</span>
                    {faculty.qualification && (
                      <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mt-1">
                        <GraduationCap size={13} className="shrink-0 text-slate-400" />
                        {faculty.qualification}
                      </p>
                    )}
                    {faculty.specialization && (
                      <p className="text-[11px] text-slate-600 flex items-center gap-1.5">
                        <BookOpen size={13} className="shrink-0 text-slate-400" />
                        {faculty.specialization}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="space-y-0.5">
                    {faculty.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail size={12} className="text-slate-400" />
                        <span>{faculty.email}</span>
                      </div>
                    )}
                    {faculty.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400" />
                        <span>{faculty.phone}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(faculty.id, faculty.name)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete faculty member"
                  >
                    <Trash2 size={16} />
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

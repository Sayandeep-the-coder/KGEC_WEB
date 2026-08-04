"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Search, CheckCircle2, AlertCircle, Pencil, X, Save, Users } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  role: string;
  department: string | null;
  designation: string | null;
  photoUrl: string | null;
  phone: string | null;
}

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedDept, setSelectedDept] = useState("all");

  // Create Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState("faculty");
  const [department, setDepartment] = useState("cse");
  const [designation, setDesignation] = useState("Assistant Professor");
  const [photoUrl, setPhotoUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit Modal State (PATCH API)
  const [editingItem, setEditingItem] = useState<StaffMember | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editEmployeeId, setEditEmployeeId] = useState("");
  const [editRole, setEditRole] = useState("faculty");
  const [editDepartment, setEditDepartment] = useState("cse");
  const [editDesignation, setEditDesignation] = useState("");
  const [editPhotoUrl, setEditPhotoUrl] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [updating, setUpdating] = useState(false);

  const refreshStaff = async () => {
    try {
      const res = await fetch("/api/v1/staff?limit=100");
      const json = await res.json();
      if (json.data) setStaff(json.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch("/api/v1/staff?limit=100");
        const json = await res.json();
        if (!ignore && json.data) setStaff(json.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/v1/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          employeeId,
          role,
          department: department || undefined,
          designation: designation || undefined,
          photoUrl: photoUrl || undefined,
          phone: phone || undefined,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Staff record created successfully!" });
        setName("");
        setEmail("");
        setEmployeeId("");
        setPhotoUrl("");
        setPhone("");
        await refreshStaff();
      } else {
        setMessage({ type: "error", text: json.error || "Failed to add staff member." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error adding staff member." });
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (member: StaffMember) => {
    setEditingItem(member);
    setEditName(member.name);
    setEditEmail(member.email);
    setEditEmployeeId(member.employeeId);
    setEditRole(member.role);
    setEditDepartment(member.department || "cse");
    setEditDesignation(member.designation || "");
    setEditPhotoUrl(member.photoUrl || "");
    setEditPhone(member.phone || "");
  };

  const handleUpdateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/v1/staff/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          employeeId: editEmployeeId,
          role: editRole,
          department: editDepartment || undefined,
          designation: editDesignation || undefined,
          photoUrl: editPhotoUrl || undefined,
          phone: editPhone || undefined,
        }),
      });

      if (res.ok) {
        setEditingItem(null);
        await refreshStaff();
      } else {
        alert("Failed to update staff record.");
      }
    } catch (err) {
      console.error("Error patching staff record:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this staff record?")) return;
    try {
      const res = await fetch(`/api/v1/staff/${id}`, { method: "DELETE" });
      if (res.ok) await refreshStaff();
    } catch (err) {
      console.error("Error deleting staff record:", err);
    }
  };

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    const matchesDept = selectedDept === "all" || (member.department && member.department.toLowerCase() === selectedDept.toLowerCase());

    return matchesSearch && matchesRole && matchesDept;
  });

  return (
    <div className="space-y-8 max-w-6xl pb-10">
      <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#225eaa]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex items-start gap-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-[#022448] flex items-center justify-center font-bold shadow-inner">
            <Users size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#022448]">Staff & Faculty Directory</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Manage administration profiles, officers, and departmental faculty directory.</p>
          </div>
        </div>
      </div>

      {/* Add Staff Card */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#022448] border-b border-slate-100 pb-4">Add Staff / Faculty Member</h2>

        {message && (
          <div
            className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${
              message.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-red-50 text-red-800 border border-red-100"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sourav@kgec.ac.in"
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Employee ID *</label>
              <input
                type="text"
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="EMP-1001"
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium font-mono transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Role *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium cursor-pointer transition-all"
              >
                <option value="principal">Principal</option>
                <option value="registrar">Registrar</option>
                <option value="accounts_officer">Accounts Officer</option>
                <option value="hod">Head of Department (HOD)</option>
                <option value="hostel_super">Hostel Superintendent</option>
                <option value="caretaker">Caretaker</option>
                <option value="faculty">Faculty Member</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium cursor-pointer transition-all"
              >
                <option value="cse">CSE</option>
                <option value="it">IT</option>
                <option value="ece">ECE</option>
                <option value="ee">EE</option>
                <option value="me">ME</option>
                <option value="mca">MCA</option>
                <option value="mtech">M.Tech</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. Professor & HOD"
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <FileUpload
              label="Staff Photo (Upload image)"
              bucket="staff"
              accept="image/*"
              value={photoUrl}
              onChange={(url) => setPhotoUrl(url)}
              helperText="Drag & drop staff photo or click to browse"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="py-3.5 px-6 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center sm:justify-start gap-3 transition-all cursor-pointer shadow-md shadow-blue-900/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
          >
            <Plus size={16} />
            <span>{submitting ? "Adding..." : "Add Staff Profile"}</span>
          </button>
        </form>
      </div>

      {/* Staff Directory Table */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-[#022448]">Directory <span className="text-slate-400 font-medium text-sm ml-2">({filteredStaff.length})</span></h2>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search staff..."
                className="w-full sm:w-56 bg-slate-50 text-[#022448] text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] font-medium transition-all"
              />
              <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            </div>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 text-[#022448] text-sm rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:border-[#225eaa] font-medium cursor-pointer transition-all"
            >
              <option value="all">All Depts</option>
              <option value="cse">CSE</option>
              <option value="it">IT</option>
              <option value="ece">ECE</option>
              <option value="ee">EE</option>
              <option value="me">ME</option>
              <option value="mca">MCA</option>
            </select>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 text-[#022448] text-sm rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:border-[#225eaa] font-medium cursor-pointer transition-all"
            >
              <option value="all">All Roles</option>
              <option value="principal">Principal</option>
              <option value="registrar">Registrar</option>
              <option value="hod">HOD</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">Loading staff records...</p>
        ) : filteredStaff.length === 0 ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">No staff records found matching criteria.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th className="pb-4 px-3">Name</th>
                  <th className="pb-4 px-3">Employee ID</th>
                  <th className="pb-4 px-3">Role</th>
                  <th className="pb-4 px-3">Department</th>
                  <th className="pb-4 px-3">Email</th>
                  <th className="pb-4 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-3 font-semibold text-[#022448]">{member.name}</td>
                    <td className="py-4 px-3 font-mono text-[11px] text-slate-500">{member.employeeId}</td>
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-[#225eaa] border border-blue-100">
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4 px-3 uppercase text-slate-600 font-bold text-[11px]">{member.department || "—"}</td>
                    <td className="py-4 px-3 text-slate-500 font-medium">{member.email}</td>
                    <td className="py-4 px-3 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(member)}
                        className="p-2 rounded-lg text-slate-600 hover:text-[#225eaa] hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100"
                        title="Edit Staff Member"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-100"
                        title="Delete staff record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Staff Member Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-[2rem] max-w-2xl w-full p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#022448] flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Pencil size={20} className="text-[#225eaa]" />
                </div>
                Edit Staff Profile
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-[#022448] hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateStaff} className="space-y-6 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Employee ID</label>
                  <input
                    type="text"
                    required
                    value={editEmployeeId}
                    onChange={(e) => setEditEmployeeId(e.target.value)}
                    className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium font-mono transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Role</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium cursor-pointer transition-all"
                  >
                    <option value="principal">Principal</option>
                    <option value="registrar">Registrar</option>
                    <option value="accounts_officer">Accounts Officer</option>
                    <option value="hod">HOD</option>
                    <option value="hostel_super">Hostel Super</option>
                    <option value="caretaker">Caretaker</option>
                    <option value="faculty">Faculty Member</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Department</label>
                  <select
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium cursor-pointer transition-all"
                  >
                    <option value="cse">CSE</option>
                    <option value="it">IT</option>
                    <option value="ece">ECE</option>
                    <option value="ee">EE</option>
                    <option value="me">ME</option>
                    <option value="mca">MCA</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Designation</label>
                  <input
                    type="text"
                    value={editDesignation}
                    onChange={(e) => setEditDesignation(e.target.value)}
                    className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <FileUpload
                  label="Update Photo"
                  bucket="staff"
                  accept="image/*"
                  value={editPhotoUrl}
                  onChange={(url) => setEditPhotoUrl(url)}
                />
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{updating ? "Saving..." : "Save Changes"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#022448] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

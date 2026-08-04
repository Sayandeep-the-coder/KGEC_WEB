"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Search, CheckCircle2, AlertCircle, Pencil, X, Save, Calendar } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface EventItem {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  location: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Create Form State
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit Modal State (PATCH API)
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  const refreshEvents = async () => {
    try {
      const res = await fetch("/api/v1/events?limit=100");
      const json = await res.json();
      if (json.data) setEvents(json.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch("/api/v1/events?limit=100");
        const json = await res.json();
        if (!ignore && json.data) setEvents(json.data);
      } catch (err) {
        console.error("Error fetching events:", err);
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
      const res = await fetch("/api/v1/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          eventDate,
          location: location || undefined,
          description: description || undefined,
          imageUrl: imageUrl || undefined,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Event added to campus calendar successfully!" });
        setTitle("");
        setEventDate("");
        setLocation("");
        setDescription("");
        setImageUrl("");
        await refreshEvents();
      } else {
        setMessage({ type: "error", text: json.error || "Failed to add event." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error adding event." });
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (item: EventItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditEventDate(item.eventDate ? item.eventDate.split("T")[0] : "");
    setEditLocation(item.location || "");
    setEditDescription(item.description || "");
    setEditImageUrl(item.imageUrl || "");
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/v1/events/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          eventDate: editEventDate,
          location: editLocation || undefined,
          description: editDescription || undefined,
          imageUrl: editImageUrl || undefined,
        }),
      });

      if (res.ok) {
        setEditingItem(null);
        await refreshEvents();
      } else {
        alert("Failed to update event.");
      }
    } catch (err) {
      console.error("Error patching event:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/v1/events/${id}`, { method: "DELETE" });
      if (res.ok) await refreshEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const filteredEvents = events.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl pb-10">
      <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center font-bold shadow-inner">
            <Calendar size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#022448]">Events Calendar</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Schedule, edit, and manage upcoming campus events, fests, and academic symposia.</p>
          </div>
        </div>
      </div>

      {/* Add Event Form */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#022448] border-b border-slate-100 pb-4">Add Event to Calendar</h2>

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
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Event Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Cultural Fest 'Esmeralda 2026'"
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Event Date *</label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Venue / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Main Auditorium / College Playground"
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short event overview or schedule details..."
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <FileUpload
              label="Event Banner / Poster (Upload image)"
              bucket="gallery"
              accept="image/*"
              value={imageUrl}
              onChange={(url) => setImageUrl(url)}
              helperText="Drag & drop event poster or click to browse"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="py-3.5 px-6 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center sm:justify-start gap-3 transition-all cursor-pointer shadow-md shadow-blue-900/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
          >
            <Plus size={16} />
            <span>{submitting ? "Adding Event..." : "Add Event to Calendar"}</span>
          </button>
        </form>
      </div>

      {/* Scheduled Events List */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-[#022448]">Scheduled Events <span className="text-slate-400 font-medium text-sm ml-2">({filteredEvents.length})</span></h2>

          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full sm:w-64 bg-slate-50 text-[#022448] text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] font-medium transition-all"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          </div>
        </div>

        {loading ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">No events found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th className="pb-4 px-3">Title</th>
                  <th className="pb-4 px-3">Date</th>
                  <th className="pb-4 px-3">Location</th>
                  <th className="pb-4 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEvents.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-3 font-semibold text-[#022448] max-w-md truncate">{item.title}</td>
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-purple-50 text-purple-700 border border-purple-100">
                        {new Date(item.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-slate-500 font-medium">{item.location || "Main Campus"}</td>
                    <td className="py-4 px-3 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-lg text-slate-600 hover:text-[#225eaa] hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100"
                        title="Edit Event"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-100"
                        title="Delete event"
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

      {/* Edit Event Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-[2rem] max-w-md w-full p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#022448] flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Pencil size={20} className="text-[#225eaa]" />
                </div>
                Edit Event
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-[#022448] hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateEvent} className="space-y-6 text-sm">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Event Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Event Date</label>
                <input
                  type="date"
                  required
                  value={editEventDate}
                  onChange={(e) => setEditEventDate(e.target.value)}
                  className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Location / Venue</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                />
              </div>

              <div>
                <FileUpload
                  label="Update Poster"
                  bucket="gallery"
                  accept="image/*"
                  value={editImageUrl}
                  onChange={(url) => setEditImageUrl(url)}
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

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Search, CheckCircle2, AlertCircle, Pencil, X, Save, Image as ImageIcon } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface GalleryImage {
  id: string;
  album: string;
  imageUrl: string;
  caption: string | null;
  uploadedAt: string;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Create Form state
  const [album, setAlbum] = useState("campus");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit Modal State (PATCH API)
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [editAlbum, setEditAlbum] = useState("campus");
  const [editCaption, setEditCaption] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  const refreshGallery = async () => {
    try {
      const res = await fetch("/api/v1/gallery?limit=100");
      const json = await res.json();
      if (json.data) setImages(json.data);
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch("/api/v1/gallery?limit=100");
        const json = await res.json();
        if (!ignore && json.data) setImages(json.data);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
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
    if (!imageUrl) {
      setMessage({ type: "error", text: "Please upload an image file first." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/v1/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          album: album.trim() || "campus",
          imageUrl,
          caption: caption || undefined,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Photo added to gallery successfully!" });
        setImageUrl("");
        setCaption("");
        await refreshGallery();
      } else {
        setMessage({ type: "error", text: json.error || "Failed to add image." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error creating gallery image." });
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (img: GalleryImage) => {
    setEditingItem(img);
    setEditAlbum(img.album);
    setEditCaption(img.caption || "");
    setEditImageUrl(img.imageUrl);
  };

  const handleUpdateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/v1/gallery/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          album: editAlbum,
          caption: editCaption || undefined,
          imageUrl: editImageUrl,
        }),
      });

      if (res.ok) {
        setEditingItem(null);
        await refreshGallery();
      } else {
        alert("Failed to update photo details.");
      }
    } catch (err) {
      console.error("Error patching gallery image:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo from gallery?")) return;
    try {
      const res = await fetch(`/api/v1/gallery/${id}`, { method: "DELETE" });
      if (res.ok) await refreshGallery();
    } catch (err) {
      console.error("Error deleting gallery image:", err);
    }
  };

  const filteredImages = images.filter(
    (img) =>
      img.album.toLowerCase().includes(search.toLowerCase()) ||
      (img.caption && img.caption.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-6xl pb-10">
      <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-pink-50 border border-pink-100 text-pink-600 flex items-center justify-center font-bold shadow-inner">
            <ImageIcon size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#022448]">Media Gallery</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Upload and manage campus photo albums, events, and student activities.</p>
          </div>
        </div>
      </div>

      {/* Add Photo Card */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#022448] border-b border-slate-100 pb-4">Upload Photo</h2>

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Album Category *</label>
              <input
                type="text"
                required
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="e.g. campus, fest2026, sports, hackathon, convocation"
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Caption (Optional)</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Annual Sports Tournament Final Match"
                className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <FileUpload
              label="Select Photo File (Upload Image)"
              bucket="gallery"
              accept="image/*"
              value={imageUrl}
              onChange={(url) => setImageUrl(url)}
              helperText="Drag & drop campus photo or click to browse"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="py-3.5 px-6 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center sm:justify-start gap-3 transition-all cursor-pointer shadow-md shadow-blue-900/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
          >
            <Plus size={16} />
            <span>{submitting ? "Uploading Photo..." : "Add to Gallery"}</span>
          </button>
        </form>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-[#022448]">Gallery Photos <span className="text-slate-400 font-medium text-sm ml-2">({filteredImages.length})</span></h2>

          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by album or caption..."
              className="w-full sm:w-64 bg-slate-50 text-[#022448] text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] font-medium transition-all"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          </div>
        </div>

        {loading ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">Loading images...</p>
        ) : filteredImages.length === 0 ? (
          <p className="text-sm font-medium text-slate-500 py-10 text-center">No photos found in gallery.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredImages.map((img) => (
              <div key={img.id} className="relative group rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 aspect-square shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <Image src={img.imageUrl} alt={img.caption || img.album} fill className="object-cover" />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between z-10 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-500 px-3 py-1.5 rounded-lg shadow-sm self-start">
                    {img.album}
                  </span>

                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium line-clamp-2 leading-relaxed">{img.caption || "No caption provided"}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditModal(img)}
                        className="p-2.5 rounded-xl bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer backdrop-blur-sm"
                        title="Edit Photo Details"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="p-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 text-white transition-colors cursor-pointer backdrop-blur-sm"
                        title="Delete photo"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Photo Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-[2rem] max-w-md w-full p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#022448] flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Pencil size={20} className="text-[#225eaa]" />
                </div>
                Edit Photo Details
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-[#022448] hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateGallery} className="space-y-6 text-sm">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Album Category</label>
                <input
                  type="text"
                  required
                  value={editAlbum}
                  onChange={(e) => setEditAlbum(e.target.value)}
                  className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">Caption</label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full bg-slate-50 text-[#022448] rounded-xl px-4 py-3.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 font-medium transition-all"
                />
              </div>

              <div>
                <FileUpload
                  label="Replace Image File"
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

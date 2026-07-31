"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Search, CheckCircle2, AlertCircle, Pencil, X, Save } from "lucide-react";
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
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">Media & Photo Gallery</h1>
        <p className="text-xs text-slate-500 mt-1">Upload and manage campus photo albums, events, and student activities.</p>
      </div>

      {/* Add Photo Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Upload Photo to Gallery</h2>

        {message && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              message.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Album Category *</label>
              <input
                type="text"
                required
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="e.g. campus, fest2026, sports, hackathon, convocation"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Caption (Optional)</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Annual Sports Tournament Final Match"
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium"
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
            className="py-2.5 px-6 rounded-xl bg-[#0f2552] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Plus size={16} />
            <span>{submitting ? "Uploading Photo..." : "Add to Gallery"}</span>
          </button>
        </form>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="text-sm font-bold text-slate-900">Gallery Photos ({filteredImages.length})</h2>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by album or caption..."
              className="bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 font-medium w-48 sm:w-64"
            />
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          </div>
        </div>

        {loading ? (
          <p className="text-xs text-slate-500 py-6 text-center">Loading images...</p>
        ) : filteredImages.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No photos found in gallery.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredImages.map((img) => (
              <div key={img.id} className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video shadow-sm">
                <Image src={img.imageUrl} alt={img.caption || img.album} fill className="object-cover" />
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between z-10 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600/80 px-2 py-0.5 rounded self-start">
                    {img.album}
                  </span>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-medium truncate">{img.caption || "No caption"}</p>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openEditModal(img)}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
                        title="Edit Photo Details (PATCH)"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors cursor-pointer"
                        title="Delete photo"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Photo Modal (PATCH API) */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Pencil size={18} className="text-blue-600" /> Edit Photo Details
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateGallery} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Album Category</label>
                <input
                  type="text"
                  required
                  value={editAlbum}
                  onChange={(e) => setEditAlbum(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Caption</label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none"
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

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0f2552] hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{updating ? "Saving..." : "Save Changes (PATCH)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
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

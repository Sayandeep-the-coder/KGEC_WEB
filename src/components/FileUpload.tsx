"use client";

import { useState, useRef } from "react";
import { Upload, FileText, AlertCircle, X, Loader2 } from "lucide-react";

interface FileUploadProps {
  label?: string;
  bucket?: string;
  accept?: string;
  value?: string;
  fileName?: string;
  onChange: (url: string, fileName?: string, fileType?: string) => void;
  helperText?: string;
}

export default function FileUpload({
  label = "Upload File",
  bucket = "notices",
  accept = "application/pdf,.pdf,image/*",
  value = "",
  fileName = "",
  onChange,
  helperText = "Drag & drop file here or click to browse",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      const res = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (res.ok && json.data?.url) {
        onChange(json.data.url, json.data.name || file.name, json.data.type || file.type);
      } else {
        setError(json.error || "Failed to upload file.");
      }
    } catch {
      setError("Network error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleClear = () => {
    onChange("", "", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isImage = value && (value.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) || accept.includes("image"));

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-slate-700 block">{label}</label>}

      {value ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            {isImage ? (
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shrink-0 overflow-hidden shadow-sm">
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 shadow-sm">
                <FileText size={20} />
              </div>
            )}

            <div className="truncate">
              <span className="text-xs font-bold text-slate-900 block truncate">
                {fileName || value.split("/").pop()}
              </span>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-blue-600 hover:underline block truncate"
              >
                View File
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-slate-200 transition-colors shrink-0 cursor-pointer"
            title="Remove file"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragOver
              ? "border-blue-500 bg-blue-50/50"
              : "border-slate-300 bg-slate-50/60 hover:border-blue-500 hover:bg-slate-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />

          {uploading ? (
            <div className="py-3 flex flex-col items-center gap-2">
              <Loader2 size={28} className="animate-spin text-blue-600" />
              <span className="text-xs font-bold text-slate-700">Uploading file...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shadow-sm">
                <Upload size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-0.5">{helperText}</span>
                <span className="text-[11px] text-slate-500 block">PDF, PNG, JPG, WebP up to 10MB</span>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1 mt-1">
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminPlacementsUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<"placement_dept" | "recruiter" | "enrollment">("placement_dept");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    let endpoint = "/api/v1/placements/departments/upload";
    if (uploadType === "recruiter") endpoint = "/api/v1/placements/recruiters/upload";
    if (uploadType === "enrollment") endpoint = "/api/v1/enrollment/departments/upload";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: `CSV Uploaded successfully! ${json.data?.inserted || 0} records inserted.` });
        setFile(null);
      } else {
        setMessage({ type: "error", text: json.error || "CSV processing failed." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error uploading CSV file." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">CSV Data Batch Uploads</h1>
        <p className="text-xs text-slate-500 mt-1">Upload CSV datasets to automatically compute placement & student enrollment dashboards.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Select Dataset Type</label>
            <select
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value as "placement_dept" | "recruiter" | "enrollment")}
              className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 text-xs font-semibold border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 transition-all"
            >
              <option value="placement_dept">Placement Dept-wise Breakdown (year, department, students_placed, median_salary, highest_salary)</option>
              <option value="recruiter">Recruiter Portfolios (year, company, offers)</option>
              <option value="enrollment">Student Enrollment Demographics (year, department, total_students, male_students, female_students)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Upload CSV File</label>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50/60 hover:border-blue-500 hover:bg-slate-50 transition-all">
              <FileSpreadsheet size={40} className="text-blue-600 mx-auto mb-3" />
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="csv-file-input"
              />
              <label htmlFor="csv-file-input" className="cursor-pointer text-xs font-bold text-blue-600 hover:underline block mb-1">
                {file ? file.name : "Click to select .CSV file"}
              </label>
              <span className="text-[10px] text-slate-500 block">Maximum file size: 5MB</span>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              message.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{message.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full py-3 px-6 rounded-xl bg-[#0f2552] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-md"
          >
            <Upload size={16} />
            <span>{loading ? "Processing CSV..." : "Batch Ingest CSV"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

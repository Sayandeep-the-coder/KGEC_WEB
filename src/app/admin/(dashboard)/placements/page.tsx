"use client";

import { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Database } from "lucide-react";

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
    <div className="max-w-4xl space-y-8 pb-10">
      <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold shadow-inner">
            <Database size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#022448]">CSV Data Imports</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Upload CSV datasets to automatically compute placement & student enrollment dashboards.</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-[#225eaa]"></div>
        
        <form onSubmit={handleUpload} className="space-y-8 mt-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">Select Dataset Schema</label>
            <select
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value as "placement_dept" | "recruiter" | "enrollment")}
              className="w-full bg-slate-50 text-[#022448] rounded-xl px-5 py-4 text-sm font-bold border border-slate-200 focus:outline-none focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer shadow-inner"
            >
              <option value="placement_dept">Placement Dept-wise Breakdown (year, department, students_placed, median_salary, highest_salary)</option>
              <option value="recruiter">Recruiter Portfolios (year, company, offers)</option>
              <option value="enrollment">Student Enrollment Demographics (year, department, total_students, male_students, female_students)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">Upload CSV File</label>
            <div className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all ${
              file ? "border-emerald-400 bg-emerald-50/30" : "border-slate-200 bg-slate-50 hover:border-[#225eaa] hover:bg-blue-50/30"
            }`}>
              <FileSpreadsheet size={48} className={`mx-auto mb-4 ${file ? "text-emerald-500" : "text-slate-400"}`} />
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="csv-file-input"
              />
              <label htmlFor="csv-file-input" className="cursor-pointer">
                <span className={`text-base font-bold block mb-2 transition-colors ${file ? "text-emerald-700" : "text-[#225eaa] hover:text-[#022448]"}`}>
                  {file ? file.name : "Click to browse .CSV file"}
                </span>
                <span className="text-xs font-medium text-slate-500 block">
                  {file ? `File size: ${(file.size / 1024).toFixed(1)} KB` : "Drag and drop or click to select"}
                </span>
              </label>
            </div>
            {!file && <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mt-3 ml-2">Maximum file size: 5MB</span>}
          </div>

          {message && (
            <div className={`p-5 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-inner ${
              message.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-red-50 text-red-800 border border-red-100"
            }`}>
              {message.type === "success" ? <CheckCircle2 size={20} className="text-emerald-600" /> : <AlertCircle size={20} className="text-red-600" />}
              <span>{message.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full py-4 px-6 rounded-2xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:transform-none cursor-pointer shadow-xl shadow-blue-900/10 hover:-translate-y-1"
          >
            <Upload size={18} />
            <span>{loading ? "Processing CSV Data..." : "Batch Ingest CSV Data"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

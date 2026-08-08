import Image from "next/image";
import { Mail, Award, BookOpen, ExternalLink, User } from "lucide-react";

export interface StaffProfile {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  photoUrl?: string | null;
  role: "principal" | "registrar" | "accounts_officer" | "hod" | "hostel_super" | "caretaker" | "faculty";
  department?: string | null;
  education?: Array<{ degree: string; institution: string; year?: number }> | null;
  researchPaperLinks?: Array<{ title: string; url: string }> | null;
}

interface StaffProfileCardProps {
  staff: StaffProfile;
}

const ROLE_LABELS: Record<string, string> = {
  principal: "Principal",
  registrar: "Registrar",
  accounts_officer: "Accounts Officer",
  hod: "Head of Department",
  hostel_super: "Hostel Superintendent",
  caretaker: "Caretaker",
  faculty: "Faculty Member",
};

export default function StaffProfileCard({ staff }: StaffProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-6">
      {/* Profile Photo */}
      <div className="shrink-0 flex flex-col items-center">
        <div className="relative w-36 h-36 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
          {staff.photoUrl ? (
            <Image
              src={staff.photoUrl}
              alt={staff.name}
              fill
              className="object-cover"
            />
          ) : (
            <User size={48} className="text-slate-400" />
          )}
        </div>
        <span className="mt-4 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-kgec-blue border border-blue-100">
          {ROLE_LABELS[staff.role] || staff.role}
        </span>
      </div>

      {/* Info Details */}
      <div className="w-full flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-4 border-b border-slate-100 pb-5 w-full mb-5">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">{staff.name}</h3>
            {staff.department && (
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide block mt-1.5">
                Department of {staff.department.toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 text-[13px] text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 transition-colors hover:bg-blue-50 hover:border-blue-200 hover:text-kgec-blue">
            <Mail size={16} className="text-kgec-blue" />
            <a href={`mailto:${staff.email}`} className="font-medium">
              {staff.email}
            </a>
          </div>
        </div>

        {/* Education History */}
        {staff.education && staff.education.length > 0 && (
          <div className="mb-6 w-full flex flex-col items-center">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full">
              <Award size={14} className="text-kgec-navy" />
              <span>Education</span>
            </h4>
            <ul className="space-y-2">
              {staff.education.map((edu, idx) => (
                <li key={idx} className="text-sm text-slate-600 leading-snug">
                  <span className="font-bold text-slate-900">{edu.degree}</span> — {edu.institution} {edu.year && <span className="text-slate-400">({edu.year})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Research Paper Links */}
        {staff.researchPaperLinks && staff.researchPaperLinks.length > 0 && (
          <div className="w-full flex flex-col items-center">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full">
              <BookOpen size={14} className="text-kgec-navy" />
              <span>Research Publications</span>
            </h4>
            <div className="flex flex-wrap justify-center gap-2.5">
              {staff.researchPaperLinks.map((paper, idx) => (
                <a
                  key={idx}
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-xs font-semibold text-slate-700 hover:text-kgec-blue border border-slate-200 transition-colors"
                >
                  <span>{paper.title}</span>
                  <ExternalLink size={14} className="opacity-70" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

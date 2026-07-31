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
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
      {/* Profile Photo */}
      <div className="shrink-0 flex flex-col items-center">
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
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
        <span className="mt-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-kgec-blue">
          {ROLE_LABELS[staff.role] || staff.role}
        </span>
      </div>

      {/* Info Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{staff.name}</h3>
              {staff.department && (
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Department of {staff.department.toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 self-start sm:self-auto">
              <Mail size={14} className="text-kgec-blue" />
              <a href={`mailto:${staff.email}`} className="hover:underline">
                {staff.email}
              </a>
            </div>
          </div>

          {/* Education History */}
          {staff.education && staff.education.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Award size={14} className="text-kgec-navy" />
                <span>Education</span>
              </h4>
              <ul className="space-y-1">
                {staff.education.map((edu, idx) => (
                  <li key={idx} className="text-xs text-slate-700">
                    <span className="font-semibold text-slate-900">{edu.degree}</span> — {edu.institution} {edu.year && `(${edu.year})`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Research Paper Links */}
          {staff.researchPaperLinks && staff.researchPaperLinks.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <BookOpen size={14} className="text-kgec-navy" />
                <span>Research Publications</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {staff.researchPaperLinks.map((paper, idx) => (
                  <a
                    key={idx}
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 text-[11px] font-medium text-slate-700 hover:text-kgec-blue border border-slate-200 transition-colors"
                  >
                    <span>{paper.title}</span>
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

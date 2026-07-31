import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StaffProfileCard, { StaffProfile } from "@/components/StaffProfileCard";
import { notFound } from "next/navigation";

const ROLE_MAP: Record<string, { roleKey: string; title: string; desc: string }> = {
  principal: {
    roleKey: "principal",
    title: "Office of the Principal",
    desc: "Executive leadership and administrative direction of Kalyani Government Engineering College.",
  },
  registrar: {
    roleKey: "registrar",
    title: "Office of the Registrar",
    desc: "Academic coordination, governance, student records, and institutional administration.",
  },
  "accounts-officer": {
    roleKey: "accounts_officer",
    title: "Accounts Officer",
    desc: "Financial management, budget allocation, grants, and fiscal administration.",
  },
  hods: {
    roleKey: "hod",
    title: "Heads of Departments (HODs)",
    desc: "Academic leadership across Computer Science, Information Technology, ECE, EE, Mechanical, MCA, and M.Tech.",
  },
  "hostel-super": {
    roleKey: "hostel_super",
    title: "Hostel Administration",
    desc: "Student residential welfare, hostel accommodation, and campus living superintendence.",
  },
  caretaker: {
    roleKey: "caretaker",
    title: "Campus Caretaker",
    desc: "Campus estate management, infrastructure maintenance, and physical facilities.",
  },
};

interface PageProps {
  params: Promise<{ role: string }>;
}

async function getStaffByRole(roleKey: string): Promise<StaffProfile[]> {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/staff?role=${roleKey}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Error fetching staff profile:", err);
    return [];
  }
}

export default async function AdministrationRolePage({ params }: PageProps) {
  const { role } = await params;
  const config = ROLE_MAP[role];

  if (!config) {
    notFound();
  }

  const staffList = await getStaffByRole(config.roleKey);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            ADMINISTRATION & LEADERSHIP
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            {config.title}
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            {config.desc}
          </p>
        </div>

        {staffList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
            No profile records currently listed under this administrative role.
          </div>
        ) : (
          <div className="space-y-6">
            {staffList.map((staff) => (
              <StaffProfileCard key={staff.id} staff={staff} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

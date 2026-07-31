import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StaffProfileCard, { StaffProfile } from "@/components/StaffProfileCard";
import { notFound } from "next/navigation";
import { Users } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DEPT_NAMES: Record<string, string> = {
  cse: "Computer Science & Engineering",
  it: "Information Technology",
  ece: "Electronics & Communication Engineering",
  ee: "Electrical Engineering",
  me: "Mechanical Engineering",
  mca: "Master of Computer Applications",
  mtech: "Master of Technology",
};

async function getFaculty(department: string): Promise<StaffProfile[]> {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/staff?department=${department}&role=faculty`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Error fetching department faculty:", err);
    return [];
  }
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const deptName = DEPT_NAMES[slug.toLowerCase()];

  if (!deptName) {
    notFound();
  }

  const faculty = await getFaculty(slug.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-kgec-navy text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            DEPARTMENT OF {slug.toUpperCase()}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            {deptName}
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            Delivering cutting-edge technical education, state-of-the-art laboratory research, and industry-oriented training.
          </p>
        </div>

        {/* Faculty Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-kgec-navy" size={24} />
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Department Faculty & Staff
            </h2>
          </div>

          {faculty.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
              No faculty records listed for the Department of {slug.toUpperCase()}.
            </div>
          ) : (
            <div className="space-y-6">
              {faculty.map((member) => (
                <StaffProfileCard key={member.id} staff={member} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

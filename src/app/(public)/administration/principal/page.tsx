

import { Mail } from "lucide-react";
import { db } from "@/lib/db";
import { staff } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Principal's Desk | Kalyani Government Engineering College",
  description:
    "Official message from the Principal of Kalyani Government Engineering College.",
};

async function getPrincipalData() {
  try {
    const [row] = await db
      .select()
      .from(staff)
      .where(eq(staff.role, "principal"));
    return row;
  } catch (err) {
    console.error("Error fetching principal data:", err);
    return null;
  }
}

export default async function PrincipalPage() {
  const principalData = await getPrincipalData();
  const name = principalData?.name || "Dr. Sourabh Kumar Das";
  const email = principalData?.email || "principal@kgec.edu.in";
  const education = (principalData?.education as Array<{ degree: string; institution: string; year?: number }>) || [];


  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Institutional Leadership"
        title="From the Desk of the Principal"
        subtitle="Welcome to Kalyani Government Engineering College — inspiring innovation, engineering excellence, and ethical leadership since 1995."
      />

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col items-center">
        <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Principal Profile Card */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-28 h-28 rounded-full bg-white/50 border border-slate-200/60 shadow-sm text-white flex items-center justify-center text-3xl font-serif font-bold shadow-md mb-4 border-4 border-blue-100">
                {name.split(" ").map(n => n[0]).filter(Boolean).slice(0, 2).join("")}
              </div>
              <h2 className="text-xl font-bold text-[#1A1A1A]">{name}</h2>
              <p className="text-xs text-[#2E5C9E] font-bold uppercase tracking-wider mt-1">
                Principal & Professor
              </p>
              <p className="text-xs text-[#6B7280] mt-1">
                Kalyani Government Engineering College
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200 w-full space-y-3 text-xs text-slate-600">
                <div className="flex items-center justify-center gap-2">
                  <Mail size={14} className="text-[#2E5C9E]" />
                  <a href={`mailto:${email}`} className="hover:underline text-[#2E5C9E] font-semibold">{email}</a>
                </div>

                {education.length > 0 && (
                  <div className="text-left pt-2 border-t border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Education</span>
                    {education.map((e, i) => (
                      <p key={i} className="text-slate-700 text-xs">
                        <strong>{e.degree}</strong> ({e.institution})
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Principal's Address Narrative */}
            <div className="lg:col-span-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
                Official Address
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#1B2A4A]">
                Nurturing Future Technologists & Nation Builders
              </h3>
              <blockquote className="italic text-slate-800 text-sm sm:text-base leading-relaxed border-l-4 border-[#2E5C9E] pl-4 py-2 bg-slate-50/50 rounded-r-xl">
                &ldquo;It gives me immense pleasure to present Kalyani Government Engineering College. Since our inception in 1995, KGEC has consistently striven for excellence in technical education, research, and innovation. Our students are selected through the most competitive examinations — WBJEE and JELET — representing the finest engineering talent in the state. Our dedicated faculty, modern infrastructure, and student-driven ecosystem ensure that every graduate possesses not only strong theoretical fundamentals but also the practical problem-solving skills demanded by today&apos;s rapidly evolving global industries. I warmly invite our prospective recruiters to visit our campus and discover the exceptional talent pool that KGEC offers.&rdquo;
              </blockquote>
              <p>
                At KGEC, we emphasize a holistic learning experience where classroom pedagogy seamlessly integrates with hands-on laboratory experimentation, interdisciplinary student societies, and competitive coding marathons. Our students consistently excel in national competitions such as the Smart India Hackathon and secure prestigious international research and software engineering opportunities.
              </p>
              <p>
                We look forward to welcoming hiring partners, academic collaborators, and prospective students to our green Kalyani campus.
              </p>
            </div>
          </div>
        </section>
      </main>

      </UnifiedPageLayout>
  );
}

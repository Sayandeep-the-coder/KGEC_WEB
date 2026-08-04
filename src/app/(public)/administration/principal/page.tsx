import { Mail } from "lucide-react";
import { db } from "@/lib/db";
import { staff } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";

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
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Principal Profile Card */}
                <div className="lg:col-span-4 flex flex-col items-center text-center p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  
                  <div className="w-32 h-32 rounded-full bg-[#022448] text-white flex items-center justify-center text-4xl font-serif font-bold shadow-lg mb-6 border-4 border-white relative z-10">
                    {name.split(" ").map(n => n[0]).filter(Boolean).slice(0, 2).join("")}
                  </div>
                  <h2 className="text-2xl font-bold font-serif text-[#022448] relative z-10">{name}</h2>
                  <p className="text-[11px] text-[#225eaa] font-bold uppercase tracking-widest mt-2 relative z-10">
                    Principal & Professor
                  </p>
                  <p className="text-sm text-slate-500 font-medium mt-1 relative z-10">
                    Kalyani Government Engineering College
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-slate-200 w-full space-y-4 text-sm text-[#43474e] relative z-10">
                    <div className="flex items-center justify-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-[#225eaa] transition-colors">
                      <Mail size={16} className="text-[#225eaa]" />
                      <a href={`mailto:${email}`} className="text-[#225eaa] font-bold hover:text-[#022448] transition-colors">{email}</a>
                    </div>

                    {education.length > 0 && (
                      <div className="text-left pt-4 border-t border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-3">Academic Background</span>
                        <div className="space-y-3">
                          {education.map((e, i) => (
                            <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                              <p className="text-sm font-bold text-[#022448]">{e.degree}</p>
                              <p className="text-[11px] font-medium text-slate-500 mt-0.5">{e.institution}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Principal's Address Narrative */}
                <div className="lg:col-span-8 space-y-8 text-sm text-[#43474e] leading-relaxed font-medium">
                  <div>
                    <div className="inline-block text-[10px] font-bold text-[#225eaa] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
                      Official Address
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold font-serif text-[#022448]">
                      Nurturing Future Technologists & Nation Builders
                    </h3>
                  </div>
                  
                  <blockquote className="italic text-slate-700 text-base leading-relaxed border-l-4 border-[#225eaa] pl-6 py-4 bg-slate-50 rounded-r-xl shadow-sm">
                    &ldquo;It gives me immense pleasure to present Kalyani Government Engineering College. Since our inception in 1995, KGEC has consistently striven for excellence in technical education, research, and innovation. Our students are selected through the most competitive examinations — WBJEE and JELET — representing the finest engineering talent in the state. Our dedicated faculty, modern infrastructure, and student-driven ecosystem ensure that every graduate possesses not only strong theoretical fundamentals but also the practical problem-solving skills demanded by today's rapidly evolving global industries. I warmly invite our prospective recruiters to visit our campus and discover the exceptional talent pool that KGEC offers.&rdquo;
                  </blockquote>
                  
                  <p className="text-base text-[#43474e]">
                    At KGEC, we emphasize a holistic learning experience where classroom pedagogy seamlessly integrates with hands-on laboratory experimentation, interdisciplinary student societies, and competitive coding marathons. Our students consistently excel in national competitions such as the Smart India Hackathon and secure prestigious international research and software engineering opportunities.
                  </p>
                  
                  <p className="text-base text-[#43474e]">
                    We look forward to welcoming hiring partners, academic collaborators, and prospective students to our green Kalyani campus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}

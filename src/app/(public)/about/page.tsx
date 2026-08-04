

import { ArrowRight, Target, Eye, Handshake, Lightbulb, LineChart } from "lucide-react";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";

export const metadata = {
  title: "About Us | Kalyani Government Engineering College",
  description: "Learn about the rich history, mission, vision, and leadership of Kalyani Government Engineering College.",
};

export default function AboutPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="About KGEC"
        title="Empowering Minds. Engineering Futures."
        subtitle="Established by the Government of West Bengal, KGEC stands as an institution of excellence in engineering education and research."
        backgroundImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="h-[2px] w-12 bg-[#76A9FA]" />
          <span className="text-white/90 text-lg">Since 1995</span>
        </div>
        <button className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors mt-4">
          Explore Campus
          <ArrowRight size={18} />
        </button>
      </PageHero>

      <main className="flex-1 w-full flex flex-col items-center">

        {/* INSTITUTE INFORMATION */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto">
              <div>
                <SectionHeader
                  badge="Institute Information"
                  title="Building a Legacy of Excellence"
                  align="left"
                />
              </div>
              <div className="space-y-6 text-[#43474e] text-[16px] leading-relaxed">
                <p>
                  Kalyani Government Engineering College (KGEC) was established by the Department of Higher Education, Government of West Bengal in 1995. The college is affiliated to Maulana Abul Kalam Azad University of Technology (MAKAUT) and approved by the All India Council for Technical Education (AICTE).
                </p>
                <p>
                  Located in the lush, green township of Kalyani, Nadia, West Bengal, the campus spans across an expansive green environment equipped with state-of-the-art laboratories, modern computing facilities, a central library, and student amenities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MISSION & VISION */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Our Guiding Principles"
                title="Mission & Vision"
                align="center"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Mission Card */}
                <ContentCard variant="muted" hover={false}>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#225eaa] mb-6 shadow-sm border border-[#d0daef]">
                      <Target size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#225eaa] mb-4">Our Mission</h3>
                    <h4 className="text-xl md:text-2xl font-bold text-[#022448] font-serif mb-6 leading-tight">
                      &quot;Creating engineers<br/>who build tomorrow.&quot;
                    </h4>
                    <p className="text-[#43474e] text-sm leading-relaxed max-w-sm">
                      To impart high-quality technical education, foster innovative research, and nurture ethical values to prepare engineers and technological leaders for societal development.
                    </p>
                  </div>
                </ContentCard>

                {/* Vision Card */}
                <ContentCard variant="white" hover={false} className="bg-[#fffdf7] border-[#f5f0e6]">
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#d4a373] mb-6 shadow-sm border border-[#f5f0e6]">
                      <Eye size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#d4a373] mb-4">Our Vision</h3>
                    <h4 className="text-xl md:text-2xl font-bold text-[#022448] font-serif mb-6 leading-tight">
                      &quot;Global excellence<br/>through innovation.&quot;
                    </h4>
                    <p className="text-[#43474e] text-sm leading-relaxed max-w-sm">
                      To achieve global recognition as a center of excellence in engineering education, innovation, and technological leadership for sustainable nation-building.
                    </p>
                  </div>
                </ContentCard>
              </div>
            </div>
          </div>
        </div>

        {/* PRINCIPAL'S DESK */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Principal's Desk"
                title="A Message from Our Principal"
                align="left"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
                {/* Left Content */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                  <p className="text-[#43474e] text-sm leading-relaxed mb-6">
                    At KGEC, we believe engineering is not merely about acquiring technical knowledge, but about cultivating a mindset of problem-solving, curiosity, and service to society.
                  </p>
                  <p className="text-[#43474e] text-sm leading-relaxed mb-8">
                    Together, let us continue to innovate, inspire, and create a better tomorrow.
                  </p>

                  <div className="mb-2 text-[#022448] font-serif italic text-3xl">
                    J. K. Patra
                  </div>
                  <div className="font-bold text-[#022448]">Dr. J. K. Patra</div>
                  <div className="text-sm text-[#43474e]">Principal, KGEC</div>
                </div>

                {/* Middle Image */}
                <div className="lg:col-span-4 rounded-[2rem] overflow-hidden min-h-[300px] shadow-lg relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
                  />
                </div>

                {/* Right Quote Card */}
                <ContentCard variant="dark" hover={false} className="lg:col-span-4 flex flex-col justify-center">
                  <div className="text-6xl text-[#225eaa] mb-4 opacity-50 font-serif leading-none">&quot;</div>
                  <p className="text-2xl md:text-3xl font-serif leading-tight mb-8 relative z-10">
                    &quot;Education is the most powerful weapon which you can use to change the world.&quot;
                  </p>
                  <div className="h-1 w-12 bg-[#76A9FA]" />
                </ContentCard>
              </div>
            </div>
          </div>
        </div>

        {/* INDUSTRY RELATIONS */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-1">
                  <SectionHeader
                    badge="Industry Relations"
                    title="Partnering for Progress"
                    align="left"
                  />
                  <p className="text-[#43474e] text-sm leading-relaxed">
                    KGEC collaborates with leading industries, research organizations, and innovation hubs to bridge the gap between academia and industry.
                  </p>
                </div>

                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <ContentCard variant="white" delay={0} className="border-[#e6eeff]">
                    <div className="w-12 h-12 rounded-full bg-[#eff3ff] text-[#225eaa] flex items-center justify-center mb-6">
                      <Handshake size={20} />
                    </div>
                    <h3 className="font-bold text-[#022448] mb-3">Industry Collaborations</h3>
                    <p className="text-[#43474e] text-xs leading-relaxed">
                      Strong partnerships for internships, projects and placements.
                    </p>
                  </ContentCard>

                  <ContentCard variant="white" delay={0.1} className="border-[#e6eeff]">
                    <div className="w-12 h-12 rounded-full bg-[#eff3ff] text-[#225eaa] flex items-center justify-center mb-6">
                      <Lightbulb size={20} />
                    </div>
                    <h3 className="font-bold text-[#022448] mb-3">Research & Innovation</h3>
                    <p className="text-[#43474e] text-xs leading-relaxed">
                      Joint research initiatives and technology development.
                    </p>
                  </ContentCard>

                  <ContentCard variant="white" delay={0.2} className="border-[#e6eeff]">
                    <div className="w-12 h-12 rounded-full bg-[#eff3ff] text-[#225eaa] flex items-center justify-center mb-6">
                      <LineChart size={20} />
                    </div>
                    <h3 className="font-bold text-[#022448] mb-3">Skill Development</h3>
                    <p className="text-[#43474e] text-xs leading-relaxed">
                      Industry-driven programs and expert workshops.
                    </p>
                  </ContentCard>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Target, Eye, Handshake, Lightbulb, LineChart } from "lucide-react";

export const metadata = {
  title: "About Us | Kalyani Government Engineering College",
  description: "Learn about the rich history, mission, vision, and leadership of Kalyani Government Engineering College.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9ff] font-sans w-full">
      <Header />

      <main className="flex-1 w-full flex flex-col items-center">
        {/* HERO SECTION */}
        <div className="w-full max-w-[1440px] px-4 md:px-8 pt-6 pb-12">
          <div className="relative w-full rounded-2xl md:rounded-[32px] overflow-hidden bg-[#022448] min-h-[500px] flex items-center">
            {/* Background Image & Overlays */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#022448] via-[#022448]/80 to-transparent" />
            
            {/* Giant Watermark Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] sm:text-[15rem] lg:text-[25rem] font-bold text-white/5 select-none pointer-events-none whitespace-nowrap">
              KGEC
            </div>

            <div className="relative z-10 p-8 md:p-16 max-w-3xl">
              <span className="text-sm font-semibold tracking-widest text-[#adc8f5] uppercase mb-4 block">
                About KGEC
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-8">
                Empowering Minds.<br/>Engineering Futures.
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-12 bg-[#76A9FA]"></div>
                <span className="text-white/90 text-lg">Since 1995</span>
              </div>
              
              <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-10">
                Established by the Government of West Bengal, KGEC stands as an institution of excellence in engineering education and research.
              </p>
              
              <button className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors">
                Explore Campus
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* INSTITUTE INFORMATION */}
        <div className="w-full max-w-[1200px] px-6 py-16 md:py-24 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <span className="text-[#225eaa] text-xs font-bold uppercase tracking-widest mb-4 block">
                INSTITUTE INFORMATION
                <div className="h-0.5 w-8 bg-[#225eaa] mt-2"></div>
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#022448] leading-tight font-serif">
                Building a Legacy<br/>of Excellence
              </h2>
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
          {/* Subtle architectural background */}
          <div 
            className="absolute left-[30%] right-0 top-1/2 -translate-y-1/2 h-[120%] opacity-[0.03] bg-contain bg-no-repeat bg-center pointer-events-none z-0"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
          />
        </div>

        {/* MISSION & VISION */}
        <div className="w-full max-w-[1200px] px-6 py-12">
          <div className="text-center mb-16">
            <span className="text-[#225eaa] text-xs font-bold uppercase tracking-widest mb-3 block">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="text-3xl md:text-[40px] font-bold text-[#022448] font-serif inline-block relative">
              Mission & Vision
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 w-12 bg-[#225eaa]"></div>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-[#eff3ff] rounded-[24px] p-6 md:p-10 relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 w-64 h-64 opacity-5 pointer-events-none transition-opacity group-hover:opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/blueprint.png')" }} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#225eaa] mb-6 shadow-sm border border-[#d0daef]">
                  <Target size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[#225eaa] mb-4">Our Mission</h3>
                <h4 className="text-xl md:text-2xl font-bold text-[#022448] font-serif mb-6 leading-tight">
                  "Creating engineers<br/>who build tomorrow."
                </h4>
                <p className="text-[#43474e] text-sm leading-relaxed max-w-sm">
                  To impart high-quality technical education, foster innovative research, and nurture ethical values to prepare engineers and technological leaders for societal development.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-[#fffdf7] rounded-[24px] p-6 md:p-10 relative overflow-hidden group border border-[#f5f0e6]">
              <div className="absolute right-0 bottom-0 w-64 h-64 opacity-5 pointer-events-none transition-opacity group-hover:opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/blueprint.png')" }} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#d4a373] mb-6 shadow-sm border border-[#f5f0e6]">
                  <Eye size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[#d4a373] mb-4">Our Vision</h3>
                <h4 className="text-xl md:text-2xl font-bold text-[#022448] font-serif mb-6 leading-tight">
                  "Global excellence<br/>through innovation."
                </h4>
                <p className="text-[#43474e] text-sm leading-relaxed max-w-sm">
                  To achieve global recognition as a center of excellence in engineering education, innovation, and technological leadership for sustainable nation-building.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PRINCIPAL'S DESK */}
        <div className="w-full max-w-[1200px] px-6 py-24">
          <span className="text-[#225eaa] text-xs font-bold uppercase tracking-widest mb-4 block">
            PRINCIPAL'S DESK
            <div className="h-0.5 w-8 bg-[#225eaa] mt-2"></div>
          </span>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
            {/* Left Content */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#022448] font-serif leading-tight mb-6">
                A Message from<br/>Our Principal
              </h2>
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
            <div className="lg:col-span-4 rounded-2xl overflow-hidden min-h-[300px] shadow-lg relative">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
              />
            </div>

            {/* Right Quote Card */}
            <div className="lg:col-span-4 bg-[#022448] rounded-2xl p-6 sm:p-10 text-white flex flex-col justify-center relative overflow-hidden shadow-xl">
              <div className="absolute right-0 bottom-0 w-64 h-64 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/blueprint.png')" }} />
              <div className="text-6xl text-[#225eaa] mb-4 opacity-50 font-serif leading-none">"</div>
              <p className="text-2xl md:text-3xl font-serif leading-tight mb-8 relative z-10">
                Education is the most powerful weapon which you can use to change the world."
              </p>
              <div className="h-1 w-12 bg-[#76A9FA]"></div>
            </div>
          </div>
        </div>

        {/* INDUSTRY RELATIONS */}
        <div className="w-full max-w-[1200px] px-6 py-16 mb-12 border-t border-[#e6eeff]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <span className="text-[#225eaa] text-xs font-bold uppercase tracking-widest mb-4 block">
                INDUSTRY RELATIONS
                <div className="h-0.5 w-8 bg-[#225eaa] mt-2"></div>
              </span>
              <h2 className="text-3xl font-bold text-[#022448] font-serif leading-tight mb-4">
                Partnering for Progress
              </h2>
              <p className="text-[#43474e] text-sm leading-relaxed">
                KGEC collaborates with leading industries, research organizations, and innovation hubs to bridge the gap between academia and industry.
              </p>
            </div>
            
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-6 border border-[#e6eeff] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#eff3ff] text-[#225eaa] flex items-center justify-center mb-6">
                  <Handshake size={20} />
                </div>
                <h3 className="font-bold text-[#022448] mb-3">Industry Collaborations</h3>
                <p className="text-[#43474e] text-xs leading-relaxed">
                  Strong partnerships for internships, projects and placements.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-6 border border-[#e6eeff] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#eff3ff] text-[#225eaa] flex items-center justify-center mb-6">
                  <Lightbulb size={20} />
                </div>
                <h3 className="font-bold text-[#022448] mb-3">Research & Innovation</h3>
                <p className="text-[#43474e] text-xs leading-relaxed">
                  Joint research initiatives and technology development.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-6 border border-[#e6eeff] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#eff3ff] text-[#225eaa] flex items-center justify-center mb-6">
                  <LineChart size={20} />
                </div>
                <h3 className="font-bold text-[#022448] mb-3">Skill Development</h3>
                <p className="text-[#43474e] text-xs leading-relaxed">
                  Industry-driven programs and expert workshops.
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

import { Landmark, Users, GraduationCap, Building2, ArrowRight } from "lucide-react";

export default function Achievements() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-12">
        <span className="text-xs font-bold tracking-widest text-kgec-navy uppercase block">
          OUR ACHIEVEMENTS
        </span>
        <div className="w-8 h-0.5 bg-kgec-navy mx-auto my-2" />
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-kgec-navy">
          Built on Legacy, Driven by Excellence
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
        <div className="bg-kgec-white border border-kgec-slate-200/90 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-60 shadow-sm hover:shadow-md transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-kgec-blue-50 text-kgec-navy flex items-center justify-center mb-4">
              <Landmark size={20} />
            </div>
            <h3 className="text-3xl font-bold font-serif text-kgec-navy">1995</h3>
            <p className="text-xs font-medium text-kgec-slate-500 mt-1">Established</p>
          </div>

          <div className="absolute bottom-0 right-0 left-0 h-20 opacity-20 pointer-events-none flex justify-center items-end">
            <svg viewBox="0 0 200 80" className="w-full h-full text-kgec-navy" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20 80 V50 L30 40 L40 50 V80 M30 40 V20 L35 10 L40 20 V40 M80 80 V30 L100 15 L120 30 V80 M160 80 V50 L170 40 L180 50 V80" />
              <circle cx="100" cy="40" r="6" />
              <line x1="0" y1="80" x2="200" y2="80" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="bg-kgec-blue text-kgec-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-60 shadow-lg shadow-kgec-blue-500/20 group">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay group-hover:scale-105 transition-transform duration-500"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80')",
            }}
          />

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-kgec-white/20 backdrop-blur-md text-kgec-white flex items-center justify-center mb-4">
              <Users size={20} />
            </div>
            <h3 className="text-3xl font-bold text-kgec-white">10,000+</h3>
            <p className="text-xs font-medium text-kgec-white/90 mt-1 max-w-30 leading-snug">
              Students Empowered
            </p>
          </div>
        </div>

        <div className="bg-kgec-white border border-kgec-slate-200/90 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-60 shadow-sm hover:shadow-md transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-kgec-blue-50 text-kgec-navy flex items-center justify-center mb-4">
              <GraduationCap size={20} />
            </div>
            <h3 className="text-3xl font-bold text-kgec-navy">600+</h3>
            <p className="text-xs font-medium text-kgec-slate-500 mt-1 leading-snug">
              Faculty Members <br />& Staff
            </p>
          </div>

          <div className="absolute bottom-3 right-3 opacity-25 text-kgec-navy pointer-events-none">
            <svg viewBox="0 0 60 40" className="w-16 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="30" cy="15" r="7" />
              <path d="M16 35 C16 25 22 22 30 22 C38 22 44 25 44 35" />
              <circle cx="14" cy="18" r="5" />
              <path d="M4 35 C4 27 9 25 14 25" />
              <circle cx="46" cy="18" r="5" />
              <path d="M56 35 C56 27 51 25 46 25" />
            </svg>
          </div>
        </div>

        <div className="bg-kgec-white border border-kgec-slate-200/90 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-60 shadow-sm hover:shadow-md transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-kgec-blue-50 text-kgec-navy flex items-center justify-center mb-4">
              <Building2 size={20} />
            </div>
            <h3 className="text-3xl font-bold text-kgec-navy">10</h3>
            <p className="text-xs font-medium text-kgec-slate-500 mt-1">Departments</p>
          </div>

          <div className="absolute bottom-3 right-3 opacity-25 text-kgec-navy pointer-events-none">
            <svg viewBox="0 0 60 40" className="w-14 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 35 H50 M12 35 V15 M24 35 V15 M36 35 V15 M48 35 V15 M8 15 H52 L30 5 Z" />
            </svg>
          </div>
        </div>

        <div className="bg-kgec-soft-blue border border-kgec-blue-100 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-60 shadow-sm hover:shadow-md transition-all group">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-kgec-navy">
              Explore <br />
              KGEC
            </h3>
          </div>

          <a
            href="#"
            className="relative z-10 text-xs font-bold text-kgec-navy flex items-center gap-1.5 group-hover:gap-2.5 transition-all mt-auto"
          >
            <span>Virtual Campus Tour</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

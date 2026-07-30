import { Play } from "lucide-react";

export default function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">

      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-widest text-kgec-navy uppercase block">
          GALLERY
        </span>
        <div className="w-8 h-0.5 bg-kgec-navy mx-auto my-2" />
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-kgec-navy mt-2">
          Life at KGEC
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Moments that inspire, experiences that shape, and memories that last a lifetime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 relative rounded-2xl overflow-hidden min-h-90 shadow-md group">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-black/30" />
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
            Campus Talk
          </div>
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden min-h-40 shadow-md group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')",
              }}
            />
          </div>

          <div className="relative rounded-2xl overflow-hidden min-h-40 shadow-md group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80')",
              }}
            />
          </div>

          <div className="bg-kgec-blue text-white rounded-2xl p-5 flex flex-col justify-between min-h-40 shadow-md">
            <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">
              KGEC IMPACT
            </span>
            <div>
              <h4 className="text-2xl font-bold text-white">10,000+</h4>
              <p className="text-xs text-white/90 font-medium">Students Empowered</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden min-h-40 shadow-md group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80')",
              }}
            />
          </div>
          <div className="sm:col-span-2 relative rounded-2xl overflow-hidden min-h-40 shadow-md group flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition-colors" />

            <button className="relative z-10 bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-white/20 flex items-center gap-2.5 text-xs font-semibold shadow-lg transition-all cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center pl-0.5">
                <Play size={12} fill="currentColor" />
              </div>
              <span>Student Stories</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

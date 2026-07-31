import { Play, ArrowUpRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1525921472402-364b4c81a293?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&w=800&q=80",
];

export default function Gallery() {
  return (
    <section className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col justify-center">

      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs font-bold tracking-widest text-[#0a1730] uppercase block">
          CAMPUS LIFE
        </span>
        <div className="w-8 h-0.5 bg-blue-600 mx-auto my-2" />
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#0a1730] mt-2">
          Experience KGEC
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 grid-rows-6 md:grid-rows-4 gap-2 md:gap-3 h-[55vh] md:h-[65vh] max-h-[700px] min-h-[400px]">
        
        {/* Box 1: Large feature */}
        <div className="col-span-2 row-span-2 relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm group">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[0]}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <span className="text-white font-bold text-lg md:text-xl leading-tight">Academic<br/>Excellence</span>
            <button className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
              <ArrowUpRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Box 2: Tall */}
        <div className="col-span-1 row-span-2 relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm group">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[1]}')` }}
          />
        </div>

        {/* Box 3: Small top */}
        <div className="col-span-1 row-span-1 relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm group hidden md:block">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[2]}')` }}
          />
        </div>

        {/* Box 4: Small top right */}
        <div className="col-span-1 row-span-1 relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm group hidden md:block">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[3]}')` }}
          />
        </div>

        {/* Box 5: Wide middle right */}
        <div className="col-span-2 row-span-1 relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm group hidden md:block">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[4]}')` }}
          />
           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:scale-110 transition-transform">
              <Play size={16} fill="currentColor" className="ml-1" />
            </button>
          </div>
        </div>

        {/* Box 6: Tall bottom left */}
        <div className="col-span-1 row-span-2 relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm group">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[5]}')` }}
          />
        </div>

        {/* Box 7: Wide middle */}
        <div className="col-span-2 row-span-1 relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm group">
           <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[6]}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1730]/90 to-transparent" />
          <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-center">
            <h4 className="text-white font-bold text-sm md:text-lg mb-2">Campus Tour</h4>
            <button className="w-fit flex items-center gap-2 text-[10px] md:text-xs font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-white hover:text-[#0a1730] transition-colors">
              <Play size={10} fill="currentColor" /> Watch Video
            </button>
          </div>
        </div>

        {/* Box 8: Small middle right */}
        <div className="col-span-1 row-span-1 relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm group">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[7]}')` }}
          />
        </div>

        {/* Box 9: Tall right */}
        <div className="col-span-1 row-span-2 relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm group hidden md:block">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[8]}')` }}
          />
        </div>

        {/* Box 10: Stat Block */}
        <div className="col-span-1 row-span-1 bg-[#0a1730] text-white rounded-xl md:rounded-2xl p-4 flex flex-col justify-center shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 transform translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 group-hover:scale-110 transition-transform">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.8l7.2 14.2H4.8L12 5.8z"/></svg>
          </div>
          <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-1">
            Community
          </span>
          <h4 className="text-xl md:text-3xl font-bold text-white">4.5k+</h4>
        </div>

        {/* Box 11: Small bottom */}
        <div className="col-span-1 row-span-1 relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm group">
           <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[9]}')` }}
          />
        </div>

        {/* Box 12: Small bottom */}
        <div className="col-span-1 row-span-1 relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm group hidden md:block">
           <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('${images[10]}')` }}
          />
        </div>

      </div>

      <div className="text-center mt-8">
        <button className="text-sm font-bold text-[#0a1730] hover:text-blue-600 transition-colors underline underline-offset-4 decoration-2 decoration-blue-200 hover:decoration-blue-600">
          View full gallery
        </button>
      </div>

    </section>
  );
}

import Image from "next/image";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import { Phone, MapPin, Building } from "lucide-react";

export const metadata = {
  title: "Hostels | Kalyani Government Engineering College",
  description: "Information about KGEC hostels including facilities, superintendents, and contact details.",
};

const HOSTELS = [
  {
    id: "vc",
    name: "Vidyasagar Chhatrabas (VC)",
    description: "The Vidyasagar Chhatrabas is the dedicated hostel for our 1st Year students, designed to foster a welcoming environment for newcomers. It provides excellent facilities for a smooth transition to college life, ensuring a ragging-free, supportive, and vibrant atmosphere.",
    location: "Near the Main Academic Block",
    year: "1st Year Hostel",
    superintendent: {
      name: "Dr. Anirban Mukherjee",
      role: "Superintendent",
      phone: "+91 9876543210"
    },
    asstSuperintendent: {
      name: "Prof. Sudipta Das",
      role: "Assistant Superintendent",
      phone: "+91 9876543211"
    }
  },
  {
    id: "apc",
    name: "Acharya Prafulla Chandra (APC) Hall",
    description: "APC Hall serves the 2nd Year students of KGEC. Equipped with modern amenities, study rooms, and recreational areas, it acts as the primary hub for sophomore interactions and academic collaborations.",
    location: "Adjacent to the Sports Ground",
    year: "2nd Year Hostel",
    superintendent: {
      name: "Dr. Subhasis Bhaumik",
      role: "Superintendent",
      phone: "+91 9876543212"
    },
    asstSuperintendent: {
      name: "Prof. Amitava Ray",
      role: "Assistant Superintendent",
      phone: "+91 9876543213"
    }
  },
  {
    id: "rrr",
    name: "Raja Rammohan Roy (RRR) Hall",
    description: "Catering to our senior 3rd and 4th-year students, the RRR Hall offers an environment suited for rigorous project work, placements preparation, and final-year studies. It provides single and double-occupancy rooms.",
    location: "Western Campus Wing",
    year: "3rd and 4th Year Hostel",
    superintendent: {
      name: "Dr. Koushik Ghosh",
      role: "Superintendent",
      phone: "+91 9876543214"
    },
    asstSuperintendent: {
      name: "Prof. Debasish Saha",
      role: "Assistant Superintendent",
      phone: "+91 9876543215"
    }
  },
  {
    id: "rbc",
    name: "Rishi Bankim Chandra (RBC) Hall",
    description: "The RBC Hall also serves the 3rd and 4th-year students. Similar to RRR, it is equipped with modern amenities and focused study areas, ensuring a peaceful ambiance conducive to deep academic pursuits and final year projects.",
    location: "Western Campus Wing",
    year: "3rd and 4th Year Hostel",
    superintendent: {
      name: "Dr. Ramesh Biswas",
      role: "Superintendent",
      phone: "+91 9876543220"
    },
    asstSuperintendent: {
      name: "Prof. Sanjib Saha",
      role: "Assistant Superintendent",
      phone: "+91 9876543221"
    }
  },
  {
    id: "pc",
    name: "Pritilata Chhatrinibas (PC)",
    description: "Pritilata Chhatrinibas is the dedicated Girl's Hostel, offering a highly secure and comfortable living space. With round-the-clock security, Wi-Fi, and well-maintained common rooms, it is a home away from home for female students.",
    location: "Next to the Faculty Quarters",
    year: "Girl's Hostel",
    superintendent: {
      name: "Dr. Tumpa Banerjee",
      role: "Superintendent",
      phone: "+91 9876543216"
    },
    asstSuperintendent: {
      name: "Prof. Sarmistha Mandal",
      role: "Assistant Superintendent",
      phone: "+91 9876543217"
    }
  },
  {
    id: "mtech",
    name: "M. Tech Hostel",
    description: "Designed specifically for postgraduate students and research scholars, this hostel features advanced facilities, high-speed internet, and a peaceful ambiance conducive to deep research and study.",
    location: "Northern Campus Boundary",
    year: "PG & Research Hostel",
    superintendent: {
      name: "Dr. Partha Pratim Sarkar",
      role: "Superintendent",
      phone: "+91 9876543218"
    },
    asstSuperintendent: {
      name: "Prof. Anjan Kumar",
      role: "Assistant Superintendent",
      phone: "+91 9876543219"
    }
  }
];

export default function HostelsPage() {
  return (
    <UnifiedPageLayout>
      <PageHero
        badge="Accommodations"
        title="KGEC Hostels"
        subtitle="Experience comfortable living, community bonding, and academic focus across our 6 well-equipped campus hostels."
      />

      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="flex flex-col gap-16 max-w-[1200px] mx-auto">
            {HOSTELS.map((hostel, index) => (
              <div 
                key={hostel.id} 
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200/50 group">
                  <div className="aspect-[4/3] w-full relative">
                    <Image
                      src="/hostel-building.png"
                      alt={hostel.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#022448]/90 via-[#022448]/20 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 mb-3">
                        <Building size={14} />
                        {hostel.year}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold font-serif text-white leading-tight">{hostel.name}</h2>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                  <div className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 md:p-8 hover:bg-slate-50 transition-colors">
                    <h3 className="text-lg font-bold text-[#022448] mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                      About the Hostel
                    </h3>
                    <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
                      {hostel.description}
                    </p>
                    
                    <div className="flex items-center gap-3 text-slate-700 text-sm font-semibold bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm w-fit">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                        <MapPin size={18} />
                      </div>
                      <span>{hostel.location}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Superintendent */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col gap-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200 transition-all">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 relative rounded-2xl overflow-hidden shrink-0 border-2 border-slate-100 shadow-inner">
                          <Image
                            src="/superintendent.png"
                            alt={hostel.superintendent.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">{hostel.superintendent.role}</div>
                          <div className="font-bold text-[#022448] text-[15px] leading-snug">{hostel.superintendent.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-700 bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl mt-auto">
                        <Phone size={14} className="text-blue-600" />
                        {hostel.superintendent.phone}
                      </div>
                    </div>

                    {/* Asst Superintendent */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col gap-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-emerald-200 transition-all">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 relative rounded-2xl overflow-hidden shrink-0 border-2 border-slate-100 shadow-inner">
                          <Image
                            src="/superintendent.png"
                            alt={hostel.asstSuperintendent.name}
                            fill
                            className="object-cover grayscale opacity-90"
                          />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">{hostel.asstSuperintendent.role}</div>
                          <div className="font-bold text-[#022448] text-[15px] leading-snug">{hostel.asstSuperintendent.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-700 bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl mt-auto">
                        <Phone size={14} className="text-emerald-600" />
                        {hostel.asstSuperintendent.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </UnifiedPageLayout>
  );
}

import {
  ArrowUpRight,
  BookOpen,
  Lightbulb,
  Award,
  Users,
  ArrowRight,
} from "lucide-react";

const impactCards = [
  {
    tag: "Campus Talk",
    title: "Academic Excellence",
    text: "Delivering quality education that empowers students to achieve academic and personal greatness.",
    icon: BookOpen,
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Innovation & Research",
    text: "Encouraging curiosity and creativity through research, projects and real-world problem solving.",
    icon: Lightbulb,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Leadership Development",
    text: "Nurturing leadership qualities and confidence to inspire change and lead with responsibility.",
    icon: Award,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Community & Culture",
    text: "Building a vibrant community that promotes inclusivity, collaboration and lifelong connections.",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Impact() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-widest text-kgec-navy uppercase block">
          IMPACT
        </span>
        <div className="w-8 h-0.5 bg-kgec-navy mx-auto my-2" />
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-kgec-navy mt-2">
          How We Are Shaping Futures <br />
          And Building Excellence!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
          Through innovation, learning, and community, we create an environment where ideas turn into impact and students become leaders.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-kgec-impact-panel text-white rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl group border border-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-kgec-impact-panel via-transparent to-black/30" />

                {card.tag && (
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
                    {card.tag}
                  </div>
                )}

                <button
                  aria-label={`Explore ${card.title}`}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="p-6 pt-2 flex flex-col flex-1 justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 text-blue-400 flex items-center justify-center mb-3">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <a
          href="#"
          className="rounded-full border border-kgec-navy/30 bg-white px-6 py-2.5 text-xs font-bold text-kgec-navy hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm"
        >
          <span>Discover More About KGEC</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}

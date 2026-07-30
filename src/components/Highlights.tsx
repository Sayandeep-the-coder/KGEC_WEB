import { TrendingUp, FlaskConical, Lightbulb } from "lucide-react";

const highlights = [
  {
    icon: TrendingUp,
    title: "Top Tier Placements",
    text: "Consistent records with global tech giants and national engineering leaders visiting our campus every year.",
  },
  {
    icon: FlaskConical,
    title: "Innovative Research",
    text: "Specialized labs and research grants driving breakthroughs in AI, Robotics, and Sustainable Energy.",
  },
  {
    icon: Lightbulb,
    title: "Entrepreneurship",
    text: "Our vibrant E-Cell nurtures student start-ups through incubation, mentorship, and funding opportunities.",
  },
];

export default function Highlights() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div key={title} className="border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-md">
            <Icon className="mb-4 text-blue-900" size={36} />
            <h3 className="mb-3 text-2xl font-semibold text-slate-900">{title}</h3>
            <p className="text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
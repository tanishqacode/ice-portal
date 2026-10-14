import {
  Users,
  BookOpen,
  FlaskConical,
  GraduationCap,
  CalendarDays,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const links = [
  {
    title: "Our Faculty",
    description: "Explore faculty profiles and areas of expertise.",
    icon: Users,
    page: "Faculty",
  },
  {
    title: "Academics",
    description: "Find information about courses and programmes.",
    icon: BookOpen,
    page: "Academics",
  },
  {
    title: "Research",
    description: "Discover research areas and publications.",
    icon: FlaskConical,
    page: "Research",
  },
  {
    title: "Student Corner",
    description: "Resources and opportunities for students.",
    icon: GraduationCap,
    page: "Students",
  },
  {
    title: "News & Events",
    description: "Department announcements and upcoming events.",
    icon: CalendarDays,
    page: "News & Events",
  },
  {
    title: "Contact Department",
    description: "Find department contact information.",
    icon: Mail,
    page: "Contact",
  },
];

export default function QuickLinks({ onNavigate }) {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0802d]">
            Explore
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-800 sm:text-2xl">
            Quick Links
          </h2>
        </div>
        <span className="hidden text-sm text-slate-500 sm:block">
          Your department resources
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {links.map(({ title, description, icon: Icon, page }) => (
          <button
            key={title}
            onClick={() => onNavigate(page)}
            className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex w-full items-start justify-between">
              <div className="rounded-xl bg-blue-50 p-3 text-[#123b62] transition group-hover:bg-[#123b62] group-hover:text-white">
                <Icon size={23} />
              </div>
              <ArrowUpRight
                size={19}
                className="text-slate-300 transition group-hover:text-[#b0802d]"
              />
            </div>

            <h3 className="mt-5 font-bold text-slate-800">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
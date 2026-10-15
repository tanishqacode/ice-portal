import {
  Home,
  Building2,
  Users,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Newspaper,
  Mail,
  ChevronRight,
} from "lucide-react";

const sidebarItems = [
  { label: "Home", icon: Home },
  { label: "About Department", icon: Building2 },
  { label: "Faculty", icon: Users },
  { label: "Academics", icon: BookOpen },
  { label: "Research & Publications", icon: FlaskConical },
  { label: "Students", icon: GraduationCap },
  {label:"Alumni", icon:GraduationCap},
  { label: "News & Events", icon: Newspaper },
  { label: "Contact Us", icon: Mail },
];


const pageMapping = {
  Home: "Home",
  "About Department": "About",
  Faculty: "Faculty",
  Academics: "Academics",
  "Research & Publications": "Research",
  Students: "Students",
  Alumni: "Alumni",
  "News & Events": "News & Events",
  "Contact Us": "Contact",
};


export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-[#123b62] px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
          Department Menu
        </p>
        <h2 className="mt-1 text-lg font-bold text-white">
          Explore ICE
        </h2>
      </div>

      <nav className="p-2">
        {sidebarItems.map(({ label, icon: Icon }) => {
          const page = pageMapping[label];
          const isActive = activePage === page;

          return (
            <button
              key={label}
              onClick={() => onNavigate(page)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                isActive
                  ? "bg-blue-50 font-bold text-[#123b62]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#123b62]"
              }`}
            >
              <Icon
                size={18}
                className={
                  isActive
                    ? "text-[#b0802d]"
                    : "text-slate-400 group-hover:text-[#123b62]"
                }
              />
              <span className="flex-1">{label}</span>
              <ChevronRight
                size={15}
                className={isActive ? "text-[#b0802d]" : "text-slate-300"}
              />
            </button>
          );
        })}
      </nav>

      <div className="mx-4 mb-4 rounded-lg bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-800">
          Department of ICE
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Instrumentation, control, automation, and interdisciplinary research.
        </p>
      </div>
    </aside>
  );
}
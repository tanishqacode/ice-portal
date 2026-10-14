import { Menu, X, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import logo from "./images/logo.jpeg";

const navItems = [
  "Home",
  "About",
  "Faculty",
  "Academics",
  "Research",
  "Students",
  "Contact",
];

export default function Header({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (item) => {
    onNavigate(item);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top strip */}
      <div className="bg-[#102f50] px-4 py-2 text-xs text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <span>Dr. B. R. Ambedkar National Institute of Technology Jalandhar</span>
          <div className="hidden items-center gap-4 sm:flex">
            <span>Institute Website</span>
            <span className="text-blue-300">|</span>
            <span>Student Portal</span>
          </div>
        </div>
      </div>

      {/* Main institute header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-8">
          <button
            onClick={() => navigate("Home")}
            className="flex min-w-0 items-center gap-3 text-left"
            aria-label="Go to home page"
          >
            <img
              src={logo}
              alt="NIT Jalandhar logo"
              className="h-15 w-15  bg-[#123b62]"
            />

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#b0802d] sm:text-sm">
                NIT Jalandhar
              </p>
              <h1 className="mt-1 text-sm font-extrabold leading-tight text-[#123b62] sm:text-xl">
                Department of Instrumentation
                <span className="block">and Control Engineering</span>
              </h1>
            </div>
          </button>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-700">
                Instrumentation & Control
              </p>
              <p className="text-xs text-slate-500">
                Dr. B. R. Ambedkar NIT Jalandhar
              </p>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <Search size={21} className="text-slate-500" />
          </div>

          <button
            className="rounded-lg p-2 text-[#123b62] hover:bg-slate-100 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden bg-[#123b62] lg:block">
          <div className="mx-auto flex max-w-7xl items-center px-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => navigate(item)}
                className={`border-b-4 px-5 py-4 text-sm font-semibold transition ${
                  activePage === item
                    ? "border-[#e0b253] bg-white/10 text-white"
                    : "border-transparent text-blue-50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
            <button
              className="ml-auto flex items-center gap-2 py-4 text-sm text-white/90"
              onClick={() => navigate("Contact")}
            >
              More <ChevronDown size={15} />
            </button>
          </div>
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(item)}
                  className={`rounded-lg px-3 py-3 text-left text-sm font-semibold ${
                    activePage === item
                      ? "bg-[#123b62] text-white"
                      : "bg-slate-50 text-slate-700 hover:bg-blue-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
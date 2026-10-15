
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  CircleUserRound,
  LogOut,
  UserRound,
} from "lucide-react";

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

export default function Header({
  activePage,
  onNavigate,
  onAuthClick,
  currentUser,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = (item) => {
    onNavigate?.(item);
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const openProfile = () => {
    navigate("Profile");
  };

  const logout = () => {
    setProfileOpen(false);
    setMenuOpen(false);
    onLogout?.();
  };

  return (
    <>
      {/* Top strip */}
      <div className="relative z-50 w-full bg-[#102f50] px-4 py-2 text-xs text-white sm:px-8 lg:px-10">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <span className="hidden sm:inline">
            Dr. B. R. Ambedkar National Institute of Technology Jalandhar
          </span>

          <span className="sm:hidden">
            NIT Jalandhar
          </span>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate("Home")}
              className="hidden text-blue-100 transition hover:text-white sm:inline"
            >
              Institute Website
            </button>

            <span className="text-white/40">|</span>

            {!currentUser ? (
              <button
                type="button"
                onClick={onAuthClick}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#123d70] hover:bg-blue-50"
              >
                Login / Sign Up
              </button>
            ) : (
              <div className="relative flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-white">
                    {currentUser.displayName || currentUser.name || "User"}
                  </p>

                  <p className="text-xs capitalize text-blue-100">
                    {currentUser.role}
                  </p>
                </div>

                {/* Profile icon */}
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  className="rounded-full p-2 text-blue-200 transition hover:bg-white/10 hover:text-white"
                >
                  <CircleUserRound size={30} />
                </button>

                {/* Profile dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 rounded-xl border border-slate-200 bg-white p-3 text-slate-800 shadow-xl">
                    <div className="border-b border-slate-100 px-3 pb-3">
                      <p className="font-semibold">
                        {currentUser.displayName ||
                          currentUser.name ||
                          "User"}
                      </p>

                      <p className="mt-1 break-all text-xs text-slate-500">
                        {currentUser.email || currentUser.identifier || ""}
                      </p>

                      <p className="mt-1 text-xs capitalize text-slate-500">
                        {currentUser.role}
                      </p>
                    </div>

                    {/* View Profile */}
                    <button
                      type="button"
                      onClick={openProfile}
                      className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-[#123b62]"
                    >
                      <UserRound size={17} />
                      View Profile
                    </button>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={logout}
                      className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main institute header */}
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-5 sm:px-8 lg:px-10">
          {/* Logo and department name */}
          <button
            type="button"
            onClick={() => navigate("Home")}
            className="flex min-w-0 items-center gap-3 text-left"
            aria-label="Go to home page"
          >
            <img
              src={logo}
              alt="NIT Jalandhar logo"
              className="h-14 w-14 shrink-0 rounded-full object-contain sm:h-16 sm:w-16"
            />

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#b0802d] sm:text-sm">
                NIT Jalandhar
              </p>

              <h1 className="mt-1 text-sm font-extrabold leading-tight text-[#123b62] sm:text-xl">
                Department of Instrumentation
                <span className="block">
                  and Control Engineering
                </span>
              </h1>
            </div>
          </button>

          {/* Department details and search */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-700 xl:text-base">
                Instrumentation &amp; Control
              </p>

              <p className="text-xs text-slate-500 xl:text-sm">
                Dr. B. R. Ambedkar NIT Jalandhar
              </p>
            </div>

            <div className="mx-1 h-10 w-px bg-slate-200" />

            <button
              type="button"
              aria-label="Search"
              onClick={() => {
                // Search functionality can be added later.
              }}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-[#123b62]"
            >
              <Search size={23} />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="shrink-0 rounded-lg p-2 text-[#123b62] transition hover:bg-slate-100 lg:hidden"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden w-full bg-[#123b62] lg:block">
          <div className="flex w-full items-center px-4 sm:px-8 lg:px-10">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => navigate(item)}
                className={`border-b-4 px-4 py-4 text-sm font-semibold transition xl:px-5 ${
                  activePage === item
                    ? "border-[#e0b253] bg-white/10 text-white"
                    : "border-transparent text-blue-50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              className="ml-auto flex items-center gap-2 border-b-4 border-transparent py-4 pl-4 text-sm text-white/90 transition hover:text-white"
              onClick={() => navigate("Contact")}
            >
              More <ChevronDown size={15} />
            </button>
          </div>
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {navItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => navigate(item)}
                  className={`rounded-lg px-3 py-3 text-left text-sm font-semibold transition ${
                    activePage === item
                      ? "bg-[#123b62] text-white"
                      : "bg-slate-50 text-slate-700 hover:bg-blue-50"
                  }`}
                >
                  {item}
                </button>
              ))}

              {currentUser && (
                <button
                  type="button"
                  onClick={openProfile}
                  className="rounded-lg bg-blue-50 px-3 py-3 text-left text-sm font-semibold text-[#123b62] hover:bg-blue-100"
                >
                  View Profile
                </button>
              )}

              {currentUser ? (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg bg-red-50 px-3 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onAuthClick?.();
                  }}
                  className="rounded-lg bg-amber-50 px-3 py-3 text-left text-sm font-semibold text-[#123b62] hover:bg-amber-100"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

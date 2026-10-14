
import { useMemo, useState } from "react";
import {
  Search,
  X,
  ChevronRight,
  BriefcaseBusiness,
  GraduationCap,
  SlidersHorizontal,
} from "lucide-react";
import FacultyProfile from "./FacultyProfile";
import { facultyData, allInterests, designations } from "./data/facultyData";

function FacultyCard({ faculty, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#123b62] to-[#3678a5] text-xl font-bold text-white">
          {faculty.initials}
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#123b62]">
          {faculty.designation}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-extrabold text-slate-800 transition group-hover:text-[#123b62]">
        {faculty.name}
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        {faculty.qualification}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <BriefcaseBusiness size={16} className="shrink-0 text-[#b0802d]" />
        {faculty.experience} years of experience
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {faculty.interests.slice(0, 3).map((interest) => (
          <span
            key={interest}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
          >
            {interest}
          </span>
        ))}
      </div>

      <div className="mt-auto flex w-full items-center justify-between border-t border-slate-100 pt-4 mt-5">
        <span className="text-sm font-bold text-[#123b62]">
          View full profile
        </span>
        <ChevronRight
          size={18}
          className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#123b62]"
        />
      </div>
    </button>
  );
}

export default function Faculty({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [interest, setInterest] = useState("");
  const [designation, setDesignation] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredFaculty = useMemo(() => {
    const query = search.trim().toLowerCase();

    return facultyData.filter((faculty) => {
      const matchesSearch =
        !query ||
        faculty.name.toLowerCase().includes(query) ||
        faculty.designation.toLowerCase().includes(query) ||
        faculty.qualification.toLowerCase().includes(query) ||
        faculty.interests.some((item) =>
          item.toLowerCase().includes(query)
        );

      const matchesInterest =
        !interest || faculty.interests.includes(interest);

      const matchesDesignation =
        !designation || faculty.designation === designation;

      return matchesSearch && matchesInterest && matchesDesignation;
    });
  }, [search, interest, designation]);

  const clearFilters = () => {
    setSearch("");
    setInterest("");
    setDesignation("");
  };

  if (selectedFaculty) {
    return (
      <FacultyProfile
        faculty={selectedFaculty}
        onBack={() => setSelectedFaculty(null)}
      />
    );
  }

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-2xl bg-[#123b62] p-6 text-white shadow-sm sm:p-9">
        <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border border-white/10" />
        <div className="absolute -right-2 -top-5 h-36 w-36 rounded-full border border-white/10" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
            <GraduationCap size={15} />
            PEOPLE & RESEARCH
          </div>

          <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">
            Faculty Directory
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Discover faculty expertise, academic backgrounds, research
            interests, publications and professional experience in one place.
          </p>

          <div className="mt-7 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/10 p-4">
              <p className="text-2xl font-extrabold">{facultyData.length}</p>
              <p className="mt-1 text-xs text-blue-100">Sample profiles</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/10 p-4">
              <p className="text-2xl font-extrabold">{allInterests.length}</p>
              <p className="mt-1 text-xs text-blue-100">Research areas</p>
            </div>

            <div className="col-span-2 rounded-xl border border-white/10 bg-white/10 p-4 sm:col-span-1">
              <p className="text-2xl font-extrabold">Explore</p>
              <p className="mt-1 text-xs text-blue-100">Faculty expertise</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, qualification or research area..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123b62] focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((previous) => !previous)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <SlidersHorizontal size={17} />
            {showFilters ? "Hide filters" : "Filters"}
            {(interest || designation) && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#123b62] text-xs text-white">
                {[interest, designation].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="faculty-interest"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Research area
              </label>
              <select
                id="faculty-interest"
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-[#123b62]"
              >
                <option value="">All research areas</option>
                {allInterests.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="faculty-designation"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Designation
              </label>
              <select
                id="faculty-designation"
                value={designation}
                onChange={(event) => setDesignation(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-[#123b62]"
              >
                <option value="">All designations</option>
                {designations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <strong className="text-slate-800">
              {filteredFaculty.length}
            </strong>{" "}
            of {facultyData.length} profiles
          </p>

          {(search || interest || designation) && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#123b62] hover:text-[#b0802d]"
            >
              <X size={15} />
              Clear filters
            </button>
          )}
        </div>
      </section>

      <div>
        <h2 className="text-xl font-extrabold text-slate-800">
          Explore faculty
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Select a profile to explore academic and research details.
        </p>
      </div>

      {filteredFaculty.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredFaculty.map((faculty) => (
            <FacultyCard
              key={faculty.id}
              faculty={faculty}
              onClick={() => setSelectedFaculty(faculty)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <Search size={30} className="mx-auto text-slate-400" />
          <h3 className="mt-4 font-bold text-slate-800">
            No faculty profiles found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Try another name or change your selected filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-lg bg-[#123b62] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0d2b49]"
          >
            Reset search
          </button>
        </div>
      )}

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-900 sm:text-sm">
        <strong>Development preview:</strong> All faculty records are
        fictional sample data. Replace them with verified information before
        publishing.
      </div>
    </div>
  );
}

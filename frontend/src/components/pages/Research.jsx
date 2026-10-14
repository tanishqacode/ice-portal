// import SectionPage from "./SectionPage";

// export default function Research({ onNavigate }) {
//   return (
//     <SectionPage
//       title="Research & Publications"
//       description="Explore research areas, faculty publications and research opportunities. Publication records can be connected to the database later."
//       onNavigate={onNavigate}
//     />
//   );
// }


import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  ExternalLink,
  CalendarDays,
  UserRound,
  SlidersHorizontal,
  RotateCcw,
  FileText,
  ArrowUpDown,
  Microscope,
} from "lucide-react";
import { researchData } from "./data/researchData";

const uniqueValues = (key) => [
  ...new Set(researchData.map((paper) => paper[key])),
].sort();

function ResearchCard({ paper }) {
  const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(
    paper.scholarQuery || paper.title
  )}`;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {paper.area}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {paper.type}
        </span>
        <span className="ml-auto flex items-center gap-1 text-sm font-semibold text-slate-500">
          <CalendarDays size={15} />
          {paper.year}
        </span>
      </div>

      <h2 className="mt-4 text-lg font-bold leading-7 text-slate-900 transition group-hover:text-blue-800">
        {paper.title}
      </h2>

      <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
        <UserRound size={17} className="mt-0.5 shrink-0 text-blue-700" />
        <p>{paper.authors.join(", ")}</p>
      </div>

      <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
        <BookOpen size={17} className="mt-0.5 shrink-0" />
        <p>{paper.publication}</p>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {paper.abstract}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-500">
          Faculty: {paper.faculty}
        </span>

        <a
          href={scholarUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          Find paper
          <ExternalLink size={15} />
        </a>
      </div>
    </article>
  );
}

export default function Research({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [area, setArea] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const years = useMemo(
    () => [...new Set(researchData.map((paper) => paper.year))].sort(
      (a, b) => b - a
    ),
    []
  );

  const facultyNames = useMemo(
    () => uniqueValues("faculty"),
    []
  );

  const researchAreas = useMemo(
    () => uniqueValues("area"),
    []
  );

  const filteredPapers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = researchData.filter((paper) => {
      const searchableText = [
        paper.title,
        ...paper.authors,
        paper.faculty,
        paper.area,
        paper.publication,
        paper.abstract,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesYear =
        !year || String(paper.year) === year;

      const matchesFaculty =
        !faculty || paper.faculty === faculty;

      const matchesArea =
        !area || paper.area === area;

      return (
        matchesSearch &&
        matchesYear &&
        matchesFaculty &&
        matchesArea
      );
    });

    return [...results].sort((a, b) => {
      if (sortBy === "oldest") return a.year - b.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return b.year - a.year;
    });
  }, [search, year, faculty, area, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setYear("");
    setFaculty("");
    setArea("");
    setSortBy("newest");
  };

  const hasFilters = search || year || faculty || area;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-blue-200">
            <Microscope size={17} />
            ICE Department Portal
            <span className="text-blue-400">/</span>
            Research Repository
          </div>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Research & Publications
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Discover research papers, explore faculty contributions,
            and find publications across instrumentation, control
            systems, automation, sensors, and emerging technologies.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <FileText size={21} className="text-cyan-200" />
              <div>
                <p className="text-xl font-bold">{researchData.length}</p>
                <p className="text-xs text-blue-100">Sample records</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <UserRound size={21} className="text-cyan-200" />
              <div>
                <p className="text-xl font-bold">{facultyNames.length}</p>
                <p className="text-xs text-blue-100">Sample faculty</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <Microscope size={21} className="text-cyan-200" />
              <div>
                <p className="text-xl font-bold">{researchAreas.length}</p>
                <p className="text-xs text-blue-100">Research areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Find research papers
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Search by title, author name, faculty member, publication,
            or keyword.
          </p>

          <div className="relative mt-5">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. control systems, Dr. Aarav Mehta, sensor..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Publication year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All years</option>
                {years.map((item) => (
                  <option key={item} value={String(item)}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Faculty member
              </label>
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All faculty</option>
                {facultyNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Research area
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All research areas</option>
                {researchAreas.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Sort by
              </label>
              <div className="relative">
                <ArrowUpDown
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title">Paper title (A–Z)</option>
                </select>
              </div>
            </div>
          </div>

          {hasFilters && (
            <div className="mt-4">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                <RotateCcw size={15} />
                Clear filters
              </button>
            </div>
          )}
        </section>

        <div className="mb-5 mt-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Publications
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredPapers.length} of {researchData.length} records
            </p>
          </div>
        </div>

        {filteredPapers.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {filteredPapers.map((paper) => (
              <ResearchCard key={paper.id} paper={paper} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Search size={32} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No publications found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try a different search term or remove one or more filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Reset search
            </button>
          </div>
        )}

        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
          Demo notice: all publication titles, author details, and
          publication venues displayed here are fictional sample data.
          Google Scholar links search for the title and do not verify
          that the sample publication exists. Replace these records
          with verified publications before presenting the portal as
          an official department resource.
        </p>
      </main>
    </div>
  );
}


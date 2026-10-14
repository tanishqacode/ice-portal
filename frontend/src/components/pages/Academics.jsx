
import { useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  CalendarDays,
  FileText,
  ExternalLink,
  Search,
  FlaskConical,
  ClipboardList,
  ArrowUpRight,
  BookMarked,
  Layers3,
  Info,
} from "lucide-react";

import {
  programmes,
  semesterSubjects,
  academicResources,
} from "./data/academicData";

const categoryStyles = {
  Core: "bg-blue-50 text-blue-700",
  Elective: "bg-violet-50 text-violet-700",
  Project: "bg-emerald-50 text-emerald-700",
};

function SubjectCard({ subject }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <BookOpen size={21} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold leading-6 text-slate-900">
          {subject.name}
        </h3>

        <span
          className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
            categoryStyles[subject.category] ||
            "bg-slate-100 text-slate-600"
          }`}
        >
          {subject.category}
        </span>
      </div>
    </div>
  );
}

function ResourceCard({ resource }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-blue-700 transition group-hover:bg-blue-50">
          <FileText size={21} />
        </div>

        {resource.link ? (
          <ArrowUpRight size={18} className="text-slate-400" />
        ) : (
          <Info size={18} className="text-slate-400" />
        )}
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-blue-700">
        {resource.category}
      </p>

      <h3 className="mt-2 font-bold text-slate-900">{resource.title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {resource.description}
      </p>

      <p className="mt-4 text-sm font-semibold text-blue-700">
        {resource.link ? (
          <span className="inline-flex items-center gap-2">
            Open resource
            {resource.external && <ExternalLink size={14} />}
          </span>
        ) : (
          "Resource link to be added"
        )}
      </p>
    </>
  );

  if (resource.link) {
    return (
      <a
        href={resource.link}
        target={resource.external ? "_blank" : undefined}
        rel={resource.external ? "noreferrer" : undefined}
        className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group rounded-2xl border border-dashed border-slate-300 bg-white p-5">
      {content}
    </div>
  );
}

export default function Academics({ onNavigate }) {
  const [activeSemester, setActiveSemester] = useState(3);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("subjects");

  const selectedSemester = semesterSubjects.find(
    (item) => item.semester === activeSemester
  );

  const filteredSubjects = useMemo(() => {
    const subjects = selectedSemester?.subjects || [];
    const query = search.trim().toLowerCase();

    return subjects.filter((subject) => {
      const matchesSearch = subject.name.toLowerCase().includes(query);
      const matchesCategory =
        activeCategory === "All" || subject.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [selectedSemester, search, activeCategory]);

  const resetSubjectFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  const categories = ["All", "Core", "Elective", "Project"];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-blue-200">
            <GraduationCap size={18} />
            ICE Department Portal
            <span className="text-blue-400">/</span>
            Academics
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Academics
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Your central hub for programme information, semester-wise
            subjects, curriculum resources and academic guidance.
          </p>

          <div className="mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
              <GraduationCap size={23} className="text-cyan-200" />
              <div>
                <p className="font-bold">B.Tech. ICE</p>
                <p className="text-xs text-blue-100">Programme overview</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
              <Layers3 size={23} className="text-cyan-200" />
              <div>
                <p className="font-bold">8 semesters</p>
                <p className="text-xs text-blue-100">Browse subjects</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
              <BookMarked size={23} className="text-cyan-200" />
              <div>
                <p className="font-bold">{academicResources.length} resources</p>
                <p className="text-xs text-blue-100">Resource directory</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <GraduationCap size={25} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  Programme overview
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {programmes[0].name}
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
              {programmes[0].description}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                <strong>{programmes[0].duration}</strong> duration
              </span>
              <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                <strong>{programmes[0].semesters}</strong> semesters
              </span>
              <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                {programmes[0].level}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-5">
              <BookOpen size={22} className="text-blue-700" />
              <h3 className="mt-3 font-bold text-slate-900">
                Curriculum
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Browse semester-wise subjects and course categories.
              </p>
            </div>

            <div className="p-5">
              <FlaskConical size={22} className="text-blue-700" />
              <h3 className="mt-3 font-bold text-slate-900">
                Laboratories
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Find space for lab manuals, practical guides and experiments.
              </p>
            </div>

            <div className="p-5">
              <CalendarDays size={22} className="text-blue-700" />
              <h3 className="mt-3 font-bold text-slate-900">
                Academic planning
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Keep academic calendars, schedules and regulations together.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-9 flex flex-wrap gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("subjects")}
            className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${
              activeTab === "subjects"
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <BookOpen size={17} />
              Semester subjects
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("resources")}
            className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${
              activeTab === "resources"
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <ClipboardList size={17} />
              Academic resources
            </span>
          </button>
        </div>

        {activeTab === "subjects" ? (
          <section className="pt-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Semester-wise curriculum
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Select your semester to explore its listed subjects.
                </p>
              </div>

              <div className="w-full sm:w-56">
                <label
                  htmlFor="semester-select"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Select semester
                </label>
                <select
                  id="semester-select"
                  value={activeSemester}
                  onChange={(e) => {
                    setActiveSemester(Number(e.target.value));
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {semesterSubjects.map((item) => (
                    <option key={item.semester} value={item.semester}>
                      Semester {item.semester}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search subjects..."
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        activeCategory === category
                          ? "bg-blue-700 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <h3 className="font-bold text-slate-900">
                  Semester {activeSemester}
                </h3>
                <span className="text-sm text-slate-500">
                  {filteredSubjects.length} subjects
                </span>
              </div>

              {filteredSubjects.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {filteredSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.name}
                      subject={subject}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Search size={28} className="mx-auto text-slate-400" />
                  <p className="mt-3 font-semibold text-slate-800">
                    No matching subjects
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try a different keyword or category.
                  </p>
                  <button
                    type="button"
                    onClick={resetSubjectFilters}
                    className="mt-4 text-sm font-semibold text-blue-700 hover:underline"
                  >
                    Clear subject filters
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="pt-7">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Academic resources
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Access institute information and browse spaces for
                curriculum documents, question papers and student resources.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {academicResources.map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm leading-6 text-amber-900">
            <strong>Prototype notice:</strong> The subject lists are illustrative
            and may not match the current official ICE curriculum. Verify the
            course names and semester allocation with the official syllabus
            before publishing. Resource cards without links are placeholders.
          </p>
        </div>
      </main>
    </div>
  );
}

// import SectionPage from "./SectionPage";

// export default function Students({ onNavigate }) {
//   return (
//     <SectionPage
//       title="Student Corner"
//       description="A space for student resources, projects, research collaboration and academic opportunities."
//       onNavigate={onNavigate}
//     />
//   );
// }


import { useMemo, useState } from "react";
import {
  Search,
  Users,
  BriefcaseBusiness,
  FlaskConical,
  Lightbulb,
  CalendarDays,
  MapPin,
  Plus,
  X,
  ArrowUpRight,
  GraduationCap,
  Clock,
  Filter,
  MessageCircle,
  Code2,
  Send,
  ShieldCheck,
} from "lucide-react";

import { initialStudentPosts } from "./data/studentCornerData";

const postTypes = [
  "All",
  "Faculty Requirement",
  "Project Collaboration",
  "Internship",
  "Job",
  "Research Opportunity",
  "Hackathon",
];

const typeStyles = {
  "Faculty Requirement": "bg-violet-50 text-violet-700",
  "Project Collaboration": "bg-blue-50 text-blue-700",
  Internship: "bg-emerald-50 text-emerald-700",
  Job: "bg-orange-50 text-orange-700",
  "Research Opportunity": "bg-indigo-50 text-indigo-700",
  Hackathon: "bg-pink-50 text-pink-700",
};

const typeIcons = {
  "Faculty Requirement": FlaskConical,
  "Project Collaboration": Users,
  Internship: BriefcaseBusiness,
  Job: BriefcaseBusiness,
  "Research Opportunity": Lightbulb,
  Hackathon: Code2,
};

function formatDate(date) {
  if (!date) return "Not specified";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function OpportunityCard({ post, onView }) {
  const Icon = typeIcons[post.type] || Lightbulb;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
            typeStyles[post.type] || "bg-slate-100 text-slate-700"
          }`}
        >
          <Icon size={14} />
          {post.type}
        </span>

        {post.featured && (
          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
            Featured
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold leading-7 text-slate-900">
        {post.title}
      </h3>

      <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          {post.authorRole === "Faculty" ? (
            <GraduationCap size={17} />
          ) : (
            <Users size={16} />
          )}
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-slate-800">{post.author}</p>
          <p className="text-xs text-slate-500">{post.authorRole}</p>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
        {post.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(post.skills || []).slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <MapPin size={15} className="shrink-0" />
          {post.location} · {post.mode}
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="shrink-0" />
          Deadline: {formatDate(post.deadline)}
        </div>

        <div className="flex items-center gap-2">
          <Users size={15} className="shrink-0" />
          {post.openings || 1} opening(s)
        </div>
      </div>

      <button
        type="button"
        onClick={() => onView(post)}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
      >
        View details
        <ArrowUpRight size={16} />
      </button>
    </article>
  );
}

function CreatePostModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    type: "Project Collaboration",
    author: "",
    authorRole: "Student",
    description: "",
    mode: "On Campus",
    location: "NIT Jalandhar",
    deadline: "",
    skills: "",
    openings: "1",
  });

  const update = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onCreate({
      ...form,
      id: Date.now(),
      department: "ICE",
      date: new Date().toISOString().slice(0, 10),
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      openings: Math.max(1, Number(form.openings) || 1),
      contact: "Contact details to be added",
      featured: false,
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="my-auto max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white p-5 sm:p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Create a community post
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Share an opportunity or find collaborators.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Post title *
            </label>
            <input
              required
              maxLength={120}
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Looking for teammates for a robotics project"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Post category *
              </label>
              <select
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
                className={inputClass}
              >
                {postTypes.filter((type) => type !== "All").map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Posted by *
              </label>
              <input
                required
                maxLength={80}
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
                placeholder="Your name"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description *
            </label>
            <textarea
              required
              minLength={10}
              maxLength={1500}
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe the opportunity, requirements, skills, eligibility and how interested students can participate."
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Required skills
            </label>
            <input
              value={form.skills}
              onChange={(e) => update("skills", e.target.value)}
              placeholder="Python, Arduino, React (comma-separated)"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Opportunity mode
              </label>
              <select
                value={form.mode}
                onChange={(e) => {
                  const mode = e.target.value;
                  update("mode", mode);

                  if (mode === "Remote") update("location", "Remote");
                  if (mode === "On Campus") update("location", "NIT Jalandhar");
                }}
                className={inputClass}
              >
                <option>On Campus</option>
                <option>Off Campus</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Location
              </label>
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="City, campus or remote"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Application deadline
              </label>
              <input
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={form.deadline}
                onChange={(e) => update("deadline", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Number of openings
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={form.openings}
                onChange={(e) => update("openings", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
            Demo mode: this post is visible only in the current browser
            session. Real accounts, faculty verification, and database
            storage must be implemented before public use.
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              <Send size={16} />
              Publish demo post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PostDetailsModal({ post, onClose }) {
  const Icon = typeIcons[post.type] || Lightbulb;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
      <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
              typeStyles[post.type] || "bg-slate-100 text-slate-700"
            }`}
          >
            <Icon size={14} />
            {post.type}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="mt-4 text-2xl font-bold leading-8 text-slate-900">
          {post.title}
        </h2>

        <p className="mt-3 text-sm text-slate-600">
          Posted by <strong className="text-slate-800">{post.author}</strong>
          {" · "}
          {post.authorRole}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
          <span className="rounded-lg bg-slate-100 px-3 py-2">
            <MapPin size={13} className="mr-1 inline" />
            {post.location} · {post.mode}
          </span>
          <span className="rounded-lg bg-slate-100 px-3 py-2">
            <Clock size={13} className="mr-1 inline" />
            Deadline: {formatDate(post.deadline)}
          </span>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-slate-900">About this opportunity</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">
            {post.description}
          </p>
        </div>

        <div className="mt-5">
          <h3 className="font-bold text-slate-900">Required skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {(post.skills || []).length ? (
              post.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-500">
                No specific skills listed.
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">
            {post.openings || 1} opening(s)
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {post.contact}
          </p>
        </div>

        <p className="mt-4 text-xs leading-5 text-amber-800">
          Demo listing: this portal has not yet verified the author or
          opportunity. Contact and application functionality is not connected.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Close details
        </button>
      </div>
    </div>
  );
}

export default function Students({ onNavigate }) {
  const [posts, setPosts] = useState(initialStudentPosts);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [activeMode, setActiveMode] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts
      .filter((post) => {
        const searchable = [
          post.title,
          post.author,
          post.description,
          post.type,
          post.department,
          ...(post.skills || []),
        ]
          .join(" ")
          .toLowerCase();

        return (
          (!query || searchable.includes(query)) &&
          (activeType === "All" || post.type === activeType) &&
          (activeMode === "All" || post.mode === activeMode)
        );
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }
        return new Date(b.date) - new Date(a.date);
      });
  }, [posts, search, activeType, activeMode]);

  const facultyCount = posts.filter(
    (post) => post.authorRole === "Faculty"
  ).length;

  const resetFilters = () => {
    setSearch("");
    setActiveType("All");
    setActiveMode("All");
  };

  const handleCreatePost = (post) => {
    setPosts((previous) => [post, ...previous]);
    setShowCreateModal(false);
    setSearch("");
    setActiveType("All");
    setActiveMode("All");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-blue-200">
            <Users size={18} />
            ICE Department Portal
            <span className="text-blue-400">/</span>
            Student Corner
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Student Corner
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                Find teammates, connect with research opportunities,
                discover internships, and turn ideas into projects.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-blue-900 shadow-lg transition hover:bg-blue-50"
            >
              <Plus size={19} />
              Create a post
            </button>
          </div>

          <div className="mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
              <BriefcaseBusiness size={23} className="text-cyan-200" />
              <div>
                <p className="text-xl font-bold">{posts.length}</p>
                <p className="text-xs text-blue-100">Demo listings</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
              <GraduationCap size={23} className="text-cyan-200" />
              <div>
                <p className="text-xl font-bold">{facultyCount}</p>
                <p className="text-xs text-blue-100">Faculty posts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
              <MessageCircle size={23} className="text-cyan-200" />
              <div>
                <p className="text-xl font-bold">Connect</p>
                <p className="text-xs text-blue-100">Collaborate and learn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Users size={22} />
            </div>
            <h2 className="mt-4 font-bold text-slate-900">
              Find collaborators
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Find peers with the skills and interests your project needs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <FlaskConical size={22} />
            </div>
            <h2 className="mt-4 font-bold text-slate-900">
              Join research projects
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Discover faculty requirements, research work and project openings.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <BriefcaseBusiness size={22} />
            </div>
            <h2 className="mt-4 font-bold text-slate-900">
              Explore opportunities
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Browse internships, jobs, hackathons and innovation challenges.
            </p>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <Search size={20} className="text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Explore opportunities
            </h2>
          </div>

          <div className="relative mt-4">
            <Search
              size={19}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, skills or keywords..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {postTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  activeType === type
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setShowFilters((previous) => !previous)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Filter size={16} />
              Location filter
            </button>

            <p className="text-sm text-slate-500">
              {filteredPosts.length} opportunities found
            </p>
          </div>

          {showFilters && (
            <div className="mt-3 max-w-sm">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Opportunity mode
              </label>
              <select
                value={activeMode}
                onChange={(e) => setActiveMode(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All modes</option>
                <option value="On Campus">On Campus</option>
                <option value="Off Campus">Off Campus</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          )}

          {(search || activeType !== "All" || activeMode !== "All") && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-3 text-sm font-semibold text-blue-700 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </section>

        <div className="mb-5 mt-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Latest posts
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Opportunities and collaboration requests from the community.
            </p>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <OpportunityCard
                key={post.id}
                post={post}
                onView={setSelectedPost}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Search size={32} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No matching opportunities
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another keyword or clear your filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Reset filters
            </button>
          </div>
        )}

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck size={22} className="mt-0.5 shrink-0 text-blue-700" />
            <div>
              <h3 className="font-bold text-slate-900">
                Keep the community trustworthy
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Before launch, require institute sign-in, verify faculty
                accounts, moderate posts, and check external internship
                listings. Never ask students to share passwords or sensitive
                documents in public posts.
              </p>
            </div>
          </div>
        </section>

        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
          Prototype notice: all displayed opportunities are fictional
          examples. Creating a post adds it to the current React state only;
          it will not be saved after a refresh. Messaging, applications,
          authentication and persistent storage are not yet connected.
        </p>
      </main>

      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePost}
        />
      )}

      {selectedPost && (
        <PostDetailsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

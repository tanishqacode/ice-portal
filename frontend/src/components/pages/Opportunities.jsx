
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  X,
  ExternalLink,
} from "lucide-react";

const emptyOpportunity = {
  title: "",
  organization: "",
  category: "Internship",
  mode: "On-campus",
  location: "",
  deadline: "",
  eligibility: "",
  description: "",
  applicationUrl: "",
};

const categories = [
  "Internship",
  "Research Internship",
  "Job",
  "Fellowship",
  "Competition",
  "Hackathon",
];

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyOpportunity);

  const filteredOpportunities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return opportunities.filter((item) => {
      const matchesSearch = [
        item.title,
        item.organization,
        item.category,
        item.description,
        item.eligibility,
        item.location,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      const matchesMode =
        modeFilter === "All" || item.mode === modeFilter;

      return matchesSearch && matchesCategory && matchesMode;
    });
  }, [opportunities, search, categoryFilter, modeFilter]);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyOpportunity);
    setShowForm(true);
  }

  function openEditForm(item) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      organization: item.organization,
      category: item.category,
      mode: item.mode,
      location: item.location,
      deadline: item.deadline,
      eligibility: item.eligibility,
      description: item.description,
      applicationUrl: item.applicationUrl,
    });
    setShowForm(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedOpportunity = {
      ...form,
      title: form.title.trim(),
      organization: form.organization.trim(),
      location: form.location.trim(),
      eligibility: form.eligibility.trim(),
      description: form.description.trim(),
      applicationUrl: form.applicationUrl.trim(),
    };

    if (editingId !== null) {
      setOpportunities((current) =>
        current.map((item) =>
          item.id === editingId
            ? { ...cleanedOpportunity, id: editingId }
            : item
        )
      );
    } else {
      setOpportunities((current) => [
        { ...cleanedOpportunity, id: Date.now() },
        ...current,
      ]);
    }

    setForm(emptyOpportunity);
    setEditingId(null);
    setShowForm(false);
  }

  function deleteOpportunity(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this opportunity?"
    );

    if (confirmed) {
      setOpportunities((current) =>
        current.filter((item) => item.id !== id)
      );
    }
  }

  return (
    <div>
      <section className="rounded-3xl bg-gradient-to-r from-indigo-950 to-blue-800 p-7 text-white sm:p-9">
        <p className="text-sm font-semibold text-blue-200">
          ICE STUDENT CORNER
        </p>

        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Opportunities Hub
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
              Discover and manage internships, research positions,
              jobs, fellowships, and student competitions.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-900 hover:bg-blue-50"
          >
            <Plus size={18} />
            Add Opportunity
          </button>
        </div>
      </section>

      <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_210px_180px]">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search opportunities..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
        >
          <option value="All">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={modeFilter}
          onChange={(event) => setModeFilter(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
        >
          <option value="All">All modes</option>
          <option value="On-campus">On-campus</option>
          <option value="Off-campus">Off-campus</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div className="mb-5 mt-7 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Available Opportunities
        </h2>
        <span className="text-sm text-slate-500">
          {filteredOpportunities.length} listings
        </span>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">
              {editingId !== null
                ? "Edit Opportunity"
                : "Add New Opportunity"}
            </h3>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              aria-label="Close form"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X size={19} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              required
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              placeholder="Opportunity title"
              className="rounded-xl border border-slate-200 p-3 text-sm"
            />

            <input
              required
              value={form.organization}
              onChange={(event) =>
                setForm({
                  ...form,
                  organization: event.target.value,
                })
              }
              placeholder="Organization / company / lab"
              className="rounded-xl border border-slate-200 p-3 text-sm"
            />

            <select
              value={form.category}
              onChange={(event) =>
                setForm({ ...form, category: event.target.value })
              }
              className="rounded-xl border border-slate-200 p-3 text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={form.mode}
              onChange={(event) =>
                setForm({ ...form, mode: event.target.value })
              }
              className="rounded-xl border border-slate-200 p-3 text-sm"
            >
              <option>On-campus</option>
              <option>Off-campus</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>

            <input
              value={form.location}
              onChange={(event) =>
                setForm({ ...form, location: event.target.value })
              }
              placeholder="Location"
              className="rounded-xl border border-slate-200 p-3 text-sm"
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Application deadline
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(event) =>
                  setForm({ ...form, deadline: event.target.value })
                }
                className="w-full rounded-xl border border-slate-200 p-3 text-sm"
              />
            </div>

            <input
              value={form.eligibility}
              onChange={(event) =>
                setForm({
                  ...form,
                  eligibility: event.target.value,
                })
              }
              placeholder="Eligibility requirements"
              className="rounded-xl border border-slate-200 p-3 text-sm sm:col-span-2"
            />

            <textarea
              required
              value={form.description}
              onChange={(event) =>
                setForm({
                  ...form,
                  description: event.target.value,
                })
              }
              placeholder="Opportunity description"
              rows={4}
              className="rounded-xl border border-slate-200 p-3 text-sm sm:col-span-2"
            />

            <input
              type="url"
              value={form.applicationUrl}
              onChange={(event) =>
                setForm({
                  ...form,
                  applicationUrl: event.target.value,
                })
              }
              placeholder="Official application URL (optional)"
              className="rounded-xl border border-slate-200 p-3 text-sm sm:col-span-2"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {editingId !== null
                ? "Save Changes"
                : "Publish Opportunity"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredOpportunities.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  {item.category}
                </span>

                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => openEditForm(item)}
                    aria-label={`Edit ${item.title}`}
                    className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteOpportunity(item.id)}
                    aria-label={`Delete ${item.title}`}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {item.organization}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>

              <div className="mt-4 space-y-2 text-sm text-slate-500">
                {item.location && (
                  <p className="flex items-center gap-2">
                    <MapPin size={15} />
                    {item.location} · {item.mode}
                  </p>
                )}

                {item.deadline && (
                  <p className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    Deadline: {item.deadline}
                  </p>
                )}

                {item.eligibility && (
                  <p>
                    <span className="font-semibold text-slate-700">
                      Eligibility:
                    </span>{" "}
                    {item.eligibility}
                  </p>
                )}
              </div>

              {item.applicationUrl && (
                <a
                  href={item.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                  Application link
                  <ExternalLink size={15} />
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <BriefcaseBusiness
            size={32}
            className="mx-auto text-slate-400"
          />
          <h3 className="mt-4 font-semibold text-slate-800">
            {opportunities.length === 0
              ? "No opportunities added yet"
              : "No matching opportunities"}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Add an internship, research position, job, or competition
            to get started.
          </p>
          {opportunities.length === 0 && (
            <button
              type="button"
              onClick={openCreateForm}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              <Plus size={17} />
              Add first opportunity
            </button>
          )}
        </div>
      )}
    </div>
  );
}


import { useState } from "react";
import {
  Users,
  UserRound,
  Presentation,
  Send,
  CheckCircle2,
} from "lucide-react";

const mentorshipTypes = [
  {
    value: "Individual",
    title: "Individual Mentorship",
    description: "Personal guidance from an alumni mentor.",
    icon: UserRound,
  },
  {
    value: "Group",
    title: "Group Mentorship",
    description: "Guidance for a team or group of students.",
    icon: Users,
  },
  {
    value: "Masterclass",
    title: "Masterclass",
    description: "An alumni-led session for multiple students.",
    icon: Presentation,
  },
];

const initialForm = {
  studentName: "",
  email: "",
  programme: "B.Tech",
  year: "2nd Year",
  mentorshipType: "Individual",
  topic: "",
  preferredMentor: "",
  groupSize: "",
  details: "",
};

export default function MentorshipRequest() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const request = {
      ...form,
      submittedAt: new Date().toISOString(),
    };

    const existingRequests = JSON.parse(
      localStorage.getItem("mentorshipRequests") || "[]"
    );

    localStorage.setItem(
      "mentorshipRequests",
      JSON.stringify([...existingRequests, request])
    );

    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="rounded-t-2xl bg-[#123b62] px-6 py-6 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
          Alumni Connect
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Request Mentorship
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
          Need guidance with placements, projects, research or higher
          studies? Tell us what you need and we will help coordinate
          a suitable mentorship opportunity.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-8">
        {submitted && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Request saved successfully!</p>
              <p className="mt-1">
                Your request has been saved in this browser. It has not
                been sent to the department or an alumni mentor.
              </p>
            </div>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-slate-800">
            1. Choose a mentorship format
          </h3>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {mentorshipTypes.map((type) => {
              const Icon = type.icon;
              const selected = form.mentorshipType === type.value;

              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => {
                    setForm((previous) => ({
                      ...previous,
                      mentorshipType: type.value,
                    }));
                    setSubmitted(false);
                  }}
                  aria-pressed={selected}
                  className={`rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-[#123b62] bg-blue-50 ring-1 ring-[#123b62]"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    size={23}
                    className={selected ? "text-[#b0802d]" : "text-slate-500"}
                  />

                  <p className="mt-3 font-semibold text-slate-800">
                    {type.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            2. Your details
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name">
              <input
                name="studentName"
                value={form.studentName}
                onChange={updateField}
                required
                placeholder="Enter your full name"
                className={inputClass}
              />
            </Field>

            <Field label="College Email">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>

            <Field label="Programme">
              <select
                name="programme"
                value={form.programme}
                onChange={updateField}
                className={inputClass}
              >
                <option>B.Tech</option>
                <option>M.Tech</option>
                <option>Ph.D.</option>
                <option>Other</option>
              </select>
            </Field>

            <Field label="Current Year">
              <select
                name="year"
                value={form.year}
                onChange={updateField}
                className={inputClass}
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>Postgraduate</option>
                <option>Research Scholar</option>
                <option>Other</option>
              </select>
            </Field>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            3. Mentorship requirements
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Area of Interest">
              <select
                name="topic"
                value={form.topic}
                onChange={updateField}
                required
                className={inputClass}
              >
                <option value="">Select an area</option>
                <option>Placements and Interviews</option>
                <option>Core Instrumentation</option>
                <option>Software and Technology</option>
                <option>Research and Projects</option>
                <option>Higher Studies and GATE</option>
                <option>Entrepreneurship</option>
                <option>Industry Insights</option>
                <option>Other</option>
              </select>
            </Field>

            <Field label="Preferred Mentor (Optional)">
              <input
                name="preferredMentor"
                value={form.preferredMentor}
                onChange={updateField}
                placeholder="Mentor's name, if any"
                className={inputClass}
              />
            </Field>

            {form.mentorshipType !== "Individual" && (
              <Field
                label={
                  form.mentorshipType === "Group"
                    ? "Number of Students"
                    : "Expected Audience Size"
                }
              >
                <input
                  type="number"
                  name="groupSize"
                  value={form.groupSize}
                  onChange={updateField}
                  min="2"
                  placeholder="e.g. 10"
                  required
                  className={inputClass}
                />
              </Field>
            )}

            <Field label="Additional Details">
              <textarea
                name="details"
                value={form.details}
                onChange={updateField}
                rows={3}
                placeholder="Describe your goals, questions or suggested topic..."
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#123b62] px-5 py-3 font-semibold text-white transition hover:bg-[#194d7a] sm:w-auto"
          >
            Submit Request
            <Send size={16} />
          </button>

          <p className="mt-3 text-xs leading-5 text-slate-400">
            Your details should only be shared with the people responsible
            for coordinating mentorship.
          </p>
        </div>
      </form>
    </section>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

function Field({ label, children }) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

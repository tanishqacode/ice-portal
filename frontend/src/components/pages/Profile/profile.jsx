
import { useEffect, useMemo, useState } from "react";
import {
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  FileUp,
  BookOpen,
  Save,
  Pencil,
  CheckCircle2,
  Clock3,
  XCircle,
  ExternalLink,
  FileText,
  LayoutDashboard,
  Plus,
  Trash2,
} from "lucide-react";

const PROFILE_KEY = "icePortalProfiles";
const RESEARCH_KEY = "icePortalResearchSubmissions";

const emptyStudentProfile = {
  fullName: "",
  rollNumber: "",
  email: "",
  phone: "",
  batch: "",
  admissionYear: "",
  passingYear: "",
  currentSemester: "",
  cgpa: "",
  branch: "Instrumentation and Control Engineering",
  skills: "",
  interests: "",
  projects: "",
  resumeName: "",
};

const emptyFacultyProfile = {
  fullName: "",
  email: "",
  phone: "",
  designation: "",
  qualifications: "",
  specialization: "",
  officeLocation: "",
  researchInterests: "",
  googleScholar: "",
  orcid: "",
  website: "",
};

const emptyResearch = {
  title: "",
  abstract: "",
  authors: "",
  researchType: "Journal",
  publicationStatus: "Published",
  venue: "",
  year: String(new Date().getFullYear()),
  doi: "",
  paperUrl: "",
  keywords: "",
};

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function getUserKey(user) {
  return String(user?.identifier || user?.email || user?.displayName || "guest")
    .trim()
    .toLowerCase();
}

function getInitialProfile(user) {
  const role = user?.role === "faculty" ? "faculty" : "student";
  const defaults =
    role === "faculty" ? emptyFacultyProfile : emptyStudentProfile;

  const savedProfiles = readStorage(PROFILE_KEY, {});
  const savedProfile = savedProfiles[getUserKey(user)] || {};

  return {
    ...defaults,
    fullName: user?.displayName || "",
    email: user?.email || "",
    ...(role === "student" ? { rollNumber: user?.identifier || "" } : {}),
    ...savedProfile,
  };
}

function SectionHeading({ title, description }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      {description && (
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  readOnly = false,
  min,
  max,
  help,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        required={required}
        readOnly={readOnly}
        min={min}
        max={max}
        step={type === "number" ? "any" : undefined}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
          readOnly
            ? "cursor-not-allowed bg-slate-100 text-slate-500"
            : "border-slate-300 bg-white text-slate-800"
        }`}
      />
      {help && <span className="mt-1 block text-xs text-slate-500">{help}</span>}
    </label>
  );
}

function FormTextArea({ label, name, value, onChange, placeholder, rows = 3 }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <textarea
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        rows={rows}
        className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700",
    Approved: "bg-emerald-50 text-emerald-700",
    Rejected: "bg-red-50 text-red-700",
  };

  const icons = {
    Pending: Clock3,
    Approved: CheckCircle2,
    Rejected: XCircle,
  };

  const Icon = icons[status] || Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || styles.Pending
      }`}
    >
      <Icon size={14} />
      {status || "Pending"}
    </span>
  );
}

export default function Profile({ currentUser, onNavigate }) {
  const role = currentUser?.role === "faculty" ? "faculty" : "student";
  const userKey = getUserKey(currentUser);
  const isFaculty = role === "faculty";

  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(true);
  const [profile, setProfile] = useState(() => getInitialProfile(currentUser));
  const [research, setResearch] = useState(emptyResearch);
  const [message, setMessage] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [paperFileName, setPaperFileName] = useState("");

  const [submissions, setSubmissions] = useState(() => {
    const all = readStorage(RESEARCH_KEY, []);
    return Array.isArray(all)
      ? all.filter((item) => item.ownerKey === userKey)
      : [];
  });

  useEffect(() => {
    setProfile(getInitialProfile(currentUser));
    setEditing(true);
    setActiveTab("profile");
    setMessage("");
    setResumeFileName("");
    setPaperFileName("");

    const all = readStorage(RESEARCH_KEY, []);
    setSubmissions(
      Array.isArray(all)
        ? all.filter((item) => item.ownerKey === userKey)
        : []
    );
  }, [userKey, currentUser?.role]);

  const completion = useMemo(() => {
    const fields = isFaculty
      ? [
          "fullName",
          "email",
          "phone",
          "designation",
          "qualifications",
          "specialization",
          "researchInterests",
        ]
      : [
          "fullName",
          "rollNumber",
          "email",
          "phone",
          "batch",
          "passingYear",
          "cgpa",
          "currentSemester",
          "skills",
        ];

    const completed = fields.filter(
      (field) => String(profile[field] ?? "").trim() !== ""
    ).length;

    return Math.round((completed / fields.length) * 100);
  }, [profile, isFaculty]);

  function handleProfileChange(event) {
    const { name, value } = event.target;
    setProfile((previous) => ({ ...previous, [name]: value }));
    setMessage("");
  }

  function saveProfile(event) {
    event.preventDefault();

    if (!profile.fullName.trim() || !profile.email.trim()) {
      setMessage("Please enter your name and email address.");
      return;
    }

    if (!isFaculty && profile.cgpa !== "") {
      const cgpa = Number(profile.cgpa);
      if (!Number.isFinite(cgpa) || cgpa < 0 || cgpa > 10) {
        setMessage("CGPA must be between 0 and 10.");
        return;
      }
    }

    const allProfiles = readStorage(PROFILE_KEY, {});
    allProfiles[userKey] = profile;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(allProfiles));

    setEditing(false);
    setMessage("Profile saved successfully in this browser.");
  }

  function handleResumeChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Please select a PDF file for your resume.");
      event.target.value = "";
      return;
    }

    setResumeFileName(file.name);
    setProfile((previous) => ({ ...previous, resumeName: file.name }));
    setMessage(
      "Resume selected. Actual file storage will be added with the backend."
    );
  }

  function handleResearchChange(event) {
    const { name, value } = event.target;
    setResearch((previous) => ({ ...previous, [name]: value }));
  }

  function handlePaperChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Please upload the research paper as a PDF.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("Please select a PDF smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    setPaperFileName(file.name);
    setMessage("");
  }

  function submitResearch(event) {
    event.preventDefault();

    if (!research.title.trim()) {
      setMessage("Please enter the research title.");
      return;
    }

    if (!paperFileName && !research.paperUrl.trim() && !research.doi.trim()) {
      setMessage("Please select a PDF or provide a DOI or paper URL.");
      return;
    }

    const all = readStorage(RESEARCH_KEY, []);
    const submission = {
      id: `research-${Date.now()}`,
      ownerKey: userKey,
      ownerName: profile.fullName || currentUser?.displayName || "Portal user",
      ownerRole: role,
      title: research.title.trim(),
      abstract: research.abstract.trim(),
      authors: research.authors.trim() || profile.fullName,
      researchType: research.researchType,
      publicationStatus: research.publicationStatus,
      venue: research.venue.trim(),
      year: research.year,
      doi: research.doi.trim(),
      paperUrl: research.paperUrl.trim(),
      keywords: research.keywords.trim(),
      fileName: paperFileName,
      reviewStatus: "Pending",
      submittedAt: new Date().toISOString(),
    };

    const updated = [submission, ...(Array.isArray(all) ? all : [])];
    localStorage.setItem(RESEARCH_KEY, JSON.stringify(updated));

    setSubmissions((previous) => [submission, ...previous]);
    setResearch(emptyResearch);
    setPaperFileName("");
    setMessage(
      "Research submission saved as Pending. It has not been published publicly."
    );
    setActiveTab("research");
  }

  function deleteSubmission(id) {
    const all = readStorage(RESEARCH_KEY, []);
    const updated = Array.isArray(all)
      ? all.filter((item) => item.id !== id || item.ownerKey !== userKey)
      : [];

    localStorage.setItem(RESEARCH_KEY, JSON.stringify(updated));
    setSubmissions((previous) => previous.filter((item) => item.id !== id));
    setMessage("Submission removed from this browser.");
  }

  const navigation = [
    { id: "profile", label: "My Profile", icon: UserRound },
    { id: "research-upload", label: "Upload Research", icon: FileUp },
    { id: "research", label: "My Research", icon: BookOpen },
  ];

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <UserRound className="mx-auto mb-3 text-slate-400" size={42} />
        <h1 className="text-xl font-bold text-slate-800">Sign in to view your profile</h1>
        <p className="mt-2 text-sm text-slate-500">
          Your profile is available after you sign in to the portal.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-700">
            ICE DEPARTMENT PORTAL
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your information and research submissions in one place.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-800">
            {isFaculty ? <BriefcaseBusiness size={22} /> : <GraduationCap size={22} />}
          </div>
          <div>
            <p className="max-w-48 truncate font-semibold text-slate-800">
              {profile.fullName || currentUser.displayName || "Portal user"}
            </p>
            <p className="text-xs capitalize text-slate-500">
              {role} account
            </p>
          </div>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[245px_minmax(0,1fr)]">
        <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-blue-950 to-blue-800 p-5 text-white">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              {isFaculty ? <BriefcaseBusiness size={25} /> : <GraduationCap size={25} />}
            </div>
            <p className="font-semibold">{isFaculty ? "Faculty Workspace" : "Student Workspace"}</p>
            <p className="mt-1 text-xs text-blue-100">
              Your department account
            </p>
          </div>

          <nav className="space-y-1 p-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMessage("");
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-800"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Profile completion</span>
              <span className="font-bold text-blue-700">{completion}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Complete your details to help the department maintain its records.
            </p>
          </div>

          {onNavigate && (
            <div className="border-t border-slate-100 p-3">
              <button
                type="button"
                onClick={() => onNavigate("Home")}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-700"
              >
                <LayoutDashboard size={17} />
                Back to department home
              </button>
            </div>
          )}
        </aside>

        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {message && (
            <div
              role="status"
              className="mb-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800"
            >
              {message}
            </div>
          )}

          {activeTab === "profile" && (
            <form onSubmit={saveProfile}>
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <SectionHeading
                  title={isFaculty ? "Faculty Information" : "Student Information"}
                  description={
                    isFaculty
                      ? "Maintain your department, academic and research details."
                      : "Enter your academic details once so the department can refer to them later."
                  }
                />
                {!editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(true);
                      setMessage("");
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Pencil size={16} />
                    Edit Profile
                  </button>
                )}
              </div>

              <fieldset disabled={!editing} className="space-y-7 disabled:opacity-90">
                <div>
                  <h3 className="mb-4 border-b border-slate-100 pb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
                    Personal Details
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Full Name"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleProfileChange}
                      required
                    />
                    <FormField
                      label="College Email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      type="email"
                      required
                    />
                    <FormField
                      label="Contact Number"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      type="tel"
                      placeholder="Enter your contact number"
                    />

                    {isFaculty ? (
                      <>
                        <FormField
                          label="Designation"
                          name="designation"
                          value={profile.designation}
                          onChange={handleProfileChange}
                          placeholder="e.g. Assistant Professor"
                        />
                        <FormField
                          label="Qualifications"
                          name="qualifications"
                          value={profile.qualifications}
                          onChange={handleProfileChange}
                          placeholder="e.g. PhD, M.Tech"
                        />
                        <FormField
                          label="Office / Room"
                          name="officeLocation"
                          value={profile.officeLocation}
                          onChange={handleProfileChange}
                        />
                      </>
                    ) : (
                      <>
                        <FormField
                          label="Roll Number"
                          name="rollNumber"
                          value={profile.rollNumber}
                          onChange={handleProfileChange}
                          required
                          readOnly
                          help="Linked to the identifier used at sign-up."
                        />
                        <FormField
                          label="Branch"
                          name="branch"
                          value={profile.branch}
                          onChange={handleProfileChange}
                          readOnly
                        />
                      </>
                    )}
                  </div>
                </div>

                {isFaculty ? (
                  <>
                    <div>
                      <h3 className="mb-4 border-b border-slate-100 pb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
                        Academic & Research Details
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          label="Specialization"
                          name="specialization"
                          value={profile.specialization}
                          onChange={handleProfileChange}
                        />
                        <FormField
                          label="Google Scholar Profile"
                          name="googleScholar"
                          value={profile.googleScholar}
                          onChange={handleProfileChange}
                          type="url"
                          placeholder="https://scholar.google.com/..."
                        />
                        <FormField
                          label="ORCID"
                          name="orcid"
                          value={profile.orcid}
                          onChange={handleProfileChange}
                          placeholder="0000-0000-0000-0000"
                        />
                        <FormField
                          label="Personal / Faculty Website"
                          name="website"
                          value={profile.website}
                          onChange={handleProfileChange}
                          type="url"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="mt-4">
                        <FormTextArea
                          label="Research Interests"
                          name="researchInterests"
                          value={profile.researchInterests}
                          onChange={handleProfileChange}
                          placeholder="e.g. Process control, sensors, industrial automation"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <h3 className="mb-4 border-b border-slate-100 pb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
                      Academic Details
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        label="Batch"
                        name="batch"
                        value={profile.batch}
                        onChange={handleProfileChange}
                        placeholder="e.g. 2024–2028"
                      />
                      <FormField
                        label="Admission Year"
                        name="admissionYear"
                        value={profile.admissionYear}
                        onChange={handleProfileChange}
                        type="number"
                        min="2000"
                        max="2100"
                      />
                      <FormField
                        label="Expected Passing Year"
                        name="passingYear"
                        value={profile.passingYear}
                        onChange={handleProfileChange}
                        type="number"
                        min="2000"
                        max="2100"
                        required
                      />
                      <FormField
                        label="Current Semester"
                        name="currentSemester"
                        value={profile.currentSemester}
                        onChange={handleProfileChange}
                        type="number"
                        min="1"
                        max="12"
                      />
                      <FormField
                        label="Current CGPA (out of 10)"
                        name="cgpa"
                        value={profile.cgpa}
                        onChange={handleProfileChange}
                        type="number"
                        min="0"
                        max="10"
                        placeholder="e.g. 8.25"
                        help="This is a self-entered value in this frontend prototype."
                      />
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="mb-4 border-b border-slate-100 pb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
                    {isFaculty ? "Professional Links" : "Skills & Experience"}
                  </h3>

                  {isFaculty ? (
                    <p className="text-sm leading-6 text-slate-500">
                      Add accurate research links and details. These fields help connect your profile to publications.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <FormTextArea
                        label="Technical Skills"
                        name="skills"
                        value={profile.skills}
                        onChange={handleProfileChange}
                        placeholder="e.g. Java, React, MATLAB, Python"
                      />
                      <FormTextArea
                        label="Areas of Interest"
                        name="interests"
                        value={profile.interests}
                        onChange={handleProfileChange}
                        placeholder="e.g. Embedded systems, AI, control systems"
                      />
                      <FormTextArea
                        label="Projects & Achievements"
                        name="projects"
                        value={profile.projects}
                        onChange={handleProfileChange}
                        placeholder="Briefly describe your projects, internships or achievements"
                      />
                      <div>
                        <span className="mb-1.5 block text-sm font-medium text-slate-700">
                          Resume (PDF)
                        </span>
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-4 py-5 text-center hover:border-blue-400 hover:bg-blue-50/50">
                          <FileUp size={24} className="mb-2 text-slate-400" />
                          <span className="text-sm font-semibold text-slate-700">
                            {resumeFileName || profile.resumeName || "Choose resume PDF"}
                          </span>
                          <span className="mt-1 text-xs text-slate-500">
                            PDF only — frontend selection for now
                          </span>
                          <input
                            type="file"
                            accept="application/pdf,.pdf"
                            onChange={handleResumeChange}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </fieldset>

              {editing && (
                <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-900"
                  >
                    <Save size={17} />
                    Save Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfile(getInitialProfile(currentUser));
                      setEditing(false);
                      setMessage("");
                    }}
                    className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          )}

          {activeTab === "research-upload" && (
            <div>
              <SectionHeading
                title="Upload Research Work"
                description="Submit a paper, conference publication, preprint or research report. Submissions are marked Pending in this prototype."
              />

              <form onSubmit={submitResearch} className="space-y-5">
                <FormField
                  label="Research Title"
                  name="title"
                  value={research.title}
                  onChange={handleResearchChange}
                  required
                />

                <FormTextArea
                  label="Abstract"
                  name="abstract"
                  value={research.abstract}
                  onChange={handleResearchChange}
                  placeholder="Summarize the research problem, approach and findings"
                  rows={5}
                />

                <FormField
                  label="Authors / Co-authors"
                  name="authors"
                  value={research.authors}
                  onChange={handleResearchChange}
                  placeholder="Separate author names with commas"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      Research Type
                    </span>
                    <select
                      name="researchType"
                      value={research.researchType}
                      onChange={handleResearchChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      <option>Journal</option>
                      <option>Conference</option>
                      <option>Preprint</option>
                      <option>Research Project</option>
                      <option>Technical Report</option>
                      <option>Thesis</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      Publication Status
                    </span>
                    <select
                      name="publicationStatus"
                      value={research.publicationStatus}
                      onChange={handleResearchChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      <option>Published</option>
                      <option>Accepted</option>
                      <option>Under Review</option>
                      <option>Unpublished</option>
                    </select>
                  </label>

                  <FormField
                    label="Journal / Conference / Venue"
                    name="venue"
                    value={research.venue}
                    onChange={handleResearchChange}
                  />
                  <FormField
                    label="Year"
                    name="year"
                    value={research.year}
                    onChange={handleResearchChange}
                    type="number"
                    min="1900"
                    max="2100"
                    required
                  />
                  <FormField
                    label="DOI"
                    name="doi"
                    value={research.doi}
                    onChange={handleResearchChange}
                    placeholder="e.g. 10.xxxx/xxxxx"
                  />
                  <FormField
                    label="Paper URL"
                    name="paperUrl"
                    value={research.paperUrl}
                    onChange={handleResearchChange}
                    type="url"
                    placeholder="https://..."
                  />
                </div>

                <FormTextArea
                  label="Keywords / Research Area"
                  name="keywords"
                  value={research.keywords}
                  onChange={handleResearchChange}
                  placeholder="e.g. process control, machine learning, sensors"
                  rows={2}
                />

                <div>
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Research Paper (PDF)
                  </span>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-4 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50/50">
                    <FileUp size={30} className="mb-3 text-blue-700" />
                    <span className="text-sm font-semibold text-slate-800">
                      {paperFileName || "Choose your research PDF"}
                    </span>
                    <span className="mt-1 text-xs text-slate-500">
                      PDF only, maximum 10 MB in this prototype
                    </span>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handlePaperChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    The selected file is not uploaded to a server yet. This phase saves its filename and the research metadata only.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
                  >
                    <Plus size={17} />
                    Submit Research
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResearch(emptyResearch);
                      setPaperFileName("");
                      setMessage("");
                    }}
                    className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "research" && (
            <div>
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <SectionHeading
                  title="My Research"
                  description="View the research submissions associated with this account."
                />
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("research-upload");
                    setMessage("");
                  }}
                  className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
                >
                  <Plus size={17} />
                  Add Research
                </button>
              </div>

              {submissions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 px-5 py-12 text-center">
                  <FileText size={35} className="mx-auto mb-3 text-slate-400" />
                  <h3 className="font-semibold text-slate-800">
                    No research submissions yet
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Your submissions will appear here after you add research work.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("research-upload")}
                    className="mt-4 text-sm font-semibold text-blue-800 hover:underline"
                  >
                    Upload your first research paper
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-xl border border-slate-200 p-4 sm:p-5"
                    >
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div className="min-w-0">
                          <h3 className="break-words font-bold text-slate-800">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {item.researchType} · {item.year}
                            {item.venue ? ` · ${item.venue}` : ""}
                          </p>
                        </div>
                        <StatusBadge status={item.reviewStatus} />
                      </div>

                      {item.abstract && (
                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                          {item.abstract}
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                        {item.fileName && (
                          <span className="inline-flex items-center gap-1.5">
                            <FileText size={14} />
                            {item.fileName}
                          </span>
                        )}
                        {item.doi && <span>DOI: {item.doi}</span>}
                        {item.paperUrl && (
                          <a
                            href={item.paperUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-blue-700 hover:underline"
                          >
                            Open paper <ExternalLink size={13} />
                          </a>
                        )}
                      </div>

                      <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
                        <button
                          type="button"
                          onClick={() => deleteSubmission(item.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Remove submission
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">
        Prototype notice: profile and submission metadata are stored in this browser only.
        They are not yet shared with the department, other users or the public Research page.
      </p>
    </div>
  );
}

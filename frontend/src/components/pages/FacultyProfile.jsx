
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Microscope,
  Sparkles,
  UserRound,
} from "lucide-react";

function Avatar({ faculty, large = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#123b62] to-[#3678a5] font-bold text-white ${
        large ? "h-24 w-24 text-3xl" : "h-12 w-12 text-lg"
      }`}
    >
      {faculty.initials}
    </div>
  );
}

function ProfileSection({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#123b62]">
          <Icon size={21} />
        </div>
        <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-2xl font-extrabold text-[#123b62]">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default function FacultyProfile({ faculty, onBack }) {
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-[#123b62] transition hover:bg-blue-50"
      >
        <ArrowLeft size={18} />
        Back to Faculty Directory
      </button>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-2 bg-gradient-to-r from-[#123b62] via-[#3678a5] to-[#d5a94d]" />
        <div className="p-6 sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Avatar faculty={faculty} large />
            <div className="min-w-0 flex-1">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#123b62]">
                {faculty.designation}
              </span>
              <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {faculty.name}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {faculty.qualification}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#b0802d]" />
                  Department of ICE
                </span>
                <span className="flex items-center gap-2">
                  <BriefcaseBusiness size={16} className="text-[#b0802d]" />
                  {faculty.experience} years' experience
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#b0802d]" />
                  NIT Jalandhar portal demo
                </span>
              </div>

              <a
                href={`mailto:${faculty.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#123b62] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2b49]"
              >
                <Mail size={16} />
                Contact Faculty
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Sample citations" value={faculty.scholar.citations.toLocaleString()} />
        <MetricCard label="Sample h-index" value={faculty.scholar.hIndex} />
        <MetricCard label="Sample i10-index" value={faculty.scholar.i10Index} />
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        <strong>Demo profile:</strong> All academic history, experience,
        publications, awards and research metrics shown here are fictional.
      </div>

      <ProfileSection icon={UserRound} title="About">
        <p className="text-sm leading-7 text-slate-600">{faculty.bio}</p>
        <h3 className="mt-6 font-bold text-slate-800">Research interests</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {faculty.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-[#123b62]"
            >
              {interest}
            </span>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection icon={GraduationCap} title="Education">
        <div className="space-y-5">
          {faculty.education.map((item, index) => (
            <div key={`${item.degree}-${index}`} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#123b62]">
                <GraduationCap size={20} />
              </div>
              <div className="flex-1 border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                <h3 className="font-bold text-slate-800">{item.degree}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.institute}</p>
                <p className="mt-1 text-xs font-semibold text-[#b0802d]">{item.year}</p>
              </div>
            </div>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection icon={BriefcaseBusiness} title="Experience timeline">
        <div className="relative ml-2 space-y-7 border-l-2 border-slate-200 pl-6">
          {faculty.experienceTimeline.map((item, index) => (
            <div key={`${item.role}-${index}`} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[#b0802d] ring-2 ring-amber-100" />
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                <div>
                  <h3 className="font-bold text-slate-800">{item.role}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.organization}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  <CalendarDays size={13} />
                  {item.period}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection icon={BookOpen} title="Publications">
        <div className="space-y-4">
          {faculty.publications.map((publication, index) => (
            <article
              key={`${publication.title}-${index}`}
              className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#123b62]">
                    <BookOpen size={19} />
                  </div>
                  <div>
                    <h3 className="font-bold leading-6 text-slate-800">{publication.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{publication.journal}</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-start gap-2 sm:flex-col sm:items-end">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {publication.type}
                  </span>
                  <span className="text-xs font-bold text-[#b0802d]">{publication.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection icon={Award} title="Awards & recognition">
        <div className="grid gap-4 sm:grid-cols-2">
          {faculty.awards.map((award, index) => (
            <div key={`${award.title}-${index}`} className="flex gap-3 rounded-xl bg-amber-50 p-4">
              <Award className="mt-0.5 shrink-0 text-[#a16d16]" size={22} />
              <div>
                <h3 className="font-bold text-slate-800">{award.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{award.organization}</p>
                <p className="mt-1 text-xs font-bold text-[#a16d16]">{award.year}</p>
              </div>
            </div>
          ))}
        </div>
      </ProfileSection>

      <section className="rounded-2xl bg-[#123b62] p-6 text-white sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Sparkles size={22} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-extrabold">Research profile and academic impact</h2>
            <p className="mt-2 text-sm leading-6 text-blue-100">
              This section can link to verified Google Scholar profiles, DOI
              records and publications when actual faculty data is added.
            </p>
            {faculty.scholar.link ? (
              <a
                href={faculty.scholar.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#123b62]"
              >
                Open Google Scholar
                <ArrowUpRight size={16} />
              </a>
            ) : (
              <p className="mt-4 text-xs text-blue-200">
                No verified external research profile is linked in this demo.
              </p>
            )}
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
      >
        <ArrowLeft size={17} />
        Return to faculty directory
      </button>
    </div>
  );
}

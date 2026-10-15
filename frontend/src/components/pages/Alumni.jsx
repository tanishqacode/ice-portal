
// import { useMemo, useState } from "react";
// import {
//   Search,
//   Users,
//   GraduationCap,
//   BriefcaseBusiness,
//   MapPin,
//   CalendarDays,
//   ArrowUpRight,
//   X,
//   Handshake,
//   ExternalLink,
//   Filter,
//   Building2,
//   Sparkles,
// } from "lucide-react";

// import {
//   alumniData,
//   alumniIndustries,
// } from "./data/alumniData";

// function AlumniCard({ alumni, onView }) {
//   const initials = alumni.name
//     .split(" ")
//     .map((part) => part[0])
//     .slice(0, 2)
//     .join("");

//   return (
//     <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-6">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-lg font-bold text-blue-800">
//           {initials}
//         </div>

//         {alumni.mentorship && (
//           <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
//             <Handshake size={13} />
//             Mentor
//           </span>
//         )}
//       </div>

//       <h3 className="mt-4 text-lg font-bold text-slate-900">
//         {alumni.name}
//       </h3>

//       <p className="mt-1 text-sm font-medium text-blue-700">
//         {alumni.role}
//       </p>

//       <div className="mt-3 space-y-2 text-sm text-slate-500">
//         <p className="flex items-start gap-2">
//           <Building2 size={16} className="mt-0.5 shrink-0" />
//           <span>{alumni.company}</span>
//         </p>

//         <p className="flex items-center gap-2">
//           <GraduationCap size={16} className="shrink-0" />
//           {alumni.degree}, Class of {alumni.batch}
//         </p>

//         <p className="flex items-center gap-2">
//           <MapPin size={16} className="shrink-0" />
//           {alumni.location}
//         </p>
//       </div>

//       <div className="mt-4 flex flex-wrap gap-2">
//         {alumni.skills.slice(0, 3).map((skill) => (
//           <span
//             key={skill}
//             className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600"
//           >
//             {skill}
//           </span>
//         ))}
//       </div>

//       <button
//         type="button"
//         onClick={() => onView(alumni)}
//         className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 mt-5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
//       >
//         View profile
//         <ArrowUpRight size={16} />
//       </button>
//     </article>
//   );
// }

// function AlumniProfileModal({ alumni, onClose }) {
//   if (!alumni) return null;

//   const initials = alumni.name
//     .split(" ")
//     .map((part) => part[0])
//     .slice(0, 2)
//     .join("");

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4"
//       onMouseDown={(event) => {
//         if (event.target === event.currentTarget) onClose();
//       }}
//     >
//       <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-xl font-bold text-blue-800">
//               {initials}
//             </div>

//             <div>
//               <h2 className="text-xl font-bold text-slate-900">
//                 {alumni.name}
//               </h2>
//               <p className="mt-1 text-sm text-blue-700">
//                 {alumni.role}
//               </p>
//               <p className="mt-1 text-sm text-slate-500">
//                 {alumni.company}
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close profile"
//             className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
//           <div className="rounded-xl bg-slate-50 p-4">
//             <GraduationCap size={19} className="text-blue-700" />
//             <p className="mt-2 text-xs text-slate-500">Graduation</p>
//             <p className="mt-1 font-semibold text-slate-800">
//               {alumni.degree}, {alumni.batch}
//             </p>
//           </div>

//           <div className="rounded-xl bg-slate-50 p-4">
//             <MapPin size={19} className="text-blue-700" />
//             <p className="mt-2 text-xs text-slate-500">Location</p>
//             <p className="mt-1 font-semibold text-slate-800">
//               {alumni.location}
//             </p>
//           </div>

//           <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
//             <BriefcaseBusiness size={19} className="text-blue-700" />
//             <p className="mt-2 text-xs text-slate-500">Industry</p>
//             <p className="mt-1 font-semibold text-slate-800">
//               {alumni.industry}
//             </p>
//           </div>
//         </div>

//         <div className="mt-6">
//           <h3 className="font-bold text-slate-900">About</h3>
//           <p className="mt-2 text-sm leading-7 text-slate-600">
//             {alumni.bio}
//           </p>
//         </div>

//         <div className="mt-6">
//           <h3 className="font-bold text-slate-900">Skills & expertise</h3>

//           <div className="mt-3 flex flex-wrap gap-2">
//             {alumni.skills.map((skill) => (
//               <span
//                 key={skill}
//                 className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>

//         {alumni.mentorship && (
//           <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
//             <div className="flex items-center gap-2 font-semibold text-emerald-800">
//               <Handshake size={18} />
//               Open to mentorship
//             </div>
//             <p className="mt-2 text-sm leading-6 text-emerald-800">
//               This demo profile is marked as open to mentoring students.
//               A real mentorship request feature can be connected later.
//             </p>
//           </div>
//         )}

//         {alumni.linkedin && (
//           <a
//             href={alumni.linkedin}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
//           >
//             <ExternalLink size={17} />
//             View LinkedIn profile
//             <ArrowUpRight size={15} />
//           </a>
//         )}

//         <button
//           type="button"
//           onClick={onClose}
//           className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
//         >
//           Close profile
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function Alumni() {
//   const [search, setSearch] = useState("");
//   const [selectedIndustry, setSelectedIndustry] =
//     useState("All Industries");
//   const [selectedBatch, setSelectedBatch] = useState("All Batches");
//   const [mentorsOnly, setMentorsOnly] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedAlumni, setSelectedAlumni] = useState(null);

//   const batches = useMemo(
//     () =>
//       [...new Set(alumniData.map((alumni) => alumni.batch))].sort(
//         (a, b) => b - a
//       ),
//     []
//   );

//   const filteredAlumni = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     return alumniData
//       .filter((alumni) => {
//         const searchable = [
//           alumni.name,
//           alumni.role,
//           alumni.company,
//           alumni.industry,
//           alumni.location,
//           alumni.degree,
//           String(alumni.batch),
//           ...alumni.skills,
//         ]
//           .join(" ")
//           .toLowerCase();

//         return (
//           (!query || searchable.includes(query)) &&
//           (selectedIndustry === "All Industries" ||
//             alumni.industry === selectedIndustry) &&
//           (selectedBatch === "All Batches" ||
//             alumni.batch === Number(selectedBatch)) &&
//           (!mentorsOnly || alumni.mentorship)
//         );
//       })
//       .sort((a, b) => {
//         if (a.featured !== b.featured) {
//           return Number(b.featured) - Number(a.featured);
//         }
//         return b.batch - a.batch;
//       });
//   }, [search, selectedIndustry, selectedBatch, mentorsOnly]);

//   function resetFilters() {
//     setSearch("");
//     setSelectedIndustry("All Industries");
//     setSelectedBatch("All Batches");
//     setMentorsOnly(false);
//   }

//   const mentorCount = alumniData.filter(
//     (alumni) => alumni.mentorship
//   ).length;

//   const industryCount = new Set(
//     alumniData.map((alumni) => alumni.industry)
//   ).size;

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-5 py-12 text-white sm:px-8 sm:py-16">
//         <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
//         <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl">
//           <div className="mb-5 flex items-center gap-2 text-sm font-medium text-blue-200">
//             <GraduationCap size={18} />
//             ICE Department Portal
//             <span className="text-blue-400">/</span>
//             Alumni Network
//           </div>

//           <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
//                 Alumni Network
//               </h1>
//               <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
//                 Connect with ICE graduates, explore diverse career
//                 journeys, learn from industry experience, and build
//                 meaningful professional connections.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => setMentorsOnly((current) => !current)}
//               className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition ${
//                 mentorsOnly
//                   ? "bg-emerald-400 text-emerald-950"
//                   : "bg-white text-blue-900 hover:bg-blue-50"
//               }`}
//             >
//               <Handshake size={18} />
//               {mentorsOnly ? "Show all alumni" : "Find a mentor"}
//             </button>
//           </div>

//           <div className="mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
//             <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
//               <Users size={23} className="text-cyan-200" />
//               <div>
//                 <p className="text-xl font-bold">{alumniData.length}</p>
//                 <p className="text-xs text-blue-100">Demo profiles</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
//               <Handshake size={23} className="text-cyan-200" />
//               <div>
//                 <p className="text-xl font-bold">{mentorCount}</p>
//                 <p className="text-xs text-blue-100">Demo mentors</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
//               <BriefcaseBusiness size={23} className="text-cyan-200" />
//               <div>
//                 <p className="text-xl font-bold">{industryCount}</p>
//                 <p className="text-xs text-blue-100">Sample industries</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
//         <section className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-3">
//           <div className="rounded-2xl border border-slate-200 bg-white p-5">
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
//               <Users size={22} />
//             </div>
//             <h2 className="mt-4 font-bold text-slate-900">
//               Explore alumni
//             </h2>
//             <p className="mt-2 text-sm leading-6 text-slate-600">
//               Discover graduates by batch, industry, company, and
//               professional expertise.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-slate-200 bg-white p-5">
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
//               <Handshake size={22} />
//             </div>
//             <h2 className="mt-4 font-bold text-slate-900">
//               Find a mentor
//             </h2>
//             <p className="mt-2 text-sm leading-6 text-slate-600">
//               Find alumni willing to share career advice and professional
//               insights.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-slate-200 bg-white p-5">
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
//               <Sparkles size={22} />
//             </div>
//             <h2 className="mt-4 font-bold text-slate-900">
//               Learn from experience
//             </h2>
//             <p className="mt-2 text-sm leading-6 text-slate-600">
//               Explore different career paths across engineering,
//               research, analytics, and technology.
//             </p>
//           </div>
//         </section>

//         <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
//           <div className="flex items-center gap-2">
//             <Search size={20} className="text-blue-700" />
//             <h2 className="text-lg font-bold text-slate-900">
//               Find alumni
//             </h2>
//           </div>

//           <div className="relative mt-4">
//             <Search
//               size={19}
//               className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
//             />
//             <input
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//               placeholder="Search by name, company, skills, role or batch..."
//               className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
//             />
//           </div>

//           <div className="mt-4 flex flex-wrap gap-2">
//             {alumniIndustries.map((industry) => (
//               <button
//                 key={industry}
//                 type="button"
//                 onClick={() => setSelectedIndustry(industry)}
//                 className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
//                   selectedIndustry === industry
//                     ? "bg-blue-700 text-white"
//                     : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//                 }`}
//               >
//                 {industry}
//               </button>
//             ))}
//           </div>

//           <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
//             <button
//               type="button"
//               onClick={() => setShowFilters((current) => !current)}
//               className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//             >
//               <Filter size={16} />
//               Graduation year
//             </button>

//             <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
//               <input
//                 type="checkbox"
//                 checked={mentorsOnly}
//                 onChange={(event) => setMentorsOnly(event.target.checked)}
//                 className="h-4 w-4 accent-blue-700"
//               />
//               Mentors only
//             </label>

//             <p className="text-sm text-slate-500">
//               {filteredAlumni.length} profiles found
//             </p>
//           </div>

//           {showFilters && (
//             <div className="mt-4 max-w-sm">
//               <label className="mb-2 block text-sm font-semibold text-slate-700">
//                 Graduation batch
//               </label>
//               <select
//                 value={selectedBatch}
//                 onChange={(event) => setSelectedBatch(event.target.value)}
//                 className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//               >
//                 <option value="All Batches">All batches</option>
//                 {batches.map((batch) => (
//                   <option key={batch} value={batch}>
//                     Class of {batch}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {(search ||
//             selectedIndustry !== "All Industries" ||
//             selectedBatch !== "All Batches" ||
//             mentorsOnly) && (
//             <button
//               type="button"
//               onClick={resetFilters}
//               className="mt-4 text-sm font-semibold text-blue-700 hover:underline"
//             >
//               Clear all filters
//             </button>
//           )}
//         </section>

//         <div className="mb-5 mt-8 flex flex-wrap items-end justify-between gap-3">
//           <div>
//             <h2 className="text-2xl font-bold text-slate-900">
//               Alumni Directory
//             </h2>
//             <p className="mt-1 text-sm text-slate-500">
//               Explore professional profiles and career journeys.
//             </p>
//           </div>

//           <span className="text-xs text-slate-400">
//             Illustrative demo profiles
//           </span>
//         </div>

//         {filteredAlumni.length > 0 ? (
//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
//             {filteredAlumni.map((alumni) => (
//               <AlumniCard
//                 key={alumni.id}
//                 alumni={alumni}
//                 onView={setSelectedAlumni}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
//             <Search size={32} className="mx-auto text-slate-400" />
//             <h3 className="mt-4 text-lg font-bold text-slate-800">
//               No matching alumni
//             </h3>
//             <p className="mt-2 text-sm text-slate-500">
//               Try another keyword or clear your filters.
//             </p>
//             <button
//               type="button"
//               onClick={resetFilters}
//               className="mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
//             >
//               Reset filters
//             </button>
//           </div>
//         )}

//         <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
//           <div className="flex items-start gap-3">
//             <CalendarDays
//               size={22}
//               className="mt-0.5 shrink-0 text-blue-700"
//             />
//             <div>
//               <h3 className="font-bold text-slate-900">
//                 Build stronger alumni connections
//               </h3>
//               <p className="mt-2 text-sm leading-6 text-slate-600">
//                 The portal can later support alumni registration,
//                 profile verification, mentorship requests, reunions,
//                 guest lectures, and alumni achievement submissions.
//               </p>
//             </div>
//           </div>
//         </section>

//         <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
//           Prototype notice: all alumni names, positions, organizations,
//           and career details shown here are fictional examples. Replace
//           them with verified information before publishing. Profile
//           management, authentication, and mentorship requests are not
//           connected to a backend.
//         </p>
//       </main>

//       {selectedAlumni && (
//         <AlumniProfileModal
//           alumni={selectedAlumni}
//           onClose={() => setSelectedAlumni(null)}
//         />
//       )}
//     </div>
//   );
// }


import { useMemo, useState } from "react";
import {
  Users,
  GraduationCap,
  Search,
  ExternalLink,
  BriefcaseBusiness,
  ChevronDown,
} from "lucide-react";
import { alumniData, alumniBatches } from "./data/alumniData";
import MentorshipRequest from "./MentorshipRequest";

export default function Alumni() {
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [search, setSearch] = useState("");

  const mentors = useMemo(
    () => alumniData.filter((alumnus) => alumnus.isMentor),
    []
  );

  const directory = useMemo(() => {
    return alumniData.filter((alumnus) => {
      const matchesBatch =
        selectedBatch === "All" ||
        String(alumnus.batch) === selectedBatch;

      const matchesSearch =
        alumnus.name.toLowerCase().includes(search.toLowerCase()) ||
        alumnus.programme.toLowerCase().includes(search.toLowerCase());

      return matchesBatch && matchesSearch;
    });
  }, [selectedBatch, search]);

  return (
    <div className="space-y-10">
      {/* SECTION 1: ALUMNI MENTORS */}
      <section>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Users size={23} className="text-[#b0802d]" />
            <h2 className="text-2xl font-bold text-[#123b62]">
              Alumni Mentors
            </h2>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Learn from our alumni. Connect with mentors who have volunteered
            to guide students in academics, careers and research.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {mentors.map((mentor) => (
            <article
              key={mentor.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#123b62]">
                  <GraduationCap size={25} />
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                  Mentor
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-800">
                {mentor.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {mentor.programme} · Batch {mentor.batch}
              </p>

              <div className="mt-4 space-y-2">
                <p className="flex items-start gap-2 text-sm text-slate-600">
                  <BriefcaseBusiness
                    size={16}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />
                  <span>
                    {mentor.role}
                    {mentor.company ? ` · ${mentor.company}` : ""}
                  </span>
                </p>
              </div>

              {mentor.mentorAreas?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.mentorAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}

              <a
                href={mentor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-semibold text-[#123b62] hover:text-[#b0802d]"
              >
                LinkedIn Profile
                <ExternalLink size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 2: ALUMNI DIRECTORY */}
      <section>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap size={24} className="text-[#b0802d]" />
            <h2 className="text-2xl font-bold text-[#123b62]">
              Alumni Directory
            </h2>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Explore alumni by graduation year and programme. Select a batch
            to view its alumni.
          </p>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name or programme..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative w-full sm:w-56">
            <select
              value={selectedBatch}
              onChange={(event) => setSelectedBatch(event.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Batches</option>
              {alumniBatches.map((batch) => (
                <option key={batch} value={String(batch)}>
                  Batch {batch}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {directory.length}
            </span>{" "}
            alumni
            {selectedBatch !== "All" ? ` · Batch ${selectedBatch}` : ""}
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[570px] text-left text-sm">
              <thead className="bg-[#123b62] text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Batch</th>
                  <th className="px-5 py-4 font-semibold">Programme</th>
                  <th className="px-5 py-4 font-semibold">LinkedIn</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {directory.map((alumnus) => (
                  <tr
                    key={alumnus.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {alumnus.name}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {alumnus.batch}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {alumnus.programme}
                    </td>

                    <td className="px-5 py-4">
                      {alumnus.linkedin ? (
                        <a
                          href={alumnus.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-medium text-[#123b62] hover:text-[#b0802d]"
                        >
                          View Profile
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-slate-400">
                          Not provided
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {directory.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      No alumni found for this batch or search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <MentorshipRequest />
    </div>
  );
}

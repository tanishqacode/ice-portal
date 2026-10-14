import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Newspaper,
} from "lucide-react";

import departmentImg from "./components/Header/images/departmentimg.jpeg";
import Header from "./components/Header/header";
import Sidebar from "./components/Sidebar/sidebar";
import QuickLinks from "./components/QuickLinks/quicklinks";

const announcements = [
  {
    category: "Announcement",
    title: "Department announcements will appear here",
    date: "Updates coming soon",
  },
  {
    category: "Academic",
    title: "Academic notices and important information",
    date: "Updates coming soon",
  },
  {
    category: "Events",
    title: "Seminars, workshops and department events",
    date: "Updates coming soon",
  },
];

const pageDescriptions = {
  About: {
    title: "About the Department",
    description:
      "Learn about the department, its academic environment, facilities and areas of focus.",
  },
  Faculty: {
    title: "Faculty",
    description:
      "Faculty profiles, research interests, qualifications and contact information will be available here.",
  },
  Academics: {
    title: "Academics",
    description:
      "Course information, academic resources, programme details and useful student information.",
  },
  Research: {
    title: "Research & Publications",
    description:
      "Explore research areas, faculty publications and research opportunities. Publication records can be connected to the database later.",
  },
  Students: {
    title: "Student Corner",
    description:
      "A space for student resources, projects, research collaboration and academic opportunities.",
  },
  Alumini:{
    title:"Alumini",
    description:
    "Connect to your Seniors for guidance and help regarding any type of academic help."
  },
  "News & Events": {
    title: "News & Events",
    description:
      "Department announcements, seminars, workshops, talks and upcoming events.",
  },
  Contact: {
    title: "Contact the Department",
    description:
      "Department address, contact details and other official information will be added here.",
  },
};

function SectionPlaceholder({ page, onNavigate }) {
  const content = pageDescriptions[page] ?? {
    title: page,
    description: "Department information will be added here.",
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#123b62]">
        <GraduationCap size={26} />
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#b0802d]">
        Department of ICE
      </p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">
        {content.title}
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600">
        {content.description}
      </p>

      <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
        <p className="font-semibold text-slate-700">
          Content will be added in the next development phase.
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          This section is connected to the frontend navigation. We can add the
          actual content and database integration later.
        </p>
      </div>

      <button
        onClick={() => onNavigate("Home")}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#123b62] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d2b49]"
      >
        Back to Home <ArrowRight size={16} />
      </button>
    </section>
  );
}

function HomeContent({ onNavigate }) {
  return (
    <>
     
{/* Hero Banner */}
<section className="relative isolate min-h-[400px] overflow-hidden rounded-2xl bg-[#123b62] text-white shadow-md sm:min-h-[450px]">

  {/* Background image */}
  <div className="absolute inset-0 -z-20">
    <img
      src={departmentImg}
      alt="Department building"
      className="h-full w-full object-cover object-center"
    />
  </div>

  {/* Blue overlay: darker on the left, clearer on the right */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10385c]/75 via-[#123b62]/60 via-45% to-[#123b62]/10" />

  {/* Optional subtle blue tint */}
  <div className="absolute inset-0 -z-10 bg-[#123b62]/5" />

  {/* Hero content */}
  <div className="relative flex min-h-[400px] items-center px-6 py-12 sm:min-h-[450px] sm:px-10 sm:py-14 lg:px-12">

    <div className="max-w-3xl">

      {/* Portal label */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#123b62]/50 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm">
        <span className="h-3 w-3 rounded-full bg-[#f0bd4f]" />
        NIT Jalandhar · Department Portal
      </div>

      {/* Heading */}
      <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-6xl">
        Instrumentation &amp;
        <span className="mt-1 block text-[#f4c252]">
          Control Engineering
        </span>
      </h2>

      {/* Description */}
      <p className="mt-6 max-w-2xl text-sm leading-7 text-white/95 sm:text-base sm:leading-8">
        Explore our academic programmes, faculty, research activities and
        opportunities for students to learn, innovate and collaborate.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => onNavigate("About")}
          className="inline-flex items-center gap-3 rounded-lg bg-[#f0bd4f] px-5 py-3.5 text-sm font-bold text-[#123b62] shadow-sm transition hover:bg-[#ffcf68]"
        >
          Explore Department
          <ArrowRight size={19} />
        </button>

        <button
          onClick={() => onNavigate("Research")}
          className="rounded-lg border border-white/60 bg-[#123b62]/40 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
        >
          Research &amp; Publications
        </button>
      </div>

    </div>
  </div>

  {/* Bottom gold accent */}
  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#f0bd4f]" />

</section>
      {/* Welcome section */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="hidden shrink-0 rounded-xl bg-blue-50 p-3 text-[#123b62] sm:block">
            <GraduationCap size={27} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#b0802d]">
              Welcome
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-800 sm:text-2xl">
              Welcome to the Department of ICE
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              The Department of Instrumentation and Control Engineering at
              Dr. B. R. Ambedkar National Institute of Technology Jalandhar is
              presented here through a dedicated department portal. Use this
              space to explore department information, academic resources,
              research activities and student opportunities.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              This introduction is temporary. We can replace it with the
              department's official description when you provide the content.
            </p>

            <button
              onClick={() => onNavigate("About")}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#123b62] hover:text-[#b0802d]"
            >
              Learn more about the department <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <div className="mt-10">
        <QuickLinks onNavigate={onNavigate} />
      </div>

      {/* Announcements */}
      <section className="mt-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#b0802d]">
              What's happening
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-800 sm:text-2xl">
              Notices &amp; Announcements
            </h2>
          </div>

          <button
            onClick={() => onNavigate("News & Events")}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#123b62] hover:text-[#b0802d]"
          >
            View all <ChevronRight size={17} />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {announcements.map((item, index) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#123b62]">
                  {item.category}
                </span>
                {index === 0 ? (
                  <Newspaper size={18} className="text-[#b0802d]" />
                ) : index === 1 ? (
                  <CalendarDays size={18} className="text-[#b0802d]" />
                ) : (
                  <Clock3 size={18} className="text-[#b0802d]" />
                )}
              </div>

              <h3 className="mt-4 font-bold leading-6 text-slate-800">
                {item.title}
              </h3>

              <p className="mt-3 text-xs text-slate-500">{item.date}</p>

              <button
                onClick={() => onNavigate("News & Events")}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#123b62] hover:text-[#b0802d]"
              >
                View details <ExternalLink size={14} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Home");

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-800">
      <Header activePage={activePage} onNavigate={navigate} />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-8">
          <button
            onClick={() => navigate("Home")}
            className="font-semibold text-[#123b62] hover:underline"
          >
            Home
          </button>
          <ChevronRight size={13} />
          <span>Department of ICE</span>
          {activePage !== "Home" && (
            <>
              <ChevronRight size={13} />
              <span className="font-semibold text-slate-700">{activePage}</span>
            </>
          )}
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-9">
        <div className="grid items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">
          <Sidebar activePage={activePage} onNavigate={navigate} />

          <div className="min-w-0">
            {activePage === "Home" ? (
              <HomeContent onNavigate={navigate} />
            ) : (
              <SectionPlaceholder
                page={activePage}
                onNavigate={navigate}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="mt-8 bg-[#102f50] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold">
              Department of Instrumentation and Control Engineering
            </p>
            <p className="mt-1 text-sm text-blue-100">
              Dr. B. R. Ambedkar National Institute of Technology Jalandhar
            </p>
          </div>

          <button
            onClick={() => navigate("Contact")}
            className="flex items-center gap-2 self-start text-sm font-semibold text-[#f0c66e] hover:text-white md:self-center"
          >
            Contact Department <ArrowRight size={16} />
          </button>
        </div>

        <div className="border-t border-white/10 px-4 py-3 text-center text-xs text-blue-100 sm:px-8">
          Department portal · Initial frontend version
        </div>
      </footer>
    </div>
  );
}
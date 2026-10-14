import {
  Activity,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Cpu,
  FlaskConical,
  GraduationCap,
  Microscope,
  Network,
  Radio,
  Target,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import departmentImage from "../Header/images/departmentimg.jpeg";

const focusAreas = [
  {
    icon: Activity,
    title: "Control Systems",
    description:
      "Modelling, analysis and control of dynamic systems used in industrial and engineering applications.",
  },
  {
    icon: Radio,
    title: "Instrumentation",
    description:
      "Measurement techniques, sensors and instruments used to monitor physical processes accurately.",
  },
  {
    icon: Cpu,
    title: "Embedded Systems",
    description:
      "Microcontrollers, electronic interfaces and hardware-software systems for real-world applications.",
  },
  {
    icon: Waves,
    title: "Signal Processing",
    description:
      "Processing and interpreting signals to extract useful information from measured data.",
  },
  {
    icon: BrainCircuit,
    title: "Automation & Intelligent Systems",
    description:
      "Automation, intelligent monitoring and data-driven approaches to engineering problems.",
  },
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    description:
      "Applying engineering principles through experimentation, projects and interdisciplinary research.",
  },
];

const portalFeatures = [
  {
    icon: GraduationCap,
    title: "Academic Information",
    description:
      "A convenient place to explore departmental information, academic resources and student opportunities.",
  },
  {
    icon: BookOpen,
    title: "Research Repository",
    description:
      "Discover faculty publications, research interests, student papers and project contributions.",
  },
  {
    icon: Users,
    title: "Faculty & Alumni Network",
    description:
      "Explore faculty expertise and build connections with alumni for mentorship and career guidance.",
  },
];

export default function About({ onNavigate }) {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-2xl bg-[#123b62] text-white shadow-sm">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute -right-6 -top-10 h-44 w-44 rounded-full border border-white/10" />

        <div className="relative grid items-center gap-8 p-6 sm:p-9 lg:grid-cols-[1.1fr_0.9fr] lg:p-11">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-100">
              <GraduationCap size={15} />
              DEPARTMENT OVERVIEW
            </span>

            <h1 className="mt-5 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
              Instrumentation &
              <span className="block text-[#e7c57c]">
                Control Engineering
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
              Exploring the intersection of measurement, electronics,
              automation and control to understand and solve real-world
              engineering problems.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("Faculty")}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#123b62] transition hover:bg-blue-50"
              >
                Meet Our Faculty
                <ArrowUpRight size={17} />
              </button>

              <button
                onClick={() => onNavigate("Research")}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Research
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src={departmentImage}
              alt="Department building"
              className="h-56 w-full rounded-xl border border-white/20 object-cover shadow-xl sm:h-72"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-lg bg-[#0b2945]/90 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-widest text-blue-200">
                Our Institution
              </p>
              <p className="mt-1 text-sm font-bold leading-6 text-white">
                Dr. B. R. Ambedkar National Institute of Technology,
                Jalandhar
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#123b62]">
              <BookOpen size={23} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#b0802d]">
                About ICE
              </p>
              <h2 className="mt-1 font-heading text-xl font-extrabold text-slate-800">
                About the Department
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              Instrumentation and Control Engineering brings together
              principles of electrical and electronics engineering,
              measurement, sensors, signal processing and automatic control.
              It focuses on understanding how physical systems behave,
              measuring their parameters and developing methods to monitor
              and regulate their operation.
            </p>
            <p>
              The discipline has applications across manufacturing,
              process industries, robotics, energy systems, healthcare
              instrumentation and industrial automation. It combines
              theoretical knowledge with practical engineering, helping
              students understand both the systems being controlled and the
              instruments used to observe them.
            </p>
            <p>
              At Dr. B. R. Ambedkar National Institute of Technology,
              Jalandhar, the department's official website serves as a
              reference for departmental information, faculty profiles,
              activities and other academic details.
            </p>
          </div>

          <a
            href="https://departments.nitj.ac.in/dept/ice/Home"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#123b62] hover:text-[#b0802d]"
          >
            Visit Official Department Website
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-[#a16d16]">
            <Target size={23} />
          </div>

          <h2 className="mt-4 font-heading text-xl font-extrabold text-slate-800">
            What ICE Brings Together
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            The discipline connects three important parts of an engineering
            system: measuring what is happening, interpreting the information
            and deciding how the system should respond.
          </p>

          <div className="mt-6 space-y-4">
            {[
              {
                number: "01",
                title: "Measure",
                text: "Acquire information through sensors and instruments.",
              },
              {
                number: "02",
                title: "Analyse",
                text: "Process signals and understand system behaviour.",
              },
              {
                number: "03",
                title: "Control",
                text: "Use feedback and control strategies to regulate processes.",
              },
            ].map((item) => (
              <div key={item.number} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-extrabold text-[#123b62]">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0802d]">
            Areas of Engineering
          </p>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-slate-800">
            Core Areas of ICE
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Instrumentation and Control Engineering draws on several
            interconnected areas. These are broad discipline areas, not a
            verified list of the department's individual research groups.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {focusAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article
                key={area.title}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#123b62] transition group-hover:bg-[#123b62] group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-heading text-base font-extrabold text-slate-800">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {area.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0802d]">
            Our Department Portal Project
          </p>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-slate-800">
            One place for information, research and collaboration
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The NITJ ICE Department Portal is our proposed minor project. It
            aims to make departmental information easier to discover while
            creating a common space for faculty research, student
            contributions and alumni engagement.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {portalFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl bg-slate-50 p-5"
              >
                <Icon className="text-[#123b62]" size={25} />
                <h3 className="mt-3 font-bold text-slate-800">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col justify-between gap-4 rounded-xl bg-[#f3f6fa] p-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold text-slate-800">
              Explore the portal
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Navigate to the sections that are being developed for this project.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate("Research")}
              className="rounded-lg bg-[#123b62] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2b49]"
            >
              Research
            </button>
            <button
              onClick={() => onNavigate("Students")}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#123b62] hover:text-[#123b62]"
            >
              Student Corner
            </button>
            <button
              onClick={() => onNavigate("Alumini")}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#123b62] hover:text-[#123b62]"
            >
              Alumni
            </button>
          </div>
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <Microscope className="mt-0.5 shrink-0 text-amber-700" size={20} />
        <p className="text-xs leading-6 text-amber-900 sm:text-sm">
          <strong>Content note:</strong> The technical overview and core
          areas above describe the ICE discipline generally. For official
          department vision, mission, laboratory names, programmes and
          current research specializations, use verified information from
          the institute's website before publishing this page as official
          departmental content.
        </p>
      </div>
    </div>
  );
}
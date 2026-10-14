import { ArrowRight, GraduationCap } from "lucide-react";

export default function SectionPage({ title, description, onNavigate }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#123b62]">
        <GraduationCap size={26} />
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#b0802d]">
        Department of ICE
      </p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600">{description}</p>

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

import { ArrowRight } from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
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
          onClick={() => onNavigate("Contact")}
          className="flex items-center gap-2 self-start text-sm font-semibold text-[#f0c66e] hover:text-white md:self-center"
        >
          Contact Department <ArrowRight size={16} />
        </button>
      </div>

      <div className="border-t border-white/10 px-4 py-3 text-center text-xs text-blue-100 sm:px-8">
        Department portal · Initial frontend version
      </div>
    </footer>
  );
}

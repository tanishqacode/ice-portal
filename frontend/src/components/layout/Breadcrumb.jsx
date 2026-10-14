import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ activePage, onNavigate }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-8">
        <button
          onClick={() => onNavigate("Home")}
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
  );
}

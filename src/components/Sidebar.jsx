import LabelDataSection from "./LabelDataSection";
import SheetLayoutSection from "./SheetLayoutSection";
import StylingSection from "./StylingSection";
import AppearanceSection from "./AppearanceSection";
import LogoSection from "./LogoSection";
import MultiPageSection from "./MultiPageSection";

export default function Sidebar({ state, update }) {
  return (
    <aside className="w-95 min-w-95 bg-linear-to-b from-slate-900 to-slate-950 border-r border-slate-800/60 flex flex-col no-print shadow-2xl z-10 relative">
      {/* Subtle top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500" />

      <div className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden p-5">
        {/* ─── Header ─── */}
        <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-slate-700/40">
          <div className="shrink-0 relative">
            {/* Glow behind icon */}
            <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-xl animate-glow" />
            <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M10 11h12M10 16h12M10 21h8" />
                <rect
                  x="3"
                  y="3"
                  width="4"
                  height="18"
                  rx="1"
                  fill="white"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
              Simple Sticker Pro
            </h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase mt-0.5">
              Design & Print Labels
            </p>
          </div>
        </div>

        {/* ─── Sections ─── */}
        <div className="space-y-4">
          <div className="glass-card">
            <LabelDataSection state={state} update={update} />
          </div>
          <div className="glass-card">
            <SheetLayoutSection state={state} update={update} />
          </div>
          <div className="glass-card">
            <StylingSection state={state} update={update} />
          </div>
          <div className="glass-card">
            <AppearanceSection state={state} update={update} />
          </div>
          <div className="glass-card">
            <LogoSection state={state} update={update} />
          </div>
          <div className="glass-card">
            <MultiPageSection state={state} update={update} />
          </div>
        </div>
      </div>
    </aside>
  );
}

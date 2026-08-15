import SectionHeading from "./SectionHeading";

const ALIGN_OPTIONS = [
  { value: "left", icon: "M4 6h16M4 10h8M4 14h16M4 18h10", label: "Left" },
  { value: "center", icon: "M4 6h16M8 10h8M4 14h16M6 18h12", label: "Center" },
  { value: "right", icon: "M4 6h16M12 10h8M4 14h16M10 18h10", label: "Right" },
];

export default function AppearanceSection({ state, update }) {
  return (
    <section
      className="animate-fade-in"
      style={{ animationDelay: "0.15s" }}
    >
      <SectionHeading
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        }
        title="Appearance"
      />

      {/* Text Alignment */}
      <div className="mb-3.5">
        <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5">
          Text Alignment
        </label>
        <div className="flex gap-1 p-1 bg-slate-950/50 border border-slate-700/60 rounded-xl">
          {ALIGN_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update({ textAlign: opt.value })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-medium
                transition-all duration-300 cursor-pointer border-none
                ${state.textAlign === opt.value
                  ? "bg-slate-800 text-indigo-400 shadow-md shadow-black/20"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d={opt.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="flex gap-3 mb-3.5">
        <ColorPicker
          label="Text Color"
          id="text-color"
          value={state.textColor}
          onChange={(v) => update({ textColor: v })}
        />
        <ColorPicker
          label="Background"
          id="bg-color"
          value={state.bgColor}
          onChange={(v) => update({ bgColor: v })}
        />
      </div>

      {/* Quick Color Presets */}
      <div className="mb-3.5">
        <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5">
          Color Presets
        </label>
        <div className="flex gap-2 flex-wrap">
          {[
            { text: "#1a1d23", bg: "#ffffff", name: "Default" },
            { text: "#1e3a5f", bg: "#e8f4fd", name: "Blue" },
            { text: "#5c2d00", bg: "#fff7ed", name: "Warm" },
            { text: "#14532d", bg: "#f0fdf4", name: "Green" },
            { text: "#4c1d95", bg: "#f5f3ff", name: "Purple" },
            { text: "#ffffff", bg: "#1a1d23", name: "Dark" },
            { text: "#dc2626", bg: "#fef2f2", name: "Red" },
            { text: "#92400e", bg: "#fffbeb", name: "Gold" },
          ].map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => update({ textColor: preset.text, bgColor: preset.bg })}
              title={preset.name}
              className={`w-7 h-7 rounded-lg border-2 cursor-pointer transition-all duration-300
                hover:scale-110 hover:shadow-lg flex items-center justify-center
                ${state.textColor === preset.text && state.bgColor === preset.bg
                  ? "border-indigo-500 shadow-md shadow-indigo-500/20"
                  : "border-slate-700/60"
                }`}
              style={{ background: preset.bg }}
            >
              <span
                className="text-[9px] font-bold"
                style={{ color: preset.text }}
              >
                A
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Sticker Dimensions */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <label
            className="text-[10px] font-medium text-slate-500 uppercase tracking-widest cursor-pointer"
            onClick={() => update({ useCustomDimensions: !state.useCustomDimensions })}
          >
            Custom Size (mm)
          </label>
          <div
            className={`toggle-track ${state.useCustomDimensions ? "active" : ""}`}
            onClick={() => update({ useCustomDimensions: !state.useCustomDimensions })}
            role="switch"
            aria-checked={state.useCustomDimensions}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter")
                update({ useCustomDimensions: !state.useCustomDimensions });
            }}
          >
            <div className="toggle-knob" />
          </div>
        </div>

        {state.useCustomDimensions && (
          <div className="flex gap-3 animate-fade-in">
            <DimensionInput
              label="Width (mm)"
              id="sticker-w"
              value={state.stickerWidthMm ?? ""}
              onChange={(v) => update({ stickerWidthMm: v || null })}
            />
            <DimensionInput
              label="Height (mm)"
              id="sticker-h"
              value={state.stickerHeightMm ?? ""}
              onChange={(v) => update({ stickerHeightMm: v || null })}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function ColorPicker({ label, id, value, onChange }) {
  return (
    <div className="flex-1">
      <label htmlFor={id} className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-2 border border-slate-700/60 rounded-xl bg-slate-950/50 px-2 h-9
        focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20
        transition-all duration-300">
        <input
          type="color"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-5 h-5 border-none outline-none cursor-pointer rounded-md p-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-[11px] font-mono text-slate-200 bg-transparent border-none outline-none uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );
}

function DimensionInput({ label, id, value, onChange }) {
  return (
    <div className="flex-1">
      <label htmlFor={id} className="block text-[9px] font-medium text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <input
        type="number"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value ? parseFloat(e.target.value) : null)}
        placeholder="Auto"
        min={5}
        max={200}
        className="w-full h-9 px-3 text-[12px] font-semibold text-slate-200 bg-slate-950/50
          border border-slate-700/60 rounded-xl outline-none placeholder-slate-600
          focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20
          transition-all duration-300"
      />
    </div>
  );
}

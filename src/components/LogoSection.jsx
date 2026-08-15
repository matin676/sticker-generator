import { useCallback } from "react";
import SectionHeading from "./SectionHeading";

export default function LogoSection({ state, update }) {
  const handleFileUpload = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        update({ logoUrl: ev.target.result });
      };
      reader.readAsDataURL(file);
    },
    [update]
  );

  const removeLogo = () => update({ logoUrl: "" });

  return (
    <section
      className="animate-fade-in"
      style={{ animationDelay: "0.2s" }}
    >
      <SectionHeading
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
        title="Logo / Image"
      />

      {/* Upload area */}
      {!state.logoUrl ? (
        <label
          htmlFor="logo-upload"
          className="flex flex-col items-center justify-center gap-2.5 p-5 border-2 border-dashed border-slate-700/60
            rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-500/5 transition-all duration-300
            bg-slate-950/30 group"
        >
          <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-500 group-hover:text-indigo-400 transition-colors">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-center">
            <span className="block text-[11px] font-semibold text-slate-300 mb-0.5">
              Click to upload logo
            </span>
            <span className="block text-[10px] text-slate-500">
              PNG, JPG, SVG
            </span>
          </div>
          <input
            type="file"
            id="logo-upload"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="space-y-4">
          {/* Preview */}
          <div className="relative group bg-slate-950/50 border border-slate-700/60 rounded-xl p-4 flex items-center justify-center">
            <img
              src={state.logoUrl}
              alt="Logo preview"
              className="max-h-20 max-w-full object-contain filter drop-shadow-md"
            />
            <button
              type="button"
              onClick={removeLogo}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500/90 text-white
                flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg
                hover:bg-red-500 hover:scale-110 active:scale-95
                transition-all duration-200 cursor-pointer border-none text-[16px] leading-none"
              title="Remove logo"
            >
              ×
            </button>
          </div>

          {/* Logo Size */}
          <div>
            <label
              htmlFor="logo-size"
              className="flex items-center justify-between text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5"
            >
              Logo Size
              <span className="font-bold text-indigo-400 text-[11px] normal-case tracking-normal">
                {state.logoSize}px
              </span>
            </label>
            <input
              type="range"
              id="logo-size"
              min={8}
              max={60}
              value={state.logoSize}
              onChange={(e) => update({ logoSize: +e.target.value })}
              className="w-full"
            />
          </div>

          {/* Logo Position */}
          <div>
            <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5">
              Position
            </label>
            <div className="flex gap-1 p-1 bg-slate-950/50 border border-slate-700/60 rounded-xl">
              {[
                { value: "top", label: "Top" },
                { value: "bottom", label: "Bottom" },
                { value: "left", label: "Left" },
                { value: "right", label: "Right" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update({ logoPosition: opt.value })}
                  className={`flex-1 py-1.5 rounded-lg text-[10.5px] font-medium
                    transition-all duration-300 cursor-pointer border-none
                    ${state.logoPosition === opt.value
                      ? "bg-slate-800 text-indigo-400 shadow-md shadow-black/20"
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Change logo */}
          <label
            htmlFor="logo-reupload"
            className="block text-center text-[10px] font-semibold uppercase tracking-wider text-indigo-400 cursor-pointer
              hover:text-indigo-300 transition-colors duration-200 mt-2"
          >
            Change logo image
            <input
              type="file"
              id="logo-reupload"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </section>
  );
}

import SectionHeading from "./SectionHeading";
import StepperInput from "./StepperInput";

export default function StylingSection({ state, update }) {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <SectionHeading
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7V4h16v3M9 20h6M12 4v16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        title="Typography"
      />

      <div className="space-y-3.5">
        <StepperInput
          label="Font Size"
          id="font-size-input"
          value={state.fontSize}
          min={6}
          max={72}
          onChange={(v) => update({ fontSize: v })}
        />

        <div>
          <label
            htmlFor="font-family"
            className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5"
          >
            Family
          </label>
          <select
            id="font-family"
            value={state.fontFamily}
            onChange={(e) => update({ fontFamily: e.target.value })}
            className="select-styled w-full h-9 px-3.5 pr-9 text-sm font-semibold text-slate-200
              bg-slate-950/50 border border-slate-700/60 rounded-xl outline-none cursor-pointer
              focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20
              transition-all duration-300"
          >
            <option value="Inter">Modern Sans-serif</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Roboto">Roboto</option>
            <option value="system-ui">System Default</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="font-weight"
            className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5"
          >
            Weight
          </label>
          <select
            id="font-weight"
            value={state.fontWeight}
            onChange={(e) => update({ fontWeight: +e.target.value })}
            className="select-styled w-full h-9 px-3.5 pr-9 text-sm font-semibold text-slate-200
              bg-slate-950/50 border border-slate-700/60 rounded-xl outline-none cursor-pointer
              focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20
              transition-all duration-300"
          >
            <option value={300}>Light</option>
            <option value={400}>Regular</option>
            <option value={500}>Medium</option>
            <option value={600}>Semi-Bold</option>
            <option value={700}>Bold</option>
          </select>
        </div>
      </div>
    </section>
  );
}

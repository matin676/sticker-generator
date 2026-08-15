import SectionHeading from "./SectionHeading";

export default function LabelDataSection({ state, update }) {
  return (
    <section className="animate-fade-in">
      <SectionHeading
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        title="Label Data"
      />

      <div className="space-y-3">
        <InputField
          label="Line 1 Text"
          id="line1-text"
          value={state.line1}
          onChange={(v) => update({ line1: v })}
          placeholder="Enter line 1..."
        />

        <InputField
          label="Line 2 Text"
          id="line2-text"
          value={state.line2}
          onChange={(v) => update({ line2: v })}
          placeholder="Enter line 2..."
        />

        <InputField
          label="Price Amount (Rs.)"
          id="price-amount"
          value={state.priceAmount}
          onChange={(v) => update({ priceAmount: v })}
          placeholder="Enter amount (e.g. 1450/-)..."
        />
      </div>

      <button
        id="btn-print"
        type="button"
        onClick={() => window.print()}
        className="mt-5 w-full py-3 px-6 flex items-center justify-center gap-2.5 text-sm font-bold
          text-white bg-linear-to-r from-indigo-500 to-violet-600 rounded-xl
          shadow-lg shadow-indigo-500/25
          hover:shadow-indigo-500/40 hover:-translate-y-0.5
          active:translate-y-0 active:scale-[0.98]
          transition-all duration-300 cursor-pointer relative overflow-hidden group border-none"
      >
        <span className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
        >
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        <span className="relative z-10">Print Sticker Sheet</span>
      </button>
    </section>
  );
}

function InputField({ label, id, value, onChange, placeholder }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 px-3.5 text-sm font-semibold text-slate-100 bg-slate-950/50
          border border-slate-700/60 rounded-xl outline-none placeholder-slate-600
          focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 focus:bg-slate-900
          transition-all duration-300"
      />
    </div>
  );
}

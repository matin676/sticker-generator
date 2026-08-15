export default function StepperInput({ label, id, value, min, max, onChange }) {
  const step = (dir) => {
    const next = Math.min(max, Math.max(min, value + dir));
    onChange(next);
  };

  return (
    <div className="flex-1">
      <label
        htmlFor={id}
        className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5"
      >
        {label}
      </label>
      <div
        className="flex items-center border border-slate-700/60 rounded-xl overflow-hidden bg-slate-950/50 h-9
        focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20
        transition-all duration-300"
      >
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={`Decrease ${label}`}
          className="w-8 h-full flex items-center justify-center text-sm font-medium
            text-slate-400 hover:bg-slate-800 hover:text-indigo-400
            active:bg-slate-700 transition-all duration-200 cursor-pointer select-none border-none bg-transparent"
        >
          −
        </button>
        <input
          type="number"
          id={id}
          value={value}
          min={min}
          max={max}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
          }}
          className="flex-1 h-full text-center text-sm font-semibold text-slate-100
            bg-transparent border-none outline-none"
        />
        <button
          type="button"
          onClick={() => step(1)}
          aria-label={`Increase ${label}`}
          className="w-8 h-full flex items-center justify-center text-sm font-medium
            text-slate-400 hover:bg-slate-800 hover:text-indigo-400
            active:bg-slate-700 transition-all duration-200 cursor-pointer select-none border-none bg-transparent"
        >
          +
        </button>
      </div>
    </div>
  );
}

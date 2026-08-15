import React from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../utils/classNames";

export function FloatingInput({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
}) {
  return (
    <div className="relative group flex-1 min-w-0">
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full h-14 px-4 pt-4 pb-1 text-sm font-semibold text-[#1C1B1F] bg-[#F4EFF4]
          rounded-2xl border-none outline-none transition-all duration-300 cubic-bezier(0.2,0,0,1)
          focus:bg-white focus:shadow-[0_4px_16px_rgba(103,80,164,0.12)] focus:ring-2 focus:ring-[#6750A4]"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-[10px] font-bold tracking-widest text-[#6750A4] uppercase pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}

export function ExpressiveStepper({ label, id, value, min, max, onChange }) {
  const step = (dir) => {
    const next = Math.min(max, Math.max(min, value + dir));
    onChange(next);
  };

  return (
    <div className="flex-1 relative group min-w-0 h-14">
      <div className="absolute left-4 top-2 text-[10px] font-bold tracking-widest text-[#6750A4] uppercase pointer-events-none z-10">
        {label}
      </div>
      <div className="flex items-center bg-[#F4EFF4] rounded-2xl h-14 w-full pt-4 pb-1 px-1 overflow-hidden transition-all duration-300 focus-within:bg-white focus-within:shadow-[0_4px_16px_rgba(103,80,164,0.12)] focus-within:ring-2 focus-within:ring-[#6750A4]">
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => step(-1)}
          className="w-10 shrink-0 h-full flex items-center justify-center rounded-xl bg-transparent text-[#49454F] hover:bg-[#EADDFF] hover:text-[#21005D] transition-colors border-none cursor-pointer"
        >
          <Minus size={16} strokeWidth={2.5} />
        </motion.button>
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
          className="flex-1 min-w-0 w-full text-center text-sm font-semibold text-[#1C1B1F] bg-transparent border-none outline-none p-0 m-0 leading-none"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => step(1)}
          className="w-10 shrink-0 h-full flex items-center justify-center rounded-xl bg-transparent text-[#49454F] hover:bg-[#EADDFF] hover:text-[#21005D] transition-colors border-none cursor-pointer"
        >
          <Plus size={16} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}

export function ExpressiveToggle({ checked, onChange, label }) {
  return (
    <div
      className="flex items-center justify-between gap-3 cursor-pointer group"
      onClick={onChange}
    >
      <span className="text-[12px] font-semibold text-[#49454F] group-hover:text-[#1C1B1F] transition-colors">
        {label}
      </span>
      <div
        className={cn(
          "w-12 h-7 rounded-full p-1 flex items-center transition-colors duration-300",
          checked ? "bg-[#6750A4]" : "bg-[#CAC4D0]",
        )}
      >
        <motion.div
          initial={false}
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "w-5 h-5 rounded-full shadow-sm",
            checked ? "bg-white" : "bg-white",
          )}
        />
      </div>
    </div>
  );
}

export function ExpressiveSelect({ label, id, value, onChange, options }) {
  return (
    <div className="relative group flex-1 min-w-0">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 px-4 pt-4 pb-1 text-sm font-semibold text-[#1C1B1F] bg-[#F4EFF4]
          rounded-2xl border-none outline-none transition-all duration-300 cubic-bezier(0.2,0,0,1)
          focus:bg-white focus:shadow-[0_4px_16px_rgba(103,80,164,0.12)] focus:ring-2 focus:ring-[#6750A4]
          appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-[10px] font-bold tracking-widest text-[#6750A4] uppercase pointer-events-none"
      >
        {label}
      </label>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#49454F]">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

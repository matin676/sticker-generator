import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SurfaceCard({ icon: Icon, title, children, isOpen, onToggle }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group bg-white/90 backdrop-blur-2xl rounded-[28px] border border-[#EADDFF]/40 shadow-[0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden shrink-0 transition-shadow hover:shadow-[0_8px_40px_rgba(103,80,164,0.12)]"
    >
      {/* Liquid hover glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(103,80,164,0.06)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 bg-transparent border-none cursor-pointer outline-none relative z-10"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EADDFF] text-[#21005D] flex items-center justify-center shadow-inner transition-transform group-hover:scale-105">
            <Icon size={20} strokeWidth={2.5} />
          </div>
          <h2 className="text-[15px] font-black text-[#1C1B1F] tracking-widest uppercase">
            {title}
          </h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#6750A4] bg-[#F4EFF4]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="px-6 pb-6 pt-2 relative z-10 space-y-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

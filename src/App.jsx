import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid3X3,
  Palette,
  LayoutTemplate,
  Image as ImageIcon,
  Trash2,
  Printer,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  Minus,
  FileImage,
  Type as TypeIcon,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { PAPER_SIZES } from "./constants/paperSizes";

/* ═══════════════════════════════════════════
   UTILITY
   ═══════════════════════════════════════════ */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/* ═══════════════════════════════════════════
   MATERIAL EXPRESSIVE COMPONENTS
   ═══════════════════════════════════════════ */
function FloatingInput({
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

function ExpressiveStepper({ label, id, value, min, max, onChange }) {
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

function ExpressiveToggle({ checked, onChange, label }) {
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

function ExpressiveSelect({ label, id, value, onChange, options }) {
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

function SurfaceCard({ icon: Icon, title, children, isOpen, onToggle }) {
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

function GridSelection({ rows, cols, selection, onChange }) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentSelection, setCurrentSelection] = useState(selection);

  const handlePointerDown = (r, c) => {
    setIsSelecting(true);
    setStartPoint({ r, c });
    setCurrentSelection({ r1: r, c1: c, r2: r, c2: c });
  };

  const handlePointerEnter = (r, c) => {
    if (!isSelecting || !startPoint) return;
    setCurrentSelection({
      r1: Math.min(startPoint.r, r),
      r2: Math.max(startPoint.r, r),
      c1: Math.min(startPoint.c, c),
      c2: Math.max(startPoint.c, c),
    });
  };

  useEffect(() => {
    const handleUp = () => {
      if (isSelecting) {
        setIsSelecting(false);
        onChange(currentSelection);
      }
    };
    window.addEventListener("pointerup", handleUp);
    return () => window.removeEventListener("pointerup", handleUp);
  }, [isSelecting, currentSelection, onChange]);

  useEffect(() => {
    setCurrentSelection(selection);
  }, [selection]);

  return (
    <div className="mt-4 bg-[#F4EFF4] rounded-[20px] p-4 select-none touch-none">
      <div className="flex justify-between items-center mb-3">
        <label className="text-[10px] font-bold tracking-widest text-[#49454F] uppercase">
          Print Range
        </label>
        {currentSelection && (
          <button
            type="button"
            className="text-[10px] font-bold text-[#6750A4] hover:bg-[#EADDFF] bg-white px-3 py-1.5 rounded-full shadow-sm border-none cursor-pointer transition-colors"
            onClick={() => {
              setCurrentSelection(null);
              onChange(null);
            }}
          >
            Clear
          </button>
        )}
      </div>
      <div
        className="grid gap-0.5 w-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          touchAction: "none",
        }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const isSelected =
              currentSelection &&
              r >= currentSelection.r1 &&
              r <= currentSelection.r2 &&
              c >= currentSelection.c1 &&
              c <= currentSelection.c2;
            return (
              <div
                key={`${r}-${c}`}
                className={cn(
                  "aspect-2/1 rounded-xs transition-colors duration-150 cursor-crosshair",
                  isSelected
                    ? "bg-[#6750A4]"
                    : "bg-[#CAC4D0] hover:bg-[#6750A4]/40",
                )}
                onPointerDown={(e) => {
                  e.target.releasePointerCapture(e.pointerId); // Fix touch events
                  handlePointerDown(r, c);
                }}
                onPointerEnter={() => handlePointerEnter(r, c)}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   APP STATE & MAIN COMPONENT
   ═══════════════════════════════════════════ */
const DEFAULT_STATE = {
  line1: "ITEM NAME:",
  line2: "STK-9100",
  priceText: "Rs.",
  priceAmount: "1450/-",
  paperSize: "a4-avery10",
  rows: 13,
  cols: 5,
  margin: 8,
  gap: 2,
  showPerf: true,
  fontSize: 17,
  fontFamily: "Inter",
  fontWeight: 500,
  selection: null,
  textAlign: "center",
  textColor: "#1a1d23",
  bgColor: "#ffffff",
  logoUrl: "",
  logoSize: 20,
  logoPosition: "top",
  stickerWidthMm: null,
  stickerHeightMm: null,
  useCustomDimensions: false,
  pages: [
    { id: 1, line1: "ITEM NAME:", line2: "STK-9100", priceAmount: "1450/-" },
  ],
  activePageIndex: 0,
  multiPageEnabled: false,
};

export default function App() {
  const [state, setState] = useState(DEFAULT_STATE);
  const [activeSection, setActiveSection] = useState("Label Data");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const update = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const paperConfig = PAPER_SIZES[state.paperSize] || PAPER_SIZES["a4"];
  const scaleRatio = paperConfig.width / 595;
  const basePx = state.fontSize * 0.42 * scaleRatio;
  const pricePx = basePx * 1.05;
  const currencySymbol = state.priceText ? state.priceText.trim() : "Rs.";
  const displayPrice = state.priceAmount
    ? `${currencySymbol} ${state.priceAmount}`
    : "";
  const hasCustomDims =
    state.useCustomDimensions && state.stickerWidthMm && state.stickerHeightMm;

  // Cells
  const cells = useMemo(() => {
    const arr = [];
    for (let r = 0; r < state.rows; r++) {
      for (let c = 0; c < state.cols; c++) {
        const selected =
          !state.selection ||
          (r >= state.selection.r1 &&
            r <= state.selection.r2 &&
            c >= state.selection.c1 &&
            c <= state.selection.c2);
        arr.push({ r, c, selected });
      }
    }
    return arr;
  }, [state.rows, state.cols, state.selection]);

  // Pages
  const printPages = useMemo(() => {
    if (!state.multiPageEnabled || state.pages.length <= 1) {
      return [
        {
          line1: state.line1,
          line2: state.line2,
          priceAmount: state.priceAmount,
          displayPrice,
        },
      ];
    }
    return state.pages.map((p) => ({
      line1: p.line1,
      line2: p.line2,
      priceAmount: p.priceAmount,
      displayPrice: p.priceAmount ? `${currencySymbol} ${p.priceAmount}` : "",
    }));
  }, [
    state.multiPageEnabled,
    state.pages,
    state.line1,
    state.line2,
    state.priceAmount,
    displayPrice,
    currencySymbol,
  ]);

  const activePage = state.multiPageEnabled
    ? printPages[state.activePageIndex] || printPages[0]
    : printPages[0];

  // Flex
  const isHorizontalLogo =
    state.logoUrl &&
    (state.logoPosition === "left" || state.logoPosition === "right");
  const cellFlexDirection = !state.logoUrl
    ? "column"
    : state.logoPosition === "left"
      ? "row"
      : state.logoPosition === "right"
        ? "row-reverse"
        : state.logoPosition === "bottom"
          ? "column-reverse"
          : "column";
  const alignMap = { left: "flex-start", center: "center", right: "flex-end" };
  const cellAlignItems = isHorizontalLogo
    ? "center"
    : alignMap[state.textAlign] || "center";
  const cellJustifyContent = isHorizontalLogo
    ? alignMap[state.textAlign] || "center"
    : "center";

  const gridStyle = hasCustomDims
    ? {
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        padding: `${state.margin}px`,
        gap: `${state.gap}px`,
        fontFamily: `'${state.fontFamily}', system-ui, sans-serif`,
      }
    : {
        display: "grid",
        gridTemplateRows: `repeat(${state.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${state.cols}, 1fr)`,
        padding: `${state.margin}px`,
        gap: `${state.gap}px`,
        fontFamily: `'${state.fontFamily}', system-ui, sans-serif`,
      };

  // Handlers for logo
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => update({ logoUrl: ev.target.result });
    reader.readAsDataURL(file);
  };

  // Handlers for MultiPage
  const selectPage = (index) => {
    const updatedPages = [...state.pages];
    updatedPages[state.activePageIndex] = {
      ...updatedPages[state.activePageIndex],
      line1: state.line1,
      line2: state.line2,
      priceAmount: state.priceAmount,
    };
    const targetPage = updatedPages[index];
    update({
      pages: updatedPages,
      activePageIndex: index,
      line1: targetPage.line1,
      line2: targetPage.line2,
      priceAmount: targetPage.priceAmount,
    });
  };
  const addPage = () => {
    const newPage = {
      id: Date.now(),
      line1: state.line1,
      line2: "",
      priceAmount: "",
    };
    const newPages = [...state.pages, newPage];
    update({
      pages: newPages,
      activePageIndex: newPages.length - 1,
      line1: newPage.line1,
      line2: newPage.line2,
      priceAmount: newPage.priceAmount,
    });
  };
  const removePage = (index) => {
    if (state.pages.length <= 1) return;
    const newPages = state.pages.filter((_, i) => i !== index);
    const newActive = Math.min(state.activePageIndex, newPages.length - 1);
    const ap = newPages[newActive];
    update({
      pages: newPages,
      activePageIndex: newActive,
      line1: ap.line1,
      line2: ap.line2,
      priceAmount: ap.priceAmount,
    });
  };

  // Render Sticker Component
  const renderStickerContent = (pageData) => (
    <>
      {state.logoUrl && (
        <img
          src={state.logoUrl}
          alt=""
          className="shrink-0 object-contain"
          style={{
            width: `${state.logoSize * scaleRatio}px`,
            height: `${state.logoSize * scaleRatio}px`,
          }}
        />
      )}
      <div
        className="flex flex-col justify-center min-w-0 flex-1"
        style={{ alignItems: alignMap[state.textAlign] || "center" }}
      >
        <span
          className="leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
          style={{
            fontSize: `${basePx}px`,
            fontWeight: state.fontWeight,
            color: state.textColor,
          }}
        >
          {pageData.line1}
        </span>
        <span
          className="leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
          style={{
            fontSize: `${basePx}px`,
            fontWeight: state.fontWeight,
            color: state.textColor,
          }}
        >
          {pageData.line2}
        </span>
        {pageData.displayPrice && (
          <span
            className="leading-tight whitespace-nowrap mt-0.5"
            style={{
              fontSize: `${pricePx}px`,
              fontWeight: Math.min(900, state.fontWeight + 100),
              color: state.textColor,
            }}
          >
            {pageData.displayPrice}
          </span>
        )}
      </div>
    </>
  );

  const renderSheet = (pageData, pageIndex = 0) => (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      key={pageIndex}
      className="sheet-wrapper-container shrink-0 shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-md relative transition-transform duration-700 ease-out bg-[#FFFBFE]"
      style={pageIndex > 0 ? { pageBreakBefore: "always" } : undefined}
    >
      <div
        className="a4-sheet relative overflow-hidden"
        style={{
          width: paperConfig.width,
          height: paperConfig.height,
          backgroundColor: state.bgColor,
        }}
      >
        <div
          className={`absolute inset-0 ${hasCustomDims ? "" : "grid"}`}
          style={gridStyle}
        >
          {cells.map(({ r, c, selected }) => (
            <div
              key={`${r}-${c}`}
              className={`sticker-cell ${state.showPerf ? "perf" : ""} ${!selected ? "excluded" : ""}`}
              style={{
                flexDirection: cellFlexDirection,
                alignItems: cellAlignItems,
                justifyContent: cellJustifyContent,
                textAlign: state.textAlign,
                gap: isHorizontalLogo ? "4px" : "1px",
                backgroundColor: state.bgColor,
                ...(hasCustomDims
                  ? {
                      width: `${state.stickerWidthMm * (paperConfig.width / paperConfig.mmWidth)}px`,
                      height: `${state.stickerHeightMm * (paperConfig.height / paperConfig.mmHeight)}px`,
                    }
                  : {}),
              }}
            >
              {renderStickerContent(pageData)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex h-screen bg-[#FDFBFF] overflow-hidden text-[#1C1B1F]">
      {/* ─── LEFT: FLOATING CONTROL PALETTE ─── */}
      <aside className="w-105 min-w-105 m-6 p-2 flex flex-col gap-6 z-10 overflow-y-auto hidden-scrollbar no-print">
        {/* Header */}
        <div className="px-4 py-2">
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-[#6750A4] to-[#B3261E] drop-shadow-sm">
            Simple Sticker Pro
          </h1>
          <p className="text-xs font-bold text-[#6750A4] uppercase tracking-widest mt-1 opacity-80">
            Expressive Label Design
          </p>
        </div>

        {/* Action: Print */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.print()}
          className="mx-2 w-[calc(100%-16px)] py-4 px-8 rounded-full bg-[#6750A4] text-white font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-[#6750A4]/20 hover:shadow-2xl hover:shadow-[#6750A4]/40 transition-all border-none cursor-pointer group"
        >
          <Printer
            size={22}
            className="group-hover:rotate-12 transition-transform"
            strokeWidth={2.5}
          />
          Print Sticker Sheet
        </motion.button>

        {/* Sections */}
        <SurfaceCard
          icon={TypeIcon}
          title="Label Data"
          isOpen={activeSection === "Label Data"}
          onToggle={() =>
            setActiveSection(
              activeSection === "Label Data" ? null : "Label Data",
            )
          }
        >
          <FloatingInput
            label="Line 1 Text"
            id="line1"
            value={state.line1}
            onChange={(v) => update({ line1: v })}
            placeholder="Item Name"
          />
          <FloatingInput
            label="Line 2 Text"
            id="line2"
            value={state.line2}
            onChange={(v) => update({ line2: v })}
            placeholder="Code/ID"
          />
          <FloatingInput
            label="Price Amount (Rs.)"
            id="price"
            value={state.priceAmount}
            onChange={(v) => update({ priceAmount: v })}
            placeholder="1450"
          />
        </SurfaceCard>

        <SurfaceCard
          icon={Grid3X3}
          title="Layout & Grid"
          isOpen={activeSection === "Layout & Grid"}
          onToggle={() =>
            setActiveSection(
              activeSection === "Layout & Grid" ? null : "Layout & Grid",
            )
          }
        >
          <ExpressiveSelect
            label="Paper Size"
            id="paper"
            value={state.paperSize}
            onChange={(val) => {
              const config = PAPER_SIZES[val];
              if (config?.defaultRows)
                update({
                  paperSize: val,
                  rows: config.defaultRows,
                  cols: config.defaultCols,
                  selection: null,
                });
              else update({ paperSize: val, selection: null });
            }}
            options={Object.values(PAPER_SIZES).map((p) => ({
              value: p.id,
              label: p.name,
            }))}
          />
          <div className="flex gap-4">
            <ExpressiveStepper
              label="Rows"
              id="rows"
              value={state.rows}
              min={1}
              max={30}
              onChange={(v) => update({ rows: v, selection: null })}
            />
            <ExpressiveStepper
              label="Cols"
              id="cols"
              value={state.cols}
              min={1}
              max={20}
              onChange={(v) => update({ cols: v, selection: null })}
            />
          </div>

          <ExpressiveToggle
            checked={state.useCustomDimensions}
            onChange={() =>
              update({ useCustomDimensions: !state.useCustomDimensions })
            }
            label="Use Custom Sticker Dimensions"
          />

          <AnimatePresence>
            {state.useCustomDimensions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-4 pt-1 pb-1">
                  <FloatingInput
                    label="Width (mm)"
                    id="sw"
                    type="number"
                    value={state.stickerWidthMm || ""}
                    onChange={(v) =>
                      update({ stickerWidthMm: parseFloat(v) || null })
                    }
                    placeholder="e.g. 50"
                  />
                  <FloatingInput
                    label="Height (mm)"
                    id="sh"
                    type="number"
                    value={state.stickerHeightMm || ""}
                    onChange={(v) =>
                      update({ stickerHeightMm: parseFloat(v) || null })
                    }
                    placeholder="e.g. 30"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ExpressiveToggle
            checked={state.showPerf}
            onChange={() => update({ showPerf: !state.showPerf })}
            label="Show Cut Lines (Perforation)"
          />
          <GridSelection
            rows={state.rows}
            cols={state.cols}
            selection={state.selection}
            onChange={(sel) => update({ selection: sel })}
          />
        </SurfaceCard>

        <SurfaceCard
          icon={Palette}
          title="Typography & Style"
          isOpen={activeSection === "Typography & Style"}
          onToggle={() =>
            setActiveSection(
              activeSection === "Typography & Style"
                ? null
                : "Typography & Style",
            )
          }
        >
          <div className="flex gap-4">
            <ExpressiveStepper
              label="Font Size"
              id="fs"
              value={state.fontSize}
              min={6}
              max={72}
              onChange={(v) => update({ fontSize: v })}
            />
            <ExpressiveSelect
              label="Weight"
              id="fw"
              value={state.fontWeight}
              onChange={(v) => update({ fontWeight: +v })}
              options={[
                { value: 300, label: "Light" },
                { value: 400, label: "Regular" },
                { value: 500, label: "Medium" },
                { value: 700, label: "Bold" },
              ]}
            />
          </div>
          <div className="pt-2">
            <ExpressiveSelect
              label="Font Family"
              id="ff"
              value={state.fontFamily}
              onChange={(v) => update({ fontFamily: v })}
              options={[
                { value: "Inter", label: "Inter" },
                { value: "Roboto", label: "Roboto" },
                { value: "Outfit", label: "Outfit" },
                { value: "Montserrat", label: "Montserrat" },
                { value: "Open Sans", label: "Open Sans" },
                { value: "Courier New", label: "Courier New" },
                { value: "Times New Roman", label: "Times New Roman" },
              ]}
            />
          </div>
          <div className="pt-2">
            <label className="text-[10px] font-bold tracking-widest text-[#49454F] uppercase pl-2 mb-2 block">
              Text Alignment
            </label>
            <div className="flex gap-2 bg-[#F4EFF4] p-1.5 rounded-[20px]">
              {[
                { v: "left", i: AlignLeft },
                { v: "center", i: AlignCenter },
                { v: "right", i: AlignRight },
              ].map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => update({ textAlign: opt.v })}
                  className={cn(
                    "flex-1 h-10 flex items-center justify-center rounded-[14px] transition-all duration-300 border-none cursor-pointer",
                    state.textAlign === opt.v
                      ? "bg-white text-[#6750A4] shadow-[0_2px_8px_rgba(103,80,164,0.15)]"
                      : "bg-transparent text-[#49454F] hover:bg-[#EADDFF]/50",
                  )}
                >
                  <opt.i size={18} strokeWidth={2.5} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <div className="flex-1 flex flex-col gap-2 bg-[#F4EFF4] p-3 rounded-2xl">
              <label className="text-[10px] font-bold tracking-widest text-[#49454F] uppercase">
                Text Color
              </label>
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-transparent focus-within:border-[#6750A4] focus-within:ring-2 focus-within:ring-[#6750A4]/20 transition-all">
                <div className="w-8 h-8 shrink-0 rounded-lg overflow-hidden border border-[#CAC4D0] flex items-center justify-center relative shadow-sm">
                  <input
                    type="color"
                    value={state.textColor}
                    onChange={(e) => update({ textColor: e.target.value })}
                    className="absolute w-12 h-12 cursor-pointer border-none p-0 bg-transparent outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={state.textColor}
                  onChange={(e) => update({ textColor: e.target.value })}
                  className="flex-1 w-full min-w-0 bg-transparent border-none outline-none text-xs font-bold text-[#1C1B1F] uppercase font-mono"
                  maxLength={7}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 bg-[#F4EFF4] p-3 rounded-2xl">
              <label className="text-[10px] font-bold tracking-widest text-[#49454F] uppercase">
                Background
              </label>
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-transparent focus-within:border-[#6750A4] focus-within:ring-2 focus-within:ring-[#6750A4]/20 transition-all">
                <div className="w-8 h-8 shrink-0 rounded-lg overflow-hidden border border-[#CAC4D0] flex items-center justify-center relative shadow-sm">
                  <input
                    type="color"
                    value={state.bgColor}
                    onChange={(e) => update({ bgColor: e.target.value })}
                    className="absolute w-12 h-12 cursor-pointer border-none p-0 bg-transparent outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={state.bgColor}
                  onChange={(e) => update({ bgColor: e.target.value })}
                  className="flex-1 w-full min-w-0 bg-transparent border-none outline-none text-xs font-bold text-[#1C1B1F] uppercase font-mono"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="text-[10px] font-bold tracking-widest text-[#49454F] uppercase pl-2 mb-2 block">
              Color Presets
            </label>
            <div className="flex gap-2 flex-wrap bg-[#F4EFF4] p-2 rounded-[20px]">
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
                  onClick={() =>
                    update({ textColor: preset.text, bgColor: preset.bg })
                  }
                  title={preset.name}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 cursor-pointer transition-all duration-300 hover:scale-110 flex items-center justify-center",
                    state.textColor === preset.text &&
                      state.bgColor === preset.bg
                      ? "border-[#6750A4] shadow-[0_2px_8px_rgba(103,80,164,0.3)] scale-110"
                      : "border-black/5 shadow-sm",
                  )}
                  style={{ background: preset.bg }}
                >
                  <span
                    className="text-[11px] font-black leading-none mt-0.5"
                    style={{ color: preset.text }}
                  >
                    A
                  </span>
                </button>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard
          icon={ImageIcon}
          title="Logo / Icon"
          isOpen={activeSection === "Logo / Icon"}
          onToggle={() =>
            setActiveSection(
              activeSection === "Logo / Icon" ? null : "Logo / Icon",
            )
          }
        >
          {!state.logoUrl ? (
            <label className="w-full h-32 border-2 border-dashed border-[#CAC4D0] rounded-[20px] flex flex-col items-center justify-center cursor-pointer hover:bg-[#F4EFF4] hover:border-[#6750A4] transition-all group">
              <div className="w-12 h-12 bg-[#EADDFF] rounded-full flex items-center justify-center text-[#21005D] group-hover:scale-110 transition-transform mb-2">
                <FileImage size={24} strokeWidth={2} />
              </div>
              <span className="text-xs font-bold text-[#49454F]">
                Upload Image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative bg-[#F4EFF4] rounded-[20px] p-4 flex justify-center group/preview">
                <img
                  src={state.logoUrl}
                  className="max-h-20 object-contain drop-shadow-lg"
                  alt=""
                />
                <button
                  onClick={() => update({ logoUrl: "" })}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#B3261E] text-white flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity border-none cursor-pointer hover:scale-110"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <ExpressiveStepper
                label="Logo Size"
                id="ls"
                value={state.logoSize}
                min={8}
                max={80}
                onChange={(v) => update({ logoSize: v })}
              />
              <div>
                <label className="text-[10px] font-bold tracking-widest text-[#49454F] uppercase pl-2 mb-2 block">
                  Logo Position
                </label>
                <div className="flex gap-2 bg-[#F4EFF4] p-1.5 rounded-[20px]">
                  {["top", "bottom", "left", "right"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => update({ logoPosition: opt })}
                      className={cn(
                        "flex-1 h-8 text-[11px] font-bold uppercase rounded-[14px] transition-all duration-300 border-none cursor-pointer",
                        state.logoPosition === opt
                          ? "bg-white text-[#6750A4] shadow-sm"
                          : "bg-transparent text-[#49454F] hover:bg-[#EADDFF]/50",
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SurfaceCard>

        <SurfaceCard
          icon={LayoutTemplate}
          title="Multi-Page Data"
          isOpen={activeSection === "Multi-Page Data"}
          onToggle={() =>
            setActiveSection(
              activeSection === "Multi-Page Data" ? null : "Multi-Page Data",
            )
          }
        >
          <ExpressiveToggle
            checked={state.multiPageEnabled}
            onChange={() =>
              update({ multiPageEnabled: !state.multiPageEnabled })
            }
            label="Enable Multi-Page"
          />
          {state.multiPageEnabled && (
            <div className="mt-4 space-y-3">
              <div className="space-y-2 max-h-48 overflow-y-auto hidden-scrollbar">
                <AnimatePresence>
                  {state.pages.map((p, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={p.id}
                      onClick={() => selectPage(i)}
                      className={cn(
                        "p-3 rounded-2xl cursor-pointer flex items-center gap-3 transition-all group border-2",
                        i === state.activePageIndex
                          ? "bg-[#EADDFF] border-[#6750A4] text-[#21005D]"
                          : "bg-[#F4EFF4] border-transparent hover:border-[#CAC4D0] text-[#49454F]",
                      )}
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black",
                          i === state.activePageIndex
                            ? "bg-[#6750A4] text-white"
                            : "bg-[#CAC4D0] text-white",
                        )}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">
                          {p.line1 || "Empty"} {p.line2 ? `- ${p.line2}` : ""}
                        </div>
                      </div>
                      {state.pages.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removePage(i);
                          }}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border-none text-[#B3261E] opacity-0 group-hover:opacity-100 hover:bg-[#B3261E]/10 cursor-pointer transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <button
                onClick={addPage}
                className="w-full h-12 rounded-2xl border-2 border-dashed border-[#6750A4]/40 text-[#6750A4] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#6750A4]/5 transition-colors cursor-pointer bg-transparent"
              >
                <Plus size={16} strokeWidth={3} /> Add Sheet
              </button>
            </div>
          )}
        </SurfaceCard>
      </aside>

      {/* ─── RIGHT: CANVAS ENVIRONMENT ─── */}
      <main className="flex-1 overflow-auto bg-[#F4F2F6] rounded-l-[40px] m-6 ml-0 shadow-inner relative">
        <AnimatePresence>
          {isInstallable && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 right-8 z-50 print:hidden"
            >
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#6750A4] text-white rounded-full font-bold text-[13px] tracking-wide shadow-[0_4px_12px_rgba(103,80,164,0.3)] hover:shadow-[0_6px_16px_rgba(103,80,164,0.4)] hover:bg-[#5a468f] hover:scale-105 transition-all cursor-pointer border-none outline-none"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Install App
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="min-h-full flex flex-col items-center justify-center p-12">
          <style>{`
            @media print {
              @page { size: ${paperConfig.pageSize}; margin: 0mm; }
              .a4-sheet { width: ${paperConfig.mmWidth}mm !important; height: ${paperConfig.mmHeight}mm !important; max-width: ${paperConfig.mmWidth}mm !important; max-height: ${paperConfig.mmHeight}mm !important; }
            }
          `}</style>

          {/* Floating Toolbar */}
          {state.multiPageEnabled && state.pages.length > 1 && (
            <div className="sticky top-0 z-20 mb-8 flex items-center gap-4 bg-white/80 backdrop-blur-3xl px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white no-print">
              <div className="text-xs font-bold text-[#49454F] uppercase tracking-widest">
                Sheet {state.activePageIndex + 1} of {state.pages.length}
              </div>
            </div>
          )}

          <div className="relative">
            {renderSheet(activePage, 0)}

            {/* Print only blocks */}
            {state.multiPageEnabled && printPages.length > 1 && (
              <div className="hidden print:block">
                {printPages.map((pageData, i) =>
                  i === 0 ? null : renderSheet(pageData, i),
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

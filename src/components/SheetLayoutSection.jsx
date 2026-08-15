import { useRef, useEffect, useCallback, useState } from "react";
import SectionHeading from "./SectionHeading";
import StepperInput from "./StepperInput";
import { PAPER_SIZES } from "../constants/paperSizes";

export default function SheetLayoutSection({ state, update }) {
  return (
    <section
      className="animate-fade-in"
      style={{ animationDelay: "0.05s" }}
    >
      <SectionHeading
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="2" />
          </svg>
        }
        title="Sheet Layout"
      />

      {/* Paper Size */}
      <div className="mb-3.5">
        <label
          htmlFor="paper-size"
          className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5"
        >
          Paper Size
        </label>
        <select
          id="paper-size"
          value={state.paperSize}
          onChange={(e) => {
            const val = e.target.value;
            const config = PAPER_SIZES[val];
            if (config && config.defaultRows && config.defaultCols) {
              update({
                paperSize: val,
                rows: config.defaultRows,
                cols: config.defaultCols,
                selection: null,
              });
            } else {
              update({ paperSize: val, selection: null });
            }
          }}
          className="select-styled w-full h-9 px-3.5 pr-9 text-sm font-semibold text-slate-200
            bg-slate-950/50 border border-slate-700/60 rounded-xl outline-none cursor-pointer
            focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20
            transition-all duration-300"
        >
          {Object.values(PAPER_SIZES).map((ps) => (
            <option key={ps.id} value={ps.id}>
              {ps.name}
            </option>
          ))}
        </select>
      </div>

      {/* Rows & Columns */}
      <div className="flex gap-3 mb-3.5">
        <StepperInput
          label="Rows"
          id="rows-input"
          value={state.rows}
          min={1}
          max={30}
          onChange={(v) => update({ rows: v, selection: null })}
        />
        <StepperInput
          label="Columns"
          id="cols-input"
          value={state.cols}
          min={1}
          max={20}
          onChange={(v) => update({ cols: v, selection: null })}
        />
      </div>

      {/* Grid Picker */}
      <GridPicker
        rows={state.rows}
        cols={state.cols}
        selection={state.selection}
        onSelect={(sel) => update({ selection: sel })}
      />

      {/* Margins */}
      <div className="mb-3.5">
        <label
          htmlFor="margin-slider"
          className="flex items-center justify-between text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5"
        >
          Margins
          <span className="font-bold text-indigo-400 text-[11px] normal-case tracking-normal">
            {state.margin}px
          </span>
        </label>
        <input
          type="range"
          id="margin-slider"
          min={0}
          max={30}
          value={state.margin}
          onChange={(e) => update({ margin: +e.target.value })}
          className="w-full"
        />
      </div>

      {/* Gap */}
      <div className="mb-3.5">
        <label
          htmlFor="gap-slider"
          className="flex items-center justify-between text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5"
        >
          Gap
          <span className="font-bold text-indigo-400 text-[11px] normal-case tracking-normal">
            {state.gap}px
          </span>
        </label>
        <input
          type="range"
          id="gap-slider"
          min={0}
          max={20}
          value={state.gap}
          onChange={(e) => update({ gap: +e.target.value })}
          className="w-full"
        />
      </div>

      {/* Perforation Toggle */}
      <div className="flex items-center justify-between gap-3">
        <label
          className="text-[11px] font-medium text-slate-400 flex-1 cursor-pointer"
          onClick={() => update({ showPerf: !state.showPerf })}
        >
          Show Cut Lines
        </label>
        <div
          className={`toggle-track ${state.showPerf ? "active" : ""}`}
          onClick={() => update({ showPerf: !state.showPerf })}
          role="switch"
          aria-checked={state.showPerf}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter")
              update({ showPerf: !state.showPerf });
          }}
        >
          <div className="toggle-knob" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Grid Picker (Canvas) — Dark theme
   ═══════════════════════════════════════════ */
function GridPicker({ rows, cols, selection, onSelect }) {
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const getCell = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const pad = 4;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cellW = (rect.width - pad * 2) / cols;
      const cellH = (rect.height - pad * 2) / rows;
      return {
        row: Math.max(0, Math.min(rows - 1, Math.floor((y - pad) / cellH))),
        col: Math.max(0, Math.min(cols - 1, Math.floor((x - pad) / cellW))),
      };
    },
    [rows, cols],
  );

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width,
      h = rect.height,
      pad = 4;
    const cellW = (w - pad * 2) / cols;
    const cellH = (h - pad * 2) / rows;

    ctx.clearRect(0, 0, w, h);

    // Determine selection bounds
    const sel =
      dragging && dragStart && dragEnd
        ? {
            r1: Math.min(dragStart.row, dragEnd.row),
            r2: Math.max(dragStart.row, dragEnd.row),
            c1: Math.min(dragStart.col, dragEnd.col),
            c2: Math.max(dragStart.col, dragEnd.col),
          }
        : selection
          ? {
              r1: Math.min(selection.r1, selection.r2),
              r2: Math.max(selection.r1, selection.r2),
              c1: Math.min(selection.c1, selection.c2),
              c2: Math.max(selection.c1, selection.c2),
            }
          : null;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = pad + c * cellW;
        const y = pad + r * cellH;
        const isSelected =
          !sel || (r >= sel.r1 && r <= sel.r2 && c >= sel.c1 && c <= sel.c2);

        ctx.fillStyle = isSelected ? "#6366f1" : "rgba(51, 65, 85, 0.4)";
        ctx.strokeStyle = "rgba(15, 23, 42, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, cellW - 2, cellH - 2, 2);
        ctx.fill();
        ctx.stroke();
      }
    }
  }, [rows, cols, selection, dragging, dragStart, dragEnd]);

  const handleMouseDown = (e) => {
    const cell = getCell(e);
    if (!cell) return;
    setDragging(true);
    setDragStart(cell);
    setDragEnd(cell);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const cell = getCell(e);
    if (cell) setDragEnd(cell);
  };

  const handleMouseUp = () => {
    if (dragging && dragStart && dragEnd) {
      onSelect({
        r1: Math.min(dragStart.row, dragEnd.row),
        r2: Math.max(dragStart.row, dragEnd.row),
        c1: Math.min(dragStart.col, dragEnd.col),
        c2: Math.max(dragStart.col, dragEnd.col),
      });
    }
    setDragging(false);
  };

  const handleDblClick = () => {
    onSelect(null);
  };

  // Info text
  const selInfo = selection
    ? `Selected: ${selection.r2 - selection.r1 + 1} × ${selection.c2 - selection.c1 + 1} (${(selection.r2 - selection.r1 + 1) * (selection.c2 - selection.c1 + 1)} labels)`
    : `Selected: All (${rows} × ${cols})`;

  return (
    <div className="mb-3.5">
      <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1.5">
        Grid Picker{" "}
        <span className="normal-case tracking-normal text-slate-600">
          — click to select area
        </span>
      </label>
      <div
        className="bg-slate-950/50 border border-slate-700/60 rounded-xl p-2 cursor-crosshair"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          className="w-full block"
          style={{ height: 130 }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onDoubleClick={handleDblClick}
        />
      </div>
      <span className="block mt-1.5 text-[10px] text-slate-500 font-medium">
        {selInfo}
      </span>
    </div>
  );
}

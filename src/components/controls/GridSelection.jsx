import React, { useState, useEffect } from "react";
import { cn } from "../../utils/classNames";

export function GridSelection({ rows, cols, selection, onChange }) {
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
                    : "bg-[#CAC4D0] hover:bg-[#6750A4]/40"
                )}
                onPointerDown={(e) => {
                  e.target.releasePointerCapture(e.pointerId);
                  handlePointerDown(r, c);
                }}
                onPointerEnter={() => handlePointerEnter(r, c)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

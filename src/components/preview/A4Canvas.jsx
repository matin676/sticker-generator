import React from "react";
import { StickerCell } from "./StickerCell";

export function A4Canvas({
  pageData,
  cells,
  gridStyle,
  paperConfig,
  state,
  scaleRatio,
  basePx,
  pricePx,
  cellFlexDirection,
  alignMap,
  cellAlignItems,
  cellJustifyContent,
  hasCustomDims,
}) {
  return (
    <div
      className="a4-sheet bg-white mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)]"
      style={{
        width: `${paperConfig.width}px`,
        height: `${paperConfig.height}px`,
        borderRadius: "16px",
      }}
    >
      <div className="w-full h-full" style={gridStyle}>
        {cells.map((cell) => (
          <StickerCell
            key={`${cell.r}-${cell.c}`}
            selected={cell.selected}
            showPerf={state.showPerf}
            cellFlexDirection={cellFlexDirection}
            cellAlignItems={cellAlignItems}
            cellJustifyContent={cellJustifyContent}
            bgColor={state.bgColor}
            gap={`${state.fontSize * 0.4}px`}
            hasCustomDims={hasCustomDims}
            width={`${state.stickerWidthMm}mm`}
            height={`${state.stickerHeightMm}mm`}
            padding={hasCustomDims ? "4px" : "2px"}
            logoUrl={state.logoUrl}
            logoSize={state.logoSize * scaleRatio}
            textAlign={alignMap[state.textAlign] || "center"}
            basePx={basePx}
            fontWeight={state.fontWeight}
            textColor={state.textColor}
            pricePx={pricePx}
            line1={pageData.line1}
            line2={pageData.line2}
            displayPrice={pageData.displayPrice}
          />
        ))}
      </div>
    </div>
  );
}

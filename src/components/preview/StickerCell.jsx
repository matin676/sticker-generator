import React, { memo } from "react";
import { cn } from "../../utils/classNames";

function StickerCellComponent({
  selected,
  showPerf,
  cellFlexDirection,
  cellAlignItems,
  cellJustifyContent,
  bgColor,
  gap,
  hasCustomDims,
  width,
  height,
  padding,
  logoUrl,
  logoSize,
  textAlign,
  basePx,
  fontWeight,
  textColor,
  pricePx,
  line1,
  line2,
  displayPrice,
}) {
  if (!selected) {
    return (
      <div 
        className={cn("sticker-cell excluded", hasCustomDims && "custom-dim-cell")}
      />
    );
  }

  return (
    <div
      className={cn("sticker-cell relative", showPerf && "perf", hasCustomDims && "custom-dim-cell")}
      style={{
        flexDirection: cellFlexDirection,
        alignItems: cellAlignItems,
        justifyContent: cellJustifyContent,
        backgroundColor: bgColor,
        gap,
        padding,
      }}
    >
      {logoUrl && (
        <img
          src={logoUrl}
          alt=""
          className="shrink-0 object-contain"
          style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
        />
      )}
      <div
        className="flex flex-col justify-center min-w-0 flex-1"
        style={{ alignItems: textAlign }}
      >
        <span
          className="print-line1 leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
          style={{ fontSize: `${basePx}px`, fontWeight, color: textColor }}
        >
          {line1}
        </span>
        <span
          className="print-line2 leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
          style={{ fontSize: `${basePx * 0.8}px`, fontWeight, color: textColor }}
        >
          {line2}
        </span>
        {displayPrice && (
          <span
            className="print-price leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full mt-1"
            style={{ fontSize: `${pricePx}px`, fontWeight: 800, color: textColor }}
          >
            {displayPrice}
          </span>
        )}
      </div>
    </div>
  );
}

// React.memo prevents re-rendering all stickers when unnecessary layout states change.
export const StickerCell = memo(StickerCellComponent);

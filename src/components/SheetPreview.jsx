import { useMemo } from "react";
import { PAPER_SIZES } from "../constants/paperSizes";

export default function SheetPreview({ state, update }) {
  const {
    line1,
    line2,
    priceText,
    priceAmount,
    paperSize,
    rows,
    cols,
    margin,
    gap,
    showPerf,
    fontSize,
    fontFamily,
    fontWeight,
    selection,
    textAlign,
    textColor,
    bgColor,
    logoUrl,
    logoSize,
    logoPosition,
    useCustomDimensions,
    stickerWidthMm,
    stickerHeightMm,
    pages,
    activePageIndex,
    multiPageEnabled,
  } = state;

  const paperConfig = PAPER_SIZES[paperSize] || PAPER_SIZES["a4"];

  // Base font scales with paper size relative to A4 (595px)
  const scaleRatio = paperConfig.width / 595;
  const basePx = fontSize * 0.42 * scaleRatio;
  const pricePx = basePx * 1.05;

  // Currency string
  const currencySymbol = priceText ? priceText.trim() : "Rs.";
  const displayPrice = priceAmount ? `${currencySymbol} ${priceAmount}` : "";

  // Custom dimensions - convert mm to CSS for print
  const hasCustomDims =
    useCustomDimensions && stickerWidthMm && stickerHeightMm;

  // Build sticker cells
  const cells = useMemo(() => {
    const arr = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const selected =
          !selection ||
          (r >= selection.r1 &&
            r <= selection.r2 &&
            c >= selection.c1 &&
            c <= selection.c2);
        arr.push({ r, c, selected });
      }
    }
    return arr;
  }, [rows, cols, selection]);

  // For multi-page: build pages data for print
  const printPages = useMemo(() => {
    if (!multiPageEnabled || pages.length <= 1) {
      return [{ line1, line2, priceAmount, displayPrice }];
    }
    return pages.map((p) => ({
      line1: p.line1,
      line2: p.line2,
      priceAmount: p.priceAmount,
      displayPrice: p.priceAmount ? `${currencySymbol} ${p.priceAmount}` : "",
    }));
  }, [
    multiPageEnabled,
    pages,
    line1,
    line2,
    priceAmount,
    displayPrice,
    currencySymbol,
  ]);

  // Active page for screen preview
  const activePage = multiPageEnabled
    ? printPages[activePageIndex] || printPages[0]
    : printPages[0];

  // Compute flex styles for sticker cell based on logo position + text alignment
  const isHorizontalLogo =
    logoUrl && (logoPosition === "left" || logoPosition === "right");

  const cellFlexDirection = !logoUrl
    ? "column"
    : logoPosition === "left"
      ? "row"
      : logoPosition === "right"
        ? "row-reverse"
        : logoPosition === "bottom"
          ? "column-reverse"
          : "column"; // top (default)

  // For column layout: alignItems = horizontal alignment, justifyContent = vertical
  // For row layout: alignItems = vertical alignment, justifyContent = horizontal
  const alignMap = { left: "flex-start", center: "center", right: "flex-end" };
  const cellAlignItems = isHorizontalLogo
    ? "center"
    : alignMap[textAlign] || "center";
  const cellJustifyContent = isHorizontalLogo
    ? alignMap[textAlign] || "center"
    : "center";

  // Grid style for custom dimensions
  const gridStyle = hasCustomDims
    ? {
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        padding: `${margin}px`,
        gap: `${gap}px`,
        fontFamily: `'${fontFamily}', system-ui, sans-serif`,
      }
    : {
        display: "grid",
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        padding: `${margin}px`,
        gap: `${gap}px`,
        fontFamily: `'${fontFamily}', system-ui, sans-serif`,
      };

  // Render a single sticker cell content
  const renderStickerContent = (pageData) => (
    <>
      {logoUrl && (
        <img
          src={logoUrl}
          alt=""
          className="shrink-0 object-contain"
          style={{
            width: `${logoSize * scaleRatio}px`,
            height: `${logoSize * scaleRatio}px`,
          }}
        />
      )}
      <div
        className="flex flex-col justify-center min-w-0 flex-1"
        style={{ alignItems: alignMap[textAlign] || "center" }}
      >
        <span
          className="leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
          style={{ fontSize: `${basePx}px`, fontWeight, color: textColor }}
        >
          {pageData.line1}
        </span>
        <span
          className="leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
          style={{ fontSize: `${basePx}px`, fontWeight, color: textColor }}
        >
          {pageData.line2}
        </span>
        {pageData.displayPrice && (
          <span
            className="leading-tight whitespace-nowrap mt-0.5"
            style={{
              fontSize: `${pricePx}px`,
              fontWeight: Math.min(900, fontWeight + 100),
              color: textColor,
            }}
          >
            {pageData.displayPrice}
          </span>
        )}
      </div>
    </>
  );

  // Render a single sheet
  const renderSheet = (pageData, pageIndex = 0) => (
    <div
      key={pageIndex}
      className="sheet-wrapper-container shrink-0 shadow-[0_20px_50px_rgba(8,112,184,0.07)] border border-slate-200 rounded-sm relative transition-all duration-500 ease-out"
      style={pageIndex > 0 ? { pageBreakBefore: "always" } : undefined}
    >
      {/* Page curl effect (hidden in print) */}
      <div
        className="no-print absolute bottom-0 right-0 w-8 h-8 rounded-br-sm pointer-events-none"
        style={{
          background:
            "linear-gradient(315deg, rgba(0,0,0,0.03) 0%, transparent 45%)",
        }}
      />

      <div
        className="a4-sheet relative overflow-hidden"
        style={{
          width: paperConfig.width,
          height: paperConfig.height,
          backgroundColor: bgColor,
        }}
      >
        <div
          className={`absolute inset-0 ${hasCustomDims ? "" : "grid"}`}
          style={gridStyle}
        >
          {cells.map(({ r, c, selected }) => (
            <div
              key={`${r}-${c}`}
              className={`sticker-cell ${showPerf ? "perf" : ""} ${!selected ? "excluded" : ""}`}
              style={{
                flexDirection: cellFlexDirection,
                alignItems: cellAlignItems,
                justifyContent: cellJustifyContent,
                textAlign,
                gap: isHorizontalLogo ? "4px" : "1px",
                backgroundColor: bgColor,
                ...(hasCustomDims
                  ? {
                      width: `${stickerWidthMm * (paperConfig.width / paperConfig.mmWidth)}px`,
                      height: `${stickerHeightMm * (paperConfig.height / paperConfig.mmHeight)}px`,
                    }
                  : {}),
              }}
            >
              {renderStickerContent(pageData)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Page navigation for multi-page
  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      const updatedPages = [...pages];
      updatedPages[activePageIndex] = {
        ...updatedPages[activePageIndex],
        line1,
        line2,
        priceAmount,
      };
      const prev = updatedPages[activePageIndex - 1];
      update({
        pages: updatedPages,
        activePageIndex: activePageIndex - 1,
        line1: prev.line1,
        line2: prev.line2,
        priceAmount: prev.priceAmount,
      });
    }
  };

  const handleNextPage = () => {
    if (activePageIndex < pages.length - 1) {
      const updatedPages = [...pages];
      updatedPages[activePageIndex] = {
        ...updatedPages[activePageIndex],
        line1,
        line2,
        priceAmount,
      };
      const next = updatedPages[activePageIndex + 1];
      update({
        pages: updatedPages,
        activePageIndex: activePageIndex + 1,
        line1: next.line1,
        line2: next.line2,
        priceAmount: next.priceAmount,
      });
    }
  };

  return (
    <main className="flex-1 overflow-auto relative shadow-inner">
      {/* Dynamic print page styling */}
      <style>{`
        @media print {
          @page {
            size: ${paperConfig.pageSize};
            margin: 0mm;
          }
          .a4-sheet {
            width: ${paperConfig.mmWidth}mm !important;
            height: ${paperConfig.mmHeight}mm !important;
            max-width: ${paperConfig.mmWidth}mm !important;
            max-height: ${paperConfig.mmHeight}mm !important;
          }
          .sheet-wrapper-container + .sheet-wrapper-container {
            page-break-before: always !important;
          }
        }
      `}</style>

      <div className="min-h-full flex flex-col items-center gap-6 p-8 bg-linear-to-br from-slate-100 via-slate-200 to-slate-300">
        {/* Print Action Bar (Floating at top) */}
        <div className="sticky top-0 z-20 flex items-center gap-4 no-print mb-2 bg-white/60 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-sm border border-white/50">
          <div className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white rounded-lg shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse-dot" />
            Canvas Ready
            {multiPageEnabled && pages.length > 1 && (
              <span className="text-slate-400 font-medium ml-1">
                ({pages.length} pages)
              </span>
            )}
          </div>

          {/* Page Navigation (multi-page) */}
          {multiPageEnabled && pages.length > 1 && (
            <div className="flex items-center gap-2 border-l border-slate-300 pl-4">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={activePageIndex === 0}
                className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center
                  hover:bg-slate-50 hover:shadow transition-all duration-200 cursor-pointer border border-slate-200
                  disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="text-[11px] font-bold text-slate-600 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                {activePageIndex + 1} / {pages.length}
              </span>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={activePageIndex === pages.length - 1}
                className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center
                  hover:bg-slate-50 hover:shadow transition-all duration-200 cursor-pointer border border-slate-200
                  disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Screen preview: show active page */}
        {renderSheet(activePage, 0)}

        {/* Hidden print-only pages (rendered for multi-page printing) */}
        {multiPageEnabled && printPages.length > 1 && (
          <div className="hidden print:block">
            {printPages.map((pageData, i) =>
              i === 0 ? null : renderSheet(pageData, i),
            )}
          </div>
        )}
      </div>
    </main>
  );
}

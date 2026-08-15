import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { A4Canvas } from "../preview/A4Canvas";

export function MainCanvas({
  state,
  isInstallable,
  handleInstallClick,
  paperConfig,
  scaleRatio,
  basePx,
  pricePx,
  cellFlexDirection,
  alignMap,
  cellAlignItems,
  cellJustifyContent,
  hasCustomDims,
  gridStyle,
  cells,
  pageData,
}) {
  return (
    <main className="flex-1 overflow-auto bg-[#F4F2F6] rounded-l-[40px] m-6 ml-0 shadow-inner relative">
      <AnimatePresence>
        {isInstallable && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 right-8 z-50 no-print"
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

      <div className="min-h-full flex flex-col items-center justify-start p-12 print:p-0 print:block print:min-h-0 print:h-auto">
        <style>{`
          @media print {
            @page { size: ${paperConfig.pageSize}; margin: 0mm; }
            .a4-sheet { width: ${paperConfig.mmWidth}mm !important; height: ${paperConfig.mmHeight}mm !important; max-width: ${paperConfig.mmWidth}mm !important; max-height: ${paperConfig.mmHeight}mm !important; }
          }
        `}</style>

        <div className="relative flex flex-col gap-12 w-full items-center print:gap-0 print:block">
          {state.multiPageEnabled ? (
            state.pages.map((p) => {
              const pData = {
                line1: p.line1,
                line2: p.line2,
                priceAmount: p.priceAmount,
                displayPrice: p.priceAmount ? `${state.priceText?.trim() || "Rs."} ${p.priceAmount}` : "",
              };
              return (
                <A4Canvas
                  key={p.id}
                  pageData={pData}
                  cells={cells}
                  gridStyle={gridStyle}
                  paperConfig={paperConfig}
                  state={state}
                  scaleRatio={scaleRatio}
                  basePx={basePx}
                  pricePx={pricePx}
                  cellFlexDirection={cellFlexDirection}
                  alignMap={alignMap}
                  cellAlignItems={cellAlignItems}
                  cellJustifyContent={cellJustifyContent}
                  hasCustomDims={hasCustomDims}
                />
              );
            })
          ) : (
            <A4Canvas
              pageData={pageData}
              cells={cells}
              gridStyle={gridStyle}
              paperConfig={paperConfig}
              state={state}
              scaleRatio={scaleRatio}
              basePx={basePx}
              pricePx={pricePx}
              cellFlexDirection={cellFlexDirection}
              alignMap={alignMap}
              cellAlignItems={cellAlignItems}
              cellJustifyContent={cellJustifyContent}
              hasCustomDims={hasCustomDims}
            />
          )}
        </div>
      </div>
    </main>
  );
}

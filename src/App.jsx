import React, { useMemo } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { MainCanvas } from "./components/layout/MainCanvas";
import { useStickerState } from "./hooks/useStickerState";
import { usePWAInstall } from "./hooks/usePWAInstall";
import { PAPER_SIZES } from "./constants/paperSizes";

export default function App() {
  const {
    state,
    update,
    activeSection,
    setActiveSection,
    handleLogoUpload,
    removeLogo,
    addPage,
    removePage,
    selectPage,
    updatePageData
  } = useStickerState();

  const { isInstallable, handleInstallClick } = usePWAInstall();

  const handlePrint = () => {
    window.print();
  };

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

  // Compute Cells
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

  const pageData = {
    line1: state.line1,
    line2: state.line2,
    priceAmount: state.priceAmount,
    displayPrice,
  };

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

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FDFBFF] font-sans selection:bg-[#EADDFF] selection:text-[#21005D] print:h-auto print:w-full print:overflow-visible print:block">
      <Sidebar
        state={state}
        update={update}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogoUpload={handleLogoUpload}
        removeLogo={removeLogo}
        handlePrint={handlePrint}
        addPage={addPage}
        removePage={removePage}
        selectPage={selectPage}
        updatePageData={updatePageData}
      />
      
      <MainCanvas
        state={state}
        isInstallable={isInstallable}
        handleInstallClick={handleInstallClick}
        paperConfig={paperConfig}
        scaleRatio={scaleRatio}
        basePx={basePx}
        pricePx={pricePx}
        cellFlexDirection={cellFlexDirection}
        alignMap={alignMap}
        cellAlignItems={cellAlignItems}
        cellJustifyContent={cellJustifyContent}
        hasCustomDims={hasCustomDims}
        gridStyle={gridStyle}
        cells={cells}
        pageData={pageData}
      />
    </div>
  );
}

import React from "react";
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
  FileImage,
  Type as TypeIcon,
  Layers,
} from "lucide-react";
import {
  FloatingInput,
  ExpressiveStepper,
  ExpressiveToggle,
  ExpressiveSelect,
} from "../controls/FormControls";
import { SurfaceCard } from "../controls/SurfaceCard";
import { GridSelection } from "../controls/GridSelection";

export function Sidebar({
  state,
  update,
  activeSection,
  setActiveSection,
  handleLogoUpload,
  removeLogo,
  handlePrint,
  addPage,
  removePage,
  selectPage,
  updatePageData,
}) {
  return (
    <aside className="w-105 h-full bg-[#FDFBFF] flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 shrink-0 relative print:hidden">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#6750A4] text-white flex items-center justify-center shadow-[0_8px_16px_rgba(103,80,164,0.3)] transform -rotate-6 transition-transform hover:rotate-0 cursor-pointer">
            <LayoutTemplate size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#1C1B1F] tracking-tight">
              Sticker<span className="text-[#6750A4]">Pro</span>
            </h1>
            <p className="text-[11px] font-bold tracking-widest text-[#6750A4] uppercase mt-1">
              Material Expressive
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 hidden-scrollbar space-y-6 scroll-smooth">
        {/* Label Data Section */}
        {!state.multiPageEnabled && (
          <SurfaceCard
            icon={TypeIcon}
            title="Label Data"
            isOpen={activeSection === "Label Data"}
            onToggle={() =>
              setActiveSection(activeSection === "Label Data" ? "" : "Label Data")
            }
          >
            <div className="space-y-4">
              <FloatingInput
                label="Line 1 (Item Name)"
                id="line1"
                value={state.line1}
                onChange={(val) => update({ line1: val })}
                placeholder="e.g. ITEM NAME:"
              />
              <FloatingInput
                label="Line 2 (Code/Details)"
                id="line2"
                value={state.line2}
                onChange={(val) => update({ line2: val })}
                placeholder="e.g. STK-9100"
              />
              <div className="flex gap-4">
                <div className="w-1/3">
                  <FloatingInput
                    label="Currency"
                    id="priceText"
                    value={state.priceText}
                    onChange={(val) => update({ priceText: val })}
                    placeholder="Rs."
                  />
                </div>
                <FloatingInput
                  label="Price Amount"
                  id="priceAmount"
                  value={state.priceAmount}
                  onChange={(val) => update({ priceAmount: val })}
                  placeholder="1450/-"
                />
              </div>
            </div>
          </SurfaceCard>
        )}

        {/* Paper & Layout Section */}
        <SurfaceCard
          icon={Grid3X3}
          title="Paper & Layout"
          isOpen={activeSection === "Paper & Layout"}
          onToggle={() =>
            setActiveSection(
              activeSection === "Paper & Layout" ? "" : "Paper & Layout",
            )
          }
        >
          <div className="space-y-4">
            <ExpressiveSelect
              label="Paper Template"
              id="paperSize"
              value={state.paperSize}
              onChange={(val) => update({ paperSize: val })}
              options={[
                { value: "a4", label: "A4 Standard" },
                { value: "a4-avery10", label: "A4 Avery (10x5)" },
                { value: "a3", label: "A3 Standard" },
                { value: "letter", label: "US Letter" },
                { value: "legal", label: "US Legal" },
              ]}
            />

            <div className="p-4 bg-[#F4EFF4] rounded-2xl mb-4">
              <ExpressiveToggle
                label="Use Custom Sticker Dimensions"
                checked={state.useCustomDimensions}
                onChange={() =>
                  update({ useCustomDimensions: !state.useCustomDimensions })
                }
              />
            </div>
            <AnimatePresence>
              {state.useCustomDimensions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="flex gap-4">
                    <FloatingInput
                      label="Width (mm)"
                      id="stickerWidthMm"
                      type="number"
                      value={state.stickerWidthMm || ""}
                      onChange={(val) =>
                        update({ stickerWidthMm: parseFloat(val) || "" })
                      }
                      placeholder="e.g. 38.1"
                    />
                    <FloatingInput
                      label="Height (mm)"
                      id="stickerHeightMm"
                      type="number"
                      value={state.stickerHeightMm || ""}
                      onChange={(val) =>
                        update({ stickerHeightMm: parseFloat(val) || "" })
                      }
                      placeholder="e.g. 21.2"
                    />
                  </div>
                  <div className="flex gap-4">
                    <FloatingInput
                      label="Top Margin (mm)"
                      id="marginTopMm"
                      type="number"
                      value={state.marginTopMm || ""}
                      onChange={(val) =>
                        update({ marginTopMm: parseFloat(val) || 0 })
                      }
                      placeholder="e.g. 15.2"
                    />
                    <FloatingInput
                      label="Left Margin (mm)"
                      id="marginLeftMm"
                      type="number"
                      value={state.marginLeftMm || ""}
                      onChange={(val) =>
                        update({ marginLeftMm: parseFloat(val) || 0 })
                      }
                      placeholder="e.g. 7.2"
                    />
                  </div>
                  <div className="flex gap-4">
                    <FloatingInput
                      label="Horiz. Gap (mm)"
                      id="gapXMm"
                      type="number"
                      value={state.gapXMm || ""}
                      onChange={(val) =>
                        update({ gapXMm: parseFloat(val) || 0 })
                      }
                      placeholder="e.g. 2.5"
                    />
                    <FloatingInput
                      label="Vert. Gap (mm)"
                      id="gapYMm"
                      type="number"
                      value={state.gapYMm || ""}
                      onChange={(val) =>
                        update({ gapYMm: parseFloat(val) || 0 })
                      }
                      placeholder="e.g. 2.5"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              <ExpressiveStepper
                label="Rows"
                id="rows"
                value={state.rows}
                min={1}
                max={50}
                onChange={(val) => update({ rows: val })}
              />
              <ExpressiveStepper
                label="Cols"
                id="cols"
                value={state.cols}
                min={1}
                max={50}
                onChange={(val) => update({ cols: val })}
              />
            </div>
            {!state.useCustomDimensions && (
              <div className="flex gap-4">
                <ExpressiveStepper
                  label="Margin"
                  id="margin"
                  value={state.margin}
                  min={0}
                  max={100}
                  onChange={(val) => update({ margin: val })}
                />
                <ExpressiveStepper
                  label="Gap"
                  id="gap"
                  value={state.gap}
                  min={0}
                  max={50}
                  onChange={(val) => update({ gap: val })}
                />
              </div>
            )}
            <div className="pt-2">
              <ExpressiveToggle
                label="Show Die-cut Borders"
                checked={state.showPerf}
                onChange={() => update({ showPerf: !state.showPerf })}
              />
            </div>

            <GridSelection
              rows={state.rows}
              cols={state.cols}
              selection={state.selection}
              onChange={(sel) => update({ selection: sel })}
            />
          </div>
        </SurfaceCard>

        {/* Typography & Style Section */}
        <SurfaceCard
          icon={Palette}
          title="Typography & Style"
          isOpen={activeSection === "Typography & Style"}
          onToggle={() =>
            setActiveSection(
              activeSection === "Typography & Style"
                ? ""
                : "Typography & Style",
            )
          }
        >
          <div className="space-y-6">
            <div className="flex gap-4">
              <ExpressiveStepper
                label="Font Size"
                id="fontSize"
                value={state.fontSize}
                min={8}
                max={72}
                onChange={(val) => update({ fontSize: val })}
              />
              <ExpressiveSelect
                label="Weight"
                id="fontWeight"
                value={state.fontWeight}
                onChange={(val) => update({ fontWeight: parseInt(val, 10) })}
                options={[
                  { value: 400, label: "Regular" },
                  { value: 500, label: "Medium" },
                  { value: 600, label: "SemiBold" },
                  { value: 700, label: "Bold" },
                  { value: 800, label: "Black" },
                ]}
              />
            </div>

            <ExpressiveSelect
              label="Font Family"
              id="fontFamily"
              value={state.fontFamily}
              onChange={(val) => update({ fontFamily: val })}
              options={[
                { value: "Inter", label: "Inter" },
                { value: "Roboto", label: "Roboto" },
                { value: "Outfit", label: "Outfit" },
                { value: "Montserrat", label: "Montserrat" },
                { value: "Courier New", label: "Monospace" },
                { value: "Georgia", label: "Serif" },
              ]}
            />

            <div>
              <label className="text-[10px] font-bold tracking-widest text-[#6750A4] uppercase block mb-3 pl-2">
                Text Alignment
              </label>
              <div className="flex bg-[#F4EFF4] p-1.5 rounded-[20px]">
                {["left", "center", "right"].map((align) => (
                  <button
                    key={align}
                    type="button"
                    onClick={() => update({ textAlign: align })}
                    className={`flex-1 flex justify-center py-2.5 rounded-2xl transition-all cursor-pointer border-none outline-none ${state.textAlign === align ? "bg-white text-[#6750A4] shadow-sm" : "bg-transparent text-[#49454F] hover:text-[#1C1B1F]"}`}
                  >
                    {align === "left" && <AlignLeft size={18} />}
                    {align === "center" && <AlignCenter size={18} />}
                    {align === "right" && <AlignRight size={18} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-[#F4EFF4] p-3 rounded-2xl">
                <label className="text-[10px] font-bold tracking-widest text-[#6750A4] uppercase block mb-2">
                  Text Color
                </label>
                <div className="bg-white rounded-xl p-2 flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
                    <input
                      type="color"
                      value={state.textColor}
                      onChange={(e) => update({ textColor: e.target.value })}
                      className="absolute w-12 h-12 cursor-pointer border-none p-0"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#1C1B1F] uppercase tracking-wider">
                    {state.textColor}
                  </span>
                </div>
              </div>

              <div className="flex-1 bg-[#F4EFF4] p-3 rounded-2xl">
                <label className="text-[10px] font-bold tracking-widest text-[#6750A4] uppercase block mb-2">
                  Background
                </label>
                <div className="bg-white rounded-xl p-2 flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
                    <input
                      type="color"
                      value={state.bgColor}
                      onChange={(e) => update({ bgColor: e.target.value })}
                      className="absolute w-12 h-12 cursor-pointer border-none p-0"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#1C1B1F] uppercase tracking-wider">
                    {state.bgColor}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-widest text-[#6750A4] uppercase block mb-3 pl-2">
                Color Presets
              </label>
              <div className="bg-[#F4EFF4] p-2.5 rounded-full flex justify-between items-center">
                {[
                  { text: "#1a1d23", bg: "#ffffff", name: "Default" },
                  { text: "#1e3a5f", bg: "#e8f4fd", name: "Blue" },
                  { text: "#5c2d00", bg: "#fff7ed", name: "Warm" },
                  { text: "#14532d", bg: "#f0fdf4", name: "Green" },
                  { text: "#4c1d95", bg: "#f5f3ff", name: "Purple" },
                  { text: "#ffffff", bg: "#1a1d23", name: "Dark" },
                  { text: "#dc2626", bg: "#fef2f2", name: "Red" },
                  { text: "#92400e", bg: "#fffbeb", name: "Gold" },
                ].map((preset) => {
                  const isActive =
                    state.textColor.toLowerCase() ===
                      preset.text.toLowerCase() &&
                    state.bgColor.toLowerCase() === preset.bg.toLowerCase();
                  return (
                    <button
                      key={preset.name}
                      onClick={() =>
                        update({ textColor: preset.text, bgColor: preset.bg })
                      }
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all border border-black/5 cursor-pointer hover:scale-110 ${isActive ? "ring-2 ring-[#6750A4] ring-offset-2 ring-offset-[#F4EFF4]" : ""}`}
                      style={{ backgroundColor: preset.bg, color: preset.text }}
                    >
                      A
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </SurfaceCard>

        {/* Branding Section */}
        <SurfaceCard
          icon={ImageIcon}
          title="Logo / Icon"
          isOpen={activeSection === "Branding"}
          onToggle={() =>
            setActiveSection(activeSection === "Branding" ? "" : "Branding")
          }
        >
          <div className="space-y-5">
            {!state.logoUrl ? (
              <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#CAC4D0] rounded-3xl bg-[#F4EFF4]/50 cursor-pointer hover:bg-[#F4EFF4] transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#6750A4] shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <FileImage size={24} />
                </div>
                <span className="text-[13px] font-bold text-[#49454F]">
                  Upload Logo
                </span>
                <span className="text-[11px] font-semibold text-[#49454F]/60 mt-1">
                  PNG, JPG or SVG
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative p-4 border-2 border-[#EADDFF] rounded-3xl bg-white group flex justify-center">
                  <img
                    src={state.logoUrl}
                    alt="Logo"
                    className="max-h-24 object-contain"
                  />
                  <button
                    onClick={removeLogo}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-[#BA1A1A] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-md border-none cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-[#6750A4] uppercase block pl-2">
                    Logo Size
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={state.logoSize}
                    onChange={(e) =>
                      update({ logoSize: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-[#6750A4] uppercase block mb-3 pl-2">
                    Logo Position
                  </label>
                  <div className="flex bg-[#F4EFF4] p-1.5 rounded-[20px]">
                    {["top", "bottom", "left", "right"].map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => update({ logoPosition: pos })}
                        className={`flex-1 flex justify-center py-2.5 rounded-2xl transition-all cursor-pointer border-none outline-none font-bold text-[11px] tracking-wide uppercase ${
                          state.logoPosition === pos
                            ? "bg-white text-[#6750A4] shadow-sm"
                            : "bg-transparent text-[#49454F] hover:text-[#1C1B1F]"
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </SurfaceCard>

        {/* Multi-Page Data Section */}
        <SurfaceCard
          icon={Layers}
          title="Multi-Page Data"
          isOpen={activeSection === "Multi-Page Data"}
          onToggle={() =>
            setActiveSection(activeSection === "Multi-Page Data" ? "" : "Multi-Page Data")
          }
        >
          <div className="space-y-4">
            <div className="p-4 bg-[#F4EFF4] rounded-2xl">
              <ExpressiveToggle
                label="Enable Multi-Page Printing"
                checked={state.multiPageEnabled}
                onChange={() => update({ multiPageEnabled: !state.multiPageEnabled })}
              />
            </div>
            
            <AnimatePresence>
              {state.multiPageEnabled && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="flex justify-between items-center bg-[#EADDFF] p-2 pl-4 rounded-xl">
                    <span className="text-[11px] font-bold text-[#21005D] uppercase tracking-wider">
                      Pages ({state.pages?.length || 0})
                    </span>
                    <button
                      onClick={addPage}
                      className="px-3 py-1 bg-[#6750A4] text-white rounded-lg text-xs font-bold hover:bg-[#5a468f] transition-colors border-none cursor-pointer"
                    >
                      + Add Page
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-80 overflow-y-auto hidden-scrollbar pr-1">
                    {state.pages?.map((p, index) => (
                      <div 
                        key={p.id}
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          state.activePageIndex === index 
                            ? "border-[#6750A4] bg-white shadow-sm" 
                            : "border-transparent bg-[#F4EFF4] hover:bg-[#EADDFF]/50"
                        }`}
                        onClick={() => selectPage(index)}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-[#1C1B1F]">Page {index + 1}</span>
                          {state.pages.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removePage(index);
                              }}
                              className="text-[#BA1A1A] hover:bg-[#BA1A1A]/10 p-1.5 rounded-full transition-colors border-none bg-transparent cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                        
                        {state.activePageIndex === index && (
                          <div className="space-y-3 cursor-default" onClick={(e) => e.stopPropagation()}>
                            <FloatingInput
                              label="Line 1 (Item Name)"
                              id={`page-line1-${p.id}`}
                              value={p.line1}
                              onChange={(val) => updatePageData(index, "line1", val)}
                              placeholder="e.g. ITEM NAME:"
                            />
                            <FloatingInput
                              label="Line 2 (Code/Details)"
                              id={`page-line2-${p.id}`}
                              value={p.line2}
                              onChange={(val) => updatePageData(index, "line2", val)}
                              placeholder="e.g. STK-9100"
                            />
                            <FloatingInput
                              label="Price Amount"
                              id={`page-price-${p.id}`}
                              value={p.priceAmount}
                              onChange={(val) => updatePageData(index, "priceAmount", val)}
                              placeholder="1450/-"
                            />
                          </div>
                        )}
                        {state.activePageIndex !== index && (
                          <div className="text-[10px] text-[#49454F] truncate">
                            {p.line1} | {p.line2} | {p.priceAmount}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SurfaceCard>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-[#FDFBFF] via-[#FDFBFF] to-transparent pointer-events-none">
        <button
          onClick={handlePrint}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#6750A4] text-white rounded-[20px] font-bold text-[15px] tracking-wide shadow-[0_8px_24px_rgba(103,80,164,0.25)] hover:shadow-[0_12px_32px_rgba(103,80,164,0.4)] hover:bg-[#5a468f] hover:-translate-y-1 transition-all cursor-pointer border-none pointer-events-auto"
        >
          <Printer size={20} />
          Print Sheet
        </button>
      </div>
    </aside>
  );
}

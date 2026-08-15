import SectionHeading from "./SectionHeading";

export default function MultiPageSection({ state, update }) {
  const { pages, activePageIndex, multiPageEnabled } = state;

  const addPage = () => {
    const newPage = {
      id: Date.now(),
      line1: state.line1,
      line2: "",
      priceAmount: "",
    };
    const newPages = [...pages, newPage];
    update({
      pages: newPages,
      activePageIndex: newPages.length - 1,
      line1: newPage.line1,
      line2: newPage.line2,
      priceAmount: newPage.priceAmount,
    });
  };

  const removePage = (index) => {
    if (pages.length <= 1) return;
    const newPages = pages.filter((_, i) => i !== index);
    const newActive = Math.min(activePageIndex, newPages.length - 1);
    const activePage = newPages[newActive];
    update({
      pages: newPages,
      activePageIndex: newActive,
      line1: activePage.line1,
      line2: activePage.line2,
      priceAmount: activePage.priceAmount,
    });
  };

  const selectPage = (index) => {
    // Save current page data before switching
    const updatedPages = [...pages];
    updatedPages[activePageIndex] = {
      ...updatedPages[activePageIndex],
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

  const duplicatePage = (index) => {
    const source = { ...pages[index], id: Date.now() };
    const newPages = [...pages];
    newPages.splice(index + 1, 0, source);
    update({ pages: newPages });
  };

  const toggleMultiPage = () => {
    if (!multiPageEnabled) {
      // Enable: sync current form to page 1
      const syncedPages = [
        {
          id: pages[0]?.id || 1,
          line1: state.line1,
          line2: state.line2,
          priceAmount: state.priceAmount,
        },
      ];
      update({
        multiPageEnabled: true,
        pages: syncedPages,
        activePageIndex: 0,
      });
    } else {
      update({ multiPageEnabled: false });
    }
  };

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
      <SectionHeading
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect
              x="2"
              y="4"
              width="16"
              height="16"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M6 2h12a2 2 0 012 2v12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        }
        title="Multi-Page"
      />

      {/* Toggle */}
      <div className="flex items-center justify-between gap-3 mb-3.5">
        <label
          className="text-[10px] font-medium text-slate-500 uppercase tracking-widest cursor-pointer"
          onClick={toggleMultiPage}
        >
          Enable Multiple Pages
        </label>
        <div
          className={`toggle-track ${multiPageEnabled ? "active" : ""}`}
          onClick={toggleMultiPage}
          role="switch"
          aria-checked={multiPageEnabled}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") toggleMultiPage();
          }}
        >
          <div className="toggle-knob" />
        </div>
      </div>

      {multiPageEnabled && (
        <div className="space-y-3 animate-fade-in">
          {/* Page List */}
          <div className="space-y-2 max-h-48 overflow-y-auto sidebar-scroll pr-1">
            {pages.map((page, i) => (
              <div
                key={page.id}
                onClick={() => selectPage(i)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                  transition-all duration-200 group
                  ${
                    i === activePageIndex
                      ? "bg-indigo-500/15 border border-indigo-500/30 shadow-md shadow-black/20"
                      : "bg-slate-950/50 border border-slate-700/60 hover:border-slate-500/60 hover:bg-slate-900"
                  }`}
              >
                <span
                  className={`shrink-0 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors
                    ${
                      i === activePageIndex
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                        : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                    }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`text-[11.5px] font-semibold truncate transition-colors
                    ${i === activePageIndex ? "text-indigo-100" : "text-slate-300"}`}
                  >
                    {page.line1 || "Untitled"}{" "}
                    {page.line2 ? `- ${page.line2}` : ""}
                  </div>
                  {page.priceAmount && (
                    <div className="text-[10px] text-slate-500 font-medium">
                      Rs. {page.priceAmount}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicatePage(i);
                    }}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400
                      hover:bg-slate-700 hover:text-indigo-400 transition-all cursor-pointer border-none bg-transparent"
                    title="Duplicate page"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="8"
                        y="8"
                        width="13"
                        height="13"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </button>
                  {pages.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePage(i);
                      }}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400
                        hover:bg-red-500/20 hover:text-red-400 transition-all cursor-pointer border-none bg-transparent"
                      title="Remove page"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Page Button */}
          <button
            type="button"
            onClick={addPage}
            className="w-full h-10 flex items-center justify-center gap-2 text-xs font-bold
              text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-xl
              hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-indigo-300
              transition-all duration-300 cursor-pointer shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Add New Page
          </button>

          <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
            Each page generates a separate sheet with the same layout but different content.
          </p>
        </div>
      )}
    </section>
  );
}

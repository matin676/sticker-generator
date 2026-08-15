import { useState, useCallback } from "react";

export const DEFAULT_STATE = {
  line1: "ITEM NAME:",
  line2: "STK-9100",
  priceText: "Rs.",
  priceAmount: "1450/-",
  paperSize: "a4-avery10",
  rows: 13,
  cols: 5,
  margin: 10,
  gap: 5,
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
  multiPageEnabled: false,
  activePageIndex: 0,
  pages: [
    { id: 1, line1: "ITEM NAME:", line2: "STK-9100", priceAmount: "1450/-" }
  ]
};

/**
 * Custom hook to manage the central state of the Sticker Generator.
 */
export function useStickerState() {
  const [state, setState] = useState(DEFAULT_STATE);
  const [activeSection, setActiveSection] = useState("Label Data");

  const update = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleLogoUpload = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => update({ logoUrl: event.target.result });
        reader.readAsDataURL(file);
      }
    },
    [update],
  );

  const removeLogo = useCallback(() => {
    update({ logoUrl: "" });
  }, [update]);

  const addPage = useCallback(() => {
    setState((prev) => {
      const newPage = {
        id: Date.now(),
        line1: prev.line1,
        line2: prev.line2,
        priceAmount: prev.priceAmount
      };
      return {
        ...prev,
        pages: [...prev.pages, newPage],
        activePageIndex: prev.pages.length
      };
    });
  }, []);

  const removePage = useCallback((index) => {
    setState((prev) => {
      if (prev.pages.length <= 1) return prev;
      const newPages = prev.pages.filter((_, i) => i !== index);
      const newIndex = prev.activePageIndex >= newPages.length ? newPages.length - 1 : prev.activePageIndex;
      return { ...prev, pages: newPages, activePageIndex: newIndex };
    });
  }, []);

  const selectPage = useCallback((index) => {
    setState((prev) => ({ ...prev, activePageIndex: index }));
  }, []);

  const updatePageData = useCallback((index, field, value) => {
    setState((prev) => {
      const newPages = [...prev.pages];
      newPages[index] = { ...newPages[index], [field]: value };
      return { ...prev, pages: newPages };
    });
  }, []);

  return {
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
  };
}

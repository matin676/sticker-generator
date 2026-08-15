# Simple Sticker Pro

A premium, interactive web application for generating perfectly formatted, print-ready sticker sheets. Built with React, Vite, and Tailwind CSS, featuring an ultra-premium "Material Expressive" interface. This project boasts a highly scalable, modular architecture and is optimized for low-end machines through aggressive memoization.

## Features

- **Perfect A4 Print Layout:** The print view strips away all UI elements and perfectly scales your sticker sheet for A4 paper. No cropping, no bleeding.
- **Dynamic Live Preview:** Real-time preview of the sticker sheet with expressive animations and tactile controls.
- **Bulk Multi-Page Printing:** Easily add, manage, and delete multiple pages of sticker data. The print layout will perfectly paginate the exact physical space across multiple sheets.
- **Physical Alignment Engine (Dual-Resolution):** When using custom dimensions, standard generic sliders are replaced with exact millimeter inputs for Width, Height, Top Margin, Left Margin, and Gaps. A custom CSS grid mathematically scales the millimeter values to fit your screen, but injects absolute millimeter values during printing to guarantee pinpoint alignment with physical pre-cut sticker paper (e.g., Avery sheets).
- **Visual Grid Selection:** Interactive grid to map exactly which sticker cells should be printed on the sheet. Unselected cells perfectly preserve their physical dimensions, allowing you to re-use partially printed sticker paper with millimeter accuracy.
- **Rich Typography & Styling:**
  - Font families (Inter, Roboto, Outfit, Montserrat, etc.)
  - Text alignment, size, and weight controls
  - Premium Color Pickers with hex code inputs and quick visual presets
- **Advanced Logo Integration:** Upload and scale a custom logo/icon. Smart logo placement supports Top, Bottom, Left, and Right alignments with automatic flex-layout adjustments.
- **PWA Ready:** Installable as a native app on desktop and mobile platforms.

## Architecture & Code Hygiene

This application is built with clean code principles in mind:
- **Modular Components:** The UI is split into logical layout blocks (`Sidebar`, `MainCanvas`) and highly reusable atomic controls (`ExpressiveStepper`, `SurfaceCard`).
- **Custom Hooks:** Business logic and state management are extracted into custom hooks (`useStickerState`, `usePWAInstall`) for separation of concerns.
- **Performance Optimized:** The individual sticker rendering (`StickerCell`) uses `React.memo` to prevent unnecessary re-renders when tweaking layout controls.

## Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS v4**
- **Framer Motion** for liquid, fluid micro-interactions
- **Lucide React** for beautiful iconography

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment (GitHub Pages)

This project is configured to deploy automatically to GitHub Pages.

1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Run the deployment script:
   ```bash
   npm run deploy
   ```
3. In your GitHub repository, go to **Settings > Pages** and ensure your source is set to the `gh-pages` branch.

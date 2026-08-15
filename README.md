# Simple Sticker Pro

A premium, interactive web application for generating perfectly formatted, print-ready sticker sheets. Built with React, Vite, and Tailwind CSS, featuring an ultra-premium "Material Expressive" interface.

## Features

- **Perfect A4 Print Layout:** The print view strips away all UI elements and perfectly scales your sticker sheet for A4 paper. No cropping, no bleeding.
- **Dynamic Live Preview:** Real-time preview of the sticker sheet with expressive animations and tactile controls.
- **Custom Sticker Dimensions:** Choose between standard sizes or set custom Width (mm) and Height (mm) for your stickers.
- **Visual Grid Selection:** Interactive grid to map exactly which sticker cells should be printed on the sheet (perfect for re-using partially printed sticker paper).
- **Rich Typography & Styling:**
  - Font families (Inter, Roboto, Outfit, Montserrat, etc.)
  - Text alignment, size, and weight controls
  - Premium Color Pickers with hex code inputs and quick visual presets
- **Logo Integration:** Upload and scale a custom logo/icon for your stickers.

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

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

1. Push your code to the `main` or `master` branch.
2. In your GitHub repository, go to **Settings > Pages**.
3. Under **Source**, select **GitHub Actions**.
4. The `.github/workflows/deploy.yml` workflow will automatically build and deploy your app.

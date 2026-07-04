import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ── GitHub Pages deployment ──────────────────────────────────────────────
  // Set base to the repo name so asset paths resolve correctly when the app
  // is served from https://abhishek-a-purohit.github.io/gita-rag-eval/
  // For local dev (npm run dev) and Vercel/Netlify this has no effect.
  base: "/gita-rag-eval/",

  build: {
    // Produce a clean dist/ every build.
    emptyOutDir: true,
    // Raise the chunk-size warning threshold slightly — kb.js is intentionally
    // large (rich Gita corpus). 600 kB is a reasonable ceiling for a 1-page app.
    chunkSizeWarningLimit: 600,
  },
});

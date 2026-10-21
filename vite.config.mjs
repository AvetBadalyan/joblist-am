import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  envPrefix: ["VITE_", "REACT_APP_"],
  build: {
    outDir: "build",
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split vendor chunks to improve caching and reduce initial load
        // Vite 8+ uses rolldown which requires a function for manualChunks
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // React core - always needed
            if (id.includes("react-dom") || id.match(/node_modules\/react\//)) {
              return "react-vendor";
            }
            // Router
            if (id.includes("react-router")) {
              return "router";
            }
            // Redux
            if (id.includes("@reduxjs/toolkit") || id.includes("react-redux")) {
              return "redux";
            }
            // Toast notifications - can be deferred
            if (id.includes("react-toastify")) {
              return "toast";
            }
            // Styled-components
            if (id.includes("styled-components")) {
              return "styled";
            }
          }
        },
      },
    },
  },
});

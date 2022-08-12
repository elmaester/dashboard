import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      manualChunks: {
        dateTime: ["react-datetime-picker", "react-date-picker"],
        fontAwesome: [
          "@fortawesome/fontawesome-svg-core",
          "@fortawesome/free-solid-svg-icons",
          "@fortawesome/react-fontawesome",
        ],
        parse: ["parse"],
      },
    },
  },
  plugins: [react()],
});

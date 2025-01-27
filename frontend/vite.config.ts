import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api requests to the backend
      "/api": {
        target: "http://localhost:3000", // Backend server URL
        changeOrigin: true, // Needed for virtual hosted sites
      },
    },
  },
});

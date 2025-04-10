import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy /api requests to the backend
      '/api': {
        target: 'http://localhost:3000', // Backend server URL
        changeOrigin: true, // Needed for virtual hosted sites
      },
      '/socket.io': {
        target: 'http://localhost:3000', // Backend server URL
        changeOrigin: true, // Needed for virtual hosted sites
      }
    },
  },
});

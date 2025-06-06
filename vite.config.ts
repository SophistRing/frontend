import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), envCompatible()],
  define: {
    global: "window",
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "http://172.16.4.171:8080",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});

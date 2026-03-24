import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // This tells Vite: "When I fetch '/api', send it to the backend"
      "/api": {
        target: "http://127.0.0.1:6000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes '/api' before sending to backend
      },
    },
  },
});

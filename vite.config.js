import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/task/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
});

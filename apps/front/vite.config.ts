import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { env } from "process";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@axios": path.resolve(__dirname, "src/axios"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});

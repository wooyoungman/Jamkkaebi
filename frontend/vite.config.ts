import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 절대 경로 다 설정
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@queries": path.resolve(__dirname, "./src/queries"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@atoms": path.resolve(__dirname, "./src/atoms"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
    },
  },
});

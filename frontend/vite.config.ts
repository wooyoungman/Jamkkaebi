import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_TMAP_API_KEY": JSON.stringify(
        env.VITE_TMAP_API_KEY
      ),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@queries": path.resolve(__dirname, "./src/queries"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@atoms": path.resolve(__dirname, "./src/atoms"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@interfaces": path.resolve(__dirname, "./src/interfaces"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
      },
    },
  };
});

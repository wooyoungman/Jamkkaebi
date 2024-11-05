import { defineConfig, loadEnv } from "vite"; // loadEnv 추가
import react from "@vitejs/plugin-react";
import path from "path";
// mode 파라미터 추가
export default defineConfig(function (_a) {
    var mode = _a.mode;
    // 환경변수 로드
    var env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react()],
        define: {
            "%VITE_TMAP_API_KEY%": JSON.stringify(env.VITE_TMAP_API_KEY),
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
            },
        },
    };
});

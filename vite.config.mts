import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import createExternal from "vite-plugin-external";
import tsconfigPaths from "vite-tsconfig-paths";
// import svgr from 'vite-plugin-svgr'

export default () => {
  return defineConfig({
    optimizeDeps: {
      include: ["src/**/*.tsx"],
    },

    plugins: [
      react(),
      // svgr({
      //   // 设置 svgr 的选项
      //   svgrOptions: {
      //     // svgr 的配置项
      //   },
      // }),
      tsconfigPaths(),
      createExternal({
        interop: "auto",
        externals: {
          // echarts: "echarts",
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src"),
      },
    },
    build: {
      outDir: "build",
      sourcemap: false,
      rollupOptions: {
        output: {
          chunkFileNames: `assets/static/[name].[hash].js`,
        },
      },
      chunkSizeWarningLimit: 800,
    },
    server: {
      port: 3000,
    },
  });
};

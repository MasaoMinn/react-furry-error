import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: "dist"
    })
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactFurryError",
      formats: ["es", "cjs"],
      fileName: (format) =>
        format === "es" ? "index.es.js" : "index.cjs.js"
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-dom/client"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-dom/client": "ReactDOM"
        }
      }
    },


    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});

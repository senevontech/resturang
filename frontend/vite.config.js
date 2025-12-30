import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import compression from "vite-plugin-compression";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [
    // image processing - generate optimized variants when you import images via the ?format query
    imagetools(),
    react(),
    // compress build output with Brotli (good for CDNs)
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

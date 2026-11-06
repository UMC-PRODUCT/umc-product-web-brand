import path from "node:path"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react(), svgr({ esbuildOptions: { jsx: "automatic" } })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

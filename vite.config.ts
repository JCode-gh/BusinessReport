import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
  },
  esbuild: {
    // Drop debug logs in production; keep warn/error for diagnostics.
    drop: ["debugger"],
    pure: ["console.log", "console.info", "console.debug"],
  },
});

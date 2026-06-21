import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function seoPagesPlugin(): Plugin {
  return {
    name: "generate-seo-pages",
    apply: "build",
    async closeBundle() {
      const { buildStaticExamplePageHtml } = await import("./src/exampleReportPlan");
      const exampleDir = join(process.cwd(), "dist", "example");
      mkdirSync(exampleDir, { recursive: true });
      writeFileSync(join(exampleDir, "index.html"), buildStaticExamplePageHtml(), "utf8");
      console.log("[seo] wrote dist/example/index.html");
    },
  };
}

export default defineConfig({
  plugins: [vue(), seoPagesPlugin()],
  server: {
    port: 5173,
  },
  esbuild: {
    // Drop debug logs in production; keep warn/error for diagnostics.
    drop: ["debugger"],
    pure: ["console.log", "console.info", "console.debug"],
  },
});

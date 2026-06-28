import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import {
  buildHomeInlineSeoScript,
  buildNoscriptHomeContent,
  buildSeoFallbackMain,
  buildStaticHeadTags,
} from "./src/seo/indexHtmlSeo";
import { buildJsonLdBlocks, buildSitemapXml } from "./src/seo/jsonLd";
import { writeStaticSeoPages } from "./src/seo/staticPages";
import { asyncCssPlugin, criticalCssPlugin, minifyDistCssPlugin } from "./src/seo/asyncAssets";

function seoIndexHtmlPlugin(): Plugin {
  return {
    name: "seo-index-html",
    transformIndexHtml(html) {
      const headTags = buildStaticHeadTags("nl");
      const inlineScript = buildHomeInlineSeoScript();
      const noscript = buildNoscriptHomeContent("nl");
      const seoFallback = buildSeoFallbackMain("nl");
      const jsonLd = buildJsonLdBlocks("en");

      let result = html;

      result = result.replace(
        /<script>\s*\(function \(\) \{[\s\S]*?\}\)\(\);\s*<\/script>/,
        `<script>\n      ${inlineScript}\n    </script>`,
      );

      result = result.replace(
        /<title>[\s\S]*?<\/title>\s*<meta name="description"[\s\S]*?<meta name="twitter:image"[^>]*>/,
        headTags,
      );

      result = result.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        jsonLd,
      );

      result = result.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n      ${noscript}\n    </noscript>`);

      result = result.replace(
        '<div id="app"></div>',
        `<div id="app">${seoFallback}</div>`,
      );

      return result;
    },
  };
}

function seoPagesPlugin(): Plugin {
  return {
    name: "generate-seo-pages",
    apply: "build",
    async closeBundle() {
      const distDir = join(process.cwd(), "dist");
      const lastmod = new Date().toISOString().slice(0, 10);

      const svg = readFileSync(join(process.cwd(), "public", "brand", "og-cover.svg"));
      const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
      writeFileSync(join(distDir, "brand", "og-cover.png"), png);

      writeStaticSeoPages(
        distDir,
        (path, content) => writeFileSync(path, content, "utf8"),
        (path) => mkdirSync(path, { recursive: true }),
      );

      writeFileSync(join(distDir, "sitemap.xml"), buildSitemapXml(lastmod), "utf8");
      console.log("[seo] wrote static pages and sitemap.xml");
    },
  };
}

export default defineConfig({
  plugins: [vue(), criticalCssPlugin(), seoIndexHtmlPlugin(), asyncCssPlugin(), seoPagesPlugin(), minifyDistCssPlugin()],
  server: {
    port: 5173,
  },
  build: {
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/firebase/") || id.includes("node_modules/@firebase/")) {
            return "firebase";
          }
          if (id.includes("businessKitGenerate") || id.includes("jsonrepair")) {
            return "business-kit-generate";
          }
        },
      },
    },
  },
  esbuild: {
    drop: ["debugger"],
    pure: ["console.log", "console.info", "console.debug"],
  },
});

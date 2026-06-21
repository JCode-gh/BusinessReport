import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const port = 4173;
const base = `http://localhost:${port}`;

/** Routes to prerender into static HTML for crawlers. /example is generated separately. */
const ROUTES = [
  { path: "/", outFile: "index.html" },
  { path: "/terms", outFile: "terms/index.html" },
];

function startPreview() {
  const proc = spawn("npx", ["vite", "preview", "--port", String(port), "--strictPort"], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
  });

  return proc;
}

async function waitForServer(maxMs = 45_000) {
  const started = Date.now();
  while (Date.now() - started < maxMs) {
    try {
      const res = await fetch(base);
      if (res.ok) return;
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error("Preview server did not become reachable in time");
}

function injectPrerenderedApp(shellHtml, appHtml) {
  const marker = '<div id="app"></div>';
  if (!shellHtml.includes(marker)) {
    throw new Error("Could not find #app mount point in index.html");
  }
  return shellHtml.replace(marker, `<div id="app">${appHtml}</div>`);
}

async function prerenderRoute(page, path, shellHtml) {
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.waitForSelector("#app");
  await page.waitForTimeout(800);
  const appHtml = await page.locator("#app").innerHTML();
  return injectPrerenderedApp(shellHtml, appHtml);
}

async function main() {
  const proc = startPreview();
  try {
    await waitForServer();
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const shellPath = join(dist, "index.html");
    const originalShell = readFileSync(shellPath, "utf8");

    for (const route of ROUTES) {
      const html = await prerenderRoute(page, route.path, originalShell);
      const outPath = join(dist, route.outFile);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html, "utf8");
      console.log(`[prerender] ${route.path} → ${route.outFile}`);
    }

    await browser.close();
  } finally {
    proc.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});

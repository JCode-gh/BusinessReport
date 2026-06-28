import type { Plugin } from 'vite';
import { transform } from 'lightningcss';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CRITICAL_CSS, buildLcpFontPreloadHtml } from '../fonts';

/** Turn Vite-injected stylesheet links into non-render-blocking preload/onload links. */
export function asyncCssPlugin(): Plugin {
  return {
    name: 'async-css',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        let result = html.replace(
          /<link rel="stylesheet"( crossorigin)? href="(\/assets\/[^"]+\.css)">/g,
          (_match, crossorigin, href) =>
            `<link rel="preload" href="${href}" as="style"${crossorigin ?? ''} onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
        );

        // Lazy-route CSS chunks injected into the entry HTML.
        result = result.replace(
          /<link rel="stylesheet"( crossorigin)? href="(\/assets\/[^"]+\.css)" media="print" onload="this\.media='all'">/g,
          (_match, crossorigin, href) =>
            `<link rel="preload" href="${href}" as="style"${crossorigin ?? ''} onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
        );

        return result;
      },
    },
  };
}

export function criticalCssPlugin(): Plugin {
  return {
    name: 'critical-css',
    transformIndexHtml(html) {
      if (html.includes('id="critical-css"')) return html;
      return html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <style id="critical-css">${CRITICAL_CSS}</style>\n    ${buildLcpFontPreloadHtml()}`,
      );
    },
  };
}

/** Second-pass CSS minify on emitted assets (Lightning CSS is tighter than esbuild alone). */
export function minifyDistCssPlugin(): Plugin {
  return {
    name: 'minify-dist-css',
    apply: 'build',
    closeBundle() {
      const assetsDir = join(process.cwd(), 'dist', 'assets');
      let saved = 0;
      let entries: string[];

      try {
        entries = readdirSync(assetsDir);
      } catch {
        return;
      }

      for (const file of entries) {
        if (!file.endsWith('.css')) continue;

        const path = join(assetsDir, file);
        const input = readFileSync(path);
        const { code } = transform({
          filename: file,
          code: input,
          minify: true,
        });

        if (code.length < input.length) {
          writeFileSync(path, code);
          saved += input.length - code.length;
        }
      }

      if (saved > 0) {
        console.log(`[css] minified dist assets (saved ${saved} bytes)`);
      }
    },
  };
}

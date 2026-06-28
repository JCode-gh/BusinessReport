import type { Plugin } from 'vite';
import { CRITICAL_CSS, FONT_PRECONNECT } from '../fonts';

function buildPreconnectHtml(): string {
  return FONT_PRECONNECT.map(({ href, crossOrigin }) =>
    crossOrigin
      ? `<link rel="preconnect" href="${href}" crossorigin>`
      : `<link rel="preconnect" href="${href}">`,
  ).join('\n    ');
}

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
      const preconnect = buildPreconnectHtml();
      return html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <style id="critical-css">${CRITICAL_CSS}</style>\n    ${preconnect}`,
      );
    },
  };
}

/** Self-hosted font files (served from /public/fonts/). */
export const FONT_WOFF2 = {
  clash400: '/fonts/clash-display-400.woff2',
  clash500: '/fonts/clash-display-500.woff2',
  clash600: '/fonts/clash-display-600.woff2',
  clash700: '/fonts/clash-display-700.woff2',
  montserrat: '/fonts/montserrat-latin.woff2',
} as const;

/** LCP-critical fonts only — keep preload count low (not preconnect). */
export const LCP_FONT_PRELOADS = [FONT_WOFF2.montserrat, FONT_WOFF2.clash700] as const;

const INLINE_FONT_FACE_CSS = `
@font-face{font-family:'Clash Display';src:url('${FONT_WOFF2.clash400}') format('woff2');font-weight:400;font-display:swap;font-style:normal}
@font-face{font-family:'Clash Display';src:url('${FONT_WOFF2.clash500}') format('woff2');font-weight:500;font-display:swap;font-style:normal}
@font-face{font-family:'Clash Display';src:url('${FONT_WOFF2.clash600}') format('woff2');font-weight:600;font-display:swap;font-style:normal}
@font-face{font-family:'Clash Display';src:url('${FONT_WOFF2.clash700}') format('woff2');font-weight:700;font-display:swap;font-style:normal}
@font-face{font-family:'Montserrat';src:url('${FONT_WOFF2.montserrat}') format('woff2');font-weight:400 900;font-display:swap;font-style:normal}
`.trim();

/** Inline @font-face for standalone reports — avoids extra CSS file requests. */
export function buildInlineFontFaceHtml(): string {
  return `<style>${INLINE_FONT_FACE_CSS}</style>`;
}

/** System stack for embedded iframe previews — no extra font downloads or CLS. */
export function buildSystemFontOverrideHtml(): string {
  return `<style>body,.section-title,.report-title,.exec-chip,.action-header-row,.template-card h3,.strategy-card h3,h1,h2,h3{font-family:ui-sans-serif,system-ui,-apple-system,sans-serif!important}</style>`;
}

export function buildLcpFontPreloadHtml(): string {
  return LCP_FONT_PRELOADS.map(
    (href) =>
      `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>`,
  ).join('\n    ');
}

/** Minimal above-the-fold styles while async CSS loads. */
export const CRITICAL_CSS = [
  ':root{color-scheme:dark;background:#100d28;color:#fff}',
  'body{margin:0;min-width:320px;min-height:100vh;background:#100d28;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif}',
  'h1{margin:0;font-size:clamp(2rem,8vw,3.55rem);line-height:.98;font-weight:700;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif}',
  '.hero-copy,.eyebrow{margin:0}',
].join('');

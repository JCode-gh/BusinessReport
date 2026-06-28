export const FONT_STYLESHEETS = [
  'https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap',
] as const;

export const FONT_PRECONNECT = [
  { href: 'https://api.fontshare.com', crossOrigin: true },
  { href: 'https://cdn.fontshare.com', crossOrigin: true },
  { href: 'https://fonts.googleapis.com', crossOrigin: false },
  { href: 'https://fonts.gstatic.com', crossOrigin: true },
] as const;

/** Non-blocking stylesheet load — used after first paint for web fonts. */
export function loadWebFonts(): void {
  for (const href of FONT_STYLESHEETS) {
    if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) continue;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

/** HTML snippet for static/report pages (preload → stylesheet on load). */
export function buildAsyncFontHeadHtml(): string {
  const preconnect = FONT_PRECONNECT.map(({ href, crossOrigin }) =>
    crossOrigin
      ? `<link rel="preconnect" href="${href}" crossorigin>`
      : `<link rel="preconnect" href="${href}">`,
  ).join('\n  ');

  const asyncStyles = FONT_STYLESHEETS.map(
    (href) =>
      `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">` +
      `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
  ).join('\n  ');

  return `${preconnect}\n  ${asyncStyles}`;
}

/** Minimal above-the-fold styles while async CSS/fonts load. */
export const CRITICAL_CSS = `:root{color-scheme:dark;background:#100d28;color:#fff}body{margin:0;min-width:320px;min-height:100vh;background:#100d28;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif}`;

import type { ReportLanguage } from '../composables/useLanguage';
import {
  DEFAULT_LANGUAGE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_ORIGIN,
  escapeHtml,
  getHomeSeoCopy,
  homeHreflangEntries,
  localeTranslations,
  renderHreflangLinks,
} from './siteSeo';

export function buildHomeInlineSeoScript(): string {
  const seo: Record<string, { title: string; description: string }> = {};
  for (const lang of ['nl', 'en', 'fr', 'de'] as ReportLanguage[]) {
    seo[lang] = getHomeSeoCopy(lang);
  }

  const ogLocales: Record<string, string> = {
    nl: 'nl_NL',
    en: 'en_US',
    fr: 'fr_FR',
    de: 'de_DE',
  };

  return `(function () {
  var supported = { nl: 1, en: 1, fr: 1, de: 1 };
  var seo = ${JSON.stringify(seo)};
  var ogLocales = ${JSON.stringify(ogLocales)};
  var list =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || 'en'];
  var detected = 'en';
  for (var i = 0; i < list.length; i++) {
    var code = String(list[i]).toLowerCase().split('-')[0];
    if (supported[code]) {
      detected = code;
      break;
    }
  }
  var copy = seo[detected] || seo.en;
  document.documentElement.lang = detected;
  document.title = copy.title;
  function setMeta(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  }
  setMeta('meta[name="description"]', copy.description);
  setMeta('meta[property="og:description"]', copy.description);
  setMeta('meta[property="og:title"]', copy.title);
  setMeta('meta[name="twitter:description"]', copy.description);
  setMeta('meta[name="twitter:title"]', copy.title);
  setMeta('meta[property="og:locale"]', ogLocales[detected] || ogLocales.en);
})();`;
}

export function buildStaticHeadTags(language: ReportLanguage = DEFAULT_LANGUAGE): string {
  const copy = getHomeSeoCopy(language);
  const hreflang = renderHreflangLinks(homeHreflangEntries());

  return `
    <title>${escapeHtml(copy.title)}</title>
    <meta name="description" content="${escapeHtml(copy.description)}">
    <link rel="canonical" href="${SITE_ORIGIN}/">
    ${hreflang}
    <meta property="og:type" content="website">
    <meta property="og:url" content="${SITE_ORIGIN}/">
    <meta property="og:locale" content="nl_NL">
    <meta property="og:title" content="${escapeHtml(copy.title)}">
    <meta property="og:description" content="${escapeHtml(copy.description)}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:image" content="${OG_IMAGE}">
    <meta property="og:image:width" content="${OG_IMAGE_WIDTH}">
    <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}">
    <meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(copy.title)}">
    <meta name="twitter:description" content="${escapeHtml(copy.description)}">
    <meta name="twitter:image" content="${OG_IMAGE}">`.trim();
}

export function buildNoscriptHomeContent(language: ReportLanguage = DEFAULT_LANGUAGE): string {
  const copy = localeTranslations[language];
  const proofCards = copy.proofCards
    .map(
      (card) =>
        `<article><h2>${escapeHtml(card.title)}</h2><p>${escapeHtml(card.body)}</p></article>`,
    )
    .join('\n        ');

  return `<main style="max-width:720px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1630">
        <p style="font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6f6acf">${escapeHtml(copy.heroEyebrow)}</p>
        <h1>${escapeHtml(copy.heroTitle)} — GrowthKit</h1>
        <p>${escapeHtml(copy.heroCopy)}</p>
        <p>${escapeHtml(copy.metaDescription)}</p>
        <p><strong>${escapeHtml(copy.creditCostPerReport)}</strong> · ${escapeHtml(copy.freeTrialNote)} <a href="mailto:info@jcode.be">${escapeHtml(copy.freeTrialLink)}</a></p>
        <section aria-label="${escapeHtml(copy.proofAria)}">
        ${proofCards}
        </section>
        <p>Interface and reports available in Dutch, English, French, and German.</p>
        <p><a href="/example/">${escapeHtml(copy.exampleShowcaseOpenFull)}</a> · <a href="/">${escapeHtml(copy.heroPrimaryPaid)}</a> · <a href="/terms">${escapeHtml(copy.termsLink)}</a></p>
      </main>`;
}

export function buildSeoFallbackMain(language: ReportLanguage = DEFAULT_LANGUAGE): string {
  const copy = localeTranslations[language];
  const proofCards = copy.proofCards
    .map(
      (card) =>
        `<article><h2>${escapeHtml(card.title)}</h2><p>${escapeHtml(card.body)}</p></article>`,
    )
    .join('');

  return `<main class="seo-fallback" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0" aria-hidden="true">
    <h1>${escapeHtml(copy.heroTitle)}</h1>
    <p>${escapeHtml(copy.metaDescription)}</p>
    ${proofCards}
    <a href="/example/">Sample report</a>
  </main>`;
}

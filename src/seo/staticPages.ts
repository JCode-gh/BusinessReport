import type { ReportLanguage } from '../composables/useLanguage';
import { buildBusinessKitHtml } from '../businessKit';
import dePlan from '../exampleReports/plans/de';
import enPlan from '../exampleReports/plans/en';
import frPlan from '../exampleReports/plans/fr';
import nlPlan from '../exampleReports/plans/nl';
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  escapeHtml,
  exampleCanonical,
  exampleHreflangEntries,
  localeTranslations,
  renderHreflangLinks,
  termsCanonical,
} from './siteSeo';
import { getExampleReportSeo } from '../exampleReports';

const examplePlans = { nl: nlPlan, en: enPlan, fr: frPlan, de: dePlan };

const exampleCtaByLanguage: Record<ReportLanguage, { label: string; cta: string }> = {
  nl: {
    label: 'Voorbeeldrapport',
    cta: 'Zo ziet een GrowthKit-rapport eruit — genereer je eigen vanaf €5',
  },
  en: {
    label: 'Sample report',
    cta: 'This is what a GrowthKit report looks like — generate yours from €5',
  },
  fr: {
    label: 'Exemple de rapport',
    cta: 'Voici à quoi ressemble un rapport GrowthKit — générez le vôtre dès 5 €',
  },
  de: {
    label: 'Beispielreport',
    cta: 'So sieht ein GrowthKit-Report aus — erstellen Sie Ihren ab 5 €',
  },
};

function exampleCtaHtml(language: ReportLanguage): string {
  const copy = exampleCtaByLanguage[language];
  return `<header class="gk-example-cta" style="position:sticky;top:0;z-index:99;padding:16px 20px;background:#100d28;border-bottom:1px solid rgba(255,255,255,0.08);font-family:Montserrat,system-ui,sans-serif;color:#fff">
  <div style="max-width:1120px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
    <div>
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#d6a4e3">${escapeHtml(copy.label)}</p>
      <p style="margin:0;font-size:15px;font-weight:700">${escapeHtml(copy.cta)} — <a href="https://growthkit.jcode.be/?ref=example" style="color:#d6a4e3">GrowthKit</a></p>
    </div>
    <a href="https://growthkit.jcode.be/?ref=example" style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;background:linear-gradient(135deg,#d6a4e3,#6f6acf);color:#fff;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap">→</a>
  </div>
</header>`;
}

function buildExampleSeoHead(language: ReportLanguage): string {
  const seo = getExampleReportSeo(language);
  const canonical = exampleCanonical(language);

  return `
  <link rel="canonical" href="${escapeHtml(canonical)}">
  ${renderHreflangLinks(exampleHreflangEntries())}
  <meta name="description" content="${escapeHtml(seo.description)}">
  <meta property="og:title" content="${escapeHtml(seo.title)}">
  <meta property="og:description" content="${escapeHtml(seo.description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta property="og:image:width" content="${OG_IMAGE_WIDTH}">
  <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}">
  <meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(seo.title)}">
  <meta name="twitter:description" content="${escapeHtml(seo.description)}">
  <meta name="twitter:image" content="${OG_IMAGE}">`.trim();
}

export function buildStaticExamplePageHtml(language: ReportLanguage = 'nl'): string {
  const plan = examplePlans[language];
  const seo = getExampleReportSeo(language);
  const reportHtml = buildBusinessKitHtml({ ...plan, showBranding: true });
  const seoHead = buildExampleSeoHead(language);

  return reportHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace('</head>', `${seoHead}\n</head>`)
    .replace('<body', `${exampleCtaHtml(language)}<body`);
}

export function buildStaticTermsPageHtml(language: ReportLanguage = 'nl'): string {
  const copy = localeTranslations[language];
  const canonical = termsCanonical();
  const title = `${copy.termsPageTitle} · GrowthKit Studio`;
  const description = copy.termsMetaDescription;

  const sections = copy.termsSections
    .map(
      (section) =>
        `<section><h2>${escapeHtml(section.title)}</h2>${section.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}</section>`,
    )
    .join('\n      ');

  return `<!doctype html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${OG_IMAGE}">
</head>
<body style="max-width:720px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1630">
  <p><a href="/">${escapeHtml(copy.termsBackHome)}</a></p>
  <h1>${escapeHtml(copy.termsPageTitle)}</h1>
  <p style="color:#666">${escapeHtml(copy.termsLastUpdated)}</p>
  <p>${escapeHtml(copy.termsIntro)}</p>
  ${sections}
  <p><a href="/">${escapeHtml(copy.termsBackHome)}</a></p>
</body>
</html>`;
}

export function writeStaticSeoPages(distDir: string, writeFile: (path: string, content: string) => void, mkdir: (path: string) => void) {
  const exampleLangs: ReportLanguage[] = ['nl', 'en', 'fr', 'de'];

  mkdir(`${distDir}/example`);
  writeFile(`${distDir}/example/index.html`, buildStaticExamplePageHtml('nl'));

  for (const lang of ['en', 'fr', 'de'] as ReportLanguage[]) {
    mkdir(`${distDir}/example/${lang}`);
    writeFile(`${distDir}/example/${lang}/index.html`, buildStaticExamplePageHtml(lang));
  }

  mkdir(`${distDir}/terms`);
  writeFile(`${distDir}/terms/index.html`, buildStaticTermsPageHtml('nl'));
}

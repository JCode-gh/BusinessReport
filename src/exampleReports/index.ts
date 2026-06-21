import type { BusinessKitLanguage } from '../businessKit';
import type { BusinessKitPlan } from '../businessKit';
import { buildBusinessKitHtml } from '../businessKit';
import type { ReportLanguage } from '../composables/useLanguage';
import dePlan from './plans/de';
import enPlan from './plans/en';
import frPlan from './plans/fr';
import nlPlan from './plans/nl';

const plans: Record<BusinessKitLanguage, BusinessKitPlan> = {
  nl: nlPlan,
  en: enPlan,
  fr: frPlan,
  de: dePlan,
};

export type ExampleReportSeo = {
  title: string;
  description: string;
  canonical: string;
};

const seoByLanguage: Record<ReportLanguage, ExampleReportSeo> = {
  nl: {
    title: 'Voorbeeld groeirapport — GrowthKit',
    description:
      'Bekijk een volledig AI-groeirapport voor een Belgische webstudio: positionering, scorecard, 30-dagen actieplan en sales-templates. Genereer je eigen rapport gratis.',
    canonical: 'https://growthkit.jcode.be/example/',
  },
  en: {
    title: 'Sample growth report — GrowthKit',
    description:
      'See a full AI growth report for a Belgian web studio: positioning, scorecard, 30-day action plan and sales templates. Generate your own report free.',
    canonical: 'https://growthkit.jcode.be/example/',
  },
  fr: {
    title: 'Exemple de rapport de croissance — GrowthKit',
    description:
      'Découvrez un rapport de croissance IA complet pour un studio web belge : positionnement, scorecard, plan 30 jours et modèles commerciaux. Générez le vôtre gratuitement.',
    canonical: 'https://growthkit.jcode.be/example/',
  },
  de: {
    title: 'Beispiel-Wachstumsbericht — GrowthKit',
    description:
      'Sehen Sie einen vollständigen KI-Wachstumsbericht für ein belgisches Webstudio: Positionierung, Scorecard, 30-Tage-Plan und Verkaufsvorlagen. Erstellen Sie Ihren eigenen Report gratis.',
    canonical: 'https://growthkit.jcode.be/example/',
  },
};

export function getExampleReportPlan(language: ReportLanguage): BusinessKitPlan {
  return plans[language] ?? plans.nl;
}

export function getExampleReportSeo(language: ReportLanguage): ExampleReportSeo {
  return seoByLanguage[language] ?? seoByLanguage.nl;
}

/** @deprecated Use getExampleReportPlan(siteLanguage) instead. */
export const EXAMPLE_REPORT_PLAN = nlPlan;

/** @deprecated Use getExampleReportSeo(siteLanguage) instead. */
export const EXAMPLE_REPORT_SEO = seoByLanguage.nl;

const EXAMPLE_CTA_HTML = `<header class="gk-example-cta" style="position:sticky;top:0;z-index:99;padding:16px 20px;background:#100d28;border-bottom:1px solid rgba(255,255,255,0.08);font-family:Montserrat,system-ui,sans-serif;color:#fff">
  <div style="max-width:1120px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
    <div>
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#d6a4e3">Voorbeeldrapport</p>
      <p style="margin:0;font-size:15px;font-weight:700">Zo ziet een GrowthKit-rapport eruit — <a href="https://growthkit.jcode.be/?ref=example" style="color:#d6a4e3">genereer je eigen gratis</a></p>
    </div>
    <a href="https://growthkit.jcode.be/?ref=example" style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;background:linear-gradient(135deg,#d6a4e3,#6f6acf);color:#fff;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap">Gratis rapport starten →</a>
  </div>
</header>`;

/** Static, crawler-friendly example page written to dist/example/index.html at build time. */
export function buildStaticExamplePageHtml(): string {
  const reportHtml = buildBusinessKitHtml({ ...nlPlan, showBranding: true });
  const seo = seoByLanguage.nl;
  const desc = seo.description.replace(/"/g, '&quot;');
  const seoHead = `<link rel="canonical" href="${seo.canonical}">
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${seo.title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${seo.canonical}">
  <meta property="og:type" content="article">`;

  return reportHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${seo.title}</title>`)
    .replace('</head>', `${seoHead}\n</head>`)
    .replace('<body', `${EXAMPLE_CTA_HTML}<body`);
}

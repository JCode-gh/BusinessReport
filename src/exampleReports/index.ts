import type { BusinessKitLanguage } from '../businessKit';
import type { BusinessKitPlan } from '../businessKit';
import type { ReportLanguage } from '../composables/useLanguage';
import { exampleCanonical } from '../seo/siteSeo';
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

const seoByLanguage: Record<ReportLanguage, Omit<ExampleReportSeo, 'canonical'>> = {
  nl: {
    title: 'Voorbeeld groeirapport — GrowthKit',
    description:
      'Bekijk een volledig AI-groeirapport voor een Belgische webstudio: positionering, scorecard, 30-dagen actieplan en sales-templates. Genereer je eigen rapport vanaf €5.',
  },
  en: {
    title: 'Sample growth report — GrowthKit',
    description:
      'See a full AI growth report for a Belgian web studio: positioning, scorecard, 30-day action plan and sales templates. Generate your own from €5.',
  },
  fr: {
    title: 'Exemple de rapport de croissance — GrowthKit',
    description:
      'Découvrez un rapport de croissance IA complet pour un studio web belge : positionnement, scorecard, plan 30 jours et modèles commerciaux. Générez le vôtre dès 5 €.',
  },
  de: {
    title: 'Beispiel-Wachstumsbericht — GrowthKit',
    description:
      'Sehen Sie einen vollständigen KI-Wachstumsbericht für ein belgisches Webstudio: Positionierung, Scorecard, 30-Tage-Plan und Verkaufsvorlagen. Erstellen Sie Ihren eigenen Report ab 5 €.',
  },
};

export function getExampleReportPlan(language: ReportLanguage): BusinessKitPlan {
  return plans[language] ?? plans.nl;
}

export function getExampleReportSeo(language: ReportLanguage): ExampleReportSeo {
  const seo = seoByLanguage[language] ?? seoByLanguage.nl;
  return { ...seo, canonical: exampleCanonical(language) };
}

/** @deprecated Use getExampleReportPlan(siteLanguage) instead. */
export const EXAMPLE_REPORT_PLAN = nlPlan;

/** @deprecated Use getExampleReportSeo(siteLanguage) instead. */
export const EXAMPLE_REPORT_SEO = getExampleReportSeo('nl');

export { buildStaticExamplePageHtml } from '../seo/staticPages';

import type { ReportLanguage } from '../composables/useLanguage';
import { applyHomeSeoHead, applySeoHead } from '../composables/useSeoHead';
import {
  exampleHreflangEntries,
  localeTranslations,
  termsCanonical,
} from './siteSeo';
import { getExampleReportSeo } from '../exampleReports';

export function applyRouteSeo(
  routeName: string | undefined,
  language: ReportLanguage,
  explicitLang: boolean,
  options?: { exampleLanguage?: ReportLanguage; noindex?: boolean },
) {
  if (options?.noindex) {
    const copy = localeTranslations[language];
    let title = `${copy.siteDocumentTitle}`;
    if (routeName === 'reports') {
      title = `${copy.reportsPageTitle} · GrowthKit Studio`;
    } else if (routeName === 'report') {
      title = `${copy.reportViewerTitle} · GrowthKit Studio`;
    }
    applySeoHead({
      title,
      description: copy.metaDescription,
      canonical: window.location.origin + window.location.pathname,
      noindex: true,
    });
    return;
  }

  switch (routeName) {
    case 'home':
      applyHomeSeoHead(language, explicitLang);
      break;
    case 'example':
    case 'example-lang': {
      const exampleLang = options?.exampleLanguage ?? language;
      const seo = getExampleReportSeo(exampleLang);
      applySeoHead({
        title: seo.title,
        description: seo.description,
        canonical: seo.canonical,
        language: exampleLang,
        hreflang: exampleHreflangEntries(),
      });
      break;
    }
    case 'terms': {
      const copy = localeTranslations[language];
      applySeoHead({
        title: `${copy.termsPageTitle} · GrowthKit Studio`,
        description: copy.termsMetaDescription,
        canonical: termsCanonical(),
        language,
      });
      break;
    }
    default:
      applyHomeSeoHead(language, explicitLang);
  }
}

export function isExplicitLangParam(): boolean {
  const value = new URLSearchParams(window.location.search).get('lang');
  return value === 'en' || value === 'nl' || value === 'fr' || value === 'de';
}

import type { ReportLanguage } from '../composables/useLanguage';
import nlTranslations from '../locales/nl.json';
import enTranslations from '../locales/en.json';
import frTranslations from '../locales/fr.json';
import deTranslations from '../locales/de.json';

export const SITE_ORIGIN = 'https://growthkit.jcode.be';
export const SITE_NAME = 'GrowthKit';
export const DEFAULT_LANGUAGE: ReportLanguage = 'nl';
export const SEO_LOCALES: ReportLanguage[] = ['nl', 'en', 'fr', 'de'];

export const OG_LOCALES: Record<ReportLanguage, string> = {
  nl: 'nl_NL',
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
};

export const OG_IMAGE = `${SITE_ORIGIN}/brand/og-cover.png`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = 'GrowthKit — AI growth report for entrepreneurs';

export const localeTranslations = {
  nl: nlTranslations,
  en: enTranslations,
  fr: frTranslations,
  de: deTranslations,
} as const;

export type LocaleCopy = (typeof localeTranslations)[ReportLanguage];

export function homeCanonical(language: ReportLanguage, explicit: boolean): string {
  return explicit ? `${SITE_ORIGIN}/?lang=${language}` : `${SITE_ORIGIN}/`;
}

export function homeHreflangUrl(language: ReportLanguage): string {
  return `${SITE_ORIGIN}/?lang=${language}`;
}

export function exampleCanonical(language: ReportLanguage): string {
  return language === 'nl' ? `${SITE_ORIGIN}/example/` : `${SITE_ORIGIN}/example/${language}/`;
}

export function exampleHreflangUrl(language: ReportLanguage): string {
  return exampleCanonical(language);
}

export function termsCanonical(): string {
  return `${SITE_ORIGIN}/terms`;
}

export type HreflangEntry = { lang: string; href: string };

export function homeHreflangEntries(): HreflangEntry[] {
  return [
    ...SEO_LOCALES.map((lang) => ({ lang, href: homeHreflangUrl(lang) })),
    { lang: 'x-default', href: `${SITE_ORIGIN}/` },
  ];
}

export function exampleHreflangEntries(): HreflangEntry[] {
  return [
    ...SEO_LOCALES.map((lang) => ({ lang, href: exampleHreflangUrl(lang) })),
    { lang: 'x-default', href: exampleCanonical('nl') },
  ];
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderHreflangLinks(entries: HreflangEntry[]): string {
  return entries
    .map(
      (entry) =>
        `<link rel="alternate" hreflang="${escapeHtml(entry.lang)}" href="${escapeHtml(entry.href)}">`,
    )
    .join('\n    ');
}

export function getHomeSeoCopy(language: ReportLanguage): {
  title: string;
  description: string;
} {
  const copy = localeTranslations[language];
  return {
    title: copy.siteDocumentTitle,
    description: copy.metaDescription,
  };
}

import { ref, computed } from 'vue';
import nlTranslations from '../locales/nl.json';
import enTranslations from '../locales/en.json';
import frTranslations from '../locales/fr.json';
import deTranslations from '../locales/de.json';

export type ReportLanguage = 'en' | 'nl' | 'fr' | 'de';

export const languageOptions: Array<{ value: ReportLanguage; label: string }> = [
  { value: 'nl', label: 'Nederlands' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

const translations = {
  nl: nlTranslations,
  en: enTranslations,
  fr: frTranslations,
  de: deTranslations,
} as const;

const SITE_ORIGIN = 'https://growthkit.jcode.be';
const SEO_LOCALES: ReportLanguage[] = ['nl', 'en', 'fr', 'de'];
const OG_LOCALES: Record<ReportLanguage, string> = {
  nl: 'nl_NL',
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
};

const FALLBACK_LANGUAGE: ReportLanguage = 'en';
const languagePreferenceStorageKey = 'business-kit-language';
const languageExplicitStorageKey = 'business-kit-language-explicit';

const siteLanguage = ref<ReportLanguage>(FALLBACK_LANGUAGE);

function normalizeLanguage(value: unknown): ReportLanguage {
  if (value === 'en' || value === 'nl' || value === 'fr' || value === 'de') {
    return value;
  }
  return FALLBACK_LANGUAGE;
}

function readExplicitLanguagePreference(): ReportLanguage | null {
  if (localStorage.getItem(languageExplicitStorageKey) !== '1') return null;
  return readLanguagePreference();
}

function readLanguagePreference(): ReportLanguage | null {
  const value = localStorage.getItem(languagePreferenceStorageKey);
  return value === null ? null : normalizeLanguage(value);
}

function detectBrowserLanguage(): ReportLanguage {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const code = raw.toLowerCase().split('-')[0];
    if (code === 'nl' || code === 'en' || code === 'fr' || code === 'de') return code;
  }
  return FALLBACK_LANGUAGE;
}

function persistLanguagePreference(language: ReportLanguage) {
  localStorage.setItem(languagePreferenceStorageKey, language);
  localStorage.setItem(languageExplicitStorageKey, '1');
}

function upsertHeadTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function updateSeoHead(language: ReportLanguage, explicit: boolean) {
  const description = translations[language].heroCopy;
  const canonical = explicit ? `${SITE_ORIGIN}/?lang=${language}` : `${SITE_ORIGIN}/`;

  upsertHeadTag(
    'meta[name="description"]',
    () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      return m;
    },
    'content',
    description
  );

  upsertHeadTag(
    'meta[property="og:description"]',
    () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:description');
      return m;
    },
    'content',
    description
  );

  upsertHeadTag(
    'meta[name="twitter:description"]',
    () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'twitter:description');
      return m;
    },
    'content',
    description
  );

  upsertHeadTag(
    'link[rel="canonical"]',
    () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    },
    'href',
    canonical
  );

  upsertHeadTag(
    'meta[property="og:url"]',
    () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:url');
      return m;
    },
    'content',
    canonical
  );

  upsertHeadTag(
    'meta[property="og:locale"]',
    () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:locale');
      return m;
    },
    'content',
    OG_LOCALES[language]
  );

  document.head.querySelectorAll('link[data-i18n-alt]').forEach((node) => node.remove());
  for (const locale of SEO_LOCALES) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', locale);
    link.setAttribute('href', `${SITE_ORIGIN}/?lang=${locale}`);
    link.setAttribute('data-i18n-alt', '');
    document.head.appendChild(link);
  }
  const xDefault = document.createElement('link');
  xDefault.setAttribute('rel', 'alternate');
  xDefault.setAttribute('hreflang', 'x-default');
  xDefault.setAttribute('href', `${SITE_ORIGIN}/`);
  xDefault.setAttribute('data-i18n-alt', '');
  document.head.appendChild(xDefault);
}

function setSiteLanguage(language: ReportLanguage, explicit = false) {
  siteLanguage.value = language;
  document.documentElement.lang = language;
  if (explicit) {
    persistLanguagePreference(language);
  }
  updateSeoHead(language, explicit);
}

function getLangParam(): ReportLanguage | null {
  const value = new URLSearchParams(window.location.search).get('lang');
  if (value === 'en' || value === 'nl' || value === 'fr' || value === 'de') {
    return value;
  }
  return null;
}

export function initializeLanguage(): ReportLanguage {
  const langParam = getLangParam();
  if (langParam) {
    setSiteLanguage(langParam, true);
    return langParam;
  }

  const explicitSaved = readExplicitLanguagePreference();
  if (explicitSaved) {
    setSiteLanguage(explicitSaved, false);
    return explicitSaved;
  }

  const detected = detectBrowserLanguage();
  setSiteLanguage(detected, false);
  return detected;
}

export function useLanguage() {
  const ui = computed(() => translations[siteLanguage.value]);

  const selectedLanguageLabel = computed(() => {
    return languageOptions.find((lang) => lang.value === siteLanguage.value)?.label ?? 'English';
  });

  return {
    siteLanguage,
    ui,
    selectedLanguageLabel,
    languageOptions,
    setSiteLanguage,
    initializeLanguage,
    normalizeLanguage,
  };
}

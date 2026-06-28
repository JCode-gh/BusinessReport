import type { ReportLanguage } from './composables/useLanguage';

const EMAIL = 'info@jcode.be';

const subjects: Record<ReportLanguage, string> = {
  nl: 'GrowthKit gratis proberen',
  en: 'GrowthKit free trial',
  fr: 'GrowthKit essai gratuit',
  de: 'GrowthKit kostenlos testen',
};

export function freeTrialMailtoHref(language: ReportLanguage): string {
  const subject = subjects[language] ?? subjects.en;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export const FREE_TRIAL_EMAIL = EMAIL;

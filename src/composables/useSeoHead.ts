import type { ReportLanguage } from './useLanguage';
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  OG_LOCALES,
  SEO_LOCALES,
  getHomeSeoCopy,
  homeCanonical,
  homeHreflangEntries,
  type HreflangEntry,
} from '../seo/siteSeo';

export type SeoHeadOptions = {
  title: string;
  description: string;
  canonical: string;
  language?: ReportLanguage;
  hreflang?: HreflangEntry[];
  noindex?: boolean;
};

const HREFLANG_ATTR = 'data-seo-hreflang';
const LOCALE_ALT_ATTR = 'data-seo-locale-alt';

function upsertHeadTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function removeManagedTags(selector: string) {
  document.head.querySelectorAll(selector).forEach((node) => node.remove());
}

function upsertMeta(nameOrProperty: string, value: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  upsertHeadTag(
    `meta[${attr}="${nameOrProperty}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute(attr, nameOrProperty);
      return m;
    },
    'content',
    value,
  );
}

function upsertLink(rel: string, href: string) {
  upsertHeadTag(
    `link[rel="${rel}"]`,
    () => {
      const l = document.createElement('link');
      l.setAttribute('rel', rel);
      return l;
    },
    'href',
    href,
  );
}

export function applySeoHead(options: SeoHeadOptions) {
  const { title, description, canonical, language, hreflang, noindex } = options;

  document.title = title;

  upsertMeta('description', description);
  upsertMeta('og:title', title, true);
  upsertMeta('og:description', description, true);
  upsertMeta('og:url', canonical, true);
  upsertMeta('og:type', 'website', true);
  upsertMeta('og:image', OG_IMAGE, true);
  upsertMeta('og:image:width', String(OG_IMAGE_WIDTH), true);
  upsertMeta('og:image:height', String(OG_IMAGE_HEIGHT), true);
  upsertMeta('og:image:alt', OG_IMAGE_ALT, true);
  upsertMeta('twitter:card', 'summary_large_image');
  upsertMeta('twitter:title', title);
  upsertMeta('twitter:description', description);
  upsertMeta('twitter:image', OG_IMAGE);

  upsertLink('canonical', canonical);

  if (language) {
    upsertMeta('og:locale', OG_LOCALES[language], true);
    removeManagedTags(`meta[property="og:locale:alternate"][${LOCALE_ALT_ATTR}]`);
    for (const locale of SEO_LOCALES) {
      if (locale === language) continue;
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:locale:alternate');
      m.setAttribute('content', OG_LOCALES[locale]);
      m.setAttribute(LOCALE_ALT_ATTR, '');
      document.head.appendChild(m);
    }
  }

  removeManagedTags(`link[${HREFLANG_ATTR}]`);
  if (hreflang?.length) {
    for (const entry of hreflang) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', entry.lang);
      link.setAttribute('href', entry.href);
      link.setAttribute(HREFLANG_ATTR, '');
      document.head.appendChild(link);
    }
  }

  if (noindex) {
    upsertMeta('robots', 'noindex, nofollow');
  } else {
    document.head.querySelector('meta[name="robots"]')?.remove();
  }
}

export function applyHomeSeoHead(language: ReportLanguage, explicit: boolean) {
  const copy = getHomeSeoCopy(language);
  applySeoHead({
    title: copy.title,
    description: copy.description,
    canonical: homeCanonical(language, explicit),
    language,
    hreflang: homeHreflangEntries(),
  });
}

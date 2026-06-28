import type { ReportLanguage } from '../composables/useLanguage';
import {
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  getHomeSeoCopy,
  localeTranslations,
} from './siteSeo';

export function buildJsonLdBlocks(language: ReportLanguage = 'en'): string {
  const copy = localeTranslations[language];
  const homeSeo = getHomeSeoCopy(language);

  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${SITE_ORIGIN}/`,
    image: OG_IMAGE,
    description: homeSeo.description,
    offers: {
      '@type': 'Offer',
      price: '5',
      priceCurrency: 'EUR',
      description: 'Report credits from €5 (1 report), €20 (5 reports), or €35 (10 reports)',
    },
    inLanguage: ['nl', 'en', 'fr', 'de'],
    author: {
      '@type': 'Organization',
      name: 'jcode.be',
      url: 'https://jcode.be',
    },
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'jcode.be',
    url: 'https://jcode.be',
    logo: OG_IMAGE,
    email: 'info@jcode.be',
    sameAs: ['https://growthkit.jcode.be/'],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    inLanguage: ['nl', 'en', 'fr', 'de'],
    publisher: {
      '@type': 'Organization',
      name: 'jcode.be',
      url: 'https://jcode.be',
    },
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.proofCards.map((card: { title: string; body: string }) => ({
      '@type': 'Question',
      name: card.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: card.body,
      },
    })),
  };

  return [softwareApplication, organization, website, faqPage]
    .map((block) => `<script type="application/ld+json">${JSON.stringify(block)}</script>`)
    .join('\n    ');
}

export function buildSitemapXml(lastmod: string): string {
  const homeUrls = (['nl', 'en', 'fr', 'de'] as ReportLanguage[]).map((lang) => {
    const loc = lang === 'nl' ? `${SITE_ORIGIN}/?lang=nl` : `${SITE_ORIGIN}/?lang=${lang}`;
    const hreflang = (['nl', 'en', 'fr', 'de'] as ReportLanguage[])
      .map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${alt}" href="${SITE_ORIGIN}/?lang=${alt}"/>`,
      )
      .join('\n');
    return `  <url>
    <loc>${loc}</loc>
${hreflang}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;
  });

  const exampleUrls = (['nl', 'en', 'fr', 'de'] as ReportLanguage[]).map((lang) => {
    const loc =
      lang === 'nl' ? `${SITE_ORIGIN}/example/` : `${SITE_ORIGIN}/example/${lang}/`;
    const hreflang = (['nl', 'en', 'fr', 'de'] as ReportLanguage[])
      .map((alt) => {
        const href =
          alt === 'nl' ? `${SITE_ORIGIN}/example/` : `${SITE_ORIGIN}/example/${alt}/`;
        return `    <xhtml:link rel="alternate" hreflang="${alt}" href="${href}"/>`;
      })
      .join('\n');
    return `  <url>
    <loc>${loc}</loc>
${hreflang}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/example/"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE_ORIGIN}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${homeUrls.join('\n')}
${exampleUrls.join('\n')}
  <url>
    <loc>${SITE_ORIGIN}/terms</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
`;
}

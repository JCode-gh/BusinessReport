<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Sparkles, ArrowRight } from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';
import { buildBusinessKitHtml } from '../businessKit';
import { EXAMPLE_REPORT_PLAN, EXAMPLE_REPORT_SEO } from '../exampleReportPlan';
import { track } from '../analytics';

const router = useRouter();
const { ui, siteLanguage } = useLanguage();

const exampleCopy: Record<string, { eyebrow: string; title: string; body: string; cta: string }> = {
  nl: {
    eyebrow: 'Voorbeeldrapport',
    title: 'Zo ziet een GrowthKit-rapport eruit',
    body: 'Dit is een echte sample-output — positionering, scorecard, actieplan en templates. Jouw rapport wordt op maat gegenereerd uit jouw businessbrief.',
    cta: 'Genereer je gratis rapport',
  },
  en: {
    eyebrow: 'Sample report',
    title: 'This is what a GrowthKit report looks like',
    body: 'A real sample output — positioning, scorecard, action plan and templates. Your report is generated from your own business brief.',
    cta: 'Generate your free report',
  },
  fr: {
    eyebrow: 'Rapport exemple',
    title: 'Voici à quoi ressemble un rapport GrowthKit',
    body: 'Un vrai exemple — positionnement, scorecard, plan d\'action et modèles. Votre rapport est généré à partir de votre brief.',
    cta: 'Générez votre rapport gratuit',
  },
  de: {
    eyebrow: 'Beispielbericht',
    title: 'So sieht ein GrowthKit-Bericht aus',
    body: 'Echte Beispielausgabe — Positionierung, Scorecard, Aktionsplan und Vorlagen. Ihr Bericht wird aus Ihrem Brief generiert.',
    cta: 'Kostenlosen Bericht generieren',
  },
};

const copy = computed(() => exampleCopy[siteLanguage.value] ?? exampleCopy.nl);
const reportHtml = computed(() => buildBusinessKitHtml(EXAMPLE_REPORT_PLAN));

function goGenerate() {
  router.push({ path: '/', hash: '#brief' });
}

onMounted(() => {
  document.title = EXAMPLE_REPORT_SEO.title;

  const upsert = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
    let el = document.head.querySelector(selector) as HTMLElement | null;
    if (!el) {
      el = create();
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  upsert(
    'meta[name="description"]',
    () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      return m;
    },
    'content',
    EXAMPLE_REPORT_SEO.description,
  );

  upsert(
    'link[rel="canonical"]',
    () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    },
    'href',
    EXAMPLE_REPORT_SEO.canonical,
  );

  track('example_viewed');
});
</script>

<template>
  <div class="example-shell">
    <header class="example-cta-bar">
      <div class="example-cta-inner">
        <div>
          <p class="example-eyebrow">{{ copy.eyebrow }}</p>
          <h1>{{ copy.title }}</h1>
          <p class="example-body">{{ copy.body }}</p>
        </div>
        <button class="primary-link example-cta-btn" type="button" @click="goGenerate">
          <Sparkles :size="18" />
          {{ copy.cta }}
          <ArrowRight :size="17" />
        </button>
      </div>
    </header>

    <iframe
      class="example-report-frame"
      title="GrowthKit voorbeeld groeirapport"
      :srcdoc="reportHtml"
      sandbox="allow-scripts allow-same-origin"
    />
  </div>
</template>

<style scoped>
.example-shell {
  min-height: 100vh;
  background: var(--bg);
}

.example-cta-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid var(--line-strong);
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  backdrop-filter: blur(10px);
}

.example-cta-inner {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.example-eyebrow {
  margin: 0 0 4px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}

.example-cta-inner h1 {
  margin: 0 0 6px;
  font-size: clamp(1.1rem, 2.5vw, 1.45rem);
  font-weight: 800;
  color: var(--ink);
}

.example-body {
  margin: 0;
  font-size: 0.88rem;
  color: var(--muted);
  max-width: 52ch;
  line-height: 1.5;
}

.example-cta-btn {
  flex-shrink: 0;
  white-space: nowrap;
}

.example-report-frame {
  display: block;
  width: 100%;
  min-height: calc(100vh - 120px);
  border: 0;
  background: #fff;
}

@media (max-width: 720px) {
  .example-cta-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .example-cta-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>

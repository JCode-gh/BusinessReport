<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-vue-next';
import { buildBusinessKitHtml } from '../businessKit';
import { patchHtmlForEditing } from '../patchHtmlForEditing';
import { getExampleReportPlan } from '../exampleReports';
import { useLanguage } from '../composables/useLanguage';
import type { ReportLanguage } from '../composables/useLanguage';
import { useGenerateCTA } from '../composables/useGenerateCTA';

const props = withDefaults(
  defineProps<{
    variant?: 'hero' | 'section' | 'page';
    hideGenerate?: boolean;
    language?: ReportLanguage;
  }>(),
  { variant: 'hero', hideGenerate: false },
);

const emit = defineEmits<{
  generate: [];
}>();

const router = useRouter();
const { ui, siteLanguage } = useLanguage();
const { generateButtonLabel } = useGenerateCTA();

const reportLanguage = computed(() => props.language ?? siteLanguage.value);

const reportHtml = computed(() => {
  const plan = getExampleReportPlan(reportLanguage.value);
  return patchHtmlForEditing(
    buildBusinessKitHtml({ ...plan, showBranding: props.variant === 'page' }),
  );
});

function openFullExample() {
  const lang = reportLanguage.value;
  if (lang === 'nl') {
    router.push('/example');
  } else {
    router.push(`/example/${lang}`);
  }
}

function onGenerate() {
  emit('generate');
}
</script>

<template>
  <div
    class="example-showcase"
    :class="[`example-showcase--${variant}`]"
    :aria-label="ui.exampleShowcaseAria"
  >
    <header v-if="variant === 'section' || variant === 'page'" class="example-showcase-header">
      <div>
        <p class="example-showcase-eyebrow">{{ ui.exampleShowcaseEyebrow }}</p>
        <h2 v-if="variant === 'section'" id="example-section-title" class="example-showcase-title">
          {{ ui.exampleShowcaseTitle }}
        </h2>
        <h1 v-else class="example-showcase-title">{{ ui.exampleShowcaseTitle }}</h1>
        <p class="example-showcase-lead">{{ ui.exampleShowcaseLead }}</p>
      </div>
      <button
        v-if="variant === 'page'"
        class="primary-link example-showcase-cta"
        type="button"
        @click="onGenerate"
      >
        <Sparkles :size="18" />
        {{ generateButtonLabel }}
        <ArrowRight :size="17" />
      </button>
    </header>

    <div class="example-browser" :class="{ 'example-browser--hero': variant === 'hero' }">
      <div class="example-browser-chrome">
        <span class="example-browser-dots" aria-hidden="true">
          <i></i><i></i><i></i>
        </span>
        <span class="example-browser-url">{{ ui.exampleShowcaseUrl }}</span>
      </div>

      <div class="example-browser-viewport">
        <iframe
          class="example-browser-frame"
          :title="ui.exampleShowcaseFrameTitle"
          :srcdoc="reportHtml"
          sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups"
          loading="lazy"
        />
      </div>
    </div>

    <div v-if="variant !== 'page'" class="example-showcase-actions">
      <button class="secondary-link example-showcase-open" type="button" @click="openFullExample">
        <ExternalLink :size="15" />
        {{ ui.exampleShowcaseOpenFull }}
      </button>
      <button
        v-if="!hideGenerate"
        class="primary-link example-showcase-generate"
        type="button"
        @click="onGenerate"
      >
        <Sparkles :size="17" />
        {{ generateButtonLabel }}
        <ArrowRight :size="16" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.example-showcase {
  width: 100%;
}

.example-showcase--hero {
  height: 100%;
}

.example-showcase-header {
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.example-showcase-eyebrow {
  margin: 0 0 6px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}

.example-showcase-title {
  margin: 0 0 8px;
  font-size: clamp(1.35rem, 3vw, 1.85rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--ink);
}

.example-showcase-lead {
  margin: 0;
  max-width: 52ch;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--muted);
}

.example-showcase-cta {
  flex-shrink: 0;
  white-space: nowrap;
}

.example-browser {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  background: #100d28;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.18),
    0 24px 56px rgba(0, 0, 0, 0.28);
}

.example-showcase--section .example-browser,
.example-showcase--page .example-browser {
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
}

.example-browser-chrome {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(180deg, #f9fafb, #f3f4f6);
}

.example-browser-dots {
  display: inline-flex;
  gap: 6px;
}

.example-browser-dots i {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d1d5db;
}

.example-browser-dots i:nth-child(1) {
  background: #fca5a5;
}

.example-browser-dots i:nth-child(2) {
  background: #fcd34d;
}

.example-browser-dots i:nth-child(3) {
  background: #86efac;
}

.example-browser-url {
  flex: 1;
  min-width: 0;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #6b7280;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.example-browser-viewport {
  position: relative;
  height: 560px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  scrollbar-width: thin;
}

.example-browser--hero .example-browser-viewport {
  height: 580px;
}

.example-showcase--section .example-browser-viewport,
.example-showcase--page .example-browser-viewport {
  height: min(78vh, 820px);
}

.example-browser-frame {
  display: block;
  width: 100%;
  height: 1400px;
  border: 0;
  pointer-events: auto;
}

.example-showcase-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
}

.example-showcase--section .example-showcase-actions {
  width: min(1280px, calc(100% - 32px));
  margin: 18px auto 0;
  justify-content: flex-start;
}

.example-showcase-open,
.example-showcase-generate {
  font-size: 0.88rem;
}

.example-showcase--hero .example-showcase-actions {
  margin-top: 12px;
}

@media (max-width: 720px) {
  .example-showcase-header {
    flex-direction: column;
  }

  .example-showcase-cta,
  .example-showcase-generate {
    width: 100%;
  }

  .example-browser--hero .example-browser-viewport {
    height: 460px;
  }

  .example-showcase--section .example-browser-viewport {
    height: min(72vh, 640px);
  }

  .example-showcase--page .example-browser-viewport {
    height: min(68vh, 560px);
  }

  .example-showcase--page .example-showcase-header {
    width: calc(100% - 32px);
  }
}
</style>

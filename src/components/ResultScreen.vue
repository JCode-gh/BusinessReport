<script setup lang="ts">
import { computed } from 'vue';
import { AlertCircle, CheckCircle2, FileText, LogIn, Sparkles } from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';
import { useReportGeneration } from '../composables/useReportGeneration';
import { useReportManagement } from '../composables/useReportManagement';
import { useAuth } from '../useAuth';

const emit = defineEmits<{
  (e: 'openReport'): void;
  (e: 'downloadPdf'): void;
  (e: 'goHome'): void;
  (e: 'retry'): void;
  (e: 'showAuth'): void;
}>();

const { ui, selectedLanguageLabel } = useLanguage();
const { status, errorMessage, currentPlan, fileName, lastGeneratedAt, pdfDownloading, reportHtml } =
  useReportGeneration();
const { user } = useAuth();
const { savedReportId } = useReportManagement();

const resultDescription = computed(() => {
  return ui.value.resultDescription.replace('{language}', selectedLanguageLabel.value);
});
</script>

<template>
  <!-- Error Screen -->
  <section v-if="status === 'error'" class="error-screen" aria-labelledby="error-title">
    <div class="error-panel">
      <AlertCircle :size="40" aria-hidden="true" />
      <p class="eyebrow">{{ ui.errorEyebrow }}</p>
      <h2 id="error-title">{{ ui.errorTitle }}</h2>
      <p class="error-text">{{ errorMessage }}</p>
      <div class="result-actions">
        <button class="result-primary" type="button" @click="emit('retry')">
          <Sparkles :size="19" />
          {{ ui.errorRetry }}
        </button>
        <button class="result-secondary" type="button" @click="emit('goHome')">
          {{ ui.errorDismiss }}
        </button>
      </div>
    </div>
  </section>

  <!-- Success Screen -->
  <section v-if="status === 'success'" class="result-screen" aria-labelledby="result-title">
    <div class="result-hero">
      <div class="result-copy">
        <p class="eyebrow">{{ ui.resultEyebrow }}</p>
        <h2 id="result-title">{{ ui.resultTitle }}</h2>
        <p>{{ resultDescription }}</p>
        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

        <div class="result-actions">
          <button class="result-primary" type="button" @click="emit('openReport')" :disabled="!reportHtml">
            {{ ui.openReport }}
          </button>
          <button
            class="result-secondary"
            type="button"
            @click="emit('downloadPdf')"
            :disabled="!reportHtml || pdfDownloading"
          >
            <FileText :size="19" />
            <span v-if="pdfDownloading">{{ ui.preparingPdf }}</span>
            <span v-else>{{ ui.downloadPdf }}</span>
          </button>
          <button class="result-secondary" type="button" @click="emit('goHome')">
            {{ ui.backToBrief }}
          </button>
        </div>

        <!-- Save status (no link shown) -->
        <div v-if="savedReportId" class="report-save-panel">
          <div class="report-save-status">
            <CheckCircle2 :size="15" />
            <span>{{ ui.reportSaved }}</span>
          </div>
        </div>
        <div v-else-if="!user" class="report-save-panel report-save-panel--cta">
          <button class="report-signin-cta" type="button" @click="emit('showAuth')">
            <LogIn :size="15" />
            {{ ui.signInToSave }}
          </button>
        </div>
      </div>

      <div class="result-card" :aria-label="ui.generatedReportDetails">
        <div class="result-card-top">
          <span class="success-badge">
            <CheckCircle2 :size="17" />
            {{ ui.ready }}
          </span>
          <span>{{ lastGeneratedAt }}</span>
        </div>
        <h3>{{ currentPlan?.title ?? fileName }}</h3>
        <div class="result-list">
          <div>
            <span>{{ ui.language }}</span>
            <strong>{{ selectedLanguageLabel }}</strong>
          </div>
          <div>
            <span>{{ ui.includes }}</span>
            <strong>{{ ui.includesText }}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

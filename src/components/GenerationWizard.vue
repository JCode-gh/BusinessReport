<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';
import { X, ArrowRight, Sparkles } from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';
import { form, useReportGeneration } from '../composables/useReportGeneration';
import { REPORT_THEMES, type ReportThemeKey } from '../businessKit';
import { useNotification } from '../composables/useNotification';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'generate'): void;
}>();

const { ui, siteLanguage } = useLanguage();
const { canGenerate, resetBriefForm } = useReportGeneration();
const { showNotification } = useNotification();

const WIZARD_TOTAL = 8;
const currentStep = ref(0);
const wizardForward = ref(true);

const wizardProgress = computed(() => Math.round(((currentStep.value + 1) / WIZARD_TOTAL) * 100));

const tonePresets = computed(() => ui.value.tonePresets);

function closeWizard() {
  emit('update:modelValue', false);
}

function goNext() {
  if (currentStep.value < WIZARD_TOTAL - 1) {
    wizardForward.value = true;
    currentStep.value++;
  }
}

function goPrev() {
  if (currentStep.value > 0) {
    wizardForward.value = false;
    currentStep.value--;
  }
}

function onInputKey(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (currentStep.value === WIZARD_TOTAL - 1) generateAndClose();
    else goNext();
  }
  if (e.key === 'Escape') closeWizard();
}

function onTextareaKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    if (currentStep.value === WIZARD_TOTAL - 1) generateAndClose();
    else goNext();
  }
  if (e.key === 'Escape') closeWizard();
}

function generateAndClose() {
  if (!canGenerate.value) {
    showNotification(
      ui.value.validationErrorTitle,
      ui.value.validationErrorMessage,
      'error'
    );
    return;
  }
  closeWizard();
  emit('generate');
}

function useTone(tone: string) {
  form.tone = tone;
}

function changeLanguage(event: Event) {
  const nextLanguage = (event.target as HTMLSelectElement).value as any;
  form.language = nextLanguage;
}

watch(currentStep, () => {
  nextTick(() => {
    const el = document.querySelector<HTMLElement>(
      '.wizard-step input, .wizard-step textarea, .wizard-step select'
    );
    el?.focus();
  });
});

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      resetBriefForm();
      currentStep.value = 0;
      wizardForward.value = true;
    }
  }
);
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="wizard-overlay" role="dialog" aria-modal="true">
      <div class="wizard-header">
        <button class="wizard-close" type="button" @click="closeWizard" aria-label="Sluiten">
          <X :size="20" />
        </button>
        <div class="wizard-progress-track" aria-hidden="true">
          <div class="wizard-progress-fill" :style="{ width: wizardProgress + '%' }"></div>
        </div>
        <span class="wizard-counter" aria-live="polite"
          >{{ String(currentStep + 1).padStart(2, '0') }} / {{ String(WIZARD_TOTAL).padStart(2, '0') }}</span
        >
      </div>

      <div class="wizard-body">
        <Transition :name="wizardForward ? 'wz-fwd' : 'wz-bwd'" mode="out-in">
          <div class="wizard-step" :key="currentStep">
            <!-- Step 0: Naam + Markt -->
            <template v-if="currentStep === 0">
              <p class="wz-eyebrow">{{ ui.briefEyebrow }}</p>
              <h2 class="wz-question">{{ ui.businessName }}</h2>
              <div class="wz-fields">
                <label class="wz-field">
                  <span class="wz-label">{{ ui.businessName }}</span>
                  <input
                    v-model="form.businessName"
                    type="text"
                    :placeholder="ui.businessNamePlaceholder"
                    @keydown="onInputKey"
                    autofocus
                  />
                </label>
                <label class="wz-field">
                  <span class="wz-label">{{ ui.market }}</span>
                  <input
                    v-model="form.region"
                    type="text"
                    :placeholder="ui.marketPlaceholder"
                    @keydown="onInputKey"
                  />
                </label>
              </div>
            </template>

            <!-- Step 1: Type bedrijf -->
            <template v-else-if="currentStep === 1">
              <p class="wz-eyebrow">02 — {{ ui.businessType }}</p>
              <h2 class="wz-question">{{ ui.businessType }}</h2>
              <div class="wz-fields">
                <label class="wz-field wz-field--full">
                  <textarea
                    v-model="form.businessType"
                    rows="4"
                    :placeholder="ui.businessTypePlaceholder"
                    @keydown="onTextareaKey"
                  ></textarea>
                  <span class="wz-hint">⌘ + Enter ↵</span>
                </label>
              </div>
            </template>

            <!-- Step 2: Huidig aanbod -->
            <template v-else-if="currentStep === 2">
              <p class="wz-eyebrow">03 — {{ ui.currentOffer }}</p>
              <h2 class="wz-question">{{ ui.currentOffer }}</h2>
              <div class="wz-fields">
                <label class="wz-field wz-field--full">
                  <textarea
                    v-model="form.offer"
                    rows="4"
                    :placeholder="ui.currentOfferPlaceholder"
                    @keydown="onTextareaKey"
                  ></textarea>
                  <span class="wz-hint">⌘ + Enter ↵</span>
                </label>
              </div>
            </template>

            <!-- Step 3: Doelklant -->
            <template v-else-if="currentStep === 3">
              <p class="wz-eyebrow">04 — {{ ui.targetCustomer }}</p>
              <h2 class="wz-question">{{ ui.targetCustomer }}</h2>
              <div class="wz-fields">
                <label class="wz-field wz-field--full">
                  <textarea
                    v-model="form.audience"
                    rows="4"
                    :placeholder="ui.targetCustomerPlaceholder"
                    @keydown="onTextareaKey"
                  ></textarea>
                  <span class="wz-hint">⌘ + Enter ↵</span>
                </label>
              </div>
            </template>

            <!-- Step 4: Probleem -->
            <template v-else-if="currentStep === 4">
              <p class="wz-eyebrow">05 — {{ ui.mainProblem }}</p>
              <h2 class="wz-question">{{ ui.mainProblem }}</h2>
              <div class="wz-fields">
                <label class="wz-field wz-field--full">
                  <textarea
                    v-model="form.problem"
                    rows="4"
                    :placeholder="ui.mainProblemPlaceholder"
                    @keydown="onTextareaKey"
                  ></textarea>
                  <span class="wz-hint">⌘ + Enter ↵</span>
                </label>
              </div>
            </template>

            <!-- Step 5: Doel -->
            <template v-else-if="currentStep === 5">
              <p class="wz-eyebrow">06 — {{ ui.goal }}</p>
              <h2 class="wz-question">{{ ui.goal }}</h2>
              <div class="wz-fields">
                <label class="wz-field wz-field--full">
                  <textarea
                    v-model="form.goal"
                    rows="4"
                    :placeholder="ui.goalPlaceholder"
                    @keydown="onTextareaKey"
                  ></textarea>
                  <span class="wz-hint">⌘ + Enter ↵</span>
                </label>
              </div>
            </template>

            <!-- Step 6: Kanalen + Prijsniveau -->
            <template v-else-if="currentStep === 6">
              <p class="wz-eyebrow">07 — {{ ui.channels }}</p>
              <h2 class="wz-question">{{ ui.channels }}</h2>
              <div class="wz-fields">
                <label class="wz-field wz-field--full">
                  <span class="wz-label">{{ ui.channels }}</span>
                  <textarea
                    v-model="form.channels"
                    rows="3"
                    :placeholder="ui.channelsPlaceholder"
                    @keydown="onTextareaKey"
                  ></textarea>
                </label>
                <label class="wz-field">
                  <span class="wz-label">{{ ui.pricePoint }}</span>
                  <input
                    v-model="form.pricePoint"
                    type="text"
                    :placeholder="ui.pricePointPlaceholder"
                    @keydown="onInputKey"
                  />
                </label>
              </div>
            </template>

            <!-- Step 7: Taal + Toon + Generate -->
            <template v-else-if="currentStep === 7">
              <p class="wz-eyebrow">08 — {{ ui.reportLanguage }}</p>
              <h2 class="wz-question">{{ ui.reportLanguage }} &amp; {{ ui.reportTone }}</h2>
              <div class="wz-fields">
                <label class="wz-field">
                  <span class="wz-label">{{ ui.reportLanguage }}</span>
                  <select :value="form.language" @change="changeLanguage">
                    <option value="nl">Nederlands</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </label>
                <label class="wz-field">
                  <span class="wz-label">{{ ui.reportTone }}</span>
                  <input
                    v-model="form.tone"
                    type="text"
                    :placeholder="ui.reportTonePlaceholder"
                    @keydown="onInputKey"
                  />
                </label>
                <div class="wz-presets" :aria-label="ui.tonePresetsAria">
                  <button
                    v-for="preset in tonePresets"
                    :key="preset"
                    type="button"
                    class="preset-button"
                    @click="useTone(preset)"
                  >
                    {{ preset }}
                  </button>
                </div>
                <div class="wz-field">
                  <span class="wz-label">{{ ui.reportTheme }}</span>
                  <div class="wz-theme-swatches">
                    <button
                      v-for="(theme, key) in REPORT_THEMES"
                      :key="key"
                      type="button"
                      class="theme-swatch"
                      :style="{
                        background: theme.swatch,
                        boxShadow:
                          form.reportTheme === key
                            ? `0 0 0 2.5px #fff, 0 0 0 4.5px ${theme.swatch}`
                            : 'none',
                      }"
                      :title="theme.label"
                      :aria-label="theme.label"
                      @click="form.reportTheme = key as ReportThemeKey"
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </Transition>
      </div>

      <div class="wizard-footer">
        <button v-if="currentStep > 0" class="wizard-back" type="button" @click="goPrev">
          ← {{ ui.backToBrief.split(' ')[0] }}
        </button>
        <div class="wizard-footer-right">
          <button
            v-if="currentStep < WIZARD_TOTAL - 1"
            class="wizard-next"
            type="button"
            @click="goNext"
          >
            OK <ArrowRight :size="16" />
          </button>
          <button
            v-else
            class="wizard-generate"
            type="button"
            @click="generateAndClose"
            :disabled="!canGenerate"
          >
            <Sparkles :size="18" />
            {{ ui.actionGenerate }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

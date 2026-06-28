<script setup lang="ts">
import '../styles/generation.css';
import { computed } from 'vue';
import { Clock } from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';
import { form, useReportGeneration } from '../composables/useReportGeneration';

type GenerationStep = {
  title: string;
  detail: string;
};

const { ui, selectedLanguageLabel } = useLanguage();
const { loadingProgress, apiCharsReceived, waitingRoom, waitingCountdownPercent } = useReportGeneration();

const generationSteps = computed<GenerationStep[]>(() => [...ui.value.generationSteps]);

const loadingStepIndex = computed(() => {
  const total = generationSteps.value.length;
  return Math.min(Math.floor((loadingProgress.value / 100) * total), total - 1);
});

const currentLoadingStep = computed(() => {
  return generationSteps.value[loadingStepIndex.value];
});
</script>

<template>
  <div class="loading-overlay" role="status" aria-live="polite" :aria-label="ui.loadingAria">
    <div class="generation-screen">
      <div class="generation-status">
        <p class="eyebrow">{{ ui.generatingReport }} {{ selectedLanguageLabel }}</p>
        <h3>{{ currentLoadingStep.title }}</h3>
        <p>{{ currentLoadingStep.detail }}</p>

        <div class="progress-wrap" aria-hidden="true">
          <div
            class="progress-bar"
            :class="{ indeterminate: apiCharsReceived === 0 }"
            :style="{ width: `${loadingProgress}%` }"
          ></div>
        </div>

        <div class="loading-meta">
          <span>{{ loadingProgress }}%</span>
          <span>{{ form.businessName || ui.heroTitle }}</span>
        </div>
      </div>

      <div class="generation-steps-col">
        <ol class="generation-steps" :aria-label="ui.generationProgress">
          <li
            v-for="(step, index) in generationSteps"
            :key="step.title"
            :class="{ active: index === loadingStepIndex, done: index < loadingStepIndex }"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <strong>{{ step.title }}</strong>
              <small>{{ step.detail }}</small>
            </div>
          </li>
        </ol>

        <div v-if="waitingRoom.active" class="waiting-room" role="status" aria-live="polite">
          <div class="waiting-room-header">
            <Clock :size="15" aria-hidden="true" />
            <span>{{ ui.waitingRoomTitle }}</span>
            <span class="waiting-room-attempt"
              >{{ waitingRoom.attempt }}/{{ waitingRoom.totalAttempts }}</span
            >
          </div>
          <div class="waiting-room-countdown">
            <span class="countdown-number">{{ waitingRoom.secondsLeft }}</span>
            <span class="countdown-unit">{{ ui.waitingRoomUnit }}</span>
          </div>
          <div class="waiting-room-track" aria-hidden="true">
            <div
              class="waiting-room-fill"
              :style="{ width: waitingCountdownPercent + '%' }"
            ></div>
          </div>
          <p class="waiting-room-note">{{ ui.waitingRoomNote }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

import { ref, reactive, computed } from 'vue';
import type { ReportLanguage } from './useLanguage';
import type { ReportThemeKey, BusinessKitPlan, RetryInfo } from '../businessKit';
import {
  buildBusinessKitHtml,
  businessKitFileName,
  createBusinessKit,
  ESTIMATED_RESPONSE_CHARS,
} from '../businessKit';

type GenerateStatus = 'idle' | 'loading' | 'success' | 'error';

export const WIZARD_STEP_COUNT = 8;

const defaultLanguage: ReportLanguage = 'nl';

function fieldFilled(value: string): boolean {
  return value.trim().length > 0;
}

export type WizardFieldKey =
  | 'businessName'
  | 'region'
  | 'businessType'
  | 'offer'
  | 'audience'
  | 'problem'
  | 'goal'
  | 'channels'
  | 'pricePoint'
  | 'tone';

const WIZARD_STEP_FIELDS: Record<number, WizardFieldKey[]> = {
  0: ['businessName', 'region'],
  1: ['businessType'],
  2: ['offer'],
  3: ['audience'],
  4: ['problem'],
  5: ['goal'],
  6: ['channels', 'pricePoint'],
  7: ['tone'],
};

export function getWizardStepMissingFields(step: number): WizardFieldKey[] {
  const fields = WIZARD_STEP_FIELDS[step];
  if (!fields) return [];
  return fields.filter((key) => !fieldFilled(form[key]));
}

export function isWizardStepValid(step: number): boolean {
  return getWizardStepMissingFields(step).length === 0;
}

export const form = reactive({
  businessName: '',
  businessType: '',
  offer: '',
  audience: '',
  problem: '',
  goal: '',
  channels: '',
  pricePoint: '',
  region: '',
  tone: '',
  language: defaultLanguage as ReportLanguage,
  reportTheme: 'purple' as ReportThemeKey,
});

const status = ref<GenerateStatus>('idle');
const errorMessage = ref('');
const fileName = ref('');
const lastGeneratedAt = ref('');
const pdfDownloading = ref(false);
const reportHtml = ref('');
const showResultScreen = ref(false);
const apiCharsReceived = ref(0);
const currentPlan = ref<BusinessKitPlan | null>(null);
const currentHtml = ref('');

const waitingRoom = reactive({
  active: false,
  secondsLeft: 0,
  totalSeconds: 0,
  attempt: 0,
  totalAttempts: 5,
});

let waitingRoomTimer: number | null = null;

export function useReportGeneration() {
  const isBriefComplete = computed(() => {
    for (let step = 0; step < WIZARD_STEP_COUNT; step++) {
      if (!isWizardStepValid(step)) return false;
    }
    return true;
  });

  const canGenerate = computed(() => isBriefComplete.value && status.value !== 'loading');

  const loadingProgress = computed(() => {
    if (apiCharsReceived.value === 0) return 3;
    return Math.min(Math.round((apiCharsReceived.value / ESTIMATED_RESPONSE_CHARS) * 100), 95);
  });

  const waitingCountdownPercent = computed(() => {
    if (waitingRoom.totalSeconds === 0) return 0;
    return Math.round(
      ((waitingRoom.totalSeconds - waitingRoom.secondsLeft) / waitingRoom.totalSeconds) * 100
    );
  });

  function wait(duration: number): Promise<void> {
    return new Promise((resolve) => window.setTimeout(resolve, duration));
  }

  function startWaitingRoom(info: RetryInfo) {
    const secs = Math.ceil(info.retryAfterSeconds);
    waitingRoom.active = true;
    waitingRoom.secondsLeft = secs;
    waitingRoom.totalSeconds = secs;
    waitingRoom.attempt = info.attempt;
    waitingRoom.totalAttempts = info.totalAttempts;

    if (waitingRoomTimer !== null) window.clearInterval(waitingRoomTimer);
    waitingRoomTimer = window.setInterval(() => {
      if (waitingRoom.secondsLeft > 1) {
        waitingRoom.secondsLeft -= 1;
      } else {
        stopWaitingRoom();
      }
    }, 1000);
  }

  function stopWaitingRoom() {
    waitingRoom.active = false;
    if (waitingRoomTimer !== null) {
      window.clearInterval(waitingRoomTimer);
      waitingRoomTimer = null;
    }
  }

  function setReportHtml(html: string) {
    reportHtml.value = html;
  }

  function revokeReportUrl() {
    reportHtml.value = '';
  }

  function beginGeneration() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    status.value = 'loading';
    errorMessage.value = '';
    showResultScreen.value = false;
    apiCharsReceived.value = 0;
    revokeReportUrl();
  }

  async function generateBusinessKit() {
    if (!isBriefComplete.value) {
      return false;
    }

    if (status.value !== 'loading') {
      beginGeneration();
    }

    try {
      await wait(650);
      const kit = await createBusinessKit(
        { ...form },
        startWaitingRoom,
        (chars) => {
          apiCharsReceived.value = chars;
        }
      );
      kit.theme = form.reportTheme;
      const htmlText = buildBusinessKitHtml(kit);
      const nextFileName = businessKitFileName(kit);
      setReportHtml(htmlText);

      fileName.value = nextFileName;
      lastGeneratedAt.value = new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date());
      apiCharsReceived.value = ESTIMATED_RESPONSE_CHARS;
      status.value = 'success';
      currentPlan.value = kit;
      currentHtml.value = htmlText;
      showResultScreen.value = true;
      return true;
    } catch (error) {
      status.value = 'error';
      showResultScreen.value = false;
      errorMessage.value = error instanceof Error ? error.message : String(error);
      return false;
    } finally {
      stopWaitingRoom();
    }
  }

  function resetBriefForm() {
    const language = form.language;
    const reportTheme = form.reportTheme;
    form.businessName = '';
    form.businessType = '';
    form.offer = '';
    form.audience = '';
    form.problem = '';
    form.goal = '';
    form.channels = '';
    form.pricePoint = '';
    form.region = '';
    form.tone = '';
    form.language = language;
    form.reportTheme = reportTheme;
  }

  function dismissError() {
    status.value = 'idle';
    errorMessage.value = '';
  }

  function goHome() {
    showResultScreen.value = false;
    reportHtml.value = '';
  }

  return {
    form,
    status,
    errorMessage,
    fileName,
    lastGeneratedAt,
    pdfDownloading,
    reportHtml,
    showResultScreen,
    apiCharsReceived,
    currentPlan,
    currentHtml,
    waitingRoom,
    isBriefComplete,
    canGenerate,
    loadingProgress,
    waitingCountdownPercent,
    beginGeneration,
    generateBusinessKit,
    resetBriefForm,
    dismissError,
    goHome,
    setReportHtml,
    revokeReportUrl,
  };
}

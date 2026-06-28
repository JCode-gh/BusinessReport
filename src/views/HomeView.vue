<script setup lang="ts">
import { ref, watch, onMounted, computed, defineAsyncComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { TrendingUp, MessageSquareText, ShieldCheck, Sparkles, ArrowRight } from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';
import { useGenerateCTA } from '../composables/useGenerateCTA';
import { clearGenerateLaunchQuery, wantsGenerateLaunch } from '../composables/useGenerateNavigation';
import { useReportGeneration } from '../composables/useReportGeneration';
import { useReportManagement } from '../composables/useReportManagement';
import { useNotification } from '../composables/useNotification';
import { useAuth, initAuth } from '../useAuth';
import { getAuthErrorMessage } from '../authErrors';
import { track } from '../analytics';
import SiteHeader from '../components/SiteHeader.vue';
import SiteFooter from '../components/SiteFooter.vue';
import { freeTrialMailtoHref } from '../freeTrialContact';

const ExampleReportShowcase = defineAsyncComponent(
  () => import('../components/ExampleReportShowcase.vue'),
);
const GenerationLoader = defineAsyncComponent(() => import('../components/GenerationLoader.vue'));
const GenerationWizard = defineAsyncComponent(() => import('../components/GenerationWizard.vue'));
const ResultScreen = defineAsyncComponent(() => import('../components/ResultScreen.vue'));
const PaywallModal = defineAsyncComponent(() => import('../components/PaywallModal.vue'));
const AuthModal = defineAsyncComponent(() => import('../AuthModal.vue'));
const NotificationToast = defineAsyncComponent(() => import('../components/NotificationToast.vue'));

const router = useRouter();
const route = useRoute();
const { ui, siteLanguage } = useLanguage();
const { generateLabel, creditCostLabel } = useGenerateCTA();
const { status, beginGeneration, generateBusinessKit, dismissError, currentPlan, currentHtml, showResultScreen } =
  useReportGeneration();
const { savedReportId, doSaveReport, openSavedReport } = useReportManagement();
const { showNotification } = useNotification();
const { user, credits, refreshPayment, setCredits, waitForAuthReady } = useAuth();

const wizardOpen = ref(false);
const showAuthModal = ref(false);
const showPaywallModal = ref(false);
const authModalPurpose = ref<'save' | 'generate' | undefined>();
const pendingGenerate = ref(false);

const freeTrialMailto = computed(() => freeTrialMailtoHref(siteLanguage.value));

// Stripe redirect: detect and react before onMounted so the wizard opens immediately
// and Generate clicks don't flash the paywall while verify-checkout runs.
const isPaymentReturn = route.query.payment === 'success';
const paymentSessionId =
  typeof route.query.session_id === 'string' ? route.query.session_id : null;
const activatingPayment = ref(isPaymentReturn);
const paymentActivationStartedAt = isPaymentReturn ? Date.now() : 0;

if (isPaymentReturn) {
  router.replace({ query: {} });
  wizardOpen.value = true;
}

function waitForPaymentActivation(): Promise<void> {
  if (!activatingPayment.value) return Promise.resolve();
  return new Promise((resolve) => {
    const stop = watch(activatingPayment, (active) => {
      if (!active) {
        stop();
        resolve();
      }
    });
  });
}

// Returns true if the user has at least one credit. If the local count is 0,
// it re-reads from Firestore first — this avoids falsely showing the paywall
// during the brief window after a page load where the initial read hasn't
// resolved yet (user is set, but credits are still being fetched).
async function ensureCredits(): Promise<boolean> {
  if (activatingPayment.value) {
    await waitForPaymentActivation();
  }
  await refreshPayment();
  return credits.value > 0;
}

// After a popup sign-in there is no page reload, so continue the action the user
// intended (generate) once they become authenticated.
watch(user, async (u) => {
  if (u && pendingGenerate.value) {
    pendingGenerate.value = false;
    showAuthModal.value = false;
    if (await ensureCredits()) {
      wizardOpen.value = true;
    } else {
      showPaywallModal.value = true;
    }
  }
});

async function openWizard() {
  if (activatingPayment.value) {
    wizardOpen.value = true;
    return;
  }
  await waitForAuthReady();
  if (!user.value) {
    pendingGenerate.value = true;
    authModalPurpose.value = 'generate';
    showAuthModal.value = true;
    return;
  }
  if (!(await ensureCredits())) {
    showPaywallModal.value = true;
    return;
  }
  track('wizard_opened');
  wizardOpen.value = true;
}

watch(
  () => route.query.generate,
  async (value) => {
    if (value !== '1') return;
    clearGenerateLaunchQuery(router, route);
    await openWizard();
  },
  { immediate: true },
);

async function handleGenerate() {
  if (!user.value) return;

  // Show the generating screen immediately — credit checks run on top of the loader,
  // not on the homepage (wizard closes before this handler's first await).
  beginGeneration();
  wizardOpen.value = false;

  if (activatingPayment.value) {
    await waitForPaymentActivation();
  }

  await refreshPayment();
  if (credits.value <= 0) {
    dismissError();
    showPaywallModal.value = true;
    return;
  }

  const creditsBefore = credits.value;
  const { decrementCredits } = await import('../firebase');
  const deducted = await decrementCredits(user.value.uid);
  await refreshPayment();
  if (!deducted || credits.value >= creditsBefore) {
    dismissError();
    wizardOpen.value = true;
    showNotification(
      ui.value.validationErrorTitle,
      siteLanguage.value === 'nl'
        ? 'Je credit kon niet worden afgetrokken. Probeer opnieuw of neem contact op.'
        : 'Your credit could not be deducted. Please try again or contact support.',
      'error',
    );
    return;
  }

  const success = await generateBusinessKit();
  if (success && currentPlan.value) {
    track('report_generated', { credits_left: credits.value });
    status.value = 'loading';
    await doSaveReport(currentPlan.value);
    status.value = 'success';
    showResultScreen.value = true;
  }
}

async function handleOpenReport() {
  let id = savedReportId.value;
  if (!id && currentPlan.value) {
    id = await doSaveReport(currentPlan.value);
  }
  if (!id) {
    showNotification(ui.value.accessDenied, ui.value.reportNotFound, 'error');
    return;
  }
  const report = await openSavedReport(id);
  if (report) {
    showResultScreen.value = false;
    router.push({ name: 'report', params: { id } });
  } else {
    showNotification(ui.value.accessDenied, ui.value.reportNotFound, 'error');
  }
}

function handleDownloadPdf() {
  if (!currentHtml.value) return;
  const blob = new Blob([currentHtml.value], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    showNotification(ui.value.errorEyebrow, ui.value.printError, 'error');
    URL.revokeObjectURL(url);
    return;
  }
  win.addEventListener('load', () => {
    win.print();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  });
}

function handleGoHome() {
  showResultScreen.value = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function handleRetry() {
  dismissError();
  openWizard();
}

const paymentSuccessCopy: Record<string, { title: string; message: string }> = {
  nl: { title: 'Betaling geslaagd!', message: 'Je rapport-credit is klaar. De wizard opent zo meteen.' },
  en: { title: 'Payment successful!', message: 'Your report credit is ready. Opening the wizard now.' },
  fr: { title: 'Paiement réussi !', message: 'Votre crédit rapport est prêt. L\'assistant s\'ouvre dans un instant.' },
  de: { title: 'Zahlung erfolgreich!', message: 'Ihr Berichts-Guthaben ist bereit. Der Assistent öffnet sich gleich.' },
};

async function activatePaymentOnReturn(sessionId: string | null) {
  const lang = siteLanguage.value as string;
  const c = paymentSuccessCopy[lang] ?? paymentSuccessCopy.nl;

  try {
    // After the Stripe redirect the page reloaded — wait for Firebase auth to restore
    await waitForAuthReady();

    if (!user.value) {
      wizardOpen.value = false;
      showNotification(
        c.title,
        lang === 'nl'
          ? 'Betaling geslaagd. Meld je aan om je rapport te genereren.'
          : 'Payment successful. Sign in to generate your report.',
        'success',
      );
      showAuthModal.value = true;
      return;
    }

    // Primary path: verify the session with Stripe and grant the credit synchronously.
    // We TRUST the credit count returned by the function — no client Firestore read needed.
    if (sessionId) {
      try {
        const res = await fetch('/.netlify/functions/verify-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, uid: user.value.uid }),
        });
        const data = (await res.json()) as { paid?: boolean; credits?: number; error?: string };

        if (res.ok && data.paid) {
          const serverCredits = typeof data.credits === 'number' ? data.credits : 0;
          setCredits(serverCredits);
          track('payment_success');
          showNotification(c.title, c.message, 'success');
          if (serverCredits > 0) {
            wizardOpen.value = true;
          } else {
            wizardOpen.value = false;
            showNotification(
              c.title,
              lang === 'nl'
                ? 'Deze betaling is al gebruikt voor een rapport.'
                : 'This payment has already been used for a report.',
              'success',
            );
          }
          return;
        }

        console.error('[payment] verify-checkout did not confirm payment:', res.status, data.error ?? data);
      } catch (err) {
        console.error('[payment] verify-checkout request failed', err);
      }
    }

    // Fallback: poll Firestore in case the webhook is the one writing the credit.
    showNotification(c.title, c.message, 'success');
    for (let i = 0; i < 10; i++) {
      await new Promise((r) => setTimeout(r, i < 3 ? 800 : 1500));
      await refreshPayment();
      if (credits.value > 0) break;
    }
    if (credits.value > 0) {
      wizardOpen.value = true;
    } else {
      wizardOpen.value = false;
      showNotification(
        lang === 'nl' ? 'Betaling ontvangen' : 'Payment received',
        lang === 'nl'
          ? 'Betaling gelukt, maar activatie is nog niet rond. Controleer de Netlify-functielogs (verify-checkout) — meestal ontbreken de Firebase Admin env-variabelen.'
          : 'Payment succeeded but activation did not complete. Check the Netlify function logs (verify-checkout) — usually the Firebase Admin env vars are missing.',
        'error',
      );
    }
  } finally {
    activatingPayment.value = false;
  }
}

onMounted(async () => {
  localStorage.removeItem('business-kit-draft');

  // OAuth redirect returns need auth immediately; otherwise main.ts idle init is enough.
  initAuth();
  const { completeGoogleRedirectSignIn } = await import('../firebase');
  const googleSignIn = completeGoogleRedirectSignIn().catch((e) => {
    showNotification(ui.value.signIn, getAuthErrorMessage(e, siteLanguage.value), 'error');
  });

  // Payment return is handled first — don't block on Google redirect recovery.
  if (isPaymentReturn) {
    await activatePaymentOnReturn(paymentSessionId);
    await googleSignIn;
  } else {
    await googleSignIn;
  }

  // Auto-open wizard if pending generate after auth
  if (user.value && pendingGenerate.value) {
    pendingGenerate.value = false;
    if (await ensureCredits()) {
      wizardOpen.value = true;
    } else {
      showPaywallModal.value = true;
    }
  }
});
</script>

<template>
  <div class="product-shell">
    <SiteHeader
      :show-auth-modal="() => (showAuthModal = true)"
      :show-paywall="() => (showPaywallModal = true)"
    />

    <GenerationLoader v-if="status === 'loading'" />

    <ResultScreen
      v-if="showResultScreen"
      @open-report="handleOpenReport"
      @download-pdf="handleDownloadPdf"
      @go-home="handleGoHome"
      @retry="handleRetry"
      @show-auth="showAuthModal = true"
    />

    <section v-if="!showResultScreen && status !== 'loading'" id="brief" class="hero-section" aria-labelledby="page-title">
      <div class="studio-layout">
        <div class="hero-content">
          <p class="eyebrow">{{ ui.heroEyebrow }}</p>
          <h1 id="page-title">{{ ui.heroTitle }}</h1>
          <p class="hero-copy">{{ ui.heroCopy }}</p>

          <div class="hero-actions">
            <div class="hero-actions-paid">
              <button class="primary-link hero-generate-btn" type="button" @click="openWizard">
                <Sparkles :size="18" />
                {{ generateLabel }}
                <ArrowRight :size="17" />
              </button>
              <p class="hero-credit-cost">{{ creditCostLabel }}</p>
              <p class="hero-trial-note">
                {{ ui.freeTrialNote }}
                <a :href="freeTrialMailto">{{ ui.freeTrialLink }}</a>
              </p>
            </div>
          </div>

          <div id="example" class="hero-product" :aria-label="ui.exampleShowcaseAria">
            <ExampleReportShowcase variant="hero" hide-generate @generate="openWizard" />
          </div>

          <dl class="hero-stats" :aria-label="ui.productHighlights">
            <div>
              <dt>4</dt>
              <dd>{{ ui.statsLanguages }}</dd>
            </div>
            <div>
              <dt>30</dt>
              <dd>{{ ui.statsPlan }}</dd>
            </div>
            <div>
              <dt>PDF</dt>
              <dd>{{ ui.statsPdf }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section
      v-if="!showResultScreen && status !== 'loading'"
      class="example-section"
      aria-labelledby="example-section-title"
    >
      <ExampleReportShowcase variant="section" hide-generate @generate="openWizard" />
    </section>

    <section v-if="!showResultScreen && status !== 'loading'" id="output" class="proof-section" :aria-label="ui.proofAria">
      <article class="proof-card">
        <TrendingUp :size="24" />
        <h2>{{ ui.proofCards[0].title }}</h2>
        <p>{{ ui.proofCards[0].body }}</p>
      </article>
      <article class="proof-card">
        <MessageSquareText :size="24" />
        <h2>{{ ui.proofCards[1].title }}</h2>
        <p>{{ ui.proofCards[1].body }}</p>
      </article>
      <article class="proof-card">
        <ShieldCheck :size="24" />
        <h2>{{ ui.proofCards[2].title }}</h2>
        <p>{{ ui.proofCards[2].body }}</p>
      </article>
    </section>

    <SiteFooter v-if="!showResultScreen && status !== 'loading'" />

    <GenerationWizard v-model="wizardOpen" @generate="handleGenerate" />
    <PaywallModal v-model="showPaywallModal" :language="siteLanguage" />
    <AuthModal v-model="showAuthModal" :purpose="authModalPurpose" :language="siteLanguage" />
    <NotificationToast />
  </div>
</template>

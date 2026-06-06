<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Sparkles, ArrowRight, TrendingUp, MessageSquareText, ShieldCheck, Pencil, Trash2 } from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';
import { useReportGeneration } from '../composables/useReportGeneration';
import { useReportManagement } from '../composables/useReportManagement';
import { useNotification } from '../composables/useNotification';
import { useAuth } from '../useAuth';
import { completeGoogleRedirectSignIn, decrementCredits } from '../firebase';
import { getAuthErrorMessage } from '../authErrors';
import SiteHeader from '../components/SiteHeader.vue';
import GenerationWizard from '../components/GenerationWizard.vue';
import GenerationLoader from '../components/GenerationLoader.vue';
import ResultScreen from '../components/ResultScreen.vue';
import PaywallModal from '../components/PaywallModal.vue';
import AuthModal from '../AuthModal.vue';
import ConfirmModal from '../ConfirmModal.vue';
import NotificationToast from '../components/NotificationToast.vue';

const router = useRouter();
const route = useRoute();
const { ui, siteLanguage } = useLanguage();
const { status, beginGeneration, generateBusinessKit, dismissError, currentPlan, currentHtml, showResultScreen } =
  useReportGeneration();
const { savedReportId, savedReports, savedReportsLoading, doSaveReport, openSavedReport, deleteReportById, updateReportTitle } =
  useReportManagement();
const { showNotification } = useNotification();
const { user, credits, refreshPayment, setCredits, waitForAuthReady } = useAuth();

const wizardOpen = ref(false);
const showAuthModal = ref(false);
const showPaywallModal = ref(false);
const authModalPurpose = ref<'save' | 'generate' | undefined>();
const pendingGenerate = ref(false);
const showConfirmDelete = ref(false);
const pendingDeleteId = ref<string | null>(null);
const renamingReportId = ref<string | null>(null);
const renameHomepageValue = ref('');
const currentYear = new Date().getFullYear();

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
  wizardOpen.value = true;
}

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

async function handleOpenSavedReport(id: string) {
  const report = await openSavedReport(id);
  if (report) {
    router.push({ name: 'report', params: { id } });
  } else {
    showNotification(ui.value.accessDenied, ui.value.reportNotFound, 'error');
  }
}

function askDeleteReport(id: string) {
  pendingDeleteId.value = id;
  showConfirmDelete.value = true;
}

async function confirmDeleteReport() {
  const id = pendingDeleteId.value;
  if (!id) return;
  pendingDeleteId.value = null;
  await deleteReportById(id);
}

function startRenameHomepage(r: any) {
  renamingReportId.value = r.id;
  renameHomepageValue.value = r.title;
}

async function confirmRenameHomepage(r: any) {
  if (renamingReportId.value !== r.id) return;
  renamingReportId.value = null;
  const newTitle = renameHomepageValue.value.trim();
  if (!newTitle || newTitle === r.title) return;
  r.title = newTitle;
  await updateReportTitle(r.id, newTitle);
}

function cancelRenameHomepage() {
  renamingReportId.value = null;
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
            <button class="primary-link" type="button" :disabled="activatingPayment" @click="openWizard">
              <Sparkles :size="19" />
              {{ ui.heroPrimary }}
              <ArrowRight :size="18" />
            </button>
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

          <div class="hero-product" aria-hidden="true">
            <div class="report-preview">
              <div class="preview-topline">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="preview-title"></div>
              <div class="preview-subtitle"></div>
              <div class="preview-grid">
                <div class="preview-column tall"></div>
                <div class="preview-column medium"></div>
                <div class="preview-column short"></div>
              </div>
              <div class="preview-row"></div>
              <div class="preview-row small"></div>
              <div class="preview-score">
                <span>83</span>
                <strong>{{ ui.growthScore }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="user && !showResultScreen && status !== 'loading'" class="saved-reports-section">
      <div class="saved-reports-inner">
        <h2 class="saved-reports-title">{{ ui.savedReportsTitle }}</h2>
        <p v-if="savedReportsLoading" class="saved-reports-empty">{{ ui.savedReportsLoading }}</p>
        <div v-else-if="!savedReports.length" class="saved-reports-empty">
          <p>{{ ui.savedReportsEmpty }}</p>
          <button class="primary-link" type="button" :disabled="activatingPayment" @click="openWizard">
            <Sparkles :size="19" />
            {{ ui.heroPrimary }}
            <ArrowRight :size="18" />
          </button>
        </div>
        <ul v-else class="saved-reports-list">
          <li v-for="r in savedReports" :key="r.id" class="saved-report-item">
            <input
              v-if="renamingReportId === r.id"
              :ref="
                (el) => {
                  if (el) (el as HTMLInputElement).select();
                }
              "
              v-model="renameHomepageValue"
              class="saved-report-rename-input"
              type="text"
              maxlength="120"
              :placeholder="ui.renamePlaceholder"
              @keydown.enter.prevent="confirmRenameHomepage(r)"
              @keydown.escape="cancelRenameHomepage"
              @blur="confirmRenameHomepage(r)"
            />
            <button v-else class="saved-report-title" type="button" @click="startRenameHomepage(r)">
              <span class="saved-report-title-text">{{ r.title }}</span>
              <Pencil :size="11" class="saved-report-rename-icon" />
            </button>
            <span class="saved-report-date">{{
              r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''
            }}</span>
            <button class="saved-report-open" type="button" @click="handleOpenSavedReport(r.id)">
              {{ ui.savedReportOpen }}
            </button>
            <button
              class="saved-report-delete"
              type="button"
              :title="ui.deleteReport"
              @click="askDeleteReport(r.id)"
            >
              <Trash2 :size="14" />
            </button>
          </li>
        </ul>
      </div>
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

    <footer v-if="!showResultScreen && status !== 'loading'" class="site-footer">
      <p>
        © {{ currentYear }} · {{ ui.footerByline }}
        <a href="https://jcode.be" target="_blank" rel="noopener noreferrer">jcode.be</a>
        · <router-link to="/terms">{{ ui.termsLink }}</router-link>
      </p>
    </footer>

    <GenerationWizard v-model="wizardOpen" @generate="handleGenerate" />
    <PaywallModal v-model="showPaywallModal" :language="siteLanguage" />
    <AuthModal v-model="showAuthModal" :purpose="authModalPurpose" :language="siteLanguage" />
    <ConfirmModal
      v-model="showConfirmDelete"
      :title="ui.deleteReport"
      :message="ui.deleteReportConfirm"
      :confirm-label="ui.deleteReport"
      :cancel-label="ui.cancel"
      @confirm="confirmDeleteReport"
    />
    <NotificationToast />
  </div>
</template>

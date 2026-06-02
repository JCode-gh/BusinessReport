<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Sparkles, ArrowRight, TrendingUp, MessageSquareText, ShieldCheck, Pencil, Trash2 } from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';
import { useReportGeneration } from '../composables/useReportGeneration';
import { useReportManagement } from '../composables/useReportManagement';
import { useNotification } from '../composables/useNotification';
import { useAuth } from '../useAuth';
import { completeGoogleRedirectSignIn } from '../firebase';
import { getAuthErrorMessage } from '../authErrors';
import SiteHeader from '../components/SiteHeader.vue';
import GenerationWizard from '../components/GenerationWizard.vue';
import GenerationLoader from '../components/GenerationLoader.vue';
import ResultScreen from '../components/ResultScreen.vue';
import AuthModal from '../AuthModal.vue';
import ConfirmModal from '../ConfirmModal.vue';
import NotificationToast from '../components/NotificationToast.vue';

const router = useRouter();
const { ui, siteLanguage, initializeLanguage } = useLanguage();
const { status, generateBusinessKit, dismissError, currentPlan, currentHtml, showResultScreen } =
  useReportGeneration();
const { savedReports, savedReportsLoading, doSaveReport, openSavedReport, deleteReportById, updateReportTitle } =
  useReportManagement();
const { showNotification } = useNotification();
const { user } = useAuth();

const wizardOpen = ref(false);
const showAuthModal = ref(false);
const authModalPurpose = ref<'save' | 'generate' | undefined>();
const pendingGenerate = ref(false);
const showConfirmDelete = ref(false);
const pendingDeleteId = ref<string | null>(null);
const renamingReportId = ref<string | null>(null);
const renameHomepageValue = ref('');
const currentYear = new Date().getFullYear();

function openWizard() {
  if (!user.value) {
    pendingGenerate.value = true;
    authModalPurpose.value = 'generate';
    showAuthModal.value = true;
    return;
  }
  wizardOpen.value = true;
}

async function handleGenerate() {
  const success = await generateBusinessKit();
  if (success && user.value && currentPlan.value) {
    const id = await doSaveReport(currentPlan.value);
    if (id) {
      // Optionally navigate to report view
      // router.push({ name: 'report', params: { id } });
    }
  }
}

function handleOpenReport() {
  showResultScreen.value = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function handleDownloadPdf() {
  // TODO: Implement PDF download logic (moved from App.vue)
  console.log('Download PDF');
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

onMounted(async () => {
  localStorage.removeItem('business-kit-draft');
  const initialLang = initializeLanguage();

  try {
    await completeGoogleRedirectSignIn();
  } catch (e) {
    showNotification(ui.value.signIn, getAuthErrorMessage(e, siteLanguage.value), 'error');
  }

  // Auto-open wizard if pending generate after auth
  if (user.value && pendingGenerate.value) {
    pendingGenerate.value = false;
    wizardOpen.value = true;
  }
});
</script>

<template>
  <div class="product-shell">
    <SiteHeader :show-auth-modal="() => (showAuthModal = true)" />

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
            <button class="primary-link" type="button" @click="openWizard">
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
          <button class="primary-link" type="button" @click="openWizard">
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

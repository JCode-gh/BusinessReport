<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, FileText, Pencil, Sparkles, Trash2 } from 'lucide-vue-next';
import SiteHeader from '../components/SiteHeader.vue';
import AuthModal from '../AuthModal.vue';
import PaywallModal from '../components/PaywallModal.vue';
import ConfirmModal from '../ConfirmModal.vue';
import NotificationToast from '../components/NotificationToast.vue';
import SiteFooter from '../components/SiteFooter.vue';
import { useLanguage } from '../composables/useLanguage';
import { useGenerateCTA } from '../composables/useGenerateCTA';
import { navigateToGenerate } from '../composables/useGenerateNavigation';
import { useReportManagement } from '../composables/useReportManagement';
import { useNotification } from '../composables/useNotification';
import { useAuth } from '../useAuth';
import type { ReportSummary } from '../firebase';

const router = useRouter();
const { ui, siteLanguage } = useLanguage();
const { generateButtonLabel } = useGenerateCTA();
const { user, waitForAuthReady } = useAuth();
const { showNotification } = useNotification();
const {
  savedReports,
  savedReportsLoading,
  openSavedReport,
  deleteReportById,
  updateReportTitle,
} = useReportManagement();

const showAuthModal = ref(false);
const showPaywallModal = ref(false);
const showConfirmDelete = ref(false);
const pendingDeleteId = ref<string | null>(null);
const renamingReportId = ref<string | null>(null);
const renameValue = ref('');

onMounted(async () => {
  await waitForAuthReady();
});

watch(
  user,
  async (u) => {
    await waitForAuthReady();
    if (!u) {
      router.replace('/');
    }
  },
  { immediate: true },
);

function formatDate(timestamp: number | undefined): string {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

async function openReport(id: string) {
  const report = await openSavedReport(id);
  if (report) {
    router.push({ name: 'report', params: { id } });
  } else {
    showNotification(ui.value.accessDenied, ui.value.reportNotFound, 'error');
  }
}

function askDelete(id: string) {
  pendingDeleteId.value = id;
  showConfirmDelete.value = true;
}

async function confirmDelete() {
  const id = pendingDeleteId.value;
  if (!id) return;
  pendingDeleteId.value = null;
  await deleteReportById(id);
}

function startRename(report: ReportSummary) {
  renamingReportId.value = report.id;
  renameValue.value = report.title;
}

async function confirmRename(report: ReportSummary) {
  if (renamingReportId.value !== report.id) return;
  renamingReportId.value = null;
  const title = renameValue.value.trim();
  if (!title || title === report.title) return;
  report.title = title;
  await updateReportTitle(report.id, title);
}

function cancelRename() {
  renamingReportId.value = null;
}

function goGenerate() {
  navigateToGenerate(router);
}
</script>

<template>
  <div class="product-shell">
    <SiteHeader
      :show-auth-modal="() => (showAuthModal = true)"
      :show-paywall="() => (showPaywallModal = true)"
    />

    <main class="reports-page">
      <router-link to="/" class="reports-back">
        <ArrowLeft :size="16" />
        {{ ui.reportsBackHome }}
      </router-link>

      <header class="reports-header">
        <div>
          <p class="reports-eyebrow">{{ ui.savedReportsTitle }}</p>
          <h1>{{ ui.reportsPageTitle }}</h1>
          <p class="reports-lead">{{ ui.reportsPageLead }}</p>
        </div>
        <button class="primary-link reports-new-btn" type="button" @click="goGenerate">
          <Sparkles :size="18" />
          {{ generateButtonLabel }}
          <ArrowRight :size="17" />
        </button>
      </header>

      <p v-if="savedReportsLoading" class="reports-status">{{ ui.savedReportsLoading }}</p>

      <div v-else-if="!savedReports.length" class="reports-empty">
        <FileText :size="40" stroke-width="1.5" />
        <p>{{ ui.savedReportsEmpty }}</p>
        <button class="primary-link" type="button" @click="goGenerate">
          <Sparkles :size="18" />
          {{ generateButtonLabel }}
          <ArrowRight :size="17" />
        </button>
      </div>

      <ul v-else class="reports-grid">
        <li v-for="report in savedReports" :key="report.id" class="report-card">
          <div class="report-card-icon" aria-hidden="true">
            <FileText :size="22" />
          </div>

          <div class="report-card-body">
            <input
              v-if="renamingReportId === report.id"
              v-model="renameValue"
              class="report-card-rename"
              type="text"
              maxlength="120"
              :placeholder="ui.renamePlaceholder"
              @keydown.enter.prevent="confirmRename(report)"
              @keydown.escape="cancelRename"
              @blur="confirmRename(report)"
            />
            <button
              v-else
              class="report-card-title"
              type="button"
              :title="ui.renamePlaceholder"
              @click="startRename(report)"
            >
              <span>{{ report.title }}</span>
              <Pencil :size="12" />
            </button>
            <time class="report-card-date">{{ formatDate(report.createdAt) }}</time>
          </div>

          <div class="report-card-actions">
            <button class="primary-link report-card-open" type="button" @click="openReport(report.id)">
              {{ ui.savedReportOpen }}
              <ArrowRight :size="14" />
            </button>
            <button
              class="report-card-delete"
              type="button"
              :title="ui.deleteReport"
              @click="askDelete(report.id)"
            >
              <Trash2 :size="15" />
            </button>
          </div>
        </li>
      </ul>
    </main>

    <SiteFooter />

    <AuthModal v-model="showAuthModal" :language="siteLanguage" />
    <PaywallModal v-model="showPaywallModal" :language="siteLanguage" />
    <ConfirmModal
      v-model="showConfirmDelete"
      :title="ui.deleteReport"
      :message="ui.deleteReportConfirm"
      :confirm-label="ui.deleteReport"
      :cancel-label="ui.cancel"
      @confirm="confirmDelete"
    />
    <NotificationToast />
  </div>
</template>

<style scoped>
.reports-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: min(1360px, calc(100% - 48px));
  margin: 0 auto;
  padding: 28px 0 56px;
}

.reports-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--muted);
  text-decoration: none;
}

.reports-back:hover {
  color: var(--ink);
}

.reports-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 32px;
}

.reports-eyebrow {
  margin: 0 0 8px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}

.reports-header h1 {
  margin: 0 0 10px;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--ink);
}

.reports-lead {
  margin: 0;
  max-width: 48ch;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--muted);
}

.reports-new-btn {
  flex-shrink: 0;
  white-space: nowrap;
}

.reports-status {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: var(--muted);
  font-size: 0.92rem;
}

.reports-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 56px 24px;
  border: 1px dashed var(--line-strong);
  border-radius: 16px;
  background: color-mix(in srgb, var(--surface) 80%, transparent);
  text-align: center;
  color: var(--muted);
}

.reports-empty svg {
  color: var(--accent);
  opacity: 0.7;
}

.reports-empty p {
  margin: 0;
  max-width: 36ch;
  line-height: 1.5;
}

.reports-grid {
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  align-content: start;
}

.report-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border: 1px solid var(--line-strong);
  border-radius: 14px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.report-card:hover {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--line-strong));
  box-shadow: var(--shadow);
}

.report-card-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--accent) 12%, var(--surface-2));
  color: var(--accent);
}

.report-card-body {
  min-width: 0;
}

.report-card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
}

.report-card-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.report-card-title svg {
  flex-shrink: 0;
  opacity: 0;
  color: var(--muted);
  transition: opacity 0.15s;
}

.report-card:hover .report-card-title svg {
  opacity: 1;
}

.report-card-rename {
  width: 100%;
  padding: 8px 12px;
  border: 1.5px solid var(--accent);
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  background: var(--surface-2);
  outline: none;
}

.report-card-date {
  display: block;
  margin-top: 4px;
  font-size: 0.8rem;
  color: var(--muted-dim);
}

.report-card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.report-card-open {
  min-height: 40px;
  padding: 0 16px;
  font-size: 0.84rem;
  white-space: nowrap;
}

.report-card-delete {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid color-mix(in srgb, var(--danger) 30%, var(--line-strong));
  border-radius: 10px;
  background: transparent;
  color: var(--danger);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.report-card-delete:hover {
  background: color-mix(in srgb, var(--danger) 10%, transparent);
  border-color: var(--danger);
}

@media (max-width: 960px) {
  .reports-page {
    width: min(100% - 32px, 1360px);
  }
}

@media (max-width: 640px) {
  .reports-header {
    flex-direction: column;
  }

  .reports-new-btn {
    width: 100%;
    justify-content: center;
  }

  .report-card {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
  }

  .report-card-actions {
    grid-column: 1 / -1;
    justify-content: stretch;
  }

  .report-card-open {
    flex: 1;
    justify-content: center;
  }
}
</style>

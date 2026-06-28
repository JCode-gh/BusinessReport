<script setup lang="ts">
import '../styles/report-view.css';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, Pencil, Printer, LogIn, Save } from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';
import { useReportManagement } from '../composables/useReportManagement';
import { useAuth } from '../useAuth';
import { useNotification } from '../composables/useNotification';
import { businessKitFileName } from '../businessKit';
import { prepareReportHtmlForViewer } from '../patchHtmlForEditing';
import type { BusinessKitPlan } from '../businessKit';
import NotificationToast from '../components/NotificationToast.vue';

const route = useRoute();
const router = useRouter();
const { ui } = useLanguage();
const { user } = useAuth();
const { showNotification } = useNotification();
const { openSavedReport, patchReportHtml, saveState } = useReportManagement();

const reportId = computed(() => route.params.id as string);
const currentPlan = ref<BusinessKitPlan | null>(null);
const inlineReportHtml = ref('');
const iframeRef = ref<HTMLIFrameElement | null>(null);
const isRenamingReport = ref(false);
const renameValue = ref('');
const renameInputRef = ref<HTMLInputElement | null>(null);

function goHome() {
  router.push('/');
}

function printReport() {
  iframeRef.value?.contentWindow?.postMessage({ type: 'PRINT' }, '*');
}

function startRename() {
  if (!currentPlan.value) return;
  renameValue.value = currentPlan.value.title;
  isRenamingReport.value = true;
  setTimeout(() => renameInputRef.value?.select(), 50);
}

async function confirmRename() {
  if (!isRenamingReport.value) return;
  isRenamingReport.value = false;
  const newTitle = renameValue.value.trim();
  if (!newTitle || !currentPlan.value || newTitle === currentPlan.value.title) return;
  currentPlan.value = { ...currentPlan.value, title: newTitle };
  const newHtml = prepareReportHtmlForViewer(currentPlan.value);
  inlineReportHtml.value = newHtml;
  if (reportId.value) {
    await patchReportHtml(reportId.value, newHtml);
  }
}

function cancelRename() {
  isRenamingReport.value = false;
}

async function saveEdits() {
  if (!iframeRef.value?.contentWindow || !reportId.value) return;
  saveState.value = 'saving';
  iframeRef.value.contentWindow.postMessage({ type: 'REQUEST_CONTENT' }, '*');
}

onMounted(async () => {
  if (!user.value) {
    showNotification(ui.value.accessDenied, ui.value.accessDeniedMessage, 'error');
    router.push('/');
    return;
  }

  const report = await openSavedReport(reportId.value);
  if (!report) {
    showNotification(ui.value.accessDenied, ui.value.reportNotFound, 'error');
    router.push('/');
    return;
  }

  currentPlan.value = report.plan;
  inlineReportHtml.value = prepareReportHtmlForViewer(report.plan, report.editedHtml);

  // Handle iframe postMessage
  window.addEventListener('message', async (e) => {
    if (!e.data || typeof e.data !== 'object') return;

    if (e.data.type === 'REPORT_CONTENT' && reportId.value) {
      const success = await patchReportHtml(reportId.value, e.data.html as string);
      if (success) {
        saveState.value = 'saved';
        iframeRef.value?.contentWindow?.postMessage({ type: 'SAVE_CONFIRMED' }, '*');
        setTimeout(() => {
          saveState.value = 'idle';
        }, 2500);
      } else {
        saveState.value = 'idle';
      }
    }
  });
});
</script>

<template>
  <div class="product-shell">
    <main>
      <section class="inline-report-section">
      <div class="inline-report-bar">
        <button class="inline-back-btn" type="button" @click="goHome">
          <ArrowLeft :size="15" />
          <span class="btn-label">{{ ui.backToBrief }}</span>
        </button>
        <input
          v-if="isRenamingReport"
          ref="renameInputRef"
          v-model="renameValue"
          class="inline-report-bar-rename-input"
          type="text"
          maxlength="120"
          :placeholder="ui.renamePlaceholder"
          @keydown.enter.prevent="confirmRename"
          @keydown.escape="cancelRename"
          @blur="confirmRename"
        />
        <template v-else>
          <span class="inline-report-bar-label">{{ currentPlan?.title ?? ui.reportFallbackTitle }}</span>
          <button class="inline-rename-btn" type="button" @click="startRename" :title="ui.renamePlaceholder">
            <Pencil :size="13" />
          </button>
        </template>
        <div class="inline-report-bar-actions">
          <!-- Download as PDF -->
          <button class="inline-pdf-btn" type="button" @click="printReport">
            <Printer :size="15" />
            <span class="btn-label">{{ ui.downloadPdf }}</span>
          </button>

          <!-- Save changes -->
          <button
            class="inline-save-btn"
            type="button"
            :disabled="saveState === 'saving'"
            @click="saveEdits"
          >
            <Save :size="15" />
            <span class="btn-label">{{
              saveState === 'saved' ? ui.savedLabel : saveState === 'saving' ? ui.savingLabel : ui.saveChanges
            }}</span>
          </button>
        </div>
      </div>
      <iframe
        ref="iframeRef"
        :srcdoc="inlineReportHtml"
        sandbox="allow-scripts allow-same-origin allow-modals allow-top-navigation-by-user-activation allow-popups"
        class="inline-report-frame"
        :title="ui.reportViewerTitle"
      />
    </section>
    </main>

    <NotificationToast />
  </div>
</template>

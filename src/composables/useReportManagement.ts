import { ref, watch } from 'vue';
import { useAuth } from '../useAuth';
import type { BusinessKitPlan } from '../businessKit';
import { buildBusinessKitHtml } from '../businessKit';
import {
  saveReport,
  loadReport,
  listReports,
  patchReport,
  renameReportTitle,
  deleteReport,
  type ReportSummary,
} from '../firebase';

const savedReportId = ref<string | null>(null);
const savedReports = ref<ReportSummary[]>([]);
const savedReportsLoading = ref(false);
const saveState = ref<'idle' | 'saving' | 'saved'>('idle');
const pendingSave = ref(false);

export function useReportManagement() {
  const { user } = useAuth();

  async function doSaveReport(plan: BusinessKitPlan): Promise<string | null> {
    if (!user.value || !plan) return null;
    saveState.value = 'saving';
    try {
      const id = await saveReport(plan, user.value.uid);
      savedReportId.value = id;
      saveState.value = 'saved';
      setTimeout(() => {
        saveState.value = 'idle';
      }, 2500);
      // Refresh list
      if (user.value) {
        listReports(user.value.uid)
          .then((r) => {
            savedReports.value = r;
          })
          .catch(() => {});
      }
      return id;
    } catch (e) {
      console.error('[ReportManagement] Failed to save report', e);
      saveState.value = 'idle';
      return null;
    } finally {
      pendingSave.value = false;
    }
  }

  async function openSavedReport(id: string) {
    if (!user.value) {
      console.warn('[ReportManagement] Cannot open report: user not logged in');
      return null;
    }
    try {
      const stored = await loadReport(id, user.value.uid);
      if (!stored) return null;
      savedReportId.value = id;
      return stored;
    } catch (e) {
      console.error('[ReportManagement] Failed to open saved report', e);
      return null;
    }
  }

  async function deleteReportById(id: string) {
    try {
      await deleteReport(id);
      savedReports.value = savedReports.value.filter((r) => r.id !== id);
      if (savedReportId.value === id) {
        savedReportId.value = null;
      }
      return true;
    } catch (e) {
      console.error('[ReportManagement] Failed to delete report', e);
      return false;
    }
  }

  async function updateReportTitle(id: string, newTitle: string) {
    try {
      await renameReportTitle(id, newTitle);
      const report = savedReports.value.find((r) => r.id === id);
      if (report) {
        report.title = newTitle;
      }
      return true;
    } catch (e) {
      console.error('[ReportManagement] Failed to rename report', e);
      return false;
    }
  }

  async function patchReportHtml(id: string, html: string) {
    try {
      await patchReport(id, html);
      return true;
    } catch (e) {
      console.error('[ReportManagement] Failed to patch report', e);
      return false;
    }
  }

  // Auto-refresh saved reports list when auth state changes
  watch(
    user,
    async (newUser) => {
      if (newUser) {
        savedReportsLoading.value = true;
        try {
          savedReports.value = await listReports(newUser.uid);
        } catch {
          savedReports.value = [];
        } finally {
          savedReportsLoading.value = false;
        }
      } else {
        savedReports.value = [];
      }
    },
    { immediate: true }
  );

  return {
    savedReportId,
    savedReports,
    savedReportsLoading,
    saveState,
    pendingSave,
    doSaveReport,
    openSavedReport,
    deleteReportById,
    updateReportTitle,
    patchReportHtml,
  };
}

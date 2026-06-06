import { ref, readonly, watch } from 'vue';
import { useAuth } from '../useAuth';
import { useReportManagement } from './useReportManagement';

const bootComplete = ref(false);

const { user, waitForAuthReady } = useAuth();
const { waitForInitialReportsLoad } = useReportManagement();

async function runInitialBoot() {
  await waitForAuthReady();
  if (user.value) {
    await waitForInitialReportsLoad();
  }
  bootComplete.value = true;
}

runInitialBoot();

export function useAppBoot() {
  function waitForBootComplete(): Promise<void> {
    if (bootComplete.value) return Promise.resolve();
    return new Promise((resolve) => {
      const stop = watch(bootComplete, (complete) => {
        if (complete) {
          stop();
          resolve();
        }
      });
    });
  }

  return {
    bootComplete: readonly(bootComplete),
    waitForBootComplete,
  };
}

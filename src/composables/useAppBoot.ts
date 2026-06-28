import { ref, readonly, watch } from 'vue';
import { useAuth } from '../useAuth';

const bootComplete = ref(false);

const { waitForAuthReady } = useAuth();

async function runInitialBoot() {
  await waitForAuthReady();
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

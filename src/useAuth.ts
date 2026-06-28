import { ref, readonly, watch } from "vue";
import type { User } from "firebase/auth";

const user = ref<User | null>(null);
const authReady = ref(false);
const credits = ref(0);
let initStarted = false;
let authScheduleStarted = false;
let creditsFetchUid: string | null = null;
let authUnsubscribe: (() => void) | null = null;
let bfcacheRestoreUnsubscribe: (() => void) | null = null;

function fetchCredits(uid: string, opts?: { server?: boolean }) {
  creditsFetchUid = uid;
  return import("./firebase").then(({ getUserCredits }) =>
    getUserCredits(uid, opts).then((n) => {
      if (creditsFetchUid === uid) credits.value = n;
      return n;
    }),
  );
}

function subscribeAuthState(): void {
  authUnsubscribe?.();
  authUnsubscribe = null;

  void import("./firebaseAuth").then(async ({ onAuthStateChange, completeGoogleRedirectSignIn, onAuthBfcacheRestore }) => {
    if (!bfcacheRestoreUnsubscribe) {
      bfcacheRestoreUnsubscribe = onAuthBfcacheRestore(() => {
        subscribeAuthState();
      });
    }

    await completeGoogleRedirectSignIn().catch(() => {});

    authUnsubscribe = onAuthStateChange((u) => {
      user.value = u;
      if (!authReady.value) authReady.value = true;
      if (!u) {
        credits.value = 0;
        creditsFetchUid = null;
      }
    });
  });
}

export function initAuth(): void {
  if (initStarted) return;
  initStarted = true;
  subscribeAuthState();
}

/** Defer Firebase Auth until user interaction — keeps Firebase off the Lighthouse critical path. */
export function scheduleAuthInit(): void {
  if (authScheduleStarted || initStarted) return;
  authScheduleStarted = true;

  const boot = () => {
    cleanup();
    initAuth();
  };

  const cleanup = () => {
    for (const event of ["pointerdown", "keydown", "touchstart"] as const) {
      document.removeEventListener(event, boot, true);
    }
  };

  for (const event of ["pointerdown", "keydown", "touchstart"] as const) {
    document.addEventListener(event, boot, { once: true, passive: true, capture: true });
  }
}

export function useAuth() {
  async function refreshPayment() {
    initAuth();
    if (!user.value) return;
    await fetchCredits(user.value.uid, { server: true });
  }

  function setCredits(n: number) {
    credits.value = Math.max(0, Math.floor(n));
  }

  function waitForAuthReady(): Promise<void> {
    initAuth();
    if (authReady.value) return Promise.resolve();
    return new Promise((resolve) => {
      const stop = watch(authReady, (ready) => {
        if (ready) {
          stop();
          resolve();
        }
      });
    });
  }

  return {
    user: readonly(user),
    authReady: readonly(authReady),
    credits: readonly(credits),
    refreshPayment,
    setCredits,
    waitForAuthReady,
  };
}

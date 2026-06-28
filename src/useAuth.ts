import { ref, readonly, watch } from "vue";
import type { User } from "firebase/auth";

const user = ref<User | null>(null);
const authReady = ref(false);
const credits = ref(0);
let initStarted = false;

export function initAuth(): void {
  if (initStarted) return;
  initStarted = true;

  void import("./firebase").then(({ onAuthStateChange, getUserCredits }) => {
    onAuthStateChange(async (u) => {
      user.value = u;
      if (u) {
        credits.value = await getUserCredits(u.uid);
      } else {
        credits.value = 0;
      }
      if (!authReady.value) authReady.value = true;
    });
  });
}

export function useAuth() {
  async function refreshPayment() {
    initAuth();
    if (!user.value) return;
    const { getUserCredits } = await import("./firebase");
    credits.value = await getUserCredits(user.value.uid, { server: true });
  }

  // Trust an authoritative credit count (e.g. returned by the verify-checkout
  // function), without re-reading Firestore from the client.
  function setCredits(n: number) {
    credits.value = Math.max(0, Math.floor(n));
  }

  // Resolves once Firebase has reported the initial auth state.
  // Needed after a Stripe redirect, where the page reloads and auth must restore.
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

import { ref, readonly, watch } from "vue";
import { onAuthStateChange, getUserCredits } from "./firebase";
import type { User } from "firebase/auth";

const user = ref<User | null>(null);
const authReady = ref(false);
const credits = ref(0);

onAuthStateChange(async (u) => {
  user.value = u;
  authReady.value = true;
  credits.value = u ? await getUserCredits(u.uid) : 0;
});

export function useAuth() {
  async function refreshPayment() {
    if (!user.value) return;
    credits.value = await getUserCredits(user.value.uid);
  }

  // Resolves once Firebase has reported the initial auth state.
  // Needed after a Stripe redirect, where the page reloads and auth must restore.
  function waitForAuthReady(): Promise<void> {
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
    waitForAuthReady,
  };
}

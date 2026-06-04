import { ref, readonly } from "vue";
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

  return {
    user: readonly(user),
    authReady: readonly(authReady),
    credits: readonly(credits),
    refreshPayment,
  };
}

import { ref, readonly } from "vue";
import { onAuthStateChange, getUserPaid } from "./firebase";
import type { User } from "firebase/auth";

const user = ref<User | null>(null);
const authReady = ref(false);
const hasPaid = ref(false);

onAuthStateChange(async (u) => {
  user.value = u;
  authReady.value = true;
  hasPaid.value = u ? await getUserPaid(u.uid) : false;
});

export function useAuth() {
  async function refreshPayment() {
    if (!user.value) return;
    hasPaid.value = await getUserPaid(user.value.uid);
  }

  return {
    user: readonly(user),
    authReady: readonly(authReady),
    hasPaid: readonly(hasPaid),
    refreshPayment,
  };
}

import { ref, readonly } from "vue";
import { onAuthStateChange } from "./firebase";
import type { User } from "firebase/auth";

const user = ref<User | null>(null);
const authReady = ref(false);

onAuthStateChange((u) => {
  user.value = u;
  authReady.value = true;
});

export function useAuth() {
  return {
    user: readonly(user),
    authReady: readonly(authReady),
  };
}

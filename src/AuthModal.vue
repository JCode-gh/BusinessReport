<script setup lang="ts">
import { ref } from "vue";
import { X } from "lucide-vue-next";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "./firebase";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", v: boolean): void }>();

function close() {
  emit("update:modelValue", false);
}

// Prevent closing when a drag that started inside the panel ends on the overlay
const dragFromPanel = ref(false);

const AUTH_ERRORS: Record<string, string> = {
  "auth/email-already-in-use":    "This email already has an account. Sign in instead.",
  "auth/user-not-found":          "No account found for this email. Create one below.",
  "auth/wrong-password":          "Incorrect password. Please try again.",
  "auth/invalid-credential":      "Incorrect email or password. Please try again.",
  "auth/invalid-email":           "That doesn't look like a valid email address.",
  "auth/user-disabled":           "This account has been disabled. Contact support if you think this is a mistake.",
  "auth/too-many-requests":       "Too many attempts. Please wait a moment before trying again.",
  "auth/network-request-failed":  "Network error. Check your connection and try again.",
  "auth/popup-closed-by-user":    "The sign-in window was closed. Please try again.",
  "auth/cancelled-popup-request": "Another sign-in window is already open.",
  "auth/popup-blocked":           "Your browser blocked the sign-in popup. Allow popups for this site and try again.",
  "auth/requires-recent-login":   "For security reasons, please sign in again before continuing.",
  "auth/weak-password":           "Password must be at least 6 characters.",
  "auth/operation-not-allowed":   "This sign-in method is not enabled. Contact support.",
};

function friendlyError(e: unknown): string {
  const code = (e as { code?: string }).code ?? "";
  return AUTH_ERRORS[code] ?? "Something went wrong. Please try again.";
}

type Mode = "choose" | "signin" | "signup";
const mode = ref<Mode>("choose");
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const loading = ref(false);

function reset() {
  email.value = "";
  password.value = "";
  errorMsg.value = "";
  loading.value = false;
}

function switchTo(m: Mode) {
  errorMsg.value = "";
  mode.value = m;
}

async function handleGoogle() {
  loading.value = true;
  errorMsg.value = "";
  try {
    await signInWithGoogle();
    close();
  } catch (e) {
    errorMsg.value = friendlyError(e);
  } finally {
    loading.value = false;
  }
}

async function handleSignIn() {
  if (!email.value || !password.value) {
    errorMsg.value = "Fill in your email and password.";
    return;
  }
  loading.value = true;
  errorMsg.value = "";
  try {
    await signInWithEmail(email.value, password.value);
    close();
  } catch (e) {
    errorMsg.value = friendlyError(e);
  } finally {
    loading.value = false;
  }
}

async function handleSignUp() {
  if (!email.value || !password.value) {
    errorMsg.value = "Fill in your email and password.";
    return;
  }
  if (password.value.length < 6) {
    errorMsg.value = "Password must be at least 6 characters.";
    return;
  }
  loading.value = true;
  errorMsg.value = "";
  try {
    await signUpWithEmail(email.value, password.value);
    close();
  } catch (e) {
    errorMsg.value = friendlyError(e);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="auth-overlay" @click.self="!dragFromPanel && close(); dragFromPanel = false">
      <div class="auth-panel" role="dialog" aria-modal="true" aria-label="Sign in" @mousedown="dragFromPanel = true">

        <div class="auth-header">
          <h2 class="auth-title">
            {{ mode === 'signup' ? 'Create an account' : 'Sign in to save reports' }}
          </h2>
          <button class="auth-close" type="button" @click="close" aria-label="Close">
            <X :size="20" />
          </button>
        </div>

        <p class="auth-subtitle">
          {{ mode === 'signup'
            ? 'Your reports will be saved and accessible via a permanent link.'
            : 'Save reports and access them anytime via a permanent link.' }}
        </p>

        <!-- Choose method -->
        <div v-if="mode === 'choose'" class="auth-body">
          <button class="auth-google-btn" type="button" :disabled="loading" @click="handleGoogle">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <div class="auth-divider"><span>or</span></div>

          <button class="auth-email-btn" type="button" :disabled="loading" @click="switchTo('signin')">
            Sign in with email
          </button>
          <button class="auth-email-btn auth-email-btn--secondary" type="button" :disabled="loading" @click="switchTo('signup')">
            Create an account
          </button>

          <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>
        </div>

        <!-- Sign in -->
        <div v-else-if="mode === 'signin'" class="auth-body">
          <label class="auth-field">
            <span>Email</span>
            <input v-model="email" type="email" autocomplete="email" placeholder="you@example.com" />
          </label>
          <label class="auth-field">
            <span>Password</span>
            <input v-model="password" type="password" autocomplete="current-password" placeholder="••••••••" @keydown.enter="handleSignIn" />
          </label>

          <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>

          <div class="auth-actions">
            <button class="auth-submit-btn" type="button" :disabled="loading" @click="handleSignIn">
              {{ loading ? 'Signing in…' : 'Sign in' }}
            </button>
            <button class="auth-back-btn" type="button" @click="switchTo('choose'); reset()">Back</button>
          </div>

          <p class="auth-hint">
            No account yet?
            <button class="auth-switch-link" type="button" @click="switchTo('signup')">Create one →</button>
          </p>
        </div>

        <!-- Sign up -->
        <div v-else class="auth-body">
          <label class="auth-field">
            <span>Email</span>
            <input v-model="email" type="email" autocomplete="email" placeholder="you@example.com" />
          </label>
          <label class="auth-field">
            <span>Password <small class="auth-field-hint">(min. 6 characters)</small></span>
            <input v-model="password" type="password" autocomplete="new-password" placeholder="••••••••" @keydown.enter="handleSignUp" />
          </label>

          <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>

          <div class="auth-actions">
            <button class="auth-submit-btn" type="button" :disabled="loading" @click="handleSignUp">
              {{ loading ? 'Creating account…' : 'Create account' }}
            </button>
            <button class="auth-back-btn" type="button" @click="switchTo('choose'); reset()">Back</button>
          </div>

          <p class="auth-hint">
            Already have an account?
            <button class="auth-switch-link" type="button" @click="switchTo('signin')">Sign in →</button>
          </p>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.auth-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(16, 13, 40, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  backdrop-filter: blur(4px);
}

.auth-panel {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  padding: 28px 28px 24px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18);
  /* Tell the browser this subtree is light so autofill uses light colours */
  color-scheme: light;
}

.auth-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 6px;
}

.auth-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #100d28;
  margin: 0;
}

.auth-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 2px;
  line-height: 1;
}

.auth-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 20px;
}

.auth-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 44px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.auth-google-btn:hover:not(:disabled) {
  border-color: #7c6bd6;
  background: #f7f5ff;
}

.auth-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #9ca3af;
  font-size: 0.8rem;
}

.auth-divider::before,
.auth-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.auth-email-btn {
  height: 44px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.auth-email-btn:hover:not(:disabled) {
  border-color: #7c6bd6;
  background: #f7f5ff;
}

.auth-email-btn--secondary {
  color: #4c3ab5;
  border-color: #ddd6fe;
  background: #f7f5ff;
}

.auth-email-btn--secondary:hover:not(:disabled) {
  background: #ede9ff;
  border-color: #7c6bd6;
}

.auth-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
}

.auth-field-hint {
  font-weight: 400;
  color: #9ca3af;
  font-size: 0.78rem;
}

.auth-field input {
  height: 42px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 0.9rem;
  color: #111827;
  outline: none;
  transition: border-color 0.15s;
}

.auth-field input:focus {
  border-color: #7c6bd6;
}

/* Override browser autofill background — the inset shadow paints over it */
.auth-field input:-webkit-autofill,
.auth-field input:-webkit-autofill:hover,
.auth-field input:-webkit-autofill:focus,
.auth-field input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
  box-shadow: 0 0 0 1000px #fff inset !important;
  -webkit-text-fill-color: #111827 !important;
  caret-color: #111827;
  transition: background-color 9999s ease-in-out 0s;
}

.auth-actions {
  display: flex;
  gap: 8px;
}

.auth-submit-btn {
  flex: 1;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: #4c3ab5;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

.auth-submit-btn:hover:not(:disabled) {
  background: #3d2fa0;
}

.auth-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-back-btn {
  height: 44px;
  padding: 0 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
  transition: border-color 0.15s;
}

.auth-back-btn:hover {
  border-color: #9ca3af;
}

.auth-error {
  font-size: 0.825rem;
  color: #be185d;
  margin: 0;
  padding: 8px 12px;
  background: #fff0f6;
  border-radius: 8px;
}

.auth-hint {
  font-size: 0.8rem;
  color: #9ca3af;
  margin: 0;
  text-align: center;
}

.auth-switch-link {
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  font-weight: 600;
  color: #4c3ab5;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.auth-switch-link:hover {
  color: #3d2fa0;
}
</style>

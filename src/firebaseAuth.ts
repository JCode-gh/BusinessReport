import { deleteApp, initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut as firebaseSignOut,
  type Auth,
  type User,
} from "firebase/auth";
import { registerBfcacheRelease, registerBfcacheRestore } from "./bfcacheLifecycle";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

const googleProvider = new GoogleAuthProvider();
let firebaseApp: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let bfcacheHooksRegistered = false;
const bfcacheRestoreListeners = new Set<() => void>();

function registerBfcacheHooksOnce(): void {
  if (bfcacheHooksRegistered) return;
  bfcacheHooksRegistered = true;

  registerBfcacheRelease(releaseAuthForBfcache);
  registerBfcacheRestore(() => {
    for (const listener of bfcacheRestoreListeners) listener();
  });
}

function ensureAuth(): Auth {
  registerBfcacheHooksOnce();

  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    authInstance = getAuth(firebaseApp);
  }

  return authInstance!;
}

export function getFirebaseApp(): FirebaseApp {
  ensureAuth();
  return firebaseApp!;
}

export async function releaseAuthForBfcache(): Promise<void> {
  if (!firebaseApp) return;

  const app = firebaseApp;
  firebaseApp = null;
  authInstance = null;

  try {
    await deleteApp(app);
  } catch {
    // Best-effort — page may already be unloading.
  }
}

export function onAuthStateChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(ensureAuth(), cb);
}

export function onAuthBfcacheRestore(cb: () => void): () => void {
  bfcacheRestoreListeners.add(cb);
  return () => bfcacheRestoreListeners.delete(cb);
}

export async function signInWithGoogle(): Promise<void> {
  const auth = ensureAuth();
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    const code = (err as { code?: string })?.code ?? "";
    if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment") {
      await signInWithRedirect(auth, googleProvider);
      return;
    }
    throw err;
  }
}

export async function completeGoogleRedirectSignIn(): Promise<User | null> {
  const result = await getRedirectResult(ensureAuth());
  return result?.user ?? null;
}

export async function signInWithEmail(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(ensureAuth(), email, password);
}

export async function signUpWithEmail(email: string, password: string): Promise<boolean> {
  const cred = await createUserWithEmailAndPassword(ensureAuth(), email, password);
  try {
    await sendEmailVerification(cred.user);
    return true;
  } catch (e) {
    console.error("[signUpWithEmail] verification email failed", e);
    return false;
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(ensureAuth());
}

export function hasClaimedFreeCredit(uid: string): boolean {
  try {
    return localStorage.getItem(`gk_free_claimed_${uid}`) === "1";
  } catch {
    return false;
  }
}

export async function claimFreeCredit(user: User): Promise<number | null> {
  if (user.isAnonymous) return null;

  const guardKey = `gk_free_claimed_${user.uid}`;
  try {
    if (localStorage.getItem(guardKey)) return null;
  } catch {
    // localStorage unavailable — fall through
  }

  try {
    const token = await user.getIdToken();
    const res = await fetch("/.netlify/functions/grant-free-credit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { credits?: number; granted?: boolean; reason?: string };

    if (typeof data.credits === "number") {
      try {
        localStorage.setItem(guardKey, "1");
      } catch {
        // ignore
      }
      return data.credits;
    }
    return null;
  } catch (e) {
    console.error("[claimFreeCredit] request failed", e);
    return null;
  }
}

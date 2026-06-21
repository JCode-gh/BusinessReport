import { initializeApp } from "firebase/app";
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
  type User,
} from "firebase/auth";
import {
  initializeFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocFromServer,
  getDocs,
  deleteDoc,
  updateDoc,
  increment,
  query,
  where,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import type { BusinessKitPlan } from "./businessKit";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Force long polling instead of WebChannel. Auto-detect still makes a WebChannel
// attempt first, which throws "client is offline" on networks/browsers that block
// it (Safari, VPNs, ad blockers, corporate firewalls) before it can fall back.
// Forcing long polling skips that failing attempt entirely for a stable connection.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const googleProvider = new GoogleAuthProvider();

export type StoredReport = {
  id: string;
  uid: string;
  plan: BusinessKitPlan;
  editedHtml?: string;
  createdAt: unknown;
  updatedAt: unknown;
};

export async function saveReport(plan: BusinessKitPlan, uid: string): Promise<string> {
  const ref = doc(collection(db, "reports"));
  await setDoc(ref, {
    uid,
    plan,
    editedHtml: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function loadReport(id: string, currentUid: string): Promise<StoredReport | null> {
  const snap = await getDoc(doc(db, "reports", id));
  if (!snap.exists()) return null;
  
  const data = snap.data();
  const report = { id: snap.id, ...data } as StoredReport;
  
  // Access control: only the owner can load the report
  if (report.uid !== currentUid) {
    throw new Error("Access denied: You don't have permission to view this report");
  }
  
  return report;
}

export type ReportSummary = {
  id: string;
  title: string;
  createdAt: number;
};

export async function listReports(uid: string): Promise<ReportSummary[]> {
  const q = query(
    collection(db, "reports"),
    where("uid", "==", uid),
    limit(20),
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({
      id: d.id,
      title: (d.data().plan as BusinessKitPlan)?.title ?? "Report",
      createdAt: (d.data().createdAt?.toMillis?.() ?? 0) as number,
    }))
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function deleteReport(id: string): Promise<void> {
  await deleteDoc(doc(db, "reports", id));
}

export async function patchReport(id: string, editedHtml: string): Promise<void> {
  await setDoc(
    doc(db, "reports", id),
    { editedHtml, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function renameReport(id: string, title: string, editedHtml: string): Promise<void> {
  await updateDoc(doc(db, "reports", id), {
    "plan.title": title,
    editedHtml,
    updatedAt: serverTimestamp(),
  });
}

// Rename from the homepage list (no HTML available — clears editedHtml so it rebuilds on next open)
export async function renameReportTitle(id: string, title: string): Promise<void> {
  await updateDoc(doc(db, "reports", id), {
    "plan.title": title,
    editedHtml: null,
    updatedAt: serverTimestamp(),
  });
}

export function onAuthStateChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

// Popup flow uses postMessage instead of third-party cookies, so it keeps working
// even when authDomain differs from the app's domain (modern browsers block the
// cross-domain storage that signInWithRedirect relies on). Falls back to redirect
// only when the popup itself can't open.
export async function signInWithGoogle(): Promise<void> {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    const code = (err as { code?: string })?.code ?? "";
    if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment") {
      await signInWithRedirect(auth, googleProvider);
      return;
    }
    // auth/popup-closed-by-user, cancelled-popup-request, etc. — let the caller handle it
    throw err;
  }
}

export async function completeGoogleRedirectSignIn(): Promise<User | null> {
  const result = await getRedirectResult(auth);
  return result?.user ?? null;
}

export async function signInWithEmail(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

// Returns true when a verification email was sent (email/password accounts must
// verify before they qualify for the free report — Google accounts are already
// verified and skip this entirely).
export async function signUpWithEmail(email: string, password: string): Promise<boolean> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  try {
    await sendEmailVerification(cred.user);
    return true;
  } catch (e) {
    console.error("[signUpWithEmail] verification email failed", e);
    return false;
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export async function getUserCredits(uid: string, opts?: { server?: boolean }): Promise<number> {
  try {
    const snap = opts?.server
      ? await getDocFromServer(doc(db, "users", uid))
      : await getDoc(doc(db, "users", uid));
    const credits = !snap.exists()
      ? 0
      : (() => {
          const val = snap.data()?.credits;
          return typeof val === "number" ? Math.max(0, val) : 0;
        })();
    return credits;
  } catch (e) {
    // A denied read (e.g. Firestore rules not deployed) must not crash the app
    console.error("[getUserCredits] read failed — check Firestore rules for /users", e);
    return 0;
  }
}

export async function decrementCredits(uid: string): Promise<boolean> {
  try {
    await updateDoc(doc(db, "users", uid), { credits: increment(-1) });
    return true;
  } catch (e) {
    console.error("[decrementCredits] update failed — check Firestore rules for /users", e);
    return false;
  }
}

// Claims the one-time free trial credit for a new user. The grant happens
// server-side (Firebase Admin) because Firestore rules forbid the client from
// increasing its own credits. Idempotent on the server, so calling it again is
// harmless; a per-device localStorage flag just avoids redundant requests.
// Returns the new credit balance, or null if nothing was claimed.
export async function claimFreeCredit(user: User): Promise<number | null> {
  // Anonymous guests don't qualify for the free report (that would be the easiest
  // farming vector); they'd be rejected server-side anyway, so skip the round-trip.
  if (user.isAnonymous) return null;

  const guardKey = `gk_free_claimed_${user.uid}`;
  try {
    if (localStorage.getItem(guardKey)) return null;
  } catch {
    // localStorage unavailable (private mode) — fall through and rely on the server flag
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

    // A numeric balance means the server reached a final decision for this account
    // (granted, or already-claimed). Cache it so we don't re-ask on every load.
    // Soft denials (unverified email, etc.) omit `credits` — do NOT cache those,
    // so the user can still claim once they verify.
    if (typeof data.credits === "number") {
      try {
        localStorage.setItem(guardKey, "1");
      } catch {
        // ignore — best-effort cache only
      }
      return data.credits;
    }
    return null;
  } catch (e) {
    console.error("[claimFreeCredit] request failed", e);
    return null;
  }
}

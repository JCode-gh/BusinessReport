import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  getRedirectResult,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously as firebaseSignInAnonymously,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
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
  projectId: import.meta.env.FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
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

// Redirect flow avoids popup blockers and third-party cookie issues on custom domains.
export async function signInWithGoogle(): Promise<void> {
  await signInWithRedirect(auth, googleProvider);
}

export async function completeGoogleRedirectSignIn(): Promise<User | null> {
  const result = await getRedirectResult(auth);
  return result?.user ?? null;
}

export async function signInWithEmail(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email: string, password: string): Promise<void> {
  await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInAnonymously(): Promise<void> {
  await firebaseSignInAnonymously(auth);
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export async function getUserCredits(uid: string): Promise<number> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return 0;
  const val = snap.data()?.credits;
  return typeof val === "number" ? Math.max(0, val) : 0;
}

export async function decrementCredits(uid: string): Promise<void> {
  await updateDoc(doc(db, "users", uid), { credits: increment(-1) });
}

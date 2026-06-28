import type { Firestore } from "firebase/firestore";
import type { User } from "firebase/auth";
import type { BusinessKitPlan } from "./businessKit";
import { getFirebaseApp } from "./firebaseAuth";
import { registerBfcacheRelease } from "./bfcacheLifecycle";

let dbPromise: Promise<Firestore> | null = null;
let firestoreModulePromise: Promise<typeof import("firebase/firestore")> | null = null;
let bfcacheHookRegistered = false;

function getFirestoreModule() {
  if (!firestoreModulePromise) {
    firestoreModulePromise = import("firebase/firestore");
  }
  return firestoreModulePromise;
}

function registerFirestoreBfcacheHookOnce(): void {
  if (bfcacheHookRegistered) return;
  bfcacheHookRegistered = true;
  registerBfcacheRelease(releaseFirestoreForBfcache);
}

async function getDb(): Promise<Firestore> {
  registerFirestoreBfcacheHookOnce();

  if (!dbPromise) {
    dbPromise = getFirestoreModule().then(({ initializeFirestore, memoryLocalCache }) =>
      initializeFirestore(getFirebaseApp(), {
        localCache: memoryLocalCache(),
        experimentalForceLongPolling: true,
      }),
    );
  }
  return dbPromise;
}

/** Tear down Firestore before page enters bfcache (long polling blocks restoration). */
export async function releaseFirestoreForBfcache(): Promise<void> {
  if (!dbPromise) return;

  const pendingDb = dbPromise;
  dbPromise = null;

  try {
    const [{ terminate }, db] = await Promise.all([getFirestoreModule(), pendingDb]);
    await terminate(db);
  } catch {
    // Best-effort — page may already be unloading.
  }
}

async function withFirestore<T>(
  fn: (mod: typeof import("firebase/firestore"), db: Firestore) => Promise<T>,
): Promise<T> {
  try {
    const [mod, db] = await Promise.all([getFirestoreModule(), getDb()]);
    return await fn(mod, db);
  } finally {
    await releaseFirestoreForBfcache();
  }
}

export type StoredReport = {
  id: string;
  uid: string;
  plan: BusinessKitPlan;
  editedHtml?: string;
  createdAt: unknown;
  updatedAt: unknown;
};

export type ReportSummary = {
  id: string;
  title: string;
  createdAt: number;
};

export async function saveReport(plan: BusinessKitPlan, uid: string): Promise<string> {
  return withFirestore(async ({ collection, doc, setDoc, serverTimestamp }, db) => {
    const ref = doc(collection(db, "reports"));
    await setDoc(ref, {
      uid,
      plan,
      editedHtml: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  });
}

export async function loadReport(id: string, currentUid: string): Promise<StoredReport | null> {
  return withFirestore(async ({ doc, getDoc }, db) => {
    const snap = await getDoc(doc(db, "reports", id));
    if (!snap.exists()) return null;

    const data = snap.data();
    const report = { id: snap.id, ...data } as StoredReport;

    if (report.uid !== currentUid) {
      throw new Error("Access denied: You don't have permission to view this report");
    }

    return report;
  });
}

export async function listReports(uid: string): Promise<ReportSummary[]> {
  return withFirestore(async ({ collection, query, where, limit, getDocs }, db) => {
    const q = query(collection(db, "reports"), where("uid", "==", uid), limit(20));
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => ({
        id: d.id,
        title: (d.data().plan as BusinessKitPlan)?.title ?? "Report",
        createdAt: (d.data().createdAt?.toMillis?.() ?? 0) as number,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
  });
}

export async function deleteReport(id: string): Promise<void> {
  await withFirestore(async ({ doc, deleteDoc }, db) => {
    await deleteDoc(doc(db, "reports", id));
  });
}

export async function patchReport(id: string, editedHtml: string): Promise<void> {
  await withFirestore(async ({ doc, setDoc, serverTimestamp }, db) => {
    await setDoc(doc(db, "reports", id), { editedHtml, updatedAt: serverTimestamp() }, { merge: true });
  });
}

export async function renameReport(id: string, title: string, editedHtml: string): Promise<void> {
  await withFirestore(async ({ doc, updateDoc, serverTimestamp }, db) => {
    await updateDoc(doc(db, "reports", id), {
      "plan.title": title,
      editedHtml,
      updatedAt: serverTimestamp(),
    });
  });
}

export async function renameReportTitle(id: string, title: string): Promise<void> {
  await withFirestore(async ({ doc, updateDoc, serverTimestamp }, db) => {
    await updateDoc(doc(db, "reports", id), {
      "plan.title": title,
      editedHtml: null,
      updatedAt: serverTimestamp(),
    });
  });
}

export async function getUserCredits(uid: string, opts?: { server?: boolean }): Promise<number> {
  try {
    return await withFirestore(async ({ doc, getDoc, getDocFromServer }, db) => {
      const snap = opts?.server
        ? await getDocFromServer(doc(db, "users", uid))
        : await getDoc(doc(db, "users", uid));
      if (!snap.exists()) return 0;
      const val = snap.data()?.credits;
      return typeof val === "number" ? Math.max(0, val) : 0;
    });
  } catch (e) {
    console.error("[getUserCredits] read failed — check Firestore rules for /users", e);
    return 0;
  }
}

export async function decrementCredits(uid: string): Promise<boolean> {
  try {
    await withFirestore(async ({ doc, updateDoc, increment }, db) => {
      await updateDoc(doc(db, "users", uid), { credits: increment(-1) });
    });
    return true;
  } catch (e) {
    console.error("[decrementCredits] update failed — check Firestore rules for /users", e);
    return false;
  }
}

export type { User };

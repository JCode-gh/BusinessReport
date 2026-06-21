import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

export function getDb(): Firestore {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    // Netlify stores multiline secrets with literal \n — convert back to real newlines
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    const missing = [
      !projectId && 'FIREBASE_PROJECT_ID',
      !clientEmail && 'FIREBASE_CLIENT_EMAIL',
      !privateKey && 'FIREBASE_PRIVATE_KEY',
    ].filter(Boolean);
    if (missing.length) {
      throw new Error(`Missing Firebase Admin env vars: ${missing.join(', ')}`);
    }

    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  return getFirestore();
}

/**
 * Grants report credits for a given Stripe Checkout session.
 * Idempotent: if the same session has already been processed (by the webhook
 * or a previous verify call), it does NOT add credits again.
 * Returns the user's credit balance after the operation.
 */
export async function grantCreditOnce(
  db: Firestore,
  sessionId: string,
  uid: string,
  creditAmount = 1,
): Promise<number> {
  const creditsToGrant = Math.max(1, Math.floor(creditAmount));
  const sessionRef = db.collection('processedSessions').doc(sessionId);
  const userRef = db.collection('users').doc(uid);

  return db.runTransaction(async (tx) => {
    const [sessionDoc, userDoc] = await Promise.all([tx.get(sessionRef), tx.get(userRef)]);
    const raw = userDoc.data()?.credits;
    const currentCredits = typeof raw === 'number' ? raw : 0;

    if (sessionDoc.exists) {
      return currentCredits;
    }

    const newCredits = currentCredits + creditsToGrant;
    tx.set(sessionRef, {
      uid,
      creditsGranted: creditsToGrant,
      processedAt: new Date().toISOString(),
    });
    tx.set(
      userRef,
      { credits: newCredits, lastPaidAt: new Date().toISOString(), lastStripeSessionId: sessionId },
      { merge: true },
    );
    return newCredits;
  });
}

/**
 * Grants a one-time free trial credit so a new user can generate their first
 * report before paying. Idempotent: the `freeCreditGranted` flag guarantees a
 * user can only ever receive the free credit once, no matter how often this runs.
 * Returns the user's credit balance after the operation.
 */
export async function grantFreeCreditOnce(
  db: Firestore,
  uid: string,
  amount = 1,
): Promise<number> {
  const creditsToGrant = Math.max(1, Math.floor(amount));
  const userRef = db.collection('users').doc(uid);

  return db.runTransaction(async (tx) => {
    const userDoc = await tx.get(userRef);
    const data = userDoc.data();
    const currentCredits = typeof data?.credits === 'number' ? data.credits : 0;

    if (data?.freeCreditGranted) {
      return currentCredits;
    }

    const newCredits = currentCredits + creditsToGrant;
    tx.set(
      userRef,
      { credits: newCredits, freeCreditGranted: true, freeCreditAt: new Date().toISOString() },
      { merge: true },
    );
    return newCredits;
  });
}

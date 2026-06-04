import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

export function getDb(): Firestore {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Netlify stores multiline secrets with literal \n — convert back to real newlines
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return getFirestore();
}

/**
 * Grants exactly one report credit for a given Stripe Checkout session.
 * Idempotent: if the same session has already been processed (by the webhook
 * or a previous verify call), it does NOT add another credit.
 * Returns the user's credit balance after the operation.
 */
export async function grantCreditOnce(
  db: Firestore,
  sessionId: string,
  uid: string,
): Promise<number> {
  const sessionRef = db.collection('processedSessions').doc(sessionId);
  const userRef = db.collection('users').doc(uid);

  return db.runTransaction(async (tx) => {
    // All reads must come before any writes in a Firestore transaction
    const [sessionDoc, userDoc] = await Promise.all([tx.get(sessionRef), tx.get(userRef)]);
    const raw = userDoc.data()?.credits;
    const currentCredits = typeof raw === 'number' ? raw : 0;

    if (sessionDoc.exists) {
      // This payment was already credited — no-op
      return currentCredits;
    }

    const newCredits = currentCredits + 1;
    tx.set(sessionRef, { uid, processedAt: new Date().toISOString() });
    tx.set(
      userRef,
      { credits: newCredits, lastPaidAt: new Date().toISOString(), lastStripeSessionId: sessionId },
      { merge: true },
    );
    return newCredits;
  });
}

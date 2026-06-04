import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

function getDb() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Netlify stores multiline secrets as literal \n — replace them
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return getFirestore();
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('[stripe-webhook] Missing Stripe env vars');
    return { statusCode: 500, body: 'Server misconfiguration' };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-04-30.basil' as any });

  const sig = event.headers['stripe-signature'];
  if (!sig) {
    return { statusCode: 400, body: 'Missing Stripe signature' };
  }

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body ?? '',
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err);
    return { statusCode: 400, body: 'Webhook signature verification failed' };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    const uid = session.client_reference_id;

    if (!uid) {
      console.error('[stripe-webhook] Missing client_reference_id in session', session.id);
      return { statusCode: 200, body: 'OK' };
    }

    try {
      const db = getDb();
      await db.collection('users').doc(uid).set(
        {
          credits: FieldValue.increment(1),
          lastPaidAt: new Date().toISOString(),
          lastStripeSessionId: session.id,
        },
        { merge: true },
      );
      console.log('[stripe-webhook] Payment recorded for uid:', uid);
    } catch (err) {
      console.error('[stripe-webhook] Firestore write failed:', err);
      return { statusCode: 500, body: 'Database update failed' };
    }
  }

  return { statusCode: 200, body: 'OK' };
};

import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { getDb, grantCreditOnce } from './lib/credits';

const jsonHeaders = { 'Content-Type': 'application/json' };

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('[verify-checkout] Missing STRIPE_SECRET_KEY');
    return { statusCode: 500, headers: jsonHeaders, body: JSON.stringify({ error: 'Server misconfiguration' }) };
  }

  let sessionId: string;
  let uid: string;
  try {
    const body = JSON.parse(event.body ?? '{}') as { sessionId?: string; uid?: string };
    if (!body.sessionId || !body.uid) throw new Error('missing fields');
    sessionId = body.sessionId;
    uid = body.uid;
  } catch {
    return { statusCode: 400, headers: jsonHeaders, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-04-30.basil' as any });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return { statusCode: 200, headers: jsonHeaders, body: JSON.stringify({ paid: false }) };
    }

    // Security: the session must belong to the user claiming it
    if (session.client_reference_id !== uid) {
      console.error('[verify-checkout] uid mismatch', { sessionUid: session.client_reference_id, uid });
      return { statusCode: 403, headers: jsonHeaders, body: JSON.stringify({ error: 'Session does not belong to this user' }) };
    }

    const db = getDb();
    const credits = await grantCreditOnce(db, session.id, uid);

    return { statusCode: 200, headers: jsonHeaders, body: JSON.stringify({ paid: true, credits }) };
  } catch (err) {
    console.error('[verify-checkout]', err);
    return { statusCode: 500, headers: jsonHeaders, body: JSON.stringify({ error: 'Verification failed' }) };
  }
};

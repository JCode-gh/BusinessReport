import type { Handler } from '@netlify/functions';
import { getAuth } from 'firebase-admin/auth';
import { getDb, grantFreeCreditOnce } from './lib/credits';
import { normalizeEmail, isDisposableEmail, emailKey } from './lib/email';

const jsonHeaders = { 'Content-Type': 'application/json' };

// One free report per verified email identity, so a real new user experiences the
// value before paying — while account-farming yields nothing.
const FREE_CREDITS = 1;

// Denials that carry no credit balance: the client should NOT cache these, so a
// user who later verifies their email can still claim.
function deny(reason: string) {
  return { statusCode: 200, headers: jsonHeaders, body: JSON.stringify({ granted: false, reason }) };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let token: string;
  try {
    const body = JSON.parse(event.body ?? '{}') as { token?: string };
    if (!body.token) throw new Error('missing token');
    token = body.token;
  } catch {
    return { statusCode: 400, headers: jsonHeaders, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  try {
    // getDb() initialises the default Firebase Admin app; getAuth() then reuses it.
    const db = getDb();
    const decoded = await getAuth().verifyIdToken(token);
    const uid = decoded.uid;
    const email = decoded.email;

    // Anti-farming guards. Anonymous/unverified accounts and disposable inboxes
    // are exactly how someone would spin up endless free reports — so they don't
    // qualify. Google sign-ins are always email_verified, so the main flow is
    // unaffected; only email/password users must verify first.
    if (decoded.firebase?.sign_in_provider === 'anonymous' || !email) {
      return deny('no_verified_email');
    }
    if (!decoded.email_verified) {
      return deny('email_unverified');
    }
    if (isDisposableEmail(email)) {
      return deny('disposable_email');
    }

    const key = emailKey(normalizeEmail(email));
    const result = await grantFreeCreditOnce(db, uid, key, FREE_CREDITS);
    return { statusCode: 200, headers: jsonHeaders, body: JSON.stringify(result) };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[grant-free-credit] failed:', message);
    return { statusCode: 500, headers: jsonHeaders, body: JSON.stringify({ error: `Firebase: ${message}` }) };
  }
};

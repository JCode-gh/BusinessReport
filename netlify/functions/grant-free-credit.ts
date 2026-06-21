import type { Handler } from '@netlify/functions';
import { getAuth } from 'firebase-admin/auth';
import { getDb, grantFreeCreditOnce } from './lib/credits';

const jsonHeaders = { 'Content-Type': 'application/json' };

// One free report for every new user, so they experience the value before paying.
const FREE_CREDITS = 1;

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

    const credits = await grantFreeCreditOnce(db, uid, FREE_CREDITS);
    return { statusCode: 200, headers: jsonHeaders, body: JSON.stringify({ credits, granted: true }) };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[grant-free-credit] failed:', message);
    return { statusCode: 500, headers: jsonHeaders, body: JSON.stringify({ error: `Firebase: ${message}` }) };
  }
};

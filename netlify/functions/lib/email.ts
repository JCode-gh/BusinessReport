import { createHash } from 'node:crypto';

// Throwaway/temp-mail providers — new addresses are free and infinite, so they're
// the obvious way to farm free reports. Not exhaustive, but covers the common ones.
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', 'grr.la', 'sharklasers.com',
  '10minutemail.com', '10minutemail.net', 'tempmail.com', 'temp-mail.org', 'tempmail.dev',
  'throwawaymail.com', 'yopmail.com', 'yopmail.net', 'getnada.com', 'nada.email',
  'trashmail.com', 'maildrop.cc', 'dispostable.com', 'fakeinbox.com', 'mintemail.com',
  'mohmal.com', 'emailondeck.com', 'spamgourmet.com', 'mailnesia.com', 'tempr.email',
  'moakt.com', 'mytemp.email', 'burnermail.io', 'mailcatch.com', 'inboxkitten.com',
  'tempmailo.com', 'luxusmail.org', 'mailsac.com', 'tmpmail.org', 'tmpeml.com',
]);

/**
 * Collapses an email to a canonical identity so the same person can't farm free
 * reports via address tricks:
 *  - lowercase + trim
 *  - strip everything after a "+" tag (Gmail, Outlook, Fastmail, iCloud, … all
 *    deliver "+tagged" mail to the same inbox)
 *  - for Gmail, also remove dots ("j.an@gmail" === "jan@gmail") and unify the
 *    googlemail.com alias
 */
export function normalizeEmail(email: string): string {
  const e = email.trim().toLowerCase();
  const at = e.lastIndexOf('@');
  if (at <= 0) return e;

  let local = e.slice(0, at);
  let domain = e.slice(at + 1);

  const plus = local.indexOf('+');
  if (plus !== -1) local = local.slice(0, plus);

  if (domain === 'googlemail.com') domain = 'gmail.com';
  if (domain === 'gmail.com') local = local.replace(/\./g, '');

  return `${local}@${domain}`;
}

export function isDisposableEmail(email: string): boolean {
  const at = email.lastIndexOf('@');
  if (at <= 0) return false;
  return DISPOSABLE_DOMAINS.has(email.slice(at + 1).trim().toLowerCase());
}

/** Stable, privacy-preserving ledger key for a normalized email (no raw email stored). */
export function emailKey(normalizedEmail: string): string {
  return createHash('sha256').update(normalizedEmail).digest('hex');
}

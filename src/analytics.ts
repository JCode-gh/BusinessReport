// Lightweight, privacy-friendly analytics so the funnel becomes measurable.
//
// Uses Plausible (cookieless, GDPR-friendly — no consent banner needed, which
// matters for an EU/Belgian audience). It is a complete no-op until
// VITE_PLAUSIBLE_DOMAIN is set, so nothing breaks in local dev or before setup.
//
// Setup: create a site at https://plausible.io (or self-host), then set
//   VITE_PLAUSIBLE_DOMAIN=growthkit.jcode.be
// in Netlify env vars and redeploy. Custom events below show up under "Goals".

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
  }
}

const PLAUSIBLE_DOMAIN = (import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined)?.trim();
const PLAUSIBLE_SRC =
  (import.meta.env.VITE_PLAUSIBLE_SRC as string | undefined)?.trim() ||
  "https://plausible.io/js/script.tagged-events.js";

let initialised = false;

export function initAnalytics(): void {
  if (initialised || !PLAUSIBLE_DOMAIN || typeof document === "undefined") return;
  initialised = true;

  const load = () => {
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-domain", PLAUSIBLE_DOMAIN);
    script.src = PLAUSIBLE_SRC;
    document.head.appendChild(script);

    window.plausible =
      window.plausible ||
      function (...args: unknown[]) {
        (window.plausible as unknown as { q?: unknown[] }).q =
          (window.plausible as unknown as { q?: unknown[] }).q || [];
        (window.plausible as unknown as { q: unknown[] }).q.push(args);
      };
  };

  const schedule =
    typeof window.requestIdleCallback === "function"
      ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 3000 })
      : (cb: () => void) => window.addEventListener("load", cb, { once: true });

  schedule(load);
}

/** Funnel events — kept as a union so call sites stay consistent. */
export type AnalyticsEvent =
  | "signin_started"
  | "signed_in"
  | "wizard_opened"
  | "report_generated"
  | "paywall_shown"
  | "checkout_started"
  | "payment_success"
  | "example_viewed";

export function track(event: AnalyticsEvent, props?: EventProps): void {
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    // never let analytics break the app
  }
}

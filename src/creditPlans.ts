export type CreditPlanId = 'single' | 'bundle5' | 'bundle10';

export type CreditPlan = {
  id: CreditPlanId;
  credits: number;
  priceCents: number;
  popular?: boolean;
};

/** Canonical plan definitions — keep in sync with netlify/functions/lib/plans.ts */
export const CREDIT_PLANS: CreditPlan[] = [
  { id: 'single', credits: 1, priceCents: 500 },
  { id: 'bundle5', credits: 5, priceCents: 2000, popular: true },
  { id: 'bundle10', credits: 10, priceCents: 3500 },
];

export const DEFAULT_CREDIT_PLAN_ID: CreditPlanId = 'bundle5';

export function getCreditPlan(planId: string): CreditPlan | undefined {
  return CREDIT_PLANS.find((p) => p.id === planId);
}

export function formatEur(cents: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function perReportCents(plan: CreditPlan): number {
  return Math.round(plan.priceCents / plan.credits);
}

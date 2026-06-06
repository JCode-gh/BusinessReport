export type CreditPlanId = 'single' | 'bundle5' | 'bundle10';

export type CreditPlan = {
  id: CreditPlanId;
  credits: number;
  priceCents: number;
};

/** Must match src/creditPlans.ts */
export const CREDIT_PLANS: CreditPlan[] = [
  { id: 'single', credits: 1, priceCents: 500 },
  { id: 'bundle5', credits: 5, priceCents: 2000 },
  { id: 'bundle10', credits: 10, priceCents: 3500 },
];

export function getCreditPlan(planId: string): CreditPlan | undefined {
  return CREDIT_PLANS.find((p) => p.id === planId);
}

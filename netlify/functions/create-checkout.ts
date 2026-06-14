import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { getCreditPlan } from './lib/plans';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('[create-checkout] Missing STRIPE_SECRET_KEY env var');
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Server misconfiguration' }) };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-04-30.basil' as any });

  let uid: string;
  let email: string | undefined;
  let planId: string;
  try {
    const body = JSON.parse(event.body ?? '{}') as { uid?: string; email?: string; planId?: string };
    if (!body.uid) throw new Error('Missing uid');
    uid = body.uid;
    email = body.email;
    planId = body.planId ?? 'single';
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const plan = getCreditPlan(planId);
  if (!plan) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid plan' }) };
  }

  const origin = event.headers.origin ?? 'https://growthkit.jcode.be';
  const paymentMethodTypes = (process.env.STRIPE_PAYMENT_METHODS ?? 'card,bancontact')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const reportLabel = plan.credits === 1 ? '1 growth report' : `${plan.credits} growth reports`;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: paymentMethodTypes as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: plan.priceCents,
            product_data: {
              name: 'Entrepreneur Growth Kit',
              description: reportLabel,
            },
          },
          quantity: 1,
        },
      ],
      client_reference_id: uid,
      customer_email: email,
      metadata: {
        credits: String(plan.credits),
        planId: plan.id,
      },
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('[create-checkout]', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to create checkout session' }),
    };
  }
};

import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' as any });

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let uid: string;
  let email: string | undefined;
  try {
    const body = JSON.parse(event.body ?? '{}') as { uid?: string; email?: string };
    if (!body.uid) throw new Error('Missing uid');
    uid = body.uid;
    email = body.email;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const origin = event.headers.origin ?? 'https://growthkit.jcode.be';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'bancontact', 'ideal'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: 500,
            product_data: {
              name: 'Entrepreneur Growth Kit',
              description: 'Eenmalige toegang — onbeperkt rapporten genereren',
            },
          },
          quantity: 1,
        },
      ],
      client_reference_id: uid,
      customer_email: email,
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

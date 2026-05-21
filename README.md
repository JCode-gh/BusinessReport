# AI Entrepreneur Growth Kit

This project is now centered on a more sellable AI wrapper: users describe their business, offer, audience, problem, and goal, then receive a polished consultant-style growth report that opens in the browser and can be saved as a PDF.

## Setup

Create a `.env` file:

```env
OPEN_ROUTER_API_KEY=your_openrouter_key_here

# General fallback model.
OPEN_ROUTER_MODEL=openrouter/free

# Recommended for the paid product flow: set this to a stronger paid OpenRouter model.
BUSINESS_KIT_MODEL=your_paid_openrouter_model_here
BUSINESS_KIT_MAX_COMPLETION_TOKENS=9000

# Free mode. Stripe stays disabled unless STRIPE_PAYWALL_ENABLED=true.
NODE_ENV=development
APP_BASE_URL=http://localhost:5173
STRIPE_PAYWALL_ENABLED=false
STRIPE_SECRET_KEY=sk_live_or_test_key
STRIPE_PRICE_ID=price_your_one_time_report_price
STRIPE_AMOUNT_LABEL=One-time report access
```

For models that support JSON schema, you can opt in:

```env
BUSINESS_KIT_USE_JSON_SCHEMA=true
```

Run the API:

```bash
npm run dev
```

Restart the API after changing TypeScript files, because this small example does not include a file watcher.

## Run The Vue Frontend

Install dependencies once:

```bash
npm install --prefix frontend
```

Start the frontend:

```bash
npm run dev:frontend
```

Open:

```text
http://localhost:5173
```

The Vue app sends requests to the API through Vite's `/api` proxy.

## Create A Business Kit

Send business context to `/api/createBusinessKit`. The response is an inline HTML report that opens in a browser and includes controls for printing or saving as PDF. Static report labels support English, Dutch, French, and German. The AI is also instructed to write the report content in the selected language.

```bash
curl -X POST http://localhost:3000/api/createBusinessKit \
  -H "Content-Type: application/json" \
  -d '{"businessName":"Northstar Studio","businessType":"B2B web design and automation agency","offer":"Fixed-scope website and automation sprint","audience":"Local service businesses with 5 to 30 employees","problem":"Outdated website and inconsistent sales pipeline","goal":"Book more qualified calls and sell higher-ticket packages","channels":"LinkedIn, email, referrals","pricePoint":"Current 1500 to 3500 EUR, target 5000 to 9000 EUR","region":"Belgium and Netherlands","tone":"Premium consultant, direct and practical","language":"en"}' \
  --output northstar-growth-kit.html
```

The AI only creates a structured strategy plan. Local code repairs malformed JSON, validates every section, fills missing parts with a useful fallback, and renders the final report. This makes the product less fragile than asking a model to directly invent complex files.

## Stripe Paywall

The app is free by default. Stripe is skipped unless `STRIPE_PAYWALL_ENABLED=true` is set.

When `STRIPE_PAYWALL_ENABLED=true` and `NODE_ENV=production`, the business kit endpoint requires a paid Stripe Checkout session before generating the full report.

Frontend flow:

1. `GET /api/paymentConfig`
2. `POST /api/createCheckoutSession`
3. Stripe redirects back to `/?payment=success&session_id=...`
4. `POST /api/createBusinessKit` includes `paymentSessionId`

To test the paywall locally, set:

```env
STRIPE_PAYWALL_ENABLED=true
STRIPE_FORCE_PAYWALL=true
```

## Production Build

Build the Vue app:

```bash
npm run build:frontend
```

After the API restarts, Express serves `frontend/dist` from `http://localhost:3000`.

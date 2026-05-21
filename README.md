# Entrepreneur Growth Kit

A static, browser-only growth report builder. Users enter business context, choose a report language, and the Vue app generates a styled HTML report with PDF export and local progress tracking.

The product does not require an Express API, Stripe, OpenRouter, serverless functions, or runtime secrets. It can run as a static Netlify site.

## Local Development

Install frontend dependencies:

```bash
npm install --prefix frontend
```

Start the Vite app:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

The production files are written to:

```text
frontend/dist
```

## Netlify

This repo includes `netlify.toml`.

Netlify settings:

- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`

No environment variables are required.

## Generated Report

The generated report is built entirely in the browser and includes:

- Positioning audit
- Offer rewrite
- Ideal customer profile
- Growth scorecard
- 30-day action plan
- Sales and follow-up templates
- Content ideas
- Metrics to track
- HTML and PDF export

Report progress is stored in the visitor's browser with `localStorage`.

import { jsonrepair } from "jsonrepair";
import { POLLINATIONS_API_KEY, POLLINATIONS_MODEL } from "./pollinationsConfig";
import type {
  BusinessKitLanguage,
  BusinessKitRequest,
  BusinessKitPlan,
} from "./businessKit";

type ExecChips = {
  lever: string;
  blocker: string;
  action: string;
};

type UpsellIdea = {
  title: string;
  price: string;
  scope: string;
  trigger: string;
};

type BusinessScore = {
  label: string;
  score: number;
  rationale: string;
  nextMove: string;
};

type StrategySection = {
  title: string;
  diagnosis: string;
  moves: string[];
};

type ActionItem = {
  day: string;
  task: string;
  outcome: string;
};

type BusinessTemplate = {
  title: string;
  channel: string;
  body: string;
};

type ContentIdea = {
  title: string;
  angle: string;
  hook: string;
};

type BusinessMetric = {
  metric: string;
  target: string;
  why: string;
};

type CompetitorItem = {
  competitor: string;
  weakness: string;
  ourAdvantage: string;
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

export type RetryInfo = {
  attempt: number;
  totalAttempts: number;
  retryAfterSeconds: number;
};

export async function createBusinessKit(
  request: BusinessKitRequest,
  onRetry?: (info: RetryInfo) => void,
  onProgress?: (chars: number) => void,
): Promise<BusinessKitPlan> {
  return await fetchBusinessKitFromApi(request, onRetry, onProgress);
}

async function fetchBusinessKitFromApi(
  request: BusinessKitRequest,
  onRetry?: (info: RetryInfo) => void,
  onProgress?: (chars: number) => void,
): Promise<BusinessKitPlan> {
  const userMessage = formatRequestForApi(request);
  const modes = ["json", "compact"] as const;
  let lastError: Error | null = null;

  for (const mode of modes) {
    try {
      const text = await callPollinationsApi(userMessage, request.language, mode, onRetry, onProgress);
      const plan = parseApiPlan(text, request);
      if (plan) return plan;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  const incompleteMessages: Record<BusinessKitLanguage, string> = {
    nl: "De AI gaf een onvolledig rapport terug. Probeer opnieuw te genereren.",
    en: "The AI returned an incomplete report. Please try generating again.",
    fr: "L'IA a renvoyé un rapport incomplet. Réessayez la génération.",
    de: "Die KI lieferte einen unvollständigen Report. Bitte erneut generieren.",
  };

  throw lastError ?? new Error(incompleteMessages[request.language]);
}

function formatRequestForApi(request: BusinessKitRequest): string {
  const languageNames: Record<BusinessKitLanguage, string> = {
    en: "English",
    nl: "Dutch (Nederlands)",
    fr: "French",
    de: "German",
  };
  const languageInstructions: Record<BusinessKitLanguage, string> = {
    en: "Write every user-facing field in fluent English. Keep JSON property names in English.",
    nl: "Schrijf elke zichtbare rapportzin volledig in vloeiend Nederlands. De brief kan Engels bevatten: neem de betekenis over, maar kopieer NOOIT Engelse zinnen letterlijk in je output. Geen mengtaal. Merknamen en eigennamen blijven onvertaald. Vakjargon mag Engels blijven: cold email, cold outreach, follow-up, lead, leads, lead generation, pipeline, funnel, pitch, upsell, cross-sell, CRM, B2B, B2C, LinkedIn, sprint, template, niche, onboarding, retainer, SaaS, ROI, KPI, USP, landing page, call-to-action, inbox, DM.",
    fr: "Rédigez chaque champ visible entièrement en français. Le brief peut être en anglais: absorbez le sens, ne copiez jamais de phrases anglaises telles quelles. Pas de mélange de langues. Noms propres et marques inchangés. Jargon pro anglais accepté: cold email, cold outreach, follow-up, lead, leads, lead generation, pipeline, funnel, pitch, upsell, cross-sell, CRM, B2B, B2C, LinkedIn, sprint, template, niche, onboarding, retainer, SaaS, ROI, KPI, USP, landing page, call-to-action, inbox, DM.",
    de: "Schreiben Sie jedes sichtbare Feld vollständig auf Deutsch. Das Briefing kann Englisch sein: Bedeutung übernehmen, aber niemals englische Sätze wörtlich kopieren. Kein Sprachmix. Markennamen unverändert. Fachjargon darf Englisch bleiben: cold email, cold outreach, follow-up, lead, leads, lead generation, pipeline, funnel, pitch, upsell, cross-sell, CRM, B2B, B2C, LinkedIn, sprint, template, niche, onboarding, retainer, SaaS, ROI, KPI, USP, landing page, call-to-action, inbox, DM.",
  };

  const translationExamples: Partial<Record<BusinessKitLanguage, string>> = {
    nl: `
MENGTAAL — VERBODEN:
FOUT: "Een heldere zin die Book more qualified sales calls and sell higher-ticket packages within 30 days koppelt aan Local service businesses with 5 to 30 employees that rely on referrals."
GOED: "Een heldere zin die meer gekwalificeerde salesgesprekken en hogere pakketten binnen 30 dagen koppelt aan lokale dienstverleners met 5 tot 30 medewerkers die vooral op referrals vertrouwen."`,
    fr: `
MÉLANGE — INTERDIT: ne jamais insérer des fragments anglais du brief dans une phrase française.`,
    de: `
SPRACHMIX — VERBOTEN: niemals englische Brief-Fragmente wörtlich in deutsche Sätze einfügen.`,
  };

  return `CRITICAL LANGUAGE REQUIREMENT: Every JSON string value must be 100% in ${languageNames[request.language]} — no mixed-language sentences.

TRANSLATION RULE
================
The brief below is SOURCE DATA. It may be in English.
- Absorb the facts; rewrite everything fully in ${languageNames[request.language]}.
- NEVER paste brief phrases verbatim when they are not already in ${languageNames[request.language]}.
- NEVER write: "[${languageNames[request.language]} words] + [copied English brief phrase] + [${languageNames[request.language]} words]".
${translationExamples[request.language] ?? ""}

BUSINESS BRIEF (translate fully — do not quote verbatim in the output language)
================================================================================
Report language: ${languageNames[request.language]}
Language instruction: ${languageInstructions[request.language]}

Business name: ${request.businessName || "Not provided"}
Business type: ${request.businessType || "Not provided"}
Current offer: ${request.offer || "Not provided"}
Target customer: ${request.audience || "Not provided"}
Core problem they face: ${request.problem || "Not provided"}
Growth goal (30 days): ${request.goal || "Not provided"}
Active channels: ${request.channels || "Not provided"}
Current / target price point: ${request.pricePoint || "Not provided"}
Already working (live systems, channels, offers): ${request.alreadyWorking || "Not provided"}
In progress now: ${request.inProgress || "Not provided"}
Region / market: ${request.region || "Not provided"}
Report tone: ${request.tone || "Clear, direct, premium, practical"}

ANTI-DUPLICATION (mandatory)
============================
The brief lists what the business ALREADY has or is BUILDING. Before writing quickWins, actionPlan, strategySections moves, scorecard nextMove, or templates:
- Do NOT recommend starting something the brief marks as already working or in progress — unless the brief explicitly says it is failing.
- Instead recommend the NEXT level: optimize, systematize, scale, measure, or fix what is broken.
- Example: if LinkedIn is an active channel, do not say "start posting on LinkedIn" — say how to turn sporadic posts into outbound or conversion.
- Example: if a recurring offer already exists, do not say "add a retainer" — say how to increase attach rate or pitch it at delivery.
- If "already working" says they are starting fresh, treat everything as greenfield.

COMPETITIVE CONTEXT
===================
Name 2–3 real, specific competitors or alternatives that ${request.audience || "the target customer"} is actually comparing RIGHT NOW when considering "${request.businessName || "this business"}" (${request.businessType || "Not provided"}) in "${request.region || "Not provided"}". These must be specific to THIS business type and region — research the actual competitive landscape, do not fall back on generic names. Use the real platform, company, or service category name (e.g. for a Belgian HR consultant: "SD Worx HR outsourcing", "Local interim bureaus", "Officient HR software" — completely different from what you would name for a restaurant or a SaaS product). For each competitor: one specific weakness from the buyer's perspective, and one concrete advantage this business has over them. Include as "competitorAnalysis" in the JSON.

Build a full entrepreneur growth kit for this business. Every section must be specific to the brief above — never use placeholder text or generic advice that could apply to any business.

FINAL REMINDER: ALL string values must be 100% in ${languageNames[request.language]} with zero copied English brief fragments. Re-read every field before responding.`;
}

function apiSystemPrompt(mode: "json" | "compact", language: BusinessKitLanguage): string {
  const jsonInstruction = mode === "json"
    ? "Return ONLY a raw JSON object. Start with { and end with }. No markdown fences, no commentary, no text outside the JSON."
    : "Return ONLY a raw JSON object starting with {. Keep individual string values concise to stay within the token limit, but keep all required keys.";

  const languageNames: Record<BusinessKitLanguage, string> = {
    en: "English",
    nl: "Dutch (Nederlands)",
    fr: "French",
    de: "German",
  };

  const mixedLanguageRule = language === "en"
    ? ""
    : `
LANGUAGE (highest priority)
- Output language: ${languageNames[language]} only.
- The brief may be English; translate it fully. Never quote untranslated brief text inside a ${languageNames[language]} sentence.
- Mixed-language output is an automatic failure (e.g. Dutch sentence structure with English brief phrases copied in).`;

  return `CRITICAL: You MUST write ALL content in ${languageNames[language]}. Every field must be fully in that language — never mixed with untranslated brief text.

You are a senior growth strategist with 15 years of experience advising small businesses, boutique agencies, solo consultants, SaaS founders, ecommerce operators, and local service companies. You write in the style of a premium paid consultant report — sharp, specific, commercially grounded, and immediately actionable.
${mixedLanguageRule}

NOTE: Examples below are in English for structure only. Your actual output must be in ${languageNames[language]}.

${jsonInstruction}

FORBIDDEN (never do any of these):
- Generic advice that could apply to any business
- Vague actions without a concrete next step
- Scores above 70 without explicit evidence from the brief
- Empty, skeleton, or short templates
- Wrong language or mixed-language sentences (copying English brief phrases into ${languageNames[language]} text)
- Placeholders like "[insert your offer]" or "[your audience]" — only [Name] and [Company] are allowed

QUALITY RULES (never break these):
- Every recommendation must name a specific action, not a category. Bad: "improve your marketing". Good: "Rewrite your LinkedIn headline to lead with the buyer's painful outcome, not your job title."
- Every diagnosis must explain WHY the problem exists, not just that it exists.
- Scores must be brutally honest. A business with no mentioned outbound system MUST score below 45 on Lead Generation. Never give scores above 70 unless the brief explicitly proves it.
- Templates must include a complete subject line AND full body copy of minimum 5 sentences. No placeholders except [Name] and [Company].
- Content ideas must include a specific angle and a punchy first line (hook) someone could post today.
- Metrics must include a realistic numeric target tied to the business's price point and stage.
- Action plan items must start with an action verb (Write, Build, Launch, Send, Create, Record, Set up) and state a concrete deliverable. Bad: "Work on positioning". Good: "Write a one-sentence value proposition using the formula: We help [audience] achieve [outcome] without [obstacle]."
- If a field is missing from the brief, make a clearly-labeled assumption and work with it — never output a generic placeholder.
- Tone must match the brief's requested style throughout.
- Never recommend starting a channel, system, or offer the brief lists as already working or in progress — recommend the next optimization step instead.

EXAMPLES OF GOOD VS BAD OUTPUT (follow the GOOD examples exactly):

executiveSummaryChips:
BAD: { "lever": "This business has potential.", "blocker": "Marketing needs work.", "action": "Focus on customers." }
GOOD: { "lever": "Northstar Studio's biggest lever is repositioning from 'web design agency' to 'revenue-focused digital system for service businesses' — pricing is 40% below market for the value delivered.", "blocker": "Referrals are the only active channel, creating feast-or-famine cycles with no repeatable outbound system.", "action": "Launch systematic LinkedIn outreach targeting Benelux service businesses with 5–30 staff and rewrite proposals to anchor on ROI, not deliverables." }

actionPlan (single item):
BAD: { "day": "Day 1", "task": "Work on positioning", "outcome": "Better positioning" }
GOOD: { "day": "Day 1", "task": "Write one positioning sentence using the formula: We help [specific audience] achieve [specific outcome] without [specific obstacle] — test it with 3 past clients today", "outcome": "A positioning statement ready for LinkedIn headline, email signature, and proposal opener immediately" }

templates (single item):
BAD: { "title": "Cold outreach", "channel": "Email", "body": "Hi [Name], I noticed your business could benefit from our services. Let me know if you want to chat." }
GOOD: { "title": "Cold email — website ROI pitch", "channel": "Email", "body": "Subject: Your website is costing you qualified leads — here is the fix\\n\\nHi [Name],\\n\\nI looked at [Company]'s website and spotted three gaps that are likely costing you 2–3 qualified enquiries per month: no social proof above the fold, a contact form with no qualifying questions, and a homepage headline that describes what you do instead of what the buyer gets.\\n\\nI run Northstar Studio — we build fixed-scope website and automation systems for service businesses. Our clients typically move from referral-dependent pipelines to 5–8 inbound enquiries per month within 60 days.\\n\\nWould it make sense to do a 20-minute call this week? I can show you exactly what I'd change before we talk budget.\\n\\nBest,\\n[Name]" }

SECTION-BY-SECTION INSTRUCTIONS:

executiveSummaryChips (3 fields, each 1–2 sentences): lever = the single biggest growth lever this business has RIGHT NOW; blocker = the one thing preventing that lever from working; action = the precise strategic shift needed in the next 30 days. Be direct — no preamble, no filler.

positioning (3–4 sentences): Diagnose how this business is currently perceived versus how it SHOULD be positioned. Name the positioning gap. Prescribe the exact repositioning move: what to lead with, what to stop saying, what proof point anchors the claim.

coreOfferRewrite (2–3 sentences): Rewrite the current offer as a buyer would want to hear it — outcome first, scope second, risk-reducer third. Name the deliverable, the timeframe, and the result the buyer walks away with. Kill feature-speak.

idealCustomerProfile (3–4 sentences): Describe the single best-fit buyer profile with enough specificity that you could find 50 of them on LinkedIn this week. Include company size, role, trigger event that makes them ready to buy NOW, and the internal conversation they're having before they search for a solution.

biggestRisks (4–5 items): Name the specific commercial risks — positioning, pricing, channel dependency, operational, competitive. Each risk must explain the consequence if unaddressed, not just name the issue.

quickWins (5–7 items): These are actions completable in 1–5 days that generate a visible result. Sort by impact-to-effort score. Label each with [HIGH/MED/LOW effort] at the start. The first 3 must be completable today. Each must be specific enough to start immediately.

strategySections (5 sections, each with a sharp title): Cover: Offer & Pricing, Acquisition, Conversion, Retention & Expansion, Operations & Leverage. Each diagnosis should be 2–3 sentences explaining the root cause. Each move (3–5 per section) must be a specific executable action, not a theme.

scorecard (6 dimensions): Score: Offer Clarity, Pricing Power, Lead Generation, Conversion System, Customer Retention, Operational Leverage. Each score (0–100) needs a 1-sentence rationale explaining exactly why it earned that score and a concrete next move to improve it. Scores must be brutally honest. A business with no mentioned outbound system MUST score below 45 on Lead Generation. Never give scores above 70 unless the brief explicitly proves it.

competitorAnalysis (2–3 items): Name real competitors or alternatives the target customer is comparing right now. For each: the actual competitor name, their specific weakness from the buyer's perspective, and a concrete advantage the business has over them.

actionPlan (12 items, mandatory): Day 1, Day 2, Day 3, Day 4-5, Day 6-7, Week 2 (part 1), Week 2 (part 2), Week 3 (part 1), Week 3 (part 2), Week 4 (part 1), Week 4 (part 2), Day 30 Review. Each task must start with an action verb. Each task must be a single concrete deliverable. Outcome must be the measurable result of completing that task.

templates (5–6 items): Must include ALL of: cold outreach opener, follow-up after no reply (3 days), discovery call confirmation, proposal follow-up after 3 days silence, LinkedIn connection request (300 chars max), and optionally a WhatsApp/SMS follow-up (short). Each template must be SEND-READY copy someone can paste today — not a description of what to write. Email templates need "Subject:" / "Onderwerp:" plus full body (minimum 5 sentences, multiple paragraphs). Only placeholders matching the output language — EN: [Name] & [Company]; NL: [Naam] & [Bedrijf]; FR: [Nom] & [Société]; DE: [Name] & [Unternehmen]. NEVER insert untranslated brief text. NEVER use label placeholders like "de ideale doelklant" or "het kernaanbod". Rewrite brief facts as natural sentences in the output language.

contentIdeas (6–8 items): Mix of LinkedIn posts, email subjects, and short-form video hooks. Each must target a specific buyer pain or objection. The hook must be a complete opening sentence someone could use today.

metrics (6–8 items): Include leading and lagging indicators. Each metric needs a specific numeric or percentage target grounded in the business's price point and sales cycle. The "why" must explain what goes wrong if this metric is ignored.

upsellIdeas (4–5 items): Logical next offers after the first sale. Each must have: a short offer title; a specific price range (e.g. "€500–€1,500/month" or "$2,000 flat"); a 1-sentence scope (exactly what the client gets); and a 1-sentence trigger (the buyer behaviour or milestone that opens the upsell conversation naturally).

assumptions (3–5 items): List the assumptions you made where the brief was silent. Format as "We assume [X] because [Y]. If this is wrong, adjust [Z]."

disclaimer: One sentence, professional, non-alarmist.

REQUIRED JSON SHAPE (all keys required):
{
  "title": string,
  "subtitle": string,
  "executiveSummaryChips": { "lever": string, "blocker": string, "action": string },
  "positioning": string,
  "coreOfferRewrite": string,
  "idealCustomerProfile": string,
  "biggestRisks": string[],
  "quickWins": string[],
  "strategySections": [{ "title": string, "diagnosis": string, "moves": string[] }],
  "scorecard": [{ "label": string, "score": number, "rationale": string, "nextMove": string }],
  "competitorAnalysis": [{ "competitor": string, "weakness": string, "ourAdvantage": string }],
  "actionPlan": [{ "day": string, "task": string, "outcome": string }],
  "templates": [{ "title": string, "channel": string, "body": string }],
  "contentIdeas": [{ "title": string, "angle": string, "hook": string }],
  "metrics": [{ "metric": string, "target": string, "why": string }],
  "upsellIdeas": [{ "title": string, "price": string, "scope": string, "trigger": string }],
  "assumptions": string[],
  "disclaimer": string
}

CRITICAL REMINDER: Every string value must be fully in ${languageNames[language]} with no verbatim English brief fragments. Check every field before responding.`;
}

async function callPollinationsApi(
  userMessage: string,
  language: BusinessKitLanguage,
  mode: "json" | "compact",
  onRetry?: (info: RetryInfo) => void,
  onProgress?: (chars: number) => void,
): Promise<string> {
  const useStream = Boolean(onProgress);
  const endpoint = new URL("https://gen.pollinations.ai/v1/chat/completions");

  const body: Record<string, unknown> = {
    model: POLLINATIONS_MODEL,
    temperature: 0.6,
    stream: useStream,
    messages: [
      { role: "system", content: apiSystemPrompt(mode, language) },
      { role: "user", content: userMessage },
    ],
  };

  if (mode === "json") {
    body.response_format = { type: "json_object" };
  }

  const MAX_RETRIES = 5;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 150_000);

    let response: Response;
    try {
      response = await fetch(endpoint.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(POLLINATIONS_API_KEY ? { Authorization: `Bearer ${POLLINATIONS_API_KEY}` } : {}),
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } finally {
      window.clearTimeout(timeoutId);
    }

    if (response.status === 429) {
      const retryAfter = Number(response.headers.get("retry-after") ?? 30);

      if (attempt < MAX_RETRIES - 1) {
        const waitSeconds = Math.min(retryAfter, 60);
        onRetry?.({ attempt: attempt + 1, totalAttempts: MAX_RETRIES, retryAfterSeconds: waitSeconds });
        await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
        continue;
      }

      throw new RateLimitError(`Rate limited. Try again in ${Math.ceil(retryAfter)} seconds.`);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null) as {
        error?: { message?: string };
      } | null;
      const msg = errorData?.error?.message ?? `Pollinations HTTP ${response.status}`;
      throw new Error(msg);
    }

    if (useStream && response.body) {
      return await readOpenAiSseStream(response.body, onProgress!);
    }

    const data = await response.json().catch(() => ({})) as OpenAiChatResponse;

    if (data.error?.message) {
      const msg = data.error.message;
      console.warn("[BusinessKit] Pollinations error in body:", msg);

      if (attempt < MAX_RETRIES - 1) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        continue;
      }

      throw new Error(msg);
    }

    return extractOpenAiText(data);
  }

  throw new Error("Pollinations request failed after retries.");
}

type OpenAiChatResponse = {
  choices?: Array<{
    message?: { content?: string };
    delta?: { content?: string };
  }>;
  error?: { message?: string };
};

function extractOpenAiText(data: OpenAiChatResponse): string {
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function readOpenAiSseStream(
  body: ReadableStream<Uint8Array>,
  onProgress: (chars: number) => void,
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let accumulated = "";
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (!payload || payload === "[DONE]") continue;

        try {
          const evt = JSON.parse(payload) as OpenAiChatResponse;

          if (evt.error?.message) {
            throw new Error(evt.error.message);
          }

          const chunk = evt.choices?.[0]?.delta?.content ?? "";
          if (chunk) {
            accumulated += chunk;
            onProgress(accumulated.length);
          }
        } catch (e) {
          if (e instanceof Error && !e.message.startsWith("{")) throw e;
          // malformed SSE chunk — skip
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return accumulated;
}

function parseApiPlan(rawText: string, request: BusinessKitRequest): BusinessKitPlan | null {
  if (!rawText.trim()) {
    console.warn("[BusinessKit] Empty response from API");
    return null;
  }

  const candidates = extractJsonCandidates(rawText);

  for (const candidate of candidates) {
    for (const attempt of [candidate, tryJsonRepair(candidate)]) {
      try {
        const parsed = JSON.parse(attempt);
        if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
          return normalizeApiPlan(parsed as Record<string, unknown>, request);
        }
      } catch {
        // try next
      }
    }
  }

  console.warn("[BusinessKit] Could not parse valid JSON from API response:", rawText.slice(0, 500));
  return null;
}

function tryJsonRepair(text: string): string {
  try {
    return jsonrepair(text);
  } catch {
    return text;
  }
}

function extractJsonCandidates(rawText: string): string[] {
  const trimmed = rawText.trim();
  if (!trimmed) return [];

  const candidates = new Set([trimmed]);
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim();
  if (fenced) candidates.add(fenced);

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) candidates.add(trimmed.slice(start, end + 1));

  return Array.from(candidates);
}

function hasMixedLanguage(text: string, reportLang: BusinessKitLanguage): boolean {
  if (!text.trim() || reportLang === "en") return false;

  const lower = text.toLowerCase();
  const englishHits = (lower.match(/\b(the|and|with|for|that|this|your|more|within|from|have|will)\b/g) ?? []).length;
  if (englishHits < 4) return false;

  if (reportLang === "nl") {
    const hits = (lower.match(/\b(de|het|een|van|voor|met|zijn|naar|die|dat)\b/g) ?? []).length;
    return hits >= 2;
  }
  if (reportLang === "fr") {
    const hits = (lower.match(/\b(le|la|les|de|du|des|est|sont|pour|avec|dans|une|qui|que)\b/g) ?? []).length;
    return hits >= 2;
  }
  if (reportLang === "de") {
    const hits = (lower.match(/\b(der|die|das|den|dem|von|mit|ist|sind|für|ein|eine)\b/g) ?? []).length;
    return hits >= 2;
  }
  return false;
}

function defaultPlanTitle(request: BusinessKitRequest): string {
  const name = clean(request.businessName) || "Growth Kit";
  switch (request.language) {
    case "nl":
      return `${name} groeikit`;
    case "fr":
      return `Kit de croissance ${name}`;
    case "de":
      return `${name} Wachstumskit`;
    default:
      return `${name} Growth Kit`;
  }
}

function defaultDisclaimer(language: BusinessKitLanguage): string {
  switch (language) {
    case "nl":
      return "Dit rapport is een strategisch hulpmiddel, geen garantie op omzet, winst of financiering.";
    case "fr":
      return "Ce rapport est un outil stratégique, pas une garantie de chiffre d'affaires, de profit ou de financement.";
    case "de":
      return "Dieser Bericht ist ein strategisches Hilfsmittel, keine Garantie für Umsatz, Gewinn oder Finanzierung.";
    default:
      return "This report is a strategic tool, not a guarantee of revenue, profit, or funding.";
  }
}

function isPlanComplete(plan: BusinessKitPlan): boolean {
  return (
    plan.executiveSummary.length >= 80 &&
    plan.positioning.length >= 40 &&
    plan.coreOfferRewrite.length >= 40 &&
    plan.idealCustomerProfile.length >= 40 &&
    plan.biggestRisks.length >= 3 &&
    plan.quickWins.length >= 3 &&
    plan.strategySections.length >= 3 &&
    plan.scorecard.length >= 3 &&
    plan.actionPlan.length >= 5 &&
    plan.templates.length >= 2 &&
    plan.contentIdeas.length >= 3 &&
    plan.metrics.length >= 3
  );
}

function normalizeApiPlan(
  raw: Record<string, unknown>,
  request: BusinessKitRequest,
): BusinessKitPlan | null {
  const chips = normalizeExecChips(raw.executiveSummaryChips);
  const plan: BusinessKitPlan = {
    language: request.language,
    title: strOr(raw.title, defaultPlanTitle(request)),
    subtitle: strOr(raw.subtitle, ""),
    executiveSummary: chips
      ? `${chips.lever} ${chips.blocker} ${chips.action}`
      : strOr(raw.executiveSummary, ""),
    executiveSummaryChips: chips ?? undefined,
    positioning: strOr(raw.positioning, ""),
    coreOfferRewrite: strOr(raw.coreOfferRewrite, ""),
    idealCustomerProfile: strOr(raw.idealCustomerProfile, ""),
    biggestRisks: strArray(raw.biggestRisks, 8),
    quickWins: strArray(raw.quickWins, 10),
    strategySections: normalizeStrategySections(raw.strategySections),
    scorecard: normalizeScorecard(raw.scorecard),
    competitorAnalysis: normalizeCompetitorAnalysis(raw.competitorAnalysis),
    actionPlan: normalizeActionPlan(raw.actionPlan),
    templates: normalizeTemplates(raw.templates),
    contentIdeas: normalizeContentIdeas(raw.contentIdeas),
    metrics: normalizeMetrics(raw.metrics),
    upsellIdeas: normalizeUpsellIdeas(raw.upsellIdeas),
    assumptions: strArray(raw.assumptions, 8),
    disclaimer: strOr(raw.disclaimer, defaultDisclaimer(request.language)),
  };

  if (!isPlanComplete(plan)) {
    console.warn("[BusinessKit] AI response incomplete — will retry or fail");
    return null;
  }

  if (request.language !== "en") {
    const fieldsToCheck = [
      plan.executiveSummary,
      plan.positioning,
      plan.coreOfferRewrite,
      plan.idealCustomerProfile,
      ...plan.actionPlan.map((a) => a.task),
    ];
    if (fieldsToCheck.some((f) => hasMixedLanguage(f, request.language))) {
      console.warn("[BusinessKit] Possible mixed language in AI output for", request.language);
    }
  }

  return plan;
}

function strOr(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function strArray(value: unknown, max: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => strOr(entry))
    .filter(Boolean)
    .slice(0, max);
}

function normalizeStrategySections(value: unknown): BusinessKitPlan["strategySections"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      title: strOr(v.title),
      diagnosis: strOr(v.diagnosis),
      moves: strArray(v.moves, 8),
    }))
    .filter((v) => v.title && v.diagnosis && v.moves.length > 0)
    .slice(0, 6);
}

function normalizeScorecard(value: unknown): BusinessKitPlan["scorecard"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      label: strOr(v.label),
      score: clampApiScore(v.score),
      rationale: strOr(v.rationale),
      nextMove: strOr(v.nextMove),
    }))
    .filter((v) => v.label && v.rationale && v.nextMove)
    .slice(0, 8);
}

function normalizeActionPlan(value: unknown): BusinessKitPlan["actionPlan"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      day: strOr(v.day),
      task: strOr(v.task),
      outcome: strOr(v.outcome),
    }))
    .filter((v) => v.day && v.task && v.outcome)
    .slice(0, 14);
}

function isUsableTemplate(body: string): boolean {
  const trimmed = body.trim();
  return trimmed.length >= 80;
}

function normalizeTemplates(value: unknown): BusinessKitPlan["templates"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      title: strOr(v.title),
      channel: strOr(v.channel),
      body: strOr(v.body),
    }))
    .filter((v) => v.title && v.channel && v.body && isUsableTemplate(v.body))
    .slice(0, 8);
}

function normalizeContentIdeas(value: unknown): BusinessKitPlan["contentIdeas"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      title: strOr(v.title),
      angle: strOr(v.angle),
      hook: strOr(v.hook),
    }))
    .filter((v) => v.title && v.angle && v.hook)
    .slice(0, 10);
}

function normalizeMetrics(value: unknown): BusinessKitPlan["metrics"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      metric: strOr(v.metric),
      target: strOr(v.target),
      why: strOr(v.why),
    }))
    .filter((v) => v.metric && v.target && v.why)
    .slice(0, 10);
}

function normalizeExecChips(value: unknown): ExecChips | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  const lever = strOr(v.lever);
  const blocker = strOr(v.blocker);
  const action = strOr(v.action);
  if (!lever || !blocker || !action) return null;
  return { lever, blocker, action };
}

function normalizeUpsellIdeas(value: unknown): UpsellIdea[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      title: strOr(v.title),
      price: strOr(v.price),
      scope: strOr(v.scope),
      trigger: strOr(v.trigger),
    }))
    .filter((v) => v.title && v.scope)
    .slice(0, 6);
}

function normalizeCompetitorAnalysis(value: unknown): CompetitorItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      competitor: strOr(v.competitor),
      weakness: strOr(v.weakness),
      ourAdvantage: strOr(v.ourAdvantage),
    }))
    .filter((v) => v.competitor && v.weakness && v.ourAdvantage)
    .slice(0, 5);
}

function clampApiScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 50;
  return Math.min(Math.max(Math.round(n), 0), 100);
}

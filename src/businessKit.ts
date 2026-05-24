import { jsonrepair } from "jsonrepair";

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;
const ANTHROPIC_MODEL = (import.meta.env.VITE_ANTHROPIC_MODEL as string | undefined) || "claude-haiku-4-5-20251001";
const ANTHROPIC_MAX_TOKENS = Number(import.meta.env.VITE_ANTHROPIC_MAX_TOKENS) || 8000;

export type BusinessKitLanguage = "en" | "nl" | "fr" | "de";

export type BusinessKitRequest = {
  businessName?: string;
  businessType?: string;
  offer?: string;
  audience?: string;
  problem?: string;
  goal?: string;
  channels?: string;
  pricePoint?: string;
  region?: string;
  tone?: string;
  language: BusinessKitLanguage;
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

export type BusinessKitPlan = {
  language: BusinessKitLanguage;
  title: string;
  subtitle: string;
  executiveSummary: string;
  positioning: string;
  coreOfferRewrite: string;
  idealCustomerProfile: string;
  biggestRisks: string[];
  quickWins: string[];
  strategySections: StrategySection[];
  scorecard: BusinessScore[];
  competitorAnalysis: CompetitorItem[];
  actionPlan: ActionItem[];
  templates: BusinessTemplate[];
  contentIdeas: ContentIdea[];
  metrics: BusinessMetric[];
  upsellIdeas: string[];
  assumptions: string[];
  disclaimer: string;
};

type Context = {
  language: BusinessKitLanguage;
  businessName: string;
  businessType: string;
  offer: string;
  audience: string;
  problem: string;
  goal: string;
  channels: string;
  pricePoint: string;
  region: string;
  tone: string;
  primaryChannel: string;
};

type ReportLabels = {
  htmlLang: string;
  productName: string;
  generated: string;
  strategyReport: string;
  actionPlanPill: string;
  printPdf: string;
  downloadHtml: string;
  executiveSummary: string;
  positioning: string;
  coreOfferRewrite: string;
  idealCustomerProfile: string;
  fastestQuickWins: string;
  growthScorecard: string;
  competitorAnalysis: string;
  competitor: string;
  competitorWeakness: string;
  competitorAdvantage: string;
  strategicMoves: string;
  actionPlan: string;
  salesTemplates: string;
  contentIdeas: string;
  metricsToTrack: string;
  metric: string;
  target: string;
  whyItMatters: string;
  biggestRisks: string;
  upsellIdeas: string;
  assumptions: string;
  next: string;
  hook: string;
  implementationWorkspace: string;
  workspaceTitle: string;
  workspaceIntro: string;
  progressComplete: string;
  completed: string;
  remaining: string;
  nextFocus: string;
  allActionsDone: string;
  resetProgress: string;
  savedLocally: string;
  saveUnavailable: string;
  trackerHint: string;
  markComplete: string;
  done: string;
  inProgress: string;
  notStarted: string;
  notes: string;
  notesPlaceholder: string;
  copyToClipboard: string;
  copied: string;
  readingTime: string;
  jumpToSection: string;
};

const reportLabels: Record<BusinessKitLanguage, ReportLabels> = {
  en: {
    htmlLang: "en",
    productName: "Entrepreneur Growth Kit",
    generated: "Generated",
    strategyReport: "Strategy Report",
    actionPlanPill: "30-Day Action Plan",
    printPdf: "Print / Save PDF",
    downloadHtml: "Download HTML",
    executiveSummary: "Executive Summary",
    positioning: "Positioning",
    coreOfferRewrite: "Core Offer Rewrite",
    idealCustomerProfile: "Ideal Customer Profile",
    fastestQuickWins: "Fastest Quick Wins",
    growthScorecard: "Growth Scorecard",
    strategicMoves: "Strategic Moves",
    actionPlan: "30-Day Action Plan",
    salesTemplates: "Sales And Follow-Up Templates",
    contentIdeas: "Content Ideas",
    metricsToTrack: "Metrics To Track",
    metric: "Metric",
    target: "Target",
    whyItMatters: "Why It Matters",
    biggestRisks: "Biggest Risks",
    upsellIdeas: "Upsell Ideas",
    assumptions: "Assumptions",
    next: "Next",
    hook: "Hook",
    implementationWorkspace: "Implementation Workspace",
    workspaceTitle: "Work the plan, not just read it.",
    workspaceIntro: "Check off actions as you finish them, keep working notes beside each task, and come back with your progress still intact.",
    progressComplete: "complete",
    completed: "completed",
    remaining: "remaining",
    nextFocus: "Next focus",
    allActionsDone: "Every action is complete. Review the metrics and choose the next growth cycle.",
    resetProgress: "Reset progress",
    savedLocally: "Progress saved on this device",
    saveUnavailable: "Progress tracking is available while this report is open",
    trackerHint: "Your progress is stored in this browser only.",
    markComplete: "Mark complete",
    done: "Done",
    inProgress: "In progress",
    notStarted: "Not started",
    notes: "Notes",
    notesPlaceholder: "Add decisions, blockers, links, or proof from this step.",
    copyToClipboard: "Copy",
    copied: "Copied!",
    readingTime: "min read",
    jumpToSection: "Jump to",
    competitorAnalysis: "Competitor Analysis",
    competitor: "Competitor",
    competitorWeakness: "Weakness",
    competitorAdvantage: "Our Advantage",
  },
  nl: {
    htmlLang: "nl",
    productName: "Ondernemers Groeikit",
    generated: "Gegenereerd",
    strategyReport: "Strategisch rapport",
    actionPlanPill: "Actieplan voor 30 dagen",
    printPdf: "Afdrukken / opslaan als PDF",
    downloadHtml: "HTML downloaden",
    executiveSummary: "Managementsamenvatting",
    positioning: "Positionering",
    coreOfferRewrite: "Herwerkte kernpropositie",
    idealCustomerProfile: "Ideaal klantprofiel",
    fastestQuickWins: "Snelste quick wins",
    growthScorecard: "Groei-scorecard",
    strategicMoves: "Strategische acties",
    actionPlan: "Actieplan voor 30 dagen",
    salesTemplates: "Sales- en opvolgtemplates",
    contentIdeas: "Contentideeën",
    metricsToTrack: "Metrics om te volgen",
    metric: "Metriek",
    target: "Doel",
    whyItMatters: "Waarom dit telt",
    biggestRisks: "Grootste risico's",
    upsellIdeas: "Upsell-ideeën",
    assumptions: "Aannames",
    next: "Volgende stap",
    hook: "Haakje",
    implementationWorkspace: "Implementatiewerkruimte",
    workspaceTitle: "Werk met het plan, lees het niet alleen.",
    workspaceIntro: "Vink acties af wanneer je ze afrondt, bewaar werknotities per taak en kom later terug met je voortgang intact.",
    progressComplete: "voltooid",
    completed: "voltooid",
    remaining: "resterend",
    nextFocus: "Volgende focus",
    allActionsDone: "Alle acties zijn afgerond. Bekijk de metrics en kies de volgende groeicyclus.",
    resetProgress: "Voortgang resetten",
    savedLocally: "Voortgang opgeslagen op dit apparaat",
    saveUnavailable: "Voortgang bijhouden is beschikbaar zolang dit rapport open is",
    trackerHint: "Je voortgang wordt alleen in deze browser opgeslagen.",
    markComplete: "Markeer als voltooid",
    done: "Voltooid",
    inProgress: "Bezig",
    notStarted: "Niet gestart",
    notes: "Notities",
    notesPlaceholder: "Voeg beslissingen, blokkades, links of bewijs van deze stap toe.",
    copyToClipboard: "Kopiëren",
    copied: "Gekopieerd!",
    readingTime: "min lezen",
    jumpToSection: "Ga naar",
    competitorAnalysis: "Concurrentieanalyse",
    competitor: "Concurrent",
    competitorWeakness: "Zwakke punt",
    competitorAdvantage: "Ons voordeel",
  },
  fr: {
    htmlLang: "fr",
    productName: "Kit de croissance entrepreneur",
    generated: "Généré",
    strategyReport: "Rapport stratégique",
    actionPlanPill: "Plan d'action de 30 jours",
    printPdf: "Imprimer / enregistrer en PDF",
    downloadHtml: "Télécharger le HTML",
    executiveSummary: "Résumé exécutif",
    positioning: "Positionnement",
    coreOfferRewrite: "Reformulation de l'offre principale",
    idealCustomerProfile: "Profil client idéal",
    fastestQuickWins: "Actions rapides prioritaires",
    growthScorecard: "Tableau de bord de croissance",
    strategicMoves: "Actions stratégiques",
    actionPlan: "Plan d'action de 30 jours",
    salesTemplates: "Modèles de vente et de relance",
    contentIdeas: "Idées de contenu",
    metricsToTrack: "Indicateurs à suivre",
    metric: "Indicateur",
    target: "Objectif",
    whyItMatters: "Pourquoi c'est important",
    biggestRisks: "Principaux risques",
    upsellIdeas: "Idées d'upsell",
    assumptions: "Hypothèses",
    next: "Prochaine étape",
    hook: "Accroche",
    implementationWorkspace: "Espace de mise en oeuvre",
    workspaceTitle: "Travaillez le plan, ne vous contentez pas de le lire.",
    workspaceIntro: "Cochez les actions au fur et à mesure, gardez vos notes de travail et retrouvez votre progression quand vous revenez au rapport.",
    progressComplete: "terminé",
    completed: "terminées",
    remaining: "restantes",
    nextFocus: "Prochain focus",
    allActionsDone: "Toutes les actions sont terminées. Passez aux indicateurs et choisissez le prochain cycle de croissance.",
    resetProgress: "Réinitialiser la progression",
    savedLocally: "Progression enregistrée sur cet appareil",
    saveUnavailable: "Le suivi de progression est disponible tant que ce rapport est ouvert",
    trackerHint: "Votre progression est enregistrée uniquement dans ce navigateur.",
    markComplete: "Marquer comme terminé",
    done: "Terminé",
    inProgress: "En cours",
    notStarted: "Non commencé",
    notes: "Notes",
    notesPlaceholder: "Ajoutez décisions, blocages, liens ou preuves liés à cette étape.",
    copyToClipboard: "Copier",
    copied: "Copié !",
    readingTime: "min de lecture",
    jumpToSection: "Aller à",
    competitorAnalysis: "Analyse concurrentielle",
    competitor: "Concurrent",
    competitorWeakness: "Point faible",
    competitorAdvantage: "Notre avantage",
  },
  de: {
    htmlLang: "de",
    productName: "Wachstumskit für Unternehmer",
    generated: "Erstellt",
    strategyReport: "Strategiebericht",
    actionPlanPill: "30-Tage-Aktionsplan",
    printPdf: "Drucken / als PDF speichern",
    downloadHtml: "HTML herunterladen",
    executiveSummary: "Zusammenfassung",
    positioning: "Positionierung",
    coreOfferRewrite: "Überarbeitete Kernofferte",
    idealCustomerProfile: "Ideales Kundenprofil",
    fastestQuickWins: "Schnellste Quick Wins",
    growthScorecard: "Wachstums-Scorecard",
    strategicMoves: "Strategische Schritte",
    actionPlan: "30-Tage-Aktionsplan",
    salesTemplates: "Vertriebs- und Follow-up-Vorlagen",
    contentIdeas: "Content-Ideen",
    metricsToTrack: "Kennzahlen zum Verfolgen",
    metric: "Kennzahl",
    target: "Ziel",
    whyItMatters: "Warum es wichtig ist",
    biggestRisks: "Größte Risiken",
    upsellIdeas: "Upsell-Ideen",
    assumptions: "Annahmen",
    next: "Nächster Schritt",
    hook: "Aufhänger",
    implementationWorkspace: "Umsetzungsbereich",
    workspaceTitle: "Arbeite mit dem Plan, statt ihn nur zu lesen.",
    workspaceIntro: "Hake Aktionen ab, sobald du sie erledigst, speichere Arbeitsnotizen und komme später mit erhaltenem Fortschritt zurück.",
    progressComplete: "abgeschlossen",
    completed: "abgeschlossen",
    remaining: "offen",
    nextFocus: "Nächster Fokus",
    allActionsDone: "Alle Aktionen sind abgeschlossen. Prüfe die Kennzahlen und wähle den nächsten Wachstumszyklus.",
    resetProgress: "Fortschritt zurücksetzen",
    savedLocally: "Fortschritt auf diesem Gerät gespeichert",
    saveUnavailable: "Fortschrittstracking ist verfügbar, solange dieser Bericht geöffnet ist",
    trackerHint: "Dein Fortschritt wird nur in diesem Browser gespeichert.",
    markComplete: "Als erledigt markieren",
    done: "Erledigt",
    inProgress: "In Arbeit",
    notStarted: "Nicht gestartet",
    notes: "Notizen",
    notesPlaceholder: "Ergänze Entscheidungen, Blocker, Links oder Nachweise zu diesem Schritt.",
    copyToClipboard: "Kopieren",
    copied: "Kopiert!",
    readingTime: "Min. Lesezeit",
    jumpToSection: "Gehe zu",
    competitorAnalysis: "Wettbewerbsanalyse",
    competitor: "Wettbewerber",
    competitorWeakness: "Schwachpunkt",
    competitorAdvantage: "Unser Vorteil",
  },
};

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

export const ESTIMATED_RESPONSE_CHARS = 12_000;

export async function createBusinessKit(
  request: BusinessKitRequest,
  onRetry?: (info: RetryInfo) => void,
  onProgress?: (chars: number) => void,
): Promise<BusinessKitPlan> {
  if (ANTHROPIC_API_KEY) {
    return await fetchBusinessKitFromApi(request, onRetry, onProgress);
  }
  return buildLocalBusinessKit(request);
}

function buildLocalBusinessKit(request: BusinessKitRequest): BusinessKitPlan {
  const context = normalizeRequest(request);

  return {
    language: context.language,
    title: titleFor(context),
    subtitle: subtitleFor(context),
    executiveSummary: executiveSummaryFor(context),
    positioning: positioningFor(context),
    coreOfferRewrite: offerRewriteFor(context),
    idealCustomerProfile: customerProfileFor(context),
    biggestRisks: risksFor(context),
    quickWins: quickWinsFor(context),
    strategySections: strategySectionsFor(context),
    scorecard: scorecardFor(context),
    competitorAnalysis: [],
    actionPlan: actionPlanFor(context),
    templates: templatesFor(context),
    contentIdeas: contentIdeasFor(context),
    metrics: metricsFor(context),
    upsellIdeas: upsellIdeasFor(context),
    assumptions: assumptionsFor(context),
    disclaimer: disclaimerFor(context.language),
  };
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
      const text = await callAnthropicApi(userMessage, mode, onRetry, onProgress);
      const plan = parseApiPlan(text, request);
      if (plan) return plan;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  throw lastError ?? new Error("OpenRouter did not return a valid plan.");
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
    nl: "Schrijf elke zichtbare rapportzin in vloeiend, natuurlijk Nederlands. Vertaal ook ingevoerde Engelse formuleringen naar Nederlands in titels, paragrafen, tabellen, templates, metrics en actiepunten. Laat merknamen, productnamen, acroniemen en eigennamen onvertaald. BELANGRIJK: vertaal geen gangbare Engelse vakjargontermen die professionals in het Nederlands gewoon in het Engels gebruiken. Laat de volgende termen altijd in het Engels staan: cold email, cold outreach, follow-up, lead, leads, lead generation, pipeline, funnel, pitch, upsell, cross-sell, CRM, B2B, B2C, LinkedIn, sprint, template, niche, onboarding, retainer, SaaS, ROI, KPI, USP, landing page, call-to-action, inbox, DM. Houd JSON-propertynamen in het Engels.",
    fr: "Rédigez chaque champ visible en français courant. Traduisez les formulations fournies en anglais lorsqu'elles apparaissent dans les titres, paragraphes, tableaux, modèles, indicateurs ou plans d'action. Conservez les noms de marque, noms de produits, acronymes et noms propres en anglais. IMPORTANT: ne traduisez pas les termes professionnels anglais couramment utilisés tels quels en français: cold email, cold outreach, follow-up, lead, leads, lead generation, pipeline, funnel, pitch, upsell, cross-sell, CRM, B2B, B2C, LinkedIn, sprint, template, niche, onboarding, retainer, SaaS, ROI, KPI, USP, landing page, call-to-action, inbox, DM. Gardez les noms de propriétés JSON en anglais.",
    de: "Schreiben Sie jedes sichtbare Feld auf fließendem Deutsch. Übersetzen Sie vom Nutzer auf Englisch eingegebene Formulierungen, wenn sie in Titeln, Absätzen, Tabellen, Vorlagen, Kennzahlen oder Aktionsplänen erscheinen. Behalten Sie Markennamen, Produktnamen, Akronyme und Eigennamen auf Englisch. WICHTIG: Übersetzen Sie keine englischen Fachbegriffe, die im Deutschen professionell auf Englisch verwendet werden: cold email, cold outreach, follow-up, lead, leads, lead generation, pipeline, funnel, pitch, upsell, cross-sell, CRM, B2B, B2C, LinkedIn, sprint, template, niche, onboarding, retainer, SaaS, ROI, KPI, USP, landing page, call-to-action, inbox, DM. JSON-Property-Namen bleiben auf Englisch.",
  };

  return `CRITICAL LANGUAGE REQUIREMENT: This entire response MUST be written in ${languageNames[request.language]}. Every single word of every JSON string value must be in ${languageNames[request.language]}. This is non-negotiable. Failing to write in the correct language is the most common and most serious error.

BUSINESS BRIEF
==============
Report language: ${languageNames[request.language]}
Language instruction: ${languageInstructions[request.language]}

Business name: ${request.businessName ?? "Not provided"}
Business type: ${request.businessType ?? "Not provided"}
Current offer: ${request.offer ?? "Not provided"}
Target customer: ${request.audience ?? "Not provided"}
Core problem they face: ${request.problem ?? "Not provided"}
Growth goal (30 days): ${request.goal ?? "Not provided"}
Active channels: ${request.channels ?? "Not provided"}
Current / target price point: ${request.pricePoint ?? "Not provided"}
Region / market: ${request.region ?? "Not provided"}
Report tone: ${request.tone ?? "Clear, direct, premium, practical"}

COMPETITIVE CONTEXT
===================
Based on businessType "${request.businessType ?? "Not provided"}" and region "${request.region ?? "Not provided"}", identify 2–3 specific competitors or alternatives the target customer (${request.audience ?? "Not provided"}) is most likely comparing right now. Name real companies, platforms, or approaches (e.g. "Fiverr freelancers", "Wix website builders", "local marketing agencies") — not vague categories. For each: name the competitor, identify one specific weakness from the buyer's perspective, and state a concrete advantage the business above has over them. Include this as the "competitorAnalysis" field in the JSON.

Build a full entrepreneur growth kit for this business. Every section must be specific to the brief above — never use placeholder text or generic advice that could apply to any business.

FINAL REMINDER: ALL string values in your JSON response must be in ${languageNames[request.language]}. Check every single field before responding.`;
}

function apiSystemPrompt(mode: "json" | "compact"): string {
  const jsonInstruction = mode === "json"
    ? "Return ONLY a raw JSON object. Start with { and end with }. No markdown fences, no commentary, no text outside the JSON."
    : "Return ONLY a raw JSON object starting with {. Keep individual string values concise to stay within the token limit, but keep all required keys.";

  return `CRITICAL: You MUST write ALL content in the language specified in the user message. Every single word of every field must be in that language. This is non-negotiable. If the user specifies Dutch, write everything in Dutch. If French, write in French. If German, write in German.

You are a senior growth strategist with 15 years of experience advising small businesses, boutique agencies, solo consultants, SaaS founders, ecommerce operators, and local service companies. You write in the style of a premium paid consultant report — sharp, specific, commercially grounded, and immediately actionable.

${jsonInstruction}

FORBIDDEN (never do any of these):
- Generic advice that could apply to any business
- Vague actions without a concrete next step
- Scores above 70 without explicit evidence from the brief
- Empty, skeleton, or short templates
- Content in the wrong language — this is the most common failure; check every field
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

EXAMPLES OF GOOD VS BAD OUTPUT (follow the GOOD examples exactly):

executiveSummary:
BAD: "This business has potential for growth. The key is to improve marketing and sales. Focus on the right customers and you will see results in 30 days."
GOOD: "Northstar Studio's single biggest lever is repositioning from 'web design agency' to 'revenue-focused digital system for service businesses' — pricing is currently 40% below market for the value delivered. The blocker is weak outbound: referrals are the only active channel, creating feast-or-famine cycles. The shift needed in 30 days: launch systematic LinkedIn outreach targeting Benelux service businesses with 5–30 staff, combined with a proposal that anchors on ROI rather than deliverables."

actionPlan (single item):
BAD: { "day": "Day 1", "task": "Work on positioning", "outcome": "Better positioning" }
GOOD: { "day": "Day 1", "task": "Write one positioning sentence using the formula: We help [specific audience] achieve [specific outcome] without [specific obstacle] — test it with 3 past clients today", "outcome": "A positioning statement ready for LinkedIn headline, email signature, and proposal opener immediately" }

templates (single item):
BAD: { "title": "Cold outreach", "channel": "Email", "body": "Hi [Name], I noticed your business could benefit from our services. Let me know if you want to chat." }
GOOD: { "title": "Cold email — website ROI pitch", "channel": "Email", "body": "Subject: Your website is costing you qualified leads — here is the fix\\n\\nHi [Name],\\n\\nI looked at [Company]'s website and spotted three gaps that are likely costing you 2–3 qualified enquiries per month: no social proof above the fold, a contact form with no qualifying questions, and a homepage headline that describes what you do instead of what the buyer gets.\\n\\nI run Northstar Studio — we build fixed-scope website and automation systems for service businesses. Our clients typically move from referral-dependent pipelines to 5–8 inbound enquiries per month within 60 days.\\n\\nWould it make sense to do a 20-minute call this week? I can show you exactly what I'd change before we talk budget.\\n\\nBest,\\n[Name]" }

SECTION-BY-SECTION INSTRUCTIONS:

executiveSummary (3–4 sentences): Open with the single biggest growth lever this business has RIGHT NOW. Then name the one thing blocking that lever. Close with the key strategic shift needed in the next 30 days. Be direct — no preamble.

positioning (3–4 sentences): Diagnose how this business is currently perceived versus how it SHOULD be positioned. Name the positioning gap. Prescribe the exact repositioning move: what to lead with, what to stop saying, what proof point anchors the claim.

coreOfferRewrite (2–3 sentences): Rewrite the current offer as a buyer would want to hear it — outcome first, scope second, risk-reducer third. Name the deliverable, the timeframe, and the result the buyer walks away with. Kill feature-speak.

idealCustomerProfile (3–4 sentences): Describe the single best-fit buyer profile with enough specificity that you could find 50 of them on LinkedIn this week. Include company size, role, trigger event that makes them ready to buy NOW, and the internal conversation they're having before they search for a solution.

biggestRisks (4–5 items): Name the specific commercial risks — positioning, pricing, channel dependency, operational, competitive. Each risk must explain the consequence if unaddressed, not just name the issue.

quickWins (5–7 items): These are actions completable in 1–5 days that generate a visible result. Sort by impact-to-effort score. Label each with [HIGH/MED/LOW effort] at the start. The first 3 must be completable today. Each must be specific enough to start immediately.

strategySections (5 sections, each with a sharp title): Cover: Offer & Pricing, Acquisition, Conversion, Retention & Expansion, Operations & Leverage. Each diagnosis should be 2–3 sentences explaining the root cause. Each move (3–5 per section) must be a specific executable action, not a theme.

scorecard (6 dimensions): Score: Offer Clarity, Pricing Power, Lead Generation, Conversion System, Customer Retention, Operational Leverage. Each score (0–100) needs a 1-sentence rationale explaining exactly why it earned that score and a concrete next move to improve it. Scores must be brutally honest. A business with no mentioned outbound system MUST score below 45 on Lead Generation. Never give scores above 70 unless the brief explicitly proves it.

competitorAnalysis (2–3 items): Name real competitors or alternatives the target customer is comparing right now. For each: the actual competitor name, their specific weakness from the buyer's perspective, and a concrete advantage the business has over them.

actionPlan (12 items, mandatory): Day 1, Day 2, Day 3, Day 4-5, Day 6-7, Week 2 (part 1), Week 2 (part 2), Week 3 (part 1), Week 3 (part 2), Week 4 (part 1), Week 4 (part 2), Day 30 Review. Each task must start with an action verb. Each task must be a single concrete deliverable. Outcome must be the measurable result of completing that task.

templates (5–6 items): Must include ALL of: cold outreach opener, follow-up after no reply (3 days), discovery call confirmation, proposal follow-up after 3 days silence, LinkedIn connection request (300 chars max), and optionally a WhatsApp/SMS follow-up (short). Each template must have a complete subject line (for email) AND full body copy of minimum 5 sentences. No placeholders except [Name] and [Company].

contentIdeas (6–8 items): Mix of LinkedIn posts, email subjects, and short-form video hooks. Each must target a specific buyer pain or objection. The hook must be a complete opening sentence someone could use today.

metrics (6–8 items): Include leading and lagging indicators. Each metric needs a specific numeric or percentage target grounded in the business's price point and sales cycle. The "why" must explain what goes wrong if this metric is ignored.

upsellIdeas (4–5 items): Logical next offers after the first sale — priced and scoped, not just named. Explain what triggers the upsell conversation.

assumptions (3–5 items): List the assumptions you made where the brief was silent. Format as "We assume [X] because [Y]. If this is wrong, adjust [Z]."

disclaimer: One sentence, professional, non-alarmist.

REQUIRED JSON SHAPE (all keys required):
{
  "title": string,
  "subtitle": string,
  "executiveSummary": string,
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
  "upsellIdeas": string[],
  "assumptions": string[],
  "disclaimer": string
}

CRITICAL REMINDER: Every string value in this JSON must be written in the language specified in the user message. Check every field before responding.`;
}

async function callAnthropicApi(
  userMessage: string,
  mode: "json" | "compact",
  onRetry?: (info: RetryInfo) => void,
  onProgress?: (chars: number) => void,
): Promise<string> {
  const useStream = Boolean(onProgress);

  const headers: Record<string, string> = {
    "x-api-key": ANTHROPIC_API_KEY!,
    "anthropic-version": "2023-06-01",
    "Content-Type": "application/json",
    "anthropic-dangerous-direct-browser-access": "true",
  };

  const body: Record<string, unknown> = {
    model: ANTHROPIC_MODEL,
    max_tokens: ANTHROPIC_MAX_TOKENS,
    system: apiSystemPrompt(mode),
    messages: [{ role: "user", content: userMessage }],
    temperature: 0.6,
    ...(useStream ? { stream: true } : {}),
  };

  const MAX_RETRIES = 5;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 90_000);

    let response: Response;
    try {
      response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers,
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
      const errorData = await response.json().catch(() => null) as { error?: { message?: string } } | null;
      const msg = errorData?.error?.message ?? `Anthropic HTTP ${response.status}`;
      throw new Error(msg);
    }

    if (useStream && response.body) {
      return await readSseStream(response.body, onProgress!);
    }

    const data = await response.json().catch(() => ({})) as {
      type?: string;
      content?: Array<{ type: string; text?: string }>;
      error?: { type?: string; message?: string };
    };

    if (data.type === "error") {
      const msg = data.error?.message ?? "Anthropic API error";
      console.warn("[BusinessKit] Anthropic error in body:", msg);

      if (attempt < MAX_RETRIES - 1) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        continue;
      }

      throw new Error(msg);
    }

    const block = data.content?.[0];
    return block?.type === "text" ? (block.text?.trim() ?? "") : "";
  }

  throw new Error("Anthropic request failed after retries.");
}

async function readSseStream(
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
        if (payload === "[DONE]") continue;

        try {
          const evt = JSON.parse(payload) as {
            type?: string;
            delta?: { type?: string; text?: string };
            error?: { type?: string; message?: string };
          };

          if (evt.type === "error") {
            throw new Error(evt.error?.message ?? "Anthropic stream error");
          }

          if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
            const text = evt.delta.text ?? "";
            if (text) {
              accumulated += text;
              onProgress(accumulated.length);
            }
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

function detectResponseLanguage(text: string): BusinessKitLanguage {
  const sample = text.slice(0, 400).toLowerCase();
  const nl = (sample.match(/\b(de|het|een|van|voor|met|op|ze|je|we|die|dat|zijn|heeft|naar)\b/g) ?? []).length;
  const fr = (sample.match(/\b(le|la|les|de|du|un|une|pour|avec|est|par|qui|que|au|sur)\b/g) ?? []).length;
  const de = (sample.match(/\b(der|die|das|ist|und|für|von|mit|auf|an|sie|bei|des|zur)\b/g) ?? []).length;
  const en = (sample.match(/\b(the|and|for|with|your|this|that|have|from|will|are|is|our|you)\b/g) ?? []).length;
  const max = Math.max(nl, fr, de, en);
  if (max === 0) return "en";
  if (nl === max) return "nl";
  if (fr === max) return "fr";
  if (de === max) return "de";
  return "en";
}

function normalizeApiPlan(raw: Record<string, unknown>, request: BusinessKitRequest): BusinessKitPlan {
  const fallback = buildLocalBusinessKit(request);

  if (request.language !== "en") {
    const summaryRaw = typeof raw.executiveSummary === "string" ? raw.executiveSummary : "";
    if (summaryRaw.length > 50 && detectResponseLanguage(summaryRaw) === "en") {
      console.warn("[BusinessKit] API response appears to be in English instead of", request.language, "— using local fallback");
      return fallback;
    }
  }

  return {
    language: request.language,
    title: strOr(raw.title, fallback.title),
    subtitle: strOr(raw.subtitle, fallback.subtitle),
    executiveSummary: strOr(raw.executiveSummary, fallback.executiveSummary),
    positioning: strOr(raw.positioning, fallback.positioning),
    coreOfferRewrite: strOr(raw.coreOfferRewrite, fallback.coreOfferRewrite),
    idealCustomerProfile: strOr(raw.idealCustomerProfile, fallback.idealCustomerProfile),
    biggestRisks: strArray(raw.biggestRisks, fallback.biggestRisks, 5),
    quickWins: strArray(raw.quickWins, fallback.quickWins, 7),
    strategySections: normalizeStrategySections(raw.strategySections, fallback.strategySections),
    scorecard: normalizeScorecard(raw.scorecard, fallback.scorecard),
    competitorAnalysis: normalizeCompetitorAnalysis(raw.competitorAnalysis),
    actionPlan: normalizeActionPlan(raw.actionPlan, fallback.actionPlan),
    templates: normalizeTemplates(raw.templates, fallback.templates),
    contentIdeas: normalizeContentIdeas(raw.contentIdeas, fallback.contentIdeas),
    metrics: normalizeMetrics(raw.metrics, fallback.metrics),
    upsellIdeas: strArray(raw.upsellIdeas, fallback.upsellIdeas, 5),
    assumptions: strArray(raw.assumptions, fallback.assumptions, 5),
    disclaimer: strOr(raw.disclaimer, fallback.disclaimer),
  };
}

function strOr(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function strArray(value: unknown, fallback: string[], max: number): string[] {
  if (!Array.isArray(value)) return fallback;
  const items = value.map((v) => strOr(v, "")).filter(Boolean).slice(0, max);
  return items.length > 0 ? items : fallback;
}

function normalizeStrategySections(value: unknown, fallback: BusinessKitPlan["strategySections"]): BusinessKitPlan["strategySections"] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      title: strOr(v.title, ""),
      diagnosis: strOr(v.diagnosis, ""),
      moves: strArray(v.moves, [], 5),
    }))
    .filter((v) => v.title && v.diagnosis && v.moves.length > 0)
    .slice(0, 6);
  return items.length >= 3 ? items : fallback;
}

function normalizeScorecard(value: unknown, fallback: BusinessKitPlan["scorecard"]): BusinessKitPlan["scorecard"] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      label: strOr(v.label, ""),
      score: clampApiScore(v.score),
      rationale: strOr(v.rationale, ""),
      nextMove: strOr(v.nextMove, ""),
    }))
    .filter((v) => v.label && v.rationale && v.nextMove)
    .slice(0, 6);
  return items.length >= 3 ? items : fallback;
}

function normalizeActionPlan(value: unknown, fallback: BusinessKitPlan["actionPlan"]): BusinessKitPlan["actionPlan"] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      day: strOr(v.day, ""),
      task: strOr(v.task, ""),
      outcome: strOr(v.outcome, ""),
    }))
    .filter((v) => v.day && v.task && v.outcome)
    .slice(0, 14);
  return items.length >= 5 ? items : fallback;
}

function normalizeTemplates(value: unknown, fallback: BusinessKitPlan["templates"]): BusinessKitPlan["templates"] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      title: strOr(v.title, ""),
      channel: strOr(v.channel, ""),
      body: strOr(v.body, ""),
    }))
    .filter((v) => v.title && v.channel && v.body)
    .slice(0, 6);
  return items.length >= 2 ? items : fallback;
}

function normalizeContentIdeas(value: unknown, fallback: BusinessKitPlan["contentIdeas"]): BusinessKitPlan["contentIdeas"] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      title: strOr(v.title, ""),
      angle: strOr(v.angle, ""),
      hook: strOr(v.hook, ""),
    }))
    .filter((v) => v.title && v.angle && v.hook)
    .slice(0, 8);
  return items.length >= 3 ? items : fallback;
}

function normalizeMetrics(value: unknown, fallback: BusinessKitPlan["metrics"]): BusinessKitPlan["metrics"] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      metric: strOr(v.metric, ""),
      target: strOr(v.target, ""),
      why: strOr(v.why, ""),
    }))
    .filter((v) => v.metric && v.target && v.why)
    .slice(0, 8);
  return items.length >= 3 ? items : fallback;
}

function normalizeCompetitorAnalysis(value: unknown): CompetitorItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      competitor: strOr(v.competitor, ""),
      weakness: strOr(v.weakness, ""),
      ourAdvantage: strOr(v.ourAdvantage, ""),
    }))
    .filter((v) => v.competitor && v.weakness && v.ourAdvantage)
    .slice(0, 3);
}

function clampApiScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 50;
  return Math.min(Math.max(Math.round(n), 0), 100);
}

function estimateReadingMinutes(plan: BusinessKitPlan): number {
  const text = [
    plan.executiveSummary,
    plan.positioning,
    plan.coreOfferRewrite,
    plan.idealCustomerProfile,
    plan.biggestRisks.join(" "),
    plan.quickWins.join(" "),
    plan.strategySections.map((s) => s.diagnosis + " " + s.moves.join(" ")).join(" "),
    plan.scorecard.map((s) => s.rationale + " " + s.nextMove).join(" "),
    plan.competitorAnalysis.map((c) => c.weakness + " " + c.ourAdvantage).join(" "),
    plan.actionPlan.map((a) => a.task + " " + a.outcome).join(" "),
    plan.templates.map((t) => t.body).join(" "),
    plan.contentIdeas.map((c) => c.angle + " " + c.hook).join(" "),
    plan.metrics.map((m) => m.why).join(" "),
    plan.upsellIdeas.join(" "),
    plan.assumptions.join(" "),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));
}

export function buildBusinessKitHtml(plan: BusinessKitPlan): string {
  const labels = reportLabels[plan.language];
  const readingMinutes = estimateReadingMinutes(plan);
  const hasCompetitors = plan.competitorAnalysis.length > 0;
  const generatedAt = new Intl.DateTimeFormat(localeFor(plan.language), {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
  const reportId = `${slugify(plan.title)}-${hashString([
    plan.title,
    plan.subtitle,
    ...plan.actionPlan.map((item) => `${item.day}:${item.task}`),
  ].join("|"))}`;

  return `<!doctype html>
<html lang="${escapeHtml(labels.htmlLang)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(plan.title)}</title>
  <style>
    :root {
      --ink: #111827;
      --muted: #6b7280;
      --subtle: #9ca3af;
      --paper: #ffffff;
      --line: #e5e7eb;
      --surface: #f7f5ff;
      --accent: #7c6bd6;
      --accent-mid: #6f6acf;
      --accent-dark: #4c3ab5;
      --gold: #d97706;
      --rose: #be185d;
      --navy: #100d28;
      --coral: #c2410c;
      --mint: #f3eeff;
      --amber: #fffbeb;
      --sky: #f5f0ff;
      --lavender: #d6a4e3;
    }

    *, *::before, *::after { box-sizing: border-box; }

    body {
      margin: 0;
      color: var(--ink);
      background: #f0eeff;
      font-family: -apple-system, "Inter", "Helvetica Neue", Arial, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, p { margin-top: 0; }

    /* Toolbar */
    .report-toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
      padding: 10px 16px;
      border-bottom: 1px solid var(--line);
      background: rgba(255,255,255,0.96);
      backdrop-filter: blur(8px);
      box-shadow: 0 1px 0 var(--line), 0 4px 16px rgba(0,0,0,0.06);
    }

    .report-toolbar button {
      height: 38px;
      border: 1px solid var(--accent-dark);
      border-radius: 8px;
      padding: 0 16px;
      color: #fff;
      background: var(--accent-dark);
      font: 600 0.85rem/1 inherit;
      cursor: pointer;
      letter-spacing: 0.01em;
    }

    .report-toolbar button.secondary {
      color: var(--accent-dark);
      background: #fff;
    }

    /* Page */
    .page {
      width: min(1060px, calc(100% - 32px));
      margin: 28px auto 64px;
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 24px 56px rgba(0,0,0,0.11);
    }

    /* Cover */
    .cover {
      padding: 60px 64px 52px;
      color: #fff;
      background: linear-gradient(135deg, #100d28 0%, #1a1635 50%, #6f6acf 100%);
    }

    .cover-eyebrow {
      margin: 0 0 22px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
    }

    .cover h1 {
      max-width: 820px;
      margin: 0 0 14px;
      font-size: clamp(2.2rem, 5vw, 3.8rem);
      font-weight: 800;
      line-height: 1.02;
      letter-spacing: -0.02em;
    }

    .cover-subtitle {
      max-width: 680px;
      margin: 0 0 32px;
      font-size: 1.08rem;
      line-height: 1.55;
      color: rgba(255,255,255,0.82);
    }

    .cover-pills { display: flex; flex-wrap: wrap; gap: 8px; }

    .pill {
      display: inline-flex;
      align-items: center;
      height: 32px;
      padding: 0 12px;
      border: 1px solid rgba(255,255,255,0.28);
      border-radius: 6px;
      background: rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.88);
      font-size: 0.8rem;
      font-weight: 600;
    }

    /* Workspace */
    .workspace {
      display: grid;
      grid-template-columns: 1fr minmax(240px, 300px);
      gap: 20px;
      margin: -32px 56px 0;
      padding: 24px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: #fff;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.1);
    }

    .workspace-eyebrow {
      margin: 0 0 6px;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent-dark);
    }

    .workspace h2 {
      margin: 0 0 6px;
      font-size: clamp(1.4rem, 3vw, 2rem);
      font-weight: 800;
      letter-spacing: -0.01em;
    }

    .workspace-intro { margin: 0; font-size: 0.88rem; color: var(--muted); }

    .progress-track {
      height: 8px;
      margin: 16px 0 12px;
      border-radius: 999px;
      background: var(--line);
      overflow: hidden;
    }

    .progress-track span {
      display: block;
      width: 0;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--accent), var(--accent-dark));
      transition: width 0.3s ease;
    }

    .workspace-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }

    .workspace-stat { border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px; }

    .workspace-stat strong {
      display: block;
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1;
      color: var(--navy);
    }

    .workspace-stat span {
      display: block;
      margin-top: 4px;
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--subtle);
    }

    .workspace-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 14px;
      font-size: 0.82rem;
      color: var(--muted);
    }

    .text-button {
      height: 32px;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 0 12px;
      color: var(--accent-dark);
      background: #fff;
      font: 600 0.82rem/1 inherit;
      cursor: pointer;
    }

    .focus-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      border-radius: 12px;
      color: #fff;
      background: linear-gradient(140deg, var(--navy) 0%, #6f6acf 100%);
      min-height: 0;
    }

    .focus-eyebrow {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.5);
      margin: 0 0 10px;
    }

    .focus-task {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.35;
      margin: 0 0 8px;
    }

    .focus-outcome {
      font-size: 0.82rem;
      color: rgba(255,255,255,0.6);
      line-height: 1.4;
      margin: 0;
    }

    /* Content */
    .content { padding: 56px 64px 64px; }

    /* Report section */
    .report-section {
      padding-bottom: 52px;
      margin-bottom: 52px;
      border-bottom: 1px solid var(--line);
    }

    .report-section:last-of-type {
      padding-bottom: 0;
      margin-bottom: 0;
      border-bottom: none;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 28px;
    }

    .section-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 7px;
      background: var(--accent-mid);
      color: #fff;
      font-size: 0.72rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .section-title {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 800;
      letter-spacing: -0.01em;
    }

    .section-badge {
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      height: 28px;
      padding: 0 12px;
      border-radius: 999px;
      background: var(--mint);
      color: var(--accent-dark);
      font-size: 0.78rem;
      font-weight: 700;
      white-space: nowrap;
    }

    /* Executive summary */
    .exec-lead {
      font-size: 1.08rem;
      line-height: 1.75;
      color: #1f2937;
      max-width: 820px;
      margin: 0;
      padding-left: 20px;
      border-left: 4px solid var(--accent);
    }

    /* Insight blocks */
    .insight-stack { display: grid; gap: 12px; }

    .insight-block {
      display: grid;
      grid-template-columns: 5px 1fr;
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
    }

    .ia { background: var(--accent); }
    .ig { background: var(--gold); }
    .in { background: var(--navy); }

    .insight-body { padding: 18px 22px; }

    .insight-label {
      margin: 0 0 6px;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .la { color: var(--accent-dark); }
    .lg { color: #92400e; }
    .ln { color: #334155; }

    .insight-text { margin: 0; font-size: 0.96rem; line-height: 1.65; }

    /* Quick wins */
    .win-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }

    .win-item {
      display: grid;
      grid-template-columns: 32px 1fr;
      gap: 14px;
      align-items: start;
      padding: 14px 18px 14px 14px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: var(--surface);
    }

    .win-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: var(--mint);
      color: var(--accent-dark);
      font-size: 0.76rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .win-text { font-size: 0.93rem; line-height: 1.55; padding-top: 4px; }

    /* Scorecard */
    .scorecard-list {
      display: grid;
      gap: 8px;
    }

    .scorecard-row {
      display: grid;
      grid-template-columns: 56px 1fr;
      gap: 0 14px;
      align-items: start;
      padding: 14px 16px 14px 0;
      background: #fff;
      border: 1px solid var(--line);
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }

    .scorecard-row::before {
      content: "";
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 4px;
    }
    .sc-high .scorecard-row::before, .scorecard-row.sc-high::before { background: var(--accent); }
    .sc-mid  .scorecard-row::before, .scorecard-row.sc-mid::before  { background: var(--gold); }
    .sc-low  .scorecard-row::before, .scorecard-row.sc-low::before  { background: var(--coral); }

    .scorecard-score-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-left: 16px;
      padding-top: 2px;
    }

    .scorecard-score {
      font-size: 1.6rem;
      font-weight: 900;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    .scorecard-score-max {
      font-size: 0.65rem;
      color: var(--muted);
      font-weight: 500;
      margin-top: 1px;
    }

    .scorecard-body { padding-right: 4px; }

    .scorecard-label {
      font-size: 0.88rem;
      font-weight: 700;
      margin: 0 0 5px;
      color: var(--ink);
    }

    .scorecard-track {
      height: 3px;
      border-radius: 999px;
      background: var(--line);
      overflow: hidden;
      margin-bottom: 8px;
    }

    .scorecard-fill { height: 100%; border-radius: inherit; }
    .sc-high .scorecard-fill, .scorecard-row.sc-high .scorecard-fill { background: var(--accent); }
    .sc-mid  .scorecard-fill, .scorecard-row.sc-mid  .scorecard-fill { background: var(--gold); }
    .sc-low  .scorecard-fill, .scorecard-row.sc-low  .scorecard-fill { background: var(--coral); }

    .sc-high .scorecard-score { color: var(--accent-dark); }
    .sc-mid  .scorecard-score { color: var(--gold); }
    .sc-low  .scorecard-score { color: var(--coral); }

    .scorecard-rationale {
      font-size: 0.8rem;
      color: var(--muted);
      margin: 0 0 6px;
      line-height: 1.5;
    }

    .scorecard-next-move {
      font-size: 0.78rem;
      color: var(--ink);
      margin: 0;
      line-height: 1.45;
    }

    .scorecard-next-move strong {
      color: var(--accent-dark);
      font-weight: 600;
    }

    /* Strategy */
    .strategy-list { display: grid; gap: 14px; }

    .strategy-card { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }

    .strategy-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 22px;
      background: var(--navy);
      color: #fff;
    }

    .strategy-index {
      font-size: 0.66rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      flex-shrink: 0;
    }

    .strategy-title { font-size: 0.95rem; font-weight: 700; margin: 0; }

    .strategy-body { padding: 18px 22px; }

    .strategy-diagnosis {
      font-size: 0.91rem;
      color: var(--muted);
      margin: 0 0 14px;
      line-height: 1.6;
      padding-left: 14px;
      border-left: 3px solid var(--line);
    }

    .strategy-moves { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }

    .strategy-move {
      display: grid;
      grid-template-columns: 16px 1fr;
      gap: 10px;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .move-arr { color: var(--accent); font-weight: 700; }

    /* Action plan */
    .action-header-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 28px;
    }

    .action-list { display: grid; gap: 10px; }

    .action-card {
      display: grid;
      grid-template-columns: 36px 1fr;
      gap: 14px;
      padding: 16px 18px;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: #fff;
      transition: border-color 0.2s, background 0.2s;
      break-inside: avoid;
    }

    .action-card.is-complete { border-color: rgba(111,106,207,0.3); background: #f3eeff; }
    .action-card.is-current  { border-color: rgba(194,65,12,0.45); box-shadow: inset 4px 0 0 var(--coral); }

    .action-toggle {
      position: relative;
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      margin-top: 2px;
      border: 2px solid #d1d5db;
      border-radius: 9px;
      background: #fff;
      cursor: pointer;
      flex-shrink: 0;
    }

    .action-toggle input { position: absolute; inset: 0; opacity: 0; cursor: pointer; margin: 0; }

    .action-toggle span {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      background: transparent;
      transform: scale(0.4);
      transition: transform 0.15s, background 0.15s;
    }

    .action-card.is-complete .action-toggle { border-color: var(--accent); background: var(--accent); }

    .action-card.is-complete .action-toggle span {
      background: #fff;
      transform: scale(1);
      clip-path: polygon(14% 48%, 34% 68%, 84% 18%, 96% 30%, 34% 92%, 2% 60%);
    }

    .action-topline { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }

    .day-pill {
      display: inline-flex;
      align-items: center;
      height: 24px;
      padding: 0 9px;
      border-radius: 6px;
      background: var(--surface);
      color: var(--navy);
      font-size: 0.74rem;
      font-weight: 700;
      border: 1px solid var(--line);
    }

    .action-state {
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      height: 24px;
      padding: 0 9px;
      border-radius: 6px;
      background: #fff0f4;
      color: var(--rose);
      font-size: 0.74rem;
      font-weight: 700;
    }

    .action-card.is-complete .action-state { background: var(--mint); color: var(--accent-dark); }

    .action-task { font-size: 0.94rem; font-weight: 600; margin: 0 0 4px; }
    .action-outcome { font-size: 0.85rem; color: var(--muted); margin: 0 0 10px; }

    .notes-field { display: grid; gap: 5px; }

    .notes-label {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--subtle);
    }

    .notes-field textarea {
      width: 100%;
      min-height: 68px;
      resize: vertical;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 9px 12px;
      color: var(--ink);
      background: var(--surface);
      font: 0.87rem/1.45 inherit;
      outline: none;
    }

    /* Templates */
    .template-list { display: grid; gap: 16px; }

    .template-card { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }

    .template-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 20px;
      background: var(--surface);
      border-bottom: 1px solid var(--line);
    }

    .template-title { font-size: 0.92rem; font-weight: 700; margin: 0; }

    .template-channel {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent-dark);
      background: var(--mint);
      padding: 4px 10px;
      border-radius: 6px;
    }

    .template-body { padding: 20px; font-size: 0.9rem; line-height: 1.72; white-space: pre-wrap; color: #374151; }

    /* Content ideas */
    .content-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }

    .content-card {
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .content-title { font-size: 0.95rem; font-weight: 700; margin: 0; }
    .content-angle { font-size: 0.85rem; color: var(--muted); margin: 0; line-height: 1.5; }

    .content-hook {
      font-size: 0.9rem;
      font-style: italic;
      margin: 0;
      padding: 10px 14px;
      border-left: 3px solid var(--gold);
      background: var(--amber);
      border-radius: 0 8px 8px 0;
      line-height: 1.5;
    }

    /* Metrics table */
    .metrics-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
      font-size: 0.91rem;
    }

    .metrics-table th {
      padding: 12px 16px;
      background: var(--navy);
      color: #fff;
      font-size: 0.73rem;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      text-align: left;
    }

    .metrics-table td { padding: 13px 16px; border-top: 1px solid var(--line); vertical-align: top; line-height: 1.55; }
    .metrics-table tr:nth-child(even) td { background: var(--surface); }
    .metric-name { font-weight: 600; }
    .metric-target { font-weight: 700; color: var(--accent-dark); }

    /* Bottom grid */
    .bottom-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

    .tagged-panel { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }

    .tagged-header {
      padding: 10px 16px;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.09em;
      text-transform: uppercase;
    }

    .th-risk        { background: #fff1f2; color: #be123c; border-bottom: 1px solid #fecdd3; }
    .th-upsell      { background: var(--amber); color: #92400e; border-bottom: 1px solid #fde68a; }
    .th-assumptions { background: var(--sky); color: #0369a1; border-bottom: 1px solid #bae6fd; }

    .tagged-list { padding: 14px 16px; list-style: none; margin: 0; display: grid; gap: 10px; }

    .tagged-item { font-size: 0.87rem; line-height: 1.55; padding-left: 14px; position: relative; }

    .tagged-item::before { content: "·"; position: absolute; left: 0; color: var(--subtle); font-size: 1.2rem; line-height: 1.1; }

    /* Footer */
    .report-footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid var(--line);
      font-size: 0.81rem;
      color: var(--subtle);
      line-height: 1.6;
    }

    /* Responsive */
    @media (max-width: 860px) {
      .cover, .content { padding: 36px 28px; }
      .workspace { margin: -24px 20px 0; padding: 18px; grid-template-columns: 1fr; }
      .bottom-grid, .content-grid { grid-template-columns: 1fr; }
      .scorecard-row { grid-template-columns: 48px 1fr; }
    }

    @media (max-width: 560px) {
      .action-card { grid-template-columns: 1fr; }
    }

    /* Jump-to-section navigation */
    .section-jump-nav {
      position: sticky;
      top: 59px;
      z-index: 9;
      overflow-x: auto;
      background: rgba(255,255,255,0.97);
      border-bottom: 1px solid var(--line);
      scrollbar-width: none;
    }

    .section-jump-nav::-webkit-scrollbar { display: none; }

    .jump-nav-inner {
      display: flex;
      align-items: center;
      padding: 0 12px;
      white-space: nowrap;
      min-height: 38px;
    }

    .jump-nav-label {
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--subtle);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding-right: 10px;
      flex-shrink: 0;
    }

    .section-jump-nav a {
      display: inline-flex;
      align-items: center;
      height: 38px;
      padding: 0 9px;
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--muted);
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: color 0.15s, border-color 0.15s;
    }

    .section-jump-nav a:hover { color: var(--accent-dark); border-bottom-color: var(--accent); }

    /* Template copy button */
    .template-copy-btn {
      height: 28px;
      padding: 0 10px;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #fff;
      color: var(--accent-dark);
      font: 600 0.73rem/1 inherit;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      flex-shrink: 0;
    }

    .template-copy-btn.is-copied {
      background: var(--mint);
      border-color: var(--accent);
    }

    /* Competitor analysis table */
    .competitor-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
      font-size: 0.91rem;
    }

    .competitor-table th {
      padding: 12px 16px;
      background: var(--navy);
      color: #fff;
      font-size: 0.73rem;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      text-align: left;
    }

    .competitor-table td { padding: 13px 16px; border-top: 1px solid var(--line); vertical-align: top; line-height: 1.55; }
    .competitor-table tr:nth-child(even) td { background: var(--surface); }
    .competitor-name { font-weight: 700; color: var(--navy); }
    .competitor-weakness { color: var(--coral); }
    .competitor-advantage { color: var(--accent-dark); font-weight: 600; }

    @media print {
      *, *::before, *::after {
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
      }

      .report-toolbar, .section-jump-nav, .workspace-actions, .template-copy-btn { display: none !important; }

      body { background: #fff; }

      .page {
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }

      /* Preserve cover gradient */
      .cover {
        background: linear-gradient(135deg, #100d28 0%, #1a1635 50%, #6f6acf 100%) !important;
        border-radius: 0 !important;
      }

      .workspace {
        margin: 0 0 24px !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }

      /* Keep panel/section backgrounds */
      .panel, .report-section, .score-card, .action-card, .strategy-card, .template-card {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      /* Scorecard tier colors preserved via print-color-adjust above */
      .scorecard-row.sc-high::before { background: var(--accent) !important; }
      .scorecard-row.sc-mid::before  { background: var(--gold) !important; }
      .scorecard-row.sc-low::before  { background: var(--coral) !important; }
    }

    @page {
      size: A4 portrait;
      margin: 1.2cm 1.4cm 1.8cm;
    }

    @page :left  { @bottom-left  { content: counter(page); font-size: 9pt; color: #9ca3af; } }
    @page :right { @bottom-right { content: counter(page); font-size: 9pt; color: #9ca3af; } }
  </style>
</head>
<body data-report-id="${escapeHtml(reportId)}">
  <div class="report-toolbar">
    <button type="button" onclick="window.print()">${escapeHtml(labels.printPdf)}</button>
    <button type="button" class="secondary" onclick="downloadHtmlReport()">${escapeHtml(labels.downloadHtml)}</button>
  </div>
  <nav class="section-jump-nav" aria-label="${escapeHtml(labels.jumpToSection)}">
    <div class="jump-nav-inner">
      <span class="jump-nav-label">${escapeHtml(labels.jumpToSection)}</span>
      <a href="#sec-1" onclick="event.preventDefault();document.getElementById('sec-1')?.scrollIntoView({behavior:'smooth'})">1. ${escapeHtml(labels.executiveSummary)}</a>
      <a href="#sec-2" onclick="event.preventDefault();document.getElementById('sec-2')?.scrollIntoView({behavior:'smooth'})">2. ${escapeHtml(labels.positioning)}</a>
      <a href="#sec-3" onclick="event.preventDefault();document.getElementById('sec-3')?.scrollIntoView({behavior:'smooth'})">3. ${escapeHtml(labels.fastestQuickWins)}</a>
      <a href="#sec-4" onclick="event.preventDefault();document.getElementById('sec-4')?.scrollIntoView({behavior:'smooth'})">4. ${escapeHtml(labels.growthScorecard)}</a>
      ${hasCompetitors ? `<a href="#sec-5" onclick="event.preventDefault();document.getElementById('sec-5')?.scrollIntoView({behavior:'smooth'})">5. ${escapeHtml(labels.competitorAnalysis)}</a>` : ""}
      <a href="#sec-${hasCompetitors ? 6 : 5}" onclick="event.preventDefault();document.getElementById('sec-${hasCompetitors ? 6 : 5}')?.scrollIntoView({behavior:'smooth'})">${hasCompetitors ? 6 : 5}. ${escapeHtml(labels.strategicMoves)}</a>
      <a href="#sec-${hasCompetitors ? 7 : 6}" onclick="event.preventDefault();document.getElementById('sec-${hasCompetitors ? 7 : 6}')?.scrollIntoView({behavior:'smooth'})">${hasCompetitors ? 7 : 6}. ${escapeHtml(labels.actionPlan)}</a>
      <a href="#sec-${hasCompetitors ? 8 : 7}" onclick="event.preventDefault();document.getElementById('sec-${hasCompetitors ? 8 : 7}')?.scrollIntoView({behavior:'smooth'})">${hasCompetitors ? 8 : 7}. ${escapeHtml(labels.salesTemplates)}</a>
      <a href="#sec-${hasCompetitors ? 9 : 8}" onclick="event.preventDefault();document.getElementById('sec-${hasCompetitors ? 9 : 8}')?.scrollIntoView({behavior:'smooth'})">${hasCompetitors ? 9 : 8}. ${escapeHtml(labels.contentIdeas)}</a>
      <a href="#sec-${hasCompetitors ? 10 : 9}" onclick="event.preventDefault();document.getElementById('sec-${hasCompetitors ? 10 : 9}')?.scrollIntoView({behavior:'smooth'})">${hasCompetitors ? 10 : 9}. ${escapeHtml(labels.metricsToTrack)}</a>
    </div>
  </nav>

  <article class="page">
    <header class="cover">
      <p class="cover-eyebrow">${escapeHtml(labels.productName)}</p>
      <h1>${escapeHtml(plan.title)}</h1>
      <p class="cover-subtitle">${escapeHtml(plan.subtitle)}</p>
      <div class="cover-pills">
        <span class="pill">${escapeHtml(labels.generated)} ${escapeHtml(generatedAt)}</span>
        <span class="pill">${escapeHtml(labels.strategyReport)}</span>
        <span class="pill">${escapeHtml(labels.actionPlanPill)}</span>
        <span class="pill">${escapeHtml(String(readingMinutes))} ${escapeHtml(labels.readingTime)}</span>
      </div>
    </header>

    ${workspacePanel(plan, labels)}

    <main class="content">

      <div class="report-section" id="sec-1">
        <div class="section-header">
          <span class="section-num">1</span>
          <h2 class="section-title">${escapeHtml(labels.executiveSummary)}</h2>
        </div>
        <p class="exec-lead">${escapeHtml(plan.executiveSummary)}</p>
      </div>

      <div class="report-section" id="sec-2">
        <div class="section-header">
          <span class="section-num">2</span>
          <h2 class="section-title">${escapeHtml(labels.positioning)} &amp; ${escapeHtml(labels.coreOfferRewrite)}</h2>
        </div>
        <div class="insight-stack">
          ${insightBlock(labels.positioning, plan.positioning, "a")}
          ${insightBlock(labels.coreOfferRewrite, plan.coreOfferRewrite, "g")}
          ${insightBlock(labels.idealCustomerProfile, plan.idealCustomerProfile, "n")}
        </div>
      </div>

      <div class="report-section" id="sec-3">
        <div class="section-header">
          <span class="section-num">3</span>
          <h2 class="section-title">${escapeHtml(labels.fastestQuickWins)}</h2>
        </div>
        <ol class="win-list">
          ${plan.quickWins.map((win, i) => `<li class="win-item"><span class="win-num">${i + 1}</span><span class="win-text">${escapeHtml(win)}</span></li>`).join("")}
        </ol>
      </div>

      <div class="report-section" id="sec-4">
        <div class="section-header">
          <span class="section-num">4</span>
          <h2 class="section-title">${escapeHtml(labels.growthScorecard)}</h2>
        </div>
        <div class="scorecard-list">
          ${plan.scorecard.map((item) => scorecardRow(item, labels)).join("")}
        </div>
      </div>

      ${hasCompetitors ? competitorSection(plan, labels) : ""}

      <div class="report-section" id="sec-${hasCompetitors ? 6 : 5}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 6 : 5}</span>
          <h2 class="section-title">${escapeHtml(labels.strategicMoves)}</h2>
        </div>
        <div class="strategy-list">
          ${plan.strategySections.map((item, i) => strategyCard(item, i)).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 7 : 6}">
        <div class="action-header-row">
          <div class="section-header" style="margin-bottom:0;flex:1">
            <span class="section-num">${hasCompetitors ? 7 : 6}</span>
            <h2 class="section-title">${escapeHtml(labels.actionPlan)}</h2>
          </div>
          <span class="section-badge" data-action-summary>0/${escapeHtml(String(plan.actionPlan.length))} ${escapeHtml(labels.completed)}</span>
        </div>
        <div class="action-list">
          ${plan.actionPlan.map((item, index) => actionPlanCard(item, index, labels)).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 8 : 7}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 8 : 7}</span>
          <h2 class="section-title">${escapeHtml(labels.salesTemplates)}</h2>
        </div>
        <div class="template-list">
          ${plan.templates.map((t) => templateCard(t, labels)).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 9 : 8}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 9 : 8}</span>
          <h2 class="section-title">${escapeHtml(labels.contentIdeas)}</h2>
        </div>
        <div class="content-grid">
          ${plan.contentIdeas.map(contentCard).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 10 : 9}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 10 : 9}</span>
          <h2 class="section-title">${escapeHtml(labels.metricsToTrack)}</h2>
        </div>
        <table class="metrics-table">
          <thead>
            <tr>
              <th>${escapeHtml(labels.metric)}</th>
              <th>${escapeHtml(labels.target)}</th>
              <th>${escapeHtml(labels.whyItMatters)}</th>
            </tr>
          </thead>
          <tbody>
            ${plan.metrics.map((item) => `<tr><td class="metric-name">${escapeHtml(item.metric)}</td><td class="metric-target">${escapeHtml(item.target)}</td><td>${escapeHtml(item.why)}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>

      <div class="report-section">
        <div class="bottom-grid">
          ${taggedPanel(labels.biggestRisks, plan.biggestRisks, "risk")}
          ${taggedPanel(labels.upsellIdeas, plan.upsellIdeas, "upsell")}
          ${taggedPanel(labels.assumptions, plan.assumptions, "assumptions")}
        </div>
      </div>

      <footer class="report-footer">${escapeHtml(plan.disclaimer)}</footer>
    </main>
  </article>

  <script>
    function downloadHtmlReport() {
      if (typeof window.syncReportProgressAttributes === "function") {
        window.syncReportProgressAttributes();
      }
      var html = "<!doctype html>\\n" + document.documentElement.outerHTML;
      var blob = new Blob([html], { type: "text/html;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = ${scriptJson(businessKitFileName(plan))};
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
  </script>
  ${interactiveReportScript(reportId, labels)}
</body>
</html>`;
}

export function businessKitFileName(plan: BusinessKitPlan): string {
  return `${slugify(plan.title)}.html`;
}

function normalizeRequest(request: BusinessKitRequest): Context {
  const businessName = clean(request.businessName) || fallback(request.language, "businessName");
  const businessType = clean(request.businessType) || fallback(request.language, "businessType");
  const offer = clean(request.offer) || fallback(request.language, "offer");
  const audience = clean(request.audience) || fallback(request.language, "audience");
  const problem = clean(request.problem) || fallback(request.language, "problem");
  const goal = clean(request.goal) || fallback(request.language, "goal");
  const channels = clean(request.channels) || fallback(request.language, "channels");

  return {
    language: request.language,
    businessName,
    businessType,
    offer,
    audience,
    problem,
    goal,
    channels,
    pricePoint: clean(request.pricePoint) || fallback(request.language, "pricePoint"),
    region: clean(request.region) || fallback(request.language, "region"),
    tone: clean(request.tone) || fallback(request.language, "tone"),
    primaryChannel: splitChannels(channels)[0] ?? fallback(request.language, "primaryChannel"),
  };
}

function titleFor(context: Context): string {
  switch (context.language) {
    case "nl":
      return `${context.businessName} groeikit`;
    case "fr":
      return `Kit de croissance ${context.businessName}`;
    case "de":
      return `${context.businessName} Wachstumskit`;
    default:
      return `${context.businessName} Growth Kit`;
  }
}

function subtitleFor(context: Context): string {
  switch (context.language) {
    case "nl":
      return `Een praktisch groeiplan voor ${context.businessType}, gericht op ${context.goal}.`;
    case "fr":
      return `Un plan de croissance pratique pour ${context.businessType}, centré sur ${context.goal}.`;
    case "de":
      return `Ein praktischer Wachstumsplan für ${context.businessType}, ausgerichtet auf ${context.goal}.`;
    default:
      return `A practical growth plan for ${context.businessType}, focused on ${context.goal}.`;
  }
}

function executiveSummaryFor(context: Context): string {
  switch (context.language) {
    case "nl":
      return `${context.businessName} heeft genoeg input om snel tractie te bouwen: een duidelijke markt, een concreet aanbod en een zichtbaar groeidoel. De prioriteit is om ${context.offer} scherper te verpakken voor ${context.audience}, het probleem "${context.problem}" expliciet te benoemen en via ${context.primaryChannel} meer bewijsgedreven gesprekken te starten.`;
    case "fr":
      return `${context.businessName} dispose des éléments essentiels pour créer de la traction: un marché lisible, une offre concrète et un objectif clair. La priorité est de reformuler ${context.offer} pour ${context.audience}, de nommer le problème "${context.problem}" et de générer plus de conversations qualifiées via ${context.primaryChannel}.`;
    case "de":
      return `${context.businessName} hat die wichtigsten Bausteine für schnelle Traktion: einen klaren Markt, ein konkretes Angebot und ein messbares Ziel. Priorität ist, ${context.offer} für ${context.audience} schärfer zu verpacken, das Problem "${context.problem}" direkt zu benennen und über ${context.primaryChannel} mehr qualifizierte Gespräche auszulösen.`;
    default:
      return `${context.businessName} has enough signal to build traction quickly: a clear market, a concrete offer, and a visible growth goal. The priority is to package ${context.offer} more sharply for ${context.audience}, name the problem "${context.problem}" directly, and create more proof-led conversations through ${context.primaryChannel}.`;
  }
}

function positioningFor(context: Context): string {
  switch (context.language) {
    case "nl":
      return `Positioneer ${context.businessName} als de praktische groeipartner voor ${context.audience}. De boodschap moet niet beginnen bij diensten, maar bij het gewenste resultaat: ${context.goal}.`;
    case "fr":
      return `Positionnez ${context.businessName} comme le partenaire de croissance pratique pour ${context.audience}. Le message doit commencer par le résultat recherché, pas par la liste des services: ${context.goal}.`;
    case "de":
      return `Positioniere ${context.businessName} als praktischen Wachstumspartner für ${context.audience}. Die Botschaft sollte nicht mit Leistungen starten, sondern mit dem gewünschten Ergebnis: ${context.goal}.`;
    default:
      return `Position ${context.businessName} as the practical growth partner for ${context.audience}. Lead with the outcome, not the service list: ${context.goal}.`;
  }
}

function offerRewriteFor(context: Context): string {
  switch (context.language) {
    case "nl":
      return `Voor ${context.audience} die worstelen met ${context.problem}, levert ${context.businessName} ${context.offer} zodat ze ${context.goal} zonder onduidelijke scope of losse opvolging.`;
    case "fr":
      return `Pour ${context.audience} confrontés à ${context.problem}, ${context.businessName} propose ${context.offer} afin de les aider à ${context.goal} sans périmètre flou ni suivi improvisé.`;
    case "de":
      return `Für ${context.audience}, die mit ${context.problem} kämpfen, liefert ${context.businessName} ${context.offer}, damit sie ${context.goal}, ohne unklare Leistungspakete oder zufällige Nachverfolgung.`;
    default:
      return `For ${context.audience} struggling with ${context.problem}, ${context.businessName} delivers ${context.offer} so they can ${context.goal} without unclear scope or inconsistent follow-up.`;
  }
}

function customerProfileFor(context: Context): string {
  switch (context.language) {
    case "nl":
      return `De beste klant zit in ${context.region}, herkent het probleem snel, heeft budget rond ${context.pricePoint}, en wil een duidelijke volgende stap in plaats van losse inspiratie.`;
    case "fr":
      return `Le meilleur client se trouve dans ${context.region}, reconnaît rapidement le problème, dispose d'un budget autour de ${context.pricePoint}, et veut une prochaine étape claire plutôt que de l'inspiration générale.`;
    case "de":
      return `Der beste Kunde sitzt in ${context.region}, erkennt das Problem schnell, hat Budget rund um ${context.pricePoint}, und will einen klaren nächsten Schritt statt allgemeiner Inspiration.`;
    default:
      return `The best-fit customer is in ${context.region}, recognizes the problem quickly, has budget around ${context.pricePoint}, and wants a clear next step instead of general inspiration.`;
  }
}

function risksFor(context: Context): string[] {
  switch (context.language) {
    case "nl":
      return [
        `Te veel nadruk op wat ${context.businessName} doet, te weinig op het meetbare resultaat voor ${context.audience}.`,
        `Geen scherpe kwalificatie kan tijd trekken naar leads die niet passen bij ${context.pricePoint}.`,
        `Als ${context.primaryChannel} geen vast ritme krijgt, blijft groei afhankelijk van toevallige kansen.`,
        "Zonder bewijs, cases of voorbeelden klinkt het aanbod sneller duur dan logisch.",
      ];
    case "fr":
      return [
        `Trop d'accent sur ce que fait ${context.businessName}, pas assez sur le résultat mesurable pour ${context.audience}.`,
        `Sans qualification claire, trop de temps part vers des prospects qui ne correspondent pas à ${context.pricePoint}.`,
        `Si ${context.primaryChannel} n'a pas de rythme fixe, la croissance reste dépendante des opportunités aléatoires.`,
        "Sans preuves, cas ou exemples, l'offre peut sembler chère avant de sembler logique.",
      ];
    case "de":
      return [
        `Zu viel Fokus auf das, was ${context.businessName} tut, und zu wenig auf das messbare Ergebnis für ${context.audience}.`,
        `Ohne klare Qualifizierung geht zu viel Zeit an Leads, die nicht zu ${context.pricePoint} passen.`,
        `Wenn ${context.primaryChannel} keinen festen Rhythmus bekommt, bleibt Wachstum abhängig von Zufall.`,
        "Ohne Beweise, Beispiele oder Fälle wirkt das Angebot schneller teuer als logisch.",
      ];
    default:
      return [
        `Too much emphasis on what ${context.businessName} does, and not enough on the measurable result for ${context.audience}.`,
        `Weak qualification can pull time toward leads that are not a fit for ${context.pricePoint}.`,
        `If ${context.primaryChannel} does not get a repeatable cadence, growth stays dependent on random opportunities.`,
        "Without proof, examples, or case evidence, the offer can feel expensive before it feels logical.",
      ];
  }
}

function quickWinsFor(context: Context): string[] {
  switch (context.language) {
    case "nl":
      return [
        `Herschrijf de eerste zin van de website rond ${context.goal}.`,
        `Maak een korte checklist waarmee ${context.audience} kan zien of ${context.problem} hen omzet kost.`,
        `Voeg drie bewijsblokken toe: voor/na, klantquote en meetbare uitkomst.`,
        `Maak een kwalificatievraag rond budget, timing en eigenaarschap voordat een call wordt geboekt.`,
        `Publiceer deze week twee posts op ${context.primaryChannel} met concrete voorbeelden uit het aanbod.`,
      ];
    case "fr":
      return [
        `Réécrivez la première phrase du site autour de ${context.goal}.`,
        `Créez une courte checklist permettant à ${context.audience} de voir si ${context.problem} leur coûte des opportunités.`,
        "Ajoutez trois blocs de preuve: avant/après, citation client et résultat mesurable.",
        "Ajoutez une question de qualification sur le budget, le timing et le décideur avant chaque appel.",
        `Publiez cette semaine deux contenus sur ${context.primaryChannel} avec des exemples concrets de l'offre.`,
      ];
    case "de":
      return [
        `Schreibe den ersten Satz der Website rund um ${context.goal} neu.`,
        `Erstelle eine kurze Checkliste, mit der ${context.audience} erkennt, ob ${context.problem} Umsatz kostet.`,
        "Füge drei Beweisblöcke hinzu: Vorher/Nachher, Kundenzitat und messbares Ergebnis.",
        "Nutze vor jedem Gespräch eine Qualifizierungsfrage zu Budget, Timing und Verantwortung.",
        `Veröffentliche diese Woche zwei Beiträge auf ${context.primaryChannel} mit konkreten Beispielen aus dem Angebot.`,
      ];
    default:
      return [
        `Rewrite the first website sentence around ${context.goal}.`,
        `Create a short checklist that helps ${context.audience} see whether ${context.problem} is costing them opportunities.`,
        "Add three proof blocks: before/after, customer quote, and measurable outcome.",
        "Add one qualification question about budget, timing, and ownership before a call is booked.",
        `Publish two posts this week on ${context.primaryChannel} with concrete examples from the offer.`,
      ];
  }
}

function strategySectionsFor(context: Context): StrategySection[] {
  const shared = strategyText(context);

  return [
    {
      title: shared.offerTitle,
      diagnosis: shared.offerDiagnosis,
      moves: shared.offerMoves,
    },
    {
      title: shared.pipelineTitle,
      diagnosis: shared.pipelineDiagnosis,
      moves: shared.pipelineMoves,
    },
    {
      title: shared.conversionTitle,
      diagnosis: shared.conversionDiagnosis,
      moves: shared.conversionMoves,
    },
    {
      title: shared.deliveryTitle,
      diagnosis: shared.deliveryDiagnosis,
      moves: shared.deliveryMoves,
    },
  ];
}

function scorecardFor(context: Context): BusinessScore[] {
  const completeness = [
    context.businessType,
    context.offer,
    context.audience,
    context.problem,
    context.goal,
    context.channels,
    context.pricePoint,
  ].filter((value) => value.length > 22).length;
  const base = clamp(52 + completeness * 5, 56, 88);
  const labels = scoreLabels(context.language);

  return labels.map((item, index) => ({
    label: item.label,
    score: clamp(base + item.offset - index * 2, 42, 94),
    rationale: item.rationale(context),
    nextMove: item.nextMove(context),
  }));
}

function actionPlanFor(context: Context): ActionItem[] {
  switch (context.language) {
    case "nl":
      return [
        {day: "Dag 1-2", task: "Schrijf de kernbelofte opnieuw", outcome: `Een heldere zin die ${context.goal} koppelt aan ${context.audience}.`},
        {day: "Dag 3-4", task: "Maak een kwalificatiechecklist", outcome: `Een scorelijst die snel bepaalt of een lead past bij ${context.pricePoint}.`},
        {day: "Dag 5-7", task: "Verzamel bewijs", outcome: "Drie bewijsblokken die in website, voorstel en follow-up kunnen worden gebruikt."},
        {day: "Dag 8-10", task: `Publiceer twee ${context.primaryChannel}-posts`, outcome: "Posts die het probleem, de kost en de betere aanpak uitleggen."},
        {day: "Dag 11-14", task: "Bouw een korte intakeflow", outcome: "Een formulier of vragenlijst die context verzamelt voor een betere salescall."},
        {day: "Dag 15-18", task: "Herwerk het voorstel", outcome: "Een voorstel met resultaat, scope, bewijs, timing en duidelijke volgende stap."},
        {day: "Dag 19-23", task: "Start follow-up cadans", outcome: "Drie opvolgmomenten voor open leads en oude gesprekken."},
        {day: "Dag 24-27", task: "Meet conversiepunten", outcome: "Een overzicht van verkeer, gesprekken, voorstellen en gewonnen deals."},
        {day: "Dag 28-30", task: "Kies het volgende experiment", outcome: "Een groeicyclus op basis van de beste signalen uit de maand."},
      ];
    case "fr":
      return [
        {day: "Jour 1-2", task: "Réécrire la promesse centrale", outcome: `Une phrase claire qui relie ${context.goal} à ${context.audience}.`},
        {day: "Jour 3-4", task: "Créer une checklist de qualification", outcome: `Une grille rapide pour savoir si un prospect correspond à ${context.pricePoint}.`},
        {day: "Jour 5-7", task: "Rassembler les preuves", outcome: "Trois blocs de preuve utilisables sur le site, dans les propositions et en relance."},
        {day: "Jour 8-10", task: `Publier deux contenus sur ${context.primaryChannel}`, outcome: "Des contenus qui expliquent le problème, son coût et la meilleure approche."},
        {day: "Jour 11-14", task: "Construire un court parcours d'intake", outcome: "Un formulaire ou questionnaire qui prépare des appels plus utiles."},
        {day: "Jour 15-18", task: "Revoir la proposition commerciale", outcome: "Une proposition avec résultat, périmètre, preuve, timing et prochaine étape."},
        {day: "Jour 19-23", task: "Lancer une cadence de relance", outcome: "Trois relances pour les prospects ouverts et les anciennes conversations."},
        {day: "Jour 24-27", task: "Mesurer les points de conversion", outcome: "Une vue claire du trafic, des appels, des propositions et des ventes gagnées."},
        {day: "Jour 28-30", task: "Choisir la prochaine expérience", outcome: "Un cycle de croissance basé sur les meilleurs signaux du mois."},
      ];
    case "de":
      return [
        {day: "Tag 1-2", task: "Kernversprechen neu schreiben", outcome: `Ein klarer Satz, der ${context.goal} mit ${context.audience} verbindet.`},
        {day: "Tag 3-4", task: "Qualifizierungscheckliste erstellen", outcome: `Eine schnelle Bewertung, ob ein Lead zu ${context.pricePoint} passt.`},
        {day: "Tag 5-7", task: "Beweise sammeln", outcome: "Drei Beweisblöcke für Website, Angebot und Follow-up."},
        {day: "Tag 8-10", task: `Zwei Beiträge auf ${context.primaryChannel} veröffentlichen`, outcome: "Beiträge, die Problem, Kosten und bessere Lösung erklären."},
        {day: "Tag 11-14", task: "Kurzen Intake-Prozess bauen", outcome: "Ein Formular oder Fragebogen für bessere Verkaufsgespräche."},
        {day: "Tag 15-18", task: "Angebot überarbeiten", outcome: "Ein Angebot mit Ergebnis, Umfang, Beweis, Timing und klarem nächsten Schritt."},
        {day: "Tag 19-23", task: "Follow-up-Rhythmus starten", outcome: "Drei Nachfassmomente für offene Leads und alte Gespräche."},
        {day: "Tag 24-27", task: "Konversionspunkte messen", outcome: "Eine Übersicht über Traffic, Gespräche, Angebote und gewonnene Deals."},
        {day: "Tag 28-30", task: "Nächstes Experiment wählen", outcome: "Ein Wachstumszyklus basierend auf den besten Signalen des Monats."},
      ];
    default:
      return [
        {day: "Days 1-2", task: "Rewrite the core promise", outcome: `One clear sentence that connects ${context.goal} to ${context.audience}.`},
        {day: "Days 3-4", task: "Create a qualification checklist", outcome: `A quick scoring list that shows whether a lead fits ${context.pricePoint}.`},
        {day: "Days 5-7", task: "Collect proof", outcome: "Three proof blocks that can be used on the website, in proposals, and in follow-up."},
        {day: "Days 8-10", task: `Publish two ${context.primaryChannel} posts`, outcome: "Posts that explain the problem, its cost, and the better approach."},
        {day: "Days 11-14", task: "Build a short intake flow", outcome: "A form or question set that gathers context before sales calls."},
        {day: "Days 15-18", task: "Rework the proposal", outcome: "A proposal with outcome, scope, proof, timing, and clear next step."},
        {day: "Days 19-23", task: "Start a follow-up cadence", outcome: "Three follow-up moments for open leads and past conversations."},
        {day: "Days 24-27", task: "Measure conversion points", outcome: "A view of traffic, conversations, proposals, and closed wins."},
        {day: "Days 28-30", task: "Choose the next experiment", outcome: "A growth cycle based on the strongest signals from the month."},
      ];
  }
}

function templatesFor(context: Context): BusinessTemplate[] {
  switch (context.language) {
    case "nl":
      return [
        {title: "Koude of warme opening", channel: context.primaryChannel, body: `Hallo [naam], ik zag dat veel ${context.audience} vastlopen op ${context.problem}. ${context.businessName} helpt met ${context.offer}, zodat ${context.goal}. Is dit iets dat nu prioriteit heeft?`},
        {title: "Follow-up na gesprek", channel: "E-mail", body: `Dank voor het gesprek. De grootste kans lijkt nu: ${context.goal}. Ik zou starten met een compacte sprint rond ${context.offer}, met duidelijke scope en meetpunten. Zal ik de concrete aanpak sturen?`},
        {title: "Voorstel afsluiter", channel: "Voorstel", body: `De volgende stap is eenvoudig: bevestig de scope, plan de kickoff en kies de eerste metric die we verbeteren. Zo blijft het traject gericht op resultaat in plaats van losse taken.`},
      ];
    case "fr":
      return [
        {title: "Ouverture froide ou tiède", channel: context.primaryChannel, body: `Bonjour [nom], je vois que beaucoup de ${context.audience} restent bloqués par ${context.problem}. ${context.businessName} aide avec ${context.offer}, afin de ${context.goal}. Est-ce une priorité en ce moment?`},
        {title: "Relance après appel", channel: "E-mail", body: `Merci pour l'échange. La plus grande opportunité semble être: ${context.goal}. Je commencerais par un sprint compact autour de ${context.offer}, avec un périmètre clair et des indicateurs. Voulez-vous que j'envoie l'approche concrète?`},
        {title: "Clôture de proposition", channel: "Proposition", body: "La prochaine étape est simple: valider le périmètre, planifier le lancement et choisir le premier indicateur à améliorer. Le projet reste ainsi orienté résultat."},
      ];
    case "de":
      return [
        {title: "Kalte oder warme Eröffnung", channel: context.primaryChannel, body: `Hallo [Name], ich sehe, dass viele ${context.audience} bei ${context.problem} feststecken. ${context.businessName} hilft mit ${context.offer}, damit sie ${context.goal}. Ist das gerade relevant?`},
        {title: "Follow-up nach Gespräch", channel: "E-Mail", body: `Danke für das Gespräch. Die größte Chance scheint jetzt zu sein: ${context.goal}. Ich würde mit einem kompakten Sprint rund um ${context.offer} starten, mit klarem Umfang und Messpunkten. Soll ich den konkreten Ansatz schicken?`},
        {title: "Angebotsabschluss", channel: "Angebot", body: "Der nächste Schritt ist einfach: Umfang bestätigen, Kickoff planen und die erste Kennzahl wählen. So bleibt das Projekt auf Ergebnisse statt Einzelaufgaben ausgerichtet."},
      ];
    default:
      return [
        {title: "Cold or warm opener", channel: context.primaryChannel, body: `Hi [name], I noticed many ${context.audience} get stuck with ${context.problem}. ${context.businessName} helps with ${context.offer} so they can ${context.goal}. Is this a current priority?`},
        {title: "Post-call follow-up", channel: "Email", body: `Thanks for the conversation. The biggest opportunity seems to be: ${context.goal}. I would start with a focused sprint around ${context.offer}, with clear scope and measurable checkpoints. Should I send the concrete approach?`},
        {title: "Proposal closer", channel: "Proposal", body: "The next step is simple: confirm the scope, schedule the kickoff, and choose the first metric we improve. That keeps the work tied to outcomes instead of loose tasks."},
      ];
  }
}

function contentIdeasFor(context: Context): ContentIdea[] {
  switch (context.language) {
    case "nl":
      return [
        {title: "De verborgen kost", angle: `Laat zien wat ${context.problem} kost in gemiste kansen.`, hook: "Hoeveel omzet lekt er weg voor iemand zelfs contact opneemt?"},
        {title: "Voor en na", angle: `Vergelijk de oude situatie met het resultaat van ${context.offer}.`, hook: "Dit is het verschil tussen een website en een verkoopmachine."},
        {title: "Koopcriteria", angle: `Leg uit hoe ${context.audience} een goede oplossing kiest.`, hook: "Stel deze vijf vragen voordat je een partner kiest."},
        {title: "Procespost", angle: "Toon de stappen van diagnose naar implementatie.", hook: "Een goed traject begint niet met design, maar met beslissingen."},
        {title: "Bezwaarbreker", angle: `Neem twijfel rond ${context.pricePoint} serieus en koppel het aan resultaat.`, hook: "Duur is relatief; onduidelijke groei is duurder."},
      ];
    case "fr":
      return [
        {title: "Le coût caché", angle: `Montrez ce que ${context.problem} coûte en opportunités perdues.`, hook: "Combien de revenus disparaissent avant même le premier contact?"},
        {title: "Avant / après", angle: `Comparez la situation actuelle avec le résultat de ${context.offer}.`, hook: "Voici la différence entre une présence et un moteur de vente."},
        {title: "Critères d'achat", angle: `Expliquez comment ${context.audience} choisissent une bonne solution.`, hook: "Posez ces cinq questions avant de choisir un partenaire."},
        {title: "Le processus", angle: "Montrez les étapes du diagnostic à la mise en oeuvre.", hook: "Un bon projet commence par des décisions, pas par des tâches."},
        {title: "Lever l'objection prix", angle: `Reliez ${context.pricePoint} au résultat attendu.`, hook: "Cher est relatif; une croissance floue coûte plus cher."},
      ];
    case "de":
      return [
        {title: "Die versteckten Kosten", angle: `Zeige, was ${context.problem} an verpassten Chancen kostet.`, hook: "Wie viel Umsatz geht verloren, bevor jemand überhaupt Kontakt aufnimmt?"},
        {title: "Vorher / Nachher", angle: `Vergleiche die aktuelle Situation mit dem Ergebnis von ${context.offer}.`, hook: "Das ist der Unterschied zwischen Präsenz und Verkaufsmaschine."},
        {title: "Kaufkriterien", angle: `Erkläre, wie ${context.audience} eine gute Lösung wählen.`, hook: "Stelle diese fünf Fragen, bevor du einen Partner auswählst."},
        {title: "Der Prozess", angle: "Zeige die Schritte von Diagnose zu Umsetzung.", hook: "Ein gutes Projekt beginnt mit Entscheidungen, nicht mit Aufgaben."},
        {title: "Preis-Einwand lösen", angle: `Verbinde ${context.pricePoint} mit dem erwarteten Ergebnis.`, hook: "Teuer ist relativ; unklares Wachstum kostet mehr."},
      ];
    default:
      return [
        {title: "The hidden cost", angle: `Show what ${context.problem} costs in missed opportunities.`, hook: "How much revenue leaks away before someone even reaches out?"},
        {title: "Before and after", angle: `Compare the current state with the result of ${context.offer}.`, hook: "This is the difference between a website and a sales asset."},
        {title: "Buying criteria", angle: `Teach ${context.audience} how to choose the right solution.`, hook: "Ask these five questions before choosing a partner."},
        {title: "Process post", angle: "Show the steps from diagnosis to implementation.", hook: "Good work starts with decisions, not tasks."},
        {title: "Price objection breaker", angle: `Connect ${context.pricePoint} to the outcome.`, hook: "Expensive is relative; unclear growth is more expensive."},
      ];
  }
}

function metricsFor(context: Context): BusinessMetric[] {
  switch (context.language) {
    case "nl":
      return [
        {metric: "Gekwalificeerde gesprekken", target: "Wekelijks +20%", why: `Bewijst dat ${context.primaryChannel} betere leads aantrekt.`},
        {metric: "Voorstelratio", target: "60%+ van gesprekken", why: "Laat zien of kwalificatie en aanbod goed aansluiten."},
        {metric: "Gemiddelde dealwaarde", target: context.pricePoint, why: "Bewaakt of positionering de juiste prijs ondersteunt."},
        {metric: "Follow-up respons", target: "25%+ antwoord", why: "Meet of opvolging concreet genoeg is."},
        {metric: "30-dagen omzetkans", target: "3 beste open kansen", why: "Houdt focus op de deals die nu beïnvloedbaar zijn."},
      ];
    case "fr":
      return [
        {metric: "Conversations qualifiées", target: "+20% par semaine", why: `Prouve que ${context.primaryChannel} attire de meilleurs prospects.`},
        {metric: "Taux de proposition", target: "60%+ des appels", why: "Montre si la qualification et l'offre sont alignées."},
        {metric: "Valeur moyenne des ventes", target: context.pricePoint, why: "Vérifie si le positionnement soutient le bon prix."},
        {metric: "Réponse aux relances", target: "25%+ de réponses", why: "Mesure si le suivi est assez concret."},
        {metric: "Opportunités à 30 jours", target: "3 meilleures opportunités", why: "Garde le focus sur les ventes influençables maintenant."},
      ];
    case "de":
      return [
        {metric: "Qualifizierte Gespräche", target: "Wöchentlich +20%", why: `Beweist, dass ${context.primaryChannel} bessere Leads bringt.`},
        {metric: "Angebotsquote", target: "60%+ der Gespräche", why: "Zeigt, ob Qualifizierung und Angebot passen."},
        {metric: "Durchschnittlicher Dealwert", target: context.pricePoint, why: "Prüft, ob die Positionierung den Preis trägt."},
        {metric: "Follow-up-Antworten", target: "25%+ Antwortquote", why: "Misst, ob Nachfassen konkret genug ist."},
        {metric: "30-Tage-Chancen", target: "3 beste offene Chancen", why: "Hält den Fokus auf Deals, die jetzt beeinflussbar sind."},
      ];
    default:
      return [
        {metric: "Qualified conversations", target: "Weekly +20%", why: `Proves whether ${context.primaryChannel} is attracting better-fit leads.`},
        {metric: "Proposal rate", target: "60%+ of calls", why: "Shows whether qualification and offer fit are aligned."},
        {metric: "Average deal value", target: context.pricePoint, why: "Checks whether positioning supports the intended price."},
        {metric: "Follow-up response", target: "25%+ reply rate", why: "Measures whether follow-up is concrete enough."},
        {metric: "30-day revenue pipeline", target: "Top 3 open opportunities", why: "Keeps focus on deals that can be influenced now."},
      ];
  }
}

function upsellIdeasFor(context: Context): string[] {
  switch (context.language) {
    case "nl":
      return [
        `Maandelijkse optimalisatie rond ${context.goal}.`,
        `Premium implementatiepakket met snellere doorlooptijd en extra meetmomenten.`,
        `Retainer voor ${context.primaryChannel}, opvolging en conversieverbetering.`,
      ];
    case "fr":
      return [
        `Optimisation mensuelle autour de ${context.goal}.`,
        "Pack premium avec délai plus court et points de mesure supplémentaires.",
        `Retainer pour ${context.primaryChannel}, la relance et l'amélioration de conversion.`,
      ];
    case "de":
      return [
        `Monatliche Optimierung rund um ${context.goal}.`,
        "Premium-Umsetzungspaket mit schnellerer Laufzeit und zusätzlichen Messpunkten.",
        `Retainer für ${context.primaryChannel}, Follow-up und Conversion-Verbesserung.`,
      ];
    default:
      return [
        `Monthly optimization around ${context.goal}.`,
        "Premium implementation package with faster turnaround and extra measurement checkpoints.",
        `Retainer for ${context.primaryChannel}, follow-up, and conversion improvement.`,
      ];
  }
}

function assumptionsFor(context: Context): string[] {
  switch (context.language) {
    case "nl":
      return [
        `Het aanbod "${context.offer}" is leverbaar met de huidige capaciteit.`,
        `${context.audience} hebben genoeg urgentie rond ${context.problem}.`,
        `${context.primaryChannel} blijft een realistisch acquisitiekanaal voor de komende 30 dagen.`,
      ];
    case "fr":
      return [
        `L'offre "${context.offer}" peut être livrée avec la capacité actuelle.`,
        `${context.audience} ressentent une urgence suffisante autour de ${context.problem}.`,
        `${context.primaryChannel} reste un canal d'acquisition réaliste pour les 30 prochains jours.`,
      ];
    case "de":
      return [
        `Das Angebot "${context.offer}" ist mit aktueller Kapazität lieferbar.`,
        `${context.audience} haben genug Dringlichkeit rund um ${context.problem}.`,
        `${context.primaryChannel} bleibt für die nächsten 30 Tage ein realistischer Akquisekanal.`,
      ];
    default:
      return [
        `The offer "${context.offer}" can be delivered with current capacity.`,
        `${context.audience} have enough urgency around ${context.problem}.`,
        `${context.primaryChannel} remains a realistic acquisition channel for the next 30 days.`,
      ];
  }
}

function disclaimerFor(language: BusinessKitLanguage): string {
  switch (language) {
    case "nl":
      return "Dit rapport is een strategisch hulpmiddel, geen garantie op omzet, winst, financiering, juridische naleving of financieel resultaat.";
    case "fr":
      return "Ce rapport est un outil stratégique, pas une garantie de chiffre d'affaires, profit, financement, conformité juridique ou résultat financier.";
    case "de":
      return "Dieser Bericht ist ein strategisches Hilfsmittel, keine Garantie für Umsatz, Gewinn, Finanzierung, rechtliche Konformität oder finanzielles Ergebnis.";
    default:
      return "This report is a strategic planning aid, not a guarantee of revenue, profit, funding, legal compliance, or financial outcome.";
  }
}

function strategyText(context: Context) {
  switch (context.language) {
    case "nl":
      return {
        offerTitle: "Aanbod en positionering",
        offerDiagnosis: `Het aanbod is bruikbaar, maar moet sterker verbonden worden met ${context.goal}.`,
        offerMoves: [`Maak ${context.problem} de ingang van de boodschap.`, "Gebruik een pakketnaam die resultaat en doelgroep combineert.", `Zet ${context.pricePoint} naast bewijs en duidelijke scope.`],
        pipelineTitle: "Leadgeneratie",
        pipelineDiagnosis: `${context.primaryChannel} moet een vast ritme krijgen, anders blijft groei reactief.`,
        pipelineMoves: ["Plan twee wekelijkse publicatiemomenten.", "Maak een lijst met 30 beste prospects of partners.", "Gebruik een concrete diagnose in elk outreachbericht."],
        conversionTitle: "Conversie en opvolging",
        conversionDiagnosis: "De salesflow moet sneller duidelijk maken wie klaar is om te kopen.",
        conversionMoves: ["Voeg kwalificatievragen toe voor budget, timing en prioriteit.", "Gebruik een follow-upsequence van drie momenten.", "Stuur bewijs voor de call, niet pas erna."],
        deliveryTitle: "Retentie en uitbreiding",
        deliveryDiagnosis: "Elke levering moet nieuwe omzetkansen zichtbaar maken.",
        deliveryMoves: ["Plan een resultaatreview na oplevering.", "Leg extra problemen vast tijdens het project.", "Bied een volgende optimalisatiecyclus aan met concrete metric."],
      };
    case "fr":
      return {
        offerTitle: "Offre et positionnement",
        offerDiagnosis: `L'offre est exploitable, mais doit être reliée plus fortement à ${context.goal}.`,
        offerMoves: [`Faites de ${context.problem} l'entrée du message.`, "Utilisez un nom d'offre qui combine résultat et cible.", `Placez ${context.pricePoint} à côté de preuves et d'un périmètre clair.`],
        pipelineTitle: "Génération de prospects",
        pipelineDiagnosis: `${context.primaryChannel} a besoin d'un rythme fixe, sinon la croissance reste réactive.`,
        pipelineMoves: ["Planifiez deux publications par semaine.", "Créez une liste de 30 meilleurs prospects ou partenaires.", "Utilisez un diagnostic concret dans chaque message."],
        conversionTitle: "Conversion et relance",
        conversionDiagnosis: "Le processus commercial doit montrer plus vite qui est prêt à acheter.",
        conversionMoves: ["Ajoutez des questions sur budget, timing et priorité.", "Utilisez une séquence de trois relances.", "Envoyez des preuves avant l'appel, pas seulement après."],
        deliveryTitle: "Rétention et expansion",
        deliveryDiagnosis: "Chaque livraison doit rendre visibles de nouvelles opportunités de revenu.",
        deliveryMoves: ["Planifiez une revue de résultats après livraison.", "Notez les problèmes supplémentaires pendant le projet.", "Proposez un nouveau cycle d'optimisation lié à un indicateur."],
      };
    case "de":
      return {
        offerTitle: "Angebot und Positionierung",
        offerDiagnosis: `Das Angebot ist nutzbar, muss aber stärker mit ${context.goal} verbunden werden.`,
        offerMoves: [`Mache ${context.problem} zum Einstieg der Botschaft.`, "Nutze einen Paketnamen, der Ergebnis und Zielgruppe verbindet.", `Stelle ${context.pricePoint} neben Beweise und klaren Umfang.`],
        pipelineTitle: "Leadgenerierung",
        pipelineDiagnosis: `${context.primaryChannel} braucht einen festen Rhythmus, sonst bleibt Wachstum reaktiv.`,
        pipelineMoves: ["Plane zwei Veröffentlichungen pro Woche.", "Erstelle eine Liste der 30 besten Prospects oder Partner.", "Nutze in jeder Nachricht eine konkrete Diagnose."],
        conversionTitle: "Conversion und Follow-up",
        conversionDiagnosis: "Der Verkaufsprozess muss schneller zeigen, wer kaufbereit ist.",
        conversionMoves: ["Füge Fragen zu Budget, Timing und Priorität hinzu.", "Nutze eine Sequenz aus drei Follow-ups.", "Sende Beweise vor dem Gespräch, nicht erst danach."],
        deliveryTitle: "Retention und Ausbau",
        deliveryDiagnosis: "Jede Lieferung sollte neue Umsatzchancen sichtbar machen.",
        deliveryMoves: ["Plane nach Lieferung einen Ergebnisreview.", "Halte zusätzliche Probleme während des Projekts fest.", "Biete einen weiteren Optimierungszyklus mit konkreter Kennzahl an."],
      };
    default:
      return {
        offerTitle: "Offer and positioning",
        offerDiagnosis: `The offer is usable, but it needs to connect more directly to ${context.goal}.`,
        offerMoves: [`Make ${context.problem} the entry point of the message.`, "Use a package name that combines outcome and target customer.", `Place ${context.pricePoint} beside proof and clear scope.`],
        pipelineTitle: "Lead generation",
        pipelineDiagnosis: `${context.primaryChannel} needs a repeatable cadence, otherwise growth stays reactive.`,
        pipelineMoves: ["Schedule two weekly publishing moments.", "Build a list of the 30 best prospects or partners.", "Use a concrete diagnosis in every outreach message."],
        conversionTitle: "Conversion and follow-up",
        conversionDiagnosis: "The sales flow should make it clearer, faster, who is ready to buy.",
        conversionMoves: ["Add qualification questions for budget, timing, and priority.", "Use a three-touch follow-up sequence.", "Send proof before the call, not only afterward."],
        deliveryTitle: "Retention and expansion",
        deliveryDiagnosis: "Every delivery should reveal the next revenue opportunity.",
        deliveryMoves: ["Schedule a result review after delivery.", "Capture extra problems during the project.", "Offer the next optimization cycle around one concrete metric."],
      };
  }
}

function scoreLabels(language: BusinessKitLanguage): Array<{
  label: string;
  offset: number;
  rationale: (context: Context) => string;
  nextMove: (context: Context) => string;
}> {
  switch (language) {
    case "nl":
      return [
        {label: "Aanbodhelderheid", offset: 4, rationale: (context) => `${context.offer} heeft een duidelijke basis, maar moet scherper rond resultaat.`, nextMove: (context) => `Koppel elke zin aan ${context.goal}.`},
        {label: "Doelgroepfocus", offset: 2, rationale: (context) => `${context.audience} is specifiek genoeg om betere copy te schrijven.`, nextMove: () => "Maak drie kooptriggers expliciet."},
        {label: "Kanaalfit", offset: -2, rationale: (context) => `${context.primaryChannel} kan werken als er een vast publicatie- en opvolgritme is.`, nextMove: () => "Plan vaste wekelijkse acties."},
        {label: "Conversiepad", offset: -5, rationale: () => "Er is meer bewijs en kwalificatie nodig voor hogere conversie.", nextMove: () => "Voeg bewijs toe voor de call."},
        {label: "Uitvoering", offset: 0, rationale: () => "De komende 30 dagen moeten minder inspiratie en meer cadans krijgen.", nextMove: () => "Werk met de actieplanning hieronder."},
      ];
    case "fr":
      return [
        {label: "Clarté de l'offre", offset: 4, rationale: (context) => `${context.offer} a une base claire, mais doit être plus liée au résultat.`, nextMove: (context) => `Relier chaque phrase à ${context.goal}.`},
        {label: "Focus client", offset: 2, rationale: (context) => `${context.audience} est assez précis pour écrire une meilleure copie.`, nextMove: () => "Rendre explicites trois déclencheurs d'achat."},
        {label: "Canal", offset: -2, rationale: (context) => `${context.primaryChannel} peut fonctionner avec un rythme de publication et de relance.`, nextMove: () => "Planifier des actions hebdomadaires fixes."},
        {label: "Conversion", offset: -5, rationale: () => "Plus de preuve et de qualification sont nécessaires.", nextMove: () => "Envoyer la preuve avant l'appel."},
        {label: "Exécution", offset: 0, rationale: () => "Les 30 prochains jours doivent privilégier la cadence.", nextMove: () => "Suivre le plan d'action ci-dessous."},
      ];
    case "de":
      return [
        {label: "Angebotsklarheit", offset: 4, rationale: (context) => `${context.offer} hat eine klare Basis, muss aber stärker ans Ergebnis.`, nextMove: (context) => `Jeden Satz mit ${context.goal} verbinden.`},
        {label: "Zielgruppenfokus", offset: 2, rationale: (context) => `${context.audience} ist spezifisch genug für bessere Texte.`, nextMove: () => "Drei Kaufauslöser explizit machen."},
        {label: "Kanal-Fit", offset: -2, rationale: (context) => `${context.primaryChannel} kann mit festem Veröffentlichungs- und Follow-up-Rhythmus funktionieren.`, nextMove: () => "Wöchentliche Aktionen planen."},
        {label: "Conversion-Pfad", offset: -5, rationale: () => "Für höhere Conversion braucht es mehr Beweis und Qualifizierung.", nextMove: () => "Beweise vor dem Gespräch senden."},
        {label: "Umsetzung", offset: 0, rationale: () => "Die nächsten 30 Tage brauchen weniger Inspiration und mehr Rhythmus.", nextMove: () => "Mit dem Aktionsplan unten arbeiten."},
      ];
    default:
      return [
        {label: "Offer clarity", offset: 4, rationale: (context) => `${context.offer} has a clear base, but should be tied more tightly to the outcome.`, nextMove: (context) => `Connect every sentence to ${context.goal}.`},
        {label: "Audience focus", offset: 2, rationale: (context) => `${context.audience} is specific enough to write stronger copy.`, nextMove: () => "Make three buying triggers explicit."},
        {label: "Channel fit", offset: -2, rationale: (context) => `${context.primaryChannel} can work if it gets a publishing and follow-up cadence.`, nextMove: () => "Schedule fixed weekly actions."},
        {label: "Conversion path", offset: -5, rationale: () => "More proof and qualification are needed to lift conversion.", nextMove: () => "Send proof before the call."},
        {label: "Execution", offset: 0, rationale: () => "The next 30 days need less inspiration and more cadence.", nextMove: () => "Work through the action plan below."},
      ];
  }
}


function workspacePanel(plan: BusinessKitPlan, labels: ReportLabels): string {
  return `<section class="workspace" data-report-workspace aria-labelledby="workspace-title">
    <div>
      <p class="workspace-eyebrow">${escapeHtml(labels.implementationWorkspace)}</p>
      <h2 id="workspace-title">${escapeHtml(labels.workspaceTitle)}</h2>
      <p class="workspace-intro">${escapeHtml(labels.workspaceIntro)}</p>
      <div class="progress-track" aria-hidden="true"><span data-progress-bar></span></div>
      <div class="workspace-stats">
        <div class="workspace-stat"><strong data-progress-text>0%</strong><span>${escapeHtml(labels.progressComplete)}</span></div>
        <div class="workspace-stat"><strong data-completed-count>0</strong><span>${escapeHtml(labels.completed)}</span></div>
        <div class="workspace-stat"><strong data-remaining-count>${escapeHtml(String(plan.actionPlan.length))}</strong><span>${escapeHtml(labels.remaining)}</span></div>
      </div>
      <div class="workspace-actions">
        <button class="text-button" type="button" data-reset-progress>${escapeHtml(labels.resetProgress)}</button>
        <span data-save-status>${escapeHtml(labels.savedLocally)}</span>
      </div>
    </div>
    <aside class="focus-card">
      <p class="focus-eyebrow">${escapeHtml(labels.nextFocus)}</p>
      <p class="focus-task" data-next-focus>${escapeHtml(plan.actionPlan[0]?.task ?? labels.allActionsDone)}</p>
      <p class="focus-outcome" data-next-detail>${escapeHtml(plan.actionPlan[0]?.outcome ?? "")}</p>
    </aside>
  </section>`;
}

function insightBlock(label: string, text: string, variant: "a" | "g" | "n"): string {
  const accentClass = `i${variant}`;
  const labelClass  = `l${variant}`;
  return `<div class="insight-block">
    <div class="${accentClass}"></div>
    <div class="insight-body">
      <p class="insight-label ${labelClass}">${escapeHtml(label)}</p>
      <p class="insight-text">${escapeHtml(text)}</p>
    </div>
  </div>`;
}

function scorecardRow(item: BusinessScore, labels: ReportLabels): string {
  const tier = item.score >= 70 ? "sc-high" : item.score >= 45 ? "sc-mid" : "sc-low";
  return `<div class="scorecard-row ${tier}">
    <div class="scorecard-score-col">
      <span class="scorecard-score">${escapeHtml(String(item.score))}</span>
      <span class="scorecard-score-max">/100</span>
    </div>
    <div class="scorecard-body">
      <p class="scorecard-label">${escapeHtml(item.label)}</p>
      <div class="scorecard-track"><div class="scorecard-fill" style="width:${escapeHtml(String(item.score))}%"></div></div>
      <p class="scorecard-rationale">${escapeHtml(item.rationale)}</p>
      <p class="scorecard-next-move"><strong>${escapeHtml(labels.next)}:</strong> ${escapeHtml(item.nextMove)}</p>
    </div>
  </div>`;
}

function strategyCard(item: StrategySection, index: number): string {
  return `<div class="strategy-card">
    <div class="strategy-header">
      <span class="strategy-index">${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
      <h3 class="strategy-title">${escapeHtml(item.title)}</h3>
    </div>
    <div class="strategy-body">
      <p class="strategy-diagnosis">${escapeHtml(item.diagnosis)}</p>
      <ul class="strategy-moves">
        ${item.moves.map((move) => `<li class="strategy-move"><span class="move-arr">→</span><span>${escapeHtml(move)}</span></li>`).join("")}
      </ul>
    </div>
  </div>`;
}

function actionPlanCard(item: ActionItem, index: number, labels: ReportLabels): string {
  const taskId = `action-${index + 1}`;
  return `<article class="action-card" data-action-card data-action-id="${escapeHtml(taskId)}">
    <label class="action-toggle" aria-label="${escapeHtml(`${labels.markComplete}: ${item.day}`)}">
      <input type="checkbox" data-action-toggle>
      <span aria-hidden="true"></span>
    </label>
    <div class="action-body">
      <div class="action-topline">
        <span class="day-pill">${escapeHtml(item.day)}</span>
        <span class="action-state" data-action-state>${escapeHtml(labels.notStarted)}</span>
      </div>
      <p class="action-task" data-action-title>${escapeHtml(item.task)}</p>
      <p class="action-outcome" data-action-outcome>${escapeHtml(item.outcome)}</p>
      <label class="notes-field">
        <span class="notes-label">${escapeHtml(labels.notes)}</span>
        <textarea data-action-note placeholder="${escapeHtml(labels.notesPlaceholder)}"></textarea>
      </label>
    </div>
  </article>`;
}

function templateCard(item: BusinessTemplate, labels: ReportLabels): string {
  const bodyJson = scriptJson(item.body);
  const copyLabel = scriptJson(labels.copyToClipboard);
  const copiedLabel = scriptJson(labels.copied);
  return `<div class="template-card">
    <div class="template-header">
      <h3 class="template-title">${escapeHtml(item.title)}</h3>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="template-channel">${escapeHtml(item.channel)}</span>
        <button type="button" class="template-copy-btn" onclick="(function(btn){var t=btn.closest('.template-card').querySelector('.template-body');navigator.clipboard.writeText(${bodyJson}).then(function(){btn.textContent=${copiedLabel};btn.classList.add('is-copied');setTimeout(function(){btn.textContent=${copyLabel};btn.classList.remove('is-copied')},2000)}).catch(function(){});})(this)">${escapeHtml(labels.copyToClipboard)}</button>
      </div>
    </div>
    <div class="template-body">${escapeHtml(item.body)}</div>
  </div>`;
}

function contentCard(item: ContentIdea): string {
  return `<div class="content-card">
    <h3 class="content-title">${escapeHtml(item.title)}</h3>
    <p class="content-angle">${escapeHtml(item.angle)}</p>
    <p class="content-hook">${escapeHtml(item.hook)}</p>
  </div>`;
}

function competitorSection(plan: BusinessKitPlan, labels: ReportLabels): string {
  return `<div class="report-section" id="sec-5">
    <div class="section-header">
      <span class="section-num">5</span>
      <h2 class="section-title">${escapeHtml(labels.competitorAnalysis)}</h2>
    </div>
    <table class="competitor-table">
      <thead>
        <tr>
          <th>${escapeHtml(labels.competitor)}</th>
          <th>${escapeHtml(labels.competitorWeakness)}</th>
          <th>${escapeHtml(labels.competitorAdvantage)}</th>
        </tr>
      </thead>
      <tbody>
        ${plan.competitorAnalysis.map((item) => `<tr>
          <td class="competitor-name">${escapeHtml(item.competitor)}</td>
          <td class="competitor-weakness">${escapeHtml(item.weakness)}</td>
          <td class="competitor-advantage">${escapeHtml(item.ourAdvantage)}</td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>`;
}

function taggedPanel(title: string, items: string[], variant: "risk" | "upsell" | "assumptions"): string {
  return `<div class="tagged-panel">
    <div class="tagged-header th-${escapeHtml(variant)}">${escapeHtml(title)}</div>
    <ul class="tagged-list">
      ${items.map((item) => `<li class="tagged-item">${escapeHtml(item)}</li>`).join("")}
    </ul>
  </div>`;
}

function interactiveReportScript(reportId: string, labels: ReportLabels): string {
  return `<script>
    (function () {
      var reportId = ${scriptJson(reportId)};
      var messages = ${scriptJson({
        allActionsDone: labels.allActionsDone,
        completed: labels.completed,
        done: labels.done,
        inProgress: labels.inProgress,
        notStarted: labels.notStarted,
        savedLocally: labels.savedLocally,
        saveUnavailable: labels.saveUnavailable,
      })};
      var storageKey = "growth-kit-progress:" + reportId;
      var root = document.querySelector("[data-report-workspace]");
      var cards = Array.prototype.slice.call(document.querySelectorAll("[data-action-card]"));
      var progressBar = document.querySelector("[data-progress-bar]");
      var progressText = document.querySelector("[data-progress-text]");
      var completedCount = document.querySelector("[data-completed-count]");
      var remainingCount = document.querySelector("[data-remaining-count]");
      var nextFocus = document.querySelector("[data-next-focus]");
      var nextDetail = document.querySelector("[data-next-detail]");
      var saveStatus = document.querySelector("[data-save-status]");
      var summary = document.querySelector("[data-action-summary]");
      var resetButton = document.querySelector("[data-reset-progress]");

      function blankState() {
        return { done: {}, notes: {} };
      }

      function readStoredState() {
        try {
          var raw = window.localStorage.getItem(storageKey);
          return raw ? JSON.parse(raw) : null;
        } catch (error) {
          return null;
        }
      }

      function setSaveStatus(text) {
        if (saveStatus) {
          saveStatus.textContent = text;
        }
      }

      var state = readStoredState() || blankState();

      function save() {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(state));
          setSaveStatus(messages.savedLocally);
        } catch (error) {
          setSaveStatus(messages.saveUnavailable);
        }
      }

      function updateCard(card, isCurrent) {
        var id = card.getAttribute("data-action-id");
        var checkbox = card.querySelector("[data-action-toggle]");
        var note = card.querySelector("[data-action-note]");
        var stateLabel = card.querySelector("[data-action-state]");
        var isDone = Boolean(id && state.done[id]);
        var hasNote = Boolean(note && note.value.trim());

        card.classList.toggle("is-complete", isDone);
        card.classList.toggle("is-current", Boolean(isCurrent && !isDone));

        if (checkbox) {
          checkbox.checked = isDone;
        }

        if (stateLabel) {
          stateLabel.textContent = isDone ? messages.done : hasNote ? messages.inProgress : messages.notStarted;
        }
      }

      function update() {
        var total = cards.length;
        var doneCount = cards.filter(function (card) {
          var id = card.getAttribute("data-action-id");
          return Boolean(id && state.done[id]);
        }).length;
        var remaining = Math.max(total - doneCount, 0);
        var percent = total ? Math.round(doneCount / total * 100) : 100;
        var currentCard = cards.find(function (card) {
          var id = card.getAttribute("data-action-id");
          return !(id && state.done[id]);
        });

        if (root) {
          root.style.setProperty("--progress", percent + "%");
        }

        if (progressBar) {
          progressBar.style.width = percent + "%";
        }

        if (progressText) {
          progressText.textContent = percent + "%";
        }

        if (completedCount) {
          completedCount.textContent = String(doneCount);
        }

        if (remainingCount) {
          remainingCount.textContent = String(remaining);
        }

        if (summary) {
          summary.textContent = doneCount + "/" + total + " " + messages.completed;
        }

        cards.forEach(function (card) {
          updateCard(card, card === currentCard);
        });

        if (nextFocus && nextDetail) {
          if (currentCard) {
            var title = currentCard.querySelector("[data-action-title]");
            var outcome = currentCard.querySelector("[data-action-outcome]");
            nextFocus.textContent = title ? title.textContent || "" : "";
            nextDetail.textContent = outcome ? outcome.textContent || "" : "";
          } else {
            nextFocus.textContent = messages.allActionsDone;
            nextDetail.textContent = "";
          }
        }
      }

      cards.forEach(function (card) {
        var id = card.getAttribute("data-action-id");
        var checkbox = card.querySelector("[data-action-toggle]");
        var note = card.querySelector("[data-action-note]");

        if (!id) {
          return;
        }

        if (checkbox) {
          checkbox.checked = Boolean(state.done[id]);
          checkbox.addEventListener("change", function () {
            state.done[id] = checkbox.checked;
            save();
            update();
          });
        }

        if (note) {
          note.value = state.notes[id] || "";
          note.addEventListener("input", function () {
            state.notes[id] = note.value;
            save();
            update();
          });
        }
      });

      if (resetButton) {
        resetButton.addEventListener("click", function () {
          state = blankState();
          cards.forEach(function (card) {
            var checkbox = card.querySelector("[data-action-toggle]");
            var note = card.querySelector("[data-action-note]");

            if (checkbox) {
              checkbox.checked = false;
            }

            if (note) {
              note.value = "";
            }
          });
          save();
          update();
        });
      }

      window.syncReportProgressAttributes = function () {
        cards.forEach(function (card) {
          var checkbox = card.querySelector("[data-action-toggle]");
          var note = card.querySelector("[data-action-note]");

          if (checkbox && checkbox.checked) {
            checkbox.setAttribute("checked", "checked");
          } else if (checkbox) {
            checkbox.removeAttribute("checked");
          }

          if (note) {
            note.textContent = note.value;
          }
        });
      };

      update();
      save();
    })();
  </script>`;
}

function fallback(language: BusinessKitLanguage, key: keyof Omit<Context, "language">): string {
  const fallbacks: Record<BusinessKitLanguage, Record<keyof Omit<Context, "language">, string>> = {
    en: {
      businessName: "Your Business",
      businessType: "service business",
      offer: "a focused growth sprint",
      audience: "busy business owners",
      problem: "unclear positioning and inconsistent lead flow",
      goal: "book more qualified sales conversations",
      channels: "LinkedIn, referrals, email",
      pricePoint: "the current target price",
      region: "your current market",
      tone: "practical and direct",
      primaryChannel: "LinkedIn",
    },
    nl: {
      businessName: "Jouw bedrijf",
      businessType: "dienstverlenend bedrijf",
      offer: "een gerichte groeisprint",
      audience: "drukke ondernemers",
      problem: "onduidelijke positionering en wisselende leadflow",
      goal: "meer gekwalificeerde verkoopgesprekken boeken",
      channels: "LinkedIn, referrals, e-mail",
      pricePoint: "de huidige richtprijs",
      region: "je huidige markt",
      tone: "praktisch en direct",
      primaryChannel: "LinkedIn",
    },
    fr: {
      businessName: "Votre entreprise",
      businessType: "entreprise de services",
      offer: "un sprint de croissance ciblé",
      audience: "dirigeants occupés",
      problem: "positionnement flou et flux de prospects irrégulier",
      goal: "obtenir plus de conversations commerciales qualifiées",
      channels: "LinkedIn, recommandations, e-mail",
      pricePoint: "le prix cible actuel",
      region: "votre marché actuel",
      tone: "pratique et direct",
      primaryChannel: "LinkedIn",
    },
    de: {
      businessName: "Dein Unternehmen",
      businessType: "Dienstleistungsunternehmen",
      offer: "ein fokussierter Wachstumssprint",
      audience: "beschäftigte Unternehmer",
      problem: "unklare Positionierung und unregelmäßiger Leadflow",
      goal: "mehr qualifizierte Verkaufsgespräche buchen",
      channels: "LinkedIn, Empfehlungen, E-Mail",
      pricePoint: "der aktuelle Zielpreis",
      region: "dein aktueller Markt",
      tone: "praktisch und direkt",
      primaryChannel: "LinkedIn",
    },
  };

  return fallbacks[language][key];
}

function splitChannels(value: string): string[] {
  return value
    .split(/[,;\n]+/g)
    .map((item) => clean(item))
    .filter(Boolean);
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function localeFor(language: BusinessKitLanguage): string {
  return {
    en: "en-US",
    nl: "nl-NL",
    fr: "fr-FR",
    de: "de-DE",
  }[language];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(Math.round(value), min), max);
}

function hashString(value: string): string {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

function scriptJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "business-growth-kit";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

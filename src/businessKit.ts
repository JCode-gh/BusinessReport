import { jsonrepair } from "jsonrepair";

const OPEN_ROUTER_API_KEY = import.meta.env.VITE_OPEN_ROUTER_API_KEY as string | undefined;
const OPEN_ROUTER_MODEL = (import.meta.env.VITE_OPEN_ROUTER_MODEL as string | undefined) || "google/gemini-flash-1.5";
const OPEN_ROUTER_MAX_TOKENS = Number(import.meta.env.VITE_OPEN_ROUTER_MAX_COMPLETION_TOKENS) || 9000;
const OPEN_ROUTER_HTTP_REFERER = import.meta.env.VITE_OPEN_ROUTER_HTTP_REFERER as string | undefined;
const OPEN_ROUTER_X_TITLE = (import.meta.env.VITE_OPEN_ROUTER_X_TITLE as string | undefined) || "Entrepreneur Growth Kit";

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
  },
};

export async function createBusinessKit(request: BusinessKitRequest): Promise<BusinessKitPlan> {
  if (OPEN_ROUTER_API_KEY) {
    try {
      return await fetchBusinessKitFromApi(request);
    } catch {
      // fall through to local generator
    }
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
    actionPlan: actionPlanFor(context),
    templates: templatesFor(context),
    contentIdeas: contentIdeasFor(context),
    metrics: metricsFor(context),
    upsellIdeas: upsellIdeasFor(context),
    assumptions: assumptionsFor(context),
    disclaimer: disclaimerFor(context.language),
  };
}

async function fetchBusinessKitFromApi(request: BusinessKitRequest): Promise<BusinessKitPlan> {
  const userMessage = formatRequestForApi(request);
  const modes = ["json", "compact"] as const;
  let lastError: Error | null = null;

  for (const mode of modes) {
    try {
      const text = await callOpenRouter(userMessage, mode);
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
    en: "Write every user-facing report sentence in English. Keep JSON property names in English.",
    nl: "Schrijf elke zichtbare rapportzin in natuurlijk Nederlands. Vertaal ook ingevoerde Engelse formuleringen naar Nederlands wanneer ze in titels, paragrafen, tabellen, templates, metrics of actiepunten terechtkomen. Laat alleen merknamen, productnamen, acroniemen en echte eigennamen onvertaald. Houd JSON-propertynamen Engels.",
    fr: "Write every user-facing report sentence in French. Translate user-provided wording into French when it appears in titles, paragraphs, tables, templates, metrics, or action items. Keep only brand names, product names, acronyms, and proper nouns unchanged. Keep JSON property names in English.",
    de: "Write every user-facing report sentence in German. Translate user-provided wording into German when it appears in titles, paragraphs, tables, templates, metrics, or action items. Keep only brand names, product names, acronyms, and proper nouns unchanged. Keep JSON property names in English.",
  };

  return [
    `Report language: ${languageNames[request.language]}.`,
    languageInstructions[request.language],
    `Business name: ${request.businessName ?? "Not provided"}`,
    `Business type: ${request.businessType ?? "Not provided"}`,
    `Current offer: ${request.offer ?? "Not provided"}`,
    `Target customer: ${request.audience ?? "Not provided"}`,
    `Main problem: ${request.problem ?? "Not provided"}`,
    `Goal: ${request.goal ?? "Not provided"}`,
    `Current channels: ${request.channels ?? "Not provided"}`,
    `Price point: ${request.pricePoint ?? "Not provided"}`,
    `Region or market: ${request.region ?? "Not provided"}`,
    `Preferred tone: ${request.tone ?? "Clear, direct, premium, practical"}`,
  ].join("\n");
}

function apiSystemPrompt(mode: "json" | "compact"): string {
  const jsonInstruction = mode === "json"
    ? "Return only raw JSON. Start with { and end with }. Do not use markdown or commentary."
    : "Return only raw JSON starting with {. Be concise — keep values short to stay within the token limit.";

  return [
    "You are a practical growth strategist for small businesses, solo founders, agencies, consultants, ecommerce operators, and local service companies.",
    jsonInstruction,
    "Create a paid-quality business growth kit that is specific, useful, and commercially realistic.",
    "Do not make vague motivational advice. Every recommendation should be concrete enough to execute this week.",
    "Prioritize offer clarity, pricing power, lead generation, conversion, retention, operations, and measurable next actions.",
    "Use the user's market, offer, goal, channel, and tone when available. If details are missing, state assumptions instead of inventing fake facts.",
    "Write every user-facing report field in the requested report language, including titles, table rows, score labels, action-plan days, templates, metrics, assumptions, and disclaimers.",
    "Keep the JSON keys in English.",
    "Write in confident consultant language, but keep it understandable for a busy entrepreneur.",
    "Include scores from 0 to 100. Low scores are allowed when the business has real gaps.",
    "Do not guarantee revenue, profit, funding, legal compliance, or medical/financial outcomes.",
    "Keep the response bounded so the JSON is valid: short paragraphs, compact lists, no markdown tables.",
    "Required JSON shape: { title, subtitle, executiveSummary, positioning, coreOfferRewrite, idealCustomerProfile, biggestRisks (array 3-5), quickWins (array 4-7), strategySections (array 4-6, each { title, diagnosis, moves[] }), scorecard (array 5-6, each { label, score, rationale, nextMove }), actionPlan (array 8-12, each { day, task, outcome }), templates (array 3-5, each { title, channel, body }), contentIdeas (array 5-8, each { title, angle, hook }), metrics (array 5-8, each { metric, target, why }), upsellIdeas (array 3-5), assumptions (array 3-5), disclaimer }",
  ].join(" ");
}

async function callOpenRouter(userMessage: string, mode: "json" | "compact"): Promise<string> {
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${OPEN_ROUTER_API_KEY}`,
    "Content-Type": "application/json",
  };

  if (OPEN_ROUTER_HTTP_REFERER) headers["HTTP-Referer"] = OPEN_ROUTER_HTTP_REFERER;
  if (OPEN_ROUTER_X_TITLE) headers["X-Title"] = OPEN_ROUTER_X_TITLE;

  const body: Record<string, unknown> = {
    model: OPEN_ROUTER_MODEL,
    messages: [
      { role: "system", content: apiSystemPrompt(mode) },
      { role: "user", content: userMessage },
    ],
    temperature: 0.35,
    max_tokens: OPEN_ROUTER_MAX_TOKENS,
  };

  if (mode === "json") {
    body.response_format = { type: "json_object" };
    body.plugins = [{ id: "response-healing" }];
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`OpenRouter ${response.status}: ${errorText.slice(0, 200)}`);
  }

  const data = await response.json() as { choices?: Array<{ message?: { content?: unknown } }> };
  const content = data.choices?.[0]?.message?.content;
  return typeof content === "string" ? content.trim() : "";
}

function parseApiPlan(rawText: string, request: BusinessKitRequest): BusinessKitPlan | null {
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

function normalizeApiPlan(raw: Record<string, unknown>, request: BusinessKitRequest): BusinessKitPlan {
  const fallback = buildLocalBusinessKit(request);

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
    .slice(0, 12);
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
    .slice(0, 5);
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

function clampApiScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 50;
  return Math.min(Math.max(Math.round(n), 0), 100);
}

export function buildBusinessKitHtml(plan: BusinessKitPlan): string {
  const labels = reportLabels[plan.language];
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
      color-scheme: light;
      --ink: #18212a;
      --muted: #63727d;
      --paper: #ffffff;
      --line: #d8e0e4;
      --surface: #f4f7f8;
      --accent: #0f766e;
      --accent-dark: #115e59;
      --gold: #b7791f;
      --rose: #a23b62;
      --navy: #18243a;
      --coral: #c75c3f;
      --mint: #e4f5ef;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      color: var(--ink);
      background: #eaf0f1;
      font-family: Inter, Avenir Next, Helvetica Neue, Arial, sans-serif;
      line-height: 1.55;
    }

    .report-toolbar {
      position: sticky;
      top: 0;
      z-index: 2;
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      padding: 12px;
      border-bottom: 1px solid var(--line);
      background: rgba(255, 255, 255, 0.94);
      box-shadow: 0 12px 32px rgba(24, 33, 42, 0.08);
    }

    .report-toolbar button {
      min-height: 40px;
      border: 1px solid var(--accent-dark);
      border-radius: 8px;
      padding: 0 14px;
      color: #ffffff;
      background: var(--accent-dark);
      font: inherit;
      font-weight: 900;
      cursor: pointer;
    }

    .report-toolbar button.secondary {
      color: var(--accent-dark);
      background: #ffffff;
    }

    .page {
      width: min(1080px, calc(100% - 32px));
      margin: 24px auto;
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 22px 55px rgba(24, 33, 42, 0.13);
    }

    .cover {
      padding: 56px 58px 46px;
      color: #ffffff;
      background:
        linear-gradient(135deg, rgba(18, 52, 59, 0.98), rgba(15, 118, 110, 0.92) 58%, rgba(111, 63, 104, 0.9)),
        linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
        linear-gradient(0deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
      background-size: auto, 68px 68px, 68px 68px;
    }

    .label {
      margin: 0 0 16px;
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    h1,
    h2,
    h3,
    p {
      margin-top: 0;
    }

    h1 {
      max-width: 820px;
      margin-bottom: 14px;
      font-size: clamp(2.2rem, 6vw, 4.6rem);
      line-height: 0.96;
      letter-spacing: 0;
    }

    .subtitle {
      max-width: 780px;
      margin-bottom: 28px;
      font-size: 1.18rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      border: 1px solid rgba(255, 255, 255, 0.42);
      border-radius: 8px;
      padding: 0 12px;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.12);
      font-size: 0.9rem;
      font-weight: 800;
    }

    .workspace {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
      gap: 24px;
      margin: -36px 58px 42px;
      border: 1px solid rgba(216, 224, 228, 0.95);
      border-radius: 12px;
      padding: 24px;
      background: linear-gradient(135deg, #ffffff, #f6fbfa);
      box-shadow: 0 24px 48px rgba(24, 33, 42, 0.14);
    }

    .workspace h2 {
      margin-bottom: 10px;
      font-size: clamp(1.8rem, 3.5vw, 3rem);
    }

    .workspace-intro,
    .section-heading-row p,
    .small {
      color: var(--muted);
    }

    .progress-track {
      height: 14px;
      margin: 24px 0 16px;
      overflow: hidden;
      border-radius: 999px;
      background: #e2eaed;
    }

    .progress-track span {
      display: block;
      width: 0;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--accent), var(--coral));
      transition: width 0.28s ease;
    }

    .workspace-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }

    .workspace-stat {
      min-height: 86px;
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 12px;
      background: #ffffff;
    }

    .workspace-stat strong {
      display: block;
      color: var(--navy);
      font-size: 1.65rem;
      line-height: 1;
    }

    .workspace-stat span {
      display: block;
      margin-top: 6px;
      color: var(--muted);
      font-size: 0.86rem;
      font-weight: 800;
    }

    .focus-card {
      display: grid;
      align-content: space-between;
      min-height: 100%;
      border-radius: 12px;
      padding: 22px;
      color: #ffffff;
      background: linear-gradient(135deg, rgba(24, 36, 58, 0.98), rgba(162, 59, 98, 0.88));
    }

    .focus-card span {
      color: rgba(255, 255, 255, 0.72);
      font-size: 0.8rem;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .focus-card strong {
      display: block;
      margin-top: 12px;
      font-size: 1.45rem;
      line-height: 1.15;
    }

    .workspace-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 24px;
      color: var(--muted);
      font-size: 0.88rem;
      font-weight: 800;
    }

    .text-button {
      min-height: 38px;
      border: 1px solid #c9d6da;
      border-radius: 8px;
      padding: 0 12px;
      color: var(--accent-dark);
      background: #ffffff;
      font: inherit;
      font-weight: 900;
      cursor: pointer;
    }

    .content {
      padding: 42px 58px 56px;
    }

    section {
      margin-bottom: 38px;
      break-inside: avoid;
    }

    h2 {
      margin-bottom: 16px;
      font-size: 1.55rem;
      line-height: 1.15;
      letter-spacing: 0;
    }

    h3 {
      margin-bottom: 8px;
      font-size: 1.05rem;
      letter-spacing: 0;
    }

    .lead {
      max-width: 840px;
      color: #31414c;
      font-size: 1.05rem;
    }

    .grid,
    .three-grid,
    .score-grid {
      display: grid;
      gap: 14px;
    }

    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .three-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .score-grid {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    .panel,
    .score-card,
    .action-card {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 18px;
      background: #ffffff;
    }

    .panel.tint,
    .score-card {
      background: var(--surface);
    }

    ul {
      padding-left: 20px;
      margin: 0;
    }

    li + li {
      margin-top: 8px;
    }

    .score {
      margin: 4px 0 8px;
      color: var(--accent-dark);
      font-size: 2rem;
      font-weight: 900;
      line-height: 1;
    }

    .section-heading-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 16px;
    }

    .section-badge {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      border-radius: 999px;
      padding: 0 12px;
      white-space: nowrap;
      color: var(--accent-dark);
      background: var(--mint);
      font-size: 0.86rem;
      font-weight: 900;
    }

    .action-list {
      display: grid;
      gap: 12px;
    }

    .action-card {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 16px;
      transition: border-color 0.2s ease, background-color 0.2s ease;
      break-inside: avoid;
    }

    .action-card.is-complete {
      border-color: rgba(15, 118, 110, 0.42);
      background: #f3fbf7;
    }

    .action-card.is-current {
      border-color: rgba(199, 92, 63, 0.56);
      box-shadow: inset 4px 0 0 var(--coral);
    }

    .action-toggle {
      position: relative;
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      margin-top: 2px;
      border: 2px solid #b9c8cd;
      border-radius: 9px;
      background: #ffffff;
      cursor: pointer;
    }

    .action-toggle input {
      position: absolute;
      inset: 0;
      margin: 0;
      opacity: 0;
      cursor: pointer;
    }

    .action-toggle span {
      width: 16px;
      height: 16px;
      border-radius: 5px;
      background: transparent;
      transform: scale(0.5);
      transition: transform 0.16s ease, background-color 0.16s ease;
    }

    .action-card.is-complete .action-toggle {
      border-color: var(--accent);
      background: var(--accent);
    }

    .action-card.is-complete .action-toggle span {
      background: #ffffff;
      transform: scale(1);
      clip-path: polygon(14% 48%, 34% 68%, 84% 18%, 96% 30%, 34% 92%, 2% 60%);
    }

    .action-topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 8px;
    }

    .day-pill,
    .action-state {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      border-radius: 999px;
      padding: 0 10px;
      font-size: 0.78rem;
      font-weight: 900;
    }

    .day-pill {
      color: var(--navy);
      background: #edf2f5;
    }

    .action-state {
      color: var(--rose);
      background: #fff0f4;
    }

    .action-card.is-complete .action-state {
      color: var(--accent-dark);
      background: var(--mint);
    }

    .notes-field {
      display: grid;
      gap: 7px;
      color: var(--muted);
      font-size: 0.86rem;
      font-weight: 900;
    }

    .notes-field textarea {
      width: 100%;
      min-height: 78px;
      resize: vertical;
      border: 1px solid #c9d6da;
      border-radius: 10px;
      padding: 11px 12px;
      color: var(--ink);
      background: #f8fbfb;
      font: inherit;
      line-height: 1.45;
      outline: none;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--line);
      font-size: 0.95rem;
    }

    th,
    td {
      border-bottom: 1px solid var(--line);
      padding: 12px;
      text-align: left;
      vertical-align: top;
    }

    th {
      color: #ffffff;
      background: var(--accent-dark);
      font-size: 0.82rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    tr:nth-child(even) td {
      background: #f8fbfb;
    }

    .template {
      white-space: pre-wrap;
    }

    .footer {
      border-top: 1px solid var(--line);
      padding-top: 22px;
      color: var(--muted);
      font-size: 0.9rem;
    }

    @media (max-width: 900px) {
      .page {
        width: min(100%, calc(100% - 18px));
        margin: 10px auto;
      }

      .cover,
      .content {
        padding: 34px 24px;
      }

      .workspace,
      .grid,
      .three-grid,
      .score-grid {
        grid-template-columns: 1fr;
      }

      .workspace {
        margin: -28px 18px 34px;
        padding: 18px;
      }
    }

    @media (max-width: 620px) {
      .workspace-stats {
        grid-template-columns: 1fr;
      }

      .workspace-actions,
      .action-topline {
        align-items: flex-start;
        flex-direction: column;
      }

      .action-card {
        grid-template-columns: 1fr;
      }
    }

    @media print {
      body {
        background: #ffffff;
      }

      .report-toolbar,
      .workspace-actions {
        display: none;
      }

      .page {
        width: 100%;
        margin: 0;
        border: 0;
        border-radius: 0;
        box-shadow: none;
      }

      .workspace {
        margin: 0 0 24px;
        border-radius: 0;
        box-shadow: none;
      }
    }
  </style>
</head>
<body data-report-id="${escapeHtml(reportId)}">
  <div class="report-toolbar">
    <button type="button" onclick="window.print()">${escapeHtml(labels.printPdf)}</button>
    <button type="button" class="secondary" onclick="downloadHtmlReport()">${escapeHtml(labels.downloadHtml)}</button>
  </div>
  <article class="page">
    <header class="cover">
      <p class="label">${escapeHtml(labels.productName)}</p>
      <h1>${escapeHtml(plan.title)}</h1>
      <p class="subtitle">${escapeHtml(plan.subtitle)}</p>
      <div class="meta-row">
        <span class="pill">${escapeHtml(labels.generated)} ${escapeHtml(generatedAt)}</span>
        <span class="pill">${escapeHtml(labels.strategyReport)}</span>
        <span class="pill">${escapeHtml(labels.actionPlanPill)}</span>
      </div>
    </header>

    ${workspacePanel(plan, labels)}

    <main class="content">
      <section>
        <h2>${escapeHtml(labels.executiveSummary)}</h2>
        <p class="lead">${escapeHtml(plan.executiveSummary)}</p>
      </section>

      <section class="grid">
        ${panel(labels.positioning, plan.positioning, "tint")}
        ${panel(labels.coreOfferRewrite, plan.coreOfferRewrite, "tint")}
        ${panel(labels.idealCustomerProfile, plan.idealCustomerProfile, "tint")}
        ${listPanel(labels.fastestQuickWins, plan.quickWins, "tint")}
      </section>

      <section>
        <h2>${escapeHtml(labels.growthScorecard)}</h2>
        <div class="score-grid">
          ${plan.scorecard.map((item) => scoreCard(item, labels)).join("")}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(labels.strategicMoves)}</h2>
        <div class="grid">
          ${plan.strategySections.map(strategyCard).join("")}
        </div>
      </section>

      <section>
        <div class="section-heading-row">
          <div>
            <h2>${escapeHtml(labels.actionPlan)}</h2>
            <p>${escapeHtml(labels.trackerHint)}</p>
          </div>
          <span class="section-badge" data-action-summary>0/${escapeHtml(String(plan.actionPlan.length))} ${escapeHtml(labels.completed)}</span>
        </div>
        <div class="action-list">
          ${plan.actionPlan.map((item, index) => actionPlanCard(item, index, labels)).join("")}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(labels.salesTemplates)}</h2>
        <div class="grid">
          ${plan.templates.map(templateCard).join("")}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(labels.contentIdeas)}</h2>
        <div class="grid">
          ${plan.contentIdeas.map((item) => contentCard(item, labels)).join("")}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(labels.metricsToTrack)}</h2>
        <table>
          <thead>
            <tr>
              <th>${escapeHtml(labels.metric)}</th>
              <th>${escapeHtml(labels.target)}</th>
              <th>${escapeHtml(labels.whyItMatters)}</th>
            </tr>
          </thead>
          <tbody>
            ${plan.metrics.map((item) => `<tr><td>${escapeHtml(item.metric)}</td><td>${escapeHtml(item.target)}</td><td>${escapeHtml(item.why)}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>

      <section class="three-grid">
        ${listPanel(labels.biggestRisks, plan.biggestRisks)}
        ${listPanel(labels.upsellIdeas, plan.upsellIdeas)}
        ${listPanel(labels.assumptions, plan.assumptions)}
      </section>

      <footer class="footer">${escapeHtml(plan.disclaimer)}</footer>
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
      <p class="label" style="color: var(--accent-dark)">${escapeHtml(labels.implementationWorkspace)}</p>
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
      <div>
        <span>${escapeHtml(labels.nextFocus)}</span>
        <strong data-next-focus>${escapeHtml(plan.actionPlan[0]?.task ?? labels.allActionsDone)}</strong>
        <p data-next-detail>${escapeHtml(plan.actionPlan[0]?.outcome ?? labels.allActionsDone)}</p>
      </div>
    </aside>
  </section>`;
}

function panel(title: string, body: string, variant = ""): string {
  return `<div class="panel ${variant}"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></div>`;
}

function listPanel(title: string, items: string[], variant = ""): string {
  return `<div class="panel ${variant}"><h3>${escapeHtml(title)}</h3><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`;
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
      <h3 data-action-title>${escapeHtml(item.task)}</h3>
      <p data-action-outcome>${escapeHtml(item.outcome)}</p>
      <label class="notes-field">
        <span>${escapeHtml(labels.notes)}</span>
        <textarea data-action-note placeholder="${escapeHtml(labels.notesPlaceholder)}"></textarea>
      </label>
    </div>
  </article>`;
}

function scoreCard(item: BusinessScore, labels: ReportLabels): string {
  return `<div class="score-card"><h3>${escapeHtml(item.label)}</h3><p class="score">${escapeHtml(String(item.score))}</p><p class="small">${escapeHtml(item.rationale)}</p><p class="small"><strong>${escapeHtml(labels.next)}:</strong> ${escapeHtml(item.nextMove)}</p></div>`;
}

function strategyCard(item: StrategySection): string {
  return `<div class="panel"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.diagnosis)}</p><ul>${item.moves.map((move) => `<li>${escapeHtml(move)}</li>`).join("")}</ul></div>`;
}

function templateCard(item: BusinessTemplate): string {
  return `<div class="panel"><h3>${escapeHtml(item.title)}</h3><p class="small">${escapeHtml(item.channel)}</p><p class="template">${escapeHtml(item.body)}</p></div>`;
}

function contentCard(item: ContentIdea, labels: ReportLabels): string {
  return `<div class="panel"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.angle)}</p><p class="small"><strong>${escapeHtml(labels.hook)}:</strong> ${escapeHtml(item.hook)}</p></div>`;
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
